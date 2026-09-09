import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MAX_CODE_ATTEMPTS,
  codeMatches,
  isAllowedEmail,
  isWellFormedCode,
  normaliseEmail,
} from "@/lib/auth/otp";
import {
  ADMIN_FLAG_COOKIE,
  SESSION_COOKIE,
  adminFlagCookieOptions,
  createSession,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { clientIp } from "@/lib/analytics/visitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  email: z.string().email().max(200),
  code: z.string().max(10),
});

/** One message for every failure, so nothing can be learned from the wording. */
const REJECT = { message: "That code is not valid." } as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json(REJECT, { status: 400 });

    const email = normaliseEmail(parsed.data.email);
    const code = parsed.data.code.trim();

    // A second limiter behind the per-code attempt counter: without it, an
    // attacker could request a fresh code and spend five guesses, repeatedly.
    const limit = await checkRateLimit(
      `verify:${clientIp(request.headers)}`,
      10,
      60_000,
    );
    if (!limit.ok) {
      return NextResponse.json(
        { message: `Too many attempts. Try again in ${limit.retryAfter}s.` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

    if (!isWellFormedCode(code) || !isAllowedEmail(email)) {
      return NextResponse.json(REJECT, { status: 400 });
    }

    const record = await prisma.loginCode.findFirst({
      where: { email, usedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });

    if (!record) return NextResponse.json(REJECT, { status: 400 });

    if (record.attempts >= MAX_CODE_ATTEMPTS) {
      // Burn it rather than leaving a code sitting at the limit.
      await prisma.loginCode.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      });
      return NextResponse.json(REJECT, { status: 400 });
    }

    if (!codeMatches(code, record.codeHash)) {
      await prisma.loginCode.update({
        where: { id: record.id },
        data: { attempts: { increment: 1 } },
      });
      return NextResponse.json(REJECT, { status: 400 });
    }

    // Correct. Consume the code first — if anything below fails, the code is
    // still spent, which is the safe direction to fail in.
    await prisma.loginCode.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });

    const user = await prisma.adminUser.upsert({
      where: { email },
      create: { email, lastLogin: new Date() },
      update: { lastLogin: new Date() },
    });

    const { token, expiresAt } = await createSession(
      user.id,
      request.headers.get("user-agent"),
    );

    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(expiresAt));
    // Companion flag, readable by the beacon so the owner's visits are skipped.
    response.cookies.set(ADMIN_FLAG_COOKIE, "1", adminFlagCookieOptions(expiresAt));
    return response;
  } catch (error) {
    console.error("[auth] verify failed:", error);
    return NextResponse.json(
      { message: "Something went wrong. Try again." },
      { status: 500 },
    );
  }
}
