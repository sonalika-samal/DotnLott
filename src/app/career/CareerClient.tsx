'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  Cpu,
  Code2,
  MessageSquare,
  Palette,
  Target,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import InteractiveParticles from '@/components/ui/InteractiveParticles';

// Job roles catalog
const openRoles = [
  {
    id: 'sales-bda',
    title: 'Sales and Business Development Associate',
    department: 'Growth & Business Development',
    type: 'Full-Time / Remote / Hybrid',
    location: 'Odisha / Remote (India)',
    isFeatured: true,
    badge: 'Immediate Opening',
    icon: TrendingUp,
    color: 'emerald',
    description:
      'Drive high-impact enterprise outreach, manage inbound lead pipelines, conduct discovery demos for AI automation and web studio services, and close new deals.',
    highlights: [
      'Engage prospective B2B clients and founders seeking AI automation & websites',
      'Lead product demos and explain ROI of automated workflows',
      'Drive customer pipeline from qualification to closing with commission bonuses',
      'Direct collaboration with founding partners on sales playbooks',
    ],
    requirements: [
      'Strong English written and verbal communication skills',
      'Self-driven mindset with interest in technology, SaaS, and AI tools',
      'Prior B2B sales, agency outreach, or business development experience is a plus',
    ],
  },
  {
    id: 'ai-automation-engineer',
    title: 'AI & Workflow Automation Engineer',
    department: 'AI Engineering',
    type: 'Full-Time / Remote',
    location: 'Remote (India)',
    isFeatured: false,
    badge: 'High Priority',
    icon: Cpu,
    color: 'purple',
    description:
      'Architect autonomous agent pipelines, multi-step n8n / Zapier / Make workflows, LLM tool-calling engines, and custom CRM sync microservices.',
    highlights: [
      'Design autonomous multi-agent systems and webhook integrations',
      'Connect CRMs, WhatsApp APIs, databases, and communication channels',
      'Optimize AI prompt chains and latency for production workloads',
    ],
    requirements: [
      'Hands-on experience with n8n, Python, Node.js, and REST APIs',
      'Familiarity with LangChain/LlamaIndex or OpenAI / Anthropic APIs',
      'Strong debugging and API integration fundamentals',
    ],
  },
  {
    id: 'fullstack-web-dev',
    title: 'Full-Stack Next.js & React Developer',
    department: 'Web Engineering',
    type: 'Full-Time / Remote',
    location: 'Remote (India)',
    isFeatured: false,
    badge: 'Active Hiring',
    icon: Code2,
    color: 'blue',
    description:
      'Build ultra-fast, sub-second web applications, SaaS dashboards, and client platforms using Next.js 16, React 19, TypeScript, and Tailwind CSS.',
    highlights: [
      'Develop modern client web platforms with cutting-edge App Router conventions',
      'Integrate Supabase / PostgreSQL databases and secure server actions',
      'Deliver fluid UI micro-interactions with 100/100 Lighthouse performance',
    ],
    requirements: [
      'Proficiency with Next.js, React, TypeScript, and modern CSS/Tailwind',
      'Understanding of server-side rendering, caching, and state management',
      'Experience with database ORMs, REST, or GraphQL endpoints',
    ],
  },
  {
    id: 'whatsapp-bot-specialist',
    title: 'Conversational AI & WhatsApp Solutions Specialist',
    department: 'Conversational Automation',
    type: 'Full-Time / Remote',
    location: 'Remote (India)',
    isFeatured: false,
    badge: 'Growing Team',
    icon: MessageSquare,
    color: 'emerald',
    description:
      'Create enterprise-grade WhatsApp conversational flows, AI support agents, CRM-integrated chat bots, and omni-channel automated customer support systems.',
    highlights: [
      'Implement WhatsApp Business Cloud API & Meta Graph endpoints',
      'Build dynamic conversational funnels for customer qualification & booking',
      'Integrate live agent handoff and CRM automated ticket updates',
    ],
    requirements: [
      'Experience with WhatsApp Cloud API, ManyChat, Botpress, or custom webhooks',
      'Knowledge of conversational UX and customer journey funnels',
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'Frontend UI/UX Designer & Developer',
    department: 'Design & Frontend Studio',
    type: 'Full-Time / Remote',
    location: 'Remote (India)',
    isFeatured: false,
    badge: 'Creative Role',
    icon: Palette,
    color: 'indigo',
    description:
      'Craft captivating digital experiences, dark/light glassmorphic UI designs, brand visuals, and convert Figma prototypes into interactive React components.',
    highlights: [
      'Design modern interactive landing pages, pitch decks, and web apps in Figma',
      'Implement pixel-perfect Framer Motion animations and fluid CSS transitions',
      'Maintain cohesive design tokens, typography, and responsive layouts',
    ],
    requirements: [
      'Strong portfolio showcasing modern UI/UX design (Figma/Web)',
      'Working knowledge of HTML, CSS, Tailwind CSS, or React is a huge advantage',
    ],
  },
  {
    id: 'b2b-lead-gen',
    title: 'B2B Lead Generation & Outreach Specialist',
    department: 'Growth Marketing',
    type: 'Full-Time / Remote',
    location: 'Remote (India)',
    isFeatured: false,
    badge: 'Marketing',
    icon: Target,
    color: 'amber',
    description:
      'Build automated outbound prospect lists, manage cold email infrastructure, LinkedIn growth systems, and run high-converting B2B outreach campaigns.',
    highlights: [
      'Manage multi-inbox cold email deliverability and personalized copy testing',
      'Target high-growth businesses and founders needing web & AI systems',
      'Monitor campaign analytics, reply rates, and qualify inbound leads',
    ],
    requirements: [
      'Experience with Apollo, Instantly/Smartlead, LinkedIn Sales Navigator, or scrapers',
      'Great copywriting ability with persuasive B2B outreach messaging',
    ],
  },
];

const countryCodes = [
  { code: '+91', label: '🇮🇳 India (+91)' },
  { code: '+1', label: '🇺🇸 United States (+1)' },
  { code: '+44', label: '🇬🇧 United Kingdom (+44)' },
  { code: '+971', label: '🇦🇪 UAE (+971)' },
  { code: '+65', label: '🇸🇬 Singapore (+65)' },
  { code: '+61', label: '🇦🇺 Australia (+61)' },
  { code: '+49', label: '🇩🇪 Germany (+49)' },
  { code: '+33', label: '🇫🇷 France (+33)' },
  { code: '+81', label: '🇯🇵 Japan (+81)' },
  { code: '+880', label: '🇧🇩 Bangladesh (+880)' },
  { code: '+977', label: '🇳🇵 Nepal (+977)' },
  { code: '+92', label: '🇵🇰 Pakistan (+92)' },
  { code: '+94', label: '🇱🇰 Sri Lanka (+94)' },
  { code: '+234', label: '🇳🇬 Nigeria (+234)' },
  { code: '+27', label: '🇿🇦 South Africa (+27)' },
];

export default function CareerClient() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    experience: '1-3 Years',
    portfolioUrl: '',
    noticePeriod: 'Immediate (Available Now)',
    message: '',
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Success Modal State
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    position: string;
    whatsappUrl: string;
  } | null>(null);

  // Handle position select and open popup modal
  const handleSelectRole = (roleTitle: string) => {
    setFormData((prev) => ({ ...prev, position: roleTitle }));
    setSubmitError(null);
    setIsFormModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const fullPhone = `${countryCode} ${formData.phone}`.trim();

      const response = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Trigger celebratory confetti
        try {
          const confettiMod = await import('canvas-confetti');
          confettiMod.default({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // Ignore confetti errors if not supported
        }

        const whatsappUrl = data.whatsappUrl;

        setSubmittedData({
          name: formData.name,
          email: formData.email,
          position: formData.position,
          whatsappUrl,
        });

        setIsFormModalOpen(false);
        setIsSuccessModalOpen(true);

        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          position: '',
          experience: '1-3 Years',
          portfolioUrl: '',
          noticePeriod: 'Immediate (Available Now)',
          message: '',
        });
      } else {
        setSubmitError(data.error || 'Failed to submit application. Please check the fields and try again.');
      }
    } catch (err) {
      console.error('Career submission error:', err);
      setSubmitError('A network error occurred. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900 pb-20">
      {/* Background Interactive Particles */}
      <InteractiveParticles density={40} particleColor="mixed" />

      {/* Decorative ambient background lights */}
      <div
        className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin"
        style={{ animationDuration: '30s' }}
      />
      <div
        className="mesh-bg bg-brand-purple/5 top-[600px] left-10 animate-mesh-spin"
        style={{ animationDuration: '40s', animationDirection: 'reverse' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-12">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold uppercase tracking-wider mb-5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>We Are Hiring • Join DotnLott</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.15]"
          >
            Shape the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-brand-purple to-purple-600">
              AI Automation
            </span>{' '}
            & High-Speed Web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Work with a passionate, founder-led team creating autonomous agent workflows, enterprise integrations, and
            cutting-edge web applications. Enjoy remote flexibility, fast ownership, and competitive rewards.
          </motion.p>

          {/* Quick Perks: 2*2 on mobile, 4*1 on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 lg:flex lg:flex-row lg:flex-nowrap items-stretch lg:items-center justify-center gap-2.5 sm:gap-3 max-w-sm sm:max-w-md lg:max-w-none mx-auto text-xs sm:text-sm font-medium text-slate-700"
          >
            <div className="flex items-center justify-center gap-1.5 px-3 py-2.5 lg:px-4 lg:py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center h-full whitespace-normal lg:whitespace-nowrap">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm leading-tight font-semibold">
                Remote & Hybrid Flexibility
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2.5 lg:px-4 lg:py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center h-full whitespace-normal lg:whitespace-nowrap">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm leading-tight font-semibold">
                Cutting-Edge AI & Web Tech
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2.5 lg:px-4 lg:py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center h-full whitespace-normal lg:whitespace-nowrap">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm leading-tight font-semibold">
                Performance Incentives
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2.5 lg:px-4 lg:py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center h-full whitespace-normal lg:whitespace-nowrap">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm leading-tight font-semibold">
                Rapid Career Growth
              </span>
            </div>
          </motion.div>
        </section>

        {/* OPEN ROLES SHOWCASE SECTION */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200/80 gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-brand-purple font-display">
                Current Opportunities
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Explore Open Positions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              Click &quot;Apply for this Role&quot; to open the application popup and submit your profile in under 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openRoles.map((role, idx) => {
              const IconComponent = role.icon;
              const isSelected = formData.position === role.title;
              const isSpecialRole = role.id === 'sales-bda';

              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative rounded-2xl bg-white border transition-all duration-300 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 ${
                    isSpecialRole
                      ? 'border-emerald-400/80 bg-gradient-to-b from-emerald-50/30 to-white'
                      : 'border-slate-200/90 hover:border-brand-blue/40'
                  }`}
                >
                  {/* Badge Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          isSpecialRole
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {role.badge}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{role.location.split('/')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSpecialRole
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-200'
                            : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {role.title}
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">
                          {role.department}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                      {role.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                      {role.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="text-brand-purple font-bold">•</span>
                          <span className="line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectRole(role.title)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSpecialRole
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SPONTANEOUS OPEN APPLICATION BANNER */}
        <section className="mb-20">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full inline-block mb-3">
                Open Applications
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                Don&apos;t see a role matching your exact skills?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                We are always excited to connect with exceptional engineers, automation builders, and growth minds.
                Submit an open application and our team will review your profile.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSelectRole('General Application / Other Role')}
              className="relative z-10 py-3.5 px-6 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Submit Open Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* HIRING PROCESS STEPS */}
        <section className="max-w-4xl mx-auto mt-20 pt-12 border-t border-slate-200/80">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-purple font-display">
              Transparent & Fast
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Our 4-Step Hiring Process
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-black text-brand-purple bg-purple-50 w-7 h-7 rounded-lg flex items-center justify-center border border-purple-200">
                01
              </span>
              <h4 className="text-sm font-bold text-slate-900">Application Review</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Our founders and leads review your resume, code samples, or sales background within 48 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-black text-blue-600 bg-blue-50 w-7 h-7 rounded-lg flex items-center justify-center border border-blue-200">
                02
              </span>
              <h4 className="text-sm font-bold text-slate-900">Intro Discovery Call</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                A 20-minute video or audio chat to discuss culture, role expectations, and career goals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 w-7 h-7 rounded-lg flex items-center justify-center border border-emerald-200">
                03
              </span>
              <h4 className="text-sm font-bold text-slate-900">Practical Assessment</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                A short, hands-on task relevant to your chosen role (mock pitch, workflow build, or UI design).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-black text-amber-600 bg-amber-50 w-7 h-7 rounded-lg flex items-center justify-center border border-amber-200">
                04
              </span>
              <h4 className="text-sm font-bold text-slate-900">Offer & Onboarding</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Receive your formal offer letter, meet the team, and dive straight into exciting customer projects.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* APPLICATION FORM POPUP MODAL */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsFormModalOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 scrollbar-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-brand-purple to-emerald-500" />

              <div className="mb-6 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>
                    {formData.position ? `Applying for: ${formData.position}` : 'Job Application Form'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  Submit Your Candidacy
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-light">
                  Please complete the form below. Once submitted, your profile will be sent directly to our hiring team
                  and you will receive an immediate confirmation email.
                </p>
              </div>

              {/* Error Message Banner */}
              {submitError && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">{submitError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Field: Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alex Carter"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                  />
                </div>

                {/* Two-column layout: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field: Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                    />
                  </div>

                  {/* Field: Phone / WhatsApp Number */}
                  <div className="min-w-0">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-20 sm:w-24 flex-shrink-0 px-2 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-brand-purple cursor-pointer"
                      >
                        {countryCodes.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 min-w-0 w-full px-3 sm:px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-column layout: Current City & Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field: Current City / Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Current Location / City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Bhubaneswar, Bengaluru, Delhi"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                    />
                  </div>

                  {/* Field: Position Selection Dropdown (REQUIRED ROLES) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Position Applied For <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                    >
                      <option value="" disabled>
                        -- Select a Role / Position * --
                      </option>
                      {/* Must include 'Sales and Business Development Associate' and service roles */}
                      <option value="Sales and Business Development Associate">
                        ★ Sales and Business Development Associate
                      </option>
                      <option value="AI & Workflow Automation Engineer">
                        AI & Workflow Automation Engineer (n8n / Python / Agents)
                      </option>
                      <option value="Full-Stack Next.js & React Developer">
                        Full-Stack Next.js & React Developer
                      </option>
                      <option value="Conversational AI & WhatsApp Solutions Specialist">
                        Conversational AI & WhatsApp Solutions Specialist
                      </option>
                      <option value="Frontend UI/UX Designer & Developer">
                        Frontend UI/UX Designer & Developer
                      </option>
                      <option value="B2B Lead Generation & Outreach Specialist">
                        B2B Lead Generation & Outreach Specialist
                      </option>
                      <option value="General Application / Other Role">
                        Other / General Application
                      </option>
                    </select>
                  </div>
                </div>

                {/* Two-column layout: Experience Level & Notice Period */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field: Experience Level */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Experience Level <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                    >
                      <option value="Fresher / 0 - 1 Year">Fresher / 0 - 1 Year</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years (Senior / Lead)</option>
                    </select>
                  </div>

                  {/* Field: Notice Period */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Availability / Notice Period
                    </label>
                    <select
                      value={formData.noticePeriod}
                      onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                    >
                      <option value="Immediate (Available Now)">Immediate (Available Now)</option>
                      <option value="Within 15 Days">Within 15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="More than 30 Days">More than 30 Days</option>
                    </select>
                  </div>
                </div>

                {/* Field: Resume / Portfolio / LinkedIn / GitHub URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Resume Link / LinkedIn / Portfolio URL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/... or Google Drive link"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all"
                  />
                  <p className="text-[11px] text-slate-500 mt-1 font-light">
                    Tip: If linking a Google Drive file, please ensure link access is set to &quot;Anyone with the link can view&quot;.
                  </p>
                </div>

                {/* Field: Why DotnLott / Cover Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Why do you want to join DotnLott? / Cover Note <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share a brief overview of your background, your key accomplishments, and what excites you about DotnLott..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all leading-relaxed"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-brand-purple to-purple-600 text-white font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application Now</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-500 mt-3 font-light">
                    🔒 By submitting, your details will be processed confidentially by DotnLott talent team.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APPLIED SUCCESSFULLY MODAL */}
      <AnimatePresence>
        {isSuccessModalOpen && submittedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Icon */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-5 mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              {/* Title & Message */}
              <div className="text-center mb-6">
                <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
                  Application Dispatched
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                  Applied Successfully! 🎉
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Thanks for applying, <strong>{submittedData.name}</strong>! We have received your application for the{' '}
                  <strong className="text-brand-purple">{submittedData.position}</strong> role.
                </p>
              </div>

              {/* Confirmation Email Alert Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-left mb-6 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confirmation Mail Dispatched</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  A confirmation email has been sent to <strong>{submittedData.email}</strong>. Our hiring team will review your profile and reach out to you shortly.
                </p>
              </div>

              {/* Done / Close CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  Done & Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
