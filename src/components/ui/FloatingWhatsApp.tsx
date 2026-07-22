'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronUp } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();

  // Show prompt box and make it automatically disappear after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPrompt) {
      const dismissTimer = setTimeout(() => {
        setShowPrompt(false);
      }, 1000);
      return () => clearTimeout(dismissTimer);
    }
  }, [showPrompt]);

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

  // Helper to generate dynamic prefilled WhatsApp message based on current page
  const getWhatsAppLink = () => {
    const phoneNumber = '917846969508'; // Client phone number
    let text = 'Hey Sonalika, I would like to inquire about your workflow automation services.';

    if (pathname === '/ai-automation' || pathname === '/catalog') {
      text = 'Hey Sonalika, I was browsing your AI Automation Catalog and want to learn more about your pre-built workflows.';
    } else if (pathname === '/contact' || pathname.startsWith('/booking')) {
      text = 'Hey Sonalika, I would like to schedule a 1-on-1 consultation session for AI & workflow integrations.';
    } else if (pathname === '/contact') {
      text = 'Hey Sonalika, I am reaching out from your Contact page and would like to inquire about your services.';
    } else if (pathname === '/website-development') {
      text = 'Hey Sonalika, I am interested in building a high-performance custom website or web app with DotnLott.';
    }

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      
      {/* Floating "Go To Top" Button above WhatsApp Widget */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-800 bg-white/95 border border-slate-200 shadow-md hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md group"
            aria-label="Scroll to top"
            title="Go to Top"
          >
            <ChevronUp className="w-5 h-5 text-brand-purple group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Dialogue Prompt */}
      <AnimatePresence>
        {(showPrompt || isOpen) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className={`w-72 glass-card rounded-2xl shadow-2xl p-4 border border-brand-purple/20 flex flex-col gap-3 ${
              isOpen ? 'block' : showPrompt ? 'hidden md:flex' : 'hidden'
            }`}
          >
            {/* Dialogue Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <Image
                      src="/sonalika.jpg"
                      alt="Sonalika Samal Avatar"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full translate-x-0.5 translate-y-0.5 animate-pulse z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-none">Sonalika Samal</span>
                  <span className="text-[10px] text-slate-500 mt-1">DotnLott Core Team</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowPrompt(false);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-zinc-950/80 rounded-xl p-3 border border-white/5 text-[11px] text-zinc-300 leading-relaxed">
              &quot;Hey there! Need help scoping an automation or setting up a website? Let&apos;s discuss it directly on WhatsApp!&quot;
            </div>

            {/* CTA Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba56] rounded-lg transition-colors shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              <Send className="w-3.5 h-3.5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Button with Official WhatsApp Icon */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPrompt(false);
        }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:bg-[#20ba56] hover:scale-105 active:scale-95 shadow-xl transition-all duration-300 relative group"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border border-slate-950 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border border-slate-950" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 group-hover:scale-110 transition-transform"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  );
}
