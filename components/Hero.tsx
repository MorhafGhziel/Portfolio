"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Code2,
  Download,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";
import { useLanguage } from "./LanguageContext";

interface HeroProps {
  projectsCount: number;
}

const Hero = ({ projectsCount }: HeroProps) => {
  const { t, language } = useLanguage();
  const { scrollY } = useScroll();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const isRTL = language === "ar";

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Container transforms for the entire hero section
  const heroScale = useTransform(
    scrollY,
    [0, isMobileOrTablet ? 1000 : 400],
    [1, 0.85]
  );
  const heroY = useTransform(
    scrollY,
    [0, isMobileOrTablet ? 1000 : 400],
    [0, -200]
  );
  const heroOpacity = useTransform(
    scrollY,
    [0, isMobileOrTablet ? 1000 : 400],
    [1, 0]
  );

  // Different fade ranges for each section
  const avatarOpacity = useTransform(
    scrollY,
    [isMobileOrTablet ? 600 : 0, isMobileOrTablet ? 700 : 100],
    [1, 0]
  );

  const titleOpacity = useTransform(
    scrollY,
    [isMobileOrTablet ? 650 : 50, isMobileOrTablet ? 750 : 150],
    [1, 0]
  );

  const subtitleOpacity = useTransform(
    scrollY,
    [isMobileOrTablet ? 700 : 100, isMobileOrTablet ? 800 : 200],
    [1, 0]
  );

  const descriptionOpacity = useTransform(
    scrollY,
    [isMobileOrTablet ? 750 : 150, isMobileOrTablet ? 850 : 250],
    [1, 0]
  );

  const buttonsOpacity = useTransform(
    scrollY,
    [isMobileOrTablet ? 800 : 200, isMobileOrTablet ? 900 : 300],
    [1, 0]
  );

  const statsOpacity = useTransform(
    scrollY,
    [isMobileOrTablet ? 850 : 250, isMobileOrTablet ? 950 : 350],
    [1, 0]
  );

  const scrollIndicatorOpacity = useTransform(
    scrollY,
    [isMobileOrTablet ? 500 : 0, isMobileOrTablet ? 600 : 100],
    [1, 0]
  );

  // Transform effects for individual elements
  const avatarScale = useTransform(
    scrollY,
    [isMobileOrTablet ? 600 : 0, isMobileOrTablet ? 700 : 100],
    [1, 0.9]
  );

  const titleY = useTransform(
    scrollY,
    [isMobileOrTablet ? 650 : 50, isMobileOrTablet ? 750 : 150],
    [0, -20]
  );

  const subtitleY = useTransform(
    scrollY,
    [isMobileOrTablet ? 700 : 100, isMobileOrTablet ? 800 : 200],
    [0, -15]
  );

  const buttonsY = useTransform(
    scrollY,
    [isMobileOrTablet ? 800 : 200, isMobileOrTablet ? 900 : 300],
    [0, -15]
  );

  const statsScale = useTransform(
    scrollY,
    [isMobileOrTablet ? 850 : 250, isMobileOrTablet ? 950 : 350],
    [1, 0.95]
  );

  const scrollIndicatorY = useTransform(
    scrollY,
    [isMobileOrTablet ? 500 : 0, isMobileOrTablet ? 600 : 100],
    [0, -30]
  );

  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = "/Morhaf_Ghziel_Resume.pdf";
    link.download = "Morhaf_Ghziel_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const offset = window.innerHeight / 12.5;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="home"
      className="min-h-screen text-white flex items-center justify-center px-4 py-12 pt-24 sm:pt-28 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: easeInOut }}
      style={{
        scale: heroScale,
        y: heroY,
        opacity: heroOpacity,
        transformOrigin: "center top",
        zIndex: 10,
      }}
    >
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: easeInOut }}
        />
        <motion.div
          className="absolute top-4/7 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: easeInOut,
            delay: 4,
          }}
        />
      </motion.div>

      <div
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10`}
      >
        {/* Text Content Column */}
        <motion.div
          className={`text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}
        >
          {/* Profile Avatar */}
          <motion.div
            className={`flex justify-center ${isRTL ? "lg:justify-start" : "lg:justify-start"} mb-8`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            style={{ opacity: avatarOpacity, scale: avatarScale }}
          >
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ring-2 sm:ring-4 ring-gray-100/50 shadow-2xl rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: isRTL ? -5 : 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src="/images/Profile3.png"
                alt="Morhaf Profile Picture"
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <span className="block">{t("hero.title")}</span>
            <motion.span
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: isRTL
                  ? ["100%", "0%", "100%"]
                  : ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {t("hero.name")}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl text-gray-300 mb-8"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            style={{ opacity: subtitleOpacity, y: subtitleY }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: easeInOut,
              }}
            >
              {t("hero.frontEndDev")}
            </motion.span>{" "}
            &{" "}
            <motion.span
              initial={{ opacity: 1 }}
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: easeInOut,
              }}
            >
              {t("hero.uiuxEngineer")}
            </motion.span>
          </motion.p>

          <motion.p
            className={`text-gray-400 max-w-2xl text-xl mx-auto ${isRTL ? "lg:mr-0 lg:ml-auto" : "lg:ml-0"}`}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            style={{ opacity: descriptionOpacity }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "lg:justify-start" : "lg:justify-start"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            style={{ opacity: buttonsOpacity, y: buttonsY }}
          >
            <Button
              variant="primary"
              leftIcon={Sparkles}
              rightIcon={ArrowRight}
              onClick={handleScrollToWork}
            >
              {t("nav.work")}
            </Button>

            <Button
              variant="secondary"
              leftIcon={Download}
              onClick={handleDownloadResume}
            >
              {t("cta.downloadResume")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="relative mt-8 lg:mt-0 mb-20 sm:mb-24"
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easeInOut }}
          style={{ opacity: statsOpacity, scale: statsScale }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {/* Years Exp Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  +3
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {t("hero.stats.years")}
                </div>
              </motion.div>

              {/* Projects Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  +{projectsCount}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {t("hero.stats.projects")}
                </div>
              </motion.div>

              {/* Mobile First Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  {t("hero.stats.mobile")}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {t("hero.stats.mobileFirst")}
                </div>
              </motion.div>

              {/* UI/UX Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  {t("hero.stats.uiux")}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {t("hero.stats.design")}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
        onClick={handleScrollToAbout}
      >
        <span className="text-sm text-gray-400">
          {t("cta.scrollToExplore")}
        </span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: easeInOut,
          }}
        >
          <ChevronDown className="w-6 h-6 text-blue-500" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
