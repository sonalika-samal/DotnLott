'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/catalog' },
  { name: 'Web Dev', path: '/website-development' },
  { name: 'AI Integration', path: '/ai-integration' },
  { name: 'Deployment', path: '/deployment' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'About & FAQ', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-lg bg-slate-900 border border-white/10 p-1 flex items-center justify-center">
              <Image
                src="/logo-v2.png"
                alt="DotnLott Logo"
                width={32}
                height={32}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Dot<span className="text-brand-purple">n</span>Lott
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 group-hover:text-brand-blue transition-colors">
                Dream. Build. Repeat.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative text-xs xl:text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors py-2 whitespace-nowrap"
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-purple rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Consult Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 glass-nav border-t border-white/5 py-6 px-4 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 border-l-2 border-brand-purple'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="h-px bg-slate-200/50 my-2" />
              <Link
                href="/booking"
                className="w-full flex items-center justify-center gap-1.5 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-xl hover:bg-slate-800"
              >
                Consult Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
