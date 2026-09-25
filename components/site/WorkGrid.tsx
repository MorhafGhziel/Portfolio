"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import type { Card } from "@/lib/site";
import type { Copy } from "@/content/copy";
import type { Category, Locale } from "@/content/types";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(Flip);

type Props = {
  cards: Card[];
  lang: Locale;
  copy: Copy["work"];
  /** The /work page can switch to a compact list. */
  allowList?: boolean;
  /** Load the first card eagerly (only when it's near the top of the page). */
  eagerFirst?: boolean;
};

const CATS: Category[] = ["websites", "ecommerce", "webapps"];

/** Rhythm: one full-width, then a two-up row, repeating. A card left alone
 *  at the end of a row goes full-width instead of leaving a gap. */
const sizeAt = (i: number, n: number) => (i % 3 === 0 || (i === n - 1 && i % 3 === 1) ? "full" : "half");

export default function WorkGrid({ cards, lang, copy, allowList, eagerFirst }: Props) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  // Only offer filters that have something in them.
  const cats = useMemo(() => CATS.filter((c) => cards.some((p) => p.categories.includes(c))), [cards]);
  const shown = filter === "all" ? cards : cards.filter((c) => c.categories.includes(filter));

  const choose = (f: Category | "all") => {
    if (f === filter) return;
    if (grid.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flipState.current = Flip.getState(grid.current.querySelectorAll(".card"));
    }
    setFilter(f);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !grid.current) return;
    flipState.current = null;
    // New cards are already on screen; don't make them wait for the observer.
    grid.current.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => (el.dataset.in = "1"));
    Flip.from(state, {
      targets: grid.current.querySelectorAll(".card"),
      duration: 0.7,
      ease: "expo.out",
      scale: false,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.25 }),
    });
  }, [filter]);

  return (
    <>
      <div className="filters">
        <div className="filters__chips" role="group" aria-label="Filter">
          {(["all", ...cats] as const).map((f) => (
            <button key={f} className="chip" aria-pressed={filter === f} onClick={() => choose(f)}>
              {f === "all" ? copy.all : copy.filters[f]}
              <sup className="mono">
                {f === "all" ? cards.length : cards.filter((c) => c.categories.includes(f)).length}
              </sup>
            </button>
          ))}
        </div>
        {allowList && (
          <div className="filters__view" role="group" aria-label="View">
            {(["grid", "list"] as const).map((v) => (
              <button key={v} className="chip chip--small" aria-pressed={view === v} onClick={() => setView(v)}>
                {copy[v]}
              </button>
            ))}
          </div>
        )}
      </div>

      {view === "grid" ? (
        <div ref={grid} className="grid">
          {shown.map((c, i) => (
            <ProjectCard key={c.slug} card={c} lang={lang} copy={copy} size={sizeAt(i, shown.length)} priority={eagerFirst && i === 0} level={allowList ? "h2" : "h3"} />
          ))}
          {!shown.length && <p className="grid__empty">{copy.empty}</p>}
        </div>
      ) : (
        <WorkList cards={shown} lang={lang} copy={copy} />
      )}
    </>
  );
}

/** Compact rows with a floating preview that follows the pointer. */
function WorkList({ cards, lang, copy }: { cards: Card[]; lang: Locale; copy: Copy["work"] }) {
  const [hover, setHover] = useState<Card | null>(null);
  const float = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const f = float.current;
    if (f) f.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 90}px, 0)`;
  };
  return (
    <div className="list" onPointerMove={move} onPointerLeave={() => setHover(null)}>
      <ol>
        {cards.map((c, i) => (
          <li key={c.slug}>
            <Link
              href={`/${lang}/work/${c.slug}`}
              className="list__row"
              data-cursor="VIEW"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(c)}
            >
              <span className="mono list__i">{String(i + 1).padStart(2, "0")}</span>
              <span className="list__name">{c.name}</span>
              <span className="list__cat">{c.tags.join(" · ")}</span>
              <span className="mono list__kind">{copy.kind[c.kind]}</span>
              <span className="mono list__year" dir="ltr">
                {c.year}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <div ref={float} className="list__float" data-on={hover ? "1" : ""} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {hover && <img src={hover.media.poster} alt="" />}
      </div>
    </div>
  );
}
