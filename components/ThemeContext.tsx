"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  /** True until the stored preference has been read on the client. */
  hydrating: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Runs before first paint, so the page never flashes the wrong theme.
 * Inlined in <head>; kept in one place so the script and the provider can't
 * drift apart on the storage key or the attribute name.
 */
export const NO_FLASH_SCRIPT = `(function(){try{
var s=localStorage.getItem('${STORAGE_KEY}');
var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Matches the server render and the no-flash fallback.
  const [theme, setThemeState] = useState<Theme>("dark");
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    // The inline script already set the attribute — read it back rather than
    // recomputing, so the two can never disagree.
    const attr = document.documentElement.getAttribute("data-theme");
    setThemeState(attr === "light" ? "light" : "dark");
    setHydrating(false);
  }, []);

  // Follow the OS only while the visitor hasn't expressed a preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      setThemeState(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (hydrating) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, hydrating]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
  }, []);

  const toggle = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggle, hydrating }),
    [theme, setTheme, toggle, hydrating]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
