'use client';

import { useState } from 'react';
import {
  Calculator,
  Zap,
  Sparkles,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
  RefreshCw,
  Users,
  DollarSign,
  Bot,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

interface WorkflowScenario {
  id: string;
  title: string;
  category: string;
  manualTime: string;
  autoTime: string;
  speedup: string;
  description: string;
  steps: { label: string; duration: string; type: 'trigger' | 'ai' | 'action' | 'output' }[];
}

const workflowScenarios: WorkflowScenario[] = [
  {
    id: 'lead-whatsapp',
    title: 'Lead Ingestion & Instant WhatsApp Outreach',
    category: 'Sales & CRM',
    manualTime: '45 mins average delay',
    autoTime: '0.4 seconds instant',
    speedup: '6,750x Faster',
    description: 'Incoming website form leads are parsed by AI, enriched with company data, assigned in CRM, and sent an instant personalized WhatsApp message.',
    steps: [
      { label: 'Webform Triggered', duration: '12ms', type: 'trigger' },
      { label: 'AI Intent & Data Enrichment', duration: '140ms', type: 'ai' },
      { label: 'Zoho CRM Deal Created', duration: '110ms', type: 'action' },
      { label: 'WhatsApp Official API Sent', duration: '138ms', type: 'output' }
    ]
  },
  {
    id: 'invoice-ai',
    title: 'AI Invoice Extraction & Accounting Sync',
    category: 'Finance & Ops',
    manualTime: '3.5 hours batch manual entry',
    autoTime: '1.2 seconds automated',
    speedup: '10,500x Faster',
    description: 'Vendor PDF invoices received via email are scanned by vision AI models, line items extracted, validated against purchase orders, and synced to QuickBooks/Tally.',
    steps: [
      { label: 'PDF Email Parser', duration: '85ms', type: 'trigger' },
      { label: 'Vision AI OCR & Extraction', duration: '620ms', type: 'ai' },
      { label: 'PO Validation & Math Check', duration: '190ms', type: 'action' },
      { label: 'Accounting System Sync', duration: '305ms', type: 'output' }
    ]
  },
  {
    id: 'support-agent',
    title: '24/7 WhatsApp AI Customer Support Agent',
    category: 'Customer Experience',
    manualTime: '20 mins ticket queue wait',
    autoTime: '0.8 seconds response',
    speedup: '1,500x Faster',
    description: 'Complex customer inquiries answered accurately by training AI models on your company docs, order status APIs, and escalation logic.',
    steps: [
      { label: 'Customer Message Ingested', duration: '15ms', type: 'trigger' },
      { label: 'RAG Knowledge Base Retrieval', duration: '410ms', type: 'ai' },
      { label: 'Order Status API Lookup', duration: '220ms', type: 'action' },
      { label: 'Contextual Solution Delivered', duration: '155ms', type: 'output' }
    ]
  }
];

export default function InteractiveAboutSimulator() {
  const [activeTab, setActiveTab] = useState<'roi' | 'simulator'>('roi');

  // ROI Calculator State
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(800); // INR or $ equivalent

  // Simulator State
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(-1);

  // ROI Calculations
  const weeklyHoursSaved = teamSize * hoursPerWeek * 0.85; // 85% automation rate
  const monthlyHoursSaved = Math.round(weeklyHoursSaved * 4.33);
  const monthlyCostSavings = Math.round(monthlyHoursSaved * hourlyRate);
  const annualCostSavings = monthlyCostSavings * 12;

  const activeScenario = workflowScenarios[selectedScenarioIdx];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationProgress(0);
    setActiveStepIdx(0);

    const totalSteps = activeScenario.steps.length;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step < totalSteps) {
        setActiveStepIdx(step);
        setSimulationProgress(Math.round(((step + 1) / totalSteps) * 100));
      } else {
        setSimulationProgress(100);
        setIsSimulating(false);
        clearInterval(interval);
      }
    }, 450);
  };

  const applyPreset = (team: number, hrs: number, rate: number) => {
    setTeamSize(team);
    setHoursPerWeek(hrs);
    setHourlyRate(rate);
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-3 relative z-10 max-w-3xl mx-auto mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-extrabold uppercase tracking-wider text-cyan-300 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          Interactive Studio
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-black text-white leading-tight">
          Calculate Your Automation ROI & Live Workflow Speed
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
          Test our interactive ROI engine and see how DotnLott replaces slow manual tasks with sub-second automated pipelines.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/15 mt-3 shadow-lg">
          <button
            onClick={() => setActiveTab('roi')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'roi'
                ? 'bg-gradient-to-r from-brand-purple to-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-4 h-4" />
            ROI & Cost Calculator
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4" />
            Live Workflow Simulator
          </button>
        </div>
      </div>

      {/* TAB 1: ROI & COST CALCULATOR */}
      {activeTab === 'roi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Controls Side (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-purple" /> Input Team Parameters
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                Live Estimates
              </span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
              <button
                onClick={() => applyPreset(3, 10, 600)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-slate-200 transition-colors border border-white/10"
              >
                Small Team (3)
              </button>
              <button
                onClick={() => applyPreset(10, 15, 800)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-slate-200 transition-colors border border-white/10"
              >
                Mid SME (10)
              </button>
              <button
                onClick={() => applyPreset(25, 20, 1200)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-slate-200 transition-colors border border-white/10"
              >
                Growth Org (25)
              </button>
            </div>

            {/* Slider 1: Team Size */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Team Members Handling Manual Tasks</span>
                <span className="text-brand-purple font-mono font-bold text-sm bg-brand-purple/20 px-2.5 py-0.5 rounded-lg border border-brand-purple/30">
                  {teamSize} People
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 member</span>
                <span>25 members</span>
                <span>50 members</span>
              </div>
            </div>

            {/* Slider 2: Hours/Week */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Repetitive Work Hours / Person / Week</span>
                <span className="text-brand-blue font-mono font-bold text-sm bg-brand-blue/20 px-2.5 py-0.5 rounded-lg border border-brand-blue/30">
                  {hoursPerWeek} hrs / week
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="35"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2 hrs/wk</span>
                <span>18 hrs/wk</span>
                <span>35 hrs/wk</span>
              </div>
            </div>

            {/* Slider 3: Hourly Cost */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Average Hourly Employee / Vendor Cost</span>
                <span className="text-emerald-400 font-mono font-bold text-sm bg-emerald-500/20 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                  ₹{hourlyRate.toLocaleString()} / hr
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₹300/hr</span>
                <span>₹1,500/hr</span>
                <span>₹3,000/hr</span>
              </div>
            </div>
          </div>

          {/* Results Side (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-brand-purple/20 via-slate-900 to-indigo-900/40 border border-brand-purple/30 rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-32 h-32 text-brand-purple" />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                <Clock className="w-4 h-4 text-brand-purple" /> Reclaimed Productivity
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Monthly Hours Saved</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
                    {monthlyHoursSaved.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold font-mono">hrs / month</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-1">
                <span className="text-xs text-slate-400">Projected Annual Cost Savings</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display">
                    ₹{annualCostSavings.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">/ year</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Speed Increase</span>
                  <span className="text-sm font-extrabold text-cyan-300 font-display">15x - 30x</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Error Reduction</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-display">99.4%</span>
                </div>
              </div>

              <Link
                href="/contact#calendar-booking"
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                Claim Your Automation Blueprint
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE WORKFLOW SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="flex flex-col gap-8 relative z-10">
          {/* Scenario Selector Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workflowScenarios.map((scenario, idx) => {
              const isSelected = idx === selectedScenarioIdx;
              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenarioIdx(idx);
                    setActiveStepIdx(-1);
                    setSimulationProgress(0);
                    setIsSimulating(false);
                  }}
                  className={`p-5 rounded-2xl text-left border transition-all flex flex-col gap-3 relative overflow-hidden ${
                    isSelected
                      ? 'bg-white/10 border-cyan-400/60 shadow-lg ring-1 ring-cyan-400/40'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-brand-blue" />
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {scenario.category}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400 font-mono">
                      {scenario.speedup}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug font-display">
                    {scenario.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-auto">
                    <span className="text-red-300 line-through">{scenario.manualTime}</span>
                    <span>➔</span>
                    <span className="text-emerald-300 font-bold">{scenario.autoTime}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Execution Simulation Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-blue" /> Active Automation Pipeline
                </span>
                <h4 className="text-lg font-bold text-white font-display">
                  {activeScenario.title}
                </h4>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                  isSimulating
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-brand-blue via-cyan-500 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95'
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    Executing Pipeline... ({simulationProgress}%)
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    Run Live Simulation
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {activeScenario.description}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-brand-purple via-brand-blue to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${simulationProgress}%` }}
              />
            </div>

            {/* Visual Step Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {activeScenario.steps.map((step, idx) => {
                const isActive = activeStepIdx >= idx;
                const isCurrent = activeStepIdx === idx && isSimulating;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all flex flex-col gap-2 relative ${
                      isCurrent
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/50 animate-pulse'
                        : isActive
                        ? 'bg-slate-900/90 border-emerald-500/50 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="uppercase text-slate-400">Step 0{idx + 1}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {step.duration}
                      </span>
                    </div>

                    <span className="text-xs font-bold font-display leading-snug">
                      {step.label}
                    </span>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono mt-1">
                      {isActive ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Execution Verified</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-slate-700" />
                          <span className="text-slate-500">Standby</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
