import { createHash, randomInt, timingSafeEqual } from "node:crypto";

/**
 * One-time sign-in codes.
 *
 * A six-digit code is only 10^6 possibilities, so its safety comes entirely
 * from the limits around it rather than from its length: a ten-minute life, a
 * hard cap on wrong guesses, and single use. Those three together leave an
 * attacker five attempts against a million values inside ten minutes.
 */

export const CODE_TTL_MS = 10 * 60_000;
export const MAX_CODE_ATTEMPTS = 5;
/** Stops the request-a-code endpoint being used as a mail cannon. */
export const CODE_REQUEST_WINDOW_MS = 60_000;
export const MAX_CODES_PER_WINDOW = 3;

/**
 * randomInt is drawn from the CSPRNG and is free of the modulo bias that
 * Math.random-based digit picking introduces.
 */
export function generateCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/**
 * Codes are stored as hashes, so a leaked database yields nothing replayable.
 * A plain SHA-256 is right here where it would be wrong for a password: the
 * input has ten minutes to live and five guesses, so slow hashing buys nothing.
 */
export function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

/**
 * Compares in constant time. The timing signal on a six-digit code is largely
 * theoretical, but the correct comparison costs one line.
 */
export function codeMatches(input: string, storedHash: string): boolean {
  const a = Buffer.from(hashCode(input), "hex");
  const b = Buffer.from(storedHash, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Only ever six digits; anything else is rejected before touching the database. */
export function isWellFormedCode(input: string): boolean {
  return /^\d{6}$/.test(input);
}

/**
 * The addresses allowed to receive a code, from ADMIN_EMAILS.
 *
 * An empty list means nobody can sign in, which is the correct failure: a
 * misconfigured deploy should lock the dashboard, not open it.
 */
export function allowedEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedEmail(email: string): boolean {
  return allowedEmails().includes(email.trim().toLowerCase());
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 200);
}
