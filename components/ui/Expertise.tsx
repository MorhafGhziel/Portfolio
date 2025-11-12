"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";
import { languages } from "@/constants/languages";
import { CheckCircle2 } from "lucide-react";

const Expertise = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const expertiseItems = languages[language].translations.about.expertise.items;

  return (
    <div className={`space-y-8 ${isRTL ? "text-right" : ""}`}>
      <h3 className="text-2xl font-bold text-white tracking-tight">
        {t("about.expertise.title")}
      </h3>
      <div className="space-y-4">
        {expertiseItems.map((point, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: isRTL ? -8 : 8, scale: 1.02 }}
              className="group relative"
            >
              <div className="flex items-start gap-4 text-gray-400 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="mt-1 flex-shrink-0"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
                <span className="leading-relaxed group-hover:text-white transition-colors duration-300">
                  {point}
                </span>
              </div>
              {/* Hover line */}
              <motion.div
                className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Expertise;
