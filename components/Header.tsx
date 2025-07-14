"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-black/95 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.span
            className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Morhaf
          </motion.span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                {item.name}
              </motion.span>
            </Link>
          ))}
        </nav>

        {/* Get in touch button */}
        <motion.a
          href="/contact"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-4 h-4" />
          Get in touch
        </motion.a>
      </div>
    </motion.header>
  );
}
