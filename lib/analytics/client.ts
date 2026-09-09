import type { EventType } from "./events";

/**
 * The browser half of tracking.
 *
 * Three rules govern everything here:
 *   1. It never throws into the page. Every entry point is wrapped, and a
 *      failure means a missing row, never a broken render.
 *   2. It never blocks. sendBeacon hands the request to the browser and
 *      returns immediately, so navigation is not delayed.
 *   3. It sends the minimum. No cookie is set, no identifier is generated that
 *      outlives the tab, and the server derives everything else.
 */

const SESSION_KEY = "pf_sid";
const LAST_SEEN_KEY = "pf_seen";
const OPT_OUT_KEY = "pf_optout";

/** A visit is one session until 30 minutes pass with no activity. */
const SESSION_IDLE_MS = 30 * 60_000;

function randomId(): string {
  // crypto.randomUUID is unavailable on http:// origins in some browsers, so
  // there is a fallback. The value is a grouping key, not a secret.
  try {
    return crypto.randomUUID().replace(/-/g, "");
  } catch {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
  }
}

/**
 * The current session id, rolling over after idle time.
 *
 * sessionStorage alone would end the session when the tab closes, and
 * localStorage alone would never end it. Using both — the id in sessionStorage,
 * the timestamp in localStorage — matches how a visit actually behaves.
 */
export function sessionId(): string {
  try {
    const now = Date.now();
    const lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY) ?? 0);
    const existing = sessionStorage.getItem(SESSION_KEY);

    const expired = !lastSeen || now - lastSeen > SESSION_IDLE_MS;
    const id = existing && !expired ? existing : randomId();

    sessionStorage.setItem(SESSION_KEY, id);
    localStorage.setItem(LAST_SEEN_KEY, String(now));
    return id;
  } catch {
    // Private browsing can throw on storage access. A per-call id means the
    // visit counts, it just is not stitched into a session.
    return randomId();
  }
}

/** Honours Do Not Track, Global Privacy Control, and a manual opt-out. */
export function optedOut(): boolean {
  try {
    if (localStorage.getItem(OPT_OUT_KEY) === "1") return true;
    const nav = navigator as Navigator & {
      doNotTrack?: string;
      globalPrivacyControl?: boolean;
      webdriver?: boolean;
    };
    if (nav.doNotTrack === "1" || nav.globalPrivacyControl === true) return true;
    // Automated browsers: Playwright, Puppeteer, Selenium.
    if (nav.webdriver) return true;
    // The site owner. Set at sign-in and readable here on purpose.
    if (document.cookie.includes("pf_admin=1")) return true;
    return false;
  } catch {
    return false;
  }
}

/** Only these are read from the URL; the rest of the query string is ignored. */
function utm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ["source", "medium", "campaign"] as const) {
      const value = params.get(`utm_${key}`);
      if (value) {
        out[`utm${key[0].toUpperCase()}${key.slice(1)}`] = value.slice(0, 80);
      }
    }
  } catch {
    /* malformed query string — send nothing rather than fail */
  }
  return out;
}

/**
 * The referrer is only meaningful on the first page of a visit; afterwards it
 * is the site's own previous page, which the server would discard anyway.
 */
function referrer(): string | undefined {
  try {
    return document.referrer || undefined;
  } catch {
    return undefined;
  }
}

export function track(
  type: EventType,
  options: { path?: string; name?: string; locale?: "en" | "ar" } = {},
): void {
  try {
    if (typeof window === "undefined" || optedOut()) return;

    const body = JSON.stringify({
      type,
      path: options.path ?? window.location.pathname,
      name: options.name,
      sessionId: sessionId(),
      referrer: referrer(),
      locale: options.locale,
      ...utm(),
    });

    // sendBeacon survives the page being unloaded, which matters for the click
    // events below — a plain fetch is cancelled when navigation starts.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([body], { type: "application/json" }),
      );
      return;
    }

    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* silent by design */
    });
  } catch {
    /* silent by design */
  }
}

/** Lets the owner switch tracking off on their own devices from the console. */
export function setOptOut(value: boolean): void {
  try {
    if (value) localStorage.setItem(OPT_OUT_KEY, "1");
    else localStorage.removeItem(OPT_OUT_KEY);
  } catch {
    /* nothing to do */
  }
}
