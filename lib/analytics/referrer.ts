/**
 * Referrer handling.
 *
 * Only the host is ever kept. A full referring URL routinely carries search
 * terms, session tokens and internal paths from the other site — none of which
 * belongs in this database, and none of which the dashboard asks about.
 */

/** Traffic from the site to itself is navigation, not a source. */
export function isInternal(host: string, selfHost: string): boolean {
  const h = host.toLowerCase().replace(/^www\./, "");
  const s = selfHost.toLowerCase().replace(/^www\./, "");
  return h === s;
}

/**
 * Extracts a bare host, or null for direct traffic.
 *
 * Returns null rather than "direct" so the caller decides how absence is
 * labelled, and so the column stays genuinely empty for direct visits.
 */
export function referrerHost(
  referrer: string | null | undefined,
  selfHost: string,
): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (!host) return null;
    if (isInternal(host, selfHost)) return null;
    return host.slice(0, 120);
  } catch {
    // Not a parseable URL — some browsers send "android-app://..." and similar.
    return null;
  }
}

/**
 * A readable name for a host, so the dashboard shows "LinkedIn" rather than
 * "lnkd.in" and groups Google's many domains together.
 */
const KNOWN: Array<[RegExp, string]> = [
  [/^(www\.)?google\./, "Google"],
  [/^(lnkd\.in|.*linkedin\.com)$/, "LinkedIn"],
  [/^(t\.co|.*twitter\.com|.*x\.com)$/, "X / Twitter"],
  [/^(.*\.)?github\.com$/, "GitHub"],
  [/^(.*\.)?facebook\.com$|^fb\.me$/, "Facebook"],
  [/^(.*\.)?instagram\.com$/, "Instagram"],
  [/^(.*\.)?reddit\.com$/, "Reddit"],
  [/^(.*\.)?bing\.com$/, "Bing"],
  [/^(.*\.)?duckduckgo\.com$/, "DuckDuckGo"],
  [/^(.*\.)?yahoo\./, "Yahoo"],
  [/^(.*\.)?youtube\.com$|^youtu\.be$/, "YouTube"],
  [/^(.*\.)?whatsapp\.com$/, "WhatsApp"],
  [/^(.*\.)?t\.me$|^(.*\.)?telegram\./, "Telegram"],
  [/^(.*\.)?news\.ycombinator\.com$/, "Hacker News"],
  [/^(.*\.)?bahrainjobs\.|^(.*\.)?bayt\.com$/, "Bayt"],
];

export function referrerLabel(host: string | null | undefined): string {
  if (!host) return "Direct";
  for (const [pattern, label] of KNOWN) {
    if (pattern.test(host)) return label;
  }
  return host;
}
