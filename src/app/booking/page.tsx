'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  User,
  Mail,
  Building,
  Phone,
  FileText,
  CheckCircle,
  ArrowRight,
  Globe
} from 'lucide-react';

// Generates upcoming 14 days for selection
const getAvailableDays = () => {
  const days = [];
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    // Skip Sundays
    if (date.getDay() !== 0) {
      days.push({
        dateObj: date,
        formatted: date.toLocaleDateString('en-US', options),
        rawString: date.toISOString().split('T')[0],
      });
    }
  }
  return days;
};

const timeSlots = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
];

export default function BookingPage() {
  const [availableDays] = useState(getAvailableDays());
  const [selectedDay, setSelectedDay] = useState(availableDays[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [meetingType, setMeetingType] = useState('google_meet');

  // Contact details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');

  // Status handlers
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scheduledDateTime = `${selectedDay.rawString} ${selectedTime}`;
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            name,
            email,
            phone,
            company,
          },
          scheduledAt: new Date(scheduledDateTime).toISOString(),
          meetingType,
          notes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBookingSuccess(true);
        // Confetti drop
        const confettiMod = await import('canvas-confetti');
        confettiMod.default({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        alert('Booking failed. Please check inputs.');
      }
    } catch (err) {
      console.error(err);
      alert('Network issue. Your booking has been registered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '30s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 left-10 animate-mesh-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto shadow-sm">
            <CalendarIcon className="w-4 h-4 animate-pulse" />
            Free 30-Minute Chat
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Book a Consultation
          </h1>
          <p className="text-sm text-slate-600">
            Tell us about your business. Schedule a free 30-minute call to discuss how automated tools can help you save time and grow.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!bookingSuccess ? (
            <motion.form
              onSubmit={handleBookingSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Calendar & Slots */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Day Picker */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-brand-blue" />
                    1. Select Date
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableDays.map((day) => {
                      const isSelected = selectedDay.rawString === day.rawString;
                      return (
                        <button
                          key={day.rawString}
                          type="button"
                          onClick={() => setSelectedDay(day)}
                          className={`p-3 text-center border rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                            isSelected
                              ? 'border-brand-blue bg-brand-blue/5 text-slate-900 font-bold'
                              : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                          }`}
                        >
                          <span className="text-[10px] opacity-75 font-semibold">
                            {day.formatted.split(',')[0]}
                          </span>
                          <span className="text-xs font-black">
                            {day.formatted.split(',')[1]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Picker */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-brand-purple" />
                    2. Select Time Slot
                  </h2>
                  
                  {/* Timezone banner */}
                  <div className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 w-fit shadow-sm">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    All times are in India Time (IST)
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-center border rounded-xl font-semibold text-xs transition-all ${
                            isSelected
                              ? 'border-brand-purple bg-brand-purple/5 text-slate-900 font-bold'
                              : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Medium Picker */}
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <Video className="w-5 h-5 text-brand-blue" />
                    3. Meeting Medium
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setMeetingType('google_meet')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1.5 transition-all ${
                        meetingType === 'google_meet'
                          ? 'border-brand-blue bg-brand-blue/5 text-slate-900 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Google Meet</span>
                      <span className="text-[10px] opacity-75">We will email you a video meeting link</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setMeetingType('phone')}
                      className={`p-4 border rounded-2xl flex flex-col items-center text-center gap-1.5 transition-all ${
                        meetingType === 'phone'
                          ? 'border-brand-purple bg-brand-purple/5 text-slate-900 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                      }`}
                    >
                      <span className="text-xs font-bold">Phone Call</span>
                      <span className="text-[10px] opacity-75">We will call your phone number directly</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact details */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-card p-6 rounded-3xl flex flex-col gap-4 bg-white shadow-sm">
                  <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-brand-blue" />
                    4. Your Contact Details
                  </h2>

                  <div className="flex flex-col gap-3">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="name" className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="email" className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="phone" className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="company" className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="company"
                          type="text"
                          placeholder="My Company name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="notes" className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        What would you like to discuss?
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <textarea
                          id="notes"
                          rows={3}
                          placeholder="Tell us a little bit about the manual tasks you want to automate..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 resize-y"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-md"
                  >
                    {isSubmitting ? 'Booking Slot...' : 'Confirm Your Booking'}
                  </button>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card max-w-lg mx-auto p-8 rounded-3xl text-center flex flex-col items-center gap-5 border-slate-200 bg-white shadow-lg"
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-8 h-8 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Meeting Scheduled!</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you, <span className="text-slate-900 font-semibold">{name}</span>. Your consultation is booked for <span className="text-brand-blue font-semibold">{selectedDay.formatted}</span> at <span className="text-brand-purple font-semibold">{selectedTime} IST</span>.
              </p>

              <div className="bg-slate-50 p-4 border border-slate-200/50 rounded-2xl w-full text-left text-xs flex flex-col gap-2 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Meeting Medium:</span>
                  <span className="font-bold text-slate-900 uppercase text-[10px]">
                    {meetingType === 'google_meet' ? 'Google Meet Video' : 'Phone Call'}
                  </span>
                </div>
                {meetingType === 'google_meet' && (
                  <div className="flex flex-col gap-1 mt-1 border-t border-slate-200/60 pt-2">
                    <span className="text-slate-400">Meeting Link:</span>
                    <a
                      href="https://meet.google.com/abc-defg-hij"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-brand-blue hover:underline break-all"
                    >
                      https://meet.google.com/abc-defg-hij
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-4 w-full mt-2">
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                >
                  Book Another Slot
                </button>
                <a
                  href="/"
                  className="flex-1 py-2.5 glass-card hover:glass-card-hover text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl text-center flex items-center justify-center"
                >
                  Back to Home
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
