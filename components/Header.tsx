"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import { LanguageSwitch } from "./ui/LanguageSwitch";

const navItems = [
  { name: "nav.home", path: "/", sectionId: "home" },
  { name: "nav.about", path: "/about", sectionId: "about" },
  { name: "nav.work", path: "/work", sectionId: "work" },
  { name: "nav.contact", path: "/contact", sectionId: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    if (pathname === "/contact") {
      setActiveSection("contact");
      return;
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const headerHeight = 80;
      const scrollPosition = window.scrollY + headerHeight + 150; // Offset to trigger before section top

      let currentSection = "home";
      let closestSection = "";
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionBottom = sectionTop + element.offsetHeight;

        // If scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = element.id;
        }

        // Also track which section is closest to the top of viewport
        const distance = Math.abs(sectionTop - (window.scrollY + headerHeight));
        if (distance < closestDistance && window.scrollY + headerHeight >= sectionTop - 100) {
          closestDistance = distance;
          closestSection = element.id;
        }
      });

      // Use the section we're in, or the closest one if at the top
      if (window.scrollY < 100) {
        setActiveSection("home");
      } else if (currentSection && currentSection !== "home") {
        setActiveSection(currentSection);
      } else if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (sectionId === "contact" && pathname === "/") {
      const section = document.getElementById("contact");
      if (section) {
        const headerHeight = 80;
        const sectionTop = section.offsetTop - headerHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    } else if (sectionId === "contact") {
      router.push("/contact");
    } else {
      if (pathname !== "/") {
        router.push("/");
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = 80;
        const sectionTop = section.offsetTop - headerHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    }
  };

  const getIsActive = (item: (typeof navItems)[0]) => {
    return activeSection === item.sectionId;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Gradient */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "home")}
            className={`relative group cursor-pointer ${isRTL ? "order-last" : ""}`}
          >
            <motion.span
              className="text-xl font-bold tracking-tight text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {t("hero.name")}
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? "order-2" : ""}`}>
            {navItems.map((item) => {
              const isActive = getIsActive(item);
              return (
                <motion.div key={item.name} className="relative">
                  <Link
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                    className={`text-sm tracking-wider uppercase transition-all relative group block cursor-pointer px-4 py-2 rounded-lg ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBg"
                        className="absolute inset-0 bg-white/5 rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <motion.span
                      className="relative z-10"
                      whileHover={{ 
                        color: "#ffffff",
                        scale: 1.05,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {t(item.name)}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-lg opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center gap-6 ${isRTL ? "order-first" : ""}`}>
            <LanguageSwitch />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2 cursor-pointer glass rounded-lg border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 glass"
          >
            <nav className="px-6 py-8 space-y-4">
              {navItems.map((item, index) => {
                const isActive = getIsActive(item);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.sectionId)}
                      className={`block text-sm tracking-wider uppercase transition-all cursor-pointer px-4 py-3 rounded-lg relative ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileBg"
                          className="absolute inset-0 bg-white/5 rounded-lg"
                          initial={false}
                        />
                      )}
                      <span className="relative z-10">{t(item.name)}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div 
                className="pt-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <LanguageSwitch />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
