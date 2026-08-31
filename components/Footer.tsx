"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { EMAIL, SOCIALS } from "@/constants/social";
import { useLanguage } from "./LanguageContext";
import { getLenis } from "./SmoothScroll";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="grain relative border-t border-line pt-20">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-10">
          <div>
            <p className="body-base max-w-[34ch] text-mute">
              {t("footer.tagline")}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="ulink mt-4 inline-block text-[0.9375rem] text-bone hover:text-copper"
            >
              {EMAIL}
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {SOCIALS.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-mute transition-colors duration-300 hover:text-bone"
              >
                {social.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-copper"
                  aria-hidden
                />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-6">
          <p className="eyebrow text-dim">
            © {year} {t("footer.wordmark")} — {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-8">
            <p className="eyebrow hidden text-dim sm:block">
              {t("footer.builtWith")}
            </p>
            <button
              onClick={toTop}
              className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute transition-colors duration-300 hover:text-bone"
            >
              {t("footer.toTop")}
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>

      {/* Closing signature: the name at page scale, clipped by the viewport
          edge. Recessive enough to be texture, big enough to be a full stop. */}
      <div
        className="mt-16 select-none overflow-hidden px-[max(1.25rem,5vw)]"
        aria-hidden
      >
        <p
          className="display translate-y-[0.16em] whitespace-nowrap text-center text-line-2"
          style={{ fontSize: "clamp(3rem, 15.5vw, 15rem)", lineHeight: 0.82 }}
        >
          {t("footer.wordmark")}
        </p>
      </div>
    </footer>
  );
}
