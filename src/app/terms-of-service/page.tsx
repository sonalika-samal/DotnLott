import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | DotnLott (A2Z Version Pvt Ltd)',
  description: 'Terms of Service for DotnLott (A2Z Version Private Limited). Operational guidelines, service scope, payment terms, and intellectual property agreements.',
  openGraph: {
    title: 'Terms of Service | DotnLott',
    description: 'Terms of Service for DotnLott (A2Z Version Private Limited).',
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = 'July 20, 2026';

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="mesh-bg bg-brand-blue/5 top-10 left-10" />
      <div className="mesh-bg bg-brand-purple/5 bottom-10 right-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-blue mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 md:p-10 shadow-xs mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue font-display">A2Z Version Pvt Ltd</span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                  Terms of Service
                </h1>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            Welcome to <strong>DotnLott</strong> (a division of <strong>A2Z Version Private Limited</strong>). By accessing our website, purchasing an automation suite, or engaging our engineering team for website development services, you agree to comply with and be bound by the following Terms of Service.
          </p>
        </div>

        {/* Content Body Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 md:p-10 shadow-xs flex flex-col gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
          
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              1. Scope of Services
            </h2>
            <p>
              DotnLott provides bespoke digital engineering solutions, including:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Workflow Automation Suites:</strong> Custom event-driven automation engines, lead routing, CRM synchronizers, email sequencers, and voice AI handlers.</li>
              <li><strong>Website Development:</strong> High-performance landing pages, corporate portals, and custom web applications.</li>
              <li><strong>VPS & Infrastructure Deployment:</strong> Deployment configuration on Managed Cloud or client-owned Dedicated VPS servers.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-purple" />
              2. One-Time Setup Fee & Hosting Ownership
            </h2>
            <p>
              Unless explicitly agreed upon under a recurring Annual Maintenance Contract (AMC):
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>We operate strictly on a <strong>transparent one-time setup fee model</strong> for custom engineering deliverables.</li>
              <li>The client pays for third-party hosting infrastructure costs (VPS hosting, domain registration, API usage credits) directly to the respective third-party service providers.</li>
              <li>The client retains 100% root ownership and control over their database pipelines and deployed code repositories upon project completion.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              3. Client Responsibilities
            </h2>
            <p>
              To ensure timely project execution, clients are responsible for:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Providing required API credentials, webhook endpoints, and DNS records necessary for configuration.</li>
              <li>Participating in scheduled onboarding and executive training sessions.</li>
              <li>Maintaining active subscriptions for their own third-party API accounts (e.g. WhatsApp API, CRM subscriptions).</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-purple" />
              4. Third-Party API Endpoints & Limitation of Liability
            </h2>
            <p>
              All DotnLott automation suites are built with self-healing fallback triggers. However, DotnLott is not liable for temporary service interruptions caused by third-party API provider downtime, external endpoint deprecations, or client-side hosting account suspensions.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              5. Corporate Registration & Governing Law
            </h2>
            <p>
              DotnLott is a corporate brand owned by <strong>A2Z Version Private Limited</strong>, an Indian Private Limited Company registered under CIN: <strong>U47721BR2026PTC085973</strong>. These terms are governed by the laws of India.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 text-xs mt-2">
              <div className="font-bold text-slate-900">Legal Contact & Inquiries</div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue" />
                <a href="mailto:connect@dotnlott.com" className="text-brand-blue font-semibold hover:underline">connect@dotnlott.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-purple" />
                <span>Operational Address: Odisha, India</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
