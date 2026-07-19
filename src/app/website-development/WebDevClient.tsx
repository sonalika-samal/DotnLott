'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Sparkles,
  ArrowRight,
  ChevronDown,
  CheckCircle
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

const pricingData = [
  {
    emoji: '🚀',
    type: 'Landing Page',
    regular: '₹3,999',
    offer: '₹3,199',
    bgClass: 'bg-rose-50 text-rose-600',
    features: [
      'Single-page layout optimized for conversions',
      'Optimized above-the-fold CTA buttons',
      'Ultra-fast page speed metrics (<1.2s)',
      'Basic contact forms & social link integrations'
    ]
  },
  {
    emoji: '💼',
    type: 'Business Website',
    regular: '₹9,999',
    offer: '₹7,999',
    bgClass: 'bg-amber-50 text-amber-700',
    features: [
      'Multi-page fluid layout (up to 5 pages)',
      'Brand portfolio and services galleries',
      'Fully SEO-optimized keyword structure',
      'Secure contact forms with email routing'
    ]
  },
  {
    emoji: '🏢',
    type: 'Corporate Website',
    regular: '₹19,999',
    offer: '₹15,999',
    bgClass: 'bg-blue-50 text-blue-600',
    features: [
      'Enterprise page hierarchies and structures',
      'Premium custom styling & interactive cues',
      'Integrated admin panels & performance reports',
      'GDPR privacy and data security compliance'
    ]
  },
  {
    emoji: '🛒',
    type: 'E-commerce Website',
    regular: '₹24,999',
    offer: '₹19,999',
    bgClass: 'bg-indigo-50 text-indigo-600',
    features: [
      'Dynamic product catalogs & checkout carts',
      'Secure Stripe or Razorpay API gateways',
      'Automated receipting & invoice delivery',
      'Clean sales dashboard database tracker'
    ]
  },
  {
    emoji: '🎓',
    type: 'Educational / Institute Website',
    regular: '₹14,999',
    offer: '₹11,999',
    bgClass: 'bg-purple-50 text-purple-600',
    features: [
      'Bespoke courses & listings dynamic layouts',
      'Online inquiry & enrollment modules',
      'Notice boards & interactive photo galleries',
      'Accessibility optimized layout design'
    ]
  },
  {
    emoji: '🍽️',
    type: 'Food Delivery Website',
    regular: '₹19,999',
    offer: '₹15,999',
    bgClass: 'bg-violet-50 text-violet-600',
    features: [
      'Digital interactive menu with cart setups',
      'Secure checkout & discount promo modules',
      'Real-time order dashboard notifications',
      'WhatsApp shipping tracking automation'
    ]
  },
  {
    emoji: '🏨',
    type: 'Hotel & Travel Website',
    regular: '₹24,999',
    offer: '₹19,999',
    bgClass: 'bg-pink-50 text-pink-600',
    features: [
      'Rooms & packages filter directories',
      'Direct booking inquiry form routing',
      'Premium carousel image gallery systems',
      'Seasonal pricing adjustment widgets'
    ]
  },
  {
    emoji: '⚙️',
    type: 'Custom Web Application',
    regular: '₹39,999',
    offer: '₹31,999',
    bgClass: 'bg-slate-100 text-slate-600',
    features: [
      'Custom React/Next.js dashboard structure',
      'Fully secure user credential logic',
      'Real-time operations database triggers',
      'S3 cloud file upload & storage pipelines'
    ]
  }
];

export default function WebDevClient() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Mesh glow layers */}
      <div className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '32s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 left-10 animate-mesh-spin" style={{ animationDuration: '42s', animationDirection: 'reverse' }} />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Page Header Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl border border-white/10 w-full max-w-5xl mx-auto flex flex-col gap-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col gap-4 relative z-10 text-center items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit shadow-sm">
              <Globe className="w-4 h-4 text-brand-blue animate-spin" style={{ animationDuration: '10s' }} />
              Web Engineering
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white leading-tight">
              High-Performance Web Development
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-extrabold text-emerald-400 w-fit shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Launch Offer: Flat 20% OFF on all packages</span>
            </div>
            <p className="text-sm text-slate-300 font-light leading-relaxed max-w-4xl mx-auto mt-2">
              Bespoke website layouts engineered for sub-second speeds, flawless responsiveness, and premium animations. We design high-converting portfolios, landing pages, e-commerce stores, and custom SaaS applications that elevate your brand.
            </p>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="flex flex-col gap-8 w-full">
          <div className="text-center flex flex-col gap-1.5 mt-2">
            <h2 className="text-xl md:text-2xl font-black text-brand-blue font-display tracking-tight">
              ⚡ Explore Our Custom Services
            </h2>
            <p className="text-xs text-slate-500 font-light">Select a high-performance package designed to scale your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {pricingData.map((item, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col gap-5 transition-all duration-300 shadow-sm hover:shadow-md group hover:border-brand-purple/40"
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl text-xl ${item.bgClass} shadow-sm flex-shrink-0`}>
                    {item.emoji}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-purple transition-colors">
                    {item.type}
                  </h3>
                </div>

                <div className="bg-slate-50/70 border border-slate-150/60 rounded-2xl p-4 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Regular Price</span>
                    <span className="text-xs text-slate-400 line-through font-medium">{item.regular}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-brand-purple uppercase tracking-wider font-extrabold">Launch Offer</span>
                    <span className="text-lg font-black text-slate-900">{item.offer}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 flex-grow">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Features Included:</span>
                  <ul className="flex flex-col gap-2">
                    {item.features?.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-650 font-light leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/booking"
                  className="w-full text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors mt-auto flex items-center justify-center gap-1.5"
                >
                  Book Package
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
          
          {/* Early Adopter Launch Benefits Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl border border-white/10 w-full flex flex-col lg:flex-row justify-between items-center gap-8 max-w-5xl mx-auto mt-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10 flex-grow">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-brand-purple w-fit">
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
                  <span>Complete Website Designing Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Rates Locked for 12 Months</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Complimentary SEO Foundations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>30 Days Post-Launch Support</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center justify-between gap-4 w-full lg:w-80 flex-shrink-0 backdrop-blur-sm relative z-10">
              <span className="text-[10px] text-slate-450 uppercase tracking-widest font-bold">Book Free Call Today</span>
              <h3 className="text-xl font-black text-white leading-tight">Setup Session in 10 Min</h3>
              <p className="text-[11px] text-slate-400 font-light max-w-[220px]">
                No upfront card details required. Lock your launch rate now.
              </p>
              <Link
                href="/booking"
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                Consult Now
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section (Colorful Edition) */}
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

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3.5">
            {webDevFaqs.map((faq, idx) => {
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

        {/* Definition Block Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden max-w-4xl mx-auto w-full flex flex-col gap-4">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/5 rounded-full blur-[50px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-purple/5 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-purple font-display">What is Custom Website Development?</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Custom website development is the process of building tailored, high-performance web applications and business portfolios using custom code rather than generic page builders. By writing modular, clean code, we deliver sub-second loading speeds, advanced animations, and superior SEO architecture tailored to your brand identity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
