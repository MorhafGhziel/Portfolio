import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  // A private surface has no business in a search index.
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  // Only same-site paths are honoured. Reflecting an arbitrary ?next= would
  // make this an open redirect that lends the domain's credibility to a
  // phishing destination.
  const target =
    next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas px-6">
      <LoginForm next={target} />
    </main>
  );
}
