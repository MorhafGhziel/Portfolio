import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isBot } from "@/lib/analytics/bots";
import { normalisePath, trackPayloadSchema } from "@/lib/analytics/events";
import { referrerHost } from "@/lib/analytics/referrer";
import { parseUa } from "@/lib/analytics/ua";
import { analyticsSalt, clientIp, visitorHash } from "@/lib/analytics/visitor";
import { checkRateLimit } from "@/lib/rate-limit";
import { ADMIN_FLAG_COOKIE } from "@/lib/auth/constants";

// node, not edge: the visitor hash uses node:crypto and Prisma needs a full runtime.
export const runtime = "nodejs";
// Never cached, never prerendered — every call is a write.
export const dynamic = "force-dynamic";

/** Anything above this from one visitor in a minute is a script, not a person. */
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60_000;

/**
 * The single rule for this endpoint: it returns 204 no matter what happens.
 *
 * A visitor must never see an error, a slow response or a console message
 * because analytics had a problem. Every failure path below — invalid payload,
 * bot, rate limit, database down — exits the same way, silently. The only
 * observable difference is whether a row was written.
 */
const noContent = () => new NextResponse(null, { status: 204 });

export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const ua = headers.get("user-agent");

    // 1. Respect the visitor's stated preference before anything else.
    if (headers.get("dnt") === "1" || headers.get("sec-gpc") === "1") {
      return noContent();
    }

    // 2. Crawlers and link unfurlers would otherwise show up as a traffic
    //    spike every time the URL is pasted into a chat.
    if (isBot(ua)) return noContent();

    // 3. The site owner's own browsing would drown out real visitors.
    if (request.cookies.get(ADMIN_FLAG_COOKIE)?.value === "1") {
      return noContent();
    }

    // 4. Reject anything that is not exactly the expected shape. This is the
    //    whole input defence for a public, unauthenticated write endpoint.
    const body = await request.json().catch(() => null);
    const parsed = trackPayloadSchema.safeParse(body);
    if (!parsed.success) return noContent();
    const payload = parsed.data;

    // 5. Identify without identifying. The IP is used here and then dropped;
    //    it is never passed to the insert below.
    const ip = clientIp(headers);
    const visitorId = visitorHash(ip, ua ?? "", analyticsSalt());

    const limit = await checkRateLimit(
      `track:${visitorId}`,
      RATE_LIMIT,
      RATE_WINDOW_MS,
    );
    if (!limit.ok) return noContent();

    const { device, browser, os } = parseUa(ua);
    const selfHost = request.nextUrl.hostname;

    await prisma.event.create({
      data: {
        visitorId,
        sessionId: payload.sessionId,
        type: payload.type,
        path: normalisePath(payload.path),
        name: payload.name ?? null,
        referrerHost: referrerHost(payload.referrer, selfHost),
        utmSource: payload.utmSource ?? null,
        utmMedium: payload.utmMedium ?? null,
        utmCampaign: payload.utmCampaign ?? null,
        // Vercel resolves these at the edge on every plan, so no IP lookup and
        // no third-party geolocation call is needed.
        country: headers.get("x-vercel-ip-country"),
        city: safeCity(headers.get("x-vercel-ip-city")),
        device,
        browser,
        os,
        locale: payload.locale ?? null,
      },
    });

    return noContent();
  } catch {
    // Deliberately silent. A failure here is a missing row, not a broken page.
    return noContent();
  }
}

/**
 * City names arrive percent-encoded ("Al%20Riyadh"). Decoding can throw on
 * malformed input, which must not take the request down.
 */
function safeCity(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value).slice(0, 100);
  } catch {
    return value.slice(0, 100);
  }
}
