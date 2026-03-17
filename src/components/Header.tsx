'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container-wide">
        <nav
          className="flex items-center justify-between h-16"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-xl text-gray-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
            aria-label="Prince Kushwaha — Home"
          >
            <span className="text-accent-600 dark:text-accent-400">PK</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-link px-3 py-2 rounded-lg text-sm ${
                    pathname === href ? 'active text-accent-600 dark:text-accent-400' : ''
                  }`}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden btn-ghost p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
                <span
                  className={`block h-0.5 bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                />
                <span
                  className={`block h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block h-0.5 bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 overflow-hidden"
          >
            <ul className="container-wide py-4 flex flex-col gap-1" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      pathname === href
                        ? 'bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400'
                        : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
