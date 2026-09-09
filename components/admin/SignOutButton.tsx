"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } catch {
          // The session row may survive, but the redirect below still gets the
          // user out of the dashboard on this device.
        }
        router.replace("/admin/login");
        router.refresh();
      }}
      className="text-sm text-ink-dim transition-colors duration-300 hover:text-ink disabled:opacity-50"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
