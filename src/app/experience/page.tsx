"use client";

import { motion } from "framer-motion";
import resumeData from "@/data/resume.json";

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8">Experience</h1>
        
        <div className="relative border-l-2 border-primary-200 dark:border-primary-900 ml-4 md:ml-6 space-y-12">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <span className="absolute -left-[9px] top-1 px-[5px] py-[5px] bg-primary-500 rounded-full flex justify-center items-center shadow-lg ring-4 ring-background">
                <span className="h-2 w-2 bg-white rounded-full"></span>
              </span>
              <div className="bg-card dark:bg-card rounded-xl p-6 border shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{exp.role}</h2>
                    <h3 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-2">{exp.company}</h3>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium mt-2 md:mt-0">
                    {exp.startDate} &mdash; {exp.endDate}
                    {exp.duration && <span className="ml-2 text-gray-500">({exp.duration})</span>}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                
                {exp.achievements && (
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
