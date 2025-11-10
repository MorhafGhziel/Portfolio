"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

const ContactCTA = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const contactMethods = [
    {
      icon: Mail,
      label: t("contact.form.email"),
      value: "Ghzielmorhaf@gmail.com",
      href: "mailto:Ghzielmorhaf@gmail.com",
      copyable: true,
    },
    {
      icon: Phone,
      label: t("contact.form.phone"),
      value: "+966 50 714 9775",
      href: "tel:+966507149775",
      copyable: true,
    },
    {
      icon: MapPin,
      label: t("contact.form.location"),
      value: t("contact.form.locationValue"),
      copyable: false,
    },
    {
      icon: Clock,
      label: isRTL ? "التوقيت" : "Response Time",
      value: isRTL ? "خلال 24 ساعة" : "Within 24 hours",
      copyable: false,
    },
  ];

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

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-32 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Floating Orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl w-full mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-6 border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
              {t("contactCta.title")}
            </span>
          </motion.div>
          <h2 className="mt-6 text-4xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-gradient">
              {isRTL ? "دعنا نعمل" : "Let's work"}
              <br />
              {isRTL ? "معاً" : "together"}
            </span>
          </h2>
          <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("contactCta.subtitle")}
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative glass border border-white/10 rounded-2xl p-6 transition-all duration-300 group overflow-hidden card-hover"
                whileHover={{ scale: 1.03, y: -6 }}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {method.href ? (
                  <a
                    href={method.href}
                    className="block cursor-pointer relative z-10"
                    onClick={(e) => {
                      if (method.copyable) {
                        e.preventDefault();
                        handleCopy(method.value);
                      }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 border border-white/20 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-white transition-colors" />
                      </div>
                      <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 group-hover:text-gray-400 transition-colors">
                          {method.label}
                        </div>
                        <div className="text-white font-medium text-sm">
                          {method.value}
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 border border-white/20 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white transition-colors" />
                    </div>
                    <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 group-hover:text-gray-400 transition-colors">
                        {method.label}
                      </div>
                      <div className="text-white font-medium text-sm">
                        {method.value}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative border border-white/10 glass rounded-3xl p-12 md:p-20 mb-12 overflow-hidden group"
          whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/20 group-hover:border-white/40 transition-colors" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/20 group-hover:border-white/40 transition-colors" />

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Side - Text */}
            <div className={isRTL ? "md:order-2" : ""}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-white/20 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {isRTL ? "ابدأ مشروعك" : "Start Your Project"}
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                {isRTL
                  ? "هل لديك مشروع في الاعتبار؟ دعنا نتحدث عنه. أنا متاح للمناقشة ومراجعة متطلباتك."
                  : "Have a project in mind? Let's discuss it. I'm available to talk about your requirements and ideas."}
              </p>
              <motion.div
                whileHover={{ x: isRTL ? -8 : 8 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="group/link inline-flex items-center gap-3 text-white relative cursor-pointer"
                >
                  <motion.span
                    className="text-lg font-medium relative"
                    whileHover={{ color: "#d4d4d8" }}
                    transition={{ duration: 0.2 }}
                  >
                    {t("contactCta.sendEmail")}
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] bg-white"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 group-hover/link:text-white transition-colors"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Stats */}
            <div
              className={`grid grid-cols-2 gap-6 ${isRTL ? "md:order-1" : ""}`}
            >
              {[
                { value: "5+", label: t("hero.stats.years") },
                { value: "100%", label: isRTL ? "التواصل" : "Response" },
                { value: "24h", label: isRTL ? "الرد" : "Reply Time" },
                { value: "∞", label: isRTL ? "الإبداع" : "Creativity" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="relative glass border border-white/10 rounded-2xl p-6 group overflow-hidden"
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider relative z-10 group-hover:text-gray-400 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-6 font-medium">
            {isRTL ? "تابعني على" : "Follow me"}
          </p>
          <div className="flex justify-center items-center gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass border border-white/10 rounded-xl p-4 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{
                    scale: 1.15,
                    y: -6,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors relative z-10" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
