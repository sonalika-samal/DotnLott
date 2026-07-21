'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Database,
  Lock,
  Bot,
  Terminal,
  Activity,
  Code2,
  Flame,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Specialty {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  icon: React.ElementType;
  techs: string[];
  metrics: { label: string; val: string }[];
  terminalLogs: string[];
}

const specialtiesData: Specialty[] = [
  {
    id: 'ai-workflows',
    number: '01',
    name: 'AI Agents & n8n Pipeline Engineering',
    tagline: 'Autonomous AI workflows that handle lead qualification, data parsing, and multi-app sync 24/7.',
    category: 'AI AUTOMATION',
    color: 'text-brand-purple',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/20',
    icon: Bot,
    techs: ['n8n Engine', 'OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Webhook Routers', 'Python AI Scripts'],
    metrics: [
      { label: 'Uptime Reliability', val: '99.9%' },
      { label: 'Execution Speed', val: 'Sub-Second' },
      { label: 'Manual Time Saved', val: '85%+' }
    ],
    terminalLogs: [
      '> [AI AGENT] Webhook event received via POST /api/leads',
      '> [PARSE] LLM classified lead intent: Enterprise Web Development',
      '> [PIPELINE] n8n router dispatched payload to CRM + WhatsApp node',
      '> [SUCCESS] Processed in 210ms with 0 human intervention'
    ]
  },
  {
    id: 'whatsapp-api',
    number: '02',
    name: 'Official Meta WhatsApp Business Cloud API',
    tagline: 'Direct WhatsApp integration for automated lead followups, appointment triggers, and interactive chatbots.',
    category: 'MESSAGING ENGINE',
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    icon: MessageSquare,
    techs: ['Meta Cloud API', 'WhatsApp Webhooks', 'Interactive Buttons', 'Template Messages', 'Node.js Bot Engine'],
    metrics: [
      { label: 'Delivery Rate', val: '99.4%' },
      { label: 'Read Ratio', val: '92% Avg' },
      { label: 'Response Delay', val: '< 0.5s' }
    ],
    terminalLogs: [
      '> [WHATSAPP API] Dispatching verified template: "welcome_onboarding_v2"',
      '> [META API] Message ID: wamid.HBgLOTE3ODQ2OTY5NTA4...',
      '> [DELIVERY] Webhook callback: Status = DELIVERED & READ',
      '> [BOT] Interactive CTA buttons rendered on user screen'
    ]
  },
  {
    id: 'web-engineering',
    number: '03',
    name: 'Next.js 16 & Full-Stack Web Development',
    tagline: 'High-converting, sub-second loading websites built with Next.js Turbopack, React 19, and server components.',
    category: 'WEB PLATFORMS',
    color: 'text-brand-blue',
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/20',
    icon: Code2,
    techs: ['Next.js 16', 'React 19', 'Turbopack', 'Tailwind CSS', 'TypeScript', 'Vercel / VPS'],
    metrics: [
      { label: 'Lighthouse Speed', val: '98/100' },
      { label: 'Page Load', val: '0.3s Total' },
      { label: 'SEO Optimization', val: '100%' }
    ],
    terminalLogs: [
      '> [TURBOPACK] Bundling static HTML & server components...',
      '> [PERFORMANCE] First Contentful Paint: 240ms',
      '> [SEO] Schema.org Organization & FAQ JSON-LD hydrated',
      '> [BUILD] Next.js edge route rendered with sub-second response'
    ]
  },
  {
    id: 'crm-sync',
    number: '04',
    name: 'Enterprise CRM & Database Synchronization',
    tagline: 'Seamless multi-platform data syncing between Zoho CRM, HubSpot, PostgreSQL, and Google Workspace.',
    category: 'DATA INFRASTRUCTURE',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/20',
    icon: Database,
    techs: ['Zoho CRM REST API', 'HubSpot API', 'Enterprise PostgreSQL', 'Google Sheets API', 'Redis Caching'],
    metrics: [
      { label: 'Data Integrity', val: '100%' },
      { label: 'Sync Latency', val: '140ms' },
      { label: 'Lead Loss', val: '0%' }
    ],
    terminalLogs: [
      '> [CRM SYNC] OAuth2 token refreshed for Zoho API v3',
      '> [UPSERT] Record created: Deal_Name = "DotnLott Ingestion #892"',
      '> [CACHE] Redis state invalidated & synced to PostgreSQL',
      '> [AUDIT] Data verification passed with 0 missing fields'
    ]
  },
  {
    id: 'security-vps',
    number: '05',
    name: 'Private Cloud VPS & Corporate IP Security',
    tagline: 'Dedicated hosting setups on AWS/Hetzner with 100% NDA compliance and full source code ownership.',
    category: 'CLOUD & SECURITY',
    color: 'text-slate-800',
    badgeBg: 'bg-slate-500/10',
    badgeBorder: 'border-slate-500/20',
    icon: Lock,
    techs: ['Docker Containers', 'Nginx Reverse Proxy', 'SSL / TLS 1.3', 'Hetzner / AWS VPS', 'IP Protection'],
    metrics: [
      { label: 'NDA Protection', val: '100%' },
      { label: 'Code Ownership', val: 'Full IP' },
      { label: 'Cloud Security', val: 'Bank-Grade' }
    ],
    terminalLogs: [
      '> [DOCKER] Container health check: OK (CPU 1.2%, MEM 140MB)',
      '> [SECURITY] TLS 1.3 Handshake established with 256-bit AES encryption',
      '> [LEGAL] 100% NDA & Repository transfer complete',
      '> [MONITOR] Zero security vulnerabilities detected'
    ]
  }
];

