import RangePicker from "@/components/admin/RangePicker";
import TrendChart from "@/components/admin/TrendChart";
import LiveBadge from "@/components/admin/LiveBadge";
import {
  BarList,
  Card,
  CardTitle,
  EmptyState,
  Stat,
  countryFlag,
  countryName,
} from "@/components/admin/ui";
import {
  getBreakdown,
  getLive,
  getSeries,
  getSummary,
  hasAnyData,
} from "@/lib/analytics/queries";
import { load, rangeFromParams } from "@/lib/analytics/page-helpers";
import { referrerLabel } from "@/lib/analytics/referrer";
import { RANGE_LABELS } from "@/lib/analytics/range";

export const dynamic = "force-dynamic";

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const range = rangeFromParams(await searchParams);

  // One round trip for everything on the page. Sequential awaits here would
  // stack six query latencies on top of each other.
  const { data, error } = await load(async () => {
    const [summary, series, pages, referrers, countries, devices, live, any] =
      await Promise.all([
        getSummary(range),
        getSeries(range),
        getBreakdown(range, "path", 8, { pageviewsOnly: true }),
        getBreakdown(range, "referrerHost", 8, { includeNull: true }),
        getBreakdown(range, "country", 8),
        getBreakdown(range, "device", 3),
        getLive(),
        hasAnyData(),
      ]);
    return { summary, series, pages, referrers, countries, devices, live, any };
  });

  if (error) {
    return (
      <>
        <Header rangeKey={range.key} />
        <EmptyState title="Analytics are not available" hint={error} />
      </>
    );
  }
  if (!data) return null;

  if (!data.any) {
    return (
      <>
        <Header rangeKey={range.key} />
        <EmptyState
          title="No visits recorded yet."
          hint="The tracker is live. Open your site in a browser where you are not signed in to the dashboard, and the first visit will appear here within seconds."
        />
      </>
    );
  }

  const { summary, series, pages, referrers, countries, devices, live } = data;

  return (
    <>
      <Header rangeKey={range.key} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Visitors" value={summary.visitors.toLocaleString()} delta={summary.deltas.visitors} />
        <Stat label="Page views" value={summary.pageviews.toLocaleString()} delta={summary.deltas.pageviews} />
        <Stat label="Sessions" value={summary.sessions.toLocaleString()} delta={summary.deltas.sessions} />
        <Stat label="Pages / session" value={summary.pagesPerSession} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardTitle>{RANGE_LABELS[range.key]}</CardTitle>
          <TrendChart series={series} bucket={range.bucket} />
        </Card>
        <LiveBadge initial={live} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Top pages</CardTitle>
          <BarList rows={pages} empty="No page views in this period." />
        </Card>

        <Card>
          <CardTitle>Sources</CardTitle>
          <BarList
            rows={referrers}
            formatLabel={(l) => referrerLabel(l || null)}
            empty="No traffic in this period."
          />
        </Card>

        <Card>
          <CardTitle>Countries</CardTitle>
          <BarList
            rows={countries}
            formatLabel={(l) => `${countryFlag(l)} ${countryName(l)}`.trim()}
            empty="No location data yet."
          />
        </Card>

        <Card>
          <CardTitle>Devices</CardTitle>
          <BarList
            rows={devices}
            formatLabel={(l) => l.charAt(0).toUpperCase() + l.slice(1)}
            empty="No device data yet."
          />
        </Card>
      </div>
    </>
  );
}

function Header({ rangeKey }: { rangeKey: Parameters<typeof RangePicker>[0]["active"] }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="display d-sm text-ink">Overview</h1>
      <RangePicker active={rangeKey} basePath="/admin" />
    </div>
  );
}
