"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Copy } from "@/content/copy";
import { getLenis } from "./SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  copy: Copy["reel"];
  src: { mp4: string; webm?: string; poster: string };
};

/**
 * THE REEL — a framed card that opens to full bleed as you scroll.
 *
 * The frame is always full-viewport; what changes is its clip-path, from a
 * rounded card to nothing. That keeps the video at one size (no re-layout,
 * no resampling jumps) and the whole move on the compositor. Pinned for
 * 150vh, scrubbed, fully reversible. Reduced motion: no pin, just the card.
 */
export default function Reel({ copy, src }: Props) {
  const section = useRef<HTMLElement>(null);
  // GSAP wraps the pinned node in a spacer. Pinning an inner stage (not the
  // section React owns) keeps React's DOM intact when the page unmounts.
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const player = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = section.current!;
    const st = stage.current!;
    const f = frame.current!;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      el.dataset.static = "1";
      return;
    }

    // Card geometry: ~60% wide on desktop, ~88% on phones, at the video's 16:9.
    // Written as CSS variables; the clip-path and the corner labels both read
    // them, so the only thing GSAP animates is --p (0 = card, 1 = full bleed).
    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cw = w * (w < 760 ? 0.88 : 0.6);
      const ch = Math.min(cw * (9 / 16), h * 0.7);
      f.style.setProperty("--ix", `${(w - cw) / 2}px`);
      f.style.setProperty("--iy", `${(h - ch) / 2}px`);
    };
    measure();
    el.dataset.live = "1";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        f,
        { "--p": 0 },
        {
          "--p": 1,
          ease: "none",
          scrollTrigger: {
            trigger: st,
            start: "top top",
            end: "+=150%",
            pin: st,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // Play only while on screen.
  useEffect(() => {
    const v = video.current!;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const d = player.current!;
    const v = d.querySelector("video")!;
    if (open) {
      d.showModal();
      getLenis()?.stop();
      v.currentTime = 0;
      v.play().catch(() => {});
    } else if (d.open) {
      v.pause();
      d.close();
      getLenis()?.start();
    }
  }, [open]);

  return (
    <section ref={section} className="reel" id="reel" aria-label={copy.label}>
      <div ref={stage} className="reel__stage">
        <div
          ref={frame}
          className="reel__frame"
          data-cursor="PLAY"
          onClick={() => setOpen(true)}
        >
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="metadata"
            poster={src.poster}
          >
            {src.webm && <source src={src.webm} type="video/webm" />}
            <source src={src.mp4} type="video/mp4" />
          </video>
          <div className="reel__shade" aria-hidden="true" />
          <p className="reel__label mono">{copy.label}</p>
          <button
            className="btn btn--light reel__play"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
              <path d="M0 0 10 6 0 12z" fill="currentColor" />
            </svg>
            {copy.play}
          </button>
        </div>
      </div>

      <dialog
        ref={player}
        className="player"
        aria-label={copy.label}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <video controls playsInline preload="none" poster={src.poster}>
          {src.webm && <source src={src.webm} type="video/webm" />}
          <source src={src.mp4} type="video/mp4" />
        </video>
        <p className="player__cap mono">{copy.caption}</p>
        <button
          className="btn btn--ghost player__close"
          onClick={() => setOpen(false)}
        >
          {copy.close}
        </button>
      </dialog>
    </section>
  );
}
