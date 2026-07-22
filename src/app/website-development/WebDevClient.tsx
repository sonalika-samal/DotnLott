'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Rocket,
  Briefcase,
  Building2,
  ShoppingCart,
  GraduationCap,
  Utensils,
  Plane,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  Layout,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Brain,
  Zap
} from 'lucide-react';
import InteractiveParticles from '@/components/ui/InteractiveParticles';
import MovingShowcaseWebDev from '@/components/ui/MovingShowcaseWebDev';

const pricingData = [
  {
    type: '🚀 Landing Page Website',
    pages: '1 Page',
    icon: Rocket,
    bgClass: 'bg-indigo-50 border border-indigo-200 text-brand-blue',
    startingPrice: '₹2,999',
    features: [
      'Responsive Design',
      'Basic SEO',
      'Contact Form',
      'WhatsApp Chat',
      'Social Media Links',
      'Fast Loading',
      'Mobile Friendly',
    ],
  },
  {
    type: '💼 Business Website',
    pages: '5–10 Pages',
    icon: Briefcase,
    bgClass: 'bg-purple-50 border border-purple-200 text-brand-purple',
    startingPrice: '₹7,999',
    popular: true,
    features: [
      'Responsive Design',
      'Advanced SEO',
      'Contact Forms',
      'Google Maps Integration',
      'WhatsApp Chat',
      'SSL Security',
      'Social Media Integration',
      'Gallery',
      'Blog Setup',
      'Admin Panel',
    ],
  },
  {
    type: '⚙️ Custom Dynamic Website',
    pages: '10–25 Pages',
    icon: Cpu,
    bgClass: 'bg-emerald-50 border border-emerald-200 text-emerald-600',
    startingPrice: '₹12,999',
    features: [
      'Responsive Design',
      'Advanced SEO',
      'Admin Dashboard',
      'Dynamic Content Management',
      'User Login/Registration',
      'Database Integration',
      'Blog/News Module',
      'API Integration',
      'Booking/Inquiry Forms',
      'Analytics Integration',
    ],
  },
  {
    type: '🛒 E-Commerce Website',
    pages: '20–100+ Pages (Products)',
    icon: ShoppingCart,
    bgClass: 'bg-blue-50 border border-blue-200 text-brand-blue',
    startingPrice: '₹19,999',
    features: [
      'Responsive Design',
      'Advanced SEO',
      'Unlimited Products',
      'Shopping Cart',
      'Secure Payment Gateway',
      'Order Management',
      'Inventory Management',
      'Customer Accounts',
      'Coupon & Discount System',
      'Shipping Integration',
      'Analytics Dashboard',
      'WhatsApp & Email Notifications',
    ],
  },
];

