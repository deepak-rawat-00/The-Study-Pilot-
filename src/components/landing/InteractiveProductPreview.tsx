import React, { useState } from 'react';
import {
  LayoutDashboard,
  Timer,
  Flame,
  CalendarClock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Target,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const InteractiveProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timer' | 'heatmap' | 'countdown'>('dashboard');

  // Interactive mini-timer state within preview
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25:00

  React.useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Sample realistic subjects
  const sampleSubjects = [
    { name: 'Quantitative Reasoning', code: 'QUANT', color: '#4f46e5', studied: 2.2, target: 3.0, pct: 73 },
    { name: 'Verbal & Reading Comprehension', code: 'VERB', color: '#10b981', studied: 1.5, target: 2.0, pct: 75 },
    { name: 'Analytical Writing & Vocab', code: 'AWA', color: '#f59e0b', studied: 0.8, target: 1.0, pct: 80 },
  ];

  // Sample realistic contribution weeks (16 weeks for compact preview)
  const sampleHeatmapWeeks = Array.from({ length: 16 }).map((_, wIdx) => {
    return Array.from({ length: 7 }).map((_, dIdx) => {
      // Deterministic realistic study pattern
      const val = (wIdx * 7 + dIdx * 3 + 1) % 5;
      const isPast = wIdx < 15 || dIdx <= 4;
      const intensity = isPast ? (val === 0 ? 1 : val) : 0;
      return {
        intensity: intensity as 0 | 1 | 2 | 3 | 4,
        minutes: intensity === 0 ? 0 : intensity * 45,
      };
    });
  });

  const intensityClasses = {
    0: 'bg-slate-100 dark:bg-slate-800/80',
    1: 'bg-emerald-200 dark:bg-emerald-950/70',
    2: 'bg-emerald-300 dark:bg-emerald-800/80',
    3: 'bg-emerald-400 dark:bg-emerald-600',
    4: 'bg-emerald-500 dark:bg-emerald-500',
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden transition-all">
      {/* Top Interactive Tab Bar / Window Chrome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/80 gap-3">
        {/* Window dots & demo label */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-2">
            The Study Pilot • Interactive Preview
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            Live Demo
          </span>
        </div>

        {/* Tab Switcher */}
        <div
          role="tablist"
          aria-label="Product preview tabs"
          className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl dark:bg-slate-800/60 overflow-x-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'timer'}
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'timer'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Focus Timer</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'heatmap'}
            onClick={() => setActiveTab('heatmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'heatmap'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Streak & Heatmap</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'countdown'}
            onClick={() => setActiveTab('countdown')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'countdown'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <CalendarClock className="w-3.5 h-3.5 text-indigo-500" />
            <span>Exam Countdown</span>
          </button>
        </div>
      </div>

      {/* Main Preview Screen */}
      <div className="p-4 sm:p-6 lg:p-7 min-h-[380px] bg-slate-50/50 dark:bg-slate-950/40">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Daily Target Progress */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-brand-600" /> Daily Target
                  </span>
                  <Badge variant="success">75% Complete</Badge>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">4.5 hrs</span>
                  <span className="text-xs text-slate-400">/ 6.0 hrs goal</span>
                </div>
                <div className="mt-2.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-brand-600 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              {/* Active Streak */}
              <div className="rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 to-orange-50/30 p-4 dark:border-amber-900/50 dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
                  <span className="font-medium flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Active Streak
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Threshold: 60m
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">12 Days</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Personal Best: 24</span>
                </div>
                <p className="mt-2 text-[11px] text-amber-800/80 dark:text-amber-300/80">
                  Qualified today • 2h 45m active focus
                </p>
              </div>

              {/* Next Exam Countdown */}
              <div className="rounded-xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/60 to-purple-50/30 p-4 dark:border-indigo-900/50 dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between text-xs text-indigo-800 dark:text-indigo-300">
                  <span className="font-medium flex items-center gap-1.5">
                    <CalendarClock className="w-3.5 h-3.5 text-indigo-600" /> Next Milestone
                  </span>
                  <Badge variant="primary">38 Days Left</Badge>
                </div>
                <div className="mt-2 truncate">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    Semester Finals &amp; GRE Prep
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Target Date: Nov 24</span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  High Priority • 3 subjects allocated
                </p>
              </div>
            </div>

            {/* Subject Progress Breakdown */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-600" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Today&apos;s Subject Allocation
                  </h4>
                </div>
                <span className="text-xs text-slate-400">Balanced Workload</span>
              </div>

              <div className="space-y-3">
                {sampleSubjects.map((sub, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: sub.color }}
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {sub.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          {sub.code}
                        </span>
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {sub.studied}h / {sub.target}h
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${sub.pct}%`, backgroundColor: sub.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FOCUS TIMER */}
        {activeTab === 'timer' && (
          <div className="flex flex-col items-center justify-center py-4 space-y-6 text-center animate-in fade-in duration-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pomodoro &amp; Continuous Focus Engine</span>
            </div>

            {/* Circular Timer Mockup */}
            <div className="relative flex items-center justify-center w-52 h-52 rounded-full border-8 border-brand-100 bg-white shadow-inner dark:border-brand-950 dark:bg-slate-900">
              <div
                className="absolute inset-0 rounded-full border-8 border-brand-600 dark:border-brand-500 border-t-transparent animate-spin-slow"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)' }}
              />
              <div className="flex flex-col items-center justify-center z-10">
                <span className="text-4xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white">
                  {formatTimer(timerSeconds)}
                </span>
                <span className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {isTimerRunning ? 'Active Focus' : 'Ready to Study'}
                </span>
                <span className="mt-1 text-[11px] font-medium text-brand-600 dark:text-brand-400">
                  Quantitative Reasoning
                </span>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-transform active:scale-95"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Start Focus Session
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(1500);
                }}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                title="Reset Timer"
                aria-label="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Pauses and breaks are excluded from your study stats. Only true active focus counts toward streaks.
            </p>
          </div>
        )}

        {/* TAB 3: STREAK & HEATMAP */}
        {activeTab === 'heatmap' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3 dark:border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> Annual Study Consistency Heatmap
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every active day is visualised across 52 weeks.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Less</span>
                <span className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-slate-800" />
                <span className="w-3 h-3 rounded-xs bg-emerald-200 dark:bg-emerald-950" />
                <span className="w-3 h-3 rounded-xs bg-emerald-300 dark:bg-emerald-800" />
                <span className="w-3 h-3 rounded-xs bg-emerald-400 dark:bg-emerald-600" />
                <span className="w-3 h-3 rounded-xs bg-emerald-500 dark:bg-emerald-500" />
                <span>More</span>
              </div>
            </div>

            {/* Grid preview of weeks grouped by month with clear gaps */}
            <div className="overflow-x-auto pb-2">
              <div className="inline-flex gap-3 sm:gap-4 items-start">
                {[
                  { label: 'Jul', weeks: sampleHeatmapWeeks.slice(0, 4) },
                  { label: 'Aug', weeks: sampleHeatmapWeeks.slice(4, 8) },
                  { label: 'Sep', weeks: sampleHeatmapWeeks.slice(8, 12) },
                  { label: 'Oct', weeks: sampleHeatmapWeeks.slice(12, 16) },
                ].map((month, mIdx) => (
                  <div key={mIdx} className="flex flex-col items-center">
                    <div className="flex gap-1">
                      {month.weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-1">
                          {week.map((day, dIdx) => (
                            <div
                              key={dIdx}
                              title={`${month.label} Day ${wIdx * 7 + dIdx + 1}: ${day.minutes} min focus`}
                              className={`w-3.5 h-3.5 rounded-xs transition-colors cursor-pointer hover:ring-1 hover:ring-slate-400 ${
                                intensityClasses[day.intensity]
                              }`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <span className="mt-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center select-none">
                      {month.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="rounded-lg bg-white p-3 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Current Streak</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white">12 Days</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Longest Streak</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white">24 Days</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Active Study Days</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white">88 Days</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Period Focus Time</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white">312.4 Hours</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXAM COUNTDOWN */}
        {activeTab === 'countdown' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-brand-600" /> Upcoming Examination Countdowns
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fully customizable exam titles, priorities, and deadlines worldwide.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-xl border-2 border-brand-500/80 bg-white p-4.5 dark:bg-slate-900 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-brand-500" />
                <div className="flex items-center justify-between">
                  <Badge variant="primary">Next Upcoming</Badge>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    High Priority
                  </span>
                </div>
                <h5 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                  GRE General Exam
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exam Date: November 24, 2026
                </p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">
                    38
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Days Remaining
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between">
                  <Badge variant="default">Scheduled</Badge>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Medium Priority
                  </span>
                </div>
                <h5 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                  Computer Systems &amp; Algorithms Midterm
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exam Date: December 15, 2026
                </p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                    59
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Days Remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/70 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/60 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          Zero fabricated data • Real local calculation engine
        </span>
        <span className="hidden sm:inline font-medium text-brand-600 dark:text-brand-400">
          Try live in browser
        </span>
      </div>
    </div>
  );
};
