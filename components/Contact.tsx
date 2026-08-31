"use client";

import { toast } from "sonner";
import { ArrowUpRight, Copy } from "lucide-react";
import { EMAIL, SOCIALS } from "@/constants/social";
import { useLanguage } from "./LanguageContext";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import ContactForm from "./ContactForm";

export default function Contact({
  /** The standalone /contact page already has its own page heading. */
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { t } = useLanguage();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success(t("cta.copied"));
    } catch {
      toast.error(t("cta.copyFailed"));
    }
  };

  return (
    <section
      id="contact"
      className={`grain relative ${standalone ? "pt-32 pb-28 md:pt-40 md:pb-36" : "py-28 md:py-40"}`}
    >
      <div className="shell">
        <SectionHead
          index={t("contact.index")}
          eyebrow={t("contact.eyebrow")}
          heading={t("contact.heading")}
          help={t("contact.lead")}
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Direct routes first — some people will never use a form */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-ink-dim">{t("contact.directTitle")}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="display d-sm ulink text-ink transition-colors duration-300 hover:text-accent"
                >
                  {EMAIL}
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors duration-300 hover:border-line-2 hover:text-ink"
                >
                  <Copy className="h-3 w-3" aria-hidden />
                  {t("cta.copyEmail")}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-14">
              <p className="eyebrow text-ink-dim">{t("contact.elsewhere")}</p>
              <ul className="mt-5 border-t border-line">
                {SOCIALS.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 border-b border-line py-4 text-[0.9375rem] text-ink-muted transition-colors duration-300 hover:text-ink"
                    >
                      {social.label}
                      <ArrowUpRight
                        className="h-4 w-4 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14} className="mt-12">
              <p className="eyebrow flex items-center gap-2.5 text-ink-dim">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span
                    className="dot-live absolute inset-0 rounded-full text-accent"
                    aria-hidden
                  />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {t("about.facts.statusValue")}
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <div className="border-t border-line pt-8">
                <h3 className="display d-sm text-ink">
                  {t("contact.formHeading")}
                </h3>
                <p className="body-base mt-3 max-w-[46ch] text-ink-muted">
                  {t("contact.formLead")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-10">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
