'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone, Calendar } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isAiAuto = pathname.startsWith('/ai-automation');
  const isWebDev = pathname.startsWith('/website-development');
  const isAbout = pathname.startsWith('/about');
  const isContact = pathname.startsWith('/contact');
  const isBlog = pathname.startsWith('/blog');
  const isPrivacy = pathname.startsWith('/privacy-policy');
  const isTerms = pathname.startsWith('/terms-of-service');
  const isRefund = pathname.startsWith('/refund-policy');

  const getPageLinkClass = (isActive: boolean) =>
    isActive
      ? 'font-extrabold text-slate-900 transition-colors'
      : 'font-normal text-slate-600 hover:text-slate-900 transition-colors';

  return (
    <footer className="relative bg-white border-t border-slate-200/80 pt-8 pb-6 overflow-hidden z-10 text-slate-700">
      {/* Decorative ambient background mesh lights */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 BALANCED COLUMNS (12-COL GRID: 4 + 2 + 3 + 3 = 12 COLS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-6 border-b border-slate-200/80">
          
          {/* Column 1: Brand Info & Header-Matching Logo (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9 overflow-hidden rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center">
                <Image
                  src="/logo-v2.png"
                  alt="DotnLott Logo"
                  width={32}
                  height={32}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  Dot<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brand-purple">n</span>Lott
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 group-hover:text-brand-blue transition-colors">
                  Dream. Build. Repeat.
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed font-light max-w-sm">
              Designing sub-second websites and 24/7 autonomous AI workflow automation systems for ambitious companies.
            </p>

            {/* Social Links & WhatsApp */}
            <div className="flex items-center gap-2 pt-3.5 sm:pt-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/DotnLott/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7.5 h-7.5 rounded-full bg-slate-100 hover:bg-brand-blue hover:text-white text-slate-600 flex items-center justify-center border border-slate-200/80 transition-all shadow-xs hover:scale-110"
                title="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/dotnlott_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7.5 h-7.5 rounded-full bg-slate-100 hover:bg-brand-purple hover:text-white text-slate-600 flex items-center justify-center border border-slate-200/80 transition-all shadow-xs hover:scale-110"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/dotnlott"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7.5 h-7.5 rounded-full bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-600 flex items-center justify-center border border-slate-200/80 transition-all shadow-xs hover:scale-110"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/917846969508?text=Hey%20DotnLott%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-7.5 h-7.5 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 flex items-center justify-center border border-slate-200/80 transition-all shadow-xs hover:scale-110"
                title="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* Quick Legal Links */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <Link href="/privacy-policy" className={isPrivacy ? 'text-slate-900 font-bold underline' : 'hover:text-slate-900 font-normal transition-colors'}>Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms-of-service" className={isTerms ? 'text-slate-900 font-bold underline' : 'hover:text-slate-900 font-normal transition-colors'}>Terms of Service</Link>
              <span>•</span>
              <Link href="/refund-policy" className={isRefund ? 'text-slate-900 font-bold underline' : 'hover:text-slate-900 font-normal transition-colors'}>Refund Policy</Link>
            </div>

            {/* Small Purple Book Meeting Button */}
            <Link
              href="/contact?booking=true#calendar-booking"
              className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all border border-purple-400/30 w-fit hover:scale-105"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book a meeting
            </Link>
          </div>

          {/* Column 2: PAGES Links (2 Cols - Fits Text Perfectly Without Extra Space) */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">Pages</h4>
            <ul className="flex flex-col gap-2 text-xs text-slate-600 font-light">
              <li>
                <Link href="/" className={getPageLinkClass(isHome)}>Home</Link>
              </li>
              <li>
                <Link href="/ai-automation" className={getPageLinkClass(isAiAuto)}>AI Automation</Link>
              </li>
              <li>
                <Link href="/website-development" className={getPageLinkClass(isWebDev)}>Website Development</Link>
              </li>
              <li>
                <Link href="/about" className={getPageLinkClass(isAbout)}>About</Link>
              </li>
              <li>
                <Link href="/blog" className={getPageLinkClass(isBlog)}>Blog</Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.history.replaceState(null, '', '/contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={getPageLinkClass(isContact)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: TOP SERVICES Links (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">Top Services</h4>
            <ul className="flex flex-col gap-2 text-xs text-slate-600 font-light">
              {/* AI Automation Services */}
              <li>
                <Link href="/ai-automation#all-suites-catalog" className="hover:text-brand-purple font-medium transition-colors flex items-center justify-start gap-1.5">
                  <span className="whitespace-nowrap">Email Lead Gen & Outreach</span>
                  <span className="text-[8px] font-black text-amber-950 bg-amber-300/90 border border-amber-400/80 px-1.5 py-0.5 rounded uppercase font-mono flex-shrink-0 shadow-2xs">Best Seller</span>
                </Link>
              </li>
              <li>
                <Link href="/ai-automation#all-suites-catalog" className="hover:text-brand-purple font-medium transition-colors flex items-center justify-start gap-1.5">
                  <span className="whitespace-nowrap">AI Lead Nurturing & WhatsApp</span>
                </Link>
              </li>
              <li>
                <Link href="/ai-automation#all-suites-catalog" className="hover:text-brand-purple font-medium transition-colors flex items-center justify-start gap-1.5">
                  <span className="whitespace-nowrap">Social Media Autopilot</span>
                </Link>
              </li>

              {/* Website Development Services */}
              <li>
                <Link href="/website-development#pricing-packages" className="hover:text-brand-blue font-medium transition-colors flex items-center justify-start gap-1.5">
                  <span className="whitespace-nowrap">Landing Page Web Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/website-development#pricing-packages" className="hover:text-brand-blue font-medium transition-colors flex items-center justify-start gap-1.5">
                  <span className="whitespace-nowrap">Corporate Business Website</span>
                  <span className="text-[8px] font-black text-amber-950 bg-amber-300/90 border border-amber-400/80 px-1.5 py-0.5 rounded uppercase font-mono flex-shrink-0 shadow-2xs">Best Seller</span>
                </Link>
              </li>
              <li>
                <Link href="/website-development#pricing-packages" className="hover:text-brand-blue font-medium transition-colors flex items-center justify-start gap-1.5">
                  <span className="whitespace-nowrap">Custom Dynamic Web App</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH Cards */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display mb-0.5">Get In Touch</h4>
            
            {/* Operational Address (Odisha) */}
            <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-2.5 flex items-start gap-2.5 shadow-2xs hover:border-brand-purple/30 transition-all">
              <div className="w-6.5 h-6.5 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 font-display">Operational Address</span>
                <span className="text-xs font-bold text-slate-900">Odisha, India</span>
              </div>
            </div>

            {/* Email Address Text Links */}
            <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-2.5 flex items-start gap-2.5 shadow-2xs hover:border-brand-blue/30 transition-all">
              <div className="w-6.5 h-6.5 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 font-display">Email Us</span>
                <div className="flex flex-col text-xs font-bold text-slate-900">
                  <a href="mailto:connect@dotnlott.com" className="hover:text-brand-purple transition-colors truncate no-underline">
                    connect@dotnlott.com
                  </a>
                  <a href="mailto:hello.dotnlott@gmail.com" className="hover:text-brand-purple transition-colors truncate no-underline">
                    hello.dotnlott@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Number Call Links */}
            <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-2.5 flex items-start gap-2.5 shadow-2xs hover:border-emerald-500/30 transition-all">
              <div className="w-6.5 h-6.5 rounded-xl bg-emerald-500/10 border border-emerald-200/20 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 font-display">Call Us</span>
                <div className="flex flex-col text-xs font-bold text-slate-900 gap-1 mt-0.5">
                  <a
                    href="tel:+917846969508"
                    className="hover:text-emerald-600 transition-colors no-underline"
                  >
                    +91 78469 69508
                  </a>
                  <a
                    href="tel:+918544121551"
                    className="hover:text-emerald-600 transition-colors no-underline"
                  >
                    +91 85441 21551
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL MCA REGISTRATION BAR */}
        <div className="pt-4 flex flex-col items-center justify-center text-slate-500 text-[11px] text-center w-full gap-2">
          <p className="max-w-7xl w-full leading-relaxed">
            © {currentYear} Dot n Lott. All rights reserved. A brand under{' '}
            <a
              href="https://www.mca.gov.in/content/mca/global/en/mca/master-data/View-Companies-Directors-under-prosecution-V3.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-800 underline hover:text-brand-blue transition-colors"
            >
              A2Z Version Private Limited
            </a>
            . CIN: U47721BR2026PTC085973
          </p>
        </div>

      </div>
    </footer>
  );
}
