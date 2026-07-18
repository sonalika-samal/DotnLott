'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, Search, ArrowRight, Sparkles } from 'lucide-react';

const articles = [
  {
    title: 'How to Automate Zoho CRM and n8n to Boost B2B Sales',
    category: 'Automation',
    readTime: '5 min read',
    date: 'July 12, 2026',
    description: 'Learn the exact system architecture used to synchronize contact logs, qualify leads, and trigger outreach tasks automatically.',
    glow: 'hover:border-brand-blue/30',
  },
  {
    title: 'WhatsApp API Automation: Driving 28% Response Rates in India',
    category: 'Outreach',
    readTime: '4 min read',
    date: 'June 28, 2026',
    description: 'Discover how trigger-based WhatsApp notifications qualify leads in under 5 minutes compared to standard email templates.',
    glow: 'hover:border-emerald-500/30',
  },
  {
    title: 'Why Headless Commerce Beats Shopify for High-Traffic Brands',
    category: 'Web Dev',
    readTime: '6 min read',
    date: 'May 15, 2026',
    description: 'An engineering deep-dive into page load speeds, SEO indexability, and payment API integrations.',
    glow: 'hover:border-brand-purple/30',
  },
  {
    title: 'Vector Databases & RAG: How We Build Secure AI Assistants',
    category: 'AI & Data',
    readTime: '8 min read',
    date: 'April 20, 2026',
    description: 'Explore how semantic vector mappings and database structures keep company data secure during LLM reasoning runs.',
    glow: 'hover:border-rose-500/30',
  },
];

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Automation', 'Outreach', 'Web Dev', 'AI & Data'];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Background glow layers */}
      <div className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '35s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 left-10 animate-mesh-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
            <BookOpen className="w-4 h-4 text-brand-blue animate-pulse" />
            Resources Hub
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Our Business Blog & Resources
          </h1>
          <p className="text-sm text-slate-650 font-light leading-relaxed">
            Read our engineering articles and operational tutorials on workflow automation, AI deployments, and high-performance React applications.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-brand-purple/40 shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((art, idx) => (
              <div
                key={idx}
                className={`bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm hover:shadow-md group ${art.glow}`}
              >
                <div className="flex flex-col gap-4">
                  {/* Article Metadata banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <span className="px-2.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-650 uppercase tracking-widest leading-none">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-light">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {art.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {art.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-purple transition-colors leading-tight">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {art.description}
                    </p>
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-brand-blue transition-colors group/link mt-2"
                >
                  Read Article & Discuss Implementation
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto flex flex-col gap-3 shadow-sm">
            <span className="text-sm font-bold text-slate-800">No articles found</span>
            <p className="text-xs text-slate-500 font-light">We couldn&apos;t find any articles matching your search query. Try another keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}
