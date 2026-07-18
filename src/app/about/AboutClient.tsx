'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Building2,
  Brain
} from 'lucide-react';

import { faqsList } from './faqs';

export default function AboutClient() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-blue/5 top-10 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
            <Users className="w-4 h-4 text-brand-blue animate-pulse" />
            Who We Are
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            About Dot n Lott
          </h1>
          <p className="text-sm text-slate-650 font-light leading-relaxed">
            Dot n Lott is founded by Sonalika Samal and Abhishek Abhinav, two passionate AI experts, AI automation developers, and website designers dedicated to helping businesses grow through intelligent technology.
          </p>
        </div>

        {/* Corporate & Trust Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Legal Company Infrastructure */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-extrabold text-slate-900 font-display">Legal Company Infrastructure</h3>
                <p className="text-xs text-slate-550 leading-relaxed font-light">
                  Dot n Lott is an official tech brand operated under <a href="https://www.mca.gov.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 font-semibold">A2Z Version Private Limited</a>, established with the vision of making advanced automation and modern web solutions accessible to businesses of all sizes.
                </p>
              </div>
              <ul className="text-xs text-slate-600 flex flex-col gap-3 font-light pt-2">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>CIN:</strong> <a href="https://www.mca.gov.in/content/mca/global/en/mca/services/company-services/check-company-name.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 font-semibold">U47721BR2026PTC085973</a></span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>Cuttack, Odisha, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-purple flex-shrink-0" />
                  <span>connect@dotnlott.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>+91-78469-69508</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl">
              <Image
                src="/mascot.png"
                alt="DotnLott Mascot Co-Pilot"
                width={36}
                height={36}
                className="object-contain bg-slate-100 rounded-xl border border-slate-200 p-1"
              />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Corporate Security</span>
                <span className="text-[11px] text-brand-blue font-semibold leading-tight">
                  NDA and data protection policies signed for all projects.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Founders & Leadership */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl group-hover:bg-brand-purple/10 transition-colors" />
            
            <div className="flex flex-col gap-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-extrabold text-slate-900 font-display">Founders & Leadership</h3>
                <p className="text-xs text-slate-550 leading-relaxed font-light">
                  With expertise in AI-powered workflow automation, CRM automation, website development, and digital transformation, we build solutions that save time, reduce manual work, and improve business efficiency.
                </p>
                <p className="text-xs text-slate-550 leading-relaxed font-light">
                  Our systems are engineered by our core leadership team to guarantee secure, production-ready server configurations and seamless third-party integrations.
                </p>
              </div>

              {/* Profiles Row */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-brand-purple/10 text-brand-purple font-extrabold flex items-center justify-center rounded-xl text-xs">
                    SS
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-none">Sonalika Samal</span>
                    <span className="text-[9px] text-slate-400 mt-1">Founder & Systems Architect</span>
                  </div>
                </div>
                <div className="hidden sm:block text-slate-200">|</div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-brand-blue/10 text-brand-blue font-extrabold flex items-center justify-center rounded-xl text-xs">
                    AA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-none">Abhishek Abhinav</span>
                    <span className="text-[9px] text-slate-400 mt-1">Founder & Software Engineer</span>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/booking"
              className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md mt-4"
            >
              Consult with Leadership <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="border-t border-slate-200 pt-16 flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Help & Support</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-650 font-light leading-relaxed">
              Have questions about how we work, security agreements, or deployment details? Read our answers below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            {faqsList.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-250/70 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <h3 className="m-0 p-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/55 transition-colors border-0"
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

                  <div
                    className="transition-all duration-350 overflow-hidden"
                    style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
