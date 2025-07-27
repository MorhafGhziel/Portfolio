"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";
import { languages } from "@/constants/languages";

const Expertise = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  // Get expertise items directly from the languages object
  const expertiseItems = languages[language].translations.about.expertise.items;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={`space-y-6 mb-8 ${isRTL ? "text-right" : ""}`}>
      <h4 className="text-xl font-semibold text-white mb-4">
        {t("about.expertise.title")}
      </h4>
      <motion.ul
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {expertiseItems.map((point, index) => (
          <motion.li
            key={index}
            className={`flex items-start gap-3 text-gray-300 ${isRTL ? "text-right" : ""}`}
            variants={itemVariants}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>{point}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Expertise;
