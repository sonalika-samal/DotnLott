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
    name: 'AI Agents & Workflow Pipeline Engineering',
    tagline: 'Autonomous AI workflows that handle lead qualification, data parsing, and multi-app sync 24/7.',
    category: 'AI AUTOMATION',
    color: 'text-brand-purple',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/20',
    icon: Bot,
    techs: ['Workflow Orchestration', 'Generative AI', 'Large Language Models', 'Webhook Routers', 'Python AI Scripts'],
    metrics: [
      { label: 'Uptime Reliability', val: '99.9%' },
      { label: 'Execution Speed', val: 'Sub-Second' },
      { label: 'Manual Time Saved', val: '85%+' }
    ],
    terminalLogs: [
      '> [AI AGENT] Webhook event received via POST /api/leads',
      '> [PARSE] LLM classified lead intent: Enterprise Web Development',
      '> [PIPELINE] Workflow router dispatched payload to CRM + messaging nodes',
      '> [SUCCESS] Processed in 210ms with 0 human intervention'
    ]
  },
  {
    id: 'whatsapp-api',
    number: '02',
    name: 'Official Messaging & Notification APIs',
    tagline: 'Direct messaging integration for automated lead followups, appointment triggers, and interactive chatbots.',
    category: 'MESSAGING ENGINE',
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    icon: MessageSquare,
    techs: ['Cloud Messaging APIs', 'Interactive Chat Webhooks', 'Interactive Buttons', 'Structured Notifications', 'Custom Bot Engine'],
    metrics: [
      { label: 'Delivery Rate', val: '99.4%' },
      { label: 'Read Ratio', val: '92% Avg' },
      { label: 'Response Delay', val: '< 0.5s' }
    ],
    terminalLogs: [
      '> [MESSAGING API] Dispatching verified template notification',
      '> [GATEWAY API] Message ID: msg_846969508_status_sent',
      '> [DELIVERY] Webhook callback: Status = DELIVERED & READ',
      '> [BOT] Interactive CTA buttons rendered on user screen'
    ]
  },
  {
    id: 'web-engineering',
    number: '03',
    name: 'High-Performance Full-Stack Web Development',
    tagline: 'High-converting, sub-second loading websites built with custom optimized frontends, reactive interfaces, and fast edge assets.',
    category: 'WEB PLATFORMS',
    color: 'text-brand-blue',
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/20',
    icon: Code2,
    techs: ['Custom Frontend', 'React', 'Optimized Assets', 'Tailwind CSS', 'TypeScript', 'Cloud VPS'],
    metrics: [
      { label: 'Lighthouse Speed', val: '98/100' },
      { label: 'Page Load', val: '0.3s Total' },
      { label: 'SEO Optimization', val: '100%' }
    ],
    terminalLogs: [
      '> [TURBOPACK] Bundling static HTML & server components...',
      '> [PERFORMANCE] First Contentful Paint: 240ms',
      '> [SEO] Schema.org Organization & FAQ JSON-LD hydrated',
      '> [BUILD] Edge compilation complete: 100% build health verified'
    ]
  },
  {
    id: 'crm-sync',
    number: '04',
    name: 'Enterprise CRM & Database Synchronization',
    tagline: 'Seamless multi-platform data syncing between leading CRM systems, relational databases, and cloud workspace suites.',
    category: 'DATA INFRASTRUCTURE',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/20',
    icon: Database,
    techs: ['CRM REST APIs', 'Relational Databases', 'Spreadsheet APIs', 'In-Memory Cache Systems', 'Real-Time Syncing'],
    metrics: [
      { label: 'Data Integrity', val: '100%' },
      { label: 'Sync Latency', val: '140ms' },
      { label: 'Lead Loss', val: '0%' }
    ],
    terminalLogs: [
      '> [CRM SYNC] OAuth2 token refreshed for integration API',
      '> [UPSERT] Record created: Deal_Name = "DotnLott Ingestion #892"',
      '> [CACHE] In-memory state invalidated & synced to main database',
      '> [AUDIT] Data verification passed with 0 missing fields'
    ]
  },
  {
    id: 'security-vps',
    number: '05',
    name: 'Private Cloud VPS & Corporate IP Security',
    tagline: 'Dedicated private hosting setups with 100% NDA compliance and full source code ownership.',
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, [activeSpecialtyIdx, activeSpecialty.terminalLogs.length]);

  const getPillarStyles = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'ai-workflows':
        return isSelected
          ? {
              btn: 'bg-purple-200 border-transparent shadow-xs translate-x-1 text-purple-950 font-extrabold z-10',
              indicator: 'bg-brand-purple',
              arrow: 'bg-brand-purple/20 text-brand-purple',
              icon: 'bg-brand-purple/30 text-brand-purple border-transparent'
            }
          : {
              btn: 'bg-purple-100 border-transparent hover:bg-purple-150 hover:shadow-2xs text-purple-900 z-10',
              indicator: 'bg-transparent',
              arrow: 'text-purple-500 group-hover:text-purple-700',
              icon: 'bg-purple-200/60 text-purple-600 border-transparent'
            };
      case 'whatsapp-api':
        return isSelected
          ? {
              btn: 'bg-emerald-200 border-transparent shadow-xs translate-x-1 text-emerald-950 font-extrabold z-10',
              indicator: 'bg-emerald-500',
              arrow: 'bg-emerald-500/20 text-emerald-600',
              icon: 'bg-emerald-500/30 text-emerald-600 border-transparent'
            }
          : {
              btn: 'bg-emerald-100 border-transparent hover:bg-emerald-150 hover:shadow-2xs text-emerald-900 z-10',
              indicator: 'bg-transparent',
              arrow: 'text-emerald-500 group-hover:text-emerald-700',
              icon: 'bg-emerald-200/60 text-emerald-600 border-transparent'
            };
      case 'web-engineering':
        return isSelected
          ? {
              btn: 'bg-sky-200 border-transparent shadow-xs translate-x-1 text-sky-950 font-extrabold z-10',
              indicator: 'bg-brand-blue',
              arrow: 'bg-brand-blue/20 text-brand-blue',
              icon: 'bg-brand-blue/30 text-brand-blue border-transparent'
            }
          : {
              btn: 'bg-sky-100 border-transparent hover:bg-sky-150 hover:shadow-2xs text-sky-900 z-10',
              indicator: 'bg-transparent',
              arrow: 'text-sky-500 group-hover:text-sky-700',
              icon: 'bg-sky-200/60 text-sky-600 border-transparent'
            };
      case 'crm-sync':
        return isSelected
          ? {
              btn: 'bg-indigo-200 border-transparent shadow-xs translate-x-1 text-indigo-950 font-extrabold z-10',
              indicator: 'bg-indigo-650',
              arrow: 'bg-indigo-500/20 text-indigo-650',
              icon: 'bg-indigo-50/30 text-indigo-650 border-transparent'
            }
          : {
              btn: 'bg-indigo-100 border-transparent hover:bg-indigo-150 hover:shadow-2xs text-indigo-900 z-10',
              indicator: 'bg-transparent',
              arrow: 'text-indigo-500 group-hover:text-indigo-700',
              icon: 'bg-indigo-200/60 text-indigo-600 border-transparent'
            };
      case 'security-vps':
        return isSelected
          ? {
              btn: 'bg-amber-200 border-transparent shadow-xs translate-x-1 text-amber-950 font-extrabold z-10',
              indicator: 'bg-amber-500',
              arrow: 'bg-amber-500/20 text-amber-600',
              icon: 'bg-amber-500/30 text-amber-600 border-transparent'
            }
          : {
              btn: 'bg-amber-100 border-transparent hover:bg-amber-150 hover:shadow-2xs text-amber-900 z-10',
              indicator: 'bg-transparent',
              arrow: 'text-amber-500 group-hover:text-amber-700',
              icon: 'bg-amber-200/60 text-amber-600 border-transparent'
            };
      default:
        return {
          btn: 'bg-white border-transparent shadow-xs translate-x-1 text-slate-900 z-10',
          indicator: 'bg-brand-purple',
          arrow: 'bg-brand-purple/10 text-brand-purple',
          icon: 'bg-brand-purple/10 text-brand-purple border-transparent'
        };
    }
  };

  const getCardStyles = (id: string) => {
    switch (id) {
      case 'ai-workflows':
        return 'bg-white border-purple-300 shadow-purple-500/5';
      case 'whatsapp-api':
        return 'bg-white border-emerald-300 shadow-emerald-500/5';
      case 'web-engineering':
        return 'bg-white border-sky-300 shadow-blue-500/5';
      case 'crm-sync':
        return 'bg-white border-indigo-300 shadow-indigo-500/5';
      case 'security-vps':
        return 'bg-white border-amber-300 shadow-amber-500/5';
      default:
        return 'bg-white border-slate-200 shadow-xl';
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden overflow-x-clip relative py-2 text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-3 relative z-10 max-w-3xl mx-auto mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-mono font-extrabold uppercase tracking-wider text-brand-purple">
          <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
          Our Engineering Specialties
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
          What Sets DotnLott Apart
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
          From sub-second custom web applications to autonomous AI workflows, explore our 5 core engineering pillars.
        </p>
      </div>

      {/* DYNAMIC TRANSPARENT INTERACTIVE SHOWCASE LAYOUT WITH EQUAL HEIGHT COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch relative z-10">
        
        {/* Left Interactive Pillar Selector (5 cols) - Height matches right card */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 h-full">
          <div className="flex items-center justify-between px-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-brand-purple" /> Select Specialty Pillar
            </span>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg transition-colors border ${
                isAutoPlaying
                  ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              {isAutoPlaying ? 'Auto-Rotate ON' : 'Paused'}
            </button>
          </div>

          <div className="flex flex-col justify-between flex-1 gap-2">
            {specialtiesData.map((specialty, idx) => {
              const isSelected = idx === activeSpecialtyIdx;
              const Icon = specialty.icon;
              const styles = getPillarStyles(specialty.id, isSelected);

              return (
                <button
                  key={specialty.id}
                  onClick={() => {
                    setActiveSpecialtyIdx(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`flex-1 p-2.5 sm:p-3 rounded-xl text-left transition-all duration-300 flex items-center justify-between gap-3 border-[1.5px] relative overflow-hidden group ${styles.btn}`}
                >
                  {/* Active Indicator Line */}
                  {isSelected && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${styles.indicator}`} />
                  )}

                  <div className="flex items-center gap-3 pl-1">
                    <div
                      className={`w-7.5 h-7.5 sm:w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                        isSelected
                          ? `${specialty.badgeBg} ${specialty.color} ${specialty.badgeBorder}`
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        Pillar {specialty.number} • {specialty.category}
                      </span>
                      <span className={`text-[11px] sm:text-xs font-bold font-display leading-snug ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                        {specialty.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 pr-1">
                    <div
                      className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-transform ${styles.arrow}`}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Live Stage Card & Developer Terminal (7 cols) - Height matches left list */}
        <div className={`lg:col-span-7 flex flex-col justify-between border-2 rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden h-full lg:h-[415px] transition-all duration-350 ${getCardStyles(activeSpecialty.id)}`}>
          
          {/* Top Stage Information Bar */}
          <div className="flex flex-col gap-2.5 relative z-10 border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className={`text-[9px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${activeSpecialty.badgeBg} ${activeSpecialty.color} ${activeSpecialty.badgeBorder}`}>
                Pillar {activeSpecialty.number} {'//'} {activeSpecialty.category}
              </span>

              <span className="text-[9px] font-mono text-emerald-700 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Engineering Mode
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display leading-snug">
              {activeSpecialty.name}
            </h3>

            <p className="text-xs text-slate-600 font-light leading-relaxed">
              {activeSpecialty.tagline}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {activeSpecialty.techs.map((tech, i) => (
                <span
                  key={i}
                  className="text-[9px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Trio Row */}
          <div className="grid grid-cols-3 gap-2.5 my-3 relative z-10">
            {activeSpecialty.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/60 rounded-xl p-2 flex flex-col gap-0.5 text-center shadow-3xs"
              >
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  {m.label}
                </span>
                <span className={`text-xs sm:text-sm font-black font-display ${activeSpecialty.color}`}>
                  {m.val}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Terminal Execution Stream */}
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 relative z-10 flex flex-col gap-2.5 font-mono text-[10px] shadow-inner text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
              <span className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-slate-300">
                <Terminal className="w-3 h-3 text-cyan-400" /> Live Terminal Stream
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-[10px] text-slate-300 h-[72px] overflow-hidden">
              {activeSpecialty.terminalLogs.slice(0, logIndex + 1).map((log, lIdx) => (
                <div key={lIdx} className="flex items-start gap-1.5 leading-relaxed animate-fadeIn">
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
