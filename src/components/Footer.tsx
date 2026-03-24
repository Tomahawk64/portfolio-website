"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 w-full border-t border-border mt-auto py-12 bg-black/5 dark:bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6">
        <p className="font-light">&copy; {new Date().getFullYear()} Prince Kushwaha. Crafted with ❤️ and Next.js.</p>
        <div className="flex items-center space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all">
            <Github className="w-4 h-4 group-hover:text-white transition-colors" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all">
            <Linkedin className="w-4 h-4 group-hover:text-white transition-colors" />
          </a>
          <a href="mailto:princekkushwaha@outlook.com" className="group w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all">
            <Mail className="w-4 h-4 group-hover:text-white transition-colors" />
          </a>
          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 border border-white/10 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>
      </div>
    </footer>
  );
}
