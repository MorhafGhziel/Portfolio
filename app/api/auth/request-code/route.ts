import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  CODE_REQUEST_WINDOW_MS,
  CODE_TTL_MS,
  MAX_CODES_PER_WINDOW,
  generateCode,
  hashCode,
  isAllowedEmail,
  normaliseEmail,
} from "@/lib/auth/otp";
import { clientIp } from "@/lib/analytics/visitor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({ email: z.string().email().max(200) });

/**
 * The response is identical whether or not the address is allowed.
 *
 * Saying "that email isn't an admin" would turn this endpoint into a way to
 * discover which addresses are. The caller always gets the same message; only
 * the mailbox knows the difference.
 */
const ACCEPTED = {
  message: "If that address can sign in, a code is on its way.",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(body);
    // Even a malformed body gets the neutral answer, for the same reason.
    if (!parsed.success) return NextResponse.json(ACCEPTED, { status: 200 });

    const email = normaliseEmail(parsed.data.email);

    // Rate limited by IP, not by email: limiting per email would let anyone
    // lock the owner out by requesting codes for their address.
    const limit = await checkRateLimit(
      `otp:${clientIp(request.headers)}`,
      MAX_CODES_PER_WINDOW,
      CODE_REQUEST_WINDOW_MS,
    );
    if (!limit.ok) {
      return NextResponse.json(
        { message: `Too many requests. Try again in ${limit.retryAfter}s.` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

    if (!isAllowedEmail(email)) return NextResponse.json(ACCEPTED, { status: 200 });

    if (!process.env.RESEND_API_KEY) {
      console.error("[auth] RESEND_API_KEY missing — cannot send sign-in code");
      return NextResponse.json(
        { message: "Email is not configured on the server." },
        { status: 500 },
      );
    }

    const code = generateCode();

    // Any earlier unused code for this address is retired, so only the newest
    // one works and an old email cannot be replayed.
    await prisma.loginCode.updateMany({
      where: { email, usedAt: null },
      data: { usedAt: new Date() },
    });

    await prisma.loginCode.create({
      data: {
        email,
        codeHash: hashCode(code),
        expiresAt: new Date(Date.now() + CODE_TTL_MS),
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Portfolio Admin <contact@morhaf.me>",
      to: [email],
      subject: `${code} is your dashboard sign-in code`,
      html: signInEmail(code),
    });

    if (error) {
      console.error("[auth] Resend failed:", error.message);
      return NextResponse.json(
        { message: "Could not send the email. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json(ACCEPTED, { status: 200 });
  } catch (error) {
    console.error("[auth] request-code failed:", error);
    return NextResponse.json(
      { message: "Something went wrong. Try again." },
      { status: 500 },
    );
  }
}

/** Plain, high-contrast, and readable in every client including plain-text ones. */
function signInEmail(code: string): string {
  return `
    <div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#17150f">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#736d61">
        Portfolio dashboard
      </p>
      <h1 style="margin:0 0 24px;font-size:20px;font-weight:600">Your sign-in code</h1>
      <p style="margin:0 0 8px;font-size:15px;color:#5d574c">
        Enter this code to sign in. It expires in 10 minutes and can be used once.
      </p>
      <div style="margin:24px 0;padding:20px;background:#f2efe9;border-radius:8px;text-align:center;
                  font-family:ui-monospace,Menlo,Consolas,monospace;font-size:32px;font-weight:700;
                  letter-spacing:.28em">${code}</div>
      <p style="margin:0;font-size:13px;color:#736d61">
        If you did not request this, ignore the email — nothing has changed and no one has access.
      </p>
    </div>
  `;
}
