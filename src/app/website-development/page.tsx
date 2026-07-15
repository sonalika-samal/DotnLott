'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Layers
} from 'lucide-react';

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

export default function WebDevPage() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
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
          <p className="text-sm text-slate-650 font-light leading-relaxed">
            We design and code lightning-fast, high-converting websites and custom web applications. Fully integrated with automated database triggers and client notification hubs.
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
                    href="/quote"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                  >
                    Get Estimate
                  </Link>
                </div>
              </div>
            );
          })}
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
