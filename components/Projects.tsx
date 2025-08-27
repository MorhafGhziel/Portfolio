"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { PROJECTS } from "@/constants";
import ProjectCard from "./ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

import ImageModal from "./ui/ImageModal";
import { Search, Filter, X, Check } from "lucide-react";

const Projects = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  // State for filtering and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  // Ref for click outside detection
  const filterRef = useRef<HTMLDivElement>(null);

  // Get initial count based on screen size
  const [initialCount, setInitialCount] = useState(3);
  const [visibleProjects, setVisibleProjects] = useState(initialCount);

  // Get all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    PROJECTS.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects based on search and technology
  const filteredProjects = useMemo(() => {
    const filtered = PROJECTS.filter((project) => {
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
    return filtered;
  }, [searchQuery, selectedTechs]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

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
      // Reset visible projects when filtering
      setVisibleProjects(initialCount);
    };

    // Initial check
    updateInitialCount();

    // Add resize listener
    window.addEventListener("resize", updateInitialCount);
    return () => window.removeEventListener("resize", updateInitialCount);
  }, [initialCount]);

  // Reset visible projects when filtering changes
  useEffect(() => {
    setVisibleProjects(initialCount);
  }, [searchQuery, selectedTechs, initialCount]);

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
      filteredProjects.length
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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const getFilterButtonText = () => {
    if (selectedTechs.length === 0) {
      return isRTL ? "تصفية حسب التقنية" : "Filter by Tech";
    } else if (selectedTechs.length === 1) {
      return selectedTechs[0];
    } else {
      return isRTL
        ? `${selectedTechs.length} تقنيات مختارة`
        : `${selectedTechs.length} selected`;
    }
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

        {/* Search and Filter Controls */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center w-full max-w-5xl mx-auto">
            {/* Search Bar */}
            <motion.div
              className="relative w-full sm:max-w-[70%]"
              layout
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <motion.input
                type="text"
                placeholder={
                  isRTL ? "البحث في المشاريع..." : "Search projects..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${isRTL ? "font-arabic text-right" : "text-left"}`}
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Technology Filter */}
            <motion.div className="relative z-30" ref={filterRef}>
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white hover:bg-gray-700/50 transition-all duration-200 cursor-pointer min-w-[160px] ${isRTL ? "font-arabic flex-row-reverse" : ""}`}
              >
                <Filter className="w-5 h-5" />
                <motion.span className="max-w-32 truncate">
                  <motion.span
                    key={getFilterButtonText()}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getFilterButtonText()}
                  </motion.span>
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full sm:left-0 left-1/2 -translate-x-1/2 sm:translate-x-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10 z-40"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <motion.h4
                          className="text-white font-medium text-sm cursor-pointer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isRTL ? "اختر التقنيات" : "Select Technologies"}
                        </motion.h4>
                        <AnimatePresence>
                          {selectedTechs.length > 0 && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => setSelectedTechs([])}
                              className="text-xs text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                            >
                              <motion.span
                                key="clear-all"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {isRTL ? "مسح الكل" : "Clear all"}
                              </motion.span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Scrollable Technologies List */}
                      <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-800/50 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg">
                        <div className="space-y-1">
                          {allTechnologies.map((tech) => {
                            const isSelected = selectedTechs.includes(tech);
                            return (
                              <motion.button
                                key={tech}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => toggleTech(tech)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-gray-800/70 cursor-pointer group ${
                                  isSelected
                                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/50"
                                    : "text-gray-300 hover:text-white hover:shadow-[inset_0_1px_12px_rgba(0,0,0,0.2)]"
                                } ${isRTL ? "font-arabic flex-row-reverse" : ""}`}
                              >
                                {/* Custom Checkbox */}
                                <motion.div
                                  className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                                    isSelected
                                      ? "bg-blue-600 border-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.3)]"
                                      : "border-gray-500 group-hover:border-gray-300"
                                  }`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <AnimatePresence>
                                    {isSelected && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Check className="w-3 h-3 text-white" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                                <motion.span
                                  className="flex-1 text-left cursor-pointer"
                                  key={tech}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {tech}
                                </motion.span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Footer */}
                      <AnimatePresence>
                        {selectedTechs.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 pt-3 border-t border-gray-700/50 bg-gradient-to-b from-transparent to-gray-900/30"
                          >
                            <div className="text-xs text-gray-400 cursor-pointer">
                              <motion.span
                                key={selectedTechs.length}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {isRTL
                                  ? `${selectedTechs.length} تقنية مختارة`
                                  : `${selectedTechs.length} technology selected`}
                              </motion.span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Results Count */}
          <motion.div
            className="text-center text-gray-400 text-sm cursor-pointer"
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.span
              key={`${filteredProjects.length}-${PROJECTS.length}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isRTL
                ? `عرض ${filteredProjects.length} من ${PROJECTS.length} مشروع`
                : `Showing ${filteredProjects.length} of ${PROJECTS.length} projects`}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">
          {/* Initial projects with subtle scroll animations */}
          {filteredProjects.slice(0, initialCount).map((project, index) => (
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
              className="relative project-card z-[5]"
            >
              <ProjectCard
                project={project}
                onImageClick={(url, alt) => setSelectedImage({ url, alt })}
              />
            </motion.div>
          ))}

          {/* Additional projects with animations */}
          <AnimatePresence mode="popLayout">
            {visibleProjects > initialCount &&
              filteredProjects
                .slice(initialCount, visibleProjects)
                .map((project, index) => (
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
                    <ProjectCard
                      project={project}
                      onImageClick={(url, alt) =>
                        setSelectedImage({ url, alt })
                      }
                    />
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less Buttons */}
        {filteredProjects.length > 0 && (
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
                {visibleProjects < filteredProjects.length && (
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
        )}

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 text-lg mb-4">
              {isRTL
                ? "لم يتم العثور على مشاريع تطابق معايير البحث"
                : "No projects found matching your search criteria"}
            </div>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-200 cursor-pointer"
            >
              {isRTL ? "مسح الفلاتر" : "Clear Filters"}
            </button>
          </motion.div>
        )}
      </div>

      {/* Image Modal at root level */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ""}
        imageAlt={selectedImage?.alt || ""}
      />
    </motion.section>
  );
};

export default Projects;
