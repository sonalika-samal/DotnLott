'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  Plus,
  Check,
  Sparkles,
  Calculator,
  Cpu,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

const suites = [
  {
    id: 'suite-email',
    icon: Mail,
    title: 'Email Marketing Automation Suite',
    description: 'Autonomous prospecting, validation, outbound cold email outreach, follow-up sequencing, and primary inbox warmups.',
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
    color: 'border-blue-200 hover:border-brand-blue/40'
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
    color: 'border-purple-200 hover:border-brand-purple/40'
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
    color: 'border-rose-200 hover:border-rose-450/40'
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
    color: 'border-cyan-200 hover:border-cyan-450/40'
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
    color: 'border-emerald-200 hover:border-emerald-500/40'
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
    color: 'border-amber-200 hover:border-amber-500/40'
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
      'Zoho/Salesforce Sync Drivers',
      'Daily Call Metrics Summary',
      'Database Backup Archivers'
    ],
    deployments: ['Managed Cloud', 'Dedicated VPS'],
    color: 'border-indigo-200 hover:border-indigo-500/40'
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
    color: 'border-teal-200 hover:border-teal-500/40'
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
    color: 'border-sky-200 hover:border-sky-500/40'
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
    color: 'border-violet-200 hover:border-violet-500/40'
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
      'Try 1 hero automation each from every Automation Suite (all 10)',
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

export default function CatalogPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Ambient backgrounds */}
      <div className="mesh-bg bg-brand-purple/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s' }} />
      <div className="mesh-bg bg-brand-blue/5 bottom-10 left-10 animate-mesh-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
            <Cpu className="w-4 h-4 animate-pulse text-brand-blue" />
            AI Automation Solutions
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Our Enterprise Automation Suites
          </h1>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Eliminate operational overhead. Our modular, secure, and production-tested Automation Suites group specialized scripts to keep your sales pipelines, support desks, and marketing channels running at max efficiency.
          </p>
        </div>

        {/* Grid of 10 Suites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {suites.map((suite) => {
            const IconComponent = suite.icon;

            return (
              <div
                key={suite.id}
                className={`bg-white border rounded-3xl p-8 flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm hover:shadow-md group ${suite.color}`}
              >
                <div className="flex flex-col gap-4">
                  {/* Card top banner */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {suite.deployments.map((dep) => (
                        <span
                          key={dep}
                          className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-wider"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-brand-blue transition-colors">
                      {suite.title}
                    </h3>
                    <p className="text-xs text-slate-555 leading-relaxed font-light">
                      {suite.description}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 mt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Features Included:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {suite.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-1.5 text-xs text-slate-650 font-light">
                          <span className="w-1 h-1 bg-brand-blue rounded-full flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-2">
                  <Link
                    href="/booking"
                    className="text-xs font-bold text-slate-450 hover:text-brand-blue transition-colors flex items-center gap-1"
                  >
                    Consult Expert <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Automation Option Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden mt-8 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/15 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/10 border border-white/10 text-[9px] uppercase tracking-wider font-bold text-brand-blue leading-none w-fit">
                Bespoke Design
              </span>
              <h3 className="text-xl md:text-2xl font-bold">Need a Custom Automation Suite?</h3>
              <p className="text-xs text-slate-350 leading-relaxed font-light">
                Do you have proprietary databases, legacy software, or unique operational flows? We build custom triggers and API integrations matching your business guidelines.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-300 mt-1 font-light">
                {['HR & Payroll', 'Finance Ledger Sync', 'CRM Pipeline Routing', 'Logistics Dispatch Alerts', 'Healthcare Records Backup', 'Real Estate Listings Sync'].map((ex) => (
                  <span key={ex} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-colors rounded-xl flex-shrink-0 shadow-lg"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Pricing Solutions Section */}
        <div className="border-t border-slate-200 pt-16 mt-12 flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Platform Pricing Structure</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              One-Time Setup Configurations
            </h2>
            <p className="text-sm text-slate-650 font-light leading-relaxed">
              We charge a single one-time setup fee for developing your suites. Monthly cloud rental or dedicated client VPS hosting models will be discussed during discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white border rounded-3xl p-8 flex flex-col justify-between gap-8 relative shadow-sm hover:shadow-md transition-all ${
                  plan.popular ? 'border-brand-purple/45 ring-1 ring-brand-purple/20' : 'border-slate-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md leading-none">
                    Most Popular
                  </span>
                )}

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 font-light leading-normal">{plan.desc}</p>
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-2xl font-black text-slate-900 leading-none">{plan.price}</span>
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{plan.subPrice}</span>
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
                  className={`w-full py-3 text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-950">Rates Locked For Early Adopters</span>
                <p className="text-[10px] text-slate-500 font-light">Get custom solutions locked at special pilot prices for 12 full months.</p>
              </div>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-[10px] rounded-xl transition-colors shadow-sm"
            >
              Talk to Sales <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
