"use client";

import { PROJECTS } from "@/constants";
import ProjectCard from "./ui/ProjectCard";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section
      id="work"
      className="min-h-screen w-full py-16 sm:py-20 md:py-24 text-white flex justify-center items-center"
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
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
