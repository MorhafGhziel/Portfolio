"use client";

import React, { useRef } from "react";
import Skills from "./ui/Skills";
import Expertise from "./ui/Expertise";
import LocationCard from "./ui/LocationCard";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Enhanced scroll animations
  const aboutY = useTransform(scrollY, [0, 400], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  // Parallax effects for different components
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="min-h-screen text-white flex items-center justify-center px-4 flex-col py-12 relative -mt-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={containerVariants}
      style={{
        y: aboutY,
      }}
    >
      <motion.div
        className="text-center mb-16"
        variants={containerVariants}
        style={{ y: titleY }}
      >
        <motion.h2 className="text-4xl font-bold mb-4" variants={titleVariants}>
          About Me
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Get to know more about my journey, experience, and what drives me as a
          developer
        </motion.p>
      </motion.div>

      <motion.div
        className="space-y-20"
        variants={containerVariants}
        style={{ y: contentY }}
      >
        <motion.div
          className="grid lg:grid-cols-3 gap-8 items-start"
          variants={containerVariants}
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.h3
              className="text-3xl font-bold mb-6"
              variants={itemVariants}
            >
              <motion.span
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent inline-block"
                whileHover={{
                  scale: 1.02,
                  transition: { type: "tween", duration: 0.2 },
                }}
              >
                Front End Developer & UI/UX Designer
              </motion.span>
            </motion.h3>
            <motion.p
              className="text-gray-300 text-lg max-w-3xl leading-relaxed mb-8"
              variants={itemVariants}
            >
              I'm Morhaf Ghziel, a passionate Front End Developer and UI/UX
              Designer based in Saudi Arabia. I specialize in creating modern,
              responsive web applications using cutting-edge technologies. My
              journey in web development combines technical expertise with
              creative design thinking to deliver exceptional digital
              experiences.
            </motion.p>
            <motion.div variants={itemVariants} className="mb-12">
              <Expertise />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Skills />
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              transition: { type: "tween", duration: 0.2 },
            }}
          >
            <LocationCard />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
