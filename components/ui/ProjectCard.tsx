"use client";

import Image from "next/image";
import { type Project } from "@/constants";
import { motion } from "framer-motion";
import { useState } from "react";

import { useLanguage } from "../LanguageContext";

interface ProjectCardProps {
  project: Project;
  onImageClick: (url: string, alt: string) => void;
}

const ProjectCard = ({ project, onImageClick }: ProjectCardProps) => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const {
    title,
    description,
    titleAr,
    descriptionAr,
    image,
    techStack,
    githubUrl,
    liveUrl,
  } = project;

  // Use Arabic or English content based on language
  const displayTitle = isRTL ? titleAr : title;
  const displayDescription = isRTL ? descriptionAr : description;

  return (
    <>
      <motion.div
        className="group h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex flex-col h-full rounded-lg border text-card-foreground shadow-sm bg-gray-900/80 backdrop-blur-sm border-gray-700/50 overflow-hidden hover:bg-gray-800/80 transition-colors duration-300 ease-out relative">
          <div
            className="aspect-video bg-gray-800 overflow-hidden relative cursor-pointer"
            onClick={() => onImageClick(image, displayTitle)}
          >
            <Image
              src={image}
              alt={displayTitle}
              width={1920}
              height={1080}
              className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-center justify-center">
              <span
                className={`text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out ${isRTL ? "font-arabic" : ""}`}
              >
                {t("projects.clickToView")}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-6">
            <h3
              className={`font-semibold tracking-tight text-xl text-white group-hover:text-gray-200 transition-colors duration-300 ease-out mb-3 ${isRTL ? "font-arabic text-right" : "text-left"}`}
            >
              {displayTitle}
            </h3>
            <p
              className={`text-gray-400 group-hover:text-gray-300 transition-colors duration-300 ease-out text-sm mb-6 ${isRTL ? "font-arabic text-right" : "text-left"}`}
            >
              {displayDescription}
            </p>

            <div
              className={`flex flex-wrap gap-2 mb-6 ${isRTL ? "justify-start" : "justify-start"}`}
            >
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded-full border text-xs font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-3 py-1 bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:border-gray-500 hover:text-white cursor-pointer"
                >
                  {tech}
                </div>
              ))}
            </div>

            <div
              className={`flex gap-3 mt-auto ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/80 border border-gray-600 rounded-md hover:bg-gray-700 hover:text-white hover:border-gray-500 transition-all duration-200 backdrop-blur-sm ${isRTL ? "font-arabic" : ""}`}
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
                  {t("projects.viewCode")}
                </a>
              </div>
              <div className="flex-1">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 ${isRTL ? "font-arabic" : ""}`}
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
                  {t("projects.viewProject")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
