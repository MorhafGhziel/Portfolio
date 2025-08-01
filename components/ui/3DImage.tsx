"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function ThreeDImage({ src, alt }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add smooth spring physics
  const mouseX = useSpring(x, { stiffness: 400, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 20 });

  // Transform mouse position to rotation (increased range for more noticeable effect)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    // Calculate mouse position relative to the element
    const width = rect.width;
    const height = rect.height;

    // Get center of element
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate rotation (between -0.5 and 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="relative">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 ring-2 sm:ring-4 ring-gray-100/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer will-change-transform"
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        <motion.div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full relative"
        >
          <Image
            src={src}
            alt={alt}
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
