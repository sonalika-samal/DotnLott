import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | DotnLott (A2Z Version Pvt Ltd)',
  description: 'Privacy Policy for DotnLott (A2Z Version Private Limited). Learn how we handle client data, API credentials, and workflow privacy with maximum security.',
  openGraph: {
    title: 'Privacy Policy | DotnLott',
    description: 'Privacy Policy for DotnLott (A2Z Version Private Limited).',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
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
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-purple font-display">A2Z Version Pvt Ltd</span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                  Privacy Policy
                </h1>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            At <strong>DotnLott</strong> (a corporate venture operated under <strong>A2Z Version Private Limited</strong>), data security, confidential infrastructure management, and client privacy are our foundational principles. This Privacy Policy outlines how we collect, handle, store, and protect your company data, API keys, and personal information when using our website development services, AI automation suites, or consultation booking portals.
          </p>
        </div>

        {/* Content Body Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 md:p-10 shadow-xs flex flex-col gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
          
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              1. Information We Collect
            </h2>
            <p>
              We collect information strictly necessary to scope, engineer, and deploy custom workflow automation pipelines and web applications:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Contact & Business Details:</strong> Name, corporate email address, telephone number, company size, and project scope submitted via inquiry forms or booking calendars.</li>
              <li><strong>Technical Integration Credentials:</strong> API tokens, database webhook URLs, and server credentials provided securely during project deployment.</li>
              <li><strong>Usage & Analytics Data:</strong> Anonymous browser telemetry, IP addresses, and page interaction logs to optimize site performance.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-purple" />
              2. How We Use Your Information
            </h2>
            <p>
              Your information is processed exclusively for professional engineering and client management purposes:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Building, configuring, and testing your dedicated workflow automation pipelines.</li>
              <li>Setting up DNS records, domain parameters, and SSL certificates on your hosting accounts.</li>
              <li>Communicating project milestones, scheduling onboarding training sessions, and delivering support alerts.</li>
              <li>Executing non-disclosure agreements (NDAs) and corporate billing documentation.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              3. Data Security & VPS Isolation
            </h2>
            <p>
              We enforce strict corporate security protocols to protect client data:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Zero Third-Party Data Selling:</strong> We never sell, rent, or monetarily trade client contact databases or workflow payloads to any third-party marketing entities.</li>
              <li><strong>Dedicated Server Isolation:</strong> On our Dedicated VPS deployment model, your automation engine runs directly inside your private cloud environment (AWS, GCP, Hetzner) with zero third-party data logging.</li>
              <li><strong>SSL & Encryption:</strong> All data transmissions are encrypted using standard TLS/SSL protocols and secure environment variable storage.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-purple" />
              4. Non-Disclosure Agreements (NDAs)
            </h2>
            <p>
              For enterprise automation suites and custom web application projects, DotnLott executes formal Non-Disclosure Agreements (NDAs) prior to accessing internal CRM databases or proprietary operational rules.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              5. Contact & Corporate Details
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request data deletion, please reach out to our team:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 text-xs mt-2">
              <div className="font-bold text-slate-900">A2Z Version Private Limited (Operating Brand: DotnLott)</div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue" />
                <a href="mailto:connect@dotnlott.com" className="text-brand-blue font-semibold hover:underline">connect@dotnlott.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-purple" />
                <span>Registered Office: Bihar, India | Operational Office: Odisha, India</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
