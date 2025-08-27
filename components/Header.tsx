"use client";

import { motion, AnimatePresence, Variants, Easing } from "framer-motion";
import Link from "next/link";
import { Mail, Menu, X, Rocket, ArrowLeft } from "lucide-react";
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

const AnimatedLogo = () => {
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(true);
  const [rocketState, setRocketState] = useState("start"); // "start", "fly", "enter", "inside"
  const [hasAnimated, setHasAnimated] = useState(false);

  const rocketVariants: Variants = {
    start: {
      x: -50,
      y: 20,
      rotate: 15,
      opacity: 1,
    },
    fly: {
      x: [-50, -30, -20, -30, -10],
      y: [20, 0, 30, 10, 20],
      rotate: [15, 30, -15, 45, 0],
      transition: {
        duration: 3,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: [0.6, 0.01, -0.05, 0.95] as Easing,
      },
    },
    enter: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.68, -0.55, 0.265, 1.55] as Easing,
      },
    },
    inside: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 0,
    },
  };

  const textVariants: Variants = {
    initial: {
      backgroundImage: "linear-gradient(to right, #4F46E5, #7C3AED)",
      filter: "drop-shadow(0 0 2px rgba(79, 70, 229, 0.3))",
      transition: {
        duration: 0.5,
      },
    },
    highlight: {
      backgroundImage: "linear-gradient(to right, #6366F1, #A855F7, #EC4899)",
      scale: 1.05,
      filter:
        "drop-shadow(0 0 10px rgba(99, 102, 241, 0.8)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))",
      transition: {
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    if (!hasAnimated) {
      const animationSequence = async () => {
        setRocketState("fly");
        setIsAnimating(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setRocketState("enter");
        await new Promise((resolve) => setTimeout(resolve, 800));

        setRocketState("inside");
        setIsAnimating(false);
        setHasAnimated(true);
      };

      animationSequence();
    }
  }, [hasAnimated]);

  return (
    <div className="relative w-fit">
      <div className="relative">
        {/* Text glow background effect */}
        <motion.div
          className="absolute inset-0 blur-xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 opacity-0"
          animate={
            !isAnimating
              ? {
                  opacity: 0.7,
                }
              : { opacity: 0 }
          }
        />

        {/* Main text */}
        <motion.div
          className="text-2xl font-bold bg-clip-text text-transparent relative z-10 font-orbitron tracking-wider"
          variants={textVariants}
          initial="initial"
          animate={!isAnimating ? "highlight" : "initial"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("hero.name")}
        </motion.div>
      </div>

      <motion.div
        className="absolute left-0 top-0 z-20"
        initial="start"
        animate={rocketState}
        variants={rocketVariants}
      >
        <motion.div
          animate={
            isAnimating
              ? {
                  scale: [1, 1.1, 1],
                  filter: [
                    "drop-shadow(0 0 8px #4F46E5) drop-shadow(0 0 20px rgba(79, 70, 229, 0.5))",
                    "drop-shadow(0 0 12px #4F46E5) drop-shadow(0 0 30px rgba(79, 70, 229, 0.7))",
                    "drop-shadow(0 0 8px #4F46E5) drop-shadow(0 0 20px rgba(79, 70, 229, 0.5))",
                  ],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }
              : {
                  scale: 0,
                  opacity: 0,
                }
          }
          className="relative"
        >
          {/* Enhanced glow effect background */}
          <div className="absolute inset-0 blur-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 rounded-full" />
          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-30 rounded-full" />

          {/* Rocket with enhanced gradient */}
          <div className="relative transform -rotate-12">
            {/* Rocket trail effect */}
            <motion.div
              className="absolute left-[2px] top-[55%] -translate-y-1/2 -rotate-[15deg] origin-right"
              initial={false}
              animate={
                isAnimating
                  ? {
                      opacity: [0.8, 0.2],
                      scaleX: [1, 1.5],
                      x: "-100%",
                      transition: {
                        duration: 0.8,
                        repeat: Infinity,
                      },
                    }
                  : { opacity: 0 }
              }
            >
              <div className="h-[3px] w-[20px] bg-gradient-to-l from-indigo-600/80 via-purple-500/50 to-transparent" />
              <div className="h-[2px] w-[20px] mt-[1px] bg-gradient-to-l from-purple-600/80 via-pink-500/50 to-transparent" />
            </motion.div>

            {/* Small particles */}
            <motion.div
              className="absolute left-[2px] top-[45%] w-[3px] h-[3px] rounded-full bg-indigo-400 -rotate-[15deg]"
              animate={
                isAnimating
                  ? {
                      opacity: [0.8, 0],
                      scale: [1, 0.5],
                      x: ["-100%", "-200%"],
                      y: [0, -5],
                      transition: {
                        duration: 0.4,
                        repeat: Infinity,
                      },
                    }
                  : { opacity: 0 }
              }
            />
            <motion.div
              className="absolute left-[2px] top-[65%] w-[2px] h-[2px] rounded-full bg-purple-400 -rotate-[15deg]"
              animate={
                isAnimating
                  ? {
                      opacity: [0.8, 0],
                      scale: [1, 0.5],
                      x: ["-100%", "-200%"],
                      y: [0, 5],
                      transition: {
                        duration: 0.6,
                        repeat: Infinity,
                      },
                    }
                  : { opacity: 0 }
              }
            />

            <Rocket className="w-6 h-6 stroke-purple-400 [&>path]:fill-[url(#rocketGradient)]" />
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="rocketGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="40%" stopColor="#4F46E5" />
                  <stop offset="70%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Reset active section when navigating to contact page
    if (pathname === "/contact") {
      setActiveSection("contact");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.7], // Require 70% visibility to activate
        rootMargin: "-100px 0px -100px 0px", // Adjust margins to account for header and better visibility
      }
    );

    // Observe all sections including the contact section
    document
      .querySelectorAll("section[id], section#contact")
      .forEach((section) => {
        observer.observe(section);
      });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (sectionId === "contact" && pathname === "/") {
      // If we're on home page and clicking contact, scroll to contact section
      const section = document.getElementById("contact");
      if (section) {
        const headerHeight = 50;
        const sectionTop = section.offsetTop - headerHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    } else if (sectionId === "contact") {
      // If we're not on home page, navigate to contact page
      router.push("/contact");
    } else {
      if (pathname !== "/") {
        router.push("/");
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = 50;
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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-black/20 backdrop-blur-xl border-b border-white/6 shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo */}
        <div className="flex-1 min-w-[120px] relative">
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "home")}
            className="inline-block"
          >
            <AnimatedLogo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          {navItems.map((item, index) => {
            const isActive = getIsActive(item);

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className={`transition-all duration-300 px-3 ${
                    isActive
                      ? "text-white font-medium scale-105"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    animate={
                      isActive
                        ? { y: -2, color: "#ffffff" }
                        : { y: 0, color: "#9ca3af" }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {t(item.name)}
                  </motion.span>
                </Link>
              </motion.div>
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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 justify-end flex-1 min-w-[120px]">
          <LanguageSwitch />
          <AnimatePresence mode="wait">
            <motion.a
              key={pathname === "/contact" ? "back" : "contact"}
              href={pathname === "/contact" ? "/" : "/contact"}
              onClick={(e) => {
                e.preventDefault();
                router.push(pathname === "/contact" ? "/" : "/contact");
              }}
              className="flex px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white items-center gap-2 hover:opacity-90 transition-opacity"
              initial={{ x: pathname === "/contact" ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: pathname === "/contact" ? 20 : -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {pathname === "/contact" ? (
                <>
                  <ArrowLeft className="w-4 h-4" />
                  {t("cta.backHome")}
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  {t("cta.getInTouch")}
                </>
              )}
            </motion.a>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[73px] p-4 bg-black/20 backdrop-blur-xl border-b border-white/20 shadow-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => {
                const isActive = getIsActive(item);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.sectionId)}
                      className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                        isActive
                          ? "text-white font-medium bg-white/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <motion.span
                        animate={
                          isActive ? { color: "#ffffff" } : { color: "#9ca3af" }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        {t(item.name)}
                      </motion.span>
                    </Link>
                  </motion.div>
                );
              })}
              {/* Mobile Actions */}
              <div className="flex items-center gap-4 px-4 py-2">
                <LanguageSwitch />
                <Link
                  href={pathname === "/contact" ? "/" : "/contact"}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(pathname === "/contact" ? "/" : "/contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {pathname === "/contact" ? (
                    <>
                      <ArrowLeft className="w-4 h-4" />
                      {t("cta.backHome")}
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      {t("cta.getInTouch")}
                    </>
                  )}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
