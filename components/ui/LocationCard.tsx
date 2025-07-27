"use client";

import React from "react";
import { Clock, Globe, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../LanguageContext";

const LocationCard = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.1,
      rotate: isRTL ? -5 : 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  return (
    <motion.div
      className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
        <motion.h4
          className="text-xl font-semibold text-white mb-6"
          variants={itemVariants}
        >
          {t("about.location.title")}
        </motion.h4>
        <div className="space-y-4">
          {/* Location */}
          <motion.div
            className={`flex items-center gap-3 text-gray-300 ${isRTL ? "" : ""}`}
            variants={itemVariants}
          >
            <motion.div variants={iconVariants}>
              <MapPin className="w-5 h-5 text-blue-400" />
            </motion.div>
            <div>
              <div className="font-medium">{t("about.location.based")}</div>
              <div className="text-sm text-gray-400">
                {t("about.location.available")}
              </div>
            </div>
          </motion.div>

          {/* Timezone */}
          <motion.div
            className={`flex items-center gap-3 text-gray-300 ${isRTL ? "" : ""}`}
            variants={itemVariants}
          >
            <motion.div variants={iconVariants}>
              <Clock className="w-5 h-5 text-purple-400" />
            </motion.div>
            <div>
              <div className="font-medium">
                {isRTL ? "التوقيت" : t("about.location.timezone")}
              </div>
              <div className="text-sm text-gray-400">
                {isRTL ? "توقيت الرياض (GMT+3)" : t("about.location.timezone")}
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className={`flex items-center gap-3 text-gray-300 ${isRTL ? "" : ""}`}
            variants={itemVariants}
          >
            <motion.div variants={iconVariants}>
              <Globe className="w-5 h-5 text-green-400" />
            </motion.div>
            <div>
              <div className="font-medium">
                {isRTL ? "اللغات" : t("about.location.languages")}
              </div>
              <div className="text-sm text-gray-400">
                {isRTL
                  ? "العربية (اللغة الأم) • الإنجليزية (مستوى احترافي)"
                  : t("about.location.languages")}
              </div>
            </div>
          </motion.div>

          {/* Availability Status */}
          <motion.div
            className="mt-6 pt-6 border-t border-gray-700"
            variants={itemVariants}
          >
            <div className="text-center">
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="text-sm text-green-400 font-medium"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {t("about.location.status")}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
