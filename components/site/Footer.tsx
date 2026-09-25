import type { Locale } from "@/content/types";
import { COPY } from "@/content/copy";
import { SETTINGS } from "@/content/settings";

export default function Footer({ lang }: { lang: Locale }) {
  const c = COPY[lang];
  const home = `/${lang}`;
  return (
    <footer className="footer">
      <div className="wrap footer__row mono">
        <a href={home} className="footer__logo">
          {lang === "ar" ? "مرهف" : "Murhaf"}
          <i aria-hidden="true" />
        </a>
        <nav className="footer__nav" aria-label="Footer">
          <a href={`${home}#work`}>{c.nav.work}</a>
          <a href={`${home}#services`}>{c.nav.services}</a>
          <a href={`${home}#about`}>{c.nav.about}</a>
          <a href={`${home}#contact`}>{c.nav.contact}</a>
        </nav>
        <nav className="footer__nav" aria-label="Social">
          {SETTINGS.socials.map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noopener">
              {s.label}
            </a>
          ))}
        </nav>
        <a href={`mailto:${SETTINGS.email}`} dir="ltr">
          {SETTINGS.email}
        </a>
        <span dir="ltr">© 2026 {SETTINGS.name.en} — {c.footer.rights}</span>
        <a href="#main" className="footer__top">
          {c.footer.top} ↑
        </a>
      </div>
    </footer>
  );
}
