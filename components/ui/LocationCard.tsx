"use client";

import React from "react";
import { Clock, Globe, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";

const LocationCard = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const locationItems = [
    {
      icon: MapPin,
      title: t("about.location.based"),
      description: t("about.location.available"),
    },
    {
      icon: Clock,
      title: isRTL ? "التوقيت" : t("about.location.timezone"),
      description: isRTL ? "توقيت الرياض (GMT+3)" : t("about.location.timezone"),
    },
    {
      icon: Globe,
      title: isRTL ? "اللغات" : t("about.location.languages"),
      description: isRTL
        ? "العربية (اللغة الأم) • الإنجليزية (مستوى احترافي)"
        : t("about.location.languages"),
    },
  ];

  return (
    <div>
      <h3 className={`text-2xl font-bold text-white mb-8 ${isRTL ? "text-right" : ""}`}>
        {t("about.location.title")}
      </h3>
      
      <div className="space-y-6">
        {locationItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ x: isRTL ? -4 : 4 }}
              className="group"
            >
              <div className={`flex ${isRTL ? "flex-row-reverse" : ""} items-start gap-4`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center flex-shrink-0"
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>
                <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                  <div className="font-medium text-white group-hover:text-gray-300 transition-all duration-300">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex items-center gap-3 glass rounded-lg p-4 border border-white/10">
            <motion.div
              className="w-3 h-3 rounded-full bg-white"
              animate={{ 
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-white font-medium uppercase tracking-wider">
              {t("about.location.status")}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationCard;
