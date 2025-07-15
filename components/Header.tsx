"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", path: "/", sectionId: "home" },
  { name: "About", path: "/about", sectionId: "about" },
  { name: "Work", path: "/work", sectionId: "work" },
  { name: "Contact", path: "/contact", sectionId: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionBottom = sectionTop + sectionElement.offsetHeight;
        const sectionId = sectionElement.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount to set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const getIsActive = (item: (typeof navItems)[0]) => {
    return activeSection === item.sectionId;
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-black/95 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={(e) => handleNavClick(e, "home")}>
          <motion.span
            className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Morhaf
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = getIsActive(item);

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className={`transition-all ${
                  isActive
                    ? "text-white font-medium scale-105"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  animate={isActive ? { y: -2 } : { y: 0 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </motion.div>
        </button>

        {/* Get in touch button - Desktop */}
        <motion.a
          href="/contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="hidden md:flex px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white items-center gap-2 hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-4 h-4" />
          Get in touch
        </motion.a>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[73px] p-4 bg-black/95 backdrop-blur-lg border-b border-white/10 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = getIsActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                    className={`transition-all px-4 py-2 rounded-lg ${
                      isActive
                        ? "text-white font-medium bg-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <motion.a
                href="/contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
