"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small dot that follows the pointer. Over anything with data-cursor it
 * grows into a labelled circle (VIEW, PLAY, DRAG). Hidden until the first
 * move, hidden over text fields, and never mounted for touch input.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(fine.matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = dot.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const loop = () => {
      x += (tx - x) * (reduced ? 1 : 0.28);
      y += (ty - y) * (reduced ? 1 : 0.28);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (x < -50) { x = tx; y = ty; }
      el.dataset.on = "1";
      const t = e.target as HTMLElement | null;
      const field = t?.closest("input, textarea, select, [contenteditable]");
      const host = t?.closest<HTMLElement>("[data-cursor]");
      el.dataset.hidden = field ? "1" : "";
      setLabel(host?.dataset.cursor ?? "");
    };
    const leave = () => (el.dataset.on = "");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add("has-cursor");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={dot} className="cursor" data-label={label ? "1" : ""} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
