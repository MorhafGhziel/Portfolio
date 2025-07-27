"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ui/ParticleBackground";
import FloatingElements from "@/components/ui/FloatingElements";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageContext";

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
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();
      toast.success(
        isRTL ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!"
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        isRTL
          ? "حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً."
          : "An error occurred. Please try again later."
      );
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
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <ParticleBackground />
      <FloatingElements />
      <div
        className="min-h-screen bg-transparent text-white flex items-center justify-center py-12 pt-24 sm:pt-0 px-4 sm:px-6 lg:px-8"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-full max-w-7xl grid md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <motion.h2
                className={`text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pb-1 ${isRTL ? "font-arabic text-right" : "text-left"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t("contact.title")}
                <br />
                {t("contact.subtitle")}
              </motion.h2>
              <motion.p
                className={`text-gray-400 max-w-md mt-4 ${isRTL ? "font-arabic text-right" : "text-left"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t("contact.description")}
              </motion.p>
            </div>

            <motion.div
              className="space-y-6 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div
                className={`flex items-center ${isRTL ? "gap-6 text-right" : "gap-4"}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-gray-800 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p
                    className={`text-gray-400 text-sm ${isRTL ? "font-arabic" : ""}`}
                  >
                    {t("contact.form.email")}
                  </p>
                  <p className="text-white font-medium">
                    Ghzielmorhaf@gmail.com
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center ${isRTL ? "gap-6 text-right" : "gap-4"}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-gray-800 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-500" />
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p
                    className={`text-gray-400 text-sm ${isRTL ? "font-arabic" : ""}`}
                  >
                    {t("contact.form.phone")}
                  </p>
                  <p className="text-white font-medium" dir="ltr">
                    {isRTL ? "+966 50 714 9775" : "+966 50 714 9775"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center ${isRTL ? "gap-6 text-right" : "gap-4"}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-gray-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p
                    className={`text-gray-400 text-sm ${isRTL ? "font-arabic" : ""}`}
                  >
                    {t("contact.form.location")}
                  </p>
                  <p
                    className={`text-white font-medium ${isRTL ? "font-arabic" : ""}`}
                  >
                    {t("contact.form.locationValue")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("contact.form.name")}
                        className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                          errors.name ? "border-red-500" : "border-gray-800"
                        } bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? "font-arabic text-right" : "text-left"}`}
                      />
                      <div className="h-6 mt-1">
                        <AnimatePresence mode="wait">
                          {errors.name && (
                            <motion.p
                              className={`text-red-500 text-sm ${isRTL ? "font-arabic text-right" : "text-left"}`}
                              initial={{ opacity: 0, y: -2 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -2 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.form.email")}
                        className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                          errors.email ? "border-red-500" : "border-gray-800"
                        } bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? "font-arabic text-right" : "text-left"}`}
                      />
                      <div className="h-6 mt-1">
                        <AnimatePresence mode="wait">
                          {errors.email && (
                            <motion.p
                              className={`text-red-500 text-sm ${isRTL ? "font-arabic text-right" : "text-left"}`}
                              initial={{ opacity: 0, y: -2 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -2 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("contact.form.subject")}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      errors.subject ? "border-red-500" : "border-gray-800"
                    } bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? "font-arabic text-right" : "text-left"}`}
                  />
                  <div className="h-6 mt-1">
                    <AnimatePresence mode="wait">
                      {errors.subject && (
                        <motion.p
                          className={`text-red-500 text-sm ${isRTL ? "font-arabic text-right" : "text-left"}`}
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -2 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          {errors.subject}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.message")}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      errors.message ? "border-red-500" : "border-gray-800"
                    } bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${isRTL ? "font-arabic text-right" : "text-left"}`}
                  />
                  <div className="h-6 mt-1">
                    <AnimatePresence mode="wait">
                      {errors.message && (
                        <motion.p
                          className={`text-red-500 text-sm ${isRTL ? "font-arabic text-right" : "text-left"}`}
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -2 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${isRTL ? "font-arabic flex-row-reverse" : ""}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>
                    {isSubmitting
                      ? t("contact.form.sending")
                      : t("contact.form.send")}
                  </span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
