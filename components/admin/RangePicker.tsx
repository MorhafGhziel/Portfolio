import Link from "next/link";
import { RANGES, RANGE_LABELS, type RangeKey } from "@/lib/analytics/range";

/**
 * The time-window switcher.
 *
 * Plain links rather than a client component with state: the range lives in the
 * URL, which makes every view shareable and bookmarkable, survives a refresh,
 * and costs no JavaScript. `scroll={false}` keeps the page from jumping to the
 * top when only the numbers below have changed.
 */
export default function RangePicker({
  active,
  basePath,
}: {
  active: RangeKey;
  basePath: string;
}) {
  return (
    <nav
      className="flex flex-wrap gap-1.5"
      aria-label="Time range"
    >
      {RANGES.map((key) => {
        const selected = key === active;
        return (
          <Link
            key={key}
            href={`${basePath}?range=${key}`}
            scroll={false}
            aria-current={selected ? "page" : undefined}
            title={RANGE_LABELS[key]}
            className={`rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
              selected
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-line text-ink-muted hover:border-line-2 hover:text-ink"
            }`}
          >
            {key}
          </Link>
        );
      })}
    </nav>
  );
}
