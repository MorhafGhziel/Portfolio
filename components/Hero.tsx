import React from "react";
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Morhaf
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Front-End Developer & UI/UX Engineer
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto lg:mx-0">
            I create exceptional digital experiences by combining clean code
            with thoughtful design. Specialized in React, Next.js, and modern
            web technologies.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-lg flex items-center justify-center gap-2">
              View My Work
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 hover:border-gray-500 transition duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Resume
            </button>
          </div>
        </div>

        {/* Right Column - Stats Grid (we'll add this next) */}
        <div className="relative mt-8 lg:mt-0">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-center text-gray-400">
              Stats grid coming next...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
