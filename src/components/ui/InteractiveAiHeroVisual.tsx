'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Bot, 
  Database, 
  MessageSquare, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const nodes = [
  {
    id: 'leads',
    title: 'Inbound Webhook Engine',
    subtitle: 'Forms, Ads & Webhooks',
    icon: Zap,
    tag: 'Auto-Ingest',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-400/60',
    bgColor: 'bg-blue-50/90 text-blue-700',
    position: 'top-0 left-0 sm:left-2',
    metric: 'Payload: 0.12s'
  },
  {
    id: 'ai-brain',
    title: 'AI LLM Reasoning Core',
    subtitle: 'GPT-4o & Claude 3.5',
    icon: Bot,
    tag: 'AI Reasoning',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-400/60',
    bgColor: 'bg-purple-50/90 text-purple-700',
    position: 'top-0 right-0 sm:right-2',
    metric: 'Accuracy: 99.8%'
  },
  {
    id: 'crm-sync',
    title: 'Database & CRM Pipeline',
    tag: 'Zero Latency',
    subtitle: 'Zoho, HubSpot & SQL',
    icon: Database,
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400/60',
    bgColor: 'bg-emerald-50/90 text-emerald-700',
    position: 'bottom-0 left-0 sm:left-2',
    metric: 'Sync: Instant'
  },
  {
    id: 'outreach',
    title: 'Website Lead Routing',
    subtitle: 'Form-to-WhatsApp Alerts',
    icon: MessageSquare,
    tag: 'Auto-Reach',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-400/60',
    bgColor: 'bg-amber-50/90 text-amber-700',
    position: 'bottom-0 right-0 sm:right-2',
    metric: 'Sub-1s Alert'
  }
];

export default function InteractiveAiHeroVisual() {
  const [activeNodeId, setActiveNodeId] = useState('ai-brain');

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[1];

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center p-4">
      {/* Outer ambient glow rings */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-brand-purple/10 via-brand-blue/10 to-indigo-500/10 blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />

      {/* SVG Connecting Cables / Energy Rays */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="rayGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="rayGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
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
        <div className="absolute w-44 h-44 rounded-full border border-dashed border-brand-purple/40 animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
        {/* Outer Rotating Ring 2 (Reverse) */}
        <div className="absolute w-52 h-52 rounded-full border border-dotted border-brand-blue/30 animate-spin pointer-events-none" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

        {/* Central Core Ball */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-0.5 shadow-2xl flex items-center justify-center cursor-pointer border border-white/20 group"
        >
          <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-blue/20 opacity-50 group-hover:opacity-100 transition-opacity" />
            <Cpu className="w-8 h-8 text-brand-purple animate-pulse relative z-10" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest mt-1 relative z-10 font-display">
              AI Core
            </span>
            <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4 OUTER INTERACTIVE NODE CARDS */}
      {nodes.map((node) => {
        const Icon = node.icon;
        const isActive = node.id === activeNodeId;

        return (
          <motion.div
            key={node.id}
            onClick={() => setActiveNodeId(node.id)}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`absolute ${node.position} z-30 cursor-pointer w-40 sm:w-44`}
          >
            <div
              className={`bg-white/95 backdrop-blur-md border rounded-2xl p-3 shadow-md hover:shadow-xl transition-all duration-300 ${
                isActive
                  ? `${node.borderColor} ring-2 ring-brand-purple/30 scale-105`
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`p-1.5 rounded-xl ${node.bgColor} border border-slate-200`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                  {node.metric}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">{node.title}</h4>
              <p className="text-[10px] text-slate-500 font-light truncate">{node.subtitle}</p>
            </div>
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
