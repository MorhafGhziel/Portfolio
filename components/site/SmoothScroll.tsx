"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let fromHistory = false;
/** Shared so the menu and the reel player can pause the page. */
export const getLenis = () => lenis;

/**
 * Lenis driven by GSAP's ticker, so smooth scroll and ScrollTrigger read the
 * same clock. Light settings: it should feel quick on a trackpad, not floaty.
 * Off entirely for reduced motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Same-page section links (#work, /en#work…) glide there. The target's
    // position is read at click time, so it lands after the pinned reel.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      lenis?.scrollTo(el, { offset: 0, duration: 1.6, easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Remember whether a navigation came from back/forward, where the browser
  // restores the old position. Anything else starts at the top.
  useEffect(() => {
    const onPop = () => (fromHistory = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // New page: start at the top (unless going back), then re-measure.
  useEffect(() => {
    if (!fromHistory && !window.location.hash) {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    fromHistory = false;
    const id = requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
