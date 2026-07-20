'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ChevronRight, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import type { BlogPost } from '../postsData';
import InteractiveParticles from '@/components/ui/InteractiveParticles';

interface PostClientProps {
  post: BlogPost;
}

export default function PostClient({ post }: PostClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      {/* Moving element canvas particle theme */}
      <InteractiveParticles density={45} particleColor="mixed" />

      {/* Background glow layers */}
      <div className="mesh-bg bg-brand-blue/5 top-20 right-10 animate-mesh-spin" style={{ animationDuration: '40s' }} />
      <div className="mesh-bg bg-brand-purple/5 bottom-20 left-10 animate-mesh-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] text-slate-400 font-light uppercase tracking-wider">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href="/blog" className="hover:text-slate-900 transition-colors">Resources</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-600 truncate max-w-[200px]">{post.category}</span>
        </nav>

        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-purple transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Grid layout (main content + sidebar CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main content column */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-5">
              <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-650 uppercase tracking-widest leading-none rounded">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-[10px] text-slate-450 font-light">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-display text-2xl sm:text-3.5xl font-black text-slate-900 leading-tight">
                {post.title}
              </h1>
              <p className="text-sm text-slate-600 font-light italic leading-relaxed border-l-2 border-brand-purple pl-4">
                {post.summary}
              </p>
            </div>

            {/* Render article body HTML */}
            <article
              className="prose prose-slate prose-xs max-w-none text-slate-650 leading-relaxed font-light mt-4 flex flex-col gap-6
                prose-headings:font-display prose-headings:text-slate-900 prose-headings:font-bold prose-headings:m-0 prose-headings:pt-2
                prose-h2:text-lg prose-h3:text-sm prose-p:m-0 prose-ul:m-0 prose-li:m-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Sidebar CTA column */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-purple/10 rounded-full blur-[60px]" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-brand-blue">
                <MessageSquare className="w-5 h-5 animate-pulse" />
              </div>
              <h2 className="text-lg font-bold font-display leading-tight">Implement This Suite in Your Workspace</h2>
              <p className="text-[11px] text-slate-350 leading-relaxed font-light">
                Do you want to automate CRM databases, messaging workflows, bespoke layouts, or AI pipelines customized to your parameters?
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3.5 border-t border-white/10 pt-5 text-[10px] text-slate-300 font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Fully Secure private API keys</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>12-Month pricing lock pilot guarantee</span>
              </div>
            </div>

            <Link
              href="/booking"
              className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 transition-colors rounded-xl shadow-lg"
            >
              Configure Solution
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
