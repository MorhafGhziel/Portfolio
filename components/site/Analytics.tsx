"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/client";
import type { Locale } from "@/content/types";

/** One page view per path, including client-side navigations. */
export default function Analytics({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (!pathname || last.current === pathname) return;
    last.current = pathname;
    track("pageview", { path: pathname, locale: lang });
  }, [pathname, lang]);
  return null;
}
