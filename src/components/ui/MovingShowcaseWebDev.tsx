'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Zap,
  Sparkles,
  Code2,
  Layout,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Cpu,
  Layers
} from 'lucide-react';

const webDevRow1 = [
  {
    name: 'High-Speed App Architecture',
    desc: 'Server Actions & Sub-second LCP',
    category: 'FRAMEWORK',
    gradient: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400',
    iconColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    icon: Globe,
    metric: '< 0.8s LCP'
  },
  {
    name: 'Concurrent Rendering Engine',
    desc: 'Ultra-fast Client Hydration',
    category: 'UI ENGINE',
    gradient: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-400',
    iconColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    icon: Code2,
    metric: 'Instant Load'
  },
  {
    name: 'Bespoke UI Design System',
    desc: 'Fluid Responsive Modern UI',
    category: 'STYLING',
    gradient: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400',
    iconColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    icon: Layout,
    metric: 'Zero CSS Bloat'
  },
  {
    name: 'TypeScript 5.5 Strict',
    desc: '100% Type-Safe Clean Architecture',
    category: 'TYPE SAFETY',
    gradient: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
    iconColor: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    icon: ShieldCheck,
    metric: 'Zero Errors'
  },
  {
    name: 'Framer Motion 11 Cues',
    desc: '60fps Micro-Animations & Glows',
    category: 'ANIMATION',
    gradient: 'from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-400',
    iconColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    icon: Sparkles,
    metric: '60fps Smooth'
  },
  {
    name: 'Vercel & Cloudflare Edge',
    desc: 'Global CDN Sub-second Delivery',
    category: 'DEPLOYMENT',
    gradient: 'from-slate-500/20 to-zinc-500/20 border-slate-500/30 text-slate-300',
    iconColor: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    icon: Zap,
    metric: 'Edge Global'
  }
];

const webDevRow2 = [
  {
    name: '99+ Google Lighthouse Score',
    desc: 'Performance & Core Web Vitals',
    category: 'PERFORMANCE',
    gradient: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400',
    iconColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: Gauge,
    metric: '99/100 Score'
  },
  {
    name: 'Headless E-Commerce Cart',
    desc: 'Razorpay & Stripe API Checkout',
    category: 'COMMERCE',
    gradient: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400',
    iconColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    icon: Layers,
    metric: 'Sub-second Checkout'
  },
  {
    name: 'Mobile-First Fluid Layout',
    desc: '100% Touch & Retina Optimized',
    category: 'RESPONSIVE',
    gradient: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    iconColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: Smartphone,
    metric: '100% Responsive'
  },
  {
    name: 'Supabase DB & Real-Time Auth',
    desc: 'Postgres & Row Security Rules',
    category: 'DATABASE',
    gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    iconColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: Cpu,
    metric: 'Postgres Live'
  },
  {
    name: 'SEO & Rich Schema Metadata',
    desc: 'Top Google Keyword Rankings',
    category: 'SEO ENGINE',
    gradient: 'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
    iconColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    icon: Globe,
    metric: 'Top Indexing'
  },
  {
    name: 'PWA Native Web Experience',
    desc: 'Installable Mobile Web App',
    category: 'NATIVE PWA',
    gradient: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
    iconColor: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    icon: Smartphone,
    metric: 'PWA Ready'
  }
];

export default function MovingShowcaseWebDev() {
  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl text-white my-6">
      {/* Ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-purple/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-[10px] font-bold uppercase tracking-wider text-brand-blue w-fit">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-spin" style={{ animationDuration: '6s' }} />
              Live Horizontal Web Stack Showcase
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white">
              Next-Generation Web Engineering Architecture
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>99+ Lighthouse Speed Score</span>
          </div>
        </div>

        {/* Continuous Horizontal Scrolling Ticker Container */}
        <div className="flex flex-col gap-5 overflow-hidden py-2 relative">
          
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Row 1: Moving Left Continuously */}
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 24,
                ease: 'linear',
              },
            }}
          >
            {[...webDevRow1, ...webDevRow1].map((card, idx) => {
              const IconComp = card.icon;

              return (
                <div
                  key={idx}
                  className={`bg-slate-900/90 border ${card.gradient} rounded-2xl p-4 w-64 sm:w-72 flex flex-col justify-between gap-3 shadow-lg backdrop-blur-md hover:scale-105 transition-transform cursor-pointer group flex-shrink-0`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                      {card.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {card.metric}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${card.iconColor} shadow-md`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-xs font-bold text-white group-hover:text-brand-blue transition-colors">
                        {card.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-light leading-snug">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active Architecture
                    </span>
                    <span className="text-brand-blue font-mono font-bold">DotnLott Engineering</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Row 2: Moving Right Continuously */}
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 27,
                ease: 'linear',
              },
            }}
          >
            {[...webDevRow2, ...webDevRow2].map((card, idx) => {
              const IconComp = card.icon;

              return (
                <div
                  key={idx}
                  className={`bg-slate-900/90 border ${card.gradient} rounded-2xl p-4 w-64 sm:w-72 flex flex-col justify-between gap-3 shadow-lg backdrop-blur-md hover:scale-105 transition-transform cursor-pointer group flex-shrink-0`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                      {card.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {card.metric}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${card.iconColor} shadow-md`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-xs font-bold text-white group-hover:text-brand-purple transition-colors">
                        {card.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-light leading-snug">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active Architecture
                    </span>
                    <span className="text-brand-purple font-mono font-bold">DotnLott Engineering</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* Bottom Bar Tech Stack */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            Core Stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {['Sub-Second Speed', 'Bespoke UI', 'Type-Safe Code', 'Responsive Layouts', '60fps Animations', 'Cloud Database', 'Global Edge CDN'].map((tech) => (
              <span key={tech} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
