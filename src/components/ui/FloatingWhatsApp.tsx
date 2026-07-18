'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const pathname = usePathname();

  // Show a little prompt box after 5 seconds to invite users to chat
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Helper to generate dynamic prefilled WhatsApp message based on current page
  const getWhatsAppLink = () => {
    const phoneNumber = '917846969508'; // Client phone number
    let text = 'Hey Sonalika, I would like to inquire about your workflow automation services.';

    if (pathname === '/catalog') {
      text = 'Hey Sonalika, I was browsing your Automation Catalog and want to learn more about your pre-built workflows.';
    } else if (pathname === '/booking') {
      text = 'Hey Sonalika, I would like to schedule a 1-on-1 consultation session for AI & workflow integrations.';
    } else if (pathname === '/portfolio') {
      text = 'Hey Sonalika, I saw your portfolio case studies and would love to see how you can automate similar flows for us.';
    }

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
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
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
                  <Image
                    src="/mascot.png"
                    alt="Mascot Avatar"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-none">Sonalika (DotnLott)</span>
                  <span className="text-[10px] text-zinc-400">Online & Ready</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowPrompt(false);
                }}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-zinc-950/80 rounded-xl p-3 border border-white/5 text-[11px] text-zinc-300 leading-relaxed">
              &quot;Hey there! Need help scoping an automation or setting up a database? Let&apos;s discuss it directly on WhatsApp!&quot;
            </div>

            {/* CTA Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba56] rounded-lg transition-colors shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              <Send className="w-3.5 h-3.5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPrompt(false);
        }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-brand-blue to-brand-purple hover:scale-105 active:scale-95 shadow-xl transition-all duration-300 relative group glow-blue"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-slate-950 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-slate-950" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        )}
      </button>
    </div>
  );
}
