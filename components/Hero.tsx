"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { scrollToId } from "./SmoothScroll";
import { ActionButton } from "./ui/Action";
import { RevealWords } from "./ui/Reveal";

type HeroProps = {
  projectCount: number;
  clientCount: number;
  years: number;
};

export default function Hero({ projectCount, clientCount, years }: HeroProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // The headline drifts a little slower than the page. Just enough depth
  // to feel alive; not enough to notice as an "effect".
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const ledger = [
    { value: pad(years), label: t("ledger.years") },
    { value: pad(projectCount), label: t("ledger.projects") },
    { value: pad(clientCount), label: t("ledger.clients") },
    { value: t("ledger.replyValue"), label: t("ledger.reply") },
  ];

  return (
    <section
      ref={ref}
      id="home"
      className="grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <div className="shell">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-muted"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span
              className="dot-live absolute inset-0 rounded-full text-accent"
              aria-hidden
            />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-accent">{t("status.available")}</span>
          <span className="text-ink-dim" aria-hidden>
            /
          </span>
          <span>{t("status.location")}</span>
        </motion.div>

        <motion.div style={reduce ? undefined : { y: drift, opacity: fade }}>
          {/* The headline is ragged and short, which leaves a large void on
              the outer half. The portrait lives in that void rather than in
              the text — on narrow screens there is no void, so it drops back
              into the flow underneath. */}
          <div className="relative">
            <h1 className="display d-xl mt-10 text-ink md:mt-14">
              <span className="block">
                <RevealWords text={t("hero.line1")} delay={0.15} />
              </span>
              <span className="block">
                <RevealWords text={t("hero.line2")} delay={0.25} />
              </span>
              <span className="block">
                <RevealWords text={t("hero.line3")} delay={0.35} />
              </span>
            </h1>

            <div className="hero-portrait">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{
                  duration: 1,
                  delay: 0.55,
                  ease: [0.34, 1.4, 0.64, 1],
                }}
                className="hero-portrait-tile tone-hover overflow-hidden rounded-[10px] border border-line"
              >
                <Image
                  src="/images/Profile3.png"
                  alt={t("hero.alt")}
                  width={560}
                  height={672}
                  priority
                  sizes="(max-width: 768px) 128px, 224px"
                  className="tone h-full w-full object-cover object-[50%_22%]"
                  style={{ aspectRatio: "5 / 6" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Lead, offset to the outer edge — editorial, and it stops the
              page reading as one centred column. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 max-w-[52ch] lg:ms-auto lg:mt-16"
          >
            <p className="body-lg text-ink-muted">{t("hero.lead")}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ActionButton
                variant="primary"
                onClick={() => scrollToId("work")}
              >
                {t("cta.seeWork")}
                <ArrowDown className="h-4 w-4 shrink-0" aria-hidden />
              </ActionButton>

              <a
                href="/Morhaf-Gh.pdf"
                download
                className="group/act inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[4px] border border-line-2 px-6 py-3.5 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink transition-colors duration-300 hover:border-ink/60 hover:bg-[var(--wash)]"
              >
                <Download
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/act:translate-y-0.5"
                  aria-hidden
                />
                {t("cta.downloadResume")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ledger — a top rule and generous gaps. Numerals in the display face,
          so the numbers read as part of the typography. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        className="shell mt-20 md:mt-28"
      >
        <dl className="grid grid-cols-2 gap-x-8 gap-y-9 border-t border-line pt-8 md:grid-cols-4 md:gap-x-12 md:pt-10">
          {ledger.map((item) => (
            <div key={item.label}>
              <dd className="display d-sm text-ink">{item.value}</dd>
              <dt className="eyebrow mt-3 text-ink-dim">{item.label}</dt>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
