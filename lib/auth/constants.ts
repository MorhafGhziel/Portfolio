/**
 * Cookie names and lifetimes, isolated from anything Node-only.
 *
 * middleware.ts runs on the Edge runtime and needs the session cookie's name.
 * Importing it from lib/auth/session.ts would drag node:crypto and next/headers
 * into the Edge bundle, which fails the build outright. This module has no
 * imports at all, so both runtimes can read it.
 */

export const SESSION_COOKIE = "pf_session";

/**
 * Readable by client JavaScript on purpose: the tracking beacon checks it to
 * recognise the site owner and stay silent. It authorises nothing — the
 * httpOnly session cookie is what grants access.
 */
export const ADMIN_FLAG_COOKIE = "pf_admin";

export const SESSION_TTL_MS = 30 * 24 * 60 * 60_000; // 30 days

/**
 * "This browser is mine." A year-long marker, separate from the session, so the
 * owner's visits stay out of the numbers after sign-out and on devices that
 * never sign in. Set at sign-in and by visiting /api/own once (?off=1 clears it).
 * Readable by the beacon, like the flag above; it authorises nothing.
 */
export const OWN_COOKIE = "pf_own";
export const OWN_TTL_S = 60 * 60 * 24 * 365;
