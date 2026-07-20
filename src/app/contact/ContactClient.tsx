'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  ShieldCheck,
  Building2,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import InteractiveParticles from '@/components/ui/InteractiveParticles';

const contactFaqs = [
  {
    question: 'How quickly will your team respond to my inquiry?',
    answer: 'We typically respond within 2 to 4 business hours. If you send an inquiry over the weekend or on public holidays, we will get back to you by the next business morning.',
  },
  {
    question: 'Can we sign a Non-Disclosure Agreement (NDA) before sharing project specs?',
    answer: 'Absolutely. We take data confidentiality extremely seriously. We can sign a standard mutual NDA before reviewing your internal workflows, databases, or API credentials.',
  },
  {
    question: 'Can I directly schedule a 1-on-1 discovery call with your engineering team?',
    answer: 'Yes! You can use our Consult Now / Booking feature to pick a specific time slot on our calendar for a live Zoom or Google Meet technical session.',
  },
  {
    question: 'Where are DotnLott\'s operational and corporate headquarters located?',
    answer: 'DotnLott operates as a registered tech brand under A2Z Version Private Limited (CIN: U47721BR2026PTC085973). Our registered office is located in Bihar, India, and our primary development & operational hub is in Odisha, India.',
  },
];

const aiAutomationOptions = [
  'Email Marketing Automation Suite',
  'AI Lead Nurturing & WhatsApp Suite',
  'Customer Success & Reviews Suite',
  'Social Media Automation Suite',
  'AI Voice Agent Support Suite',
  'CRM & Lead Management Sync Suite',
  'Order & Inventory Management Suite',
  'Quotation & Invoice Automation Suite',
  'HR & Employee Onboarding Suite',
  'Custom Database & Internal Tools Suite',
  'Travel Business Automation Suite',
  'Website Business Automation Suite',
  'Bespoke Custom AI Automation'
];

