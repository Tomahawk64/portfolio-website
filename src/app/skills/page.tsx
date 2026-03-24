"use client";

import { motion } from "framer-motion";
import resumeData from "@/data/resume.json";

export default function Skills() {
  const { frontend, backend, database, devops } = resumeData.skills;

  const SkillSection = ({ title, skills }: { title: string; skills: string[] }) => (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400 border-b border-border pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm border border-transparent hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8">Technical Skills</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillSection title="Frontend Development" skills={frontend} />
          <SkillSection title="Backend Development" skills={backend} />
          <SkillSection title="Database Management" skills={database} />
          <SkillSection title="DevOps & Tools" skills={devops} />
        </div>
      </motion.div>
    </div>
  );
}
