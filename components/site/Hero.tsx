import type { Copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { SETTINGS } from "@/content/settings";
import Horizon from "./Horizon";
import Clock from "./Clock";
import Title from "./Title";
import Magnetic from "./Magnetic";

export default function Hero({ lang, copy }: { lang: Locale; copy: Copy["hero"] }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Horizon variant="dusk" />
      <div className="hero__body wrap">
        <Title as="h1" id="hero-title" text={copy.title} className="hero__title" reveal={false} />
        <p className="hero__lead">{copy.lead}</p>
        <div className="hero__actions">
          <Magnetic>
            <a className="btn btn--light" href="#work">
              {copy.viewWork}
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn--ghost" href="#contact">
              {copy.start}
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="hero__meta wrap mono" dir="ltr">
        <span className="hero__time">
          {copy.city.toUpperCase()} — <Clock />
        </span>
        {SETTINGS.availability.open && (
          <span className="hero__status" lang={lang}>
            <i className="pulse" aria-hidden="true" />
            {lang === "en" ? SETTINGS.availability.label.en.toUpperCase() : SETTINGS.availability.label.ar}
          </span>
        )}
        <a className="hero__scroll" href="#reel" lang={lang}>
          {lang === "en" ? copy.scroll.toUpperCase() : copy.scroll}
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
