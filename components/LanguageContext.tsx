"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Language, languages } from "@/constants/languages";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Dot-path lookup into the active translation table. */
  t: (key: string) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  // Brief dim while the DOM swaps direction — cheaper and calmer than a
  // full-screen curtain, and it never blocks interaction.
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") setLanguageState(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = languages[language].dir;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback(
    (next: Language) => {
      if (next === language) return;
      setSwapping(true);
      setLanguageState(next);
      window.setTimeout(() => setSwapping(false), 180);
    },
    [language]
  );

  const t = useCallback(
    (key: string): string => {
      const value = key
        .split(".")
        .reduce<unknown>(
          (acc, part) =>
            acc && typeof acc === "object"
              ? (acc as Record<string, unknown>)[part]
              : undefined,
          languages[language].translations
        );
      return typeof value === "string" ? value : key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isRTL: languages[language].dir === "rtl",
    }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div
        style={{
          opacity: swapping ? 0.35 : 1,
          transition: "opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
