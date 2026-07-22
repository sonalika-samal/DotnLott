'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Share2, 
  Target, 
  MessageSquare, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

import Link from 'next/link';

const nodes = [
  {
    id: 'email-marketing',
    suiteId: 'suite-email',
    title: 'Email Marketing',
    subtitle: 'Outreach & Drip Campaigns',
    icon: Mail,
    tag: 'Email Auto',
    bgColor: 'bg-slate-200/90 text-slate-800',
    borderColor: 'border-slate-400',
    position: 'top-0 left-0 sm:left-2',
    metric: '24/7 Autopilot',
    motionVector: { x: [0, 16, 0], y: [0, 16, 0] },
    duration: 3.2,
  },
  {
    id: 'social-media',
    suiteId: 'suite-social',
    title: 'Social Media',
    subtitle: 'Publishing & Scheduling',
    icon: Share2,
    tag: 'Social Auto',
    bgColor: 'bg-slate-200/90 text-slate-800',
    borderColor: 'border-slate-400',
    position: 'top-0 right-0 sm:right-2',
    metric: 'Auto-Publish',
    motionVector: { x: [0, -16, 0], y: [0, 16, 0] },
    duration: 3.5,
  },
  {
    id: 'meta-ads',
    suiteId: 'suite-ads',
    title: 'Meta Ads Automation',
    subtitle: 'FB & Insta Lead Sync',
    icon: Target,
    tag: 'Meta Ads',
    bgColor: 'bg-slate-200/90 text-slate-800',
    borderColor: 'border-slate-400',
    position: 'bottom-0 left-0 sm:left-2',
    metric: 'Instant Sync',
    motionVector: { x: [0, 16, 0], y: [0, -16, 0] },
    duration: 3.4,
  },
  {
    id: 'website-leads',
    suiteId: 'suite-nurture',
    title: 'Website Leads Form',
    subtitle: 'Form-to-CRM Routing',
    icon: MessageSquare,
    tag: 'Lead Forms',
    bgColor: 'bg-slate-200/90 text-slate-800',
    borderColor: 'border-slate-400',
    position: 'bottom-0 right-0 sm:right-2',
    metric: 'Sub-1s Alert',
    motionVector: { x: [0, -16, 0], y: [0, -16, 0] },
    duration: 3.7,
  }
];

export default function InteractiveAiHeroVisual() {
  const [activeNodeId, setActiveNodeId] = useState('email-marketing');

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center p-4">
      {/* Outer ambient glow rings */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-slate-300/20 via-slate-400/10 to-slate-300/20 blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />

      {/* SVG Connecting Cables / Energy Rays */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="rayGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="rayGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Diagonal Ray Lines */}
        <line x1="80" y1="80" x2="200" y2="200" stroke="url(#rayGradient1)" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
        <line x1="320" y1="80" x2="200" y2="200" stroke="url(#rayGradient1)" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
        <line x1="80" y1="320" x2="200" y2="200" stroke="url(#rayGradient2)" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
        <line x1="320" y1="320" x2="200" y2="200" stroke="url(#rayGradient2)" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
      </svg>

      {/* CENTRAL PULSING AI ENGINE CORE */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Outer Rotating Ring 1 */}
        <div className="absolute w-44 h-44 rounded-full border border-dashed border-slate-400/50 animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
        {/* Outer Rotating Ring 2 (Reverse) */}
        <div className="absolute w-52 h-52 rounded-full border border-dotted border-slate-400/40 animate-spin pointer-events-none" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

        {/* Central Core Ball */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-0.5 shadow-2xl flex items-center justify-center cursor-pointer border border-slate-700 group"
        >
          <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-800/40 opacity-50 group-hover:opacity-100 transition-opacity" />
            <Cpu className="w-8 h-8 text-slate-200 animate-pulse relative z-10" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest mt-1 relative z-10 font-display">
              AI CORE
            </span>
            <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4 OUTER INTERACTIVE NODE CARDS IN WHITE WITH THIN BLUE/PURPLE BORDER */}
      {nodes.map((node, idx) => {
        const Icon = node.icon;
        const isActive = node.id === activeNodeId;
        const isBlue = idx % 2 === 0;

        return (
          <motion.div
            key={node.id}
            onClick={() => setActiveNodeId(node.id)}
            animate={node.motionVector}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: node.duration,
              ease: 'easeInOut'
            }}
            whileHover={{ scale: 1.06 }}
            className={`absolute ${node.position} z-30 cursor-pointer w-[142px] sm:w-44`}
          >
            <Link
              href={`/ai-automation#${node.suiteId}`}
              className={`block bg-white/95 backdrop-blur-md border rounded-2xl p-3 shadow-md hover:shadow-xl transition-all duration-300 ${
                isActive
                  ? 'border-brand-purple ring-2 ring-brand-purple/30 bg-white scale-105 shadow-xl'
                  : 'border-slate-200/90 hover:border-brand-blue/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`p-1.5 rounded-xl border ${isBlue ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' : 'bg-brand-purple/10 text-brand-purple border-brand-purple/20'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-600 uppercase bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                  {node.metric}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">{node.title}</h4>
              <p className="text-[10px] text-slate-500 font-light truncate">{node.subtitle}</p>
            </Link>
          </motion.div>
        );
      })}

      {/* BOTTOM TELEMETRY STATUS BAR */}
      <motion.div
        key={activeNode.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-mono px-4 py-1.5 rounded-full border border-slate-800 shadow-xl flex items-center gap-2 whitespace-nowrap z-40"
      >
        <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Active Node: <strong className="text-purple-300">{activeNode.title}</strong></span>
        <span className="text-emerald-400 font-semibold">• {activeNode.metric}</span>
      </motion.div>
    </div>
  );
}
