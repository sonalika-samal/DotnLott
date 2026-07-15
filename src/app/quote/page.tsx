'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Calculator,
  CheckCircle,
  Mail,
  User,
  Building,
  Phone,
  FileText,
  Percent,
  Cpu,
  Trash2
} from 'lucide-react';

// Simplified lookup dictionary mapping IDs to layman-friendly titles
const catalogLookup: { [key: string]: { title: string; category: string } } = {
  // MARKETING
  'mkt-out-in': { title: 'Automatic Customer Finder (India)', category: 'marketing' },
  'mkt-out-ab': { title: 'Automatic Customer Finder (Global)', category: 'marketing' },
  'mkt-fol-in': { title: 'Smart Email Follow-Ups (India)', category: 'marketing' },
  'mkt-fol-ab': { title: 'Smart Email Follow-Ups (Global)', category: 'marketing' },
  'mkt-hyg': { title: 'Invalid Email Filter', category: 'marketing' },
  'mkt-warm-send': { title: 'Email Delivery Helper - Simulation', category: 'marketing' },
  'mkt-warm-rep': { title: 'Email Delivery Helper - Auto-Replies', category: 'marketing' },
  'mkt-warm-clean': { title: 'Email Delivery Helper - Inbox Cleaner', category: 'marketing' },
  'mkt-lead-route': { title: 'Instant Interested Lead Notifier', category: 'marketing' },
  'mkt-soc-drive': { title: 'Social Media Post Scheduler', category: 'marketing' },
  'mkt-soc-thought': { title: 'Daily Branding Posting Tool', category: 'marketing' },
  'mkt-soc-promo': { title: 'Sales & Promo Post Autopilot', category: 'marketing' },
  'mkt-soc-art': { title: 'AI News Post Scheduler', category: 'marketing' },
  'mkt-soc-wel': { title: 'New Client Welcome Poster', category: 'marketing' },
  'mkt-soc-car': { title: 'Multi-Image Carousel Manager', category: 'marketing' },
  'mkt-ad-camp': { title: 'Meta Ads Manager Autopilot', category: 'marketing' },
  'mkt-fb-feedback': { title: 'Social Page Performance Reviewer', category: 'marketing' },
  'mkt-trav-arb': { title: 'Smart Travel Business Analyzer', category: 'marketing' },
  'mkt-meta-lead': { title: 'WhatsApp & Email Lead Responder', category: 'marketing' },

  // CLIENT MANAGEMENT
  'cli-feed-new': { title: 'New Client Feedback Auditor', category: 'client' },
  'cli-rev-new': { title: 'Google Review Request Emailer', category: 'client' },
  'cli-rev-ren': { title: 'Google Review Request (Renewed)', category: 'client' },
  'cli-rec': { title: 'Past Client Reconnect Tool', category: 'client' },
  'cli-non-ren': { title: 'Contract Renewal Reminders', category: 'client' },
  'cli-sla-health': { title: 'Client Happiness Check-ins', category: 'client' },
  'cli-res-check': { title: 'Partner Referral Collector', category: 'client' },
  'cli-ref-rem': { title: 'Referral Rewards Reminder', category: 'client' },
  'cli-ref-ack': { title: 'Referral Confirmation Tracker', category: 'client' },
  'cli-help-ai': { title: 'AI Customer Support Assistant', category: 'client' },

  // OFFICE MANAGEMENT
  'off-shift': { title: 'Team Schedule Reminder', category: 'office' },
  'off-unread': { title: 'SLA Ticket Deadline Alert', category: 'office' },
  'off-tasks': { title: 'Daily Employee Task Checklists', category: 'office' },
  'off-n8n-back': { title: 'Nightly System Safety Backup', category: 'office' },
  'off-n8n-clean': { title: 'Old Backups Cleaner', category: 'office' },
  'off-ticket-due': { title: 'AppScript Ticket Tracker', category: 'office' },
  'off-leave': { title: 'Leave Tracker Emailer', category: 'office' },
  'off-follow': { title: 'Overdue Task Reminder', category: 'office' },

  // CRM
  'crm-leak': { title: 'Forgotten Deal Alert', category: 'crm' },
  'crm-rep': { title: 'Weekly & Monthly Reports Builder', category: 'crm' },
  'crm-zoho': { title: 'Calendar Meeting Sync', category: 'crm' },
  'crm-eod': { title: 'Daily Call Summary Builder', category: 'crm' },
  'crm-backup': { title: 'Daily Database Backups', category: 'crm' },
};

