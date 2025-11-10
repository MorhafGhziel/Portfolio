"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  magneticIntensity?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
  className = "",
  magneticIntensity = 0.3,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { damping: 15, stiffness: 150 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Update motion values
    mouseX.set(deltaX * magneticIntensity);
    mouseY.set(deltaY * magneticIntensity);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const variants = {
    primary:
      "bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl",
    secondary:
      "border-2 border-white text-white hover:bg-white hover:text-black",
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer gap-2 w-fit mx-auto md:mx-0 ${variants[variant]} ${className}`}
      style={{
        x: translateX,
        y: translateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {LeftIcon && (
        <motion.div
          style={{
            x: translateX,
            y: translateY,
          }}
        >
          <LeftIcon className="w-5 h-5" />
        </motion.div>
      )}
      <motion.span
        style={{
          x: translateX,
          y: translateY,
        }}
      >
        {children}
      </motion.span>
      {RightIcon && (
        <motion.div
          animate={
            !isHovered && variant === "primary" ? { x: [0, 5, 0] } : undefined
          }
          style={
            isHovered
              ? {
                  x: translateX,
                  y: translateY,
                }
              : undefined
          }
          transition={
            !isHovered && variant === "primary"
              ? { duration: 1.5, repeat: Infinity }
              : springConfig
          }
        >
          <RightIcon className="w-5 h-5" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default Button;
