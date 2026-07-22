'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Mail,
  MapPin,
  Send,
  Phone,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Calendar,
  AlertTriangle
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
    answer: 'DotnLott operates as a registered tech brand under A2Z Version Private Limited (CIN: U47721BR2026PTC085973). Our primary development & operational hub is located in Odisha, India.',
  },
];

const countryCodes = [
  { code: '+91', label: '🇮🇳 India (+91)' },
  { code: '+1', label: '🇺🇸 United States (+1)' },
  { code: '+1', label: '🇨🇦 Canada (+1)' },
  { code: '+44', label: '🇬🇧 United Kingdom (+44)' },
  { code: '+971', label: '🇦🇪 UAE (+971)' },
  { code: '+93', label: '🇦🇫 Afghanistan (+93)' },
  { code: '+355', label: '🇦🇱 Albania (+355)' },
  { code: '+213', label: '🇩🇿 Algeria (+213)' },
  { code: '+376', label: '🇦🇩 Andorra (+376)' },
  { code: '+244', label: '🇦🇴 Angola (+244)' },
  { code: '+54', label: '🇦🇷 Argentina (+54)' },
  { code: '+374', label: '🇦🇲 Armenia (+374)' },
  { code: '+61', label: '🇦🇺 Australia (+61)' },
  { code: '+43', label: '🇦🇹 Austria (+43)' },
  { code: '+994', label: '🇦🇿 Azerbaijan (+994)' },
  { code: '+973', label: '🇧🇭 Bahrain (+973)' },
  { code: '+880', label: '🇧🇩 Bangladesh (+880)' },
  { code: '+375', label: '🇧🇾 Belarus (+375)' },
  { code: '+32', label: '🇧🇪 Belgium (+32)' },
  { code: '+501', label: '🇧🇿 Belize (+501)' },
  { code: '+229', label: '🇧🇯 Benin (+229)' },
  { code: '+975', label: '🇧🇹 Bhutan (+975)' },
  { code: '+591', label: '🇧🇴 Bolivia (+591)' },
  { code: '+387', label: '🇧🇦 Bosnia (+387)' },
  { code: '+267', label: '🇧🇼 Botswana (+267)' },
  { code: '+55', label: '🇧🇷 Brazil (+55)' },
  { code: '+673', label: '🇧🇳 Brunei (+673)' },
  { code: '+359', label: '🇧🇬 Bulgaria (+359)' },
  { code: '+226', label: '🇧🇫 Burkina Faso (+226)' },
  { code: '+257', label: '🇧🇮 Burundi (+257)' },
  { code: '+855', label: '🇰🇭 Cambodia (+855)' },
  { code: '+237', label: '🇨🇲 Cameroon (+237)' },
  { code: '+238', label: '🇨🇻 Cape Verde (+238)' },
  { code: '+236', label: '🇨🇫 Central African Rep (+236)' },
  { code: '+235', label: '🇹🇩 Chad (+235)' },
  { code: '+56', label: '🇨🇱 Chile (+56)' },
  { code: '+86', label: '🇨🇳 China (+86)' },
  { code: '+57', label: '🇨🇴 Colombia (+57)' },
  { code: '+269', label: '🇰🇲 Comoros (+269)' },
  { code: '+242', label: '🇨🇬 Congo (+242)' },
  { code: '+506', label: '🇨🇷 Costa Rica (+506)' },
  { code: '+385', label: '🇭🇷 Croatia (+385)' },
  { code: '+53', label: '🇨🇺 Cuba (+53)' },
  { code: '+357', label: '🇨🇾 Cyprus (+357)' },
  { code: '+420', label: '🇨🇿 Czech Republic (+420)' },
  { code: '+45', label: '🇩🇰 Denmark (+45)' },
  { code: '+253', label: '🇩🇯 Djibouti (+253)' },
  { code: '+593', label: '🇪🇨 Ecuador (+593)' },
  { code: '+20', label: '🇪🇬 Egypt (+20)' },
  { code: '+503', label: '🇸🇻 El Salvador (+503)' },
  { code: '+372', label: '🇪🇪 Estonia (+372)' },
  { code: '+251', label: '🇪🇹 Ethiopia (+251)' },
  { code: '+679', label: '🇫🇯 Fiji (+679)' },
  { code: '+358', label: '🇫🇮 Finland (+358)' },
  { code: '+33', label: '🇫🇷 France (+33)' },
  { code: '+241', label: '🇬🇦 Gabon (+241)' },
  { code: '+220', label: '🇬🇲 Gambia (+220)' },
  { code: '+995', label: '🇬🇪 Georgia (+995)' },
  { code: '+49', label: '🇩🇪 Germany (+49)' },
  { code: '+233', label: '🇬🇭 Ghana (+233)' },
  { code: '+30', label: '🇬🇷 Greece (+30)' },
  { code: '+502', label: '🇬🇹 Guatemala (+502)' },
  { code: '+224', label: '🇬🇳 Guinea (+224)' },
  { code: '+504', label: '🇭🇳 Honduras (+504)' },
  { code: '+852', label: '🇭🇰 Hong Kong (+852)' },
  { code: '+36', label: '🇭🇺 Hungary (+36)' },
  { code: '+354', label: '🇮🇸 Iceland (+354)' },
  { code: '+62', label: '🇮🇩 Indonesia (+62)' },
  { code: '+964', label: '🇮🇶 Iraq (+964)' },
  { code: '+353', label: '🇮🇪 Ireland (+353)' },
  { code: '+972', label: '🇮🇱 Israel (+972)' },
  { code: '+39', label: '🇮🇹 Italy (+39)' },
  { code: '+81', label: '🇯🇵 Japan (+81)' },
  { code: '+962', label: '🇯🇴 Jordan (+962)' },
  { code: '+7', label: '🇰🇿 Kazakhstan (+7)' },
  { code: '+254', label: '🇰🇪 Kenya (+254)' },
  { code: '+82', label: '🇰🇷 South Korea (+82)' },
  { code: '+965', label: '🇰🇼 Kuwait (+965)' },
  { code: '+996', label: '🇰🇬 Kyrgyzstan (+996)' },
  { code: '+856', label: '🇱🇦 Laos (+856)' },
  { code: '+371', label: '🇱🇻 Latvia (+371)' },
  { code: '+961', label: '🇱🇧 Lebanon (+961)' },
  { code: '+218', label: '🇱🇾 Libya (+218)' },
  { code: '+370', label: '🇱🇹 Lithuania (+370)' },
  { code: '+352', label: '🇱🇺 Luxembourg (+352)' },
  { code: '+853', label: '🇲🇴 Macau (+853)' },
  { code: '+389', label: '🇲🇰 North Macedonia (+389)' },
  { code: '+261', label: '🇲🇬 Madagascar (+261)' },
  { code: '+60', label: '🇲🇾 Malaysia (+60)' },
  { code: '+960', label: '🇲🇻 Maldives (+960)' },
  { code: '+223', label: '🇲🇱 Mali (+223)' },
  { code: '+356', label: '🇲🇹 Malta (+356)' },
  { code: '+230', label: '🇲🇺 Mauritius (+230)' },
  { code: '+52', label: '🇲🇽 Mexico (+52)' },
  { code: '+373', label: '🇲🇩 Moldova (+373)' },
  { code: '+377', label: '🇲🇨 Monaco (+377)' },
  { code: '+976', label: '🇲🇳 Mongolia (+976)' },
  { code: '+382', label: '🇲🇪 Montenegro (+382)' },
  { code: '+212', label: '🇲🇦 Morocco (+212)' },
  { code: '+258', label: '🇲🇿 Mozambique (+258)' },
  { code: '+95', label: '🇲🇲 Myanmar (+95)' },
  { code: '+264', label: '🇳🇦 Namibia (+264)' },
  { code: '+977', label: '🇳🇵 Nepal (+977)' },
  { code: '+31', label: '🇳🇱 Netherlands (+31)' },
  { code: '+64', label: '🇳🇿 New Zealand (+64)' },
  { code: '+505', label: '🇳🇮 Nicaragua (+505)' },
  { code: '+227', label: '🇳🇪 Niger (+227)' },
  { code: '+234', label: '🇳🇬 Nigeria (+234)' },
  { code: '+47', label: '🇳🇴 Norway (+47)' },
  { code: '+968', label: '🇴🇲 Oman (+968)' },
  { code: '+92', label: '🇵🇰 Pakistan (+92)' },
  { code: '+507', label: '🇵🇦 Panama (+507)' },
  { code: '+595', label: '🇵🇾 Paraguay (+595)' },
  { code: '+51', label: '🇵🇪 Peru (+51)' },
  { code: '+63', label: '🇵🇭 Philippines (+63)' },
  { code: '+48', label: '🇵🇱 Poland (+48)' },
  { code: '+351', label: '🇵🇹 Portugal (+351)' },
  { code: '+974', label: '🇶🇦 Qatar (+974)' },
  { code: '+40', label: '🇷🇴 Romania (+40)' },
  { code: '+7', label: '🇷🇺 Russia (+7)' },
  { code: '+250', label: '🇷🇼 Rwanda (+250)' },
  { code: '+966', label: '🇸🇦 Saudi Arabia (+966)' },
  { code: '+221', label: '🇸🇳 Senegal (+221)' },
  { code: '+381', label: '🇷🇸 Serbia (+381)' },
  { code: '+65', label: '🇸🇬 Singapore (+65)' },
  { code: '+421', label: '🇸🇰 Slovakia (+421)' },
  { code: '+386', label: '🇸🇮 Slovenia (+386)' },
  { code: '+27', label: '🇿🇦 South Africa (+27)' },
  { code: '+34', label: '🇪🇸 Spain (+34)' },
  { code: '+94', label: '🇱🇰 Sri Lanka (+94)' },
  { code: '+46', label: '🇸🇪 Sweden (+46)' },
  { code: '+41', label: '🇨🇭 Switzerland (+41)' },
  { code: '+886', label: '🇹🇼 Taiwan (+886)' },
  { code: '+992', label: '🇹🇯 Tajikistan (+992)' },
  { code: '+255', label: '🇹🇿 Tanzania (+255)' },
  { code: '+66', label: '🇹🇭 Thailand (+66)' },
  { code: '+216', label: '🇹🇳 Tunisia (+216)' },
  { code: '+90', label: '🇹🇷 Turkey (+90)' },
  { code: '+993', label: '🇹🇲 Turkmenistan (+993)' },
  { code: '+256', label: '🇺🇬 Uganda (+256)' },
  { code: '+380', label: '🇺🇦 Ukraine (+380)' },
  { code: '+598', label: '🇺🇾 Uruguay (+598)' },
  { code: '+998', label: '🇺🇿 Uzbekistan (+998)' },
  { code: '+58', label: '🇻🇪 Venezuela (+58)' },
  { code: '+84', label: '🇻🇳 Vietnam (+84)' },
  { code: '+967', label: '🇾🇪 Yemen (+967)' },
  { code: '+260', label: '🇿🇲 Zambia (+260)' },
  { code: '+263', label: '🇿🇼 Zimbabwe (+263)' }
];

