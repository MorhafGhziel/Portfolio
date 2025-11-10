"use client";

import { useState, useMemo } from "react";
import { PROJECTS } from "@/constants";
import ProjectCard from "./ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import ImageModal from "./ui/ImageModal";
import { Search } from "lucide-react";

const Projects = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    PROJECTS.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech =
        selectedTechs.length === 0 ||
        project.techStack.some((tech) => selectedTechs.includes(tech));

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTechs]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <section
      id="work"
      className="relative min-h-screen px-6 md:px-12 lg:px-20 py-32 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-white/3 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl w-full mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-6 border border-white/10"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
              {t("projects.title")}
            </span>
          </motion.div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient">
              Selected Work
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t("projects.subtitle")}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-8"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <motion.div 
              className="glass rounded-2xl overflow-hidden border border-white/10"
              whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <div className="relative">
                <Search className={`absolute ${isRTL ? "right-6" : "left-6"} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                <input
                  type="text"
                  placeholder={isRTL ? "البحث في المشاريع..." : "Search projects..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-transparent ${isRTL ? "pr-16 pl-6" : "pl-16 pr-6"} py-5 text-white placeholder-gray-600 focus:outline-none`}
                />
              </div>
            </motion.div>
          </div>

          {/* Tech Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {allTechnologies.map((tech, index) => (
              <motion.button
                key={tech}
                onClick={() => toggleTech(tech)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`relative text-xs font-medium tracking-wider uppercase px-5 py-2.5 rounded-lg cursor-pointer overflow-hidden ${
                  selectedTechs.includes(tech)
                    ? "text-white"
                    : "text-gray-400"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedTechs.includes(tech) && (
                  <motion.div
                    layoutId="selectedTech"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!selectedTechs.includes(tech) && (
                  <motion.div
                    className="absolute inset-0 glass border border-white/10 rounded-lg"
                    whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
                  />
                )}
                <span className="relative z-10">{tech}</span>
              </motion.button>
            ))}
          </div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <span className="text-sm text-gray-400 glass px-6 py-2 rounded-full inline-block">
              {isRTL
                ? `عرض ${filteredProjects.length} من ${PROJECTS.length} مشروع`
                : `Showing ${filteredProjects.length} of ${PROJECTS.length} projects`}
            </span>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              project={project}
              onImageClick={(url, alt) => setSelectedImage({ url, alt })}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <motion.button
              onClick={() => setVisibleProjects((prev) => prev + 6)}
              className="group relative px-10 py-5 rounded-2xl font-medium overflow-hidden cursor-pointer bg-white text-black"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gray-200"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10">{t("projects.showMore")}</span>
            </motion.button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="glass rounded-2xl p-12 border border-white/10 max-w-lg mx-auto">
              <p className="text-gray-300 text-lg mb-6">
                {isRTL
                  ? "لم يتم العثور على مشاريع تطابق معايير البحث"
                  : "No projects found matching your search criteria"}
              </p>
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTechs([]);
                }}
                className="glass px-8 py-3 rounded-xl text-white border border-white/20 font-medium cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(255, 255, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isRTL ? "مسح الفلاتر" : "Clear Filters"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ""}
        imageAlt={selectedImage?.alt || ""}
      />
    </section>
  );
};

export default Projects;
