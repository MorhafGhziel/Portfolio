"use client";

import { useState } from "react";
import { PROJECTS } from "@/constants";
import ProjectCard from "./ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);

  const showMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, PROJECTS.length));
  };

  const showLessProjects = () => {
    setVisibleProjects(3);
  };

  // Calculate dynamic height based on number of rows
  const getMinHeight = () => {
    const projectRows = Math.ceil(visibleProjects / 3); // 3 projects per row
    return `${100 + (projectRows - 1) * 40}vh`; // Base 100vh + 40vh per additional row
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
      className="w-full py-16 sm:py-20 md:py-24 text-white flex justify-center items-center"
    >
      <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
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
            Featured Projects
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
            Here are some of my recent projects that showcase my skills and
            experience
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* First three projects with subtle scroll animations */}
          {PROJECTS.slice(0, 3).map((project, index) => (
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
              className="relative"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* Additional projects with animations */}
          <AnimatePresence mode="popLayout">
            {visibleProjects > 3 &&
              PROJECTS.slice(3, visibleProjects).map((project, index) => (
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
                      delay: (visibleProjects - index - 4) * 0.1,
                    },
                  }}
                  className="relative"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {visibleProjects < PROJECTS.length ? (
              <button
                onClick={showMoreProjects}
                className="px-8 py-3 rounded-lg font-medium cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                Show More
              </button>
            ) : (
              <button
                onClick={showLessProjects}
                className="px-8 py-3 rounded-lg font-medium cursor-pointer border border-gray-600 hover:bg-gray-800 hover:border-gray-500 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                Show Less
              </button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
