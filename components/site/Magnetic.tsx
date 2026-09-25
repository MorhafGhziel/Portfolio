"use client";

import { cloneElement, useEffect, useRef, type ReactElement } from "react";

/**
 * A slight pull toward the pointer (max ~6px), fine pointers only.
 * Wraps a single element and animates it with a transform.
 */
export default function Magnetic({ children, strength = 0.22 }: { children: ReactElement<{ ref?: unknown }>; strength?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      const clamp = (v: number) => Math.max(-6, Math.min(6, v));
      el.style.transform = `translate(${clamp(dx)}px, ${clamp(dy)}px)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return cloneElement(children, { ref });
}
