import { isRangeKey, resolveRange, type Range, type RangeKey } from "./range";

/** The window every dashboard page defaults to when the URL says nothing. */
export const DEFAULT_RANGE: RangeKey = "7d";

export function rangeFromParams(params: { range?: string }): Range {
  const key = isRangeKey(params.range) ? params.range : DEFAULT_RANGE;
  return resolveRange(key);
}

export interface Loaded<T> {
  data: T | null;
  /** Set when the database could not be reached, so the page can explain why. */
  error: string | null;
}

/**
 * Runs a set of dashboard queries and turns a connection failure into a value.
 *
 * Without this, an unset or wrong DATABASE_URL renders the Next.js error page —
 * which says nothing useful about what is actually wrong. Here the dashboard
 * stays up and tells the operator exactly what to fix.
 */
export async function load<T>(fn: () => Promise<T>): Promise<Loaded<T>> {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[admin] query failed:", message);

    // Prisma's connection errors are long and mention the URL; the operator
    // needs the cause, not the stack.
    const friendly =
      /P1001|P1000|ECONNREFUSED|ENOTFOUND|Can't reach database/i.test(message)
        ? "Cannot reach the database. Check DATABASE_URL and that the Neon project is awake."
        : /does not exist in the current database|P2021|P2022/i.test(message)
          ? "The tables are missing. Run `npx prisma migrate deploy` against this database."
          : "The query failed. See the server logs for details.";

    return { data: null, error: friendly };
  }
}
