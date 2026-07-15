'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Server,
  ShieldAlert,
  Settings,
  Zap,
  TrendingUp,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Menu
} from 'lucide-react';

const faqs = [
  {
    question: 'How is managed cloud different from dedicated deployment?',
    answer: 'Managed Cloud is hosted on DotnLott\'s shared secure infrastructure. We manage the servers, updates, backups, and security, allowing you to pay a lower monthly fee. Dedicated Deployment is hosted on a VPS owned entirely by you (AWS, Google Cloud, Hetzner, etc.). You have complete ownership of the code, database, and dedicated system resources.'
  },
  {
    question: 'Can I migrate from managed cloud to dedicated VPS later?',
    answer: 'Yes! We build all our automation suites using standardized modular code. If your business grows or your compliance needs change, you can seamlessly migrate your suites from our Managed Cloud to your own Dedicated VPS at any time.'
  },
  {
    question: 'Can you customize workflows inside the suites?',
    answer: 'Absolutely. While our suites come with standard best-practice integrations, we specialize in customizing them to fit your specific tools, forms, databases, and custom business rules. Customizations can be mapped during your onboarding phase.'
  },
  {
    question: 'Do you provide ongoing maintenance and SLA support?',
    answer: 'Yes. Managed Cloud includes standard maintenance and automatic updates. Dedicated deployments include 30 days of complimentary support, with the option to sign up for our Annual Maintenance Contract (AMC) for ongoing priority support and updates.'
  },
  {
    question: 'Can you integrate our existing software tools?',
    answer: 'Yes, we can connect with any modern tool that has an API, including Zoho, Salesforce, HubSpot, Google Sheets, Slack, WhatsApp, Stripe, Shopify, and custom legacy database software.'
  },
  {
    question: 'How long does implementation take?',
    answer: 'Standard suites deployed on Managed Cloud can be fully activated and integrated within 3 to 7 business days. Dedicated deployments or heavily customized enterprise workflows typically take 2 to 4 weeks depending on the complexity.'
  }
];

export default function DeploymentPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Mesh background glows */}
      <div className="mesh-bg bg-brand-blue/5 top-10 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-blue justify-center w-fit mx-auto shadow-sm">
            <Server className="w-4 h-4 text-brand-purple animate-pulse" />
            Deployment Architecture
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Flexible Hosting Models
          </h1>
          <p className="text-sm text-slate-650 font-light leading-relaxed">
            Choose the deployment architecture that fits your compliance, budget, and system resource requirements. Start on our Managed Cloud or host on your own VPS.
          </p>
        </div>

        {/* Deployment Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Managed Cloud */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded bg-brand-blue/5 border border-brand-blue/15 text-[9px] font-bold text-brand-blue uppercase tracking-widest leading-none">
                  SMEs & Startups
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-extrabold text-slate-900">Managed Cloud hosting</h3>
                <p className="text-xs text-slate-550 leading-relaxed font-light">
                  A worry-free hosting option managed entirely by the DotnLott core infrastructure team. No technical setup, hosting accounts, or maintenance audits required.
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cloud Benefits:</span>
                <ul className="text-xs text-slate-650 flex flex-col gap-2.5 font-light">
                  <li className="flex items-center gap-2">✓ Hosted on premium DotnLott cloud infrastructure</li>
                  <li className="flex items-center gap-2">✓ Lower initial and ongoing monthly investment</li>
                  <li className="flex items-center gap-2">✓ Full server maintenance, security updates & patches included</li>
                  <li className="flex items-center gap-2">✓ Automatic suite updates & minor bug fixes</li>
                  <li className="flex items-center gap-2">✓ Seamless migration path to Dedicated VPS later</li>
                </ul>
              </div>
            </div>

            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md mt-4"
            >
              Book Cloud Deployment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Dedicated Deployment */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                  <Server className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded bg-brand-purple/5 border border-brand-purple/15 text-[9px] font-bold text-brand-purple uppercase tracking-widest leading-none">
                  Enterprise Ready
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-extrabold text-slate-900">Dedicated VPS Deployment</h3>
                <p className="text-xs text-slate-555 leading-relaxed font-light">
                  Complete independence and ownership. We set up and configure your automation suites on your company-owned VPS accounts, ensuring full compliance.
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dedicated Benefits:</span>
                <ul className="text-xs text-slate-655 flex flex-col gap-2.5 font-light">
                  <li className="flex items-center gap-2">✓ Deployed on customer-owned server accounts</li>
                  <li className="flex items-center gap-2">✓ 100% database, configuration and code ownership</li>
                  <li className="flex items-center gap-2">✓ Dedicated VPS limits, bandwidth, and CPU cores</li>
                  <li className="flex items-center gap-2">✓ Strict compliance alignment (GDPR, HIPAA, SOC2 readiness)</li>
                  <li className="flex items-center gap-2">✓ Optional Annual Maintenance Contract (AMC) & SLAs</li>
                </ul>
              </div>
            </div>

            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-slate-200 hover:border-brand-purple/30 text-slate-700 hover:text-brand-purple text-xs font-bold uppercase tracking-wider rounded-xl transition-all mt-4"
            >
              Talk to VPS Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="border-t border-slate-200 pt-16 flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Frequently Asked Questions</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Deployment & Customization FAQ
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Find answers to key operational concerns regarding hosting, migrations, service parameters, and scaling.
            </p>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-250/70 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

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

        {/* Footer CTA */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-purple rounded-3xl p-8 text-white text-center flex flex-col items-center gap-5 relative overflow-hidden shadow-xl mt-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/15 rounded-full blur-[60px]" />
          <h2 className="font-display text-2xl md:text-3xl font-extrabold max-w-xl leading-tight">
            Ready to Architect Your Autopilot Workspace?
          </h2>
          <p className="text-xs text-slate-350 max-w-lg leading-relaxed font-light">
            Book a 1-on-1 discovery call. We will audit your manual spreadsheet pipelines and advise on cloud or VPS configurations.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold uppercase tracking-wider text-[11px] rounded-full hover:bg-slate-100 transition-colors shadow-lg"
            >
              Book Consultation Call
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/5 text-white font-bold uppercase tracking-wider text-[11px] rounded-full transition-colors"
            >
              Explore Suites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
