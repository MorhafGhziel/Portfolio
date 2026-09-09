import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import SignOutButton from "@/components/admin/SignOutButton";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard" },
  robots: { index: false, follow: false },
};

// Every page here reads live data, so none of it may be prerendered or cached.
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/sources", label: "Sources" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/messages", label: "Messages" },
];

/**
 * The real authorization boundary.
 *
 * middleware.ts only checks that a session cookie exists — it runs on the Edge
 * runtime where Prisma cannot follow. This layout looks the token up in the
 * database, so a forged or revoked cookie gets no further than here. Every page
 * in the group renders as a child of this, so there is no route that can
 * accidentally skip the check.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
          <Link href="/admin" className="display d-sm text-ink">
            Dashboard
          </Link>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Sections">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-ink-dim transition-colors duration-300 hover:text-ink"
            >
              View site
            </Link>
            <span className="hidden text-sm text-ink-dim sm:inline">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-8">{children}</main>
    </div>
  );
}