export default function ContactClient() {
  const [countryCode, setCountryCode] = useState('+91');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'AI Automation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    const scrollToCalendar = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const isBookingParam = search.includes('booking=true');

      if (hash === '#calendar-booking' || hash === '#booking' || hash === '#calendar' || isBookingParam) {
        const el = document.getElementById('calendar-booking');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    scrollToCalendar();
    const t1 = setTimeout(scrollToCalendar, 50);
    const t2 = setTimeout(scrollToCalendar, 250);
    const t3 = setTimeout(scrollToCalendar, 600);
    const t4 = setTimeout(scrollToCalendar, 1200);

    window.addEventListener('hashchange', scrollToCalendar);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('hashchange', scrollToCalendar);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const fullPhone = `${countryCode} ${formData.phone}`.trim();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          projectType: formData.category,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setShowSuccessToast(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'AI Automation',
          message: '',
        });
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 2000);
      } else {
        setSubmitError(data.error || 'Failed to deliver inquiry email. If this persists, please contact us directly.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitError('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
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
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-brand-purple/50 hover:bg-white hover:shadow-md transition-all group/item border-l-4 border-l-brand-purple">
                  <div className="w-11 h-11 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-display">Email Us</span>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2.5 text-[10.5px] sm:text-xs font-extrabold text-slate-900 min-w-0">
                      <a
                        href="mailto:connect@dotnlott.com"
                        className="hover:text-brand-purple transition-colors no-underline"
                        title="Email connect@dotnlott.com"
                      >
                        connect@dotnlott.com
                      </a>
                      <span className="text-slate-300 font-normal">|</span>
                      <a
                        href="mailto:hello.dotnlott@gmail.com"
                        className="hover:text-brand-purple transition-colors no-underline"
                        title="Email hello.dotnlott@gmail.com"
                      >
                        hello.dotnlott@gmail.com
                      </a>
                    </div>
                    <span className="text-[11px] text-slate-500 font-light">Formal RFPs & specs</span>
                  </div>
                </div>

                {/* Phone Box */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white hover:shadow-md transition-all group/item border-l-4 border-l-emerald-500">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-display">Call Us</span>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2.5 text-[10.5px] sm:text-xs font-extrabold text-slate-900 min-w-0">
                      <a
                        href="tel:+917846969508"
                        className="hover:text-emerald-600 transition-colors no-underline"
                        title="Call +91 78469 69508"
                      >
                        +91 78469 69508
                      </a>
                      <span className="text-slate-300 font-normal">|</span>
                      <a
                        href="tel:+918544121551"
                        className="hover:text-emerald-600 transition-colors no-underline"
                        title="Call +91 85441 21551"
                      >
                        +91 85441 21551
                      </a>
                    </div>
                    <span className="text-[11px] text-slate-500 font-light">Direct phone consultation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations Card (Fills remaining height to match form height!) */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex-grow">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-brand-blue" />

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-extrabold text-slate-900 font-display">Our Locations</h3>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">India</span>
              </div>

              <div className="my-auto">
                {/* Operational Address */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-1.5 border-l-4 border-l-brand-purple hover:bg-white transition-colors shadow-2xs">
                  <div className="flex items-center gap-2 text-brand-purple font-extrabold text-xs">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>Operational Address</span>
                  </div>
                  <p className="text-sm text-slate-900 font-bold leading-snug">Odisha, India</p>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    Primary Engineering, Design & System Deployment Team
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

                  {/* Phone / WhatsApp (Compulsory with Country Code) */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-slate-800">
                      Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-3 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all flex-shrink-0 cursor-pointer max-w-[150px] truncate"
                        aria-label="Country Code"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.label} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Service Category */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-category" className="text-xs font-bold text-slate-800">
                      Service Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="AI Automation">AI Automation</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Other">Other</option>
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

                    {submitError && (
                      <div className="w-full text-red-600 text-xs font-semibold p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 shadow-2xs">
                        <AlertTriangle className="w-4 h-4 text-red-650 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold font-display uppercase tracking-wide text-[10px] text-red-700">Submission Failed</span>
                          <span className="text-slate-650 font-normal leading-relaxed">{submitError}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit <Send className="w-4 h-4 text-brand-purple" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
            </div>
          </div>

        </div>

        {/* Google Calendar Appointment Scheduling Section */}
        <div id="calendar-booking" className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden flex flex-col gap-4 scroll-mt-24">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-blue" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-brand-purple/10 text-brand-purple">
                  <Calendar className="w-4 h-4" />
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                  Schedule a 1-on-1 Consultation
                </h2>
              </div>
              <p className="text-[11px] text-slate-550 font-light">
                Pick a convenient time slot directly on our calendar for a technical strategy session with our core team.
              </p>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 shadow-xs">
            {/* Google Calendar Appointment Scheduling begin */}
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2UTE7Tyix4j3_mrjSiw8hgMM5eeGEMD_czp0yPGtIUZxoJXe33s96vOJykcaVUtRqcosOzDoIt?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="490"
              frameBorder="0"
              title="Google Calendar Appointment Scheduling"
              className="w-full h-[490px]"
            />
            {/* end Google Calendar Appointment Scheduling */}
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

      {/* Floating Success Overlay Modal */}
      {showSuccessToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/20 backdrop-blur-xs">
          <div className="bg-white border border-slate-200/95 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full text-center animate-scale-in">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="text-lg font-black text-slate-900 font-display uppercase tracking-wide">Submitted Successfully</h4>
              <p className="text-xs text-slate-650 leading-relaxed font-light">
                Your inquiry has been registered. Our engineering leads will review your details shortly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
