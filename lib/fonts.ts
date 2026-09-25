import { Almarai, Bricolage_Grotesque, Fraunces, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

/* Self-hosted at build time by next/font, with size-adjusted fallbacks so
   swapping in the real face doesn't move the layout. Only the faces the
   first screen needs are preloaded. */

export const sans = Bricolage_Grotesque({ variable: "--f-sans", subsets: ["latin"], display: "swap" });

// Metadata only; never in the first paint's critical path.
export const mono = Geist_Mono({ variable: "--f-mono", subsets: ["latin"], display: "swap", preload: false });

// Only the italic is used (the accent words). Soft and "wonky" to match
// Bricolage's quirks instead of fighting them.
export const serif = Fraunces({
  variable: "--f-serif",
  subsets: ["latin"],
  style: "italic",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

export const arSans = Almarai({
  variable: "--f-ar-sans",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

// Amiri Bold, subset to the Arabic accent words (scripts/subset-accent.py).
export const arDisplay = localFont({
  variable: "--f-ar-display",
  src: "../app/(site)/[lang]/fonts/amiri-accent.woff2",
  weight: "700",
  display: "swap",
  preload: false,
});
