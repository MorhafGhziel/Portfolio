"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const ContactCTA = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <motion.section
      id="contact"
      className="relative w-full py-16 sm:py-20 md:py-24 lg:pt-40 overflow-hidden mb-30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background gradient and dots */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="relative w-full max-w-[90%] sm:max-w-[85%] md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 ${isRTL ? "font-arabic" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("contactCta.title")}
        </motion.h2>

        <motion.p
          className={`text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto ${isRTL ? "font-arabic" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t("contactCta.subtitle")}
        </motion.p>

        <motion.div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-2xl mx-auto px-4 sm:px-0 ${isRTL ? "sm:flex-row-reverse" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/contact"
              className={`inline-flex w-full items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-colors duration-300 text-sm sm:text-base ${isRTL ? "font-arabic flex-row-reverse" : ""} gap-2`}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              {t("contactCta.sendEmail")}
            </Link>
          </motion.div>

          <motion.div
            className="w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="https://www.linkedin.com/in/morhaf-ghziel-a720a72b9/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full items-center justify-center px-6 py-3 rounded-lg border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium transition-colors duration-300 backdrop-blur-sm bg-gray-900/30 text-sm sm:text-base ${isRTL ? "font-arabic flex-row-reverse" : ""} gap-2`}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              {t("contactCta.connectLinkedIn")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactCTA;
