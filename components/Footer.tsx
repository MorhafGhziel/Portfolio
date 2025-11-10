"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const email = "ghzielmorhaf@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success(t("footer.copyEmail"));
    } catch (err) {
      toast.error(t("footer.copyEmailError"));
    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/MorhafGhziel",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/morhaf-ghziel-a720a72b9/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/MorhafGhz",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/4uee_m/",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative border-t border-white/10 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Left Side */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-3xl font-bold">
              <span className="text-gradient">
                {t("hero.name")}
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              {t("footer.availableWorldwide")}
            </p>
          </motion.div>

          {/* Right Side - Social Links */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-xl border border-white/10 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.1,
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <link.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.div>
              </motion.a>
            ))}
            <motion.button
              onClick={handleCopyEmail}
              className="glass p-3 rounded-xl border border-white/10 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: socialLinks.length * 0.1 }}
              whileHover={{ 
                y: -4, 
                scale: 1.1,
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Mail className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          className="pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
