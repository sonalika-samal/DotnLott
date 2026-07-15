import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, Database, Award } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-slate-200/60 pt-16 pb-8 overflow-hidden z-10">
      {/* Decorative blurred light gradients */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info & Mascot Interaction */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-slate-100 border border-slate-200 p-1 flex items-center justify-center">
                <Image
                  src="/logo-v2.png"
                  alt="DotnLott Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-md font-extrabold tracking-tight text-slate-900">
                Dot<span className="text-brand-purple">n</span>Lott
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Helping businesses grow by automating their everyday work. We make smart software tools and helpers that run your tasks on autopilot.
            </p>

            {/* Mascot Micro-interaction */}
            <div className="flex items-center gap-3 mt-2 bg-slate-50 border border-slate-200/50 p-2.5 rounded-xl max-w-xs">
              <div className="relative w-9 h-9 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                <Image
                  src="/mascot.png"
                  alt="DotnLott Mascot Mini"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Mascot Co-Pilot</span>
                <span className="text-[11px] text-brand-blue font-semibold leading-tight">
                  "Ready to save you hours of work?"
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-3">
              <a
                href="https://www.instagram.com/dotnlott_?igsh=MXFkZ3Y2dTRienF5cQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-brand-purple/10 text-slate-500 hover:text-brand-purple flex items-center justify-center border border-slate-200/60 transition-all shadow-sm hover:scale-105"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/19Hoq4dxVp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-brand-blue/10 text-slate-500 hover:text-brand-blue flex items-center justify-center border border-slate-200/60 transition-all shadow-sm hover:scale-105"
                title="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@DotnLott"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center border border-slate-200/60 transition-all shadow-sm hover:scale-105"
                title="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950">Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-950 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-slate-950 transition-colors">Automation Catalog</Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-slate-950 transition-colors">Quote Builder</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-slate-950 transition-colors">Our Work Examples</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-slate-950 transition-colors">Book a Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950">What We Do</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              <li>
                <span className="hover:text-slate-950 transition-colors">Automatic Outbound Outreach</span>
              </li>
              <li>
                <span className="hover:text-slate-950 transition-colors">Social Post Schedulers</span>
              </li>
              <li>
                <span className="hover:text-slate-950 transition-colors">Google Review and Referral tools</span>
              </li>
              <li>
                <span className="hover:text-slate-950 transition-colors">AI Customer Support Assistants</span>
              </li>
              <li>
                <span className="hover:text-slate-950 transition-colors">CRM and Calendar Sync</span>
              </li>
            </ul>
          </div>

          {/* Contact & Reg Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <a href="mailto:connect@dotnlott.com" className="hover:text-slate-900 break-all transition-colors">
                  connect@dotnlott.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <a href="tel:+917846969508" className="hover:text-slate-900 transition-colors">+91 78469 69508</a>
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded leading-none">WA</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a href="tel:+918544121551" className="hover:text-slate-900 transition-colors">+91 85441 21551</a>
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded leading-none">WA</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>Cuttack, Odisha, India</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-200/60 mb-8" />

        {/* Corporate details, badges and copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-slate-500 text-[11px]">
          <div className="flex flex-col gap-1 items-center lg:items-start text-center lg:text-left">
            <p className="font-semibold text-slate-700">
              © {currentYear} DotnLott. All rights reserved.
            </p>
            <p className="text-slate-500 max-w-xl">
              DotnLott is a venture under A2Z Version Private Limited. Registered Indian Private Limited Company. CIN: U47721BR2026PTC085973
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/50 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Registered Pvt Ltd</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/50 rounded-full">
              <Database className="w-3.5 h-3.5 text-brand-blue" />
              <span>Supabase Encrypted Data</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/50 rounded-full">
              <Award className="w-3.5 h-3.5 text-brand-purple" />
              <span>SLA Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
