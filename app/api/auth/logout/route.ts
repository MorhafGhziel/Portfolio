import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Signing out deletes the session row, not just the cookie — so a token copied
 * from the browser before signing out stops working too.
 */
export async function POST() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
