import { z } from "zod";

/**
 * The wire contract for POST /api/track.
 *
 * The endpoint is public and unauthenticated — it has to be, since it records
 * anonymous visitors — so everything arriving is treated as hostile. The schema
 * below is the whole defence: a closed set of event types, hard length caps on
 * every string, and no field that is written to the database without passing
 * through here first.
 */

export const EVENT_TYPES = [
  "pageview",
  "cv_download",
  "project_open",
  "outbound_click",
  "contact_submit",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

/** Human labels for the dashboard. */
export const EVENT_LABELS: Record<EventType, string> = {
  pageview: "Page view",
  cv_download: "CV download",
  project_open: "Project opened",
  outbound_click: "Outbound click",
  contact_submit: "Contact sent",
};

export const trackPayloadSchema = z.object({
  type: z.enum(EVENT_TYPES),
  // Path only. A full URL would carry the query string, which can hold
  // anything; the server reconstructs what it needs from utm_* instead.
  path: z.string().min(1).max(300),
  name: z.string().max(120).optional(),
  sessionId: z.string().min(8).max(64),
  referrer: z.string().max(1000).optional(),
  utmSource: z.string().max(80).optional(),
  utmMedium: z.string().max(80).optional(),
  utmCampaign: z.string().max(80).optional(),
  locale: z.enum(["en", "ar"]).optional(),
});

export type TrackPayload = z.infer<typeof trackPayloadSchema>;

/**
 * Normalises a pathname before it is stored.
 *
 * Query strings and hashes are dropped (they carry UTM tags and anchor links,
 * neither of which identifies a distinct page), trailing slashes are collapsed
 * so "/contact" and "/contact/" are one row in the report, and the result is
 * length-capped.
 */
export function normalisePath(input: string): string {
  const withoutQuery = input.split(/[?#]/)[0] ?? "/";
  const trimmed =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : withoutQuery;
  const path = trimmed === "" ? "/" : trimmed;
  return path.startsWith("/") ? path.slice(0, 300) : `/${path}`.slice(0, 300);
}
