"use client";

import { motion } from "framer-motion";
import { Code, Palette, Zap, Globe, Star, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const ICON_SIZE = 32; // px — rough average icon size

const floatingElements = [
  { icon: Code, color: "text-white/40", delay: 0, size: "w-8 h-8" },
  { icon: Palette, color: "text-gray-200/40", delay: 0.5, size: "w-6 h-6" },
  { icon: Zap, color: "text-white/50", delay: 1, size: "w-7 h-7" },
  { icon: Globe, color: "text-gray-300/40", delay: 1.5, size: "w-8 h-8" },
  { icon: Star, color: "text-white/30", delay: 2, size: "w-6 h-6" },
  { icon: Heart, color: "text-gray-200/50", delay: 2.5, size: "w-7 h-7" },
];

type FloatingProps = {
  x: number;
  duration: number;
  delay: number;
};

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false);
  const [floatingProps, setFloatingProps] = useState<FloatingProps[]>([]);

  useEffect(() => {
    setMounted(true);

    const width = window.innerWidth;
    const props = floatingElements.map(() => ({
      x: Math.random() * (width - ICON_SIZE), // Random position across screen
      duration: 20 + Math.random() * 15, // Random animation speed
      delay: Math.random() * 3, // Staggered start
    }));

    setFloatingProps(props);
  }, []);

  if (!mounted || floatingProps.length !== floatingElements.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} blur-[0.5px]`}
          initial={{
            x: floatingProps[index].x,
            y: window.innerHeight + 100,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: floatingProps[index].duration,
            delay: element.delay + floatingProps[index].delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 1],
          }}
        >
          <element.icon className={element.size} />
        </motion.div>
      ))}
    </div>
  );
}
