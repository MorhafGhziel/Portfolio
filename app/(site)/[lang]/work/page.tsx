import type { Metadata } from "next";
import { COPY } from "@/content/copy";
import type { Locale } from "@/content/types";
import { allProjects, toCard } from "@/lib/site";
import Title from "@/components/site/Title";
import WorkGrid from "@/components/site/WorkGrid";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const m = COPY[lang].meta;
  return {
    title: m.workTitle,
    description: m.workDescription,
    alternates: { canonical: `/${lang}/work`, languages: { en: "/en/work", ar: "/ar/work" } },
  };
}

export default async function WorkPage({ params }: Params) {
  const { lang } = (await params) as { lang: Locale };
  const c = COPY[lang].work;
  const cards = allProjects().map((p) => toCard(p, lang));
  return (
    <section className="section section--page" aria-labelledby="all-work">
      <div className="wrap">
        <div className="page-head">
          <Title as="h1" id="all-work" text={c.pageTitle} className="page-head__title" />
          <p className="page-head__lead" data-fade="" data-reveal="">
            {c.pageLead}
          </p>
        </div>
        <WorkGrid cards={cards} lang={lang} copy={c} allowList eagerFirst />
      </div>
    </section>
  );
}