export default function QuotePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [volumeTier, setVolumeTier] = useState<'low' | 'med' | 'high'>('low');
  const [customRequirements, setCustomRequirements] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  
  // Lead details
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');

  // Status handlers
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync currency from local storage & custom event
  useEffect(() => {
    const syncCurrency = () => {
      const stored = localStorage.getItem('dotnlott_currency');
      if (stored === 'INR' || stored === 'USD') {
        setCurrency(stored);
      }
    };
    syncCurrency();
    window.addEventListener('dotnlott_currency_changed', syncCurrency);
    return () => window.removeEventListener('dotnlott_currency_changed', syncCurrency);
  }, []);

  // Load from local storage cart
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

  // Sync to local storage
  const updateSelections = (ids: string[]) => {
    setSelectedIds(ids);
    localStorage.setItem('dotnlott_quote_cart', JSON.stringify(ids));
  };

  const removeWorkflow = (id: string) => {
    updateSelections(selectedIds.filter((item) => item !== id));
  };

  // Pricing details based on Currency mode (Indian vs Abroad)
  const isINR = currency === 'INR';
  const currencySymbol = isINR ? '₹' : '$';
  
  const baseSetupFeePerFlow = isINR ? 15000 : 299;
  const baseMonthlyFeePerFlow = isINR ? 2500 : 49;

  // Volume multiplier
  const volumeMultiplier = volumeTier === 'low' ? 1.0 : volumeTier === 'med' ? 1.4 : 2.0;

  const rawSetupTotal = selectedIds.length * baseSetupFeePerFlow;
  const rawMonthlyTotal = selectedIds.length * baseMonthlyFeePerFlow * volumeMultiplier;

  // Bundle discounts
  let discountPercentage = 0;
  if (selectedIds.length >= 2 && selectedIds.length <= 4) {
    discountPercentage = 10;
  } else if (selectedIds.length >= 5 && selectedIds.length <= 9) {
    discountPercentage = 15;
  } else if (selectedIds.length >= 10) {
    discountPercentage = 25;
  }

  const setupDiscountAmount = (rawSetupTotal * discountPercentage) / 100;
  const monthlyDiscountAmount = (rawMonthlyTotal * discountPercentage) / 100;

  const finalSetupTotal = Math.max(0, rawSetupTotal - setupDiscountAmount);
  const finalMonthlyTotal = Math.max(0, rawMonthlyTotal - monthlyDiscountAmount);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      alert('Please select at least one automation tool to get an estimate.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            name: leadName,
            email: leadEmail,
            phone: leadPhone,
            company: leadCompany,
          },
          selectedWorkflows: [
            ...selectedIds.map(id => catalogLookup[id]?.title || id),
            `Mode: ${currency}`
          ],
          estimatedMonthlyPrice: finalMonthlyTotal,
          estimatedSetupPrice: finalSetupTotal,
          discountApplied: discountPercentage,
          customRequirements,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
        // Clean quote cart
        localStorage.removeItem('dotnlott_quote_cart');
        setSelectedIds([]);
        
        // Confetti drop
        const confettiMod = await import('canvas-confetti');
        confettiMod.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        alert('Something went wrong. Please check your inputs.');
      }
    } catch (err) {
      console.error(err);
      alert('Network issue. Your request has been queued.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="mesh-bg bg-brand-blue/5 top-20 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-blue justify-center w-fit mx-auto shadow-sm">
            <Calculator className="w-4 h-4" />
            Easy Cost Calculator
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Get an Instant Estimate
          </h1>
          <p className="text-sm text-slate-600">
            Build your automation setup. Select your tools, pick your monthly task volume, and see your pricing summary instantly.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Config & Form */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Selected Tools list */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-brand-purple animate-pulse" />
                    Your Selected Tools
                  </h2>

                  {mounted && selectedIds.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-3">
                      <p className="text-xs text-slate-500">You haven't selected any tools yet.</p>
                      <Link
                        href="/catalog"
                        className="inline-flex items-center gap-1 px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-slate-800 transition-colors"
                      >
                        Browse Tools Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
                      {mounted &&
                        selectedIds.map((id) => {
                          const details = catalogLookup[id];
                          if (!details) return null;
                          return (
                            <div
                              key={id}
                              className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl flex items-center justify-between gap-3 group"
                            >
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-bold text-slate-900">{details.title}</span>
                                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                                  {details.category === 'marketing' ? 'Marketing' : details.category === 'client' ? 'Client Experience' : details.category === 'office' ? 'Operations' : 'Database Sync'} Pack
                                </span>
                              </div>
                              <button
                                onClick={() => removeWorkflow(id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Task Volume selection */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-blue" />
                    How many tasks run monthly?
                  </h2>
                  <p className="text-xs text-slate-600">
                    Estimate the number of times your automated tools will run each month. Larger volumes require stronger server capacity.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setVolumeTier('low')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        volumeTier === 'low'
                          ? 'border-brand-blue bg-brand-blue/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Starter Volume</span>
                      <span className="text-[10px] opacity-75">Up to 1,000 tasks/mo</span>
                      <span className="text-[10px] mt-2 font-semibold text-brand-blue">Standard capacity</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setVolumeTier('med')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        volumeTier === 'med'
                          ? 'border-brand-purple bg-brand-purple/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Growth Volume</span>
                      <span className="text-[10px] opacity-75">Up to 10,000 tasks/mo</span>
                      <span className="text-[10px] mt-2 font-semibold text-brand-purple">Extra capacity</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVolumeTier('high')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        volumeTier === 'high'
                          ? 'border-brand-purple bg-brand-purple/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Enterprise Volume</span>
                      <span className="text-[10px] opacity-75">10,000+ tasks/mo</span>
                      <span className="text-[10px] mt-2 font-semibold text-brand-purple">Maximum capacity</span>
                    </button>
                  </div>
                </div>

                {/* Lead Form */}
                <div className="glass-card p-6 rounded-3xl bg-white shadow-sm">
                  <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
                    <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-brand-blue" />
                      Get Your Custom Proposal
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Phone Number (WhatsApp Preferred)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="company"
                            type="text"
                            placeholder="My Business Pvt Ltd"
                            value={leadCompany}
                            onChange={(e) => setLeadCompany(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Custom notes */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="requirements" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Describe What You Need (Optional)
                      </label>
                      <textarea
                        id="requirements"
                        rows={3}
                        placeholder="Tell us about the spreadsheets, software databases, or calendars you use today..."
                        value={customRequirements}
                        onChange={(e) => setCustomRequirements(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || selectedIds.length === 0}
                      className="w-full mt-2 py-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Send Quote Request'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Price Summary Invoice Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl" />

                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Estimated Cost</span>
                      <span className="text-md font-extrabold text-slate-950">Price Summary</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider bg-brand-blue/10 border border-brand-blue/20 px-2 py-1 rounded text-brand-blue font-bold">
                        Estimate
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 text-xs">
                    {/* Item Count */}
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Selected tools:</span>
                      <span className="font-bold text-slate-900">{selectedIds.length}</span>
                    </div>

                    {/* Volume Scale */}
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Monthly task volume:</span>
                      <span className="font-bold text-slate-900">{volumeTier === 'low' ? 'Starter' : volumeTier === 'med' ? 'Growth' : 'Enterprise'}</span>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Setup Breakdown */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-slate-600">
                        <span>One-time setup cost:</span>
                        <span className="font-medium text-slate-900">{currencySymbol}{rawSetupTotal.toLocaleString()}</span>
                      </div>
                      {discountPercentage > 0 && (
                        <div className="flex justify-between text-emerald-600 text-[10px] font-bold">
                          <span className="flex items-center gap-1">
                            <Percent className="w-3.5 h-3.5" /> Bundle discount ({discountPercentage}%):
                          </span>
                          <span>-{currencySymbol}{setupDiscountAmount.toFixed(0)}</span>
                        </div>
                      )}
                    </div>

                    {/* Monthly Breakdown */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-slate-600">
                        <span>Monthly support & hosting:</span>
                        <span className="font-medium text-slate-900">{currencySymbol}{rawMonthlyTotal.toLocaleString()}/mo</span>
                      </div>
                      {discountPercentage > 0 && (
                        <div className="flex justify-between text-emerald-600 text-[10px] font-bold">
                          <span className="flex items-center gap-1">
                            <Percent className="w-3.5 h-3.5" /> Bundle discount ({discountPercentage}%):
                          </span>
                          <span>-{currencySymbol}{monthlyDiscountAmount.toFixed(0)}/mo</span>
                        </div>
                      )}
                    </div>

                    <hr className="border-slate-200" />

                    {/* Grand totals */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 font-bold">Final Setup Cost:</span>
                        <span className="text-xl font-black text-slate-900">{currencySymbol}{finalSetupTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 font-bold">Final Monthly Support:</span>
                        <span className="text-xl font-black bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-fill-transparent">
                          {currencySymbol}{finalMonthlyTotal.toLocaleString()}<span className="text-xs font-normal text-slate-500 text-fill-slate-500">/mo</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 rounded-2xl p-3 text-[10px] text-slate-500 flex items-start gap-2 shadow-sm">
                    <CheckCircle className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <p className="leading-normal">
                      This calculation is a helpful estimate. We will give you a final quote after we discuss your business needs on our strategy call.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card max-w-lg mx-auto p-8 rounded-3xl text-center flex flex-col items-center gap-5 border-slate-200 bg-white shadow-lg"
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-8 h-8 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Request Sent!</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you, <span className="text-slate-900 font-semibold">{leadName}</span>. We have saved your details. Our team will review your selections and email you a customized proposal soon.
              </p>
              <div className="bg-slate-50 p-4 border border-slate-200/50 rounded-2xl w-full text-left text-xs flex flex-col gap-2 shadow-inner">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimate ID:</span>
                  <span className="font-mono text-slate-600">EST-{Math.floor(Math.random() * 90000) + 10000}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Setup Price:</span>
                  <span className="font-bold text-slate-900">{currencySymbol}{finalSetupTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Support:</span>
                  <span className="font-bold text-slate-900">{currencySymbol}{finalMonthlyTotal.toLocaleString()}/mo</span>
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                >
                  New Estimate
                </button>
                <Link
                  href="/booking"
                  className="flex-1 py-2.5 glass-card hover:glass-card-hover text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl text-center flex items-center justify-center"
                >
                  Book Setup Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
