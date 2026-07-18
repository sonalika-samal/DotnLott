'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Layout,
  ShoppingBag,
  Cpu,
  Wrench,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  ChevronDown
} from 'lucide-react';

const webDevFaqs = [
  {
    question: 'How long does a custom website development project take?',
    answer: 'A standard custom business website takes 2 to 4 weeks, while complex web applications with database integrations and client portals typically take 4 to 8 weeks depending on the scope.',
  },
  {
    question: 'Do you build custom ecommerce systems?',
    answer: 'Yes. We build high-performance custom ecommerce storefronts using next-generation headless CMS architectures, connecting secure payment APIs like Razorpay, Stripe, and custom inventory databases.',
  },
  {
    question: 'What are the benefits of custom code over WordPress or Shopify?',
    answer: 'Custom Next.js sites provide near-instant loading speeds, higher conversion rates, robust security, and absolute design freedom. Furthermore, they are fully custom-integrated with automated database triggers and client notification hubs.',
  },
];

const services = [
  {
    icon: Layout,
    title: 'Business & Brand Websites',
    description: 'Clean, elegant, responsive websites crafted to represent your business core identity, display services, and capture organic leads.',
    features: [
      'Tailored custom design systems',
      'Fully responsive & fluid layouts',
      'Contact form database routing',
      'SEO audit & keywords mapping',
      'Vibrant visual micro-animations'
    ],
    color: 'border-blue-200 hover:border-brand-blue/40'
  },
  {
    icon: Globe,
    title: 'Corporate Web Portals',
    description: 'Secure, multi-page platforms for medium and large enterprises. Structured layout hierarchies, admin dashboards, and custom user portals.',
    features: [
      'Multi-level navigation logic',
      'Enterprise speed optimizations',
      'GDPR compliance privacy configurations',
      'Custom API & analytics dashboards',
      'Multiple user permissions'
    ],
    color: 'border-purple-200 hover:border-brand-purple/40'
  },
  {
    icon: Sparkles,
    title: 'High-Converting Landing Pages',
    description: 'Performance-engineered landing pages built with clear layout visual cues to maximize marketing conversion metrics.',
    features: [
      'A/B testable structures',
      'Optimized above-the-fold CTA blocks',
      'Ultra-fast page load metrics (<1.2s)',
      'Ad campaign tracking scripts',
      'Clean forms & WhatsApp integrations'
    ],
    color: 'border-rose-200 hover:border-rose-500/40'
  },
  {
    icon: ShoppingBag,
    title: 'Custom E-commerce Platforms',
    description: 'Bespoke online store configurations matching complex catalogs, payment portals, delivery trackers, and discount structures.',
    features: [
      'Secure checkout integrations',
      'Inventory control sheets mapping',
      'Custom client checkout receipts',
      'Automated review request emails',
      'WhatsApp shipping tracking codes'
    ],
    color: 'border-emerald-200 hover:border-emerald-500/40'
  },
  {
    icon: Cpu,
    title: 'Custom Web Applications',
    description: 'Bespoke React/Next.js dynamic dashboards, portal directories, customer CRM tools, and business workflows portals.',
    features: [
      'Dynamic database records mapping',
      'Client file upload & file servers',
      'Real-time operations updates',
      'Automated email/SMS triggers',
      'Robust API endpoint hooks'
    ],
    color: 'border-amber-200 hover:border-amber-500/40'
  },
  {
    icon: Wrench,
    title: 'Website Maintenance & SLA',
    description: 'Scheduled weekly safety backups, plugin checks, server configurations maintenance, security compliance audits, and performance tuning.',
    features: [
      'Weekly automated backup sweeps',
      'Plugin stability & updates audit',
      'SSL cert check & renewing alerts',
      'Broken link checking & correction',
      'Continuous loading speed monitors'
    ],
    color: 'border-indigo-200 hover:border-indigo-500/40'
  },
  {
    icon: RefreshCw,
    title: 'Website Redesigns',
    description: 'Modernize legacy HTML websites, clean up layout blocks, rebuild with fast modern frameworks, and retain critical historical SEO URLs.',
    features: [
      'Complete look-and-feel revamp',
      'Clean responsiveness code rewrite',
      'Old URL 301 redirection maps',
      'Lighthouse speed score boosts',
      'Modern interactive assets setup'
    ],
    color: 'border-teal-200 hover:border-teal-500/40'
  }
];

export default function WebDevClient() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Mesh glow layers */}
      <div className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '32s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 left-10 animate-mesh-spin" style={{ animationDuration: '42s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
            <Globe className="w-4 h-4 text-brand-blue animate-spin" style={{ animationDuration: '10s' }} />
            Web Engineering
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            High-Performance Web Development
          </h1>
        </div>

        {/* Definition Block */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm max-w-4xl mx-auto flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-display">What is Custom Website Development?</h2>
          <p className="text-xs text-slate-655 leading-relaxed font-light">
            Custom website development is the process of building tailored, high-performance web applications and business portfolios using custom code rather than generic page builders. By writing modular frameworks like Next.js and React, we deliver sub-second loading speeds, advanced animations, and superior SEO architecture tailored to your brand identity.
          </p>
        </div>

        {/* Services Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {services.map((svc) => {
            const IconComp = svc.icon;
            return (
              <div
                key={svc.title}
                className={`bg-white border rounded-3xl p-8 flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm hover:shadow-md group ${svc.color}`}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-550 leading-relaxed font-light">
                      {svc.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 mt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Scope Checklist:</span>
                    <ul className="flex flex-col gap-2">
                      {svc.features.map((feat) => (
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
                    Consult Design <ArrowRight className="w-3.5 h-3.5" />
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

        {/* FAQ Accordion Section */}
        <div className="border-t border-slate-200 pt-16 flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Help & Support</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Web Development FAQ
            </h2>
            <p className="text-sm text-slate-655 font-light leading-relaxed">
              Find answers to common questions about timelines, headless e-commerce, and development technologies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            {webDevFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-250/70 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <h3 className="m-0 p-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/55 transition-colors border-0 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs font-bold text-slate-900 leading-snug">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Web App Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/15 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/10 border border-white/10 text-[9px] uppercase tracking-wider font-bold text-brand-blue leading-none w-fit">
                Next-Gen Frameworks
              </span>
              <h3 className="text-xl md:text-2xl font-bold">Need a Custom Web Portal or CRM dashboard?</h3>
              <p className="text-xs text-slate-350 leading-relaxed font-light">
                We design and build bespoke Next.js and React portals with customized database syncing, user permissions, file servers, and WhatsApp automation triggers.
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-colors rounded-xl flex-shrink-0 shadow-lg"
            >
              Configure Custom App
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
