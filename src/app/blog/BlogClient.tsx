'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Shuffle, MessageSquare, ShieldCheck } from 'lucide-react';
import { blogPosts } from './postsData';

export default function BlogClient() {
  const [currentPost, setCurrentPost] = useState<typeof blogPosts[0] | null>(null);

  const selectRandomPost = () => {
    const randomIdx = Math.floor(Math.random() * blogPosts.length);
    const selected = blogPosts[randomIdx];
    setCurrentPost(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      selectRandomPost();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  // Get author initials
  const initials = currentPost.author
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Background glow layers */}
      <div className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '35s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 left-10 animate-mesh-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-brand-purple justify-center w-fit mx-auto md:mx-0 shadow-sm">
              <BookOpen className="w-4 h-4 text-brand-blue animate-pulse" />
              Evergreen Resources Vault
            </span>
            <h1 className="font-display text-3xl sm:text-4.5xl font-black text-slate-900 leading-tight">
              DotnLott Knowledge Hub
            </h1>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Explore 100+ evergreen engineering handbooks and operational workflow tutorials. A different article is featured every time you visit.
            </p>
          </div>

          <button
            onClick={selectRandomPost}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:scale-103 active:scale-97 flex-shrink-0"
          >
            <Shuffle className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
            Read Another Random Article
          </button>
        </div>

        {/* Dynamic Post Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main article content card */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-5">
              <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-650 uppercase tracking-widest leading-none rounded">
                {currentPost.category}
              </span>
              <div className="flex items-center gap-4 text-[10px] text-slate-450 font-light">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {currentPost.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {currentPost.readTime}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl sm:text-3.5xl font-black text-slate-900 leading-tight">
                {currentPost.title}
              </h2>
              <p className="text-sm text-slate-600 font-light italic leading-relaxed border-l-2 border-brand-purple pl-4">
                {currentPost.summary}
              </p>
            </div>

            <article
              className="prose prose-slate prose-xs max-w-none text-slate-650 leading-relaxed font-light mt-4 flex flex-col gap-6
                prose-headings:font-display prose-headings:text-slate-900 prose-headings:font-bold prose-headings:m-0 prose-headings:pt-2
                prose-h2:text-lg prose-h3:text-sm prose-p:m-0 prose-ul:m-0 prose-li:m-0"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />
          </div>

          {/* Sidebar block */}
          <div className="flex flex-col gap-6">
            {/* Author details card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">About The Author</span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple font-extrabold flex items-center justify-center text-sm shadow-sm">
                  {initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-none">{currentPost.author}</span>
                  <span className="text-[9px] text-slate-450 mt-1 font-light">DotnLott Core Team</span>
                </div>
              </div>
            </div>

            {/* Conversational Callout */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-[60px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-purple/10 rounded-full blur-[60px]" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-brand-blue">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold font-display leading-tight">Need help implementing this system?</h2>
                <p className="text-[10px] text-slate-350 leading-relaxed font-light">
                  Our systems are engineered by our core leadership team to guarantee secure, production-ready server configurations and seamless integrations.
                </p>
              </div>

              <div className="relative z-10 flex flex-col gap-3.5 border-t border-white/10 pt-5 text-[10px] text-slate-300 font-light font-sans">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Fully secure integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>12-Month pricing lock pilot guarantee</span>
                </div>
              </div>

              <Link
                href="/booking"
                className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors hover:bg-slate-100 shadow-md"
              >
                Configure Solution
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
