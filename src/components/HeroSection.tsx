'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-hero-pattern pt-16"
      aria-label="Hero section"
    >
      <div className="container-wide py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              Available for freelance & full-time roles
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4"
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">Prince Kushwaha</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-slate-400 mb-4"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            variants={item}
            className="text-lg text-gray-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed"
          >
            I build fast, scalable, and accessible web applications — from pixel-perfect frontends
            to robust backend APIs and cloud infrastructure.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary text-base">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </Link>
            <a
              href="/Prince_Kushwaha_CV.pdf"
              download
              className="btn-secondary text-base"
              aria-label="Download Prince Kushwaha's CV (PDF)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={item}
            className="mt-16 flex flex-wrap gap-8"
            aria-label="Quick statistics"
          >
            {[
              { value: '4+', label: 'Projects Shipped' },
              { value: '2+', label: 'Years Experience' },
              { value: '10+', label: 'Technologies' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-accent-600 dark:text-accent-400">{value}</div>
                <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-slate-500">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
