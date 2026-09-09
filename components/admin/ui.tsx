import Link from "next/link";

/**
 * The dashboard's shared presentational pieces.
 *
 * All server components — none of this needs interactivity, so none of it ships
 * JavaScript. Colours come from the site's own tokens in globals.css, so the
 * dashboard follows the light/dark theme without a second palette to maintain.
 */

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[6px] border border-line bg-surface p-5 ${className}`}
    >
      {children}
    </section>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="eyebrow mb-4 text-ink-dim">{children}</h2>
  );
}

/**
 * A headline number with its period-over-period movement.
 *
 * A null delta renders as a dash rather than a zero: "no comparison available"
 * and "no change" are different facts and the dashboard should not conflate
 * them.
 */
export function Stat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string | number;
  delta?: number | null;
}) {
  const tone =
    delta == null
      ? "text-ink-dim"
      : delta > 0
        ? "text-accent"
        : delta < 0
          ? "text-ink-muted"
          : "text-ink-dim";

  return (
    <div className="rounded-[6px] border border-line bg-surface p-5">
      <div className="eyebrow text-ink-dim">{label}</div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="display d-sm tabular-nums text-ink">{value}</span>
        {delta !== undefined && (
          <span className={`font-mono text-[0.6875rem] tabular-nums ${tone}`}>
            {delta == null ? "—" : `${delta > 0 ? "+" : ""}${delta}%`}
          </span>
        )}
      </div>
    </div>
  );
}

export interface BarRow {
  label: string;
  count: number;
  href?: string;
}

/**
 * A ranked list with the proportion drawn behind each row.
 *
 * Bars are scaled against the largest value in the list rather than the total:
 * with a long tail, share-of-total makes every row a sliver and the comparison
 * that actually matters — this one against the top one — becomes unreadable.
 */
export function BarList({
  rows,
  empty = "Nothing yet.",
  formatLabel,
}: {
  rows: BarRow[];
  empty?: string;
  formatLabel?: (label: string) => string;
}) {
  if (rows.length === 0) {
    return <p className="py-6 text-sm text-ink-dim">{empty}</p>;
  }

  const max = Math.max(...rows.map((r) => r.count), 1);

  return (
    <ul className="space-y-1">
      {rows.map((row) => {
        const pct = Math.max(2, Math.round((row.count / max) * 100));
        const label = formatLabel ? formatLabel(row.label) : row.label;
        return (
          <li key={`${row.label}-${row.count}`} className="relative">
            <div
              className="absolute inset-y-0 left-0 rounded-[3px] bg-accent/12"
              style={{ width: `${pct}%` }}
              aria-hidden
            />
            <div className="relative flex items-center justify-between gap-4 px-2 py-1.5">
              <span className="truncate text-sm text-ink" title={label}>
                {row.href ? (
                  <Link href={row.href} className="ulink">
                    {label || "—"}
                  </Link>
                ) : (
                  label || "—"
                )}
              </span>
              <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-ink-muted">
                {row.count.toLocaleString()}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="rounded-[6px] border border-dashed border-line-2 px-6 py-12 text-center">
      <p className="text-sm text-ink">{title}</p>
      {hint && <p className="mt-2 text-sm text-ink-dim">{hint}</p>}
    </div>
  );
}

/** ISO country code to flag emoji, by offsetting into the regional indicators. */
export function countryFlag(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return "";
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

const REGION_NAMES =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

export function countryName(code: string): string {
  if (!code) return "Unknown";
  try {
    return REGION_NAMES?.of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}
