'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  Mic,
  Database,
  Cpu,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const solutions = [
  {
    icon: MessageSquare,
    title: 'Custom AI Chatbots',
    description: 'Embed conversational, context-aware LLM support and sales chatbots on your site, trained on your custom PDFs, help documents, and database links.',
    features: [
      'Trained on custom corporate documents',
      'Human handoff triggers logic',
      'Supports file attachment reading',
      'Multi-language capabilities',
      'Embeddable web chat widgets'
    ],
    color: 'border-blue-200 hover:border-brand-blue/40'
  },
  {
    icon: Mic,
    title: 'Voice AI Agents',
    description: 'Automated conversational voice assistants for booking calls, filtering outbound sales responses, and answering support FAQs.',
    features: [
      'Low latency responses (<800ms)',
      'Natural conversational speech synthesis',
      'Auto-scheduling calendar integrations',
      'Direct CRM phone record logs',
      'Call recording transcript compilations'
    ],
    color: 'border-purple-200 hover:border-brand-purple/40'
  },
  {
    icon: Database,
    title: 'Enterprise Knowledge Base AI',
    description: 'Semantic vector databases indexing your company documents, sheets, and chats, allowing instant AI answers for team support.',
    features: [
      'Semantic keyword search maps',
      'Connected to internal Slack & WhatsApp channels',
      'Sub-second query responses',
      'Auto-synced from Google Drive/Notion',
      'Strict corporate data access controls'
    ],
    color: 'border-rose-200 hover:border-rose-500/40'
  },
  {
    icon: Cpu,
    title: 'GPT / LLM API Integrations',
    description: 'Embed OpenAI, Anthropic Claude, and Gemini API logic directly into your custom software databases, pipelines, and web applications.',
    features: [
      'Custom LLM API route configurations',
      'Optimized token usages caching',
      'JSON output formats enforcement',
      'Multi-model fallbacks configurations',
      'Structured batch query runs'
    ],
    color: 'border-emerald-200 hover:border-emerald-500/40'
  },
  {
    icon: Brain,
    title: 'Autonomous Business AI Agents',
    description: 'Background AI executives that monitor folders, analyze sheets, write drafts, clean emails, and execute complex workflows without humans.',
    features: [
      'Multi-step logic reasoning runs',
      'Automatic spreadsheet updates mapping',
      'Drafts customer outreach emails',
      'Screenshots analysis & support tickets creation',
      'Continuous daily task schedules'
    ],
    color: 'border-amber-200 hover:border-amber-500/40'
  },
  {
    icon: Zap,
    title: 'Custom AI Solutions',
    description: 'Bespoke AI system planning. We configure, fine-tune, set up vector maps, and construct bespoke LLM prompts customized to your workspace.',
    features: [
      'Prompt engineering optimizations',
      'Custom models fine-tuning guidance',
      'Database vector search mappings',
      'SLA security audits compliance',
      'Onboarding training documentation'
    ],
    color: 'border-indigo-200 hover:border-indigo-500/40'
  }
];

export default function AIIntegrationClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Background mesh layers */}
      <div className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '35s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 left-10 animate-mesh-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
            <Brain className="w-4 h-4 text-brand-purple animate-pulse" />
            Artificial Intelligence
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Custom AI Integration Services
          </h1>
          <p className="text-sm text-slate-650 font-light leading-relaxed">
            Deploy proprietary conversational agents, LLM vector search databases, and automated background AI business executives customized to your company documents.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {solutions.map((sol) => {
            const IconComponent = sol.icon;
            return (
              <div
                key={sol.title}
                className={`bg-white border rounded-3xl p-8 flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm hover:shadow-md group ${sol.color}`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-slate-550 leading-relaxed font-light">
                      {sol.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 mt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Features Included:</span>
                    <ul className="flex flex-col gap-2">
                      {sol.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-650 font-light">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-2">
                  <Link
                    href="/booking"
                    className="text-xs font-bold text-slate-450 hover:text-brand-blue transition-colors flex items-center gap-1"
                  >
                    Consult Setup <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom LLM fine-tuning Callout */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/15 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/10 border border-white/10 text-[9px] uppercase tracking-wider font-bold text-brand-blue leading-none w-fit">
                Vector Database Setup
              </span>
              <h3 className="text-xl md:text-2xl font-bold">Need a Custom Semantic Search Knowledge base?</h3>
              <p className="text-xs text-slate-350 leading-relaxed font-light">
                We configure, clean, chunk, and embed your custom corporate spreadsheets, guides, and document archives into high-speed vector models connected directly to your internal team communications channels.
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-colors rounded-xl flex-shrink-0 shadow-lg"
            >
              Discuss AI Roadmap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
