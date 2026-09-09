import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

/**
 * A fast redirect, not the security boundary.
 *
 * Middleware runs on the Edge runtime, where Prisma cannot follow, so all this
 * can do is notice whether a session cookie exists. A forged cookie gets past
 * here — and then fails in app/admin/layout.tsx, which looks the token up in
 * the database and is the actual gate.
 *
 * Keeping it this way avoids the common mistake of treating a cookie's
 * presence as proof of a valid session.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  // Already signed in and heading for the login form — send them onward.
  if (pathname === "/admin/login" && hasCookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !hasCookie) {
    const url = new URL("/admin/login", request.url);
    // Remember where they were going so login can return them there.
    if (pathname !== "/admin") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
