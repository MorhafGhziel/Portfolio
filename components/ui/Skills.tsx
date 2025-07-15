"use client";

import { motion, Variants } from "framer-motion";
import { SKILLS } from "@/constants";

const Skills = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const skillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.h4
        className="text-xl font-semibold text-white mb-4"
        variants={skillVariants}
      >
        Skills
      </motion.h4>
      <motion.div
        className="max-w-2xl flex flex-wrap gap-2"
        variants={containerVariants}
      >
        {SKILLS.map((skill, index) => (
          <motion.div
            key={index}
            className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-3 py-1 bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 cursor-pointer"
            variants={skillVariants}
            whileHover={{
              scale: 1.1,
              transition: {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              },
            }}
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skills;
