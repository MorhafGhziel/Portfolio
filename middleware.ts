import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

const LOCALES = ["en", "ar"];

/**
 * Two jobs:
 *
 * 1. Locale routing. Every public page lives under /en or /ar. A path without
 *    one is redirected, using the visitor's Accept-Language only for the bare
 *    root, so shared links keep their language.
 *
 * 2. A fast redirect for /admin, not the security boundary. Middleware runs
 *    on the Edge runtime, where Prisma cannot follow, so all this can do is
 *    notice whether a session cookie exists. A forged cookie gets past here —
 *    and then fails in app/admin/(dash)/layout.tsx, which looks the token up
 *    in the database and is the actual gate.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const hasCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
    if (pathname === "/admin/login" && hasCookie) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (pathname !== "/admin/login" && !hasCookie) {
      const url = new URL("/admin/login", request.url);
      if (pathname !== "/admin") url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (LOCALES.includes(first)) return NextResponse.next();

  let lang = "en";
  if (pathname === "/") {
    const accept = request.headers.get("accept-language") ?? "";
    if (/^\s*ar\b/i.test(accept)) lang = "ar";
  }
  // Old routes from the previous site.
  const rest = pathname === "/" ? "" : pathname === "/contact" ? "#contact" : pathname;
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${rest.startsWith("#") ? "" : rest}`;
  if (rest.startsWith("#")) url.hash = rest;
  return NextResponse.redirect(url, pathname === "/" ? 307 : 308);
}

export const config = {
  // Everything except API routes, Next internals, and files with an extension.
  matcher: ["/((?!api|_next|admin|.*\\.[a-zA-Z0-9]+$).*)", "/admin/:path*"],
};
