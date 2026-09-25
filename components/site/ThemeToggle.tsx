"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Props = { toLight: string; toDark: string };

const KEY = "theme";
const THEME_COLOR = { dark: "#120e17", light: "#f3ece2" } as const;

/**
 * Runs in <head> before paint. The site is dark unless the visitor picked
 * light, so a stored choice is the only thing that changes it.
 */
export const SITE_THEME_SCRIPT = `try{if(localStorage.getItem('${KEY}')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`;

export default function ThemeToggle({ toLight, toDark }: Props) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? THEME_COLOR.light : THEME_COLOR.dark);
  }, [light]);

  const toggle = () => {
    const next = !light;
    const apply = () => {
      if (next) document.documentElement.setAttribute("data-theme", "light");
      else document.documentElement.removeAttribute("data-theme");
      setLight(next);
    };
    try {
      localStorage.setItem(KEY, next ? "light" : "dark");
    } catch {
      // Blocked storage: the choice just won't persist.
    }
    // A soft cross-fade where the browser supports it.
    const d = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (d.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) d.startViewTransition(apply);
    else apply();
  };

  return (
    <button className="nav__theme" type="button" onClick={toggle} aria-label={light ? toDark : toLight}>
      {light ? <Moon size={16} strokeWidth={1.75} aria-hidden="true" /> : <Sun size={16} strokeWidth={1.75} aria-hidden="true" />}
    </button>
  );
}
