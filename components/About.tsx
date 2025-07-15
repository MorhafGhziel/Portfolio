"use client";

import React from "react";
import Skills from "./ui/Skills";
import Expertise from "./ui/Expertise";
import LocationCard from "./ui/LocationCard";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen text-white flex items-center justify-center px-4 flex-col py-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Get to know more about my journey, experience, and what drives me as a
          developer
        </p>
      </div>
      <div className="space-y-20">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Front End Developer & UI/UX Designer
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed mb-8">
              I'm Morhaf Ghziel, a passionate Front End Developer and UI/UX
              Designer based in Saudi Arabia. I specialize in creating modern,
              responsive web applications using cutting-edge technologies. My
              journey in web development combines technical expertise with
              creative design thinking to deliver exceptional digital
              experiences.
            </p>
            <Expertise />
            <Skills />
          </div>
          <LocationCard />
        </div>
      </div>
    </section>
  );
};

export default About;
