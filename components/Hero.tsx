"use client";

import React from "react";
import {
  ArrowRight,
  Code2,
  Download,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import Button from "./ui/Button";

const Hero = () => {
  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = "/Morhaf_Ghziel_Resume.pdf";
    link.download = "Morhaf_Ghziel_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: easeInOut }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: easeInOut,
            delay: 4,
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column - Text Content */}
        <div className="text-center lg:text-left">
          {/* Profile Avatar */}
          <motion.div
            className="flex justify-center lg:justify-start mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
          >
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ring-2 sm:ring-4 ring-blue-500/50 shadow-2xl rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Morhaf Profile Picture"
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="block">Hi, I'm</span>
            <motion.span
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Morhaf
            </motion.span>
          </motion.h1>

          <p className="text-3xl text-gray-300 mb-8">
            Front-End Developer & UI/UX Engineer
          </p>
          <p className="text-gray-400 max-w-2xl text-xl mx-auto lg:mx-0">
            I create exceptional digital experiences by combining clean code
            with thoughtful design. Specialized in React, Next.js, and modern
            web technologies.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              variant="primary"
              leftIcon={Sparkles}
              rightIcon={ArrowRight}
            >
              View My Work
            </Button>

            <Button
              variant="secondary"
              leftIcon={Download}
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
          </div>
        </div>

        {/* Right Column - Stats Grid */}
        <motion.div
          className="relative mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {/* Projects Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  7+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Projects</div>
              </motion.div>

              {/* Experience Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.7, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  3+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Years Exp
                </div>
              </motion.div>

              {/* UI/UX Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.9, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  UI/UX
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Design</div>
              </motion.div>

              {/* Mobile Stat */}
              <motion.div
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-400" />
                </motion.div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  Mobile
                </div>
                <div className="text-xs sm:text-sm text-gray-400">First</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
