"use client";

import { useEffect, useRef, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";

interface LenisContextType {
  lenis: any;
}

const LenisContext = createContext<LenisContextType | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  return context?.lenis || null;
};

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Optimized RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle anchor links with better detection
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");

      if (anchor && anchor.getAttribute("href") !== "#") {
        const href = anchor.getAttribute("href");
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, {
              offset: -80,
              duration: 1.5,
              easing: (t: number) => 1 - Math.pow(1 - t, 3), // Ease out cubic
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Expose scroll position for other components
    lenis.on(
      "scroll",
      ({ scroll, limit, velocity, direction, progress }: any) => {
        // Dispatch custom event for scroll tracking
        window.dispatchEvent(
          new CustomEvent("lenis-scroll", {
            detail: { scroll, limit, velocity, direction, progress },
          })
        );
      }
    );

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}

// Legacy export for backward compatibility
let lenisInstance: any = null;
export const getLenis = () => lenisInstance;

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      infinite: false,
    });

    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");

      if (anchor && anchor.getAttribute("href") !== "#") {
        const href = anchor.getAttribute("href");
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, {
              offset: -80,
              duration: 1.5,
              easing: (t: number) => 1 - Math.pow(1 - t, 3),
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Dispatch scroll events for Header component
    lenis.on("scroll", ({ scroll }: any) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", {
          detail: { scroll },
        })
      );
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}
