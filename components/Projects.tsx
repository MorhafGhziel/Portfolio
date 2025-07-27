"use client";

import { useState, useEffect } from "react";
import { PROJECTS } from "@/constants";
import ProjectCard from "./ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const Projects = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  // Get initial count based on screen size
  const [initialCount, setInitialCount] = useState(3);
  const [visibleProjects, setVisibleProjects] = useState(initialCount);

  // Update initial count on mount and screen resize
  useEffect(() => {
    const updateInitialCount = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setInitialCount(1); // Small screens
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setInitialCount(2); // Medium screens
      } else {
        setInitialCount(3); // Large screens
      }
      // Adjust visible projects if needed
      setVisibleProjects((prev) => {
        const newInitialCount = window.matchMedia("(max-width: 640px)").matches
          ? 1
          : window.matchMedia("(max-width: 1024px)").matches
            ? 2
            : 3;
        return Math.min(prev, newInitialCount);
      });
    };

    // Initial check
    updateInitialCount();

    // Add resize listener
    window.addEventListener("resize", updateInitialCount);
    return () => window.removeEventListener("resize", updateInitialCount);
  }, []);

  const showMoreProjects = () => {
    // Increment based on screen size
    let increment = 3; // default for large screens
    if (window.matchMedia("(max-width: 640px)").matches) {
      increment = 1; // small screens
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      increment = 2; // medium screens
    }

    const newVisibleProjects = Math.min(
      visibleProjects + increment,
      PROJECTS.length
    );
    setVisibleProjects(newVisibleProjects);

    // Calculate the row number to scroll to (projects per row based on screen size)
    const projectsPerRow = increment;
    const targetRow = Math.floor((newVisibleProjects - 1) / projectsPerRow);
    const scrollTarget = document.getElementById("work");

    if (scrollTarget) {
      // Get the actual project card height
      const projectCards = document.querySelectorAll(".project-card");
      const firstCard = projectCards[0] as HTMLDivElement;
      const cardHeight = firstCard?.offsetHeight || 400;
      const scrollPosition =
        scrollTarget.offsetTop + targetRow * (cardHeight + 32); // 32px for gap

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const showLessProjects = () => {
    // Get current screen size increment
    let projectsPerRow = 3; // default for large screens
    if (window.matchMedia("(max-width: 640px)").matches) {
      projectsPerRow = 1; // small screens
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      projectsPerRow = 2; // medium screens
    }

    // Calculate projects in the last row
    const lastRowProjects = visibleProjects % projectsPerRow;

    // If we're on the last row and it's not full, just remove those projects
    // Otherwise, remove a full row
    const projectsToRemove =
      lastRowProjects > 0 ? lastRowProjects : projectsPerRow;

    // Calculate the new number of visible projects
    const newVisibleProjects = visibleProjects - projectsToRemove;
    setVisibleProjects(newVisibleProjects);

    // Calculate the row number to scroll to
    const targetRow = Math.floor((newVisibleProjects - 1) / projectsPerRow);
    const scrollTarget = document.getElementById("work");

    if (scrollTarget) {
      // Get the actual project card height
      const projectCards = document.querySelectorAll(".project-card");
      const firstCard = projectCards[0] as HTMLDivElement;
      const cardHeight = firstCard?.offsetHeight || 400;
      const scrollPosition =
        scrollTarget.offsetTop + targetRow * (cardHeight + 32); // 32px for gap

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Calculate dynamic height based on number of rows
  const getMinHeight = () => {
    const projectsPerRow = initialCount;
    const projectRows = Math.ceil(visibleProjects / projectsPerRow);
    return `${100 + (projectRows - 1) * 40}vh`;
  };

  return (
    <motion.section
      animate={{
        minHeight: getMinHeight(),
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      id="work"
      className="w-full py-16 sm:py-20 md:py-24 lg:pb-40 text-white flex justify-center items-center"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-8 sm:mb-12 ${isRTL ? "font-arabic" : ""}`}
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
          >
            {t("projects.title")}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto"
          >
            {t("projects.subtitle")}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Initial projects with subtle scroll animations */}
          {PROJECTS.slice(0, initialCount).map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative project-card"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* Additional projects with animations */}
          <AnimatePresence mode="popLayout">
            {visibleProjects > initialCount &&
              PROJECTS.slice(initialCount, visibleProjects).map(
                (project, index) => (
                  <motion.div
                    key={`${project.title}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.1,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      y: -20,
                      transition: {
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                        delay:
                          (visibleProjects - index - initialCount - 1) * 0.1,
                      },
                    }}
                    className="relative project-card"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                )
              )}
          </AnimatePresence>
        </div>
        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <div
              key="buttons-container"
              className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {visibleProjects > initialCount && (
                <motion.button
                  key="less-button"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  onClick={showLessProjects}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`px-8 py-3 rounded-lg font-medium cursor-pointer border border-gray-600 hover:bg-gray-800 hover:border-gray-500 transition-colors duration-300 ease-out ${isRTL ? "font-arabic" : ""}`}
                >
                  {t("projects.showLess")}
                </motion.button>
              )}
              {visibleProjects < PROJECTS.length && (
                <motion.button
                  key="more-button"
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  onClick={showMoreProjects}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`px-8 py-3 rounded-lg font-medium cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-out ${isRTL ? "font-arabic" : ""}`}
                >
                  {t("projects.showMore")}
                </motion.button>
              )}
            </div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
