import { createHash } from "node:crypto";

/**
 * Turning a request into a visitor identifier, without keeping anything that
 * identifies a visitor.
 *
 * The hash mixes the IP and user agent with a server-only salt and the current
 * UTC date. Three consequences follow, and all three are the point:
 *
 *   - It is one-way. The stored value cannot be turned back into an IP, so a
 *     database leak exposes no personal data.
 *   - It rotates at UTC midnight. "Unique visitors today" is meaningful;
 *     following one person across weeks is impossible by construction.
 *   - It needs no cookie, so there is no consent banner to show.
 *
 * This is the same construction Plausible uses, and it is what keeps the site
 * clear of GDPR and Saudi PDPL obligations around personal data.
 */

/** UTC so the rotation point does not move with the server's timezone. */
export function utcDateKey(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/**
 * Best-effort client IP.
 *
 * On Vercel the left-most entry of x-forwarded-for is the client; entries to
 * the right are proxies and are attacker-controllable, so only the first is
 * read. A missing header yields a constant, which merely means those requests
 * share a bucket — acceptable, since the value is never used for anything but
 * counting.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "0.0.0.0";
}

export function visitorHash(
  ip: string,
  ua: string,
  salt: string,
  now: Date = new Date(),
): string {
  return createHash("sha256")
    .update(`${ip}|${ua}|${salt}|${utcDateKey(now)}`)
    .digest("hex")
    .slice(0, 32);
}

/**
 * Reads the salt once, loudly.
 *
 * A missing salt would still produce hashes — consistent ones, derived from
 * nothing secret, and therefore reversible by anyone who can guess an IP. That
 * failure is silent and total, so it throws instead.
 */
export function analyticsSalt(): string {
  const salt = process.env.ANALYTICS_SALT;
  if (!salt || salt.length < 16) {
    throw new Error(
      "ANALYTICS_SALT is missing or too short (need >= 16 chars). " +
        "Visitor hashing refuses to run without it.",
    );
  }
  return salt;
}
