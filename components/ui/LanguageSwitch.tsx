"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";
import { languages } from "@/constants/languages";

export function LanguageSwitch() {
  const { language, setLanguage, isTransitioning } = useLanguage();

  const toggleLanguage = () => {
    if (!isTransitioning) {
      setLanguage(language === "en" ? "ar" : "en");
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium cursor-pointer ${
        isTransitioning ? "pointer-events-none opacity-50" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isTransitioning}
    >
      {languages[language === "en" ? "ar" : "en"].name}
    </motion.button>
  );
}
