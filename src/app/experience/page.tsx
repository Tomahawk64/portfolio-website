"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowRight, Zap } from "lucide-react";
import resumeData from "@/data/resume.json";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-12">

        {/* Header */}
        <motion.div variants={fadeUp} className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            Career Journey
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-emerald-400 to-blue-500 animate-text-gradient">
            Experience
          </h1>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-500/50 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {resumeData.experience.map((exp, index) => (
              <motion.div key={index} variants={fadeUp}
                className="relative sm:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-6 w-5 h-5 rounded-full bg-primary-500 border-4 border-background shadow-[0_0_16px_rgba(16,185,129,0.7)] hidden sm:flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="group relative mesh-card rounded-3xl p-7 sm:p-9 shadow-xl hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-500 overflow-hidden card-shine">
                  {/* Gradient accent top bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center shrink-0 mt-1">
                        <Briefcase className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{exp.role}</h2>
                        <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400 mt-0.5">{exp.company}</h3>
                        {(exp as any).location && (
                          <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                            <MapPin className="w-3.5 h-3.5" />{(exp as any).location}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                      <span className="inline-flex items-center px-4 py-1.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm font-bold font-mono border border-primary-500/20">
                        {exp.startDate} — {exp.endDate}
                      </span>
                      {(exp as any).duration && (
                        <span className="text-xs text-gray-400 font-mono">{(exp as any).duration}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                  {exp.achievements && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {exp.achievements.map((item, idx) => (
                        <motion.div key={idx} whileHover={{ x: 5 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-primary-500/30 transition-all">
                          <ArrowRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open-to-work callout */}
        <motion.div variants={fadeUp}
          className="text-center p-8 rounded-3xl bg-gradient-to-r from-primary-500/10 via-emerald-400/10 to-blue-500/10 border border-primary-500/20 neon-border">
          <Zap className="w-8 h-8 text-primary-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Open to All Opportunities</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Full Stack Development · Project Management · Open to All Locations</p>
        </motion.div>

      </motion.div>
    </div>
  );
}

