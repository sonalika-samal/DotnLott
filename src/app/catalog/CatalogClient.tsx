'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mail,
  Share2,
  Target,
  MessageSquare,
  Users,
  Briefcase,
  Database,
  Brain,
  Plane,
  Globe,
  Check,
  Sparkles,
  Cpu,
  ArrowRight,
  ChevronDown,
  Phone,
  Server,
  Receipt,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import InteractiveParticles from '@/components/ui/InteractiveParticles';
import MovingShowcaseCatalog from '@/components/ui/MovingShowcaseCatalog';

const catalogFaqs = [
  {
    question: 'How much does business workflow automation cost?',
    answer: 'Standardized automation suite setups at DotnLott start at ₹499 ($6) on our Managed Cloud model. Custom enterprise integrations are priced based on API complexity, webhook volume, and specific infrastructure requirements after a consultation call.',
  },
  {
    question: 'Can workflow automation connect with our existing CRM and internal databases?',
    answer: 'Yes. We engineer custom API connectors and secure webhooks to sync legacy databases (SQL, Postgres, MongoDB, private REST APIs) with modern CRM systems, communication channels, and cloud storage to ensure absolute data consistency.',
  },
  {
    question: 'How long does it take to implement a standard automation suite?',
    answer: 'Standard suites deployed on our Managed Cloud can be fully configured, tested, and integrated with your workspace tools within 3 to 7 business days. Custom multi-branch enterprise pipelines are typically delivered in 10 to 14 days.',
  },
  {
    question: 'Are our internal customer records and database credentials secure?',
    answer: 'Absolutely. We enforce strict end-to-end encryption, OAuth2 authentication, and isolated environment variables. On our Dedicated VPS option, your database pipeline runs directly within your private cloud (AWS, Hetzner, GCP) with zero third-party data logging.',
  },
  {
    question: 'What happens if an API endpoint or third-party service updates its schema?',
    answer: 'All DotnLott automation suites are built with self-healing error catchers and instant fallback triggers. If a third-party API changes, our system logs the event without losing incoming data payloads and alerts our engineering team immediately.',
  },
  {
    question: 'Do we need to pay monthly recurring software rental fees?',
    answer: 'No. We operate strictly on a transparent one-time setup fee model. You retain 100% root ownership of your automation systems and pay hosting fees directly to your cloud VPS provider.',
  },
  {
    question: 'Can your automation handle multi-channel WhatsApp and voice agent workflows?',
    answer: 'Yes. We build unified multi-channel pipelines where inbound lead triggers automatically trigger conversational AI voice calls, send instant WhatsApp updates, and update CRM lead stages in real-time.',
  },
  {
    question: 'What level of post-deployment support and executive training do you provide?',
    answer: 'Every deployment includes complete executive onboarding, step-by-step video documentation, and hands-off team training. We also offer optional Annual Maintenance Contracts (AMC) for continuous optimization.',
  },
];

