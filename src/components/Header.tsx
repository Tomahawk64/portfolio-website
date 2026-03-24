"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-background/80 border-b border-border shadow-lg shadow-black/5"
            : "backdrop-blur-md bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="#home" className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-400 dark:from-primary-400 dark:to-emerald-300 hover:opacity-80 transition-opacity">
            PK.
          </Link>
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-semibold tracking-wide hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                className="md:hidden w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-72 bg-card border-l border-border shadow-2xl flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-400 dark:from-primary-400 dark:to-emerald-300">
                  PK.
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-xl font-semibold px-4 py-3 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 transition-all"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
