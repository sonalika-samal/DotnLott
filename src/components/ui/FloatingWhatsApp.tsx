'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track window scroll to toggle the "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating "Go To Top" Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full flex items-center justify-center text-slate-800 bg-white/95 border border-slate-200 shadow-lg hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md group pointer-events-auto cursor-pointer"
            aria-label="Scroll to top"
            title="Go to Top"
          >
            <ChevronUp className="w-5 h-5 text-brand-purple group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
