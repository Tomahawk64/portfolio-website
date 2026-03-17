'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  category: string;
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
  images: string[];
  metrics: string[];
  highlights: string[];
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card group flex flex-col h-full"
        aria-label={`Project: ${project.title}`}
      >
        {/* Project image placeholder */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 mb-4 flex-shrink-0">
          <Image
            src={project.images[0] || '/images/project-placeholder.png'}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-accent-700/30 dark:text-accent-300/30 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="tag text-xs">{project.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
            {project.shortDescription}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4" aria-label="Technologies used">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-mono"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-600 rounded"
            >
              View case study
            </button>
            <div className="flex items-center gap-2 ml-auto">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                  aria-label={`${project.title} GitHub repository (opens in new tab)`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-500 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400 transition-colors"
                  aria-label={`${project.title} live demo (opens in new tab)`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.article>

      {/* Case study modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={project.title}
      >
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Overview</h4>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
          </div>

          {/* Metrics */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Metrics</h4>
            <ul className="space-y-2" role="list">
              {project.metrics.map((metric, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
                  <span className="text-gray-600 dark:text-slate-400 text-sm">{metric}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Highlights</h4>
            <ul className="space-y-2" role="list">
              {project.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-purple-500" aria-hidden="true" />
                  <span className="text-gray-600 dark:text-slate-400 text-sm">{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-2">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
                Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2">
                View Code
              </a>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
