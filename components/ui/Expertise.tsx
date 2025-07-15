"use client";

import { EXPERTISE_POINTS } from "@/constants";

const Expertise = () => {
  return (
    <div className="space-y-6 mb-8">
      <h4 className="text-xl font-semibold text-white mb-4">
        What I Bring to the Table
      </h4>
      <ul className="space-y-3">
        {EXPERTISE_POINTS.map((point, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expertise;