const websiteDevOptions = [
  'Landing Page Website (1 Page — ₹2,999)',
  'Business Website (5–10 Pages — ₹7,999)',
  'Custom Dynamic Website (10–25 Pages — ₹12,999)',
  'E-Commerce Website (20–100+ Pages — ₹19,999)'
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'AI Automation',
    projectType: 'Email Marketing Automation Suite',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const handleCategoryChange = (cat: string) => {
    const defaultType = cat === 'AI Automation' ? aiAutomationOptions[0] : websiteDevOptions[0];
    setFormData((prev) => ({
      ...prev,
      category: cat,
      projectType: defaultType,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead to DB / backend
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Construct clean formatted WhatsApp message without emoji encoding issues
      const whatsappText = `*New Website Inquiry for DotnLott*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'N/A'}\n*Category:* ${formData.category}\n*Package / Type:* ${formData.projectType}\n\n*Message:* ${formData.message}`;

      const whatsappUrl = `https://wa.me/917846969508?text=${encodeURIComponent(whatsappText)}`;
      
      // Auto open WhatsApp chat in new window/app
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Moving element canvas particle theme */}
      <InteractiveParticles density={45} particleColor="mixed" />

      {/* Ambient background glows */}
      <div className="mesh-bg bg-brand-blue/5 top-10 left-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-14 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
            Let&apos;s Build Together
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Get in Touch with DotnLott
          </h1>
          <p className="text-sm text-slate-650 font-light leading-relaxed">
            Have a project in mind, need custom AI automation, or want to build a high-performance website? Reach out to our team today—we&apos;re ready to turn your ideas into high-impact digital solutions.
          </p>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">Fast Response Time</span>
              <span className="text-[11px] text-slate-500 font-light">Replies within 2-4 hours</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">NDA Protected</span>
              <span className="text-[11px] text-slate-500 font-light">Strict confidentiality signed</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">Verified MCA Brand</span>
              <span className="text-[11px] text-slate-500 font-light">A2Z Version Pvt Ltd</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Form + Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact & Offices (5 Cols - Flex Grow to match Right Form Height) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">
            
            {/* Direct Channels Card */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-purple" />

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-extrabold text-slate-900 font-display">Direct Channels</h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Online Now
                </span>
              </div>
              
              <div className="flex flex-col gap-3.5">
                {/* Email Box */}
                <a
                  href="mailto:connect@dotnlott.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-brand-purple/50 hover:bg-white hover:shadow-md transition-all group/item border-l-4 border-l-brand-purple"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-display">Email Us</span>
                    <span className="text-xs font-extrabold text-slate-900 group-hover/item:text-brand-purple transition-colors">connect@dotnlott.com</span>
                    <span className="text-[11px] text-slate-500 font-light">Formal RFPs & specs</span>
                  </div>
                </a>

                {/* Phone & WhatsApp Box */}
                <a
                  href="https://wa.me/917846969508?text=Hey%20DotnLott%20team%2C%20I%20am%20reaching%20out%20from%20your%20Contact%20page."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white hover:shadow-md transition-all group/item border-l-4 border-l-emerald-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-display">WhatsApp & Direct Call</span>
                    <span className="text-xs font-extrabold text-slate-900 group-hover/item:text-emerald-600 transition-colors">+91 78469 69508 | +91 85441 21551</span>
                    <span className="text-[11px] text-slate-500 font-light">Instant WhatsApp chat</span>
                  </div>
                </a>

                {/* Strategy Booking Box */}
                <Link
                  href="/booking"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white hover:shadow-xl hover:scale-[1.01] transition-all group/item border border-white/10"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-sky-400" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple font-display flex items-center gap-1">
                      Live Zoom Call <ArrowRight className="w-3 h-3 text-brand-purple group-hover/item:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs font-extrabold text-white">Book 1-on-1 Strategy Session</span>
                    <span className="text-[11px] text-slate-300 font-light">Select time on calendar</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Office Locations Card (Fills remaining height to match form height!) */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex-grow">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-brand-blue" />

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-extrabold text-slate-900 font-display">Our Locations</h3>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">India</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
                {/* Registered Office */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-1.5 border-l-4 border-l-brand-blue hover:bg-white transition-colors shadow-2xs">
                  <div className="flex items-center gap-2 text-brand-blue font-extrabold text-xs">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>Registered Office</span>
                  </div>
                  <p className="text-xs text-slate-900 font-bold leading-snug">Bihar, India</p>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">
                    A2Z Version Pvt Ltd<br />CIN: U47721BR2026PTC085973
                  </p>
                </div>

                {/* Operational Hub */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-1.5 border-l-4 border-l-brand-purple hover:bg-white transition-colors shadow-2xs">
                  <div className="flex items-center gap-2 text-brand-purple font-extrabold text-xs">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>Operational Hub</span>
                  </div>
                  <p className="text-xs text-slate-900 font-bold leading-snug">Odisha, India</p>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">
                    Primary Engineering & System Deployment Team
                  </p>
                </div>
              </div>

              {/* Bottom Mascot Quick Callout */}
              <div className="p-3 bg-brand-blue/5 border border-brand-blue/15 rounded-2xl flex items-center gap-3">
                <Image src="/mascot-v4.png" alt="Floto Mascot" width={36} height={36} className="object-contain animate-bounce flex-shrink-0" unoptimized />
                <span className="text-[11px] text-slate-700 font-medium leading-tight">
                  Floto & our core engineering team review every inquiry within <strong className="text-slate-900 font-bold">2–4 hours</strong>!
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-purple to-indigo-600" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

              {submitted ? (
                <div className="py-12 px-4 flex flex-col items-center justify-center text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-2 max-w-md">
                    <h3 className="text-2xl font-extrabold text-slate-900 font-display">Message Received!</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Thank you for contacting DotnLott. Our core team has received your details and will get back to you at <span className="font-semibold text-slate-900">{formData.email}</span> within 2 to 4 business hours.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full justify-center">
                    <a
                      href={`https://wa.me/917846969508?text=${encodeURIComponent(
                        `Hey Sonalika, I just submitted an inquiry on your website for ${formData.category} (${formData.projectType}). My name is ${formData.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat Instantly on WhatsApp
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">Send Us a Message</h3>
                    <p className="text-xs text-slate-550 font-light">
                      Fill out the form below and our leadership team will review your requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-xs font-bold text-slate-800">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-xs font-bold text-slate-800">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-slate-800">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>

                  {/* Service Category (Row 3 - Full Width) */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-category" className="text-xs font-bold text-slate-800">
                      Service Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="AI Automation">AI Automation</option>
                      <option value="Website Development">Website Development</option>
                    </select>
                  </div>

                  {/* Package / Solution Type (Row 4 - Full Width) */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-project-type" className="text-xs font-bold text-slate-800">
                      Package / Solution Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="contact-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      {(formData.category === 'AI Automation' ? aiAutomationOptions : websiteDevOptions).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-xs font-bold text-slate-800">
                      Project Details / Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Tell us about your current manual workflows, target website design, or technical challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Privacy note & Submit button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-[11px] text-slate-500 font-light flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      Your data is safe with us. We never spam.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry via WhatsApp <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="pt-10 flex flex-col gap-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">Got Questions?</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Contact & Inquiry FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
            {contactFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-250/70 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <h3 className="m-0 p-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/55 transition-colors border-0"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs font-bold text-slate-900 leading-snug">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    className="transition-all duration-350 overflow-hidden"
                    style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
