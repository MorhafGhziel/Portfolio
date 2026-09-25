"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import type { Copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { SETTINGS } from "@/content/settings";
import { getLenis } from "./SmoothScroll";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

type Props = { lang: Locale; copy: Copy["nav"] };

export default function Nav({ lang, copy }: Props) {
  const pathname = usePathname() ?? `/${lang}`;
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const home = `/${lang}`;
  const onHome = pathname === home;
  const other: Locale = lang === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);

  // Section links: a plain hash on the home page (Lenis scrolls), a route elsewhere.
  const sec = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  const links = [
    { id: "work", label: copy.work },
    { id: "services", label: copy.services },
    { id: "about", label: copy.about },
    { id: "contact", label: copy.contact },
  ];

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else l?.start();
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const wa = `https://wa.me/${SETTINGS.whatsapp}`;

  return (
    <header className="nav" data-open={open ? "1" : ""}>
      <div className="nav__pill">
        <Link href={home} className="nav__logo" aria-label={`${SETTINGS.name[lang]} — ${copy.home}`}>
          <span>{lang === "ar" ? "مرهف" : "Murhaf"}</span>
          <i aria-hidden="true" />
        </Link>
        <i className="nav__sep" aria-hidden="true" />
        <nav className="nav__links" aria-label="Primary">
          {links.map((l) =>
            onHome ? (
              <a key={l.id} href={sec(l.id)}>
                {l.label}
              </a>
            ) : (
              <Link key={l.id} href={sec(l.id)}>
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <i className="nav__sep nav__sep--end" aria-hidden="true" />
        <a className="nav__lang" href={switchHref} hrefLang={other} lang={other} aria-label={copy.langSwitchLabel}>
          {copy.langSwitch}
        </a>
        <ThemeToggle toLight={copy.toLight} toDark={copy.toDark} />
      </div>
      <Magnetic>
        <a className="btn btn--solid nav__cta" href={sec("contact")}>
          {copy.start}
        </a>
      </Magnetic>
      <button
        ref={menuBtn}
        className="nav__menu"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? copy.close : copy.menu}</span>
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </button>

      <div id="menu" className="menu" hidden={!open}>
        <nav aria-label="Menu">
          <ol>
            {links.map((l, i) => (
              <li key={l.id} style={{ ["--i" as string]: i }}>
                <a href={sec(l.id)} onClick={() => setOpen(false)}>
                  <span className="mono">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          <a href={`mailto:${SETTINGS.email}`}>{SETTINGS.email}</a>
          <a href={wa} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href={switchHref} hrefLang={other} lang={other}>
            {copy.langSwitchLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
