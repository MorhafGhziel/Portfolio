"use client";

import { useEffect, useRef, useState } from "react";

/**
 * No custom dot: the normal pointer stays everywhere. Only over things marked
 * data-cursor (projects, the reel) a small label pill follows the pointer,
 * so it's clear what a click does. Fine pointers only; never on touch.
 */
export default function Cursor() {
  const pill = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = pill.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, placed = false;
    const loop = () => {
      x += (tx - x) * (reduced ? 1 : 0.22);
      y += (ty - y) * (reduced ? 1 : 0.22);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX + 18;
      ty = e.clientY + 18;
      if (!placed) {
        x = tx;
        y = ty;
        placed = true;
      }
      const host = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(host?.dataset.cursor ?? "");
    };
    const leave = () => setLabel("");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={pill} className="cursor" data-on={label ? "1" : ""} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
