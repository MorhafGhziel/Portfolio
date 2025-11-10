"use client";

import Image from "next/image";
import { type Project } from "@/constants";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface ProjectCardProps {
  project: Project;
  onImageClick: (url: string, alt: string) => void;
}

const ProjectCard = ({ project, onImageClick }: ProjectCardProps) => {
  const { language } = useLanguage();
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

  const displayTitle = isRTL ? titleAr : title;
  const displayDescription = isRTL ? descriptionAr : description;

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
        className="relative aspect-[16/10] overflow-hidden rounded-2xl cursor-pointer"
        onClick={() => onImageClick(image, displayTitle)}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Glass Frame */}
        <div className="absolute inset-0 glass rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-300 z-10" />
        
        {/* Gradient Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        />

        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <Image
            src={image}
            alt={displayTitle}
            width={800}
            height={500}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Hover Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass rounded-full p-4 border border-white/20">
            <Eye className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="mt-8 space-y-5">
        {/* Title */}
        <motion.h3
          className={`text-2xl font-bold transition-colors ${isRTL ? "text-right" : ""}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-gradient">
            {displayTitle}
          </span>
        </motion.h3>

        {/* Description */}
        <p className={`text-gray-300 leading-relaxed ${isRTL ? "text-right" : ""}`}>
          {displayDescription}
        </p>

        {/* Tech Stack */}
        <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-start" : ""}`}>
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
            <span className="text-xs tracking-wider uppercase text-gray-600 px-4 py-2">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className={`flex ${isRTL ? "flex-row-reverse" : ""} gap-4 pt-2`}>
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
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github className="w-4 h-4" />
            </motion.div>
            <span>Code</span>
          </motion.a>
          
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
            <span className="relative z-10">Live</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
