'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  Layers,
  Webhook,
  Sparkles,
  Zap,
  Mail,
  MessageCircle,
  Database,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Award
} from 'lucide-react';

export default function HomePage() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      {/* Decorative Background Light Mesh Gradients */}
      <div className="mesh-bg bg-brand-blue/5 top-20 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-40 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-blue w-fit"
            >
              <Sparkles className="w-4.5 h-4.5 text-brand-purple animate-pulse" />
              Simple & Smart Business Automations
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-slate-900"
            >
              Dream.<br />
              <span className="bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-purple bg-clip-text text-fill-transparent drop-shadow-sm">
                Automate & Build.
              </span><br />
              Repeat.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
            >
              Save hours of time by putting your daily tasks on autopilot. Automatically find new customers, schedule meetings, answer support emails, and manage your spreadsheets with zero coding knowledge.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
              >
                Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-700 glass-card hover:glass-card-hover rounded-full transition-colors"
              >
                Explore 35+ Tools
              </Link>
            </motion.div>

            {/* Corporate trust badging */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 mt-6 border-t border-slate-200 pt-6 text-slate-500 text-xs"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-brand-blue" />
                <span>Registered Private Limited Company</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-brand-purple" />
                <span>Guaranteed Support & Setup</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual: Mascot with dialogue box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Soft background glow */}
            <div className="absolute w-72 h-72 rounded-full bg-brand-blue/5 blur-[80px] pointer-events-none" />

            {/* Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-6 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-lg max-w-xs z-20 text-xs text-slate-700 font-semibold after:content-[''] after:absolute after:bottom-[-8px] after:left-[45px] after:border-8 after:border-t-white after:border-r-transparent after:border-l-transparent after:border-b-transparent after:z-10 before:content-[''] before:absolute before:bottom-[-9px] before:left-[44px] before:border-9 before:border-t-slate-200 before:border-r-transparent before:border-l-transparent before:border-b-transparent before:z-0"
            >
              <span className="flex items-center gap-1 text-brand-purple font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Lott:
              </span>
              Let's put your customer outreach and operations on autopilot! 😉
            </motion.div>

            {/* Mascot Robot Wrapper */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 animate-float flex items-center justify-center">
              <Image
                src="/mascot.png"
                alt="DotnLott Robot Mascot"
                width={380}
                height={380}
                className="object-contain drop-shadow-[0_15px_30px_rgba(27,99,255,0.12)]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works (Workflow animation) */}
      <section className="relative py-20 border-t border-slate-200 bg-white/40 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">How It Works</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Visualizing Your Business on Autopilot
            </h2>
            <p className="text-sm text-slate-600">
              See how customer information is collected, processed by our smart helpers, and sent directly to your emails and WhatsApp chats.
            </p>
          </div>

          {/* Workflow Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
            
            {/* Input Sources */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center lg:text-left">1. Where Tasks Start</h3>
              
              <div className="glass-card hover:glass-card-hover p-4 rounded-2xl flex items-center gap-4 transition-all group bg-white">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                  <Webhook className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Form Submissions</h4>
                  <p className="text-[11px] text-slate-500">When someone fills out a form on your site</p>
                </div>
              </div>

              <div className="glass-card hover:glass-card-hover p-4 rounded-2xl flex items-center gap-4 transition-all group bg-white">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                  <Layers className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Automatic Business Finder</h4>
                  <p className="text-[11px] text-slate-500">Finds contact info for potential customers</p>
                </div>
              </div>
            </div>

            {/* Processor Node */}
            <div className="flex flex-col items-center justify-center py-8 lg:py-0 relative">
              {/* Outer pulsing ring */}
              <div className="absolute w-48 h-48 rounded-full border border-brand-purple/15 animate-pulse-glow" />
              
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple p-[1px] glow-purple relative z-10 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center p-4 text-center">
                  <Cpu className="w-10 h-10 text-brand-purple animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-xs font-bold text-slate-900 mt-2">DotnLott Brain</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Smart Assistant</span>
                </div>
              </div>
              
              <div className="text-xs font-semibold text-brand-purple mt-6 bg-white border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3 h-3 fill-brand-purple text-brand-purple" />
                Running task autopilot...
              </div>
            </div>

            {/* Targets / Actions */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center lg:text-left">2. Where Tasks Finish</h3>
              
              <div className="glass-card hover:glass-card-hover p-4 rounded-2xl flex items-center gap-4 transition-all group bg-white">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">WhatsApp and Email Alerts</h4>
                  <p className="text-[11px] text-slate-500">Sends alerts and answers customer questions</p>
                </div>
              </div>

              <div className="glass-card hover:glass-card-hover p-4 rounded-2xl flex items-center gap-4 transition-all group bg-white">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Database className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Saved Secure Database</h4>
                  <p className="text-[11px] text-slate-500">Stores your customer details safely</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 border-t border-slate-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Solutions We Build</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Services We Automate For You
            </h2>
            <p className="text-sm text-slate-600">
              We set up automated workflows that run silently in the background. You do not need any coding or technical experience to use them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Marketing outreach */}
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-4 group hover:border-brand-blue/30 transition-colors bg-white shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                <Mail className="w-6 h-6 group-hover:rotate-6 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">1. Automated Customer Outreach</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Automatically find business leads, clean up invalid emails, and send personalized messages. Includes delivery safety features to ensure your messages land directly in the primary inbox, not the spam folder.
              </p>
              <Link href="/catalog" className="text-xs font-bold text-brand-blue flex items-center gap-1.5 mt-2 hover:underline">
                View 18 Outreach Tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: CRM & Calendar */}
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-4 group hover:border-brand-purple/30 transition-colors bg-white shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                <Calendar className="w-6 h-6 group-hover:rotate-6 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">2. Calendar & Meeting Sync</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Automatically sync your business calendars with your customer database. Adds client meetings, prevents double-bookings, and emails meeting summaries to your team.
              </p>
              <Link href="/catalog" className="text-xs font-bold text-brand-purple flex items-center gap-1.5 mt-2 hover:underline">
                View Meeting Sync Tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: AI Helpdesks */}
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-4 group hover:border-brand-purple/30 transition-colors bg-white shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                <Cpu className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">3. AI Customer Support Assistant</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Reads support emails, looks at error screenshots from clients, and drafts helpful answers. Your team can review the draft and send it with one click.
              </p>
              <Link href="/catalog" className="text-xs font-bold text-brand-purple flex items-center gap-1.5 mt-2 hover:underline">
                View Support Tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4: Customer Retention */}
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-4 group hover:border-brand-blue/30 transition-colors bg-white shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">4. Customer Loyalty & Review Booster</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Keep clients happy automatically. Sends satisfaction check-ins, automatically requests Google Reviews when clients pay, and manages a customer referral reward program.
              </p>
              <Link href="/catalog" className="text-xs font-bold text-brand-blue flex items-center gap-1.5 mt-2 hover:underline">
                View Loyalty Tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Conversion Call-To-Action */}
      <section className="relative py-20 border-t border-slate-200 bg-slate-100/40 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-purple p-[1px] glow-blue flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center p-2.5">
              <Image
                src="/logo.png"
                alt="DotnLott Logo Center"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 max-w-2xl leading-tight">
            Stop Spending Hours on Repetitive Daily Work
          </h2>
          
          <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
            Our library of 35+ custom tools is ready to save you time. Switch between Indian Mode (Rupees) or Abroad Mode (Dollars) in the top menu and calculate your setup cost instantly!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
            >
              Build Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-700 glass-card hover:glass-card-hover rounded-full transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
