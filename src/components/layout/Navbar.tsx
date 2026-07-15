'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'Quote Builder', path: '/quote' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Book Consultation', path: '/booking' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  useEffect(() => {
    const stored = localStorage.getItem('dotnlott_currency');
    if (stored === 'INR' || stored === 'USD') {
      setCurrency(stored);
    }
  }, []);

  const handleCurrencyChange = (newCurrency: 'USD' | 'INR') => {
    setCurrency(newCurrency);
    localStorage.setItem('dotnlott_currency', newCurrency);
    window.dispatchEvent(new Event('dotnlott_currency_changed'));
  };

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
    setIsOpen(false);
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
            <div className="relative w-9 h-9 overflow-hidden rounded-lg bg-slate-900 border border-white/10 p-1 flex items-center justify-center">
              <Image
                src="/logo.png"
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
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors py-2"
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
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Mode Selection */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 mr-2">
              <button
                onClick={() => handleCurrencyChange('INR')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                  currency === 'INR' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-550 hover:text-slate-950'
                }`}
                title="Indian Mode (Rupees)"
              >
                🇮🇳 ₹
              </button>
              <button
                onClick={() => handleCurrencyChange('USD')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                  currency === 'USD' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-550 hover:text-slate-955'
                }`}
                title="Abroad Mode (Dollars)"
              >
                🌐 $
              </button>
            </div>
            <Link
              href="/quote"
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 glass-card hover:glass-card-hover rounded-full transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
                Build Custom Quote
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-brand-blue/5 to-brand-purple/5 transition-transform duration-500" />
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors"
            >
              Consult Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
            className="md:hidden absolute top-full left-0 right-0 glass-nav border-t border-white/5 py-6 px-4 shadow-2xl"
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
              
              {/* Mobile Currency Selector */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-150 rounded-2xl my-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pricing Mode:</span>
                <div className="flex items-center bg-slate-200/50 border border-slate-200 rounded-full p-0.5 shadow-sm">
                  <button
                    onClick={() => handleCurrencyChange('INR')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                      currency === 'INR' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    🇮🇳 ₹ Rupee
                  </button>
                  <button
                    onClick={() => handleCurrencyChange('USD')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                      currency === 'USD' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    🌐 $ Dollar
                  </button>
                </div>
              </div>
              <div className="h-px bg-slate-200/50 my-1" />
              <Link
                href="/quote"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider text-slate-700 glass-card rounded-xl"
              >
                <Sparkles className="w-4 h-4 text-brand-purple" />
                Build Custom Quote
              </Link>
              <Link
                href="/booking"
                className="w-full flex items-center justify-center gap-1 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-xl hover:bg-slate-800"
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
