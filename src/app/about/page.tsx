"use client";

import { motion } from "framer-motion";
import resumeData from "@/data/resume.json";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8">About Me</h1>
        
        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
            {resumeData.basics.summary}
          </p>

          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between items-start border-l-4 border-primary-500 pl-4 py-1">
                <div>
                  <h3 className="text-xl font-medium">{edu.institution}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{edu.degree}</p>
                </div>
                <div className="mt-2 sm:mt-0 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">
                  {edu.startDate} &mdash; {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
