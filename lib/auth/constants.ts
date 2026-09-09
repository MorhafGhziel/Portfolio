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
