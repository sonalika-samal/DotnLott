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
  Cpu,
  Trash2,
  Server,
  Globe,
  Zap,
  ArrowRight
} from 'lucide-react';

const suiteLookup: { [key: string]: string } = {
  'suite-email': 'Email Marketing Automation Suite',
  'suite-social': 'Social Media Automation Suite',
  'suite-ads': 'Meta Ads Automation Suite',
  'suite-nurture': 'AI Lead Nurturing Suite',
  'suite-success': 'Customer Success Automation Suite',
  'suite-office': 'Office Productivity Suite',
  'suite-crm': 'CRM Automation Suite',
  'suite-assistant': 'AI Business Assistant Suite',
  'suite-travel': 'Travel Business Automation Suite',
  'suite-website': 'Website Business Automation Suite'
};

export default function QuotePage() {
  const [selectedSuiteIds, setSelectedSuiteIds] = useState<string[]>([]);
  const [deploymentModel, setDeploymentModel] = useState<'cloud' | 'dedicated'>('cloud');
  const [planTier, setPlanTier] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [customRequirements, setCustomRequirements] = useState('');
  
  // Lead details
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');

  // Status handlers
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load selected suites from local storage
  useEffect(() => {
    setMounted(true);
    const cart = localStorage.getItem('dotnlott_quote_suites');
    if (cart) {
      try {
        setSelectedSuiteIds(JSON.parse(cart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const updateSuiteSelections = (ids: string[]) => {
    setSelectedSuiteIds(ids);
    localStorage.setItem('dotnlott_quote_suites', JSON.stringify(ids));
  };

  const removeSuite = (id: string) => {
    updateSuiteSelections(selectedSuiteIds.filter((item) => item !== id));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSuiteIds.length === 0 && planTier !== 'enterprise') {
      alert('Please select at least one automation suite to configure.');
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
          selectedSuites: selectedSuiteIds.map(id => suiteLookup[id] || id),
          deploymentModel,
          planTier,
          customRequirements,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
        // Clear local storage
        localStorage.removeItem('dotnlott_quote_suites');
        setSelectedSuiteIds([]);
        
        // Confetti
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
    <div className="relative min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      <div className="mesh-bg bg-brand-blue/5 top-20 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-blue justify-center w-fit mx-auto shadow-sm">
            <Calculator className="w-4 h-4 text-brand-purple" />
            Configurator & Quote Builder
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Configure Your Automation Quote
          </h1>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Configure your custom deployment profile below. Choose your suites, select hosting plans, and submit to receive a structured technical proposal.
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
              {/* Left Column: Form */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* Suites Selection List */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-brand-purple animate-pulse" />
                    Selected Automation Suites
                  </h2>

                  {mounted && selectedSuiteIds.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-3">
                      <p className="text-xs text-slate-500 font-light">No automation suites selected yet.</p>
                      <Link
                        href="/catalog"
                        className="inline-flex items-center gap-1 px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-slate-800 transition-colors"
                      >
                        Browse Suites
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
                      {mounted &&
                        selectedSuiteIds.map((id) => {
                          const title = suiteLookup[id];
                          if (!title) return null;
                          return (
                            <div
                              key={id}
                              className="bg-slate-50 border border-slate-250/50 p-3 rounded-2xl flex items-center justify-between gap-3 group"
                            >
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-bold text-slate-900">{title}</span>
                              </div>
                              <button
                                onClick={() => removeSuite(id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                aria-label="Remove Suite"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Hosting & Deployment choice */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <Server className="w-5 h-5 text-brand-blue" />
                    Select Deployment Model
                  </h2>
                  <p className="text-xs text-slate-650 font-light">
                    Where would you like your automation engine to run? Compare detailed parameters on our Deployment page.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setDeploymentModel('cloud')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        deploymentModel === 'cloud'
                          ? 'border-brand-blue bg-brand-blue/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <Globe className="w-5 h-5 text-brand-blue" />
                      <span className="text-xs font-bold mt-1">Managed Cloud Hosting</span>
                      <span className="text-[10px] opacity-75 font-light">Hosted on secure DotnLott servers</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setDeploymentModel('dedicated')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        deploymentModel === 'dedicated'
                          ? 'border-brand-purple bg-brand-purple/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <Server className="w-5 h-5 text-brand-purple" />
                      <span className="text-xs font-bold mt-1">Dedicated VPS Setup</span>
                      <span className="text-[10px] opacity-75 font-light">Hosted on client owned server accounts</span>
                    </button>
                  </div>
                </div>

                {/* Plan Tier selection */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-purple animate-pulse" />
                    Choose Plan Tier
                  </h2>
                  <p className="text-xs text-slate-650 font-light">
                    Select a service package tier based on active suites requirements and technical assistance metrics.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setPlanTier('starter')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        planTier === 'starter'
                          ? 'border-brand-blue bg-brand-blue/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Starter Plan</span>
                      <span className="text-[9px] opacity-75 mt-1 font-light">1 Suite / Managed Cloud</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlanTier('growth')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        planTier === 'growth'
                          ? 'border-brand-purple bg-brand-purple/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Growth Plan</span>
                      <span className="text-[9px] opacity-75 mt-1 font-light">Up to 3 Suites / Priority SLA</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlanTier('enterprise')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1 transition-all ${
                        planTier === 'enterprise'
                          ? 'border-brand-purple bg-brand-purple/5 text-slate-900'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Enterprise Plan</span>
                      <span className="text-[9px] opacity-75 mt-1 font-light">Unlimited / Dedicated VPS</span>
                    </button>
                  </div>
                </div>

                {/* Lead Form details */}
                <div className="glass-card p-6 rounded-3xl bg-white shadow-sm">
                  <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
                    <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-brand-blue" />
                      Contact Information
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
                            required
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

                    {/* Requirements */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="requirements" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Operational Details & Custom Notes
                      </label>
                      <textarea
                        id="requirements"
                        rows={3}
                        placeholder="Tell us about the spreadsheets, software databases, or legacy tools you need connected..."
                        value={customRequirements}
                        onChange={(e) => setCustomRequirements(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || (selectedSuiteIds.length === 0 && planTier !== 'enterprise')}
                      className="w-full mt-2 py-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md rounded-xl"
                    >
                      {isSubmitting ? 'Submitting Configuration...' : 'Request Custom Quote Proposal'}
                    </button>
                  </form>
                </div>

              </div>

              {/* Right Column: Invoice/Summary info */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col gap-6">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl" />

                  <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Proposal Summary</span>
                      <h3 className="text-lg font-bold text-slate-950">Configuration</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-brand-blue/10 border border-brand-blue/20 text-[9px] font-bold text-brand-blue uppercase tracking-widest leading-none">
                      Enterprise SaaS
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 text-xs font-light text-slate-650">
                    <div className="flex justify-between">
                      <span>Selected Suites:</span>
                      <span className="font-bold text-slate-900">{selectedSuiteIds.length}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Deployment Host:</span>
                      <span className="font-bold text-slate-900">
                        {deploymentModel === 'cloud' ? 'Managed Cloud' : 'Dedicated VPS'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Package Tier:</span>
                      <span className="font-bold text-slate-900 capitalize">{planTier} Plan</span>
                    </div>

                    <hr className="border-slate-100" />

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-800">Estimated Setup:</span>
                        <span className="text-xl font-black text-slate-950">Contact Sales</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-800">Monthly License:</span>
                        <span className="text-xl font-black bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-fill-transparent">
                          Contact Sales
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 bg-slate-50 rounded-2xl p-4 text-[10px] text-slate-500 leading-normal flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p>
                      DotnLott pricing model operates on customized SLA scopes. Submit this configuration to receive a structured PDF proposal and schedule a discovery consultation call.
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
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-250 rounded-full flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-8 h-8 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Configuration Saved!</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Thank you, <span className="text-slate-900 font-semibold">{leadName}</span>. Your automation profile config has been logged. We will contact you at <span className="text-slate-900 font-semibold">{leadEmail}</span> with your structured PDF proposal.
              </p>
              <div className="bg-slate-50 p-4 border border-slate-200/50 rounded-2xl w-full text-left text-xs flex flex-col gap-2 shadow-inner">
                <div className="flex justify-between">
                  <span className="text-slate-400">Deployment Type:</span>
                  <span className="font-bold text-slate-900">{deploymentModel === 'cloud' ? 'Managed Cloud' : 'Dedicated VPS'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Plan Tier:</span>
                  <span className="font-bold text-slate-900 capitalize">{planTier}</span>
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md"
                >
                  Configure New
                </button>
                <Link
                  href="/booking"
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl text-center flex items-center justify-center transition-colors"
                >
                  Schedule Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
