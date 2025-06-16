import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Morhaf
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Front-End Developer & UI/UX Engineer
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          I create exceptional digital experiences by combining clean code with
          thoughtful design. Specialized in React, Next.js, and modern web
          technologies.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            View My Work
          </button>
          <button className="border border-gray-600 text-white px-6 py-3 rounded-lg">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
