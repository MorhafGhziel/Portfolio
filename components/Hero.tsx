"use client";

import React, { useRef } from "react";
import { ArrowRight, ArrowLeft, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

interface HeroProps {
  projectsCount: number;
}

const Hero = ({ projectsCount }: HeroProps) => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const heroRef = useRef(null);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Morhaf_Ghziel_Resume.pdf";
    link.download = "Morhaf_Ghziel_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-32 overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 animated-bg" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl w-full mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={isRTL ? "lg:order-2 text-right" : "text-left"}
          >
            {/* Label with Sparkle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/10"
            >
              <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
                {t("hero.frontEndDev")}
              </span>
            </motion.div>

            {/* Name with Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
            >
              <span className="text-gradient">{t("hero.name")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl"
            >
              {t("hero.description")}
            </motion.p>

            {/* Stats with Glass Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass px-6 py-4 rounded-xl relative overflow-hidden group border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-4xl font-bold text-white relative z-10">
                  5+
                </div>
                <div className="mt-1 text-sm text-gray-500 uppercase tracking-wider relative z-10">
                  {t("hero.stats.years")}
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass px-6 py-4 rounded-xl relative overflow-hidden group border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-4xl font-bold text-white relative z-10">
                  {projectsCount}+
                </div>
                <div className="mt-1 text-sm text-gray-500 uppercase tracking-wider relative z-10">
                  {t("hero.stats.projects")}
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`mt-12 flex ${isRTL ? "flex-row-reverse justify-end" : ""} gap-4 flex-wrap`}
            >
              <motion.button
                onClick={handleScrollToWork}
                className="group relative px-8 py-4 rounded-xl font-medium overflow-hidden cursor-pointer bg-white text-black"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gray-200"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <span
                  className={`relative z-10 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {isRTL && (
                    <motion.div
                      animate={{ x: [0, -4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </motion.div>
                  )}
                  {t("nav.work")}
                  {!isRTL && (
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </span>
              </motion.button>

              <motion.button
                onClick={handleDownloadResume}
                className="group relative px-8 py-4 glass rounded-xl text-white font-medium overflow-hidden cursor-pointer border border-white/20"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(255, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.div>
                  {t("cta.downloadResume")}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative ${isRTL ? "lg:order-1" : ""} perspective`}
          >
            <motion.div
              className="relative aspect-square max-w-lg mx-auto lg:max-w-none group"
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 5,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow Effect Behind Image */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(163, 163, 163, 0.1))",
                  transform: "translateZ(-50px)",
                }}
              />

              {/* Glass Frame */}
              <motion.div
                className="absolute inset-0 glass rounded-2xl"
                whileHover={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Image container */}
              <div className="relative overflow-hidden h-full rounded-2xl">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="/images/Profile3.png"
                    alt="Morhaf Ghziel"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Animated Corner Accents */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="w-full h-full border-t-2 border-l-2 rounded-tl-2xl border-white/50"
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="w-full h-full border-b-2 border-r-2 rounded-br-2xl border-white/50"
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
