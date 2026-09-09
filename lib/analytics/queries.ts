import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { bucketKey, bucketStarts, percentChange, type Range } from "./range";

/**
 * Every read the dashboard performs.
 *
 * Kept in one module so the page components stay presentational and so the
 * time-window logic exists exactly once. Unique-visitor and session counts need
 * COUNT(DISTINCT ...), which Prisma's groupBy cannot express, so those are raw
 * SQL — parameterised through Prisma.sql, never string-concatenated.
 */

/** The WHERE fragment shared by every query, so a range is applied identically. */
function within(from: Date | null, to: Date): Prisma.Sql {
  return from
    ? Prisma.sql`"createdAt" >= ${from} AND "createdAt" < ${to}`
    : Prisma.sql`"createdAt" < ${to}`;
}

export interface Summary {
  visitors: number;
  pageviews: number;
  sessions: number;
  /** Pages per session, to one decimal. A proxy for how deep people go. */
  pagesPerSession: number;
  deltas: {
    visitors: number | null;
    pageviews: number | null;
    sessions: number | null;
  };
}

interface RawSummary {
  visitors: bigint;
  pageviews: bigint;
  sessions: bigint;
}

async function summaryFor(from: Date | null, to: Date): Promise<RawSummary> {
  const [row] = await prisma.$queryRaw<RawSummary[]>`
    SELECT
      COUNT(DISTINCT "visitorId")                                  AS visitors,
      COUNT(*) FILTER (WHERE "type" = 'pageview')                  AS pageviews,
      COUNT(DISTINCT "sessionId")                                  AS sessions
    FROM "Event"
    WHERE ${within(from, to)}
  `;
  return row ?? { visitors: 0n, pageviews: 0n, sessions: 0n };
}

export async function getSummary(range: Range): Promise<Summary> {
  const current = await summaryFor(range.from, range.to);

  // "All time" has nothing to compare against, so the deltas stay null and the
  // UI renders a dash rather than an invented number.
  const previous =
    range.previousFrom && range.previousTo
      ? await summaryFor(range.previousFrom, range.previousTo)
      : null;

  const visitors = Number(current.visitors);
  const pageviews = Number(current.pageviews);
  const sessions = Number(current.sessions);

  return {
    visitors,
    pageviews,
    sessions,
    pagesPerSession: sessions
      ? Math.round((pageviews / sessions) * 10) / 10
      : 0,
    deltas: {
      visitors: previous ? percentChange(visitors, Number(previous.visitors)) : null,
      pageviews: previous ? percentChange(pageviews, Number(previous.pageviews)) : null,
      sessions: previous ? percentChange(sessions, Number(previous.sessions)) : null,
    },
  };
}

export interface SeriesPoint {
  t: number;
  visitors: number;
  pageviews: number;
}

/**
 * The trend line.
 *
 * SQL returns no row for a bucket with no events, which would draw a chart that
 * skips quiet days and misrepresents the shape. The full axis is built in JS
 * and the counts are filled in against it, so gaps render as zero.
 */
export async function getSeries(range: Range): Promise<SeriesPoint[]> {
  const axis = bucketStarts(range);

  const rows = await prisma.$queryRaw<
    { bucket: Date; visitors: bigint; pageviews: bigint }[]
  >`
    SELECT
      date_trunc(${range.bucket}, "createdAt")     AS bucket,
      COUNT(DISTINCT "visitorId")                  AS visitors,
      COUNT(*) FILTER (WHERE "type" = 'pageview')  AS pageviews
    FROM "Event"
    WHERE ${within(range.from, range.to)}
    GROUP BY 1
    ORDER BY 1
  `;

  // "All time" has no precomputed axis; use whatever the data spans.
  if (axis.length === 0) {
    return rows.map((r) => ({
      t: r.bucket.getTime(),
      visitors: Number(r.visitors),
      pageviews: Number(r.pageviews),
    }));
  }

  const byBucket = new Map(
    rows.map((r) => [
      bucketKey(r.bucket, range.bucket),
      { visitors: Number(r.visitors), pageviews: Number(r.pageviews) },
    ]),
  );

  return axis.map((date) => {
    const hit = byBucket.get(bucketKey(date, range.bucket));
    return {
      t: date.getTime(),
      visitors: hit?.visitors ?? 0,
      pageviews: hit?.pageviews ?? 0,
    };
  });
}

export interface Breakdown {
  label: string;
  count: number;
}

/**
 * Top values of one column.
 *
 * The column name is interpolated with Prisma.raw, which does not escape — so
 * it is restricted to a closed set of identifiers here rather than accepting a
 * caller-supplied string.
 */
