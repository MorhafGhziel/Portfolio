"use client";

import { useEffect, useRef } from "react";

type Step = { name: string; line: string };

/**
 * HOW I WORK — the steps sit along one straight line, like a horizon.
 * Scrolling walks a small sun along it; the line fills in behind it and each
 * step lights up as the sun reaches it.
 *
 * One number drives everything: --p (0 → 1) on the line. The fill, the sun
 * and the lit stops all read it, so they can never drift apart.
 * Reduced motion, no JS, or phones (the line is hidden): every step is lit.
 */
export default function Process({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const ln = line.current;
    if (!el || !ln) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      getComputedStyle(ln).display === "none"
    ) {
      el.dataset.static = "1";
      return;
    }

    const items = el.querySelectorAll<HTMLElement>(".process__step");
    const stops = el.querySelectorAll<HTMLElement>(".process__stop");
    const last = steps.length - 1;

    let cur = 0;
    let raf = 0;
    let visible = false;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the line enters the lower screen, 1 once it sits in the upper third.
      const target = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55)));
      cur += (target - cur) * 0.08;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      ln.style.setProperty("--p", cur.toFixed(4));
      // Stop i sits at i / last along the line; it lights when the sun is on it.
      items.forEach((it, i) => {
        const lit = cur >= i / last - 0.002;
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
  }, [steps.length]);

  return (
    <div ref={root} className="process" style={{ ["--n" as string]: steps.length }}>
      <div ref={line} className="process__line" aria-hidden="true">
        <i className="process__fill" />
        {steps.map((s, i) => (
          <i key={s.name} className="process__stop" style={{ ["--i" as string]: i }} />
        ))}
        <span className="process__sun" />
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
