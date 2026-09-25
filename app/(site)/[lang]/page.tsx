import { Link } from "next-view-transitions";
import { COPY } from "@/content/copy";
import { SETTINGS } from "@/content/settings";
import type { Locale } from "@/content/types";
import { allProjects, featuredProjects, mediaFor, reelMedia, toCard } from "@/lib/site";
import Hero from "@/components/site/Hero";
import Reel from "@/components/site/Reel";
import Title from "@/components/site/Title";
import WorkGrid from "@/components/site/WorkGrid";
import Services from "@/components/site/Services";
import Contact from "@/components/site/Contact";
import Horizon from "@/components/site/Horizon";

const TOOLS = [
  "Figma",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "GSAP",
  "Three.js",
  "WebGL",
  "Vercel",
];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const c = COPY[lang];
  const reel = reelMedia();
  const cards = featuredProjects().map((p) => toCard(p, lang));
  const related = Object.fromEntries(
    allProjects().map((p) => [p.slug, { name: p.name[lang], poster: mediaFor(p).poster }]),
  );

  return (
    <>
      <Hero lang={lang} copy={c.hero} />

      {reel?.mp4 && <Reel copy={c.reel} src={{ mp4: reel.mp4, webm: reel.webm, poster: reel.poster }} />}

      {/* 03 — Selected work */}
      <section id="work" className="section section--work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section__head">
            <Title id="work-title" text={c.work.title} />
          </div>
          <WorkGrid cards={cards} lang={lang} copy={c.work} />
          <div className="work__more">
            <Link className="btn btn--ghost" href={`/${lang}/work`}>
              {c.work.viewAll} <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — Services */}
      <section id="services" className="section" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section__head">
            <Title id="services-title" text={c.services.title} />
          </div>
          <Services copy={c.services} projects={related} />
        </div>
      </section>

      {/* 05 — Process */}
      <section className="section section--tight" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section__head">
            <Title id="process-title" text={c.process.title} />
          </div>
          <ol className="process" data-reveal="">
            {c.process.steps.map((s, i) => (
              <li key={s.name} style={{ ["--i" as string]: i }}>
                <span className="mono">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 — About */}
      <section id="about" className="section" aria-labelledby="about-title">
        <div className="wrap about">
          <figure className="about__photo media" data-reveal="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/me.png" alt={c.about.portraitAlt} width={1048} height={1022} loading="lazy" />
          </figure>
          <div className="about__text">
            <Title id="about-title" text={c.about.title} />
            <div className="about__lines" data-fade="" data-reveal="">
              {c.about.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <dl className="about__meta">
              <div>
                <dt className="mono">{c.about.tools}</dt>
                <dd dir="ltr">{TOOLS.join(", ")}</dd>
              </div>
              <div>
                <dt className="mono">{c.about.elsewhere}</dt>
                <dd className="about__links">
                  {SETTINGS.socials.map((s) => (
                    <a key={s.key} href={s.href} target="_blank" rel="noopener">
                      {s.label}
                    </a>
                  ))}
                  <a href={SETTINGS.cvUrl} download>
                    {c.about.cv}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 07 — Contact: the horizon again, after dark */}
      <section id="contact" className="contact" aria-labelledby="contact-title">
        <Horizon variant="night" />
        <div className="wrap contact__inner">
          <Title id="contact-title" text={c.contact.title} className="contact__title" />
          <Contact lang={lang} copy={c.contact} />
        </div>
      </section>
    </>
  );
}
