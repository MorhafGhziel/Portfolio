"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/client";
import { useLanguage } from "@/components/LanguageContext";

/**
 * Records a page view on first paint and on every client-side navigation.
 *
 * Mounted once in the site layout. It renders nothing and, because the beacon
 * is fire-and-forget, it never delays a render or a route change.
 *
 * The pathname guard matters: in React's strict mode this effect runs twice on
 * mount, which would double-count every first view without it.
 */
export default function Analytics() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);
  const { language } = useLanguage();
  // Read through a ref so a language toggle does not re-fire the page view.
  const langRef = useRef(language);
  langRef.current = language;

  useEffect(() => {
    if (!pathname) return;
    if (lastSent.current === pathname) return;
    lastSent.current = pathname;

    track("pageview", {
      path: pathname,
      locale: langRef.current === "ar" ? "ar" : "en",
    });
  }, [pathname]);

  return null;
}
