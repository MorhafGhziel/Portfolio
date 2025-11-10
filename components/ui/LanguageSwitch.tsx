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
      className={`relative px-3 py-1.5 rounded-lg bg-white/10 text-sm font-medium cursor-pointer overflow-hidden ${
        isTransitioning ? "pointer-events-none opacity-50" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isTransitioning}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <span className="relative z-10 text-white">
        {languages[language === "en" ? "ar" : "en"].name}
      </span>
    </motion.button>
  );
}
