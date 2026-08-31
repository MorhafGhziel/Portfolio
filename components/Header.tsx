"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { getLenis, scrollToId } from "./SmoothScroll";
import { languages } from "@/constants/languages";
import ThemeToggle from "./ui/ThemeToggle";

const NAV = [
  { key: "nav.home", id: "home" },
  { key: "nav.work", id: "work" },
  { key: "nav.about", id: "about" },
  { key: "nav.contact", id: "contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage, isRTL } = useLanguage();

  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  // The About section is the one contrasting band on the page; the bar
  // takes on its palette there rather than sitting over it as a slab.
  const [onBand, setOnBand] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onHome = pathname === "/";

  /* Which section am I looking at? An observer beats measuring offsets —
     it stays correct when sections resize or the language flips to RTL. */
  useEffect(() => {
    if (!onHome) {
      setActive(pathname === "/contact" ? "contact" : "");
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome, pathname, language]);

  /* Hairline appears only once you've left the top of the page. */
  useEffect(() => {
    const onScroll = (y: number) => {
      setScrolled(y > 24);
      const light = document.querySelector<HTMLElement>("[data-band]");
      if (!light) return setOnBand(false);
      const r = light.getBoundingClientRect();
      const barMid = 40;
      setOnBand(r.top <= barMid && r.bottom >= barMid);
    };
    const native = () => onScroll(window.scrollY);
    const lenis = (e: Event) =>
      onScroll((e as CustomEvent<{ scroll: number }>).detail.scroll);

    native();
    window.addEventListener("scroll", native, { passive: true });
    window.addEventListener("lenis-scroll", lenis as EventListener);
    return () => {
      window.removeEventListener("scroll", native);
      window.removeEventListener("lenis-scroll", lenis as EventListener);
    };
  }, []);

  /* Lock the page behind the mobile menu. */
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onHome) {
      scrollToId(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  const otherLang = language === "en" ? "ar" : "en";

  /* Over the band the bar borrows the band's own palette, so it inverts
     correctly in either theme without knowing which one is active. */
  const skin = onBand
    ? {
        bar: "border-b border-band-ink/10 bg-band/90 backdrop-blur-md",
        strong: "text-band-ink",
        muted: "text-band-ink/55 hover:text-band-ink",
        faint: "text-band-ink/40",
        accent: "bg-band-accent",
        accentText: "text-band-accent",
        chip: "border-band-ink/15 text-band-ink/60 hover:border-band-ink/30 hover:text-band-ink",
        bar2: "bg-band-ink",
      }
    : {
        bar: "border-b border-line bg-canvas/85 backdrop-blur-md",
        strong: "text-ink",
        muted: "text-ink-muted hover:text-ink",
        faint: "text-ink-dim",
        accent: "bg-accent",
        accentText: "text-accent",
        chip: "border-line text-ink-muted hover:border-line-2 hover:text-ink",
        bar2: "bg-ink",
      };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen
            ? skin.bar
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          {/* Wordmark, or an escape hatch on the standalone contact page */}
          {pathname === "/contact" ? (
            <Link
              href="/"
              className={`group flex items-center gap-2 text-sm transition-colors duration-500 ${skin.muted}`}
            >
              <ArrowLeft
                className={`h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 ${
                  isRTL ? "rotate-180 group-hover:translate-x-0.5" : ""
                }`}
              />
              {t("cta.backHome")}
            </Link>
          ) : (
            <Link
              href="/"
              onClick={(e) => go(e, "home")}
              className={`flex items-center gap-2.5 text-[0.9375rem] font-medium tracking-[-0.015em] transition-colors duration-500 ${skin.strong}`}
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span
                  className={`dot-live absolute inset-0 rounded-full ${skin.accentText}`}
                  aria-hidden
                />
                <span
                  className={`relative inline-block h-1.5 w-1.5 rounded-full ${skin.accent}`}
                />
              </span>
              {t("hero.fullName")}
            </Link>
          )}

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={onHome ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3.5 py-2 text-sm transition-colors duration-500 ${
                    isActive ? skin.strong : skin.muted
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px ${skin.accent}`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 34,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <span
              className={`eyebrow hidden items-center gap-2 transition-colors duration-500 lg:inline-flex ${skin.faint}`}
            >
              <span className={`h-[5px] w-[5px] rounded-full ${skin.accent}`} />
              {t("status.available")}
            </span>

<ThemeToggle className={skin.chip} />

            <button
              onClick={() => setLanguage(otherLang)}
              className={`cursor-pointer rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-500 ${skin.chip}`}
              aria-label={`Switch to ${languages[otherLang].name}`}
            >
              {languages[otherLang].short}
            </button>

            {/* Mobile trigger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className={`absolute left-0 block h-px w-5 ${menuOpen ? "bg-ink" : skin.bar2}`}
                  animate={
                    menuOpen ? { top: 6, rotate: 45 } : { top: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className={`absolute left-0 block h-px w-5 ${menuOpen ? "bg-ink" : skin.bar2}`}
                  animate={
                    menuOpen ? { top: 6, rotate: -45 } : { top: 11, rotate: 0 }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — big serif, one thing per line */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-canvas md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <nav className="shell flex h-full flex-col justify-center gap-2 pb-20">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={onHome ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.055,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="display d-md flex items-baseline gap-4 py-2 text-ink"
                >
                  <span className="eyebrow text-ink-dim">
                    0{i + 1}
                  </span>
                  {t(item.key)}
                </motion.a>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.34 }}
                className="eyebrow mt-10 flex items-center gap-2 text-ink-dim"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                {t("status.available")} · {t("status.location")}
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
