'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Check,
  Sparkles,
  Calculator,
  Mail,
  Users,
  Briefcase,
  Layers,
  Database,
  Cpu
} from 'lucide-react';

// Layman-friendly catalog descriptions and names
const catalogItems = [
  // MARKETING
  {
    id: 'mkt-out-in',
    category: 'marketing',
    title: 'Automatic Customer Finder (India)',
    description: 'Finds business details in Indian cities and sends them friendly emails about your services automatically.',
    tags: ['Find Customers', 'Emails'],
    hasAI: true,
  },
  {
    id: 'mkt-out-ab',
    category: 'marketing',
    title: 'Automatic Customer Finder (Global)',
    description: 'Finds business details in cities worldwide and sends them emails tailored to their location.',
    tags: ['Find Customers', 'Global'],
    hasAI: true,
  },
  {
    id: 'mkt-fol-in',
    category: 'marketing',
    title: 'Smart Email Follow-Ups (India)',
    description: 'Sends gentle reminders to Indian business contacts who did not reply to your first email, helping you get more answers.',
    tags: ['Follow-ups'],
    hasAI: false,
  },
  {
    id: 'mkt-fol-ab',
    category: 'marketing',
    title: 'Smart Email Follow-Ups (Global)',
    description: 'Sends reminders to global business contacts at the best time for their local timezone.',
    tags: ['Follow-ups', 'Global'],
    hasAI: false,
  },
  {
    id: 'mkt-hyg',
    category: 'marketing',
    title: 'Invalid Email Filter',
    description: 'Checks for bad or fake email addresses and removes them so your business email score stays safe.',
    tags: ['Email Safety'],
    hasAI: false,
  },
  {
    id: 'mkt-warm-send',
    category: 'marketing',
    title: 'Email Delivery Helper - Simulation',
    description: 'Sends automatic test emails between your accounts to show email systems that your address is safe and trusted.',
    tags: ['Deliverability'],
    hasAI: true,
  },
  {
    id: 'mkt-warm-rep',
    category: 'marketing',
    title: 'Email Delivery Helper - Auto-Replies',
    description: 'Reads and replies to test emails automatically, moving them to the primary inbox to stop them from going to spam.',
    tags: ['Deliverability'],
    hasAI: true,
  },
  {
    id: 'mkt-warm-clean',
    category: 'marketing',
    title: 'Email Delivery Helper - Inbox Cleaner',
    description: 'Cleans up test emails automatically so your active inbox stays organized.',
    tags: ['Deliverability'],
    hasAI: false,
  },
  {
    id: 'mkt-lead-route',
    category: 'marketing',
    title: 'Instant Interested Lead Notifier',
    description: 'Alerts your team immediately when a customer replies with interest, helping you respond faster.',
    tags: ['Instant Alerts'],
    hasAI: true,
  },
  {
    id: 'mkt-soc-drive',
    category: 'marketing',
    title: 'Social Media Post Scheduler',
    description: 'Takes pictures and videos from your Google Drive and posts them to your Facebook, Instagram, and LinkedIn.',
    tags: ['Social Media'],
    hasAI: false,
  },
  {
    id: 'mkt-soc-thought',
    category: 'marketing',
    title: 'Daily Branding Posting Tool',
    description: 'Regularly posts interesting quotes and branding pictures to keep your social pages active.',
    tags: ['Social Media'],
    hasAI: false,
  },
  {
    id: 'mkt-soc-promo',
    category: 'marketing',
    title: 'Sales & Promo Post Autopilot',
    description: 'Drafts and publishes promotional pictures and captions to attract new customers on social media.',
    tags: ['Social Media'],
    hasAI: false,
  },
  {
    id: 'mkt-soc-art',
    category: 'marketing',
    title: 'AI News Post Scheduler',
    description: 'Reads daily news in your industry, writes a summary, and posts it to your social media accounts automatically.',
    tags: ['Social Media', 'AI Assistant'],
    hasAI: true,
  },
  {
    id: 'mkt-soc-wel',
    category: 'marketing',
    title: 'New Client Welcome Poster',
    description: 'Automatically creates welcome designs for new customers and posts them to LinkedIn, tagging their profiles.',
    tags: ['Social Media'],
    hasAI: false,
  },
  {
    id: 'mkt-soc-car',
    category: 'marketing',
    title: 'Multi-Image Carousel Manager',
    description: 'Groups multiple pictures into a single carousel slide post (like a swipeable post) automatically based on their filenames.',
    tags: ['Social Media'],
    hasAI: false,
  },
  {
    id: 'mkt-ad-camp',
    category: 'marketing',
    title: 'Meta Ads Manager Autopilot',
    description: 'Sets up and updates your Facebook and Instagram ad campaigns automatically based on your updates.',
    tags: ['Ads'],
    hasAI: false,
  },
  {
    id: 'mkt-fb-feedback',
    category: 'marketing',
    title: 'Social Page Performance Reviewer',
    description: 'Evaluates your social media posts every week, rates their success, and suggests an AI action plan.',
    tags: ['Social Media'],
    hasAI: true,
  },
  {
    id: 'mkt-trav-arb',
    category: 'marketing',
    title: 'Smart Travel Business Analyzer',
    description: 'Compares travel rates and destinations automatically, scoring popular locations to find the best business deals.',
    tags: ['API Sync', 'Data Lookup'],
    hasAI: true,
  },
  {
    id: 'mkt-meta-lead',
    category: 'marketing',
    title: 'WhatsApp & Email Lead Responder',
    description: 'Connects with ad forms to send instant WhatsApp messages, alerts your team, and uses AI to answer customer questions.',
    tags: ['WhatsApp', 'Replies'],
    hasAI: true,
  },

  // CLIENT MANAGEMENT
  {
    id: 'cli-feed-new',
    category: 'client',
    title: 'New Client Feedback Auditor',
    description: 'Sends email questionnaires to new customers 15 days after onboarding to ask how they like your service.',
    tags: ['Retention'],
    hasAI: false,
  },
  {
    id: 'cli-rev-new',
    category: 'client',
    title: 'Google Review Request Emailer',
    description: 'Sends email requests asking new customers to share a positive Google review for your business.',
    tags: ['Reviews'],
    hasAI: false,
  },
  {
    id: 'cli-rev-ren',
    category: 'client',
    title: 'Google Review Request (Renewed)',
    description: 'Emails renewal customers, asking them for Google reviews shortly after they renew their contract.',
    tags: ['Reviews'],
    hasAI: false,
  },
  {
    id: 'cli-rec',
    category: 'client',
    title: 'Past Client Reconnect Tool',
    description: 'Sends friendly monthly check-ins and special offers to past clients to bring them back.',
    tags: ['Re-engage'],
    hasAI: false,
  },
  {
    id: 'cli-non-ren',
    category: 'client',
    title: 'Contract Renewal Reminders',
    description: 'Follows up automatically with clients whose contracts are expiring soon, offering renewal discounts.',
    tags: ['Re-engage'],
    hasAI: false,
  },
  {
    id: 'cli-sla-health',
    category: 'client',
    title: 'Client Happiness Check-ins',
    description: 'Sends customer satisfaction surveys 3 and 9 months after checkout to catch and resolve issues early.',
    tags: ['Retention'],
    hasAI: false,
  },
  {
    id: 'cli-res-check',
    category: 'client',
    title: 'Partner Referral Collector',
    description: 'Emails your business partners and resellers automatically to ask for new customer leads monthly.',
    tags: ['Partnerships'],
    hasAI: false,
  },
  {
    id: 'cli-ref-rem',
    category: 'client',
    title: 'Referral Rewards Reminder',
    description: 'Reminds active clients that they can earn cash rewards by recommending your business to others.',
    tags: ['Partnerships'],
    hasAI: false,
  },
  {
    id: 'cli-ref-ack',
    category: 'client',
    title: 'Referral Confirmation Tracker',
    description: 'Sends a thank-you email immediately when someone submits a referral and updates them on their reward status.',
    tags: ['Partnerships'],
    hasAI: false,
  },
  {
    id: 'cli-help-ai',
    category: 'client',
    title: 'AI Customer Support Assistant',
    description: 'Reads support emails and screenshots, drafts helpful solutions using your resources, and alerts your team for approval.',
    tags: ['AI Support', 'Helpdesk'],
    hasAI: true,
  },

  // OFFICE MANAGEMENT
  {
    id: 'off-shift',
    category: 'office',
    title: 'Team Schedule Reminder',
    description: 'Sends daily reminders to employees to tell them what support shifts they are scheduled for today.',
    tags: ['Team Ops'],
    hasAI: false,
  },
  {
    id: 'off-unread',
    category: 'office',
    title: 'SLA Ticket Deadline Alert',
    description: 'Pings employees if support tickets remain unanswered, ensuring customer questions do not get neglected.',
    tags: ['Team Ops'],
    hasAI: false,
  },
  {
    id: 'off-tasks',
    category: 'office',
    title: 'Daily Employee Task Checklists',
    description: 'Emails each employee their active, pending, and overdue tasks every morning.',
    tags: ['Team Ops'],
    hasAI: false,
  },
  {
    id: 'off-n8n-back',
    category: 'office',
    title: 'Nightly System Safety Backup',
    description: 'Saves backup copies of your automation systems automatically every night so your configurations are always safe.',
    tags: ['Safety'],
    hasAI: false,
  },
  {
    id: 'off-n8n-clean',
    category: 'office',
    title: 'Old Backups Cleaner',
    description: 'Deletes old system backup files automatically every week to keep storage clean and save cost.',
    tags: ['Safety'],
    hasAI: false,
  },
  {
    id: 'off-ticket-due',
    category: 'office',
    title: 'AppScript Ticket Tracker',
    description: 'Checks customer sheets and emails the team immediately when a task is past its due date.',
    tags: ['Google Sheets'],
    hasAI: false,
  },
  {
    id: 'off-leave',
    category: 'office',
    title: 'Leave Tracker Emailer',
    description: 'Checks staff absent sheets daily and emails a team availability summary to management.',
    tags: ['Google Sheets'],
    hasAI: false,
  },
  {
    id: 'off-follow',
    category: 'office',
    title: 'Overdue Task Reminder',
    description: 'Checks spreadsheets for outstanding client follow-up dates and emails daily alerts.',
    tags: ['Google Sheets'],
    hasAI: false,
  },

  // CRM
  {
    id: 'crm-leak',
    category: 'crm',
    title: 'Forgotten Deal Alert',
    description: 'Checks your sales database for customer files that have not been updated recently and reminds the owner.',
    tags: ['Pipeline'],
    hasAI: false,
  },
  {
    id: 'crm-rep',
    category: 'crm',
    title: 'Weekly & Monthly Reports Builder',
    description: 'Compiles sales totals and emails performance reports directly to management weekly and monthly.',
    tags: ['Analytics'],
    hasAI: false,
  },
  {
    id: 'crm-zoho',
    category: 'crm',
    title: 'Calendar Meeting Sync',
    description: 'Automatically syncs customer database meetings with Google Calendars, preventing duplicate blocks.',
    tags: ['Sync Tools'],
    hasAI: false,
  },
  {
    id: 'crm-eod',
    category: 'crm',
    title: 'Daily Call Summary Builder',
    description: 'Counts phone calls dialed by each team member and emails comparison graphs to management.',
    tags: ['Analytics'],
    hasAI: false,
  },
  {
    id: 'crm-backup',
    category: 'crm',
    title: 'Daily Database Backups',
    description: 'Saves secure backups of your complete customer lists and deal records every single day.',
    tags: ['Safety'],
    hasAI: false,
  },
];

