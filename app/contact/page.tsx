"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";

export default function Contact() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t("contact.form.errors.name");
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.form.errors.email");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.form.errors.emailInvalid");
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("contact.form.errors.subject");
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.form.errors.message");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.details 
          ? `${errorData.error}: ${errorData.details}`
          : errorData.error || "Failed to send message";
        console.error("API Error:", errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      toast.success(
        isRTL ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!"
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : isRTL
        ? "حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً."
        : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-full max-w-7xl z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl border border-white/10 cursor-pointer"
          >
            <motion.div
              whileHover={{ x: isRTL ? 4 : -4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-4 h-4 text-gray-300" />
            </motion.div>
            <motion.span
              className="text-sm text-gray-300"
              whileHover={{ color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              Back to home
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-6 border border-white/10"
              >
                <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
                  {t("contact.title")}
                </span>
              </motion.div>
              <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-gradient">
                  {t("contact.subtitle")}
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 leading-relaxed">
                {t("contact.description")}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: t("contact.form.email"), value: "Ghzielmorhaf@gmail.com" },
                { icon: Phone, label: t("contact.form.phone"), value: "+966 50 714 9775", dir: "ltr" },
                { icon: MapPin, label: t("contact.form.location"), value: t("contact.form.locationValue") },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="glass rounded-2xl p-6 border border-white/10 card-hover"
                  >
                    <div className={`flex ${isRTL ? "flex-row-reverse" : ""} items-start gap-4`}>
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                          {item.label}
                        </div>
                        <div className="text-white font-medium" dir={item.dir || undefined}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col h-full"
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6 flex-1" noValidate>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.name")}
                    className={`w-full glass rounded-xl border ${
                      errors.name ? "border-red-500" : "border-white/10"
                    } px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors ${
                      isRTL ? "text-right" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-2">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.email")}
                    className={`w-full glass rounded-xl border ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors ${
                      isRTL ? "text-right" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-2">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t("contact.form.subject")}
                  className={`w-full glass rounded-xl border ${
                    errors.subject ? "border-red-500" : "border-white/10"
                  } px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors ${
                    isRTL ? "text-right" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-2">{errors.subject}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.message")}
                  rows={6}
                  className={`w-full glass rounded-xl border ${
                    errors.message ? "border-red-500" : "border-white/10"
                  } px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors resize-none ${
                    isRTL ? "text-right" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-2">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-5 rounded-2xl font-medium overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer bg-white text-black mt-auto"
                whileHover={{ 
                  scale: isSubmitting ? 1 : 1.02,
                  boxShadow: isSubmitting ? undefined : "0 20px 40px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gray-200"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: isSubmitting ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">
                  {isSubmitting
                    ? t("contact.form.sending")
                    : t("contact.form.send")}
                </span>
                <motion.div
                  className="relative z-10"
                  animate={isSubmitting ? { x: [0, 4, 0] } : {}}
                  transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
