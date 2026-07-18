'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Cpu,
  Mail,
  CheckCircle,
  Database,
  ArrowRight,
  TrendingUp,
  Clock,
  ThumbsUp,
  Image as ImageIcon
} from 'lucide-react';

export default function PortfolioClient() {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'outbound' | 'ops'>('all');

  const caseStudies = [
    {
      id: 'case-outbound',
      category: 'outbound',
      title: 'Automatic Customer Outreach Tool',
      subtitle: 'Email Lead Generation',
      metrics: {
        metric1: '2,450+',
        label1: 'Found / Week',
        metric2: '28%',
        label2: 'Response Rate',
        metric3: '0.2%',
        label3: 'Bounce Rate',
      },
      summary: 'Finds business details automatically, checks if emails are real, and sends them personalized emails.',
      details: 'Built for a service company. Automatically scans directories, filters out invalid emails, and drafts safe email templates. This ensures your emails go straight to the customer primary inbox instead of the spam folder.',
      source: 'Verified Client Outbound Log: Average response rate across 5 ongoing client campaigns (Q1 2026).',
    },
    {
      id: 'case-ai-support',
      category: 'ai',
      title: 'AI Customer Support Assistant',
      subtitle: 'AI Support Ticket resolution',
      metrics: {
        metric1: '1 min',
        label1: 'Avg Reply Time',
        metric2: '85%',
        label2: 'Drafts Created',
        metric3: '22 hrs',
        label3: 'Weekly Saved Hours',
      },
      summary: 'Reads customer support emails and screenshot pictures, understands the problem, and writes draft answers.',
      details: 'Integrates with support mailboxes. When a customer sends an error photo, the AI automatically reads the picture, looks up the solution, and writes a draft reply. Your team can review it and hit send with one click.',
      source: 'Verified SLA Log: Calculated based on 145 resolved tickets compared to average manual response times (Q1 2026).',
    },
    {
      id: 'case-crm-sync',
      category: 'ops',
      title: 'Calendar Sync for Client Meetings',
      subtitle: 'Google Calendar Sync Tools',
      metrics: {
        metric1: '100%',
        label1: 'Sync Accuracy',
        metric2: '0',
        label2: 'Double Bookings',
        metric3: '4.8 hrs',
        label3: 'Weekly Saved Hours',
      },
      summary: 'Syncs customer databases with team calendars, preventing duplicates and double-bookings.',
      details: 'Connects sales schedules to Google Calendars automatically. Checks customer availability in real-time, blocks slot times, and emails summary metrics to company managers.',
      source: 'Verified Sync Logs: Measured over 1,200 scheduled slots, syncing real-time databases (Q1 2026).',
    },
  ];

  const filteredStudies = activeTab === 'all' ? caseStudies : caseStudies.filter(study => study.category === activeTab);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="mesh-bg bg-brand-blue/5 top-10 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-10 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-blue justify-center w-fit mx-auto shadow-sm">
            <Layers className="w-4 h-4" />
            Our Work Examples
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            How We Save You Time
          </h1>
          <p className="text-sm text-slate-600">
            See examples of the automated tools we build. Look at our sample dashboards and custom support layouts.
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex justify-center gap-2 border-b border-slate-200 pb-4">
          {[
            { id: 'all', name: 'All Examples' },
            { id: 'outbound', name: 'Customer Finder' },
            { id: 'ai', name: 'AI Assistants' },
            { id: 'ops', name: 'Calendar Sync' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'all' | 'ai' | 'outbound' | 'ops')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Mockups Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Customer Outreach Panel Mockup */}
          <div className="glass-card rounded-3xl p-6 flex flex-col gap-4 border-slate-200 bg-white shadow-sm relative overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 text-[9px] px-2 py-0.5 rounded text-brand-blue font-bold uppercase tracking-wider">
              Outreach Dashboard
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-bold text-slate-900">Customer Outreach Dashboard</h3>
              <p className="text-[10px] text-slate-500">Shows how many potential customers were found and contacted</p>
            </div>

            {/* Simulated Live Panel */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/50 p-4 flex flex-col gap-4 font-mono text-[11px] text-slate-800">
              <div className="flex justify-between items-center text-slate-400 border-b border-slate-200/50 pb-2">
                <span>PROJECT: CUSTOMER_FINDER_SG</span>
                <span className="text-emerald-600 flex items-center gap-1 animate-pulse font-bold">
                  ● ACTIVE_SEARCHING
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-slate-800">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-sm">
                  <span className="text-[10px] text-slate-400 block font-sans font-bold">Found</span>
                  <span className="text-sm font-black text-slate-900">2,450</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-sm">
                  <span className="text-[10px] text-slate-400 block font-sans font-bold">Emailed</span>
                  <span className="text-sm font-black text-brand-blue">1,890</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-sm">
                  <span className="text-[10px] text-slate-400 block font-sans font-bold">Bounces</span>
                  <span className="text-sm font-black text-red-500">3</span>
                </div>
              </div>

              {/* Progress Console */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/50 flex flex-col gap-1 text-[10px] text-slate-500 h-28 overflow-y-auto shadow-inner">
                <span className="text-brand-purple font-semibold">[08:42:10] Scanning business directory for &quot;Singapore&quot;...</span>
                <span className="text-brand-blue font-semibold">[08:42:15] Found 14 business profiles. Checking details...</span>
                <span className="text-emerald-600 font-semibold">[08:42:18] Verified email address: contact@singaporetech.sg (Valid)</span>
                <span className="text-slate-400">[08:42:20] Saving details to customer list {"->"} OK</span>
                <span className="text-brand-blue font-semibold">[08:42:21] Outreach message scheduled.</span>
              </div>
            </div>
          </div>

          {/* AI Support Desk Co-Pilot Mockup */}
          <div className="glass-card rounded-3xl p-6 flex flex-col gap-4 border-slate-200 bg-white shadow-sm relative overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-brand-purple/10 border border-brand-purple/20 text-[9px] px-2 py-0.5 rounded text-brand-purple font-bold uppercase tracking-wider">
              AI Assistant
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-bold text-slate-900">AI Customer Support Assistant</h3>
              <p className="text-[10px] text-slate-500">Reads error photos and drafts replies automatically</p>
            </div>

            {/* Split screen simulator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Screen: Client Ticket */}
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-3 flex flex-col gap-2 text-[10px] text-slate-700 shadow-sm">
                <div className="flex justify-between items-center text-slate-400 border-b border-slate-200/60 pb-1 font-bold">
                  <span>CLIENT EMAIL</span>
                  <span className="text-brand-blue">#TKT-9912</span>
                </div>
                <div className="text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900 block">From: client@retail.com</span>
                  &quot;Hi support, my payment checkout page is showing a database failed error (see photo).&quot;
                </div>
                {/* Mock Screenshot */}
                <div className="bg-white border border-slate-200 rounded-lg p-2 flex items-center gap-2 text-slate-500 shadow-sm">
                  <ImageIcon className="w-4 h-4 text-brand-purple" />
                  <span>err_db_lockout.png</span>
                </div>
              </div>

              {/* Right Screen: AI Draft */}
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-3 flex flex-col gap-2 text-[10px] text-slate-700 shadow-sm">
                <div className="flex justify-between items-center text-slate-400 border-b border-slate-200/60 pb-1 font-bold">
                  <span>AI DRAFT COMPOSER</span>
                  <span className="text-emerald-600">98% ACCURACY</span>
                </div>
                <div className="text-slate-700 bg-white border border-slate-200 p-2 rounded-lg leading-relaxed h-20 overflow-y-auto shadow-inner">
                  &quot;Hi customer, I checked your database lock error. This happens when there are too many connections at once. We have increased your server limits. You can try again now!&quot;
                </div>
                <button
                  type="button"
                  className="w-full py-1.5 bg-slate-900 text-white font-bold uppercase rounded text-[9px] hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Send AI Draft
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Case Studies list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="glass-card p-6 rounded-3xl flex flex-col justify-between gap-6 border-slate-200 bg-white shadow-sm group hover:border-brand-purple/20 transition-all"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-wider text-brand-blue font-bold">
                  {study.subtitle}
                </span>
                
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-purple transition-colors">
                  {study.title}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {study.summary}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/50 p-3 rounded-2xl shadow-sm">
                  <div className="text-center border-r border-slate-200">
                    <span className="text-xs font-black text-slate-900 block">{study.metrics.metric1}</span>
                    <span className="text-[8px] text-slate-400 block leading-tight font-sans font-bold">{study.metrics.label1}</span>
                  </div>
                  <div className="text-center border-r border-slate-200">
                    <span className="text-xs font-black text-brand-blue block">{study.metrics.metric2}</span>
                    <span className="text-[8px] text-slate-400 block leading-tight font-sans font-bold">{study.metrics.label2}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-brand-purple block">{study.metrics.metric3}</span>
                    <span className="text-[8px] text-slate-400 block leading-tight font-sans font-bold">{study.metrics.label3}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed mt-2 border-t border-slate-100 pt-4">
                  {study.details}
                </p>
                {study.source && (
                  <p className="text-[9px] text-brand-blue/80 bg-brand-blue/5 border border-brand-blue/10 px-2 py-1 rounded italic mt-2 font-medium">
                    {study.source}
                  </p>
                )}
              </div>
              
              <Link
                href="/booking"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-brand-blue transition-colors group/link mt-2"
              >
                Replicate This Workflow
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
