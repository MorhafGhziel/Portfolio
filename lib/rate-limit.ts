import { prisma } from "@/lib/db";

/**
 * Fixed-window rate limiting, backed by the database.
 *
 * In-memory counters are useless here: serverless functions scale to many
 * instances and each would keep its own count, so a limit of 60 becomes 60 per
 * instance. One indexed upsert per request is the price of a limit that is
 * actually enforced.
 *
 * Fixed windows allow a burst across a boundary — up to 2x the limit in the
 * worst case — which is fine for what this protects against: someone scripting
 * fake events into the dashboard, not a serious denial-of-service attempt.
 */

export interface LimitResult {
  ok: boolean;
  /** Seconds until the window rolls over. Only meaningful when ok is false. */
  retryAfter: number;
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<LimitResult> {
  const now = Date.now();
  // Bucketing the key by window start is what makes this a fixed window and
  // lets the row be created and incremented in one statement.
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const expiresAt = new Date(windowStart + windowMs);
  const bucketKey = `${key}:${windowStart}`;

  try {
    const row = await prisma.rateLimit.upsert({
      where: { key: bucketKey },
      create: { key: bucketKey, count: 1, expiresAt },
      update: { count: { increment: 1 } },
      select: { count: true },
    });

    if (row.count > limit) {
      return {
        ok: false,
        retryAfter: Math.max(1, Math.ceil((expiresAt.getTime() - now) / 1000)),
      };
    }

    // Opportunistic pruning keeps the table small without a cron job. One in
    // fifty requests pays for it, and a failure here must never fail the call.
    if (Math.random() < 0.02) {
      void prisma.rateLimit
        .deleteMany({ where: { expiresAt: { lt: new Date(now) } } })
        .catch(() => {
          /* best effort */
        });
    }

    return { ok: true, retryAfter: 0 };
  } catch {
    // The limiter is a guard, not a gate. If the database is unreachable the
    // request is allowed through — the alternative is that a database blip
    // takes the whole site's analytics offline.
    return { ok: true, retryAfter: 0 };
  }
}