const suites = [
  {
    id: 'suite-email',
    icon: Mail,
    title: 'Email Marketing Automation Suite',
    description: 'Autonomous prospecting, validation, outbound cold email outreach, follow-up sequencing, and primary inbox warmups.',
    popular: true,
    features: [
      'AI Lead Prospecting',
      'Email Outreach Autopilot',
      'Smart Follow-up Sequencer',
      'Automatic Bounce Management',
      'AI Subject & Email Writer',
      'Automated Reply Routing',
      'Dedicated Email Warm-up'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-blue-200 hover:border-brand-blue/60'
  },
  {
    id: 'suite-social',
    icon: Share2,
    title: 'Social Media Automation Suite',
    description: 'Auto-generates visual layouts, schedules postings across networks, updates daily thought branding, and reviews channel analytics.',
    features: [
      'AI Content & Copywriting',
      'AI Graphic Poster Creator',
      'Auto Multi-Channel Scheduler',
      'Dynamic Carousel Posting',
      'Sales & Branding Campaigns',
      'Weekly Thought Leader Posts',
      'Social Media News Harvester',
      'Performance Metrics Analytics'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-purple-200 hover:border-brand-purple/60'
  },
  {
    id: 'suite-ads',
    icon: Target,
    title: 'Meta Ads Automation Suite',
    description: 'Automates campaign setups, captures leads from ad forms, qualifies prospects instantly, and runs analytics dashboards.',
    features: [
      'Ad Campaign Setup Builder',
      'Facebook/Instagram Lead Collection',
      'Instant Lead Qualification',
      'Instant WhatsApp CRM Alert',
      'Automated Performance Analytics',
      'Weekly Execution Reports'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-rose-200 hover:border-rose-450/60'
  },
  {
    id: 'suite-nurture',
    icon: MessageSquare,
    title: 'AI Lead Nurturing Suite',
    description: 'Conversational lead qualifiers, drip campaigns, WhatsApp sequence builders, special offer rollouts, and CRM synchronization.',
    features: [
      'Custom WhatsApp Flows',
      'Automated Email Drips',
      'Conversational AI Chatbot',
      'Lead Qualification Scoring',
      'Smart Follow-Up Sequences',
      'Special Offer Rollout Tools',
      'Real-time CRM Sync',
      'Media Attachment Processor'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-cyan-200 hover:border-cyan-450/60'
  },
  {
    id: 'suite-success',
    icon: Users,
    title: 'Customer Success Automation Suite',
    description: 'Triggers onboarding, surveys satisfaction metrics, collects organic reviews, handles referrals, and runs win-back loops.',
    features: [
      'Automated Welcome & Onboarding',
      'Feedback & CSAT Collection',
      'Automated Google Reviews Boost',
      'Loyalty Referral Program Tracker',
      'Contract Renewal Prompter',
      'Inactive Client Win-back Loops',
      'AI Helpdesk Copilot Drafts'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-emerald-200 hover:border-emerald-500/60'
  },
  {
    id: 'suite-office',
    icon: Briefcase,
    title: 'Office Productivity Suite',
    description: 'Sends task lists, tracks staff schedules, notifies ticket delays, monitors leaves, and handles nightly system backups.',
    features: [
      'Daily Team Shift Reminders',
      'SLA Ticket Delay Alerts',
      'Overdue Task Checklists',
      'AppScript Ticket Trackers',
      'Leave & Absence Matchers',
      'Nightly Configuration Backups',
      'Backup Storage Purge Cleaners'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-amber-200 hover:border-amber-500/60'
  },
  {
    id: 'suite-crm',
    icon: Database,
    title: 'CRM Automation Suite',
    description: 'Syncs customer details, handles calendar meetings, builds call analytics graphs, and saves nightly database logs.',
    features: [
      'Lead Status Age Warnings',
      'Weekly/Monthly Reports Compile',
      'Google Calendar Integration',
      'Enterprise CRM Sync Drivers',
      'Daily Call Metrics Summary',
      'Database Backup Archivers'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-indigo-200 hover:border-indigo-500/60'
  },
  {
    id: 'suite-assistant',
    icon: Brain,
    title: 'AI Business Assistant Suite',
    description: 'Custom AI agents acting as customer executives, email writers, sales consultants, and technical database query helpers.',
    features: [
      'AI Sales Representative Agent',
      'AI Smart Inbox Manager',
      'AI Customer Success Copilot',
      'AI Research & Web Scraping Agent',
      'AI Enterprise Knowledge base'
    ],
    deployments: ['Dedicated VPS Only'],
    color: 'border-teal-200 hover:border-teal-500/60'
  },
  {
    id: 'suite-travel',
    icon: Plane,
    title: 'Travel Business Automation Suite',
    description: 'Travel rates comparisons, booking validations, dynamic quotes layout, and automated email traveler itineraries.',
    features: [
      'Travel Rate Intelligence Lookups',
      'Outbound Lead Journey Drips',
      'Dynamic PDF Quote Auto-Builder',
      'AI Booking Assistant Chatbots',
      'Post-Booking Validation Sync'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-sky-200 hover:border-sky-500/60'
  },
  {
    id: 'suite-website',
    icon: Globe,
    title: 'Website Business Automation Suite',
    description: 'Connects standard contact forms to WhatsApp channels, routes customer details to databases, and manages booking schedules.',
    features: [
      'Contact Form CRM Routing',
      'Form-to-WhatsApp Instants',
      'Calendar Consultation Scheduling',
      'Visitor Traffic Analytics Sync',
      'Admin Lead Management Dashboard'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-violet-200 hover:border-violet-500/60'
  },
  {
    id: 'suite-voice-agent',
    icon: Phone,
    title: 'Voice Agent Customer Support Suite',
    description: 'Deploys intelligent, human-like voice agents that handle inbound support calls, qualify customer inquiries, and trigger background CRM workflows automatically.',
    features: [
      'Autonomous Inbound Call Handler',
      'Natural Language Voice Synthesis',
      'Real-time Conversation Transcriber',
      'Post-Call CRM Summary Log',
      'Instant WhatsApp Callback Trigger',
      'Custom Calendar Booking Sync',
      'Multi-Language Vocal Support'
    ],
    deployments: ['Dedicated VPS Only'],
    color: 'border-amber-200 hover:border-amber-500/60'
  },
  {
    id: 'suite-billing',
    icon: Receipt,
    title: 'Quotation & Invoice Automation Suite',
    description: 'Automates price calculations, builds client quotes, generates professional invoices, and syncs payment tracking status across tools.',
    features: [
      'Dynamic PDF Quotation Auto-Builder',
      'Automated Recurring Invoices & Receipts',
      'Smart Payment Reminder Autopilot',
      'Real-time Accounting & CRM Sync',
      'Multi-Currency Rate Convert Webhooks',
      'Instant WhatsApp Payment Notifications'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-emerald-200 hover:border-emerald-500/60'
  }
];

const pricingPlans = [
  {
    name: 'Starter Pack',
    desc: 'Perfect for testing out automation capabilities with a single targeted workflow.',
    features: [
      'Try 1 hero automation from 1 Automation Suite of your choice',
      'Managed Cloud hosting',
      'Standard support',
      'Basic performance logging'
    ],
    price: 'Starting at ₹499',
    subPrice: 'starting at $6',
    cta: 'Book Starter Consultation',
    popular: false
  },
  {
    name: 'Growth Pack',
    desc: 'Designed for scaling workflows across multiple core business pipelines.',
    features: [
      'Try 1 top automation each from 3 different Automation Suites',
      'Managed Cloud hosting',
      'Priority support',
      'Advanced performance analytics'
    ],
    price: 'Starting at ₹999',
    subPrice: 'starting at $12',
    cta: 'Book Growth Consultation',
    popular: true
  },
  {
    name: 'Business Pack',
    desc: 'Unlock full access to automated systems across all operational suites.',
    features: [
      'Try 1 hero automation each from every Automation Suite (all 12)',
      'Managed Cloud hosting',
      'Priority support + onboarding call',
      'Dedicated setup assistance'
    ],
    price: 'Starting at ₹1,999',
    subPrice: 'starting at $24',
    cta: 'Book Business Consultation',
    popular: false
  }
];

export default function CatalogClient() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      {/* Interactive Floating Canvas Particle System */}
      <InteractiveParticles density={45} particleColor="mixed" />

      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-purple/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s' }} />
      <div className="mesh-bg bg-brand-blue/5 bottom-10 left-10 animate-mesh-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple w-fit shadow-sm"
            >
              <Cpu className="w-4 h-4 animate-pulse text-brand-blue" />
              AI Automation Solutions
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-slate-900"
            >
              Enterprise Business<br />
              <span className="bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue bg-clip-text text-fill-transparent drop-shadow-sm">
                Automation Suites
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
            >
              Eliminate operational overhead. Our modular, secure, and production-tested Automation Suites group specialized scripts to keep your sales pipelines, support desks, and marketing channels running at max efficiency.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
              >
                Book Automation Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#suites-grid"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-700 glass-card hover:glass-card-hover rounded-full transition-colors"
              >
                Explore 12 Suites
              </a>
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
                    🔥 Managed Cloud Suite Setup starting from {currency === 'INR' ? '₹499/-' : '$6/-'} per month!
                  </span>
                  <span className="text-[11px] text-slate-655 font-light mt-0.5 leading-normal">
                    Host secure workflow automation suites with priority support starting at just {currency === 'INR' ? '₹499/mo' : '$6/mo'}.
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
            <div className="absolute w-72 h-72 rounded-full bg-brand-purple/5 blur-[80px] pointer-events-none" />
            
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
              
              {/* Bubble 1: 24/7 Autopilot */}
              <div className="absolute -left-12 sm:-left-24 top-[15%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-slow hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-sm">
                  <Cpu className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">24/7</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">AUTOPILOT</span>
                </div>
              </div>

              {/* Bubble 2: WhatsApp API */}
              <div className="absolute -right-2 sm:-right-10 top-[40%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-medium hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
                  <MessageSquare className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">WHATSAPP</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">API SYNC</span>
                </div>
              </div>

              {/* Bubble 3: CRM Database */}
              <div className="absolute -left-2 sm:-left-10 bottom-10 z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-fast hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shadow-sm">
                  <Database className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">CRM</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">DATABASE</span>
                </div>
              </div>

              <Image
                src="/mascot-v4.png"
                alt="DotnLott Automation Mascot"
                width={310}
                height={310}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10 px-4 sm:px-6 lg:px-8 pt-0 pb-16">

        {/* Grid of Automation Suites - 4 Columns Vertical Lively Animated Grid */}
        <div id="suites-grid" className="flex flex-col gap-8 w-full scroll-mt-24">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold uppercase tracking-wider text-brand-blue shadow-sm">
              <Zap className="w-4 h-4 text-brand-blue animate-bounce" />
              12 Production-Ready Suites
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
              Explore Enterprise Automation Suites
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light max-w-2xl leading-relaxed">
              Modular, secure integrations engineered to run your business operations 24/7 on autopilot.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            {suites.map((suite) => {
              const IconComponent = suite.icon;

              return (
                <motion.div
                  key={suite.id}
                  id={suite.id}
                  variants={fadeInUp}
                  whileHover={{ y: suite.popular ? -8 : -5, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`bg-white/95 backdrop-blur-md border rounded-2xl p-4.5 sm:p-5 flex flex-col justify-between gap-3.5 transition-all duration-300 relative overflow-hidden scroll-mt-28 group ${
                    suite.popular
                      ? 'border-brand-purple/80 ring-2 ring-brand-purple/30 shadow-lg'
                      : `shadow-xs hover:shadow-xl ${suite.color}`
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Card Top Icon & Live Status */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 shadow-xs flex-shrink-0 group-hover:scale-105">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {suite.popular ? (
                          <span className="inline-flex items-center gap-1 text-[8.5px] font-black text-white bg-gradient-to-r from-brand-blue via-brand-purple to-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-widest shadow-xs animate-pulse">
                            Most Popular 🔥
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[8.5px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            24/7 Autopilot
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Suite Title & Description */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-brand-purple transition-colors font-display">
                        {suite.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-light line-clamp-2">
                        {suite.description}
                      </p>
                    </div>

                    {/* Features Bullet List (Compact top 3 items) */}
                    <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-2.5">
                      <ul className="flex flex-col gap-1">
                        {suite.features.slice(0, 3).map((feat) => (
                          <li key={feat} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-light">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer CTAs */}
                  <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-2.5 mt-auto">
                    <Link
                      href="/booking"
                      className={`w-full text-center py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 group-hover:shadow-md ${
                        suite.popular
                          ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:brightness-110'
                          : 'bg-slate-900 hover:bg-brand-purple text-white'
                      }`}
                    >
                      Configure Suite
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Custom Automation Option Banner (Dark Action Card with Glows) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase tracking-wider font-extrabold text-brand-blue leading-none w-fit shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
                Bespoke Engineering
              </span>
              <h3 className="text-2xl md:text-3xl font-black font-display leading-tight">Need a Custom Automation Suite?</h3>
              <p className="text-sm text-slate-350 leading-relaxed font-light">
                Do you have proprietary databases, legacy software, or unique operational flows? We build custom triggers and API integrations matching your business guidelines.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 mt-2 font-light">
                {['HR & Payroll', 'Finance Ledger Sync', 'CRM Pipeline Routing', 'Logistics Dispatch Alerts', 'Healthcare Records Backup', 'Real Estate Listings Sync'].map((ex) => (
                  <span key={ex} className="bg-white/10 border border-white/15 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-all rounded-full flex-shrink-0 shadow-xl hover:scale-105"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </motion.div>

        {/* Pricing Solutions Section */}
        <div className="pt-16 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full border-b border-slate-200/80 pb-6">
            <div className="text-center md:text-left flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Platform Pricing Structure</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                One-Time Setup Configurations
              </h2>
              <p className="text-sm text-slate-650 font-light leading-relaxed max-w-2xl">
                We charge a single one-time setup fee for developing your suites. Monthly cloud rental or dedicated client VPS hosting models will be discussed during discovery.
              </p>
            </div>

            {/* Currency Toggle (INR vs USD) */}
            <div className="flex items-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl border border-slate-300/80 shadow-inner flex-shrink-0">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                  currency === 'INR'
                    ? 'bg-white text-slate-900 shadow-md scale-105 border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇮🇳</span> INR (₹)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                  currency === 'USD'
                    ? 'bg-white text-slate-900 shadow-md scale-105 border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇺🇸</span> USD ($)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const mainPrice = currency === 'INR' 
                ? plan.price 
                : plan.price.replace('₹499', '$6').replace('₹999', '$12').replace('₹1,999', '$24');
              const secondaryPrice = currency === 'INR'
                ? plan.subPrice
                : plan.subPrice.replace('$6', '₹499').replace('$12', '₹999').replace('$24', '₹1,999');

              return (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`bg-white/95 backdrop-blur-md border rounded-3xl p-8 flex flex-col justify-between gap-8 relative shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    plan.popular ? 'border-brand-purple/60 ring-2 ring-brand-purple/20' : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute top-3.5 right-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md leading-none">
                      Most Popular
                    </span>
                  )}

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-xs text-slate-500 font-light leading-normal">{plan.desc}</p>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-3xl font-black text-slate-900 leading-none">{mainPrice}</span>
                      <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{secondaryPrice}</span>
                    </div>

                    <ul className="flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-650 font-light">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/booking"
                    className={`w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                      plan.popular
                        ? 'bg-slate-900 text-white hover:bg-brand-purple shadow-md'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Early Adopter Launch Benefits Banner (Dark Action Card) */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl border border-white/10 w-full flex flex-col lg:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10 flex-grow text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-brand-purple w-fit">
                🚀 Launch Promotions
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white leading-tight">
                Early Adopter Launch Benefits
              </h2>
              <p className="text-xs text-slate-350 leading-relaxed font-light max-w-xl">
                Lock in promotional management, AMC, and server subscription rates by signing up during our initial launch window.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span className="text-brand-blue font-bold">20% OFF Full Suites Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Setup pilots starting at ₹499 ($6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Complimentary Onboarding Call</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Rates Locked for 12 Months</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Priority Launch Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Flexible Cloud-to-VPS Upgrades</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center justify-between gap-4 w-full lg:w-80 flex-shrink-0 backdrop-blur-sm relative z-10">
              <span className="text-[10px] text-slate-450 uppercase tracking-widest font-bold">Book Free Call Today</span>
              <h3 className="text-xl font-black text-white leading-tight">Setup Session in 10 Min</h3>
              <p className="text-[11px] text-slate-400 font-light max-w-[220px]">
                No upfront card details required. Lock your launch rate now.
              </p>
              <Link
                href="/booking"
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                Consult Now
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>

        {/* VPS Deployment Setup Models Section - Interactive Levitation Cards */}
        <div id="deployment" className="pt-12 flex flex-col gap-10 scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple justify-center w-fit shadow-sm">
                <Server className="w-4 h-4 text-brand-purple animate-pulse" />
                Deployment Infrastructure
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                VPS Deployment & Setup Models
              </h2>
              <p className="text-sm text-slate-600 font-light leading-relaxed max-w-2xl">
                We deliver our automation suites as complete, production-ready server setups. We perform the deployment, configure security protocols, and fully train your executive for a smooth hands-off transition.
              </p>
              
              {/* High-Tech Gradient Guarantee Notice */}
              <div className="mt-2 p-5 bg-gradient-to-r from-amber-500/10 via-brand-purple/10 to-brand-blue/10 border border-amber-300/40 text-xs text-slate-800 rounded-2xl max-w-2xl mx-auto font-light leading-relaxed flex items-start gap-3.5 shadow-2xs text-left">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Zero Ongoing Rental Fees
                  </span>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    We operate strictly on a <strong>one-time setup fee model</strong>. You pay for your VPS server hosting directly to your provider, keeping 100% database ownership.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto w-full">
              {/* Option A: Host on Our Managed VPS Card */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:border-brand-blue/50 group transition-all relative overflow-hidden"
              >
                {/* Glowing Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-purple opacity-0 group-hover:opacity-100 transition-all duration-300" />

                <div className="flex flex-col gap-5 relative z-10">
                  <div className="flex justify-between items-center w-full">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                      <Server className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full">
                      Fully Managed
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue">Option A</span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors font-display">
                      Host on Our Managed VPS
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Ideal for businesses without dedicated in-house sysadmin teams. We deploy your automation suites onto a secure virtual server isolated inside our infrastructure.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-4">
                    {[
                      'One-time deployment & API syncing',
                      '24/7 Uptime & monitoring',
                      'Complete onboarding & executive training',
                      'Client pays directly for dedicated VPS billing'
                    ].map((item) => (
                      <span key={item} className="text-xs text-slate-700 font-light flex items-center gap-2">
                        <span className="text-brand-blue font-bold">✓</span> {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/booking" 
                  className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-brand-blue text-white transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg mt-4"
                >
                  Select Managed VPS <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Option B: Host on Your Own VPS Card */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:border-brand-purple/50 group transition-all relative overflow-hidden"
              >
                {/* Glowing Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue opacity-0 group-hover:opacity-100 transition-all duration-300" />

                <div className="flex flex-col gap-5 relative z-10">
                  <div className="flex justify-between items-center w-full">
                    <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-3 py-1 rounded-full">
                      Root Ownership
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-purple">Option B</span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-purple transition-colors font-display">
                      Host on Your Own VPS
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Best for corporate entities requiring strict compliance and direct root-level server access. We deploy directly to your corporate cloud VPS array.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-4">
                    {[
                      'Deployment in your corporate cloud environment',
                      'Direct database root control & security keys',
                      'Comprehensive hands-off executive training',
                      'Zero third-party data logging'
                    ].map((item) => (
                      <span key={item} className="text-xs text-slate-700 font-light flex items-center gap-2">
                        <span className="text-brand-purple font-bold">✓</span> {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/booking" 
                  className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-brand-purple text-white transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg mt-4"
                >
                  Select Direct VPS <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="pt-16 flex flex-col gap-10">
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Help & Support</span>
              <h2 className="font-display text-3xl font-extrabold text-slate-900">
                Solutions & Pricing FAQ
              </h2>
              <p className="text-sm text-slate-655 font-light leading-relaxed">
                Find answers to key operational concerns regarding automation costs, compatibility, and integrations.
              </p>
            </div>

            <div className="max-w-3xl mx-auto w-full flex flex-col gap-3.5">
              {catalogFaqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                      isOpen 
                        ? 'bg-gradient-to-r from-purple-50/40 via-indigo-50/10 to-blue-50/40 border-brand-purple/40 shadow-md' 
                        : 'bg-white border-slate-200 hover:border-brand-purple/20 hover:bg-slate-50/40'
                    }`}
                  >
                    <h3 className="m-0 p-0">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:opacity-90 transition-opacity border-0 cursor-pointer bg-transparent"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-xs font-bold leading-snug transition-colors duration-300 ${isOpen ? 'text-brand-purple' : 'text-slate-900'}`}>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                            isOpen ? 'rotate-180 text-brand-purple' : 'text-slate-400'
                          }`}
                        />
                      </button>
                    </h3>

                    <div
                      className="transition-all duration-350 overflow-hidden"
                      style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                    >
                      <div className={`px-6 pb-5 pt-1 text-xs leading-relaxed font-light ${isOpen ? 'border-t border-brand-purple/10 text-slate-700' : 'text-slate-600'}`}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Executive Architecture Definition Section (Zero side padding, zero gap with footer) */}
      <section className="relative pt-10 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white z-10 overflow-hidden border-t border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold uppercase tracking-widest text-brand-purple">
              <Brain className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
              Executive Knowledge Architecture
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              24/7 Autopilot Execution
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            What Is Business Workflow Automation?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Workflow automation is the event-driven, programmatic orchestration of manual operational tasks using secure REST APIs, webhooks, and custom logic pipelines. By replacing manual data entry, disconnected spreadsheets, and inter-departmental hand-offs with self-healing background automation, corporate entities eliminate human typing errors, save thousands of operational hours, and achieve instantaneous 24/7 business speed.
          </p>

          {/* Key Value Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            {[
              { title: 'Zero Manual Error', desc: 'Validated API schemas' },
              { title: '100% Root Control', desc: 'Dedicated VPS hosting' },
              { title: 'Instant Response', desc: 'Sub-second webhooks' },
              { title: '99.99% Uptime', desc: 'Self-healing triggers' },
            ].map((pill, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex flex-col gap-1 backdrop-blur-xs text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                  {pill.title}
                </span>
                <span className="text-[10px] text-slate-400 font-light">{pill.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
