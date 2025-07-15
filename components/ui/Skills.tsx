"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/constants";

const Skills = () => {
  return (
    <div>
      <h4 className="text-xl font-semibold text-white mb-4">Skills</h4>
      <div className="max-w-2xl flex flex-wrap gap-2">
        {SKILLS.map((skill, index) => (
          <motion.div
            key={index}
            className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-3 py-1 bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 cursor-pointer"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
