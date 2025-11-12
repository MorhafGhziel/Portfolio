"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
  images?: string[];
  initialIndex?: number;
}

const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  images,
  initialIndex = 0,
}: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const projectImages = images && images.length > 0 ? images : [imageUrl];
  const hasMultipleImages = projectImages.length > 1;
  const currentImage = projectImages[currentIndex];

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasMultipleImages) {
        setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
      } else if (e.key === "ArrowRight" && hasMultipleImages) {
        setCurrentIndex((prev) => (prev + 1) % projectImages.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasMultipleImages, projectImages.length, onClose]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute -top-4 -right-4 w-10 h-10 glass border border-white/20 rounded-full text-white flex items-center justify-center hover:border-white/40 transition-colors z-[100] cursor-pointer shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Image Container with Border */}
            <div className="relative w-full h-full">
              {/* Solid black background overlay to prevent UI elements showing during transitions */}
              <div className="absolute inset-0 bg-black rounded-xl z-0" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative border-2 border-white/20 rounded-xl overflow-hidden bg-black p-2 z-10"
                >
                  <Image
                    src={currentImage}
                    alt={`${imageAlt} - Image ${currentIndex + 1}`}
                    width={1920}
                    height={1080}
                    className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows - Only show if multiple images */}
            {hasMultipleImages && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass border border-white/20 rounded-lg p-3 hover:border-white/40 transition-all backdrop-blur-sm cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass border border-white/20 rounded-lg p-3 hover:border-white/40 transition-all backdrop-blur-sm cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </>
            )}

            {/* Image Counter - Only show if multiple images */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 glass border border-white/20 rounded-lg px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                {currentIndex + 1} / {projectImages.length}
              </div>
            )}

            {/* Image Indicators - Only show if multiple images */}
            {hasMultipleImages && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {projectImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
