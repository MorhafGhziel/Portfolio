"use client";

import { useEffect, useRef } from "react";

type Step = { name: string; line: string };

/**
 * HOW I WORK — the steps sit along one straight line, like a horizon.
 * Scrolling walks a small sun along it; the line draws in behind it
 * and each step lights up as the sun reaches it.
 * Reduced motion (or no JS): the whole ridge is drawn and every step is lit.
 */

// The line, in a 1000 × 40 box. Stops sit at the start of each quarter,
// so every step reads from its stop.
const STOPS: [number, number][] = [
  [8, 20],
  [258, 20],
  [508, 20],
  [758, 20],
];
const RIDGE = "M0 20 H 1000";

export default function Process({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const sun = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const p = path.current;
    const s = sun.current;
    if (!el || !p || !s) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.static = "1";
      return;
    }

    // Phones hide the ridge; there is nothing to walk, so show every step.
    const total = p.getTotalLength();
    if (!total) {
      el.dataset.static = "1";
      return;
    }
    // Where along the ridge each stop sits, as a share of its length.
    const at = STOPS.map(([x]) => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (p.getPointAtLength(mid).x < x) lo = mid;
        else hi = mid;
      }
      return lo / total;
    });
    const items = el.querySelectorAll<HTMLElement>(".process__step");
    const stops = el.querySelectorAll<HTMLElement>(".process__stop");
    p.style.strokeDasharray = "1";

    let cur = 0;
    let raf = 0;
    let visible = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the ridge enters the lower screen, 1 once it sits in the upper third.
      const target = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55)));
      cur += (target - cur) * 0.08;
      p.style.strokeDashoffset = `${1 - cur}`;
      const pt = p.getPointAtLength(total * cur);
      s.style.setProperty("--x", `${pt.x / 10}`);
      s.style.setProperty("--y", `${pt.y / 0.4}`);
      items.forEach((it, i) => {
        const lit = cur >= at[i] - 0.01;
        it.toggleAttribute("data-lit", lit);
        stops[i]?.toggleAttribute("data-lit", lit);
      });
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={root} className="process">
      <div className="process__ridge" aria-hidden="true">
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path className="process__track" d={RIDGE} />
          {/* pathLength="1": the draw-in is a share of the line, whatever size it's shown at. */}
          <path ref={path} className="process__line" d={RIDGE} pathLength={1} />
        </svg>
        {STOPS.map(([x, y], i) => (
          <i key={i} className="process__stop" style={{ ["--x" as string]: x / 10, ["--y" as string]: y / 0.4 }} />
        ))}
        <span ref={sun} className="process__sun" />
      </div>
      <ol className="process__steps">
        {steps.map((s, i) => (
          <li key={s.name} className="process__step" style={{ ["--i" as string]: i }}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.name}</h3>
            <p>{s.line}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
