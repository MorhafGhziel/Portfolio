"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, languages } from "@/constants/languages";
import TransitionOverlay from "./ui/TransitionOverlay";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTransitioning: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language);
    // Update document direction for RTL support
    document.documentElement.dir = languages[language].dir;
  }, [language]);

  const setLanguage = async (newLanguage: Language) => {
    if (newLanguage === language) return;

    setIsTransitioning(true);

    // Wait for fade to black
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Change language
    setLanguageState(newLanguage);

    // Wait a bit to ensure content has updated
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Start fade back in
    setIsTransitioning(false);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = languages[language].translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, isTransitioning }}
    >
      <TransitionOverlay isVisible={isTransitioning} />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
