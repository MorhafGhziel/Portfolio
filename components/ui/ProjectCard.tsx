"use client";

import Image from "next/image";
import { type Project } from "@/constants";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, image, techStack, githubUrl, liveUrl } = project;

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
    >
      <div className="rounded-lg border text-card-foreground shadow-sm bg-gray-900/80 backdrop-blur-sm border-gray-700/50 overflow-hidden h-full hover:bg-gray-800/80 transition-all duration-300">
        <div className="aspect-video bg-gray-800 overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <div className="font-semibold tracking-tight text-xl text-white group-hover:text-gray-400 transition-colors">
            {title}
          </div>
          <div className="text-gray-400 text-sm">{description}</div>
        </div>
        <div className="p-6 pt-0">
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-3 py-1 bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 cursor-pointer"
              >
                {tech}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/80 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white hover:border-gray-500 transition-all duration-200 backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github w-4 h-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                Code
              </a>
            </div>
            <div className="flex-1">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-external-link w-4 h-4"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
