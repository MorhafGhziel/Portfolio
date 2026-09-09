/**
 * Minimal user-agent parsing.
 *
 * Hand-written rather than pulled from a package: the popular library changed
 * to a copyleft licence in its current major, and the surface we actually need
 * is a dozen substring checks. Every branch below is covered by a unit test,
 * because silently mislabelling half the traffic as "unknown" is exactly the
 * kind of bug that makes a dashboard lie without ever throwing.
 *
 * Order matters throughout: Edge advertises itself as Chrome, Chrome advertises
 * itself as Safari, and almost everything advertises itself as Mozilla. The
 * more specific token is always tested first.
 */

export type Device = "mobile" | "tablet" | "desktop";

export interface UaInfo {
  device: Device;
  browser: string;
  os: string;
}

export function parseDevice(ua: string): Device {
  const s = ua.toLowerCase();

  // iPad stopped saying "iPad" in its default desktop-mode UA; it says
  // Macintosh instead. Those land in desktop, which is correct enough — the
  // alternative is misreading real Macs as tablets.
  if (/ipad|tablet|playbook|silk|kindle/.test(s)) return "tablet";
  // "android" alone is not enough: Android tablets omit "mobile".
  if (/android/.test(s) && !/mobile/.test(s)) return "tablet";
  if (/mobi|iphone|ipod|windows phone|iemobile|blackberry/.test(s)) {
    return "mobile";
  }
  return "desktop";
}

export function parseBrowser(ua: string): string {
  const s = ua.toLowerCase();

  // Edge and Opera embed "chrome"; Chrome embeds "safari". Specific first.
  if (/edg[ea]?\//.test(s)) return "Edge";
  if (/opr\/|opera/.test(s)) return "Opera";
  if (/samsungbrowser/.test(s)) return "Samsung Internet";
  if (/firefox|fxios/.test(s)) return "Firefox";
  // Brave and Arc are Chromium and do not identify themselves by default.
  if (/chrome|crios|chromium/.test(s)) return "Chrome";
  if (/safari/.test(s)) return "Safari";
  return "Other";
}

export function parseOs(ua: string): string {
  const s = ua.toLowerCase();

  // iOS before macOS: an iPhone UA contains "like Mac OS X".
  if (/iphone|ipad|ipod|ios/.test(s)) return "iOS";
  if (/android/.test(s)) return "Android";
  if (/windows/.test(s)) return "Windows";
  if (/mac os x|macintosh/.test(s)) return "macOS";
  if (/cros/.test(s)) return "ChromeOS";
  // Android is Linux, so this has to come after it.
  if (/linux|ubuntu|fedora|debian/.test(s)) return "Linux";
  return "Other";
}

export function parseUa(ua: string | null | undefined): UaInfo {
  const value = (ua ?? "").slice(0, 512);
  if (!value) return { device: "desktop", browser: "Other", os: "Other" };
  return {
    device: parseDevice(value),
    browser: parseBrowser(value),
    os: parseOs(value),
  };
}
