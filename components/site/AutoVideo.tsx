"use client";

import { useEffect, useRef } from "react";

/** A muted loop that plays only while on screen. Never autoplays for reduced motion. */
export default function AutoVideo({
  mp4,
  webm,
  poster,
  rate = 0.8,
}: {
  mp4: string;
  webm?: string;
  poster: string;
  rate?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        v.playbackRate = rate;
        v.play().catch(() => {});
      } else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [rate]);
  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} aria-hidden="true">
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
