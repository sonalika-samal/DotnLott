'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveParticles from '@/components/ui/InteractiveParticles';
import InteractiveAiHeroVisual from '@/components/ui/InteractiveAiHeroVisual';
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
  Phone, 
  Receipt, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Zap, 
  Activity, 
  Clock, 
  Server,
  ShieldCheck,
  ChevronDown,
  Cpu,
  CheckCircle2
} from 'lucide-react';

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
    cta: 'Book Business Consultation',
    popular: false
  }
];

const allSuites = [
  {
    id: 'suite-email',
    category: 'Outreach & Marketing',
    icon: Mail,
    title: 'Email Marketing Automation Suite',
    description: 'Autonomous prospecting, validation, outbound cold email outreach, follow-up sequencing, and primary inbox warmups.',
    popular: true,
    features: [
      'AI Lead Prospecting & Verification',
      'Email Outreach Autopilot',
      'Smart Follow-up Sequencer',
      'Automatic Bounce Management',
      'AI Subject & Email Writer',
      'Automated Reply Routing',
      'Dedicated Email Warm-up'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-blue-200 hover:border-brand-blue/60 text-brand-blue bg-blue-50/50'
  },
  {
    id: 'suite-social',
    category: 'Outreach & Marketing',
    icon: Share2,
    title: 'Social Media Automation Suite',
    description: 'Auto-generates visual layouts, schedules postings across networks, updates daily thought branding, and reviews channel analytics.',
    popular: false,
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
    color: 'border-purple-200 hover:border-brand-purple/60 text-brand-purple bg-purple-50/50'
  },
  {
    id: 'suite-ads',
    category: 'Outreach & Marketing',
    icon: Target,
    title: 'Meta Ads Automation Suite',
    description: 'Automates campaign setups, captures leads from ad forms, qualifies prospects instantly, and runs analytics dashboards.',
    popular: false,
    features: [
      'Ad Campaign Setup Builder',
      'Facebook/Instagram Lead Collection',
      'Instant Lead Qualification',
      'Instant WhatsApp CRM Alert',
      'Automated Performance Analytics',
      'Weekly Execution Reports'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-rose-200 hover:border-rose-400 text-rose-600 bg-rose-50/50'
  },
  {
    id: 'suite-nurture',
    category: 'Outreach & Marketing',
    icon: MessageSquare,
    title: 'AI Lead Nurturing Suite',
    description: 'Conversational lead qualifiers, drip campaigns, WhatsApp sequence builders, special offer rollouts, and CRM synchronization.',
    popular: true,
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
    color: 'border-cyan-200 hover:border-cyan-400 text-cyan-600 bg-cyan-50/50'
  },
  {
    id: 'suite-success',
    category: 'Operations & Support',
    icon: Users,
    title: 'Customer Success Automation Suite',
    description: 'Triggers onboarding, surveys satisfaction metrics, collects organic reviews, handles referrals, and runs win-back loops.',
    popular: false,
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
    color: 'border-emerald-200 hover:border-emerald-400 text-emerald-600 bg-emerald-50/50'
  },
  {
    id: 'suite-office',
    category: 'Operations & Support',
    icon: Briefcase,
    title: 'Office Productivity Suite',
    description: 'Sends task lists, tracks staff schedules, notifies ticket delays, monitors leaves, and handles nightly system backups.',
    popular: false,
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
    color: 'border-amber-200 hover:border-amber-400 text-amber-600 bg-amber-50/50'
  },
  {
    id: 'suite-crm',
    category: 'CRM & Database',
    icon: Database,
    title: 'CRM Automation Suite',
    description: 'Syncs customer details, handles calendar meetings, builds call analytics graphs, and saves nightly database logs.',
    popular: true,
    features: [
      'Lead Status Age Warnings',
      'Weekly/Monthly Reports Compile',
      'Google Calendar Integration',
      'Enterprise CRM Sync Drivers',
      'Daily Call Metrics Summary',
      'Database Backup Archivers'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-indigo-200 hover:border-indigo-400 text-indigo-600 bg-indigo-50/50'
  },
  {
    id: 'suite-assistant',
    category: 'AI Agents & LLMs',
    icon: Brain,
    title: 'AI Business Assistant Suite',
    description: 'Custom AI agents acting as customer executives, email writers, sales consultants, and technical database query helpers.',
    popular: true,
    features: [
      'AI Sales Representative Agent',
      'AI Smart Inbox Manager',
      'AI Customer Success Copilot',
      'AI Research & Web Scraping Agent',
      'AI Enterprise Knowledge base'
    ],
    deployments: ['Dedicated VPS Only'],
    color: 'border-purple-200 hover:border-purple-400 text-purple-600 bg-purple-50/50'
  },
  {
    id: 'suite-travel',
    category: 'Operations & Support',
    icon: Plane,
    title: 'Travel Business Automation Suite',
    description: 'Travel rates comparisons, booking validations, dynamic quotes layout, and automated email traveler itineraries.',
    popular: false,
    features: [
      'Travel Rate Intelligence Lookups',
      'Outbound Lead Journey Drips',
      'Dynamic PDF Quote Auto-Builder',
      'AI Booking Assistant Chatbots',
      'Post-Booking Validation Sync'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-sky-200 hover:border-sky-400 text-sky-600 bg-sky-50/50'
  },
  {
    id: 'suite-website',
    category: 'CRM & Database',
    icon: Globe,
    title: 'Website Business Automation Suite',
    description: 'Connects standard contact forms to WhatsApp channels, routes customer details to databases, and manages booking schedules.',
    popular: true,
    features: [
      'Contact Form CRM Routing',
      'Form-to-WhatsApp Instants',
      'Calendar Consultation Scheduling',
      'Visitor Traffic Analytics Sync',
      'Admin Lead Management Dashboard'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-violet-200 hover:border-violet-400 text-violet-600 bg-violet-50/50'
  },
  {
    id: 'suite-voice-agent',
    category: 'AI Agents & LLMs',
    icon: Phone,
    title: 'Voice Agent Customer Support Suite',
    description: 'Deploys intelligent, human-like voice agents that handle inbound support calls, qualify customer inquiries, and trigger background CRM workflows automatically.',
    popular: false,
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
    color: 'border-amber-200 hover:border-amber-400 text-amber-700 bg-amber-50/50'
  },
  {
    id: 'suite-billing',
    category: 'Finance & Invoicing',
    icon: Receipt,
    title: 'Quotation & Invoice Automation Suite',
    description: 'Automates price calculations, builds client quotes, generates professional invoices, and syncs payment tracking status across tools.',
    popular: false,
    features: [
      'Dynamic PDF Quotation Auto-Builder',
      'Automated Recurring Invoices & Receipts',
      'Smart Payment Reminder Autopilot',
      'Real-time Accounting & CRM Sync',
      'Multi-Currency Rate Convert Webhooks',
      'Instant WhatsApp Payment Notifications'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-emerald-200 hover:border-emerald-400 text-emerald-700 bg-emerald-50/50'
  }
];

const categories = [
  'All Suites',
  'Outreach & Marketing',
  'CRM & Database',
  'AI Agents & LLMs',
  'Operations & Support',
  'Finance & Invoicing'
];

export default function AIAutomationClient() {
  const [selectedCategory, setSelectedCategory] = useState('All Suites');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // ROI Calculator state
  const [teamSize, setTeamSize] = useState(10);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(12);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Filtered suites
  const filteredSuites = allSuites.filter((suite) => {
    const matchesCat = selectedCategory === 'All Suites' || suite.category === selectedCategory;
    const matchesSearch = suite.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          suite.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          suite.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Calculations
  const hoursSavedPerMonth = Math.round(teamSize * manualHoursPerWeek * 4.3 * 0.75);
  const estimatedMonthlyCostSavingsINR = (hoursSavedPerMonth * 800).toLocaleString('en-IN');

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900 font-sans">
      {/* Interactive Floating Canvas Particle System */}
      <InteractiveParticles density={45} particleColor="mixed" />

      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-purple/5 top-10 right-10 animate-mesh-spin" style={{ animationDuration: '40s' }} />
      <div className="mesh-bg bg-brand-blue/5 bottom-10 left-10 animate-mesh-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />

      {/* HERO SECTION (Compact Top Spacing) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple w-fit shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
              Enterprise AI & Operational Autopilot
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-900">
              Autonomous AI Systems & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue">
                12 Business Automation Suites
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl">
              We design, build, and deploy production-ready AI automation architectures that connect your CRMs, databases, and communication channels—operating 24/7 with zero human fatigue.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/booking"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-brand-purple text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 group hover:scale-[1.02]"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#all-suites-catalog"
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-all duration-300 shadow-sm flex items-center gap-2"
              >
                View 12 Automation Suites
              </a>
            </div>

            {/* Launch Special Offer Strip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-purple/10 via-indigo-500/5 to-brand-blue/10 border border-brand-purple/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-purple/15 border border-brand-purple/30 flex items-center justify-center text-brand-purple flex-shrink-0">
                  <Sparkles className="w-4.5 h-4.5 animate-pulse text-brand-purple" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    🔥 Launch Special: AI Automation Suites Starting at ₹499/-!
                  </span>
                  <span className="text-[11px] text-slate-600 font-light">
                    Deploy 24/7 autonomous workflow pipelines with managed cloud hosting today.
                  </span>
                </div>
              </div>
              <a
                href="#pricing-structure"
                className="px-4 py-2 bg-slate-900 hover:bg-brand-purple text-white font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap self-start sm:self-center"
              >
                Claim Offer <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-2 mt-2 max-w-lg">
              <div>
                <div className="text-xl font-black text-slate-900 font-display">80%+</div>
                <div className="text-[11px] text-slate-500 font-light">Manual Time Saved</div>
              </div>
              <div>
                <div className="text-xl font-black text-brand-blue font-display">&lt;1 Sec</div>
                <div className="text-[11px] text-slate-500 font-light">Webhook Sync Speed</div>
              </div>
              <div>
                <div className="text-xl font-black text-brand-purple font-display">100%</div>
                <div className="text-[11px] text-slate-500 font-light">Client Data Ownership</div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive AI Core & Neural Node Matrix */}
          <div className="lg:col-span-5 w-full relative">
            <InteractiveAiHeroVisual />
          </div>
        </div>
      </section>

      {/* ALL 12 AI SUITES CATALOG (COMPACT CARDS TO REDUCE SCROLLING) */}
      <section id="all-suites-catalog" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 z-10">
        <div className="flex flex-col gap-6 mb-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple">
              Modular Automation Catalog
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              All 12 AI Automation Suites
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl">
              Compact modular architecture cards. Click any suite to explore details or schedule immediate deployment.
            </p>
          </div>

          {/* Search & Category Pills */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64 flex-shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Quick search suites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* 4-COLUMN COMPACT CARDS GRID (Minimal Scrolling) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
          <AnimatePresence mode="popLayout">
            {filteredSuites.map((suite) => {
              const Icon = suite.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={suite.id}
                  whileHover={{ y: -5 }}
                  className={`bg-white/95 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                    suite.popular
                      ? 'border-2 border-brand-purple ring-4 ring-brand-purple/15 shadow-md hover:border-purple-600'
                      : `border ${suite.color}`
                  }`}
                >
                  {suite.popular && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm">
                      Popular
                    </span>
                  )}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center flex-shrink-0 shadow-2xs text-slate-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 font-mono truncate">
                          {suite.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug truncate">{suite.title}</h3>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 font-light leading-normal line-clamp-2">
                      {suite.description}
                    </p>

                    <div className="border-t border-slate-100 pt-2.5 flex flex-col gap-1.5">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Core Features</span>
                      <ul className="flex flex-col gap-1 text-[11px] text-slate-700 font-light">
                        {suite.features.slice(0, 4).map((feat) => (
                          <li key={feat} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[9px] text-slate-400 font-mono">
                      {suite.deployments[0]}
                    </span>

                    <Link
                      href="/booking"
                      className={`px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1 ${
                        suite.popular
                          ? 'bg-slate-900 text-white hover:bg-brand-purple'
                          : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Book <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* PLATFORM PRICING STRUCTURE SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="flex flex-col gap-8">
          {/* Section Header with Currency Toggle (Centered Header + Smaller Toggle Below) */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3 pb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue font-mono">
              PLATFORM PRICING STRUCTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One-Time Setup Configurations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-2xl">
              We charge a single one-time setup fee for developing your suites. Monthly cloud rental or dedicated client VPS hosting models will be discussed during discovery.
            </p>

            {/* Smaller Currency Selector Toggle Below Heading */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/90 flex items-center gap-1 mt-2 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                  currency === 'INR'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇮🇳</span> INR (₹)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 ${
                  currency === 'USD'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇺🇸</span> USD ($)
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const mainPrice = currency === 'INR' 
                ? plan.price 
                : plan.price.replace('₹499', '$6').replace('₹999', '$12').replace('₹1,999', '$24');

              return (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
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

          {/* Early Adopter Launch Benefits Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl border border-white/10 w-full flex flex-col lg:flex-row justify-between items-center gap-8 mt-4">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs text-slate-300 font-light">
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
        </div>
      </section>

      {/* VPS DEPLOYMENT & SETUP MODELS SECTION */}
      <section id="deployment" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple justify-center w-fit shadow-sm">
              <Server className="w-4 h-4 text-brand-purple animate-pulse" />
              Deployment Infrastructure
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              VPS Deployment & Setup Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-2xl">
              We deliver our automation suites as complete, production-ready server setups. We perform the deployment, configure security protocols, and fully train your executive for a smooth hands-off transition.
            </p>
            
            {/* Zero Ongoing Rental Fees Notice (Greenish Theme) */}
            <div className="mt-2 p-5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-brand-blue/10 border border-emerald-300/60 text-xs text-slate-800 rounded-2xl max-w-2xl mx-auto font-light leading-relaxed flex items-start gap-3.5 shadow-2xs text-left">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
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
            {/* Option A Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:border-brand-blue/50 group transition-all relative overflow-hidden"
            >
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

            {/* Option B Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl hover:border-brand-purple/50 group transition-all relative overflow-hidden"
            >
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
      </section>

      {/* INTERACTIVE ROI CALCULATOR */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider text-cyan-400 w-fit">
                <Clock className="w-3.5 h-3.5" /> Impact Calculator
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Calculate Your Team’s <br />
                Automation ROI
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Adjust team size and average hours spent on manual data entry, lead follow-ups, and repetitive task updates to estimate your potential efficiency gains.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Team Size (Operational Staff)</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">{teamSize} Employees</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Manual Hours / Employee / Week</span>
                  <span className="text-cyan-400 font-mono font-bold text-sm">{manualHoursPerWeek} Hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4 backdrop-blur-sm">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Monthly Time Reclaimed</span>
                <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-display">
                  ~{hoursSavedPerMonth} <span className="text-base font-normal text-slate-300">hrs/mo</span>
                </div>
                <p className="text-[11px] text-slate-400 font-light">
                  Equivalent to hiring {Math.max(1, Math.round(hoursSavedPerMonth / 160))} full-time automated operational roles.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4 backdrop-blur-sm">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Est. Value Created</span>
                <div className="text-3xl sm:text-4xl font-black text-purple-300 font-display">
                  ₹{estimatedMonthlyCostSavingsINR}
                </div>
                <p className="text-[11px] text-slate-400 font-light">
                  Based on standardized industry operational wage valuations.
                </p>
              </div>

              <div className="sm:col-span-2 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-white">Ready to automate your team's workflow?</span>
                  <span className="text-xs text-slate-300 font-light">We conduct an end-to-end operational audit in 24 hours.</span>
                </div>
                <Link
                  href="/booking"
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md"
                >
                  Book Audit
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="flex flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple font-mono">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Automation Deployment FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl">
              Everything you need to know about setting up your AI automation suites and server infrastructure.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left mt-4">
            {catalogFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 flex justify-between items-center text-left text-sm font-bold text-slate-900 hover:text-brand-purple transition-colors gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-purple' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-xs text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL EXECUTIVE CTA (Full Width Edge-to-Edge, Flush to Footer) */}
      <section className="relative w-full bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-t border-white/10 py-20 px-4 sm:px-6 lg:px-8 z-10 text-center text-white overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-extrabold uppercase tracking-wider text-purple-300">
            Deploy Your Automation Suite
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
            Ready to Automate Your Business Operations?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
            Schedule a 1-on-1 strategy session with our lead AI automation architects. We'll map out your current tech stack and present a custom blueprint for your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/booking"
              className="px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 group active:scale-95"
            >
              Book Strategy Session Now
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ai-automation-latest"
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              Explore Ad Landing Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
