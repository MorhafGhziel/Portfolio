"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Two-step sign-in: ask for a code, then enter it.
 *
 * The form never says whether an address is allowed — the server returns the
 * same response either way, and this mirrors that by advancing to the code step
 * regardless. Anything else would turn the form into a way to enumerate admin
 * addresses.
 */
export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };

      // 429 and 500 are real failures worth surfacing; everything else advances.
      if (res.status === 429 || res.status >= 500) {
        setError(data.message ?? "Could not send the code. Try again.");
        return;
      }
      setNotice(data.message ?? "If that address can sign in, a code is on its way.");
      setStep("code");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        setError(data.message ?? "That code is not valid.");
        return;
      }

      // refresh() re-runs the server layout so the new cookie is picked up
      // before the redirect lands, avoiding a bounce back to /admin/login.
      router.replace(next);
      router.refresh();
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-[4px] border border-line bg-canvas px-4 py-3 text-ink " +
    "placeholder:text-ink-dim focus:border-accent/60 focus:outline-none";

  const button =
    "w-full rounded-[4px] bg-ink px-4 py-3 text-sm font-medium text-canvas " +
    "transition-opacity duration-300 hover:opacity-90 disabled:opacity-50";

  return (
    <div className="w-full max-w-sm">
      <h1 className="display d-sm text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-ink-muted">
        {step === "email"
          ? "Sign in with a one-time code."
          : "Enter the 6-digit code from your email."}
      </p>

      {step === "email" ? (
        <form onSubmit={requestCode} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="eyebrow mb-2 block text-ink-dim">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={field}
            />
          </div>
          <button type="submit" disabled={busy || !email} className={button}>
            {busy ? "Sending…" : "Send code"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-8 space-y-4">
          <div>
            <label htmlFor="code" className="eyebrow mb-2 block text-ink-dim">
              Code
            </label>
            <input
              id="code"
              // inputMode surfaces the numeric keypad on phones; one-time-code
              // lets iOS and Android autofill it straight from the email.
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              maxLength={6}
              required
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className={`${field} text-center font-mono text-2xl tracking-[0.4em]`}
            />
          </div>
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className={button}
          >
            {busy ? "Checking…" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError(null);
              setNotice(null);
            }}
            className="w-full text-center text-sm text-ink-dim transition-colors hover:text-ink"
          >
            Use a different email
          </button>
        </form>
      )}

      {notice && !error && (
        <p className="mt-4 text-sm text-ink-muted" role="status">
          {notice}
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
