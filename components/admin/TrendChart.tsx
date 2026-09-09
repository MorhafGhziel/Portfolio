import type { SeriesPoint } from "@/lib/analytics/queries";
import type { Bucket } from "@/lib/analytics/range";

/**
 * The trend line, drawn as inline SVG.
 *
 * No charting library: the whole requirement is two series on one time axis,
 * which is about forty lines of path arithmetic. A library would add ~50kB to
 * the bundle, ship its own theme to fight with the site's tokens, and still
 * need this much configuration.
 *
 * A server component, so it costs no client JavaScript at all.
 */

const W = 1000;
const H = 260;
const PAD = { top: 16, right: 8, bottom: 28, left: 40 };

function niceCeiling(max: number): number {
  // Round the axis up to something a person would choose, so gridline labels
  // read 40/80/120 rather than 37/74/111.
  if (max <= 5) return 5;
  const magnitude = 10 ** Math.floor(Math.log10(max));
  const steps = [1, 2, 2.5, 5, 10];
  for (const step of steps) {
    const candidate = step * magnitude;
    if (candidate >= max) return candidate;
  }
  return 10 * magnitude;
}

function formatTick(t: number, bucket: Bucket): string {
  const d = new Date(t);
  if (bucket === "hour") {
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function TrendChart({
  series,
  bucket,
}: {
  series: SeriesPoint[];
  bucket: Bucket;
}) {
  if (series.length < 2) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-ink-dim">
        Not enough data to draw a trend yet.
      </div>
    );
  }

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const peak = Math.max(...series.map((p) => Math.max(p.pageviews, p.visitors)), 1);
  const top = niceCeiling(peak);

  const x = (i: number) => PAD.left + (i / (series.length - 1)) * innerW;
  const y = (v: number) => PAD.top + innerH - (v / top) * innerH;

  const line = (key: "visitors" | "pageviews") =>
    series.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(" ");

  // The filled area sits under the views line; closing it along the baseline
  // is what turns the stroke into a shape.
  const area =
    `${line("pageviews")} L ${x(series.length - 1).toFixed(1)} ${y(0).toFixed(1)}` +
    ` L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;

  const gridlines = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    v: Math.round(top * f),
    y: y(top * f),
  }));

  // At most six labels, whatever the bucket count, or they collide.
  const tickEvery = Math.max(1, Math.ceil(series.length / 6));

  const totalViews = series.reduce((sum, p) => sum + p.pageviews, 0);
  const totalVisitors = series.reduce((sum, p) => sum + p.visitors, 0);

  return (
    <figure className="m-0">
      <figcaption className="mb-3 flex items-center gap-5 text-[0.6875rem] text-ink-muted">
        <span className="flex items-center gap-2">
          <span className="h-[2px] w-4 bg-accent" aria-hidden />
          Page views
        </span>
        <span className="flex items-center gap-2">
          <span className="h-[2px] w-4 bg-ink-dim" aria-hidden />
          Visitors
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-[260px] w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Trend over the selected period: ${totalViews} page views from ${totalVisitors} visitors.`}
      >
        {gridlines.map((g) => (
          <g key={g.v}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={g.y}
              y2={g.y}
              stroke="currentColor"
              strokeWidth={1}
              className="text-line"
            />
            {/* vectorEffect keeps hairlines 1px despite the non-uniform scale */}
            <text
              x={PAD.left - 8}
              y={g.y + 3}
              textAnchor="end"
              className="fill-ink-dim font-mono text-[10px]"
            >
              {g.v}
            </text>
          </g>
        ))}

        <path d={area} className="fill-accent/10" />
        <path
          d={line("pageviews")}
          fill="none"
          strokeWidth={2}
          className="stroke-accent"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={line("visitors")}
          fill="none"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          className="stroke-ink-dim"
          vectorEffect="non-scaling-stroke"
        />

        {series.map((p, i) =>
          i % tickEvery === 0 || i === series.length - 1 ? (
            <text
              key={p.t}
              x={x(i)}
              y={H - 8}
              textAnchor={i === 0 ? "start" : i === series.length - 1 ? "end" : "middle"}
              className="fill-ink-dim font-mono text-[10px]"
            >
              {formatTick(p.t, bucket)}
            </text>
          ) : null,
        )}
      </svg>
    </figure>
  );
}
