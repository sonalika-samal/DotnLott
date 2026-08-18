import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Zap, 
  Shield, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Database,
  Clock,
  MessageSquare,
  CheckSquare,
  LayoutDashboard,
  Bot,
  Check
} from 'lucide-react';
import InteractiveParticles from '@/components/ui/InteractiveParticles';

export const metadata: Metadata = {
  title: 'Setu - WhatsApp-Powered Taskforce Management Software | DotnLott',
  description: "Supercharge your team operations with Setu. Assign tasks from a central dashboard, notify employees instantly on WhatsApp, and sync status updates back automatically.",
  keywords: 'taskforce management, whatsapp communication, employee task tracking, Setu, DotnLott software, whatsapp dispatch',
  openGraph: {
    title: 'Setu - WhatsApp-Powered Taskforce Management Software | DotnLott',
    description: "Supercharge your team operations with Setu. Assign tasks from a central dashboard, notify employees instantly on WhatsApp, and sync status updates back automatically.",
    type: 'website',
  },
};

const features = [
  {
    icon: MessageSquare,
    title: 'Instant WhatsApp Alerts',
    desc: 'No custom app installs required. Employees are instantly notified on their personal WhatsApp as soon as a task is assigned to them.'
  },
  {
    icon: CheckSquare,
    title: 'WhatsApp Status Updates',
    desc: 'Employees reply directly via simple WhatsApp messages to update task progress, log milestones, or submit work completion notes.'
  },
  {
    icon: LayoutDashboard,
    title: 'Central Control Dashboard',
    desc: 'Employers gain a high-fidelity control dashboard summarizing all active tasks, employee statuses, logs, and completion metrics.'
  },
  {
    icon: Bot,
    title: 'Setu AI WhatsApp Assistant',
    desc: "Ask the Setu AI bot directly inside your WhatsApp thread to retrieve task details, check on employee progress, or fetch logistics summaries."
  },
  {
    icon: Zap,
    title: 'Dynamic Task Dispatch',
    desc: 'Assign tasks manually or set up auto-dispatch sequences based on employee location, workload capacity, or schedule tags.'
  },
  {
    icon: Database,
    title: 'Real-Time Database Sync',
    desc: 'All communications, check-ins, and task updates logged over WhatsApp are structured and synced in real-time to your core database.'
  }
];

export default function SetuPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900 font-sans">
      {/* Background Particles */}
      <InteractiveParticles density={40} particleColor="mixed" />

      {/* Ambient glows */}
      <div className="mesh-bg bg-brand-purple/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s' }} />
      <div className="mesh-bg bg-brand-blue/5 bottom-10 left-10 animate-mesh-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 z-10 relative">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center justify-center gap-6 min-h-[75vh] py-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
            Proprietary Software Suite
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900">
            Setu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue">WhatsApp Dispatch</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Supercharge task operations without forcing custom app downloads. Employers assign tasks from a centralized dashboard, employees receive alerts and submit status updates via personal WhatsApp, and data syncs back instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact?booking=true#calendar-booking"
              scroll={false}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-brand-purple text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 group hover:scale-[1.02]"
            >
              Book Dashboard Tour
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#pricing"
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-all duration-300 shadow-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Feature Grid Section */}
        <section id="features" className="py-20 mt-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frictionless Team Coordination via WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Discover how Setu combines the ease of messaging with the power of database-backed enterprise dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-purple/40 transition-all duration-300 flex flex-col gap-4 group"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-purple/10 text-brand-purple shadow-2xs group-hover:scale-115 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Monthly Pricing Plans Section */}
        <section id="pricing" className="py-16 border-t border-slate-200/60 mt-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-bold uppercase tracking-wider text-brand-purple w-fit mx-auto">
              Flexible Subscriptions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Monthly Subscription Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Flexible billing options designed for internal development capability or full technical orchestration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Self-Setup Plan */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Self-Setup Plan</h3>
                    <p className="text-xs text-slate-500 font-light mt-1">Configure credentials internally</p>
                  </div>
                </div>
                <div className="border-t border-b border-slate-100 py-4 my-1">
                  <div className="flex items-baseline gap-1 text-slate-900">
                    <span className="text-3xl font-black font-display">₹2,999</span>
                    <span className="text-xs text-slate-400 font-light">/ month</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">≈ $39 / mo equivalent</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    'Full Access to Setu Dashboard & Flow Manager',
                    'Integrate Your Own API Keys & Endpoints',
                    'Design System Prompts Inside Dashboard Settings',
                    'Set Up Your Own Database Connections',
                    'Client-Managed Infrastructure Control',
                    'Queued Technical Support Response'
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 font-light">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact?booking=true#calendar-booking"
                scroll={false}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-brand-blue text-white text-center font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-4"
              >
                Get Self-Setup
              </Link>
            </div>

            {/* Full-Setup Plan */}
            <div className="bg-white/95 backdrop-blur-md border-2 border-brand-purple rounded-3xl p-8 flex flex-col justify-between gap-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative ring-4 ring-brand-purple/10">
              <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-brand-blue via-brand-purple to-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md leading-none animate-pulse">
                Recommended 🔥
              </span>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Full-Setup Plan</h3>
                    <p className="text-xs text-brand-purple font-semibold mt-1">Complete API configuration by DotnLott</p>
                  </div>
                </div>
                <div className="border-t border-b border-slate-100 py-4 my-1">
                  <div className="flex items-baseline gap-1 text-slate-900">
                    <span className="text-3xl font-black font-display text-brand-purple">₹4,999</span>
                    <span className="text-xs text-slate-400 font-light">/ month</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">≈ $65 / mo equivalent</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    'Full Access to Setu Dashboard & Flow Manager',
                    'DotnLott Integrates & Sets Up All APIs',
                    'Prompt Engineering & Key Creation Included',
                    'Full Database Hooks Setup by Our Team',
                    'Direct CRM Integration Support',
                    'Quick Dedicated Support Channels'
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 font-light">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact?booking=true#calendar-booking"
                scroll={false}
                className="w-full py-3.5 rounded-2xl bg-brand-purple hover:bg-indigo-600 text-white text-center font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-4"
              >
                Get Full Setup Plan
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Live Demo Tour Box (Full Width Edge-to-Edge) */}
      <section className="relative w-full bg-slate-950 text-white border-t border-white/10 text-center py-24 px-6 mt-16 z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-indigo-600" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-purple-300">
            <Sparkles className="w-4 h-4 animate-pulse" /> Software Ready to Deploy
          </span>
          <h3 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight text-white">
            Get a Free Dashboard Tour
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
            We have already created the Setu software. Contact us today and we will schedule a live screen-share tour of the employer control panel and the WhatsApp workflow.
          </p>
          <Link
            href="/contact?booking=true#calendar-booking"
            scroll={false}
            className="mt-2 px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 group active:scale-95"
          >
            Schedule Live Tour <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
