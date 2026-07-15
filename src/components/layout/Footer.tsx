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
                  src="/logo.png"
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
                <span className="break-all">contact@dotnlott.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-purple flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
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
              DotnLott is a venture under A2Z Version Private Limited. Registered Indian Private Limited Company. CIN: U72900MH2026PTC123456
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
