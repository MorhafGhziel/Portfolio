"use client";

import { useEffect, useRef } from "react";

/**
 * THE HORIZON — a painted desert, built from layers like a stage set.
 *
 * Six hand-painted layers (sky, far dunes, mist, mid, near, the front mound),
 * rendered by scripts/paint/desert.py and painted stroke by stroke with
 * scripts/paint/strokes.py (the AZAL painter). Each layer sits at its own
 * depth: the pointer (or a finger) shifts them a few pixels apart, and scrolling
 * sinks the land faster than the sky. The mist drifts on its own.
 *
 * variant="night" is the same land after dark, for Contact. Both dark skies
 * carry stars; at dusk only the high, darker sky has them.
 * The light theme swaps in the same land by day (dusk → day, night → dawn).
 * Both sets are in the markup; CSS hides the other theme's set, and lazy
 * loading means a hidden set is never downloaded.
 * Reduced motion: the layers simply stay still.
 */

const LAYERS = [
  { name: "sky", depth: 0.0 },
  { name: "far", depth: 0.15 },
  { name: "mist", depth: 0.3 },
  { name: "mid", depth: 0.45 },
  { name: "near", depth: 0.7 },
  { name: "front", depth: 1.0 },
] as const;

// A fixed sky of faint stars for the night (x%, y%, size px, delay s).
const STARS: [number, number, number, number][] = [
  [6, 8, 1.5, 0.2], [12, 22, 1, 1.4], [19, 12, 1.5, 2.6], [24, 30, 1, 0.8], [31, 6, 2, 3.1],
  [37, 18, 1, 1.9], [43, 27, 1.5, 0.5], [49, 9, 1, 2.2], [55, 21, 1.5, 3.6], [61, 14, 1, 1.1],
  [66, 33, 1, 2.9], [72, 7, 2, 0.3], [78, 24, 1, 1.7], [84, 13, 1.5, 3.3], [90, 29, 1, 0.9],
  [95, 17, 1.5, 2.4], [9, 36, 1, 3.9], [28, 40, 1, 1.2], [58, 38, 1, 2.8], [82, 41, 1, 0.6],
];

const LIGHT = { dusk: "day", night: "dawn" } as const;

// The dusk sky: a denser field, placed by a seeded generator so the server
// and the browser draw the same sky. [x %, y %, size px, delay s]
const DUSK_STARS: [number, number, number, number][] = (() => {
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 46 }, () => {
    const y = rnd() * 36;
    return [rnd() * 100, y, y < 18 && rnd() > 0.6 ? 2.6 : 1.4 + rnd() * 1.2, rnd() * 4] as [number, number, number, number];
  });
})();
// Shooting stars: [start x %, start y %, seconds per cycle, delay s]
const METEORS: [number, number, number, number][] = [
  [22, 4, 9, 1.5],
  [64, 2, 13, 5],
  [44, 10, 17, 10],
];

// The day sky: soft clouds drifting and a few birds gliding across (hero only).
// [top %, width vw, seconds to cross, start offset %]
const CLOUDS: [number, number, number, number][] = [
  [7, 30, 150, 12],
  [17, 22, 190, 55],
  [3, 18, 170, 82],
  [25, 26, 210, 34],
];
// [top %, size px, seconds to cross, start offset %]
const BIRDS: [number, number, number, number][] = [
  [19, 28, 60, 22],
  [22.5, 22, 60, 26],
  [17, 20, 60, 27.5],
  [12, 24, 85, 68],
  [28, 18, 110, 48],
];

type Props = { variant?: "dusk" | "night"; className?: string; priority?: boolean };

export default function Horizon({ variant = "dusk", className, priority }: Props) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = wrap.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, s: 0 };
    let visible = false;
    let raf = 0;

    const onPointer = (cx: number, cy: number) => {
      target.x = (cx / window.innerWidth - 0.5) * 2;
      target.y = (cy / window.innerHeight - 0.5) * 2;
    };
    const pm = (e: PointerEvent) => onPointer(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => e.touches[0] && onPointer(e.touches[0].clientX, e.touches[0].clientY);
    window.addEventListener("pointermove", pm, { passive: true });
    window.addEventListener("touchmove", tm, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      // Scroll progress through this block: 0 when its top is at the top of the screen.
      const r = host.getBoundingClientRect();
      const s = Math.max(-1, Math.min(1, -r.top / Math.max(1, r.height)));
      cur.s += (s - cur.s) * 0.2;
      host.style.setProperty("--mx", cur.x.toFixed(4));
      host.style.setProperty("--my", cur.y.toFixed(4));
      host.style.setProperty("--sy", cur.s.toFixed(4));
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("touchmove", tm);
    };
  }, []);

  const sets = [
    { mood: variant, theme: "dark" },
    { mood: LIGHT[variant], theme: "light" },
  ];
  return (
    <div ref={wrap} className={`horizon horizon--${variant} ${className ?? ""}`} aria-hidden="true">
      {sets.map(({ mood, theme }) => (
        <div key={mood} className={`horizon__set horizon__set--${theme}`}>
          {LAYERS.map((l, i) => (
            <picture key={l.name} className={`horizon__l horizon__l--${l.name}`} style={{ ["--d" as string]: l.depth, zIndex: i * 2 }}>
              <source media="(max-aspect-ratio: 4/5)" srcSet={`/media/desert/${mood}/tall/${l.name}.webp`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/media/desert/${mood}/wide/${l.name}.webp`}
                alt=""
                draggable={false}
                decoding="async"
                loading="lazy"
                fetchPriority={priority && (i === 0 || i === LAYERS.length - 1) ? "high" : "auto"}
              />
            </picture>
          ))}
        </div>
      ))}
      {variant === "dusk" && (
        <div className="horizon__life horizon__set--light" style={{ zIndex: 1 }}>
          {CLOUDS.map(([top, w, t, o], i) => (
            <i
              key={i}
              className="horizon__cloud"
              style={{ top: `${top}%`, width: `${w}vw`, animationDuration: `${t}s`, animationDelay: `${(-t * o) / 100}s`, ["--o" as string]: o }}
            />
          ))}
          {BIRDS.map(([top, size, t, o], i) => (
            <span
              key={i}
              className="horizon__bird"
              style={{ top: `${top}%`, width: size, animationDuration: `${t}s`, animationDelay: `${(-t * o) / 100}s`, ["--o" as string]: o }}
            >
              <svg viewBox="0 0 20 8">
                <path d="M1 6 Q 5.5 0.5 10 6 Q 14.5 0.5 19 6" />
              </svg>
            </span>
          ))}
        </div>
      )}
      <div className="horizon__stars horizon__set--dark" style={{ zIndex: 1 }}>
        {(variant === "night" ? STARS : DUSK_STARS).map(([x, y, s, d], i) => (
          <i key={i} style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }} />
        ))}
        {METEORS.map(([x, y, t, d], i) => (
          <b key={i} className="horizon__meteor" style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${t}s`, animationDelay: `${d}s` }} />
        ))}
      </div>
    </div>
  );
}
