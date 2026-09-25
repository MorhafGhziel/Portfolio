"use client";

import { useEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import type { Card } from "@/lib/site";
import type { Copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { track } from "@/lib/analytics/client";

type Props = {
  card: Card;
  lang: Locale;
  copy: Copy["work"];
  size: "full" | "half";
  priority?: boolean;
  /** h3 under a section title; h2 on /work, where the page title is the h1. */
  level?: "h2" | "h3";
};

/**
 * One project preview. The whole card is the link. The media carries a
 * view-transition-name, so on click it grows from exactly here into the case
 * study's hero, and shrinks back on browser back.
 */
export default function ProjectCard({ card, lang, copy, size, priority, level = "h3" }: Props) {
  const H = level;
  const video = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLAnchorElement>(null);

  // Muted loop: slow while visible, full speed on hover, stopped off-screen.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          v.playbackRate = root.current?.matches(":hover") ? 1 : 0.6;
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const fast = (on: boolean) => {
    const v = video.current;
    if (v) v.playbackRate = on ? 1 : 0.6;
  };

  return (
    <Link
      ref={root}
      href={`/${lang}/work/${card.slug}`}
      className={`card card--${size}`}
      data-cursor="VIEW"
      data-flip-id={card.slug}
      onMouseEnter={() => fast(true)}
      onMouseLeave={() => fast(false)}
      onClick={() => track("project_open", { name: card.slug, locale: lang })}
    >
      <div className="card__media media" data-reveal="" style={{ viewTransitionName: `media-${card.slug}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.media.poster}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          width={1280}
          height={800}
        />
        {card.media.mp4 && (
          <video ref={video} muted loop playsInline preload="none" aria-hidden="true">
            {card.media.webm && <source src={card.media.webm} type="video/webm" />}
            <source src={card.media.mp4} type="video/mp4" />
          </video>
        )}
        <span className="card__badge mono">{copy.kind[card.kind]}</span>
      </div>
      <div className="card__info">
        <H className="card__name">
          <span>{card.name}</span>
        </H>
        <span className="card__year mono" dir="ltr">
          {card.year}
        </span>
        <p className="card__summary">{card.summary}</p>
        <ul className="card__tags mono">
          {card.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
