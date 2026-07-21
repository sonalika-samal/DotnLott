'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveParticles from '@/components/ui/InteractiveParticles';
import InteractiveWebHeroVisual from '@/components/ui/InteractiveWebHeroVisual';
import { 
  Rocket, 
  Briefcase, 
  Cpu, 
  ShoppingCart, 
  Globe, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  ChevronDown,
  Award,
  Zap,
  Gauge,
  Lock,
  Code2,
  Sliders,
  CheckCircle2,
  Clock,
  Layers,
  Server
} from 'lucide-react';

const webPackages = [
  {
    id: 'landing-page',
    type: '🚀 Landing Page Website',
    pages: '1 Page',
    icon: Rocket,
    bgClass: 'bg-indigo-50 border border-indigo-200 text-brand-blue',
    priceINR: '₹2,999',
    priceUSD: '$39',
    popular: false,
    color: 'border-indigo-200 hover:border-brand-blue/60 text-brand-blue',
    features: [
      'Responsive Bespoke Design',
      'Basic On-Page SEO & Schema',
      'Contact Lead Form Integration',
      'WhatsApp Instant Direct Chat',
      'Social Media Links & Meta',
      'Sub-Second Loading Speed',
      '100% Mobile Friendly Layout'
    ],
  },
  {
    id: 'business-site',
    type: '💼 Business Website',
    pages: '5–10 Pages',
    icon: Briefcase,
    bgClass: 'bg-purple-50 border border-purple-200 text-brand-purple',
    priceINR: '₹7,999',
    priceUSD: '$99',
    popular: true,
    color: 'border-purple-200 hover:border-brand-purple/60 text-brand-purple',
    features: [
      'Responsive Bespoke UI Design',
      'Advanced SEO & JSON-LD Schema',
      'Custom Contact & Lead Intake Forms',
      'Google Maps & Location Integration',
      'Instant WhatsApp Chat Direct',
      'SSL Security Certificate Included',
      'Social Media Integration',
      'Photo & Video Work Showcase Gallery',
      'Blog & Article Module Setup',
      'Admin Panel Content Editor'
    ],
  },
  {
    id: 'dynamic-site',
    type: '⚙️ Custom Dynamic Website',
    pages: '10–25 Pages',
    icon: Cpu,
    bgClass: 'bg-emerald-50 border border-emerald-200 text-emerald-600',
    priceINR: '₹12,999',
    priceUSD: '$159',
    popular: false,
    color: 'border-emerald-200 hover:border-emerald-500/60 text-emerald-600',
    features: [
      'Responsive High-Speed Design',
      'Advanced Search Engine Optimization',
      'Custom Admin Control Dashboard',
      'Dynamic Content Management',
      'User Authentication & Login',
      'Database Architecture (Postgres/SQL)',
      'Blog & Publishing Engine',
      'Third-Party API Integrations',
      'Booking & Inquiry Workflows',
      'Google Analytics Dashboard'
    ],
  },
  {
    id: 'ecommerce-site',
    type: '🛒 E-Commerce Website',
    pages: '20–100+ Pages (Products)',
    icon: ShoppingCart,
    bgClass: 'bg-blue-50 border border-blue-200 text-brand-blue',
    priceINR: '₹19,999',
    priceUSD: '$249',
    popular: false,
    color: 'border-blue-200 hover:border-brand-blue/60 text-brand-blue',
    features: [
      'High-Speed Storefront UI',
      'Advanced E-Commerce SEO Architecture',
      'Unlimited Product Catalog Setup',
      'Frictionless Shopping Cart & Checkout',
      'Razorpay / Stripe Payment Gateways',
      'Order & Sales Admin Dashboard',
      'Inventory Stock Management',
      'Customer Account Portals',
      'Coupon & Discount Rule Engine',
      'Shipping Rate Provider Integration',
      'Sales & Conversion Analytics',
      'WhatsApp & Email Order Receipts'
    ],
  },
];

