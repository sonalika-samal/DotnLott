'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Sparkles,
  Zap,
  MessageSquare,
  Database,
  Mail,
  Share2,
  Lock,
  Globe,
  Bot,
  Layers,
  BarChart3,
  Workflow,
  CheckCircle2
} from 'lucide-react';

const catalogRow1 = [
  {
    name: 'Workflow Integration Engine',
    desc: '24/7 Background Automations',
    category: 'INTEGRATION',
    gradient: 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400',
    iconColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    icon: Workflow,
    metric: '99.9% Uptime'
  },
  {
    name: 'Cloud Messaging API',
    desc: 'Instant Customer Outreach',
    category: 'MESSAGING',
    gradient: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400',
    iconColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: MessageSquare,
    metric: '< 1s Delivery'
  },
  {
    name: 'Enterprise CRM Systems',
    desc: 'Real-time Database Syncing',
    category: 'CRM SYNC',
    gradient: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    iconColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    icon: Database,
    metric: 'Zero Lead Loss'
  },
  {
    name: 'AI Cognitive Copilot',
    desc: 'AI Sentiment & Reply Drafts',
    category: 'AI ENGINE',
    gradient: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    iconColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    icon: Bot,
    metric: 'Smart Intelligence'
  },
  {
    name: 'Cloud Spreadsheet Logging',
    desc: 'Live Sheet Logging & Backup',
    category: 'DATABASE',
    gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    iconColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    icon: Layers,
    metric: 'Auto Archiver'
  },
  {
    name: 'Payment Gateway APIs',
    desc: 'Automated Invoice Receipts',
    category: 'PAYMENTS',
    gradient: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
    iconColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    icon: Zap,
    metric: 'Instant Webhook'
  },
  {
    name: 'Social Lead Ads Connector',
    desc: 'Form-to-CRM Auto Ingest',
    category: 'LEAD GEN',
    gradient: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
    iconColor: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    icon: Share2,
    metric: 'Instant Capture'
  }
];

const catalogRow2 = [
  {
    name: 'Voice AI Support Suite',
    desc: 'Autonomous Inbound Call Handler',
    category: 'VOICE AI',
    gradient: 'from-amber-500/20 to-rose-500/20 border-amber-500/30 text-amber-400',
    iconColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: Cpu,
    metric: 'Humanlike Voice'
  },
  {
    name: 'Email Outreach Drips',
    desc: 'Outbound Cold Outreach',
    category: 'OUTREACH',
    gradient: 'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
    iconColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    icon: Mail,
    metric: 'Warmup Active'
  },
  {
    name: 'Team Workspace Alerts',
    desc: 'Real-Time Team Notifications',
    category: 'NOTIFICATIONS',
    gradient: 'from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/30 text-fuchsia-400',
    iconColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
    icon: Sparkles,
    metric: 'Instant Alert'
  },
  {
    name: 'Relational Enterprise Database',
    desc: 'High Speed Data Warehouse',
    category: 'STORAGE',
    gradient: 'from-blue-500/20 to-slate-500/20 border-blue-500/30 text-blue-300',
    iconColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    icon: Lock,
    metric: '256-bit Encrypted'
  },
  {
    name: 'Custom REST Webhooks',
    desc: 'Sub-10ms API Triggers',
    category: 'CUSTOM API',
    gradient: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30 text-emerald-400',
    iconColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: Globe,
    metric: '0ms Latency'
  },
  {
    name: 'Real-time Analytics Graph',
    desc: 'Weekly Performance Summaries',
    category: 'ANALYTICS',
    gradient: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
    iconColor: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    icon: BarChart3,
    metric: 'Auto Generated'
  }
];

export default function MovingShowcaseCatalog() {
  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl text-white my-6">
      {/* Ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-[10px] font-bold uppercase tracking-wider text-brand-purple w-fit">
              <Cpu className="w-3.5 h-3.5 text-brand-purple animate-spin" style={{ animationDuration: '8s' }} />
              Live Horizontal Automation Stream
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white">
              End-to-End Automated Integrations Pipeline
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>24/7 Active Execution Loops</span>
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
                duration: 25,
                ease: 'linear',
              },
            }}
          >
            {[...catalogRow1, ...catalogRow1].map((card, idx) => {
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
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Auto Active
                    </span>
                    <span className="text-brand-blue font-mono font-bold">DotnLott Suite</span>
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
                duration: 28,
                ease: 'linear',
              },
            }}
          >
            {[...catalogRow2, ...catalogRow2].map((card, idx) => {
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
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Auto Active
                    </span>
                    <span className="text-brand-purple font-mono font-bold">DotnLott Suite</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* Bottom Bar Supported Stack */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            Integrates seamlessly with:
          </span>
          <div className="flex flex-wrap gap-2">
            {['CRM Systems', 'Instant Messaging', 'Payment Gateways', 'Cloud Workspace', 'Database Clusters', 'Enterprise APIs', 'Workflow Engine'].map((tool) => (
              <span key={tool} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
