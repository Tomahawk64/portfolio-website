"use client";

import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import { Link2, Github } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">My Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          Here are some of the key projects I've worked on, showcasing my skills in full-stack development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-video w-full relative bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 to-transparent mix-blend-overlay"></div>
                <h3 className="absolute bottom-4 left-4 right-4 z-20 text-white font-bold text-2xl drop-shadow-md">
                  {project.title}
                </h3>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[48px]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-border pt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold block mb-2 text-gray-900 dark:text-gray-100">Case Study:</span>
                  <p className="mb-1"><span className="font-medium">Problem:</span> {project.caseStudy.problem}</p>
                  <p className="mb-2"><span className="font-medium">Solution:</span> {project.caseStudy.solution}</p>
                  <ul className="list-disc list-inside mt-2 text-primary-600 dark:text-primary-400">
                    {project.caseStudy.metrics.map((metric, i) => (
                      <li key={i}>{metric}</li>
                    ))}
                  </ul>
                </div>

                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition"
                    aria-label="Live Site"
                  >
                    <Link2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
