import RangePicker from "@/components/admin/RangePicker";
import {
  BarList,
  Card,
  CardTitle,
  EmptyState,
  countryFlag,
  countryName,
} from "@/components/admin/ui";
import { getBreakdown } from "@/lib/analytics/queries";
import { load, rangeFromParams } from "@/lib/analytics/page-helpers";
import { referrerLabel } from "@/lib/analytics/referrer";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sources" };

export default async function SourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const range = rangeFromParams(await searchParams);

  const { data, error } = await load(async () => {
    const [referrers, sources, campaigns, mediums, countries, cities, locales] =
      await Promise.all([
        getBreakdown(range, "referrerHost", 15, { includeNull: true }),
        getBreakdown(range, "utmSource", 10),
        getBreakdown(range, "utmCampaign", 10),
        getBreakdown(range, "utmMedium", 10),
        getBreakdown(range, "country", 15),
        getBreakdown(range, "city", 15),
        getBreakdown(range, "locale", 5),
      ]);
    return { referrers, sources, campaigns, mediums, countries, cities, locales };
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="display d-sm text-ink">Sources</h1>
        <RangePicker active={range.key} basePath="/admin/sources" />
      </div>

      {error ? (
        <EmptyState title="Sources are not available" hint={error} />
      ) : !data ? null : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardTitle>Referrers</CardTitle>
            <BarList
              rows={data.referrers}
              formatLabel={(l) => referrerLabel(l || null)}
              empty="No traffic in this period."
            />
          </Card>

          <Card>
            <CardTitle>Campaigns</CardTitle>
            {data.campaigns.length === 0 && data.sources.length === 0 ? (
              <p className="py-4 text-sm text-ink-dim">
                No tagged links yet. Add{" "}
                <code className="font-mono text-[0.75rem] text-ink-muted">
                  ?utm_source=linkedin&amp;utm_campaign=acme
                </code>{" "}
                to a link in an application, and opens of that exact link show
                up here.
              </p>
            ) : (
              <div className="space-y-5">
                <BarList rows={data.campaigns} empty="No campaigns tagged." />
                {data.sources.length > 0 && (
                  <div>
                    <p className="eyebrow mb-2 text-ink-dim">utm_source</p>
                    <BarList rows={data.sources} />
                  </div>
                )}
                {data.mediums.length > 0 && (
                  <div>
                    <p className="eyebrow mb-2 text-ink-dim">utm_medium</p>
                    <BarList rows={data.mediums} />
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card>
            <CardTitle>Countries</CardTitle>
            <BarList
              rows={data.countries}
              formatLabel={(l) => `${countryFlag(l)} ${countryName(l)}`.trim()}
              empty="No location data yet."
            />
          </Card>

          <Card>
            <CardTitle>Cities</CardTitle>
            <BarList rows={data.cities} empty="No city data yet." />
          </Card>

          <Card className="lg:col-span-2">
            <CardTitle>Language read</CardTitle>
            <BarList
              rows={data.locales}
              formatLabel={(l) =>
                l === "ar" ? "Arabic" : l === "en" ? "English" : l
              }
              empty="No language data yet."
            />
          </Card>
        </div>
      )}
    </>
  );
}
