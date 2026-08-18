'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'AI Automation', path: '/ai-automation' },
  { name: 'Website Development', path: '/website-development' },
  {
    name: 'Softwares',
    path: '#',
    dropdownItems: [
      { name: 'Setu', path: '/softwares/setu', desc: 'Taskforce Management Software' },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSoftwaresOpen, setMobileSoftwaresOpen] = useState(false);
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setMobileSoftwaresOpen(false);
  }, [pathname]);

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
            <div className="relative w-9 h-9 overflow-hidden rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center">
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
                Dot<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brand-purple">n</span>Lott
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 group-hover:text-brand-blue transition-colors">
                Dream. Build. Repeat.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              if (item.dropdownItems) {
                return (
                  <div key={item.name} className="relative group py-2">
                    <button className="flex items-center gap-1 text-xs xl:text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap">
                      <span>{item.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 bg-white border border-slate-200/80 rounded-2xl p-2 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50 flex flex-col gap-0.5">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className="flex flex-col text-left hover:bg-slate-50 rounded-xl p-2.5 transition-colors group/sub"
                        >
                          <span className="text-xs font-bold text-slate-800 group-hover/sub:text-brand-purple transition-colors">
                            {subItem.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-light mt-0.5">
                            {subItem.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      if (item.path === '/contact') {
                        window.history.replaceState(null, '', '/contact');
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
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
              href="/contact?booking=true#calendar-booking"
              scroll={false}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-slate-200 py-6 px-6 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                if (item.dropdownItems) {
                  return (
                    <div key={item.name} className="flex flex-col">
                      <button
                        onClick={() => setMobileSoftwaresOpen(!mobileSoftwaresOpen)}
                        className="text-sm font-bold py-3 px-4 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-950 flex items-center justify-between transition-all animate-none"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileSoftwaresOpen ? 'rotate-180 text-brand-purple' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileSoftwaresOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 flex flex-col gap-1 mt-1"
                          >
                            {item.dropdownItems.map((subItem) => (
                              <Link
                                key={subItem.path}
                                href={subItem.path}
                                onClick={() => setIsOpen(false)}
                                className="text-xs font-semibold py-2.5 px-4 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex flex-col gap-0.5 text-left"
                              >
                                <span className="text-slate-800 font-bold">{subItem.name}</span>
                                <span className="text-[10px] text-slate-500 font-light">{subItem.desc}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-brand-purple/10 text-brand-purple border-l-4 border-brand-purple'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-brand-purple" />}
                  </Link>
                );
              })}
              <div className="h-px bg-slate-200/80 my-1" />
              <Link
                href="/contact?booking=true#calendar-booking"
                scroll={false}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-md active:scale-95 transition-all"
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