type BreakdownColumn =
  | "path"
  | "referrerHost"
  | "country"
  | "city"
  | "device"
  | "browser"
  | "os"
  | "locale"
  | "utmSource"
  | "utmMedium"
  | "utmCampaign";

const ALLOWED_COLUMNS: readonly BreakdownColumn[] = [
  "path",
  "referrerHost",
  "country",
  "city",
  "device",
  "browser",
  "os",
  "locale",
  "utmSource",
  "utmMedium",
  "utmCampaign",
];

export async function getBreakdown(
  range: Range,
  column: BreakdownColumn,
  limit = 10,
  options: { pageviewsOnly?: boolean; includeNull?: boolean } = {},
): Promise<Breakdown[]> {
  if (!ALLOWED_COLUMNS.includes(column)) {
    throw new Error(`Refusing to group by unknown column: ${column}`);
  }

  const col = Prisma.raw(`"${column}"`);
  const typeFilter = options.pageviewsOnly
    ? Prisma.sql`AND "type" = 'pageview'`
    : Prisma.empty;
  // Direct traffic is a real answer for referrers, so nulls are kept there and
  // dropped everywhere else, where they only mean "we could not tell".
  const nullFilter = options.includeNull
    ? Prisma.empty
    : Prisma.sql`AND ${col} IS NOT NULL`;

  const rows = await prisma.$queryRaw<{ label: string | null; count: bigint }[]>`
    SELECT ${col} AS label, COUNT(DISTINCT "visitorId") AS count
    FROM "Event"
    WHERE ${within(range.from, range.to)} ${typeFilter} ${nullFilter}
    GROUP BY 1
    ORDER BY count DESC
    LIMIT ${limit}
  `;

  return rows.map((r) => ({ label: r.label ?? "", count: Number(r.count) }));
}

export interface EventCount {
  type: string;
  name: string | null;
  count: number;
}

/** Custom events — CV downloads, project opens, outbound clicks. */
export async function getEventCounts(
  range: Range,
  type: string,
  limit = 20,
): Promise<EventCount[]> {
  const rows = await prisma.$queryRaw<
    { type: string; name: string | null; count: bigint }[]
  >`
    SELECT "type", "name", COUNT(*) AS count
    FROM "Event"
    WHERE ${within(range.from, range.to)} AND "type" = ${type}
    GROUP BY 1, 2
    ORDER BY count DESC
    LIMIT ${limit}
  `;
  return rows.map((r) => ({ ...r, count: Number(r.count) }));
}

/** Totals per event type, for the events overview row. */
export async function getEventTotals(
  range: Range,
): Promise<Record<string, number>> {
  const rows = await prisma.$queryRaw<{ type: string; count: bigint }[]>`
    SELECT "type", COUNT(*) AS count
    FROM "Event"
    WHERE ${within(range.from, range.to)}
    GROUP BY 1
  `;
  return Object.fromEntries(rows.map((r) => [r.type, Number(r.count)]));
}

export interface LiveNow {
  visitors: number;
  pages: Breakdown[];
  countries: Breakdown[];
}

/** "Right now" means the last five minutes — long enough to catch a reader. */
export async function getLive(): Promise<LiveNow> {
  const since = new Date(Date.now() - 5 * 60_000);

  const [countRow] = await prisma.$queryRaw<{ visitors: bigint }[]>`
    SELECT COUNT(DISTINCT "visitorId") AS visitors
    FROM "Event" WHERE "createdAt" >= ${since}
  `;

  const pages = await prisma.$queryRaw<{ label: string; count: bigint }[]>`
    SELECT "path" AS label, COUNT(DISTINCT "visitorId") AS count
    FROM "Event" WHERE "createdAt" >= ${since} AND "type" = 'pageview'
    GROUP BY 1 ORDER BY count DESC LIMIT 5
  `;

  const countries = await prisma.$queryRaw<{ label: string; count: bigint }[]>`
    SELECT "country" AS label, COUNT(DISTINCT "visitorId") AS count
    FROM "Event" WHERE "createdAt" >= ${since} AND "country" IS NOT NULL
    GROUP BY 1 ORDER BY count DESC LIMIT 5
  `;

  return {
    visitors: Number(countRow?.visitors ?? 0),
    pages: pages.map((r) => ({ label: r.label, count: Number(r.count) })),
    countries: countries.map((r) => ({ label: r.label, count: Number(r.count) })),
  };
}

/** True once any event exists, so the UI can tell "no data yet" from "no traffic". */
export async function hasAnyData(): Promise<boolean> {
  const row = await prisma.event.findFirst({ select: { id: true } });
  return row !== null;
}
