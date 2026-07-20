'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Building2,
  Brain,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Bot,
  MessageSquare,
  FileSpreadsheet,
  Globe,
  Database,
  Layers,
  Layout,
  Code2,
  Sparkles,
  Lock,
  Clock,
  HeartHandshake,
  ExternalLink,
  Award,
  Check
} from 'lucide-react';

import { faqsList } from './faqs';
import InteractiveParticles from '@/components/ui/InteractiveParticles';

const servicesList = [
  { name: 'AI Workflow Automation', icon: Zap, href: '/ai-automation', desc: 'Auto-run tasks & system sync across your business tech stack', tag: '24/7 Autopilot' },
  { name: 'AI Agents', icon: Bot, href: '/ai-automation', desc: 'Autonomous AI task runners tailored to execute complex workflows', tag: 'Autonomous' },
  { name: 'Business Process Automation', icon: Cpu, href: '/ai-automation', desc: 'End-to-end operational efficiency eliminating manual friction', tag: 'Operations' },
  { name: 'CRM Automation', icon: Database, href: '/ai-automation#suite-crm', desc: 'Sync leads, deals & sales pipelines across Zoho, HubSpot & SQL', tag: 'Lead Sync' },
  { name: 'Chatbot Development', icon: MessageSquare, href: '/ai-automation#suite-voice-agent', desc: '24/7 intelligent customer support & lead capture bots', tag: 'Conversational' },
  { name: 'Google Workspace Automation', icon: FileSpreadsheet, href: '/ai-automation', desc: 'Sheets, Docs, Forms & Gmail automated data triggers', tag: 'Workspace' },
  { name: 'Microsoft 365 Automation', icon: Layers, href: '/ai-automation', desc: 'Excel, Outlook & Teams seamless operational integration', tag: 'Enterprise' },
  { name: 'WhatsApp Automation', icon: Phone, href: '/ai-automation', desc: 'Instant messaging, automated broadcasts & customer alerts', tag: 'High Conversion' },
  { name: 'Email Automation', icon: Mail, href: '/ai-automation#suite-email', desc: 'Outbound outreach, prospecting & smart drip sequences', tag: 'Outreach' },
  { name: 'Lead Management Systems', icon: TrendingUp, href: '/ai-automation', desc: 'Instant form routing, lead scoring & CRM distribution', tag: 'Growth' },
  { name: 'Custom Business Tools', icon: Layout, href: '/website-development', desc: 'Tailored internal admin portals & visual management tools', tag: 'Custom GUI' },
  { name: 'API Integrations', icon: Code2, href: '/ai-automation', desc: 'Secure REST, GraphQL, Webhooks & legacy database sync', tag: 'Full Stack' },
  { name: 'Dashboard Development', icon: Globe, href: '/website-development', desc: 'Real-time performance analytics & business intelligence views', tag: 'Analytics' },
  { name: 'Web Applications', icon: Globe, href: '/website-development', desc: 'High-speed custom web apps built with Next.js & React', tag: 'High Speed' },
  { name: 'Custom AI Solutions', icon: Brain, href: '/ai-automation', desc: 'Proprietary AI model setups, fine-tuning & private vector DBs', tag: 'Custom LLMs' },
];

const whyChooseUsCards = [
  {
    num: '01',
    title: 'Affordable Pricing',
    description: 'Enterprise-quality automation without enterprise pricing. Standard setups start at just ₹499 ($6).',
    icon: Sparkles,
    gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    border: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  },
  {
    num: '02',
    title: 'Custom Built',
    description: 'Every workflow is engineered specifically for your software stack and exact operational rules.',
    icon: Cpu,
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    border: 'border-purple-500/30',
    iconBg: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  },
  {
    num: '03',
    title: 'Faster Deployment',
    description: 'Pre-built modules allow us to deliver fully configured automation suites in 3 to 7 business days.',
    icon: Clock,
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    border: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
  },
  {
    num: '04',
    title: 'Scalable Architecture',
    description: 'Start small with a single workflow and expand effortlessly as your transaction volume grows.',
    icon: TrendingUp,
    gradient: 'from-sky-500/10 via-blue-500/5 to-transparent',
    border: 'border-sky-500/30',
    iconBg: 'bg-sky-500/10 text-sky-600 border-sky-500/30',
  },
  {
    num: '05',
    title: 'Human Technical Support',
    description: 'Real engineers and system architects supporting you directly through every phase of growth.',
    icon: HeartHandshake,
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    border: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  },
  {
    num: '06',
    title: 'Future Ready',
    description: 'Built using modern AI models, robust REST APIs, and enterprise-grade cloud platforms.',
    icon: Zap,
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    border: 'border-indigo-500/30',
    iconBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
  },
];

