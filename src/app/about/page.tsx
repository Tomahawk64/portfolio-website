"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Zap, MapPin, Mail, Phone } from "lucide-react";
import resumeData from "@/data/resume.json";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-12">

        {/* Header */}
        <motion.div variants={fadeUp} className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Who I Am
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-emerald-400 to-blue-500 animate-text-gradient">
            About Me
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {resumeData.basics.titleAlt}
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div variants={fadeUp} className="mesh-card rounded-3xl p-8 sm:p-10 shadow-xl neon-border">
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">{resumeData.basics.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"><Mail className="w-4 h-4 text-primary-500" />{resumeData.basics.email}</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"><Phone className="w-4 h-4 text-primary-500" />{resumeData.basics.phone}</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"><MapPin className="w-4 h-4 text-primary-500" />{resumeData.basics.locationAlt}</span>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumeData.basics.highlights.map((h, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, scale: 1.02 }}
              className="card-shine flex items-start gap-3 p-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-primary-500/30 shadow-sm transition-all">
              <Zap className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{h}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Education */}
        <motion.div variants={fadeUp} className="mesh-card rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
          </div>
          <div className="space-y-6">
            {resumeData.education.map((edu, i) => (
              <motion.div key={i} variants={fadeUp} className="relative pl-6 border-l-2 border-primary-500">
                <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.institution}</h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">{edu.degree}</p>
                    {edu.cgpa && (
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-bold font-mono border border-primary-500/20">
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-mono text-gray-500 shrink-0">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={fadeUp} className="mesh-card rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resumeData.certifications.map((cert, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ x: 6 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-amber-500/30 transition-all">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Competencies */}
        <motion.div variants={fadeUp} className="mesh-card rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Core Competencies</h2>
              <p className="text-xs text-gray-500 font-mono">Project Ownership · Operations · Management</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {resumeData.competencies.projectManagement.map((comp, i) => (
              <motion.span key={i} whileHover={{ scale: 1.06 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-sm font-semibold text-purple-700 dark:text-purple-300 cursor-default transition-all hover:from-purple-500/20 hover:to-pink-500/20">
                {comp}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

