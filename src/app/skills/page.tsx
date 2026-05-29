"use client";

import { motion } from "framer-motion";
import { Code2, Briefcase, Database, Globe, Star, Zap } from "lucide-react";
import resumeData from "@/data/resume.json";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const categories = [
  { title: "Frontend", icon: Code2, data: resumeData.skills.frontend, gradient: "from-blue-500 to-cyan-400", glow: "rgba(59,130,246,0.3)" },
  { title: "Backend", icon: Briefcase, data: resumeData.skills.backend, gradient: "from-emerald-500 to-teal-400", glow: "rgba(16,185,129,0.3)" },
  { title: "Database", icon: Database, data: resumeData.skills.database, gradient: "from-purple-500 to-pink-400", glow: "rgba(139,92,246,0.3)" },
  { title: "DevOps & Tools", icon: Globe, data: resumeData.skills.devops, gradient: "from-orange-500 to-amber-400", glow: "rgba(245,158,11,0.3)" },
];

export default function Skills() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-12">

        {/* Header */}
        <motion.div variants={fadeUp} className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-mono">
            <Code2 className="w-3.5 h-3.5" />
            Technical Expertise
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-emerald-400 to-blue-500 animate-text-gradient">
            Skills
          </h1>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <motion.div key={idx} variants={scaleIn} whileHover={{ y: -6 }}
              className="card-shine mesh-card rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all duration-300 group"
              style={{ "--glow": cat.glow } as React.CSSProperties}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{cat.title}</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.data.map((skill, sIdx) => (
                  <motion.span key={sIdx} whileHover={{ scale: 1.08 }}
                    className="px-3.5 py-1.5 bg-white dark:bg-white/5 rounded-lg text-sm font-semibold text-gray-800 dark:text-gray-200 border border-black/5 dark:border-white/10 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all cursor-default shadow-sm">
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Competencies */}
        <motion.div variants={fadeUp} className="mesh-card rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Core Competencies</h2>
              <p className="text-xs text-gray-500 font-mono">Project Ownership · Operations · Management</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {resumeData.competencies.projectManagement.map((comp, i) => (
              <motion.span key={i} whileHover={{ scale: 1.06 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-400/10 border border-amber-500/20 text-sm font-semibold text-amber-700 dark:text-amber-300 cursor-default transition-all hover:from-amber-500/20 hover:to-orange-400/20">
                {comp}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div variants={fadeUp} className="mesh-card rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tools & Platforms</h2>
              <p className="text-xs text-gray-500 font-mono">Google Workspace · AWS · DevOps</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {resumeData.competencies.tools.map((tool, i) => (
              <motion.span key={i} whileHover={{ scale: 1.06 }}
                className="px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-indigo-500/40 text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-default transition-all shadow-sm">
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

