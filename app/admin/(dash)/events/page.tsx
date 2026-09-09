import RangePicker from "@/components/admin/RangePicker";
import { BarList, Card, CardTitle, EmptyState, Stat } from "@/components/admin/ui";
import { getBreakdown, getEventCounts, getEventTotals } from "@/lib/analytics/queries";
import { load, rangeFromParams } from "@/lib/analytics/page-helpers";
import { PROJECTS } from "@/constants";

export const dynamic = "force-dynamic";
export const metadata = { title: "Events" };

/** Slugs are what the beacon sends; the dashboard should show real titles. */
const PROJECT_TITLES = new Map(
  PROJECTS.map((p) => [p.slug, p.title.split(" - ")[0] ?? p.slug]),
);

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const range = rangeFromParams(await searchParams);

  const { data, error } = await load(async () => {
    const [totals, projects, outbound, downloads, browsers, os] =
      await Promise.all([
        getEventTotals(range),
        getEventCounts(range, "project_open", 20),
        getEventCounts(range, "outbound_click", 15),
        getEventCounts(range, "cv_download", 5),
        getBreakdown(range, "browser", 8),
        getBreakdown(range, "os", 8),
      ]);
    return { totals, projects, outbound, downloads, browsers, os };
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="display d-sm text-ink">Events</h1>
        <RangePicker active={range.key} basePath="/admin/events" />
      </div>

      {error ? (
        <EmptyState title="Events are not available" hint={error} />
      ) : !data ? null : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="CV downloads" value={data.totals.cv_download ?? 0} />
            <Stat label="Projects opened" value={data.totals.project_open ?? 0} />
            <Stat label="Outbound clicks" value={data.totals.outbound_click ?? 0} />
            <Stat label="Messages sent" value={data.totals.contact_submit ?? 0} />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Card>
              <CardTitle>Projects by opens</CardTitle>
              <BarList
                rows={data.projects.map((e) => ({
                  label: e.name ?? "Unknown",
                  count: e.count,
                }))}
                formatLabel={(slug) => PROJECT_TITLES.get(slug) ?? slug}
                empty="Nobody has opened a project in this period."
              />
            </Card>

            <Card>
              <CardTitle>Outbound clicks</CardTitle>
              <BarList
                rows={data.outbound.map((e) => ({
                  label: e.name ?? "Unknown",
                  count: e.count,
                }))}
                empty="No outbound clicks in this period."
              />
            </Card>

            <Card>
              <CardTitle>Browsers</CardTitle>
              <BarList rows={data.browsers} empty="No data yet." />
            </Card>

            <Card>
              <CardTitle>Operating systems</CardTitle>
              <BarList rows={data.os} empty="No data yet." />
            </Card>
          </div>

          {(data.totals.cv_download ?? 0) === 0 && (
            <p className="mt-6 text-sm text-ink-dim">
              A CV download is the strongest signal a recruiter leaves. It is
              recorded when someone clicks Download CV on the home page.
            </p>
          )}
        </>
      )}
    </>
  );
}