const categories = [
  { id: 'all', name: 'All Workflows', icon: Layers },
  { id: 'marketing', name: 'Marketing Autopilot', icon: Mail },
  { id: 'client', name: 'Client Experience', icon: Users },
  { id: 'office', name: 'Office Operations', icon: Briefcase },
  { id: 'crm', name: 'Database Sync', icon: Database },
];

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Read current cart selections from localStorage
  useEffect(() => {
    setMounted(true);
    const cart = localStorage.getItem('dotnlott_quote_cart');
    if (cart) {
      try {
        setSelectedIds(JSON.parse(cart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update localStorage when cart modifications occur
  const toggleCartSelection = (id: string) => {
    let updated: string[];
    if (selectedIds.includes(id)) {
      updated = selectedIds.filter((item) => item !== id);
    } else {
      updated = [...selectedIds, id];
    }
    setSelectedIds(updated);
    localStorage.setItem('dotnlott_quote_cart', JSON.stringify(updated));
  };

  // Filter workflows based on tab selection & search text
  const filteredItems = catalogItems.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10">
      {/* Dynamic ambient backgrounds */}
      <div className="mesh-bg bg-brand-purple/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '35s' }} />
      <div className="mesh-bg bg-brand-blue/5 bottom-10 left-10 animate-mesh-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
            <Cpu className="w-4 h-4 animate-pulse" />
            Standard Automation Catalog
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Our Automation Library
          </h1>
          <p className="text-sm text-slate-600">
            Browse our {catalogItems.length} ready-made workflow tools. Pick the ones you need to build your custom package, save time, and run your business on autopilot.
          </p>
        </div>

        {/* Floating Cart Indicator */}
        {mounted && selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-brand-blue to-brand-purple p-[1px] rounded-full shadow-2xl glow-purple"
          >
            <div className="bg-[#ffffff] px-6 py-3 rounded-full flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-800">
              <span>{selectedIds.length} Tools Selected</span>
              <div className="h-4 w-px bg-slate-200" />
              <Link
                href="/quote"
                className="flex items-center gap-1.5 text-brand-blue hover:text-brand-purple transition-colors"
              >
                Get Cost Estimate
                <Calculator className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/70 border border-slate-200/60 p-4 rounded-3xl backdrop-blur-md shadow-sm">
          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by keywords (e.g. email, calendar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-brand-purple/50 transition-colors"
            />
          </div>

          {/* Categories Tab selectors */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-colors flex-shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workflows Catalog Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className={`glass-card p-6 rounded-3xl flex flex-col justify-between gap-4 transition-all duration-300 relative group bg-white shadow-sm hover:border-brand-blue/30 ${
                    isSelected ? 'border-brand-purple/45 shadow-[0_4px_20px_rgba(157,78,221,0.08)] bg-white' : ''
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Top tags */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {item.hasAI && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20 text-[9px] font-bold uppercase tracking-wider text-brand-purple">
                          <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                          AI
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-md font-bold text-slate-900 leading-snug group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer button */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      {item.category === 'marketing'
                        ? 'Marketing Pack'
                        : item.category === 'client'
                        ? 'Experience Pack'
                        : item.category === 'office'
                        ? 'Operations Pack'
                        : 'Database Sync Pack'}
                    </span>

                    <button
                      onClick={() => toggleCartSelection(item.id)}
                      className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? 'bg-brand-blue/10 border border-brand-blue/30 text-brand-blue'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Selected
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          Select Tool
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200/60 rounded-3xl shadow-sm">
            <p className="text-sm text-slate-400">No automation tools found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
