"use client";

import React from "react";
import Skills from "./ui/Skills";
import Expertise from "./ui/Expertise";
import LocationCard from "./ui/LocationCard";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Code2, Palette, Zap } from "lucide-react";

const About = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-7xl w-full mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-6 border border-white/10"
          >
            <Code2 className="w-5 h-5 text-white" />
            <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
              {t("about.title")}
            </span>
          </motion.div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient">{t("about.role")}</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t("about.description")}
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Expertise Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 border border-white/10 card-hover"
            >
              <Expertise />
            </motion.div>

            {/* Skills Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 border border-white/10 card-hover"
            >
              <Skills />
            </motion.div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 border border-white/10 card-hover h-full"
            >
              <LocationCard />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
