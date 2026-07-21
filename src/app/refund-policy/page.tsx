import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy | DotnLott (A2Z Version Pvt Ltd)',
  description: 'Refund Policy for DotnLott (A2Z Version Private Limited). Clear, transparent guidelines on project cancellations, pilot guarantees, and refund processing.',
  openGraph: {
    title: 'Refund Policy | DotnLott',
    description: 'Refund Policy for DotnLott (A2Z Version Private Limited).',
    type: 'website',
  },
};

export default function RefundPolicyPage() {
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
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue font-display">A2Z Version Pvt Ltd</span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                  Refund & Cancellation Policy
                </h1>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            At <strong>DotnLott</strong> (operated under <strong>A2Z Version Private Limited</strong>), we are committed to complete transparency and client satisfaction across all our digital engineering, website development, and workflow automation services.
          </p>
        </div>

        {/* Content Body Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 md:p-10 shadow-xs flex flex-col gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
          
          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Starter & Growth Pilot Setup Guarantee
            </h2>
            <p>
              For our standardized automation starter packs (starting at ₹499 / $6), we provide a <strong>100% Onboarding Guarantee</strong>:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>If our engineering team is unable to configure and deploy the chosen hero automation workflow to your workspace within 10 business days of receiving valid credentials, you are eligible for a 100% full refund.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              2. Custom Engineering & Web Project Cancellations
            </h2>
            <p>
              For custom website development projects and bespoke multi-branch automation architectures:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Cancellation Before Work Kickoff:</strong> If a cancellation request is submitted in writing prior to project discovery/kickoff, a 100% full refund will be issued minus any third-party payment processing fees.</li>
              <li><strong>Cancellation During Wireframe/Design Phase:</strong> A 70% refund of the initial deposit is applicable prior to final UI approval and custom code compilation.</li>
              <li><strong>Post-Deployment & Code Transfer:</strong> Once final source code repositories or live VPS automation servers are transferred and handed over to the client, refunds are non-applicable due to the bespoke digital nature of the work.</li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-purple" />
              3. Refund Processing & Timelines
            </h2>
            <p>
              Approved refund requests are processed within <strong>5 to 7 business days</strong> back to the original method of payment (bank transfer, credit/debit card, or UPI gateway).
            </p>
          </section>

          <hr className="border-slate-100" />

          <section className="flex flex-col gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              4. How to Submit a Cancellation Request
            </h2>
            <p>
              To initiate a cancellation or refund request, please email our billing department with your invoice/order details:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 text-xs mt-2">
              <div className="font-bold text-slate-900">Billing & Client Support</div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue" />
                <a href="mailto:connect@dotnlott.com" className="text-brand-blue font-semibold hover:underline">connect@dotnlott.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-purple" />
                <span>A2Z Version Private Limited | Operational Address: Odisha, India</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
