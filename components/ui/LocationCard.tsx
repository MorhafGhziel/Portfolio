"use client";

import React from "react";
import { Clock, Globe, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";

const LocationCard = () => {
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
    hidden: { opacity: 0, x: -20 },
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
      rotate: 5,
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
      <div className="p-6">
        <motion.h4
          className="text-xl font-semibold text-white mb-6"
          variants={itemVariants}
        >
          Location & Availability
        </motion.h4>
        <div className="space-y-4">
          {/* Location */}
          <motion.div
            className="flex items-center gap-3 text-gray-300"
            variants={itemVariants}
          >
            <motion.div variants={iconVariants}>
              <MapPin className="w-5 h-5 text-blue-400" />
            </motion.div>
            <div>
              <div className="font-medium">Based in Riyadh, Saudi Arabia</div>
              <div className="text-sm text-gray-400">
                Available for remote work worldwide
              </div>
            </div>
          </motion.div>

          {/* Timezone */}
          <motion.div
            className="flex items-center gap-3 text-gray-300"
            variants={itemVariants}
          >
            <motion.div variants={iconVariants}>
              <Clock className="w-5 h-5 text-purple-400" />
            </motion.div>
            <div>
              <div className="font-medium">Timezone</div>
              <div className="text-sm text-gray-400">GMT+3 (Riyadh Time)</div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className="flex items-center gap-3 text-gray-300"
            variants={itemVariants}
          >
            <motion.div variants={iconVariants}>
              <Globe className="w-5 h-5 text-green-400" />
            </motion.div>
            <div>
              <div className="font-medium">Languages</div>
              <div className="text-sm text-gray-400">
                Arabic (Native) • English (Professional)
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
                Available for new projects
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
