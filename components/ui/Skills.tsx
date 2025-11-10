"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/constants";
import { useLanguage } from "../LanguageContext";
import { Sparkles } from "lucide-react";

const Skills = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <div className={isRTL ? "text-right" : ""}>
      <div className="flex items-center gap-3 mb-8">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {t("about.skills")}
        </h3>
      </div>
      <div className={`flex flex-wrap gap-3 ${isRTL ? "justify-start" : ""}`}>
        {SKILLS.map((skill, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                scale: 1.1,
                y: -4,
              }}
              className="relative px-5 py-2.5 rounded-lg text-sm cursor-default overflow-hidden border border-white/20 bg-white/5 text-gray-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 font-medium">{skill}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