const whyChooseUsPillars = [
  {
    icon: Zap,
    title: 'Sub-Second Speed Guarantee',
    subtitle: '100/100 Google Lighthouse',
    desc: 'Traditional agencies build bloated WordPress sites that take 3-5 seconds to load. We engineer static-rendered Next.js 15 apps cached globally on Cloudflare Edge CDNs for under 0.4s load times.',
    badge: '<0.4s TTFB',
    color: 'border-blue-200 hover:border-brand-blue text-brand-blue bg-blue-50/50'
  },
  {
    icon: Lock,
    title: 'Bank-Grade Security',
    subtitle: 'Zero Plugin Attack Vectors',
    desc: 'WordPress & Wix sites suffer constant plugin hacker bot attacks. Our custom headless architecture contains zero plugin vulnerability vectors, keeping your client database 100% secure.',
    badge: 'DDoS Shielded',
    color: 'border-purple-200 hover:border-brand-purple text-brand-purple bg-purple-50/50'
  },
  {
    icon: Code2,
    title: '100% Code & Data Ownership',
    subtitle: 'Zero Vendor Lock-in',
    desc: 'You receive complete GitHub source code repository transfer and root deployment ownership. No monthly website builder platform lock-ins or mandatory plugin subscription fees.',
    badge: 'Direct Transfer',
    color: 'border-emerald-200 hover:border-emerald-500 text-emerald-600 bg-emerald-50/50'
  }
];

const webFaqs = [
  {
    question: 'How long does it take to design and launch a custom website?',
    answer: 'Standard Landing Pages are completed within 2 to 3 business days, and Business Websites (5-10 pages) within 1 to 2 weeks. Complex Web Applications or E-Commerce engines typically take 2 to 3 weeks.',
  },
  {
    question: 'Do I need to buy my own domain and hosting?',
    answer: 'Yes, we recommend that clients maintain direct ownership of their custom domain and hosting accounts (e.g., Vercel, AWS, Hostinger, or Cloudflare). We will provide complete assistance and execute full setup, DNS configuration, SSL setup, and deployment on your accounts.',
  },
  {
    question: 'Will my website be mobile-responsive and SEO-optimized?',
    answer: 'Absolutely. Every single website developed by DotnLott is built mobile-first, ensuring 100% responsiveness across smartphones, tablets, and desktop displays. We also implement structured metadata, canonical tags, speed optimizations, and clean HTML5 semantics for search engine rankings.',
  },
  {
    question: 'Can you integrate custom APIs, CRM lead forms, and payment gateways?',
    answer: 'Yes. We seamlessly connect custom lead intake forms directly with your internal CRM systems, WhatsApp API endpoints, automated email triggers, and payment gateways like Stripe or Razorpay.',
  },
  {
    question: 'Will I be able to edit page text and images after launch?',
    answer: 'Yes. Depending on your chosen package, we can integrate a visual content management admin panel (CMS) or headless CMS, allowing your internal team to publish blogs, update portfolios, and edit copy effortlessly.',
  },
  {
    question: 'What modern web frameworks and design standards do you use?',
    answer: 'We build web applications using modern, production-grade web technologies focused on sub-second load times, smooth 60fps micro-animations, glassmorphism UI aesthetics, and strict type safety.',
  },
  {
    question: 'What is included in the initial website revision phase?',
    answer: 'Every web project includes dedicated feedback rounds where we fine-tune layouts, copy styling, color palettes, and interactive elements based on your exact feedback before final deployment.',
  },
  {
    question: 'Do you offer ongoing website maintenance and security support?',
    answer: 'Yes. We offer optional annual maintenance contracts (AMC) covering regular software updates, uptime monitoring, security audit logs, content updates, and cloud hosting management.',
  },
];

