import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { COPY } from "@/content/copy";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/content/types";
import { LOCALES, imageSize, mediaFor, nextProject, projectBySlug } from "@/lib/site";
import Title from "@/components/site/Title";
import AutoVideo from "@/components/site/AutoVideo";

export const dynamicParams = false;
export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => PROJECTS.map((p) => ({ lang, slug: p.slug })));

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const p = projectBySlug(slug);
  if (!p) return {};
  return {
    title: p.name[lang],
    description: p.summary[lang],
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, ar: `/ar/work/${slug}` },
    },
    openGraph: { title: p.name[lang], description: p.summary[lang], type: "article" },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const p = projectBySlug(slug);
  if (!p) notFound();
  const c = COPY[lang].caseStudy;
  const kind = COPY[lang].work.kind[p.kind];
  const m = mediaFor(p);
  const next = nextProject(slug);
  const nm = mediaFor(next);
  const [keyVisual, ...screens] = p.gallery;
  const hasIdea = !!p.idea;

  const info: [string, React.ReactNode][] = [
    [p.client ? c.client : c.personal, p.client ? p.client[lang] : "—"],
    [c.year, <span dir="ltr" key="y">{p.year}</span>],
    [c.role, p.role[lang]],
    [c.services, p.services[lang].join(", ")],
  ];

  return (
    <article className="case">
      <header className="case__hero">
        <div className="case__media" style={{ viewTransitionName: `media-${p.slug}` }}>
          <Image src={m.poster} alt="" fill priority sizes="100vw" />
          {m.mp4 && <AutoVideo mp4={m.mp4} webm={m.webm} poster={m.poster} />}
        </div>
        <div className="case__heading wrap">
          <p className="mono case__kind">
            {kind} · <span dir="ltr">{p.year}</span>
          </p>
          <Title as="h1" text={`${p.name[lang]}\n*${p.headline[lang]}*`} className="case__title" />
          <p className="case__summary">{p.summary[lang]}</p>
        </div>
      </header>

      <div className="wrap">
        <dl className="case__info" data-fade="" data-reveal="">
          {info.map(([k, v]) => (
            <div key={k}>
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div>
            <dt className="mono">{c.stack}</dt>
            <dd dir="ltr" className="case__stack">
              {p.stack.join(" · ")}
            </dd>
          </div>
        </dl>
          {(p.liveUrl || p.codeUrl) && (
          <div className="case__links" data-fade="" data-reveal="">
            {p.liveUrl && (
              <a className="btn btn--light" href={p.liveUrl} target="_blank" rel="noopener">
                {c.live} ↗
              </a>
            )}
            {p.codeUrl && (
              <a className="btn btn--ghost" href={p.codeUrl} target="_blank" rel="noopener">
                {c.code} ↗
              </a>
            )}
          </div>
        )}

        {(p.challenge || p.idea) && (
          <section className="case__story">
            {p.challenge && (
              <div className="case__block">
                <h2 className="mono">{c.challenge}</h2>
                <p data-fade="" data-reveal="">{p.challenge[lang]}</p>
              </div>
            )}
            {hasIdea && (
              <div className="case__block">
                <h2 className="mono">{c.idea}</h2>
                <p data-fade="" data-reveal="">{p.idea![lang]}</p>
              </div>
            )}
          </section>
        )}

        <details className="case__notes">
          <summary>
            <span>{c.notes}</span>
            <i aria-hidden="true" />
          </summary>
          <div>
            {p.notes[lang].split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </details>

        {keyVisual && (
          <figure className="case__shot case__shot--full media" data-reveal="">
            <Image src={keyVisual} alt={`${p.name[lang]}`} {...imageSize(keyVisual)} sizes="(max-width: 1680px) 100vw, 1600px" />
          </figure>
        )}

        {screens.length > 0 && (
          <section className="case__screens" aria-label={c.screens}>
            <h2 className="mono case__label">{c.screens}</h2>
            <div className="case__gallery">
              {screens.map((src, i) => (
                <figure
                  key={src}
                  className={`case__shot media ${i % 3 === 2 || (i === screens.length - 1 && i % 3 === 0) ? "case__shot--full" : ""}`}
                  data-reveal=""
                >
                  <Image src={src} alt={`${p.name[lang]} — ${i + 2}`} {...imageSize(src)} sizes="(max-width: 760px) 100vw, 50vw" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {m.mp4 && (
          <section className="case__motion" aria-label={c.motion}>
            <h2 className="mono case__label">{c.motion}</h2>
            <div className="case__shot case__shot--full media" data-reveal="">
              <AutoVideo mp4={m.mp4} webm={m.webm} poster={m.poster} rate={1} />
            </div>
          </section>
        )}

        {m.mobile.length > 1 && (
          <section className="case__mobile" aria-label={c.mobile}>
            <h2 className="mono case__label">{c.mobile}</h2>
            <div className="case__phones">
              {m.mobile.map((src, i) => (
                <figure key={src} className="phone media" data-reveal="" style={{ ["--i" as string]: i }}>
                  <Image src={src} alt={`${p.name[lang]} — ${c.mobile} ${i + 1}`} width={780} height={1688} sizes="(max-width: 760px) 70vw, 26vw" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {p.results && p.results[lang].length > 0 && (
          <section className="case__results">
            <h2 className="mono case__label">{c.results}</h2>
            <ul>
              {p.results[lang].map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Link href={`/${lang}/work/${next.slug}`} className="next" data-cursor="VIEW">
        <span className="wrap next__head">
          <span className="mono">{c.next}</span>
          <span className="next__name">{next.name[lang]}</span>
        </span>
        <span className="next__media" style={{ viewTransitionName: `media-${next.slug}` }}>
          <Image src={nm.poster} alt="" fill sizes="100vw" />
        </span>
      </Link>

      <a className="btn btn--light sticky-cta" href={`/${lang}#contact`}>
        {c.start}
      </a>
    </article>
  );
}
