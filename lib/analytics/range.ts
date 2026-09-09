/**
 * Date ranges for the dashboard.
 *
 * Every chart and table answers "over what window?", so the window is computed
 * in exactly one place. The bucket size is derived from the range rather than
 * chosen separately, which is what keeps a 24-hour chart from being drawn with
 * one point and a 90-day chart from being drawn with 2,160.
 */

export const RANGES = ["24h", "7d", "30d", "90d", "all"] as const;
export type RangeKey = (typeof RANGES)[number];

export const RANGE_LABELS: Record<RangeKey, string> = {
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  all: "All time",
};

export type Bucket = "hour" | "day" | "week";

export interface Range {
  key: RangeKey;
  /** Inclusive lower bound. Null only for "all". */
  from: Date | null;
  /** Exclusive upper bound — always "now", so the current partial bucket shows. */
  to: Date;
  bucket: Bucket;
  /** The window immediately before this one, for period-over-period deltas. */
  previousFrom: Date | null;
  previousTo: Date | null;
}

export function isRangeKey(value: string | null | undefined): value is RangeKey {
  return !!value && (RANGES as readonly string[]).includes(value);
}

const DAY_MS = 86_400_000;

/** Days covered by each fixed range; "all" has no fixed span. */
const SPAN_DAYS: Record<Exclude<RangeKey, "all">, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export function resolveRange(key: RangeKey, now: Date = new Date()): Range {
  if (key === "all") {
    return {
      key,
      from: null,
      to: now,
      bucket: "week",
      previousFrom: null,
      previousTo: null,
    };
  }

  const spanMs = SPAN_DAYS[key] * DAY_MS;
  const from = new Date(now.getTime() - spanMs);

  return {
    key,
    from,
    to: now,
    // Hourly for a single day, weekly past a month, daily in between.
    bucket: key === "24h" ? "hour" : key === "90d" ? "week" : "day",
    // The preceding window of identical length, so "vs. previous period" is a
    // like-for-like comparison rather than a comparison against a longer span.
    previousFrom: new Date(from.getTime() - spanMs),
    previousTo: from,
  };
}

/**
 * Percentage change between two periods.
 *
 * Growth from zero is reported as null rather than Infinity or an arbitrary
 * 100%: "up ∞%" is noise, and the dashboard renders null as a dash.
 */
export function percentChange(
  current: number,
  previous: number,
): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}

/**
 * A complete, gap-free series of bucket start times.
 *
 * SQL returns no row for a bucket with no events, which would draw a chart
 * that skips quiet days and silently misrepresents the trend. The dashboard
 * builds the full axis here and fills counts in against it.
 */
export function bucketStarts(range: Range, now: Date = new Date()): Date[] {
  const to = range.to ?? now;
  const from = range.from;
  if (!from) return [];

  const out: Date[] = [];
  const cursor = new Date(from);

  // Align to the start of the bucket so labels land on whole hours/days.
  if (range.bucket === "hour") {
    cursor.setMinutes(0, 0, 0);
  } else {
    cursor.setHours(0, 0, 0, 0);
  }

  const stepMs =
    range.bucket === "hour" ? 3_600_000 : range.bucket === "day" ? DAY_MS : 7 * DAY_MS;

  // Guard against an unbounded loop if a caller ever passes from > to.
  const maxPoints = 400;
  while (cursor <= to && out.length < maxPoints) {
    out.push(new Date(cursor));
    cursor.setTime(cursor.getTime() + stepMs);
  }
  return out;
}

/** Truncates a timestamp to the start of its bucket, for grouping in JS. */
export function bucketKey(date: Date, bucket: Bucket): number {
  const d = new Date(date);
  if (bucket === "hour") {
    d.setMinutes(0, 0, 0);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return d.getTime();
}
