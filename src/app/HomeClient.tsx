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
  Layout,
  Mail,
  Users,
  CheckCircle2,
  Share2,
  Phone,
  Target,
  MessageSquare
} from 'lucide-react';
import InteractiveParticles from '@/components/ui/InteractiveParticles';
import MovingShowcaseCatalog from '@/components/ui/MovingShowcaseCatalog';

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
      {/* Interactive Floating Canvas Particle System */}
      <InteractiveParticles density={50} particleColor="mixed" />

      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-blue/5 top-10 left-1/4 animate-mesh-spin" style={{ animationDuration: '45s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 right-1/4 animate-mesh-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Top Tagline Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple w-fit shadow-sm"
            >
              <Cpu className="w-4 h-4 animate-pulse text-brand-blue" />
              AI Automation & Web Engineering
            </motion.div>

            {/* Main Hero Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-display text-[3.25rem] sm:text-[3.75rem] lg:text-[4.5rem] font-black tracking-tight leading-[1.02] text-slate-900"
            >
              Custom Business{' '}
              <br className="sm:block hidden" />
              <span className="text-brand-purple">Automation</span>{' '}
              &amp;{' '}
              <span className="text-brand-blue">Websites</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
            >
              Eliminate repetitive tasks, automate lead responses, and scale your brand identity. We build custom background automation suites and high-converting modern websites for growth-focused businesses.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="/contact#calendar-booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
              >
                Book Consultation Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-automation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-700 glass-card hover:glass-card-hover rounded-full transition-colors"
              >
                Explore Automation Suites
              </Link>
            </motion.div>

            {/* Promo Banner */}
            <motion.div
              variants={fadeInUp}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple/10 via-indigo-500/5 to-brand-blue/10 border border-brand-purple/20 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/25 flex items-center justify-center text-brand-purple flex-shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse text-brand-purple" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    🔥 Managed Cloud Suite Setup starting from ₹499/- per month!
                  </span>
                  <span className="text-[11px] text-slate-655 font-light mt-0.5 leading-normal">
                    Host secure workflow automation suites with priority support starting at just ₹499/mo.
                  </span>
                </div>
              </div>
              <Link
                href="/contact#calendar-booking"
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
            className="lg:col-span-5 flex flex-col items-center justify-center relative mt-20 lg:mt-0"
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
              Hey! I am Floto. Welcome to DotnLott — let&apos;s automate your workflows & build your dream website! 🚀
            </motion.div>

            <div className="relative w-72 h-72 sm:w-80 sm:h-80 animate-float flex items-center justify-center">
              {/* Floating Service Bubbles */}
              
              {/* Bubble 1: 24/7 Autopilot */}
              <div className="absolute -left-6 sm:-left-24 top-[15%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-slow hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shadow-sm">
                  <Zap className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">24/7</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">AUTOPILOT</span>
                </div>
              </div>

              {/* Bubble 2: Custom Web Dev */}
              <div className="absolute -right-6 sm:-right-10 top-[40%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-medium hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-sm">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">CUSTOM</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">WEB DEV</span>
                </div>
              </div>

              {/* Bubble 3: Database Sync */}
              <div className="absolute -left-2 sm:-left-10 bottom-10 z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-fast hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Database className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">CRM</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">DATABASE</span>
                </div>
              </div>

              <Image
                src="/mascot-v4.png"
                alt="DotnLott Mascot"
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

      {/* Core Business Solutions Header in Blue Text */}
      <section className="relative pt-6 pb-2 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-2">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue tracking-tight">
            Core Business Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Everything you need — email, cloud, websites & hosting — under one roof
          </p>
        </div>
      </section>

      {/* Interactive Horizontal Moving Showcase Section right after Hero */}
      <section className="relative pb-8 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MovingShowcaseCatalog />
        </div>
      </section>

      {/* Two Primary Services Section - Smooth Seamless Background */}
      <section className="relative py-16 z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
              <Zap className="w-4 h-4 text-brand-purple animate-bounce" />
              Core Pillars
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Our Primary Capabilities
            </h2>
            <p className="text-sm text-slate-600 font-light">
              Two specialized core services designed to scale your operations, enhance digital presence, and deploy background automations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Service 1: AI Workflow Automation - Logo Theme Styled Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 relative overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-blue/50 group transition-all duration-300"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-purple" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex justify-between items-center w-full">
                  <div className="w-13 h-13 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Cpu className="w-6 h-6" />
                  </div>
                  
                  {/* Clean Logo Theme Offer Pill */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/25 text-brand-blue text-xs font-bold uppercase tracking-wider shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
                    starts at ₹499/mo ($6)
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors font-display">
                    Business Automation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Custom automation suites connecting your apps and databases. Auto-outreach, lead responders, CRM sync, custom AI voice support suites, and team alerts running 24/7.
                  </p>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {['Automated Workflows', 'Instant Messaging', 'CRM Integration', 'Voice AI', '24/7 Autopilot'].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                href="/ai-automation" 
                className="w-full py-3.5 px-5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-brand-blue text-white transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg mt-4"
              >
                Explore Automation Suites <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Service 2: Website Development - Logo Theme Styled Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 relative overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-purple/50 group transition-all duration-300"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue" />

              <div className="flex flex-col gap-5 relative z-10">
                <div className="flex justify-between items-center w-full">
                  <div className="w-13 h-13 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>

                  {/* Clean Logo Theme Offer Pill */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/25 text-brand-purple text-xs font-bold uppercase tracking-wider shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
                    Flat 20% OFF
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-purple transition-colors font-display">
                    Website Development
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    High-converting corporate websites, bespoke landing pages, custom e-commerce engines, and web apps optimized for sub-second speeds, leads, and SEO.
                  </p>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {['Modern Stack', 'Responsive Design', 'Sub-second Speed', '100% SEO', 'Bespoke UI'].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                href="/website-development" 
                className="w-full py-3.5 px-5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-brand-purple text-white transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg mt-4"
              >
                Learn About Web Development <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Automation Suites - Middle Aligned Heading & Continuous Carousel for Top 5 Suites */}
      <section className="relative py-16 z-10 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Out-of-the-box Systems</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Featured Automation Suites
            </h2>
            <p className="text-sm text-slate-600 font-light">
              A preview of our top enterprise automation solutions. Fully modular, cloud-ready, and deployable in days.
            </p>
            <Link
              href="/ai-automation"
              className="inline-flex items-center gap-2 px-6 py-2.5 mt-2 text-xs font-black uppercase tracking-wider text-slate-800 bg-white border border-slate-300 hover:border-brand-purple transition-all rounded-full shadow-sm hover:shadow-md"
            >
              See All 12 Suites
              <ArrowRight className="w-4 h-4 text-brand-purple" />
            </Link>
          </div>
        </div>

        {/* Top 4 Featured Automations Grid in White with Thin Blue & Purple Border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            {
              num: '01 / SUITE',
              title: 'Email Marketing Automation',
              icon: Mail,
              desc: 'Auto-prospecting, email validation, cold outreach, follow-up sequencing, and primary inbox warm-ups running 24/7.',
              tag: 'Best Seller 🔥',
              tagClass: 'bg-amber-300/90 text-amber-950 border-amber-400/80 font-bold',
              borderColor: 'border-blue-200/90 hover:border-brand-purple/70',
              iconBg: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
              link: '/ai-automation#suite-email',
            },
            {
              num: '02 / SUITE',
              title: 'Social Media Automation',
              icon: Share2,
              desc: 'AI content creation, graphic poster generator, automated multi-channel scheduler, and daily thought leadership publishing.',
              tag: 'Auto-Publish 🚀',
              tagClass: 'bg-purple-50 text-purple-700 border-purple-200 font-mono font-bold',
              borderColor: 'border-purple-200/90 hover:border-brand-blue/70',
              iconBg: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
              link: '/ai-automation#suite-social',
            },
            {
              num: '03 / SUITE',
              title: 'Meta Ads Lead Automation',
              icon: Target,
              desc: 'Connect FB & Insta ads directly to automatic lead triggers, CRM pipeline routing, and instant WhatsApp alerts.',
              tag: 'Instant Sync ⚡',
              tagClass: 'bg-blue-50 text-blue-700 border-blue-200 font-mono font-bold',
              borderColor: 'border-blue-200/90 hover:border-brand-purple/70',
              iconBg: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
              link: '/ai-automation#suite-ads',
            },
            {
              num: '04 / SUITE',
              title: 'Website Leads Form Automation',
              icon: MessageSquare,
              desc: 'Instant web form-to-WhatsApp alerts, automated CRM deal creation, lead scoring, and instant customer responder workflows.',
              tag: 'Sub-1s Alert ⚡',
              tagClass: 'bg-purple-50 text-purple-700 border-purple-200 font-mono font-bold',
              borderColor: 'border-purple-200/90 hover:border-brand-blue/70',
              iconBg: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
              link: '/ai-automation#suite-nurture',
            },
          ].map((suite) => {
            const IconComponent = suite.icon;
            return (
              <Link
                key={suite.title}
                href={suite.link}
                className={`bg-white/95 backdrop-blur-md border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden ${suite.borderColor}`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">{suite.num}</span>
                    <span className={`inline-flex items-center gap-1 text-[9px] px-2.5 py-0.5 rounded-full uppercase border shadow-2xs ${suite.tagClass}`}>
                      {suite.tag}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center group-hover:scale-105 transition-all flex-shrink-0 ${suite.iconBg}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-brand-purple transition-colors font-display leading-snug">
                      {suite.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {suite.desc}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">24/7 Autopilot</span>
                  <span className="text-slate-400 group-hover:text-brand-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why DotnLott / Trust & Security Section */}
      <section className="relative py-16 z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column - 3 Interactive Glass Cards */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full gap-6">
              <div className="flex flex-col gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple w-fit shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-brand-purple animate-pulse" />
                  Why Partner With Us
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  Built for High Reliability & Enterprise Scale
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Generic scripts break when configurations change. At DotnLott, we package automations into self-healing, production-tested architectures.
                </p>
              </div>

              {/* 3 Levitation Glass Cards */}
              <div className="flex flex-col gap-3.5">
                {/* Card 1 */}
                <motion.div 
                  whileHover={{ x: 6, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-xl transition-all duration-300 flex items-start gap-4 border-l-4 border-l-brand-blue group"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div className="flex flex-col gap-1 flex-grow">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors font-display">Corporate Compliance & Safety</h4>
                      <span className="text-[9px] font-extrabold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-0.5 rounded-full uppercase">100% Regulated</span>
                    </div>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      Registered Private Limited Company operating under strict data security protocols & enterprise SLA guarantees.
                    </p>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  whileHover={{ x: 6, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-xl transition-all duration-300 flex items-start gap-4 border-l-4 border-l-brand-purple group"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Database className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div className="flex flex-col gap-1 flex-grow">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-brand-purple transition-colors font-display">Zero Vendor Lock-In</h4>
                      <span className="text-[9px] font-extrabold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-0.5 rounded-full uppercase">Full Ownership</span>
                    </div>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      Take dedicated ownership. Host it on your VPS server array and maintain 100% root control over your data pipelines.
                    </p>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  whileHover={{ x: 6, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-xl transition-all duration-300 flex items-start gap-4 border-l-4 border-l-emerald-500 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col gap-1 flex-grow">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors font-display">Locked Pricing Protection</h4>
                      <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">12-Mo Lock</span>
                    </div>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      Sign up during our launch window to lock in management, AMC, and server subscription rates for a full year.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Equal Height Futuristic Live Server Monitor Widget */}
            <div className="lg:col-span-6 relative h-full flex flex-col">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative bg-slate-950 rounded-3xl p-7 md:p-8 text-white flex flex-col justify-between h-full shadow-2xl overflow-hidden border border-slate-800 group"
              >
                {/* Ambient glow blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-purple/20 rounded-full blur-[80px] pointer-events-none" />

                {/* Top Section */}
                <div className="flex flex-col gap-5 relative z-10">
                  {/* Dashboard Status Bar */}
                  <div className="flex flex-wrap justify-between items-center gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-black text-white uppercase tracking-wider font-display">
                        SYSTEM MONITORING ACTIVE
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                      All 12 Pipelines Live 🟢
                    </span>
                  </div>

                  {/* Dashboard Body */}
                  <div className="flex flex-col gap-2.5 mt-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight tracking-tight">
                      Automate custom flows with 99.99% uptime
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Connect Legacy CRMs, Google Apps, Custom Web Apps, WhatsApp API, and LLM servers under a unified deployment structure.
                    </p>
                  </div>

                  {/* Live Integration Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {['CRM Integration', 'Instant Messaging', 'Workflow Engine', 'Modern Stack', 'AI Model Suite', 'Voice AI'].map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-xs">
                        ⚡ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Section - Metrics Bar & CTA */}
                <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 mt-6">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white font-display leading-none">10,000+</span>
                      <span className="text-xs text-emerald-400 font-bold">▲ 99.9% Uptime</span>
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1">Daily Automated Tasks Processed</span>
                  </div>
                  <Link
                    href="/contact#calendar-booking"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-950 font-black uppercase tracking-wider text-xs rounded-xl hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
                  >
                    Consult an Expert <ArrowRight className="w-4 h-4 text-slate-950" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Early Adopter Benefits Section */}
      <section className="relative py-16 z-10 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/15 rounded-full blur-[80px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-brand-purple justify-center w-fit">
                  🚀 Launch Promotions
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                  Early Adopter Launch Benefits
                </h2>
                <p className="text-xs text-slate-350 leading-relaxed font-light">
                  Lock in promotional management, AMC, and server subscription rates by signing up during our initial launch window.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs font-light text-slate-200">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">✓ 20% OFF Full Suites & Web Dev</div>
                  <div className="flex items-center gap-2">✓ Setup pilots starting at ₹499 ($6)</div>
                  <div className="flex items-center gap-2">✓ Complimentary Onboarding Call</div>
                  <div className="flex items-center gap-2">✓ Rates Locked for 12 Months</div>
                  <div className="flex items-center gap-2">✓ Priority Launch Support</div>
                  <div className="flex items-center gap-2">✓ Flexible Cloud-to-VPS Upgrades</div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Book Free Call Today</span>
                <span className="text-xl font-black text-white mt-1 text-center">Setup Session in 10 Min</span>
                <p className="text-[10px] text-slate-300 text-center font-light mt-1">No upfront card details required. Lock your launch rate now.</p>
                <Link
                  href="/contact#calendar-booking"
                  className="w-full text-center py-3.5 bg-white text-slate-950 font-black uppercase tracking-wider text-xs rounded-xl hover:bg-slate-100 transition-all mt-4 shadow-lg flex items-center justify-center gap-2 hover:scale-105"
                >
                  Consult Now <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Conversion CTA - Full Width Navy Blue Gradient */}
      <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 z-10 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-md shadow-xl">
            <Image
              src="/logo-v2.png"
              alt="DotnLott Logo Center"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-3xl leading-tight">
            Stop Doing Repetitive Tasks Manually
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed font-light">
            Deploy self-healing automation models & high-converting websites today. Start with a free consultation call to discuss your company requirements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/contact#calendar-booking"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-all rounded-full shadow-2xl hover:scale-105"
            >
              Book Strategy Session
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
