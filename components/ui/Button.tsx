"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  leftIcon?: LucideIcon; // Icon on the left
  rightIcon?: LucideIcon; // Icon on the right (animated)
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg",
    secondary:
      "border border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500",
  };

  return (
    <motion.button
      type="button"
      className={`px-8 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center cursor-pointer gap-2 ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {LeftIcon && <LeftIcon className="w-5 h-5" />}
      {children}
      {RightIcon && (
        <motion.div
          animate={variant === "primary" ? { x: [0, 5, 0] } : undefined}
          transition={
            variant === "primary"
              ? { duration: 1.5, repeat: Infinity }
              : undefined
          }
        >
          <RightIcon className="w-5 h-5" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default Button;
