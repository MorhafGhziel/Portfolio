import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { ADMIN_FLAG_COOKIE, SESSION_COOKIE, SESSION_TTL_MS } from "./constants";

/**
 * Sessions.
 *
 * Stored in the database rather than encoded in a self-contained JWT, for one
 * reason: revocation. A signed token stays valid until it expires no matter
 * what the server thinks, so "sign out everywhere" cannot be honoured. A row
 * can be deleted.
 *
 * The cookie holds a random token; the table holds only its hash, so read
 * access to the database does not grant the ability to mint a session.
 */

export {
  SESSION_COOKIE,
  ADMIN_FLAG_COOKIE,
  SESSION_TTL_MS,
} from "./constants";

export interface SessionUser {
  id: string;
  email: string;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** 256 bits of entropy; brute force is not a consideration. */
function newToken(): string {
  return randomBytes(32).toString("hex");
}

export async function createSession(
  userId: string,
  userAgent: string | null,
): Promise<{ token: string; expiresAt: Date }> {
  const token = newToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.adminSession.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      userAgent: userAgent?.slice(0, 300) ?? null,
    },
  });

  return { token, expiresAt };
}

/**
 * Resolves the current session, or null.
 *
 * An expired row is deleted on sight rather than merely ignored, so the table
 * prunes itself through ordinary use and never needs a scheduled cleanup.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  // A database failure must fail closed, not throw. Letting the error escape
  // renders a 500 on every admin route the moment the database is unreachable —
  // including the redirect that would otherwise send the visitor to the login
  // page. Treating "cannot verify" as "not signed in" is both safer and the
  // more useful behaviour.
  const session = await prisma.adminSession
    .findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: { select: { id: true, email: true } } },
    })
    .catch((error) => {
      console.error("[auth] could not verify session:", error);
      return null;
    });

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.adminSession
      .delete({ where: { id: session.id } })
      .catch(() => {
        /* already gone — nothing to clean up */
      });
    return null;
  }

  return session.user;
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.adminSession
      .deleteMany({ where: { tokenHash: hashToken(token) } })
      .catch(() => {
        /* best effort: the cookie is cleared regardless */
      });
  }
  store.delete(SESSION_COOKIE);
  store.delete(ADMIN_FLAG_COOKIE);
}

/** Cookie options shared by the routes that set them. */
export function sessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // Lax rather than Strict: Strict would drop the cookie when arriving at
    // /admin from an external link, which reads as a random logout.
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}

/**
 * Companion cookie, deliberately readable by client JS.
 *
 * Its only job is to let the tracking beacon recognise the site owner and stay
 * silent. It grants nothing — the httpOnly session cookie is what authorises.
 */
export function adminFlagCookieOptions(expiresAt: Date) {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}