const partnerReasons = [
  'Custom-built solutions, not rigid one-size-fits-all products',
  'Transparent, budget-friendly pricing starting from ₹499 ($6)',
  'Ongoing dedicated technical support & maintenance after deployment',
  'Continuous research into cutting-edge AI models & API integrations',
  'Security-focused approach with formal Non-Disclosure Agreements (NDAs)',
  'Modular architecture designed to scale seamlessly as your business grows',
];

export default function AboutClient() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Canvas particle background */}
      <InteractiveParticles density={45} particleColor="mixed" />

      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-blue/10 top-10 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/10 bottom-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section 1: Hero Section */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-6 pt-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-xs font-bold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <Users className="w-4 h-4 text-brand-blue" />
            AI Automation & Workflow Solutions
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Building Smarter Businesses Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-indigo-600">AI Automation</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-650 font-light leading-relaxed max-w-3xl mx-auto">
            DotnLott is an AI Automation & Workflow Solutions brand operated under <a href="https://www.mca.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 underline hover:text-brand-blue transition-colors">A2Z Version Private Limited</a>, helping businesses automate repetitive work, streamline operations, reduce manual effort, and scale faster with affordable AI-powered solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/ai-automation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4 text-brand-blue" />
            </Link>

            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 border border-slate-250 hover:bg-slate-50 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>

        {/* Section 2 & 3: Who We Are & Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Who We Are */}
          <div className="relative bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-cyan-400 to-brand-purple" />
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue font-display flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  Who We Are
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-full">
                  Custom Systems
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 font-display leading-snug">
                We Build Automation That Actually Works
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                DotnLott is a technology-driven AI automation company making advanced automation accessible to businesses of every size.
              </p>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Instead of generic software, we design <strong className="text-slate-900 font-semibold">customized automation systems</strong> tailored to each business — whether it&apos;s called AI automation, business automation, workflow automation, AI agents, chatbots, CRM automation, or process automation.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-brand-blue/5 to-cyan-500/5 border border-brand-blue/20 rounded-2xl flex items-start gap-3.5 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue font-display">Our Core Mission</span>
                <span className="text-xs font-semibold text-slate-900 leading-snug">
                  Help businesses spend less time on repetitive work and more time growing.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Our Story */}
          <div className="relative bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:shadow-brand-purple/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-purple via-pink-400 to-indigo-500" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-purple" />
                  Our Story
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> MCA Registered
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 font-display leading-snug">
                Where It All Started
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                DotnLott operates as the AI automation brand of <strong className="text-slate-900 font-semibold">A2Z Version Private Limited</strong>.
              </p>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                The journey began through continuous learning, experimentation, and hands-on work building automation, workflows, AI tools, integrations, websites, and business systems. Along the way, one gap in the market became clear — businesses wanted automation, but existing solutions were either too expensive, too complicated, or not built for small and growing businesses.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-brand-purple/5 to-pink-500/5 border border-brand-purple/20 rounded-2xl flex items-start gap-3.5 shadow-2xs relative z-10">
              <div className="w-9 h-9 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                <CheckCircle2 className="w-5 h-5 text-brand-purple" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-purple font-display">Closing the Market Gap</span>
                <span className="text-xs font-semibold text-slate-900 leading-snug">
                  Enterprise-level automation at prices businesses can actually afford.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Section: Meet Floto — Our AI Co-Pilot Mascot */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col lg:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Mascot Image Visual */}
          <div className="w-full lg:w-5/12 flex flex-col items-center justify-center relative z-10">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <div className="relative w-full h-full bg-white/95 border border-slate-200/80 rounded-3xl p-6 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src="/mascot-v4.png"
                  alt="Floto - DotnLott AI Co-Pilot Mascot"
                  width={260}
                  height={260}
                  className="object-contain animate-float"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-widest">Floto • AI Co-Pilot Mascot</span>
            </div>
          </div>

          {/* Right: Mascot Story & Role */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6 relative z-10 text-center lg:text-left">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-brand-blue justify-center lg:justify-start w-fit mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
                Meet Our Official Mascot
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
                Say Hello to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-400 to-brand-purple">Floto</span>!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Floto is DotnLott&apos;s intelligent AI co-pilot who embodies our core ethos: making complex technology simple, friendly, and operating 24/7 on autopilot.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Whether monitoring API triggers, organizing CRM data, or guiding clients through automated workflows, Floto is always by your side to keep operations running effortlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1.5 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <span className="text-xs font-bold text-white font-display">Always Awake</span>
                <span className="text-[11px] text-slate-400 font-light leading-snug">Monitors triggers, APIs & databases 24/7.</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1.5 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <span className="text-xs font-bold text-white font-display">Zero Friction</span>
                <span className="text-[11px] text-slate-400 font-light leading-snug">Simplifies manual work into 1-click flows.</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1.5 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <span className="text-xs font-bold text-white font-display">Smart Partner</span>
                <span className="text-[11px] text-slate-400 font-light leading-snug">Built to help your team scale without stress.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 & 7: Why We Exist & Our Biggest Advantage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Why We Exist (5 cols) */}
          <div className="md:col-span-5 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 w-56 h-56 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-blue/30 transition-colors" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-purple/30 transition-colors" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-brand-blue flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 text-brand-blue animate-pulse" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue font-display">Why We Exist</span>
              <h2 className="text-2xl font-extrabold font-display leading-tight text-white">
                Eliminating Unnecessary Workload
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Businesses lose hundreds of hours every year to repetitive tasks — copying data, sending follow-ups, managing spreadsheets, replying manually, and updating CRMs.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Our goal is to eliminate that unnecessary workload through intelligent automation, so businesses can focus on what actually matters: <strong className="text-white font-bold">growth.</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 pt-4 relative z-10 text-xs text-slate-300 font-light">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>24/7 Autopilot operations with zero manual data entry errors.</span>
            </div>
          </div>

          {/* Our Biggest Advantage (7 cols) */}
          <div className="md:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-purple/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brand-purple" />
                  Our Biggest Advantage
                </span>
                <span className="text-xs font-extrabold text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Startup Friendly
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Enterprise Automation. Startup Pricing.
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                The automation market today sits at two extremes: agencies charging steep five- and six-figure fees for a single workflow, or freelancers delivering incomplete, low-quality work.
              </p>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                DotnLott is built differently — professional, high-quality automation at pricing that startups, SMEs, and growing companies can comfortably afford.
              </p>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 shadow-md">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-xs font-bold text-white">Automation should help businesses grow,</span>
                <span className="text-xs text-slate-300 font-light">not become another financial burden.</span>
              </div>
              <Link
                href="/booking"
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-purple hover:bg-purple-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex-shrink-0 text-center shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>

        </div>

        {/* Section 5: What We Do (15 Service Cards Grid) */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue font-display bg-brand-blue/10 px-3 py-1 rounded-full w-fit mx-auto">
              What We Do
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Automation Without Limits
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Explore our comprehensive range of 15 specialized AI and business automation services designed to eliminate manual tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesList.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <Link
                  key={idx}
                  href={service.href}
                  className="bg-white border border-slate-200/90 hover:border-brand-purple/50 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-xl hover:shadow-brand-purple/5 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between gap-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 group-hover:bg-brand-purple/5 rounded-bl-full transition-colors pointer-events-none" />

                  <div className="flex flex-col gap-2.5 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center group-hover:scale-105 group-hover:bg-brand-purple group-hover:text-white group-hover:border-brand-purple transition-all duration-300 shadow-2xs">
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[8.5px] font-extrabold text-slate-500 group-hover:text-brand-purple uppercase tracking-wider bg-slate-100 group-hover:bg-brand-purple/10 px-2 py-0.5 rounded-full transition-colors">
                        {service.tag}
                      </span>
                    </div>

                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-brand-purple transition-colors font-display flex items-center justify-between">
                        {service.name}
                        <ArrowRight className="w-3.5 h-3.5 text-brand-purple opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-[11px] text-slate-500 font-light leading-snug line-clamp-2">{service.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-brand-purple pt-1.5 border-t border-slate-100/80">
                    <span>Explore Suite</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 6: Why Businesses Choose DotnLott (6 Core Pillars) */}
        <div className="flex flex-col gap-8 pt-6">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display bg-brand-purple/10 px-3 py-1 rounded-full w-fit mx-auto">
              Core Pillars
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Businesses Choose DotnLott
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              We combine enterprise-grade system engineering with transparent pricing and ongoing human support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white border ${card.border} rounded-3xl p-7 flex flex-col justify-between gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${card.gradient} pointer-events-none`} />

                  <div className="flex items-center justify-between relative z-10">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold ${card.iconBg} group-hover:scale-110 transition-transform shadow-2xs`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-slate-300 transition-colors font-mono">
                      {card.num}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10">
                    <h3 className="text-lg font-extrabold text-slate-900 font-display">{card.title}</h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">{card.description}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pt-3 border-t border-slate-100 relative z-10">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified Guarantee</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 8 & 9: Pricing Philosophy & Corporate Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Pricing Philosophy (6 cols) */}
          <div className="md:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue font-display">
                  Pricing Philosophy
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider">
                  Starts @ ₹499 ($6)
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Built to Help Businesses Grow
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Our pricing follows one principle: <strong className="text-slate-900 font-semibold">if automation saves your business time and money, it should never cost more than the value it creates.</strong>
              </p>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Plans start from <span className="font-bold text-slate-900">₹499 ($6)</span>, so businesses can experience automation before scaling further. As needs grow, businesses move to higher plans based on workflow complexity.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3.5 shadow-2xs relative z-10">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900 font-display">Affordable. Transparent. Scalable.</span>
                <span className="text-[11px] text-slate-600 font-light">Zero hidden costs or locked commitments.</span>
              </div>
            </div>
          </div>

          {/* Company Information (6 cols) */}
          <div className="md:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display">
                  Company Information
                </span>
                <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Verified MCA Entity
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Corporate Infrastructure
              </h2>
              
              <ul className="text-xs text-slate-650 flex flex-col gap-3.5 font-light pt-1">
                <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Brand</span>
                  <span className="font-extrabold text-slate-900 font-display">DotnLott</span>
                </li>
                <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Parent Company</span>
                  <a href="https://www.mca.gov.in/" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-blue underline hover:text-brand-purple transition-colors flex items-center gap-1">
                    A2Z Version Private Limited
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">CIN</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">U47721BR2026PTC085973</span>
                </li>
                <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Head Office</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" /> Bihar, India
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Operations</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-purple" /> Odisha, India
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Industry</span>
                  <span className="font-bold text-slate-900">AI Automation & Workflow Solutions</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Section 10: Mission, Vision & Values */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col gap-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue bg-white/10 px-3 py-1 rounded-full w-fit mx-auto">
              Our Purpose & Drive
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
              Mission, Vision & Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-3 backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold">
                <Target className="w-5 h-5 text-brand-blue" />
              </div>
              <span className="text-xs font-extrabold text-brand-blue uppercase tracking-wider font-display">Mission</span>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Making AI automation affordable, practical, and accessible for every business.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-3 backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold">
                <Globe className="w-5 h-5 text-brand-purple" />
              </div>
              <span className="text-xs font-extrabold text-brand-purple uppercase tracking-wider font-display">Vision</span>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                To become India&apos;s most trusted automation company for startups, SMEs, and growing businesses.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 relative z-10">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">Core Operating Values</span>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {['Innovation', 'Simplicity', 'Transparency', 'Reliability', 'Customer Success', 'Continuous Improvement'].map((val, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/10 border border-white/15 hover:border-brand-purple/50 rounded-xl text-xs font-bold text-white uppercase tracking-wider transition-all hover:scale-105"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 11: Meet the Founders */}
        <div className="flex flex-col gap-8 pt-6">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display bg-brand-purple/10 px-3 py-1 rounded-full w-fit mx-auto">
              Leadership
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Meet the Founders
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Engineered and led by hands-on AI workflow architects and software engineers.
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
            {/* Founder 1: Ms. Sonalika Samal (Photo Left, Text Right) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-purple to-pink-500" />

              {/* Photo on Left */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-brand-purple/40 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/sonalika.jpg"
                  alt="Ms. Sonalika Samal - Founder & Systems Architect"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>

              {/* Text on Right */}
              <div className="flex flex-col gap-3 flex-grow text-center md:text-left">
                <div className="flex flex-col md:items-start items-center gap-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">Ms. Sonalika Samal</h3>
                  <span className="text-xs sm:text-sm font-bold text-brand-purple">Founder & Systems Architect</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md w-fit mt-0.5">
                    Pursuing MCA @ IIT Patna
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Automation specialist and AI workflow architect with 3+ years of hands-on experience in automation, AI tools, workflow design, and business process optimization. Pursuing MCA at IIT Patna while continuing to research and build AI-powered business solutions.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                  {['CRM Sync', 'WhatsApp API', 'AI Agents', 'n8n / Zapier', 'Workflow Design'].map((skill, i) => (
                    <span key={i} className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 font-light flex items-center justify-center md:justify-start gap-2">
                  <Building2 className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" />
                  <span>Specializing in CRM Sync, WhatsApp API & Custom AI Workflows</span>
                </div>
              </div>
            </div>

            {/* Founder 2: Mr. Abhishek Abhinav (Photo Right, Text Left) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col md:flex-row-reverse items-center gap-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue to-cyan-500" />

              {/* Photo on Right */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-brand-blue/40 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/abhishek.jpg"
                  alt="Mr. Abhishek Abhinav - Founder & Software Engineer"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>

              {/* Text on Left */}
              <div className="flex flex-col gap-3 flex-grow text-center md:text-left">
                <div className="flex flex-col md:items-start items-center gap-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">Mr. Abhishek Abhinav</h3>
                  <span className="text-xs sm:text-sm font-bold text-brand-blue">Founder & Software Engineer</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md w-fit mt-0.5">
                    Pursuing MCA @ IIT Patna
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Automation specialist and AI workflow architect with 3+ years of hands-on experience in automation, AI tools, workflow design, and business process optimization. Pursuing MCA at IIT Patna while continuing to research and build AI-powered business solutions.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                  {['Next.js / React', 'Node.js APIs', 'VPS Hosting', 'Cloud Infra', 'Database Architecture'].map((skill, i) => (
                    <span key={i} className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 font-light flex items-center justify-center md:justify-start gap-2">
                  <Code2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                  <span>Specializing in Full-Stack Web Apps, API Integrations & Server Deployments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 12: Why Partner With Us */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col gap-8 relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue font-display bg-brand-blue/10 px-3 py-1 rounded-full w-fit mx-auto">
              Value Proposition
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Why Partner With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerReasons.map((reason, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-brand-purple/40 hover:bg-white hover:shadow-md transition-all duration-300 flex items-start gap-3.5 border-l-4 border-l-brand-purple group"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 13: FAQ Accordion */}
        <div className="pt-4 flex flex-col gap-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display bg-brand-purple/10 px-3 py-1 rounded-full w-fit mx-auto">
              Help & Support
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Have questions about how we work, security agreements, or deployment details? Read our answers below.
            </p>
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

        {/* Section 14: Final Call-to-Action */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center gap-6 my-4 border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-3 max-w-2xl relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue bg-white/10 px-3 py-1 rounded-full w-fit mx-auto">
              Get Started Today
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Stop wasting time on repetitive work. Let&apos;s build automation that saves time, reduces costs, and helps your business grow faster.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative z-10 pt-2">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-2xl hover:bg-slate-100 transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4 text-brand-purple" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Let&apos;s Build Together
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function Target(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