export default function WebDevServicesClient() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const [projectType, setProjectType] = useState<'landing' | 'fullsite' | 'webapp' | 'ecommerce'>('landing');
  const [hasCms, setHasCms] = useState(true);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const getEstimate = () => {
    let baseTime = '1 to 2 Weeks';
    if (projectType === 'landing') {
      baseTime = '2 to 3 Days';
    } else if (projectType === 'fullsite') {
      baseTime = '1 to 2 Weeks';
    } else if (projectType === 'webapp') {
      baseTime = '2 to 3 Weeks';
    } else if (projectType === 'ecommerce') {
      baseTime = '2 to 3 Weeks';
    }
    return { baseTime };
  };

  const currentEstimate = getEstimate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900 font-sans">
      {/* Canvas Particle System */}
      <InteractiveParticles density={45} particleColor="mixed" />

      {/* Ambient Glows */}
      <div className="mesh-bg bg-brand-blue/5 top-10 right-10 animate-mesh-spin" style={{ animationDuration: '40s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-10 left-10 animate-mesh-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />

      {/* HERO SECTION (100% Identical Spacing & Text Size to AI Automation Page) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple w-fit shadow-sm">
              <Globe className="w-4 h-4 text-brand-purple animate-pulse" />
              Website Design & Web Development
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-900">
              High-Converting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue">
                Websites & Web Apps
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl">
              Transform your business identity. We design fast, sleek, and conversion-engineered corporate websites, landing pages, and bespoke web apps built for sub-second speeds.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/booking"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-brand-purple text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 group hover:scale-[1.02]"
              >
                Book Website Project Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pricing-packages"
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-all duration-300 shadow-sm flex items-center gap-2"
              >
                View Packages & Pricing
              </a>
            </div>

            {/* Launch Special Offer Strip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-purple/10 via-indigo-500/5 to-brand-blue/10 border border-brand-purple/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-purple/15 border border-brand-purple/30 flex items-center justify-center text-brand-purple flex-shrink-0">
                  <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    🔥 Launch Special: Flat 20% OFF on All Packages!
                  </span>
                  <span className="text-[11px] text-slate-600 font-light">
                    Get custom bespoke UI design and sub-second speed with 20% savings today.
                  </span>
                </div>
              </div>
              <Link
                href="/booking"
                className="px-4 py-2 bg-slate-900 hover:bg-brand-purple text-white font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap self-start sm:self-center"
              >
                Claim 20% OFF <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Web Dev Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-2 mt-2 max-w-lg">
              <div>
                <div className="text-xl font-black text-slate-900 font-display">100/100</div>
                <div className="text-[11px] text-slate-500 font-light">Lighthouse Speed</div>
              </div>
              <div>
                <div className="text-xl font-black text-brand-blue font-display">&lt;0.3 Sec</div>
                <div className="text-[11px] text-slate-500 font-light">Sub-Second LCP</div>
              </div>
              <div>
                <div className="text-xl font-black text-brand-purple font-display">100%</div>
                <div className="text-[11px] text-slate-500 font-light">Code Ownership</div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Live Browser IDE Showcase */}
          <div className="lg:col-span-5 w-full relative">
            <InteractiveWebHeroVisual />
          </div>
        </div>
      </section>

      {/* 4 SPECIALIZED WEB PACKAGES & PRICING GRID */}
      <section id="pricing-packages" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 scroll-mt-20">
        <div className="flex flex-col gap-8">
          
          {/* Centered Section Header + Smaller Currency Switcher Below */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3 pb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple shadow-sm">
              <Zap className="w-4 h-4 text-brand-purple animate-bounce" />
              4 Specialized Packages
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Explore Our Web Development Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-2xl">
              Select a high-performance website package engineered to elevate your digital presence with 100% direct source code ownership.
            </p>

            {/* Smaller Currency Toggle Below Heading */}
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

          {/* 4-COLUMN VERTICAL PACKAGE CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {webPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.id}
                  whileHover={{ y: pkg.popular ? -10 : -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`bg-white/95 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between gap-5 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden group ${
                    pkg.popular
                      ? 'border-2 border-brand-purple ring-4 ring-brand-purple/15 shadow-xl lg:-translate-y-2'
                      : `border ${pkg.color}`
                  }`}
                >
                  {/* Top Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-indigo-500 to-brand-purple" />

                  {pkg.popular && (
                    <span className="absolute top-3.5 right-4 bg-gradient-to-r from-brand-blue via-brand-purple to-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md leading-none animate-pulse">
                      Most Popular 🔥
                    </span>
                  )}

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl ${pkg.bgClass} shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5.5 h-5.5" />
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-brand-purple transition-colors font-display">
                        {pkg.type}
                      </h3>
                    </div>

                    <div className={`border rounded-2xl p-3 flex flex-col gap-1 shadow-inner ${pkg.popular ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/90 border-slate-200'}`}>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400 uppercase tracking-wider font-semibold">Scale / Pages</span>
                        <span className="text-brand-purple font-extrabold">{pkg.pages}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-200/60 pt-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-black">Starting Price</span>
                        <span className="text-xl font-black text-slate-900 font-display">
                          {currency === 'INR' ? pkg.priceINR : pkg.priceUSD}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider font-mono">Features Included</span>
                      <ul className="flex flex-col gap-1.5">
                        {pkg.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-slate-700 font-light">
                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/booking"
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4 ${
                      pkg.popular
                        ? 'bg-slate-900 hover:bg-brand-purple text-white'
                        : 'bg-slate-900 hover:bg-brand-blue text-white'
                    }`}
                  >
                    Book Project Call <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADVANCED SECTION 1: WHY CHOOSE DOTNLOTT WEB STUDIO (3 VALUE PILLARS) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple">
              The DotnLott Engineering Advantage
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Businesses Choose DotnLott Web Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-2xl">
              We eliminate the speed penalties, security risks, and monthly plugin costs of traditional website builders like WordPress and Wix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUsPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className={`bg-white/95 backdrop-blur-md rounded-3xl p-8 border flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden ${pillar.color}`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-current">
                        <PillarIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-white px-3 py-1 rounded-full shadow-xs">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                        {pillar.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 font-display leading-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Enterprise Ready
                    </span>
                    <span className="text-slate-400">Next.js 15</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADVANCED SECTION 2: LIGHTHOUSE 100/100 AUDIT INSPECTOR & COMPARISON */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Score Dials */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="text-sm font-mono text-slate-200 font-bold">Lighthouse 100/100 Audit Inspector</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  VERIFIED 100%
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Performance', score: '100', color: 'border-emerald-500 text-emerald-400' },
                  { label: 'Accessibility', score: '100', color: 'border-emerald-500 text-emerald-400' },
                  { label: 'Best Practices', score: '100', color: 'border-emerald-500 text-emerald-400' },
                  { label: 'SEO Score', score: '100', color: 'border-emerald-500 text-emerald-400' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 text-center">
                    <div className={`w-11 h-11 rounded-full border-2 ${item.color} flex items-center justify-center font-mono font-black text-sm`}>
                      {item.score}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-xs text-purple-200 font-light flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>Sub-second page loads directly boost Google Organic Search Rankings and lower Google Ads Cost-Per-Click (CPC).</span>
              </div>
            </div>

            {/* Right Comparison Matrix */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-slate-400 text-xs">
                <span>Technical Vector</span>
                <span className="text-emerald-400 font-bold">DotnLott Custom</span>
                <span className="text-rose-400 font-bold">WordPress / Wix</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-300">DOM Load (LCP)</span>
                <span className="text-emerald-400 font-bold">0.32 seconds</span>
                <span className="text-rose-400 line-through">3.45 seconds</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-300">Security Vulnerability</span>
                <span className="text-emerald-400 font-bold">Zero Plugins</span>
                <span className="text-rose-400 line-through">High Plugin Risk</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-300">Global Edge Distribution</span>
                <span className="text-emerald-400 font-bold">300+ CDN Locations</span>
                <span className="text-rose-400 line-through">Single Origin Server</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-300">Database Ownership</span>
                <span className="text-emerald-400 font-bold">100% Direct Git</span>
                <span className="text-rose-400 line-through">Locked Platform</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ADVANCED SECTION 3: INTERACTIVE PROJECT SCOPE & TIMELINE ESTIMATOR */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-5 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple w-fit">
                <Clock className="w-3.5 h-3.5" /> Interactive Scope Builder
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                Estimate Your Web Project <br />
                Scope & Delivery Timeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Select your project requirements to calculate estimated development schedules and tech stack recommendations.
              </p>

              {/* Project Type Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <label className="text-xs font-bold text-slate-800">Select Website Type</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'landing', label: '🚀 Landing Page (1 Pg)' },
                    { id: 'fullsite', label: '💼 Corporate Site (5-10 Pg)' },
                    { id: 'webapp', label: '⚙️ SaaS Web App' },
                    { id: 'ecommerce', label: '🛒 E-Commerce Store' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id as any)}
                      className={`py-3 px-3.5 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                        projectType === t.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{t.label}</span>
                      {projectType === t.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Timeline Display Card */}
            <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Estimated Schedule</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full">
                    FAST TRACK
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-slate-400 font-mono uppercase">Delivery Timeline</span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">
                    {currentEstimate.baseTime}
                  </span>
                </div>
              </div>

              <Link
                href="/booking"
                className="w-full py-4 rounded-2xl bg-brand-purple hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md text-center flex items-center justify-center gap-2"
              >
                Book Scope Discovery Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* WEB DEVELOPMENT FAQS ACCORDION */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="flex flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple font-mono">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Web Development FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl">
              Everything you need to know about website timelines, domain ownership, and custom integrations.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left mt-4">
            {webFaqs.map((faq, idx) => {
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
            Let’s Build Something Exceptional
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
            Ready to Upgrade Your Digital Presence?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
            Schedule a 1-on-1 strategy and design session with our principal web engineers. We’ll review your brand goals and deliver a comprehensive design roadmap.
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
              href="/web-development-latest"
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
