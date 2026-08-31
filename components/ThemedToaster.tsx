"use client";

import { Toaster } from "sonner";
import { useTheme } from "./ThemeContext";

/**
 * Sonner needs the theme as a prop, and it only styles the toast shell —
 * the surface, hairline and accent colours come from globals.css so the
 * toasts track the page tokens rather than keeping a second palette.
 */
export default function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      theme={theme}
      richColors={false}
      offset={24}
      duration={3200}
    />
  );
}
