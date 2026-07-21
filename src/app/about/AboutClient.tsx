'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  MapPin,
  Building2,
  Brain,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Globe,
  Code2,
  Sparkles,
  Award,
  Check,
  Radio,
  Boxes,
  Lock,
  Rocket,
  Server,
  Layers,
  PhoneCall,
  Mail,
  Copy,
  CopyCheck,
  Target,
  HeartHandshake
} from 'lucide-react';

import { faqsList } from './faqs';
import InteractiveParticles from '@/components/ui/InteractiveParticles';
import InteractiveAboutSpecialtiesShowcase from '@/components/ui/InteractiveAboutSpecialtiesShowcase';

export default function AboutClient() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [trustTab, setTrustTab] = useState<'trust' | 'vision' | 'guarantee'>('trust');
  const [copiedCin, setCopiedCin] = useState<boolean>(false);

  const handleCopyCin = () => {
    navigator.clipboard.writeText('U47721BR2026PTC085973');
    setCopiedCin(true);
    setTimeout(() => setCopiedCin(false), 2000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] pt-4 sm:pt-8 pb-0 z-10 font-sans">
      {/* Canvas particle background */}
      <InteractiveParticles density={45} particleColor="mixed" />

      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-purple/10 top-10 left-1/4 animate-mesh-spin" style={{ animationDuration: '35s' }} />
      <div className="mesh-bg bg-brand-blue/10 bottom-20 right-1/4 animate-mesh-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 relative z-10">

        {/* ==========================================
            1. HERO SECTION: Sleek SaaS Header
           ========================================== */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-6 pt-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-xs font-bold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            DotnLott • Engineering & AI Systems
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            We Build the Digital Backbone for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue">Modern Growing Businesses</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
            From single-trigger micro-automations (<strong className="text-brand-purple font-semibold">Dot</strong> starting @ ₹499 / $6) to enterprise-grade AI platforms & custom web systems (<strong className="text-brand-blue font-semibold">Lott</strong>), we eliminate manual friction and build software that drives real revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/ai-automation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore AI Automation
              <ArrowRight className="w-4 h-4 text-brand-blue" />
            </Link>

            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 border border-slate-250 hover:bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Book Strategy Session
            </Link>
          </div>

          {/* Live Metric Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto w-full">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-sm flex flex-col items-center justify-center text-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">100%</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">MCA Govt Registered</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-sm flex flex-col items-center justify-center text-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-brand-purple font-mono">&lt; 1.0s</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Next.js Page Speed</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-sm flex flex-col items-center justify-center text-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">₹499+</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Transparent Entry Tier</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-sm flex flex-col items-center justify-center text-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-brand-blue font-mono">24/7</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Autopilot Workflows</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. SAAS-STYLE "WHY TRUST US & OUR VISION" SECTION
           ========================================== */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col gap-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 animate-pulse" />
                SaaS Blueprint & Trust Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Why Businesses Trust DotnLott
              </h2>
            </div>

            {/* Interactive SaaS Pill Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 flex-shrink-0">
              <button
                onClick={() => setTrustTab('trust')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  trustTab === 'trust'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Why Trust Us
              </button>
              <button
                onClick={() => setTrustTab('vision')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  trustTab === 'vision'
                    ? 'bg-brand-purple text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                Our Vision
              </button>
              <button
                onClick={() => setTrustTab('guarantee')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  trustTab === 'guarantee'
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                Engineering SLA
              </button>
            </div>
          </div>

          {/* Dynamic Tab Panel Display */}
          {trustTab === 'trust' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/70 via-slate-50/50 to-white border border-purple-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-brand-purple text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-brand-purple bg-purple-100/80 px-2.5 py-1 rounded-full uppercase">
                      Direct Access
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">Direct Founder Engineers</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    No non-technical middleman project managers. You work directly with our IIT Patna MCA software architects who design and write your code.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-purple-100">
                  <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-purple-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    IIT Patna MCA Leads
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-purple bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-lg">
                    0 PM Bottlenecks
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/70 via-slate-50/50 to-white border border-emerald-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full uppercase">
                      100% Security
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">100% NDA & IP Transfer</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Full non-disclosure protection and 100% client ownership of codebases, API workflows, and custom business data pipelines.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-emerald-100">
                  <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    100% Code Transfer
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                    Zero Data Sharing
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white border border-blue-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-brand-blue bg-blue-100/80 px-2.5 py-1 rounded-full uppercase">
                      Transparent
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">Flat Transparent Tiering</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Clear upfront pricing starting @ ₹499 ($6) with zero surprise invoices, recurring lock-in fees, or hidden agency retainers.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-blue-100">
                  <span className="text-[10px] font-extrabold text-emerald-600 font-mono bg-white border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    Starts @ ₹499 ($6)
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-blue bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                    0 Hidden Retainers
                  </span>
                </div>
              </div>
            </div>
          )}

          {trustTab === 'vision' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/70 via-slate-50/50 to-white border border-purple-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-brand-purple text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-brand-purple bg-purple-100/80 px-2.5 py-1 rounded-full uppercase">
                      Mission 01
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">Democratizing Enterprise AI</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    High-level AI automation shouldn&apos;t be restricted to massive corporations with 5-figure monthly tech budgets. We bring enterprise AI to growing SMBs.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-purple-100">
                  <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-purple-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    For SMBs & Startups
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-purple bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-lg">
                    10x Faster ROI
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/70 via-slate-50/50 to-white border border-emerald-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Brain className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full uppercase">
                      Mission 02
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">Zero Manual Friction</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Eliminating repetitive data entry, lost WhatsApp leads, and slow manual follow-ups so your team can focus 100% on revenue generation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-emerald-100">
                  <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    24/7 Autopilot
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                    Auto Lead Sync
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white border border-blue-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-brand-blue bg-blue-100/80 px-2.5 py-1 rounded-full uppercase">
                      Mission 03
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">Global Digital Infrastructure</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Building scalable, sub-second web software systems for ambitious startups, SMBs, and modern brands across global markets.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-blue-100">
                  <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-blue-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    Odisha, India HQ
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-blue bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                    Global Delivery
                  </span>
                </div>
              </div>
            </div>
          )}

          {trustTab === 'guarantee' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white border border-blue-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Server className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-brand-blue bg-blue-100/80 px-2.5 py-1 rounded-full uppercase">
                      Speed SLA
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">&lt;1.0s Next.js Page Speed</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Optimized Next.js 16 App Router code built for sub-second loading speeds, zero bloatware, and 100% Google Lighthouse perfection.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-blue-100">
                  <span className="text-[10px] font-extrabold font-mono text-emerald-600 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    &lt; 1.0s Load Speed
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-blue bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                    Next.js 16 App Router
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/70 via-slate-50/50 to-white border border-purple-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-brand-purple text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-brand-purple bg-purple-100/80 px-2.5 py-1 rounded-full uppercase">
                      API SLA
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">Robust API Integrations</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Secure webhook endpoints, automated error retries, and bi-directional CRM data pipelines engineered for high throughput.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-purple-100">
                  <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-purple-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    99.9% API Reliability
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-purple bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-lg">
                    Self-Healing Workflows
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/70 via-slate-50/50 to-white border border-emerald-200/80 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full uppercase">
                      24/7 Autopilot
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-display">24/7 Automated Autopilot</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Workflows that run continuously in the background, dispatching real-time WhatsApp & email alerts without requiring human intervention.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-emerald-100">
                  <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-emerald-200 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    0 Manual Typos
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                    Instant Alerts
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            3. THE BRAND PHILOSOPHY: Dot vs Lott
           ========================================== */}
        <div className="flex flex-col gap-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display bg-brand-purple/10 px-3.5 py-1 rounded-full w-fit mx-auto">
              Our Scalable Model
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Are We Called <span className="text-brand-purple font-black">Dot</span>n<span className="text-brand-blue font-black">Lott</span>?
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              We believe digital growth shouldn&apos;t require massive upfront risk. You start with a small, high-impact quick win (<strong className="text-slate-900 font-bold">Dot</strong>) and expand into an integrated enterprise system (<strong className="text-slate-900 font-bold">Lott</strong>).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card A: The Dot */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-purple to-pink-500" />
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono font-extrabold text-brand-purple uppercase">
                    Tier 01 • Micro-Automation
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">₹499+ ($6+)</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-purple animate-ping" />
                  The &quot;Dot&quot; Scale
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  Single-purpose quick wins designed to solve an immediate operational headache within 24 to 72 hours.
                </p>

                <ul className="text-xs text-slate-700 flex flex-col gap-2.5 pt-2">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0" />
                    <span>Instant WhatsApp alert when website leads fill forms</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0" />
                    <span>Google Forms auto-sync to Excel/Sheets</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0" />
                    <span>Automated transactional email confirmation triggers</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-purple">
                <span>Fast 1-3 Day Turnaround</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card B: The Lott */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue to-cyan-500" />
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-extrabold text-brand-blue uppercase">
                    Tier 02 • Enterprise Systems
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">Custom Scope</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-brand-blue" />
                  The &quot;Lott&quot; Scale
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  End-to-end custom web applications, multi-agent AI ecosystems, and deep multi-system CRM pipelines built to scale.
                </p>

                <ul className="text-xs text-slate-700 flex flex-col gap-2.5 pt-2">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span>Sub-second Next.js Web Application with Admin Dashboard</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span>Multi-Agent Autonomous AI Ecosystems (n8n + Vector DBs)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span>Bi-directional Zoho, HubSpot & SQL CRM Pipelines</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-blue">
                <span>Enterprise SLA & Architecture</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            4. FOUNDERS SHOWCASE (1 Row Side-by-Side Premium Cards)
           ========================================== */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display bg-brand-purple/10 px-4 py-1 rounded-full w-fit mx-auto border border-brand-purple/20">
              Direct Engineering Leadership
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Meet the Founders
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Engineered and led by hands-on AI workflow architects and software engineers directly accountable for your business builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
            {/* Founder 1: Sonalika Samal */}
            <div className="bg-gradient-to-b from-white via-slate-50/60 to-white border border-slate-250/80 rounded-3xl p-7 flex flex-col items-center text-center gap-5 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative group h-full">
              
              <div className="relative pt-2">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[3px] border-emerald-500 overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/sonalika.jpg"
                    alt="Ms. Sonalika Samal - Founder & Systems Architect"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <h3 className="text-2xl font-black text-slate-900 font-display">Ms. Sonalika Samal</h3>
                <span className="text-xs font-extrabold text-brand-purple uppercase tracking-wider font-mono">Founder & Systems Architect</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Automation specialist and AI workflow architect with 3+ years of experience in AI toolings, n8n webhook engines, WhatsApp API chatbots, and business process automation.
              </p>

              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['CRM Sync', 'WhatsApp API', 'AI Agents', 'n8n Pipelines'].map((skill, i) => (
                  <span key={i} className="text-[11px] font-extrabold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-3 py-1 rounded-xl">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 mt-auto">
                <span className="flex items-center gap-1 text-slate-800">
                  <Building2 className="w-3.5 h-3.5 text-brand-purple" /> Systems & AI Lead
                </span>
                <a
                  href="https://wa.me/917846969508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                >
                  <PhoneCall className="w-3 h-3" /> Connect Direct
                </a>
              </div>
            </div>

            {/* Founder 2: Abhishek Abhinav */}
            <div className="bg-gradient-to-b from-white via-slate-50/60 to-white border border-slate-250/80 rounded-3xl p-7 flex flex-col items-center text-center gap-5 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative group h-full">
              
              <div className="relative pt-2">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[3px] border-emerald-500 overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/abhishek.jpg"
                    alt="Mr. Abhishek Abhinav - Founder & Software Engineer"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <h3 className="text-2xl font-black text-slate-900 font-display">Mr. Abhishek Abhinav</h3>
                <span className="text-xs font-extrabold text-brand-blue uppercase tracking-wider font-mono">Founder & Software Engineer</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Full-stack software engineer specializing in modern Next.js 16 web applications, sub-second web performance, scalable REST APIs, cloud deployments, and system security.
              </p>

              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Next.js / React', 'Node.js APIs', 'VPS / Cloud', 'System Infra'].map((skill, i) => (
                  <span key={i} className="text-[11px] font-extrabold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-xl">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 mt-auto">
                <span className="flex items-center gap-1 text-slate-800">
                  <Code2 className="w-3.5 h-3.5 text-brand-blue" /> Web & Cloud Lead
                </span>
                <a
                  href="https://wa.me/918544121551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                >
                  <PhoneCall className="w-3 h-3" /> Connect Direct
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            5. CORPORATE MCA CREDENTIALS (Sleek Dark Theme)
           ========================================== */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col gap-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 pb-6 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Legal Entity • Ministry of Corporate Affairs
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">A2Z Version Private Limited</h2>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              100% Tax Compliant & Verified
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs relative z-10">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Brand Entity</span>
              <span className="font-extrabold text-white font-display text-base text-brand-purple">DotnLott</span>
              <span className="text-[11px] text-slate-400 font-light">AI Automation & Web Engineering</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Corporate CIN</span>
                <button
                  onClick={handleCopyCin}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-blue hover:text-cyan-400 transition-colors"
                >
                  {copiedCin ? <CopyCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedCin ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <span className="font-mono font-bold text-white text-xs tracking-wider">U47721BR2026PTC085973</span>
              <span className="text-[11px] text-slate-400 font-light">Government of India Registered</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Operational Base</span>
              <span className="font-bold text-white flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4 text-brand-purple" /> Odisha, India
              </span>
              <span className="text-[11px] text-slate-400 font-light">Serving Global & Domestic Clients</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Client Guarantees</span>
              <span className="font-extrabold text-emerald-400 font-display text-sm">100% NDA & IP Transfer</span>
              <span className="text-[11px] text-slate-400 font-light">Full ownership of code & workflows</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            5.5 INTERACTIVE SPECIALTIES & MOVING ENGINE SHOWCASE
           ========================================== */}
        <InteractiveAboutSpecialtiesShowcase />

        {/* ==========================================
            6. FREQUENTLY ASKED QUESTIONS
           ========================================== */}
        <div className="pt-4 flex flex-col gap-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display bg-brand-purple/10 px-3.5 py-1 rounded-full w-fit mx-auto">
              Clear Answers
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3.5">
            {faqsList.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-250/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-md"
                >
                  <h3 className="m-0 p-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/60 transition-colors border-0"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs font-extrabold text-slate-900 leading-snug flex items-center gap-3">
                        <span className="text-[10px] font-mono text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded">
                          FAQ 0{idx + 1}
                        </span>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-brand-purple' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    className="transition-all duration-350 overflow-hidden"
                    style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="px-6 pb-5 pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ==========================================
          7. FINAL CTA BANNER (Full Bleed Edge-To-Edge, Zero Side Spacing, Zero Bottom Gap)
         ========================================== */}
      <div className="w-full bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center text-center gap-6 border-t border-slate-800 mt-16 sm:mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-3 max-w-2xl relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 bg-white/10 px-3.5 py-1 rounded-full w-fit mx-auto border border-white/15 font-mono">
            Get Started Today
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
            Ready to Automate Your Operations?
          </h2>
          <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed">
            Book a direct 1-on-1 strategy call with our founders to discuss your business workflows.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative z-10 pt-2">
          <Link
            href="/booking"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-2xl hover:bg-slate-100 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4 text-brand-purple" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Contact Engineering Team
          </Link>
        </div>
      </div>
    </div>
  );
}
