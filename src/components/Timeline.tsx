'use client';

import { motion } from 'framer-motion';

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  responsibilities: string[];
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="relative space-y-10" aria-label="Career timeline">
      {entries.map((entry, index) => (
        <motion.li
          key={`${entry.company}-${index}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex gap-6"
        >
          {/* Timeline indicator */}
          <div className="flex flex-col items-center flex-shrink-0" aria-hidden="true">
            <div className="w-4 h-4 rounded-full bg-accent-600 dark:bg-accent-400 mt-1.5 ring-4 ring-accent-100 dark:ring-accent-900/50 flex-shrink-0" />
            {index < entries.length - 1 && (
              <div className="w-0.5 flex-1 bg-gradient-to-b from-accent-400 to-gray-200 dark:to-slate-700 mt-2" />
            )}
          </div>

          {/* Content */}
          <div className="card flex-1 mb-2">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{entry.role}</h3>
                <p className="font-semibold text-accent-600 dark:text-accent-400">{entry.company}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-gray-500 dark:text-slate-400 flex-shrink-0">
                <time>{entry.period}</time>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {entry.location}
                </span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400">
                  {entry.type}
                </span>
              </div>
            </div>

            <ul className="space-y-2" role="list">
              {entry.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-400" aria-hidden="true" />
                  <span className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