const marqueeServices = [
  '⚡ Sub-Second Next.js Web Apps',
  '🤖 Autonomous n8n AI Pipelines',
  '📱 Official Meta WhatsApp Cloud API',
  '📊 Zoho CRM Real-Time Syncing',
  '🔒 100% Code Ownership & NDA',
  '🛡️ MCA Registered Entity (A2Z Version Pvt Ltd)',
  '💼 Direct Founder Engineering',
  '🚀 24/7 Automated Lead Ingestion',
  '🌐 High-Converting Web Architecture',
  '📈 99.9% Uptime Guarantee'
];

export default function InteractiveAboutSpecialtiesShowcase() {
  const [activeSpecialtyIdx, setActiveSpecialtyIdx] = useState<number>(0);
  const [logIndex, setLogIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const activeSpecialty = specialtiesData[activeSpecialtyIdx];

  // Auto cycle specialty preview every 6 seconds if user isn't manually clicking
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveSpecialtyIdx((prev) => (prev + 1) % specialtiesData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Terminal line typing effect trigger
  useEffect(() => {
    setLogIndex(0);
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < activeSpecialty.terminalLogs.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [activeSpecialtyIdx]);

  return (
    <div className="w-full max-w-full overflow-hidden overflow-x-clip relative py-4 text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-3 relative z-10 max-w-3xl mx-auto mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-mono font-extrabold uppercase tracking-wider text-brand-purple">
          <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
          Our Engineering Specialties
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          What Sets DotnLott Apart
        </h2>
        <p className="text-xs sm:text-base text-slate-600 font-light leading-relaxed">
          From sub-second Next.js web applications to autonomous AI workflows, explore our 5 core engineering pillars.
        </p>
      </div>

      {/* TOP MOVING INFINITE MARQUEE STRIP */}
      <div className="relative w-full max-w-full overflow-hidden mb-8 sm:mb-10 py-3 bg-white/80 border-y border-slate-200/80 backdrop-blur-md z-10 shadow-2xs rounded-2xl">
        {/* Fade edges to match background color */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f8fafc] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f8fafc] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
        >
          {[...marqueeServices, ...marqueeServices].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs font-mono font-extrabold text-slate-800 whitespace-nowrap px-3.5 py-1 bg-slate-100/90 rounded-xl border border-slate-200 shadow-2xs flex-shrink-0"
            >
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* DYNAMIC TRANSPARENT INTERACTIVE SHOWCASE LAYOUT WITH EQUAL HEIGHT COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
        
        {/* Left Interactive Pillar Selector (5 cols) - Height matches right card */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3 h-full">
          <div className="flex items-center justify-between px-2 mb-0.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-brand-purple" /> Select Specialty Pillar
            </span>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg transition-colors border ${
                isAutoPlaying
                  ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              {isAutoPlaying ? 'Auto-Rotate ON' : 'Paused'}
            </button>
          </div>

          <div className="flex flex-col justify-between flex-1 gap-2.5">
            {specialtiesData.map((specialty, idx) => {
              const isSelected = idx === activeSpecialtyIdx;
              const Icon = specialty.icon;

              return (
                <button
                  key={specialty.id}
                  onClick={() => {
                    setActiveSpecialtyIdx(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`flex-1 p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between gap-4 border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white border-brand-purple/40 shadow-md ring-1 ring-brand-purple/20 translate-x-1'
                      : 'bg-white/70 border-slate-250/80 hover:bg-white hover:border-slate-300 text-slate-600 shadow-2xs'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-purple" />
                  )}

                  <div className="flex items-center gap-3.5 pl-1">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isSelected
                          ? `${specialty.badgeBg} ${specialty.color} ${specialty.badgeBorder}`
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400">
                        Pillar {specialty.number} • {specialty.category}
                      </span>
                      <span className={`text-xs sm:text-sm font-bold font-display leading-snug ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                        {specialty.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 pr-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                        isSelected ? 'bg-brand-purple/10 text-brand-purple scale-110' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Live Stage Card & Developer Terminal (7 cols) - Height matches left list */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-slate-250/90 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden h-full min-h-[460px]">
          
          {/* Top Stage Information Bar */}
          <div className="flex flex-col gap-4 relative z-10 border-b border-slate-100 pb-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className={`text-xs font-mono font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${activeSpecialty.badgeBg} ${activeSpecialty.color} ${activeSpecialty.badgeBorder}`}>
                Pillar {activeSpecialty.number} // {activeSpecialty.category}
              </span>

              <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Engineering Mode
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display leading-snug">
              {activeSpecialty.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {activeSpecialty.tagline}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeSpecialty.techs.map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Trio Row */}
          <div className="grid grid-cols-3 gap-3 my-5 relative z-10">
            {activeSpecialty.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex flex-col gap-1 text-center"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  {m.label}
                </span>
                <span className={`text-base sm:text-lg font-black font-display ${activeSpecialty.color}`}>
                  {m.val}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Terminal Execution Stream */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 sm:p-5 relative z-10 flex flex-col gap-3 font-mono text-xs shadow-inner text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-slate-400">
              <span className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Live Terminal Stream
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-[11px] text-slate-300 min-h-[90px]">
              {activeSpecialty.terminalLogs.slice(0, logIndex + 1).map((log, lIdx) => (
                <div key={lIdx} className="flex items-start gap-2 leading-relaxed animate-fadeIn">
                  <span className="text-cyan-400 font-bold select-none">&gt;</span>
                  <span className={lIdx === logIndex ? 'text-emerald-300 font-semibold' : 'text-slate-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
