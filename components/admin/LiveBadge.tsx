"use client";

import { useEffect, useState } from "react";

interface Live {
  visitors: number;
  pages: { label: string; count: number }[];
  countries: { label: string; count: number }[];
}

/**
 * Visitors in the last five minutes.
 *
 * Polls rather than holding a socket open: a server-sent stream would keep a
 * serverless function running for the life of the tab, which on Vercel is
 * billed by the second and capped in duration. A request every 20 seconds costs
 * nothing and is well inside the resolution anyone reads this at.
 *
 * Polling pauses while the tab is hidden, so a dashboard left open overnight
 * does not make 4,000 pointless requests.
 */
export default function LiveBadge({ initial }: { initial: Live }) {
  const [live, setLive] = useState<Live>(initial);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/admin/live", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as Live;
        if (!cancelled) {
          setLive(data);
          setStale(false);
        }
      } catch {
        // Show the last known value marked stale rather than a zero, which
        // would read as "nobody is here" when it means "we could not ask".
        if (!cancelled) setStale(true);
      }
    }

    const id = setInterval(poll, 20_000);
    const onVisible = () => {
      if (!document.hidden) void poll();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <div className="rounded-[6px] border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-ink-dim">Right now</span>
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            live.visitors > 0 && !stale ? "bg-accent" : "bg-line-2"
          }`}
          aria-hidden
        />
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="display d-sm tabular-nums text-ink">
          {live.visitors}
        </span>
        <span className="text-sm text-ink-muted">
          {live.visitors === 1 ? "visitor" : "visitors"}
        </span>
      </div>

      <p className="mt-1 text-[0.6875rem] text-ink-dim">
        {stale ? "Reconnecting…" : "In the last 5 minutes"}
      </p>

      {live.pages.length > 0 && (
        <ul className="mt-4 space-y-1 border-t border-line pt-3">
          {live.pages.map((p) => (
            <li
              key={p.label}
              className="flex items-center justify-between gap-3 text-[0.8125rem]"
            >
              <span className="truncate text-ink-muted">{p.label}</span>
              <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-ink-dim">
                {p.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
