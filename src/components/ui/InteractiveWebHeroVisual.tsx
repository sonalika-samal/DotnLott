'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gauge, 
  Globe, 
  Zap, 
  Lock, 
  Code2, 
  Activity,
  Keyboard,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function InteractiveWebHeroVisual() {
  const [activeTab, setActiveTab] = useState<'code' | 'lighthouse' | 'cdn'>('code');
  const [typedCode, setTypedCode] = useState('DotnLott');
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Keyboard keys array for the interactive laptop deck
  const keys = ['D', 'O', 'T', 'N', 'L', 'O', 'T', 'T'];

  const handleKeyPress = (key: string) => {
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 200);
    setTypedCode((prev) => {
      if (prev === 'DotnLott') return key;
      if (prev.length >= 16) return prev;
      return prev + key.toLowerCase();
    });
  };

  const handleBackspace = () => {
    setActiveKey('BACKSPACE');
    setTimeout(() => setActiveKey(null), 200);
    setTypedCode((prev) => (prev.length > 0 ? prev.slice(0, -1) : ''));
  };

  const handleAutoTypeDotnLott = () => {
    setTypedCode('');
    const target = 'DotnLott';
    let i = 0;
    const interval = setInterval(() => {
      if (i < target.length) {
        const char = target[i];
        setTypedCode((prev) => prev + char);
        setActiveKey(char.toUpperCase());
        setTimeout(() => setActiveKey(null), 150);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
  };

  return (
    <div className="relative w-full max-w-[520px] mx-auto pt-0 pb-1">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/15 via-indigo-500/15 to-brand-purple/15 rounded-3xl blur-3xl animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />

      {/* Floating Micro Badges Header Strip */}
      <div className="flex items-center justify-between gap-2 mb-1.5 relative z-30 px-1">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white/95 backdrop-blur-md border border-emerald-200 shadow-sm rounded-xl px-3 py-1 flex items-center gap-1.5 text-[10px] font-bold text-slate-800"
        >
          <Zap className="w-3 h-3 text-emerald-500" />
          <span>0.32s Sub-Second LCP</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="bg-white/95 backdrop-blur-md border border-purple-200 shadow-sm rounded-xl px-3 py-1 flex items-center gap-1.5 text-[10px] font-bold text-slate-800"
        >
          <Gauge className="w-3 h-3 text-brand-purple animate-pulse" />
          <span>Lighthouse 100/100</span>
        </motion.div>
      </div>

      {/* MAIN SLEEK BROWSER IDE WINDOW */}
      <div className="relative z-20 bg-slate-950 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mt-0">
        {/* Browser Top Window Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-3.5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* URL Bar */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-0.5 flex items-center gap-1.5 text-[10px] font-mono text-slate-300 w-56 justify-center shadow-inner">
            <Lock className="w-2.5 h-2.5 text-emerald-400" />
            <span className="truncate">
              https://client.{typedCode ? typedCode.toLowerCase().replace(/[^a-z0-9]/g, '') : 'app'}.com
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-auto" />
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* IDE TAB STRIP */}
        <div className="bg-slate-900/60 border-b border-slate-800/80 px-3 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-[10px] font-mono font-bold flex items-center gap-1 border-b-2 transition-all ${
              activeTab === 'code'
                ? 'border-brand-blue text-white bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3 h-3 text-blue-400" />
            <span>App.tsx</span>
          </button>

          <button
            onClick={() => setActiveTab('lighthouse')}
            className={`px-3 py-1.5 text-[10px] font-mono font-bold flex items-center gap-1 border-b-2 transition-all ${
              activeTab === 'lighthouse'
                ? 'border-emerald-400 text-white bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-3 h-3 text-emerald-400" />
            <span>Lighthouse.audit</span>
          </button>

          <button
            onClick={() => setActiveTab('cdn')}
            className={`px-3 py-1.5 text-[10px] font-mono font-bold flex items-center gap-1 border-b-2 transition-all ${
              activeTab === 'cdn'
                ? 'border-purple-400 text-white bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3 h-3 text-purple-400" />
            <span>Edge.cdn</span>
          </button>
        </div>

        {/* TAB CONTENT AREA (Lower Baseline Aligned with Left Column) */}
        <div className="p-4 sm:p-4.5 font-mono min-h-[265px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeTab === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="space-y-1.5 text-[11px] leading-tight"
              >
                <div className="text-slate-400 text-[10px]">// Next.js 15 Server Component</div>
                <div>
                  <span className="text-purple-400">import</span> {'{'} SpeedEngine {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/dotnlott/web'</span>;
                </div>

                {/* DYNAMICALLY TYPED CODE LINE */}
                <div className="pt-1">
                  <span className="text-blue-400">export default async function</span>{' '}
                  <span className="text-yellow-300 font-bold bg-yellow-400/10 px-1 py-0.5 rounded border border-yellow-400/30 inline-flex items-center">
                    {typedCode || <span className="text-slate-600 italic font-normal">YourName</span>}
                    <span className="text-emerald-400 animate-ping font-normal ml-0.5">|</span>
                  </span>
                  () {'{'}
                </div>

                <div className="pl-3 text-slate-300">
                  <span className="text-purple-400">const</span> data = <span className="text-blue-400">await</span> SpeedEngine.<span className="text-cyan-300">fetchEdgeCache</span>();
                </div>
                <div className="pl-3">
                  <span className="text-purple-400">return</span> (
                </div>
                <div className="pl-6 text-cyan-300">
                  &lt;<span className="text-blue-400">NextApp</span> <span className="text-purple-300">lcp</span>=<span className="text-emerald-300">"0.32s"</span> /&gt;
                </div>
                <div className="pl-3">);</div>
                <div>{'}'}</div>
              </motion.div>
            )}

            {activeTab === 'lighthouse' && (
              <motion.div
                key="lighthouse"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="space-y-2.5"
              >
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    { label: 'Perf', score: 100 },
                    { label: 'A11y', score: 100 },
                    { label: 'Best', score: 100 },
                    { label: 'SEO', score: 100 },
                  ].map((m, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-1.5 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full border border-emerald-400 flex items-center justify-center text-emerald-400 font-bold text-[10px]">
                        {m.score}
                      </div>
                      <span className="text-[8px] text-slate-400 mt-0.5">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 space-y-1 text-[10px]">
                  <div className="flex justify-between text-slate-300">
                    <span>First Contentful Paint (FCP)</span>
                    <span className="text-emerald-400 font-bold">0.18s</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Largest Contentful Paint (LCP)</span>
                    <span className="text-emerald-400 font-bold">0.32s</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Total Blocking Time (TBT)</span>
                    <span className="text-emerald-400 font-bold">0ms</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cdn' && (
              <motion.div
                key="cdn"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="space-y-2"
              >
                <div className="text-[10px] text-slate-400">// Global Edge CDN Matrix</div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  {[
                    { region: 'Asia (Mumbai)', ping: '12ms' },
                    { region: 'US East', ping: '18ms' },
                    { region: 'Europe', ping: '15ms' },
                    { region: 'Australia', ping: '22ms' },
                  ].map((node, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-1.5 rounded-lg flex justify-between items-center">
                      <span className="font-bold text-slate-200 text-[9px]">{node.region}</span>
                      <span className="text-emerald-400 font-mono text-[9px]">{node.ping}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Terminal Status Line */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Status: <strong className="text-emerald-400">PASS (0 Errors)</strong></span>
            </span>
            <span className="text-purple-400 font-bold font-mono">Web Engine v15</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE LAPTOP KEYBOARD DECK (Compact Height) */}
      <div className="mt-2 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl p-2 shadow-lg flex flex-col gap-1.5 relative z-30">
        <div className="flex items-center justify-between px-1">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1 font-mono">
            <Keyboard className="w-3 h-3 text-brand-purple" />
            Interactive Laptop Keyboard Deck
          </span>
          <span className="text-[8px] text-slate-400 font-mono">Click keys to type into code</span>
        </div>

        {/* 3D Mac Laptop Keycaps Row */}
        <div className="flex items-center justify-between gap-0.5 sm:gap-1 bg-slate-950 p-1 sm:p-1.5 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
          {keys.map((keyChar, index) => {
            const isPressed = activeKey === keyChar;
            return (
              <button
                key={`${keyChar}-${index}`}
                onClick={() => handleKeyPress(keyChar)}
                className={`flex-1 py-1 px-0.5 rounded font-mono font-bold text-[8px] sm:text-[10px] min-w-0 transition-all duration-150 transform active:scale-95 flex items-center justify-center ${
                  isPressed
                    ? 'bg-brand-purple text-white border-b-0 translate-y-0.5'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-b border-slate-950'
                }`}
              >
                {keyChar}
              </button>
            );
          })}

          {/* Backspace Key */}
          <button
            onClick={handleBackspace}
            className={`px-1.5 sm:px-2 py-1 rounded font-mono font-bold text-[8px] sm:text-[10px] min-w-0 transition-all duration-150 active:scale-95 flex items-center justify-center ${
              activeKey === 'BACKSPACE'
                ? 'bg-rose-600 text-white border-b-0'
                : 'bg-slate-800 hover:bg-rose-500/20 text-slate-300 border-b border-slate-950'
            }`}
            title="Backspace"
          >
            ⌫
          </button>
        </div>

        {/* Quick Action Macro Controls */}
        <div className="flex items-center justify-between gap-1.5">
          <button
            onClick={handleAutoTypeDotnLott}
            className="flex-1 py-1 px-2.5 rounded-lg bg-gradient-to-r from-brand-purple/20 via-indigo-500/20 to-brand-blue/20 hover:from-brand-purple hover:to-brand-blue text-white text-[9px] font-bold uppercase tracking-wider transition-all border border-brand-purple/40 shadow-xs flex items-center justify-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 text-yellow-300 animate-pulse" />
            <span>Type "DotnLott"</span>
          </button>

          <button
            onClick={() => setTypedCode('')}
            className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] font-bold uppercase tracking-wider transition-all border border-slate-700 flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-2.5 h-2.5 text-slate-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
