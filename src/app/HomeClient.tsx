'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  Sparkles,
  Zap,
  Database,
  ShieldCheck,
  Award,
  Globe,
  ArrowUpRight,
  Bot,
  Layout
} from 'lucide-react';

export default function HomeClient() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-blue/5 top-20 left-10 animate-mesh-spin" style={{ animationDuration: '35s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-40 right-10 animate-mesh-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-blue w-fit shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
              DotnLott AI Automation Platform
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-slate-900"
            >
              Build.<br />
              <span className="bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-purple bg-clip-text text-fill-transparent drop-shadow-sm">
                Automate. Grow.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
            >
              Transform your business operations with custom-engineered AI systems. Automatically generate leads, nurture customers, manage social media profiles, and run internal operations on autopilot.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-700 glass-card hover:glass-card-hover rounded-full transition-colors"
              >
                Explore Automation Suites
              </Link>
            </motion.div>

            {/* Promo Banner */}
            <motion.div
              variants={fadeInUp}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-blue/10 via-indigo-500/5 to-brand-purple/10 border border-brand-purple/20 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/25 flex items-center justify-center text-brand-purple flex-shrink-0">
                  <Zap className="w-5 h-5 animate-pulse text-brand-purple" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    🔥 Launch Offers: Flat 20% OFF on Web Dev & Automations starting from ₹499/- per month!
                  </span>
                  <span className="text-[11px] text-slate-655 font-light mt-0.5 leading-normal">
                    Get premium custom web packages with a flat 20% launch discount and host secure workflow automation suites starting at just ₹499/mo.
                  </span>
                </div>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-[9px] rounded-xl transition-all shadow-md whitespace-nowrap relative z-10"
              >
                Claim Offer <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Corporate trust banner */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-6 mt-6 border-t border-slate-200 pt-6 text-slate-500 text-xs"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-brand-blue" />
                <span>Registered Private Limited Company</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-brand-purple" />
                <span>Enterprise SLA & Priority Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Mascot Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="absolute w-72 h-72 rounded-full bg-brand-blue/5 blur-[80px] pointer-events-none" />
            
            {/* Speech bubble dialog */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-22 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-lg max-w-xs z-20 text-xs text-slate-700 font-semibold after:content-[''] after:absolute after:bottom-[-8px] after:left-[45px] after:border-8 after:border-t-white after:border-r-transparent after:border-l-transparent after:border-b-transparent after:z-10 before:content-[''] before:absolute before:bottom-[-9px] before:left-[44px] before:border-9 before:border-t-slate-200 before:border-r-transparent before:border-l-transparent before:border-b-transparent before:z-0"
            >
              <span className="flex items-center gap-1 text-brand-purple font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Floto:
              </span>
              Hey! I am Floto. Let&apos;s build a customized AI team to automate your daily workflows! 🚀
            </motion.div>

            <div className="relative w-72 h-72 sm:w-80 sm:h-80 animate-float flex items-center justify-center">
              {/* Floating Service Bubbles */}
              
              {/* Bubble 1: Workflow Automation */}
              <div className="absolute -left-12 sm:-left-24 top-[15%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-slow hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-sm">
                  <Cpu className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">WORKFLOW</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">AUTOMATION</span>
                </div>
              </div>

              {/* Bubble 2: Website Design */}
              <div className="absolute -right-2 sm:-right-10 top-[40%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-medium hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shadow-sm">
                  <Layout className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">WEBSITE</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">DESIGN</span>
                </div>
              </div>

              {/* Bubble 3: AI Solutions */}
              <div className="absolute -left-2 sm:-left-10 bottom-10 z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-fast hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Bot className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">AI</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">SOLUTIONS</span>
                </div>
              </div>

              <Image
                src="/mascot-v4.png"
                alt="DotnLott AI Mascot"
                width={310}
                height={310}
                className="object-contain drop-shadow-[0_15px_30px_rgba(27,99,255,0.12)]"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Short Introduction Section */}
      <section className="relative py-16 border-t border-slate-200/80 bg-white/40 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Introduction</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
            Intelligent Automation for Forward-Thinking Enterprises
          </h2>
          <p className="text-sm text-slate-650 leading-relaxed max-w-2xl mx-auto font-light">
            DotnLott bridges the gap between complex AI engines and day-to-day business operations. We build custom integrations, high-converting websites, and robust background automations that eliminate repetitive desk work, increase conversion rates, and allow teams to focus on strategy.
          </p>
        </div>
      </section>

      {/* Two Primary Services Section */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Core Pillars</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Our Primary Capabilities
            </h2>
            <p className="text-sm text-slate-600">
              Two specialized core services designed to scale your operations, enhance digital presence, and deploy background automations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Service 1: AI Workflow Automation */}
            <div className="glass-card p-8 rounded-3xl flex flex-col justify-between gap-6 group hover:border-brand-blue/30 transition-all bg-white shadow-sm hover:shadow-md">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center w-full">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <Cpu className="w-6 h-6 group-hover:rotate-6 transition-transform" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-250 text-[10px] font-bold text-emerald-700 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    starts at ₹499/mo
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Workflow Automation</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Custom automation suites connecting your apps and databases. Auto-outreach, lead responders, CRM sync, custom AI voice support suites, and team alerts running 24/7.
                </p>
              </div>
              <Link href="/catalog" className="text-xs font-bold text-brand-blue flex items-center gap-1.5 hover:underline mt-2">
                Explore Automation Suites <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Service 2: Website Design & Development */}
            <div className="glass-card p-8 rounded-3xl flex flex-col justify-between gap-6 group hover:border-brand-purple/30 transition-all bg-white shadow-sm hover:shadow-md">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center w-full">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple flex-shrink-0">
                    <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 border border-rose-250 text-[10px] font-bold text-rose-700 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                    Flat 20% OFF
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Website Design & Dev</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  High-converting corporate websites, bespoke landing pages, custom e-commerce engines, and web apps optimized for speeds, leads, and SEO.
                </p>
              </div>
              <Link href="/website-development" className="text-xs font-bold text-brand-purple flex items-center gap-1.5 hover:underline mt-2">
                Learn About Web Development <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Automation Suites */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Out-of-the-box Systems</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Featured Automation Suites
              </h2>
              <p className="text-sm text-slate-600">
                A preview of our enterprise automation solutions. Fully modular, cloud-ready, and deployable in days.
              </p>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 hover:border-slate-350 transition-colors rounded-full shadow-sm"
            >
              See All 10 Suites
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Suite Preview 1: Email Marketing Suite */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">01 / Suite</span>
                <h3 className="text-md font-bold text-slate-900 group-hover:text-brand-blue transition-colors flex items-center gap-2">
                  📧 Email Marketing Automation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Auto-campaign setup, AI prospect finding, follow-up sequencing, and email box warm-ups running autonomously.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
                <span className="text-[9px] font-bold text-brand-purple bg-brand-purple/5 px-2 py-1 rounded">Managed & Dedicated</span>
                <Link href="/catalog" className="text-slate-400 group-hover:text-brand-blue transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Suite Preview 2: AI Lead Nurturing Suite */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">02 / Suite</span>
                <h3 className="text-md font-bold text-slate-900 group-hover:text-brand-blue transition-colors flex items-center gap-2">
                  🤖 AI Lead Nurturing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Connect ads to automatic WhatsApp triggers, sequence updates, qualify leads via chatbots, and sync directly with CRMs.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
                <span className="text-[9px] font-bold text-brand-purple bg-brand-purple/5 px-2 py-1 rounded">Managed & Dedicated</span>
                <Link href="/catalog" className="text-slate-400 group-hover:text-brand-blue transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Suite Preview 3: Customer Success Suite */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">03 / Suite</span>
                <h3 className="text-md font-bold text-slate-900 group-hover:text-brand-blue transition-colors flex items-center gap-2">
                  👥 Customer Success Suite
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Automate welcome messaging, feedback surveys, Google Review collection, referral systems, and renewal prompts.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
                <span className="text-[9px] font-bold text-brand-purple bg-brand-purple/5 px-2 py-1 rounded">Managed & Dedicated</span>
                <Link href="/catalog" className="text-slate-400 group-hover:text-brand-blue transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why DotnLott Section */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Why Partner With Us</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Built for High Reliability & Scale
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Generic scripts break when configurations change. At DotnLott, we package automations into scalable, self-healing architectures with standard APIs, logging, and professional cloud options.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Corporate Compliance & Safety</h4>
                    <p className="text-[11px] text-slate-500">Registered Private Limited Company in compliance with global data practices.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">No Vendor Lock-In</h4>
                    <p className="text-[11px] text-slate-500">Take dedicated ownership. Host it on your server and migrate anytime.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Locked Pricing Models</h4>
                    <p className="text-[11px] text-slate-500">Sign up during launch to lock in low management and subscription rates for 1 year.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-slate-900 rounded-3xl p-8 text-white flex flex-col gap-6 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/15 rounded-full blur-[60px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/15 rounded-full blur-[60px]" />

              <div className="flex justify-between items-start">
                <div className="px-2.5 py-0.5 rounded bg-brand-blue/20 border border-brand-blue/30 text-[9px] uppercase tracking-wider font-bold text-brand-blue leading-none">
                  Platform Status
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  All Systems Operational
                </span>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-fill-transparent">
                  Automate custom flows with zero downtime
                </span>
                <p className="text-[10px] text-slate-400 font-light mt-1">
                  Connect Legacy CRMs, Google Apps, Custom Web Apps, WhatsApp API, and LLM servers under a single deployment structure.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 flex justify-between items-center mt-4">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white leading-none">5,000+</span>
                  <span className="text-[9px] uppercase text-slate-400 mt-1">Daily Automated Tasks</span>
                </div>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-950 font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-slate-100 transition-colors shadow-lg"
                >
                  Consult an Expert <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Options Section */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Deployment Models</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Where Should We Host Your Systems?
            </h2>
            <p className="text-sm text-slate-600">
              We offer two flexible deployment options. Choose between hosting on our secure managed cloud or having dedicated ownership on your VPS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Managed Cloud Option */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Host on Our Managed VPS</h3>
                <p className="text-xs text-slate-550 font-light leading-relaxed">
                  We deploy and configure your suites on our secure VPS infrastructure. You get complete database isolation, onboarding setup, and executive training.
                </p>
                <ul className="text-xs text-slate-600 flex flex-col gap-2 mt-2 font-light">
                  <li className="flex items-center gap-2">✓ One-time deployment & setup fee</li>
                  <li className="flex items-center gap-2">✓ No ongoing rental charges paid to us</li>
                  <li className="flex items-center gap-2">✓ Client pays directly for VPS hosting resources</li>
                </ul>
              </div>
              <Link
                href="/catalog#deployment"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 border border-slate-200 hover:border-brand-blue/30 text-slate-700 hover:text-brand-blue text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Learn Setup Options <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dedicated VPS Option */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Host on Your Dedicated VPS</h3>
                <p className="text-xs text-slate-550 font-light leading-relaxed">
                  Direct root control. We deploy the automation systems inside your own AWS, Hetzner, or Google Cloud VPS account, and train your executive.
                </p>
                <ul className="text-xs text-slate-600 flex flex-col gap-2 mt-2 font-light">
                  <li className="flex items-center gap-2">✓ Hosted entirely within your company accounts</li>
                  <li className="flex items-center gap-2">✓ One-time setup fee + direct provider VPS billing</li>
                  <li className="flex items-center gap-2">✓ Training sessions for your automation executive</li>
                </ul>
              </div>
              <Link
                href="/catalog#deployment"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 border border-slate-200 hover:border-brand-purple/30 text-slate-700 hover:text-brand-purple text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Learn VPS Setup <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Sectors & Verticals</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Industries We Serve
            </h2>
            <p className="text-sm text-slate-600">
              Tailoring custom automation and database models across dynamic sectors to optimize operational efficiencies.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Healthcare', 'Education', 'Travel', 'Real Estate', 'Manufacturing', 'Retail'].map((ind) => (
              <div
                key={ind}
                className="border border-slate-200 rounded-2xl p-4 text-center hover:border-brand-blue/30 transition-all hover:bg-slate-50/50 flex flex-col justify-center items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-650 font-bold text-[10px]">
                  {ind[0]}
                </div>
                <span className="text-xs font-bold text-slate-800">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Operational Roadmap</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Our 4-Step Process
            </h2>
            <p className="text-sm text-slate-600">
              How we take your workflows from manual drag and drop sheets to robust background automation suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { num: '01', title: 'Discover', desc: 'Map out your current workflows, document bottlenecks, and analyze target software.' },
              { num: '02', title: 'Design', desc: 'Model automation scenarios, configure custom APIs, and review data flows.' },
              { num: '03', title: 'Deploy', desc: 'Activate suites either on Managed Cloud or Dedicated VPS server arrays.' },
              { num: '04', title: 'Support', desc: 'Provide monthly checking, system updates, logging, and diagnostic updates.' }
            ].map((step, idx) => (
              <div key={step.num} className="relative flex flex-col gap-3">
                <span className="text-3xl font-black bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-fill-transparent leading-none">
                  {step.num}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{step.title}</h3>
                <p className="text-xs text-slate-550 leading-relaxed font-light">{step.desc}</p>
                
                {idx < 3 && (
                  <div className="hidden md:block absolute top-4 -right-4 w-8 h-[1px] bg-slate-200 border-dashed border-t" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Adopter Benefits Section */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-purple rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/15 rounded-full blur-[80px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-brand-blue justify-center w-fit">
                  🚀 Launch Promotions
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                  Early Adopter Launch Benefits
                </h2>
                <p className="text-xs text-slate-350 leading-relaxed font-light">
                  Lock in promotional management, AMC, and server subscription rates by signing up during our initial launch window.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs font-light text-slate-200">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold">✓ 20% OFF Full Suites Today</div>
                  <div className="flex items-center gap-2">✓ Setup pilots starting at ₹499 ($6)</div>
                  <div className="flex items-center gap-2">✓ Complimentary Onboarding Call</div>
                  <div className="flex items-center gap-2">✓ Rates Locked for 12 Months</div>
                  <div className="flex items-center gap-2">✓ Priority Launch Support</div>
                  <div className="flex items-center gap-2">✓ Flexible Cloud-to-VPS Upgrades</div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Book Free Call Today</span>
                <span className="text-xl font-extrabold text-white mt-1 text-center">Setup Session in 10 Min</span>
                <p className="text-[10px] text-slate-300 text-center font-light mt-1">No upfront card details required. Lock your launch rate now.</p>
                <Link
                  href="/booking"
                  className="w-full text-center py-3 bg-white text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-slate-100 transition-colors mt-4 shadow-lg flex items-center justify-center gap-2"
                >
                  Consult Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="relative py-20 border-t border-slate-200 z-10 bg-slate-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Testimonials</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Trusted by Launch Partners
            </h2>
            <p className="text-sm text-slate-650 font-light">
              See what business owners have to say about our customized deployment process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Aditya Sen', role: 'Operations Director', company: 'Odisha Logistics Group', text: 'Integrating the Office Productivity suite saved our team over 15 hours of manual leave and shifts checklist matching per week. Very dependable support.' },
              { name: 'Sanjay Mohanty', role: 'Founder', company: 'Bhubaneswar Travel Bureau', text: 'Our custom quote booking was fully connected to WhatsApp trigger messages and sheets. Leads are qualified automatically within 5 minutes!' },
              { name: 'Pooja Das', role: 'Marketing Head', company: 'A2Z Corporate Solutions', text: 'We hosted three Marketing outreach and ads suites on our dedicated Hetzner VPS. Total ownership of records and perfect inbox safety metrics.' }
            ].map((test, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col gap-4 justify-between">
                <p className="text-xs text-slate-600 italic leading-relaxed font-light">&quot;{test.text}&quot;</p>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">{test.name}</span>
                  <span className="text-[10px] text-slate-500">{test.role}, {test.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="relative py-20 border-t border-slate-200 bg-slate-900 z-10 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md">
            <Image
              src="/logo-v2.png"
              alt="DotnLott Logo Center"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
            Stop Doing Repetitive Tasks Manually
          </h2>
          
          <p className="text-xs text-slate-450 max-w-xl leading-relaxed font-light">
            Deploy self-healing automation models. Start with a consultation call to discuss your company requirements and mapping workflow needs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-white rounded-full hover:bg-slate-100 transition-colors shadow-lg"
            >
              Book Consultation Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white border border-white/20 hover:bg-white/5 rounded-full transition-colors"
            >
              Explore Suites Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