const webFaqs = [
  {
    question: 'How long does it take to design and launch a custom website?',
    answer: 'Standard Landing Pages and Business Websites (up to 5 pages) are completed within 5 to 10 business days. Complex Corporate portals or Custom E-Commerce engines typically take 14 to 21 days depending on specific custom integration requirements.',
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

export default function WebDevClient() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const getPriceDisplay = (priceInr: string) => {
    if (currency === 'INR') return priceInr;
    if (priceInr.includes('2,999')) return '$39';
    if (priceInr.includes('7,999')) return '$99';
    if (priceInr.includes('12,999')) return '$159';
    if (priceInr.includes('19,999')) return '$249';
    return priceInr;
  };

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
              <Globe className="w-4 h-4 animate-pulse text-brand-blue" />
              Website Design & Web Development
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-slate-900"
            >
              High-Converting<br />
              <span className="bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue bg-clip-text text-fill-transparent drop-shadow-sm">
                Websites & Web Apps
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
            >
              Transform your business identity. We design fast, sleek, and conversion-engineered corporate websites, landing pages, and bespoke web apps built for sub-second speeds.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="/contact?booking=true#calendar-booking"
                scroll={false}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
              >
                Book Website Project Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#pricing-grid"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-700 glass-card hover:glass-card-hover rounded-full transition-colors"
              >
                View Packages & Pricing
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
                    🔥 Launch Special: Flat 20% OFF on All Web Development Packages!
                  </span>
                  <span className="text-[11px] text-slate-655 font-light mt-0.5 leading-normal">
                    Get custom bespoke UI design, lightning speed, and mobile responsiveness with 20% savings today.
                  </span>
                </div>
              </div>
              <Link
                href="/contact?booking=true#calendar-booking"
                scroll={false}
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
              Hey! I am Floto. Let&apos;s build a stunning, high-speed website to elevate your brand presence online! 🚀
            </motion.div>

            <div className="relative w-72 h-72 sm:w-80 sm:h-80 animate-float flex items-center justify-center">
              {/* Floating Service Bubbles */}
              
              {/* Bubble 1: High-Speed Web */}
              <div className="absolute -left-12 sm:-left-24 top-[15%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-slow hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-sm">
                  <Zap className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">ULTRA-FAST</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">FAST LOADING</span>
                </div>
              </div>

              {/* Bubble 2: SEO Ready */}
              <div className="absolute -right-2 sm:-right-10 top-[40%] z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-medium hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">100% SEO</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">READY</span>
                </div>
              </div>

              {/* Bubble 3: Bespoke UI */}
              <div className="absolute -left-2 sm:-left-10 bottom-10 z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-lg px-4 py-3 rounded-2xl animate-float-fast hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shadow-sm">
                  <Layout className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase font-display leading-none">BESPOKE</span>
                  <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase font-display mt-0.5 leading-none">DESIGN UI</span>
                </div>
              </div>

              <Image
                src="/mascot-v4.png"
                alt="DotnLott Web Dev Mascot"
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

        {/* Pricing Cards Section - 4 Columns Vertical Lively Animated Grid */}
        <div id="pricing-grid" className="flex flex-col gap-8 w-full scroll-mt-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full border-b border-slate-200/80 pb-6">
            <div className="text-center md:text-left flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple shadow-sm w-fit mx-auto md:mx-0">
                <Zap className="w-4 h-4 text-brand-purple animate-bounce" />
                4 Specialized Packages
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
                Explore Our Web Development Solutions
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-light max-w-2xl leading-relaxed">
                Select a high-performance website package engineered to elevate your digital presence.
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

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            {pricingData.map((item, index) => {
              const IconComp = item.icon;

              return (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: item.popular ? -12 : -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`bg-white/95 backdrop-blur-md border rounded-3xl p-6 flex flex-col justify-between gap-5 transition-all duration-300 relative overflow-hidden group ${
                    item.popular
                      ? 'border-brand-purple/80 ring-2 ring-brand-purple/30 shadow-xl lg:-translate-y-3'
                      : 'border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-brand-purple/50'
                  }`}
                >
                  {/* Top Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-indigo-500 to-brand-purple" />

                  {item.popular && (
                    <span className="absolute top-3.5 right-4 bg-gradient-to-r from-brand-blue via-brand-purple to-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md leading-none animate-pulse">
                      Most Popular 🔥
                    </span>
                  )}

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${item.bgClass} shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp className="w-6 h-6" />
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-brand-purple transition-colors">
                        {item.type}
                      </h3>
                    </div>

                    <div className={`border rounded-2xl p-3.5 flex flex-col gap-1.5 shadow-inner ${item.popular ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50/90 border-slate-200'}`}>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400 uppercase tracking-wider font-semibold">Scale / Pages</span>
                        <span className="text-brand-purple font-extrabold">{item.pages}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-200/60 pt-1.5">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-black">Starting Price</span>
                        <span className="text-xl font-black text-slate-900 font-display">{getPriceDisplay(item.startingPrice)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-grow border-t border-slate-100 pt-4">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Features Included:</span>
                      <ul className="flex flex-col gap-1.5">
                        {item.features?.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-light leading-snug">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/contact?booking=true#calendar-booking"
                    scroll={false}
                    className={`w-full text-center py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all mt-auto flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                      item.popular
                        ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:brightness-110'
                        : 'bg-slate-900 hover:bg-brand-blue text-white'
                    }`}
                  >
                    Select Package
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Early Adopter Launch Benefits Banner (Dark Action Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/10 w-full flex flex-col lg:flex-row justify-between items-center gap-8 max-w-5xl mx-auto mt-6"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10 flex-grow text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-brand-purple w-fit">
                🚀 Launch Promotions
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white leading-tight">
                Early Adopter Launch Benefits
              </h2>
              <p className="text-xs text-slate-350 leading-relaxed font-light max-w-xl">
                Lock in promotional rates by booking during our launch window. Clients are recommended to have their own domain and hosting updated, compatible, and purchased as per the type of websites they need. We will provide full-cycle website design, development, and setup services.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span className="text-brand-blue font-bold">Flat 20% OFF All Packages</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Own Domain & Hosting Recommended</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Custom UI/UX & Responsive Layouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Sub-second Page Speeds</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% SEO Structure Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Full Post-Launch Handover</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center justify-between gap-4 w-full lg:w-80 flex-shrink-0 backdrop-blur-sm relative z-10">
              <span className="text-[10px] text-slate-450 uppercase tracking-widest font-bold">Book Consultation Today</span>
              <h3 className="text-xl font-black text-white leading-tight">Design Discovery Call</h3>
              <p className="text-[11px] text-slate-400 font-light max-w-[220px]">
                Discuss your project scope & claim your 20% discount.
              </p>
              <Link
                href="/contact?booking=true#calendar-booking"
                scroll={false}
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-105"
              >
                Book Call Now
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </motion.div>
        </div>


        {/* FAQ Accordion Section */}
        <div className="pt-16 flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Help & Guidance</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Web Development FAQ
            </h2>
            <p className="text-sm text-slate-655 font-light leading-relaxed">
              Answers to common queries regarding timelines, domains, hosting, and SEO optimization.
            </p>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3.5">
            {webFaqs.map((faq, idx) => {
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

      {/* Full Width Executive Development Architecture Section (Zero side padding, zero gap with footer) */}
      <section className="relative pt-10 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white z-10 overflow-hidden border-t border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold uppercase tracking-widest text-brand-purple">
              <Brain className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
              Executive Development Architecture
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Sub-Second Speed Guarantee
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Why High-Performance Web Development Matters
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Modern web applications serve as the primary conversion engine for digital businesses. By building bespoke web applications engineered with clean code architecture, instant page transitions, and structured search engine metadata, corporate brands eliminate bounce rates, increase visitor conversion rates, and build long-term digital authority.
          </p>

          {/* Key Value Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            {[
              { title: 'Sub-Second Load', desc: 'Optimized asset delivery' },
              { title: '100% SEO Ready', desc: 'Structured schema markup' },
              { title: 'Mobile First', desc: 'Responsive across all devices' },
              { title: 'Zero Bloatware', desc: 'Clean bespoke code' },
            ].map((pill, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex flex-col gap-1 backdrop-blur-xs text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" />
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
