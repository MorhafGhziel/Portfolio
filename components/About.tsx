"use client";

import Image from "next/image";
import { SKILL_GROUPS } from "@/constants";
import { useLanguage } from "./LanguageContext";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

/**
 * The one light section. Flipping the page here does two things: it breaks
 * an otherwise unbroken wall of black, and it makes the portrait read as an
 * editorial photograph rather than a widget floating on a dark card.
 */
export default function About() {
  const { t } = useLanguage();

  const facts = [
    { label: t("about.facts.based"), value: t("about.facts.basedValue") },
    { label: t("about.facts.remote"), value: t("about.facts.remoteValue") },
    { label: t("about.facts.timezone"), value: t("about.facts.timezoneValue") },
    {
      label: t("about.facts.languages"),
      value: t("about.facts.languagesValue"),
    },
    { label: t("about.facts.status"), value: t("about.facts.statusValue") },
  ];

  return (
    <section
      id="about"
      data-band="light"
      className="bg-bone py-28 text-ink md:py-40"
    >
      <div className="shell">
        <SectionHead
          inverted
          index={t("about.index")}
          eyebrow={t("about.eyebrow")}
          heading={t("about.heading")}
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Portrait + facts */}
          <div className="lg:col-span-5">
            <Reveal className="group overflow-hidden rounded-[12px] border border-ink/10">
              <Image
                src="/images/me.png"
                alt={t("hero.alt")}
                width={900}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="tone-warm h-full w-full object-cover object-[50%_20%]"
                style={{ aspectRatio: "4 / 5" }}
              />
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <p className="eyebrow text-ink/45">{t("about.factsTitle")}</p>
              <dl className="mt-5 border-t border-ink/12">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-ink/12 py-4"
                  >
                    <dt className="text-sm text-ink/50">{fact.label}</dt>
                    <dd className="text-sm text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Prose + skills */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="max-w-[58ch] space-y-6">
                <p className="body-lg text-ink">{t("about.p1")}</p>
                <p className="body-lg text-ink/70">{t("about.p2")}</p>
                <p className="body-lg text-ink/70">{t("about.p3")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-ink/12 pt-6">
                <p className="eyebrow text-copper-deep">
                  {t("about.skillsTitle")}
                </p>
                <p className="max-w-[38ch] text-sm text-ink/45">
                  {t("about.skillsNote")}
                </p>
              </div>

              <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.key}>
                    <h3 className="eyebrow border-b border-ink/12 pb-3 text-ink/45">
                      {t(`about.groups.${group.key}`)}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="text-[0.9375rem] text-ink/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
