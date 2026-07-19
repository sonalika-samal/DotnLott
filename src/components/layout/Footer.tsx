import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

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
              <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center">
                <Image
                  src="/logo-v2.png"
                  alt="DotnLott Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-md font-extrabold tracking-tight text-slate-900">
                Dot<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brand-purple">n</span>Lott
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Helping businesses grow by automating their everyday work. We make smart software tools and helpers that run your tasks on autopilot.
            </p>

            {/* Mascot Micro-interaction */}
            <div className="flex items-center gap-3 mt-2 bg-slate-50 border border-slate-200/50 p-2.5 rounded-xl max-w-xs">
              <div className="relative w-9 h-9 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                <Image
                  src="/mascot-v4.png"
                  alt="DotnLott Mascot Mini"
                  width={28}
                  height={28}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Mascot Co-Pilot</span>
                <span className="text-[11px] text-brand-blue font-semibold leading-tight">
                  &quot;Ready to save you hours of work?&quot;
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-3">
              <a
                href="https://wa.me/917846969508?text=Hey%20Sonalika%2C%20I%20would%20like%20to%20inquire%20about%20your%20workflow%20automation%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 flex items-center justify-center border border-slate-200/60 transition-all shadow-sm hover:scale-105"
                title="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/135217304"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-sky-50 text-slate-500 hover:text-sky-650 flex items-center justify-center border border-slate-200/60 transition-all shadow-sm hover:scale-105"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
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
                <Link href="/catalog" className="hover:text-slate-950 transition-colors font-semibold text-brand-purple">Workflow Automation</Link>
              </li>
              <li>
                <Link href="/website-development" className="hover:text-slate-950 transition-colors">Website Development</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-slate-950 transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-950 transition-colors">About & FAQs</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-slate-950 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-slate-950 transition-colors">Book Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950">What We Do</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
              <li>
                <Link href="/catalog" className="hover:text-slate-950 transition-colors">Workflow Automation Setup</Link>
              </li>
              <li>
                <Link href="/website-development" className="hover:text-slate-950 transition-colors">Website Design & Development</Link>
              </li>
              <li>
                <Link href="/catalog#suite-voice-agent" className="hover:text-slate-950 transition-colors">Voice Agent Support Suite</Link>
              </li>
              <li>
                <Link href="/catalog#suite-crm" className="hover:text-slate-950 transition-colors">CRM & Database Syncing</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Reg Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-600">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0 translate-y-[0.5px]" />
                <a href="mailto:connect@dotnlott.com" className="hover:text-slate-900 break-all transition-colors">
                  connect@dotnlott.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <a href="tel:+917846969508" className="hover:text-slate-900 transition-colors">+91 78469 69508</a>
                    <a
                      href="https://wa.me/917846969508?text=Hey%20Sonalika%2C%20I%20would%20like%20to%20inquire%20about%20your%20workflow%20automation%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-bold text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600 px-1 py-0.5 rounded leading-none transition-colors"
                      title="WhatsApp Sonalika"
                    >
                      WA
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a href="tel:+918544121551" className="hover:text-slate-900 transition-colors">+91 85441 21551</a>
                    <a
                      href="https://wa.me/918544121551?text=Hi%20DotnLott%2C%20I%20would%20like%20to%20inquire%20about%20your%20workflow%20automation%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-bold text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600 px-1 py-0.5 rounded leading-none transition-colors"
                      title="WhatsApp Support"
                    >
                      WA
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 translate-y-[0.5px]" />
                <span>Cuttack, Odisha, India</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-200/60 mb-8" />

        {/* Corporate details and copyright */}
        <div className="flex flex-col items-center justify-center text-slate-500 text-[11px] text-center w-full">
          <p className="max-w-7xl w-full leading-relaxed">
            <span className="font-semibold text-slate-700">© {currentYear} DotnLott. All rights reserved.</span>
            <span className="mx-2 text-slate-300">|</span>
            <span>DotnLott is a venture under <a href="https://www.mca.gov.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">A2Z Version Private Limited</a>. Registered Indian Private Limited Company. CIN: <a href="https://www.mca.gov.in/content/mca/global/en/mca/services/company-services/check-company-name.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">U47721BR2026PTC085973</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
