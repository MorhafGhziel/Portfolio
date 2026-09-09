import { NextResponse } from "next/server";
import { getLive } from "@/lib/analytics/queries";
import { getSessionUser } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Polled by the live badge.
 *
 * Guarded like every other admin surface — visitor counts are not secret, but
 * an unauthenticated endpoint that runs three aggregate queries is a free
 * denial-of-service lever.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getLive(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[admin] live query failed:", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}
