import { NextRequest, NextResponse } from "next/server";
import { OWN_COOKIE, OWN_TTL_S } from "@/lib/auth/constants";

export const dynamic = "force-dynamic";

/**
 * Marks (or unmarks) this browser as the owner's, so its visits never count.
 * Signing in to /admin does this automatically. Visit /api/own once on a phone
 * or laptop you never sign in from; /api/own?off=1 clears it.
 */
export function GET(request: NextRequest) {
  const off = request.nextUrl.searchParams.get("off") === "1";
  const response = NextResponse.json({
    ok: true,
    marked: !off,
    message: off
      ? "This device is no longer marked. Its visits count as normal traffic."
      : "This device is marked as yours. Its visits are left out of the analytics for a year.",
  });
  if (off) response.cookies.delete(OWN_COOKIE);
  else
    response.cookies.set(OWN_COOKIE, "1", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: OWN_TTL_S,
    });
  return response;
}
