"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ui/ParticleBackground";
import FloatingElements from "@/components/ui/FloatingElements";
import { Mail, Phone, MapPin, Send, Home } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <ParticleBackground />
      <FloatingElements />
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Coming Soon Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-300">
              Contact form will be available soon!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Keep the original content but it will be blurred */}
        <div className="w-full max-w-7xl grid md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <motion.h2
                className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Let&apos;s Create
                <br />
                Something Together
              </motion.h2>
              <motion.p
                className="text-gray-400 max-w-md mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Have a project in mind? Let&apos;s discuss how we can work
                together to bring your ideas to life.
              </motion.p>
            </div>

            <motion.div
              className="space-y-6 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-gray-800 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium">
                    ghzielmorhaf@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-gray-800 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white font-medium">+966 54 791 5988</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-gray-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-medium">Riyadh, Saudi Arabia</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-gray-800">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Send Message</span>
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
