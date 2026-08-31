"use client";

import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";

/**
 * Sun and moon share one 18px box and cross-fade with a quarter turn, so the
 * icon changes without the button jumping. `chip` is passed in from the
 * header so the control picks up the band palette along with everything else.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, hydrating } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-colors duration-500 ${className}`}
    >
      <span className="relative block h-[18px] w-[18px]">
        {/* Sun */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="absolute inset-0 h-[18px] w-[18px]"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            scale: isDark ? 0.6 : 1,
          }}
          transition={
            hydrating
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </motion.svg>

        {/* Moon */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-[18px] w-[18px]"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            scale: isDark ? 1 : 0.6,
          }}
          transition={
            hydrating
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }
          aria-hidden
        >
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z" />
        </motion.svg>
      </span>
    </button>
  );
}
