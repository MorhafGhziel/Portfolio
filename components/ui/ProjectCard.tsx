"use client";

import Image from "next/image";
import { type Project } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  onImageClick: (
    url: string,
    alt: string,
    images?: string[],
    index?: number
  ) => void;
}

const ProjectCard = ({ project, onImageClick }: ProjectCardProps) => {
  const { language, t } = useLanguage();
  const isRTL = language === "ar";
  const {
    title,
    description,
    titleAr,
    descriptionAr,
    image,
    images,
    techStack,
    githubUrl,
    liveUrl,
  } = project;

  const displayTitle = isRTL ? titleAr : title;
  const displayDescription = isRTL ? descriptionAr : description;

  const [showTooltip, setShowTooltip] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Use images array if available, otherwise fall back to single image
  const projectImages = images && images.length > 0 ? images : [image];
  const hasMultipleImages = projectImages.length > 1;
  const currentImage = projectImages[currentImageIndex];

  const remainingTech = techStack.length > 4 ? techStack.slice(4) : [];

  // Truncate description to 200 characters
  const MAX_DESCRIPTION_LENGTH = 200;
  const shouldTruncate = displayDescription.length > MAX_DESCRIPTION_LENGTH;
  const truncatedDescription = shouldTruncate
    ? displayDescription.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
    : displayDescription;
  const showDescription = isDescriptionExpanded
    ? displayDescription
    : truncatedDescription;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group perspective"
    >
      {/* Image Container */}
      <motion.div
        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 group/image"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={() => {
          const currentImageIndex =
            project.images && project.images.length > 0
              ? projectImages.indexOf(currentImage)
              : 0;
          onImageClick(
            currentImage,
            displayTitle,
            project.images,
            currentImageIndex
          );
        }}
      >
        {/* Image with transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={`${displayTitle} - Image ${currentImageIndex + 1}`}
              width={800}
              height={500}
              className="w-full h-full object-cover cursor-pointer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className={`absolute ${isRTL ? "right-2" : "left-2"} top-1/2 -translate-y-1/2 z-10 glass border border-white/20 rounded-lg p-2 opacity-0 group-hover/image:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isRTL ? (
                <ChevronRight className="w-5 h-5 text-white" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-white" />
              )}
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 z-10 glass border border-white/20 rounded-lg p-2 opacity-0 group-hover/image:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isRTL ? (
                <ChevronLeft className="w-5 h-5 text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </>
        )}

        {/* Image Indicators - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 opacity-0 group-hover/image:opacity-100 transition-opacity">
            {projectImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter - Only show if multiple images */}
        {hasMultipleImages && (
          <div
            className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} z-10 glass border border-white/20 rounded-lg px-2 py-1 text-xs text-white/80 opacity-0 group-hover/image:opacity-100 transition-opacity backdrop-blur-sm`}
          >
            {currentImageIndex + 1} / {projectImages.length}
          </div>
        )}
      </motion.div>

      {/* Content */}
      <div className="mt-8 space-y-5">
        {/* Title */}
        <motion.h3
          className={`text-2xl font-bold transition-colors ${isRTL ? "text-right" : ""}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-gradient">{displayTitle}</span>
        </motion.h3>

        {/* Description */}
        <div className={`space-y-2 ${isRTL ? "text-right" : ""}`}>
          <p className="text-gray-300 leading-relaxed">{showDescription}</p>
          {shouldTruncate && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className={`flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mt-2 cursor-pointer ${
                isRTL ? "flex-row-reverse ml-auto" : ""
              }`}
            >
              <span>
                {isDescriptionExpanded
                  ? isRTL
                    ? "عرض أقل"
                    : "Show less"
                  : isRTL
                    ? "عرض المزيد"
                    : "Show more"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDescriptionExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Tech Stack */}
        <div
          className={`flex flex-wrap gap-2 ${isRTL ? "justify-start" : ""} relative`}
        >
          {techStack.slice(0, 4).map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-lg cursor-default overflow-hidden border border-white/20 text-gray-400 bg-white/5"
              whileHover={{
                scale: 1.05,
                y: -2,
                borderColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">{tech}</span>
            </motion.span>
          ))}
          {techStack.length > 4 && (
            <span
              className="text-xs tracking-wider uppercase text-gray-600 px-4 py-2 cursor-pointer relative z-50"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              +{techStack.length - 4}
              {/* Tooltip */}
              {showTooltip && remainingTech.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[100] pointer-events-none"
                >
                  <div className="rounded-lg p-3 border border-white/20 shadow-lg min-w-[150px] whitespace-nowrap bg-[#0f0f0f]/95 backdrop-blur-md">
                    <div className="text-xs font-medium text-white mb-2 uppercase tracking-wider">
                      More Tech:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {remainingTech.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded border border-white/20 text-gray-300 bg-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </span>
          )}
        </div>

        {/* Links */}
        <div className={`flex ${isRTL ? "flex-row-reverse justify-end" : ""} gap-4 pt-2`}>
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-xl border border-white/20 flex items-center gap-2 text-sm font-medium text-gray-400 cursor-pointer"
              whileHover={{
                scale: 1.05,
                y: -2,
                borderColor: "rgba(255, 255, 255, 0.4)",
                color: "#ffffff",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Github className="w-4 h-4" />
              <span>{t("projects.viewCode")}</span>
            </motion.a>
          )}

          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-medium cursor-pointer overflow-hidden bg-white text-black"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gray-200"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative z-10"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
              <span className="relative z-10">{t("projects.live")}</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
