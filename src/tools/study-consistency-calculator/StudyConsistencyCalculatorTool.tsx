import React, { useState, useEffect, useMemo } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Target,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const STORAGE_KEY = 'studypilot_tool_consistency_calc_v1';

export const StudyConsistencyCalculatorTool: React.FC = () => {
  const [daysStudied, setDaysStudied] = useState<number>(22);
  const [totalDays, setTotalDays] = useState<number>(30);

  // Load from isolated storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed.daysStudied === 'number') setDaysStudied(parsed.daysStudied);
        if (typeof parsed.totalDays === 'number') setTotalDays(parsed.totalDays);
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to isolated storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ daysStudied, totalDays }));
    } catch {
      // fallback
    }
  }, [daysStudied, totalDays]);

  const stats = useMemo(() => {
    const validTotal = Math.max(1, totalDays);
    const validStudied = Math.min(validTotal, Math.max(0, daysStudied));
    const percentage = Math.min(100, Math.round((validStudied / validTotal) * 100));
    const missedDays = Math.max(0, validTotal - validStudied);

    let tierLabel = 'Building Momentum';
    let tierColor = 'text-amber-600 dark:text-amber-400';
    let assessment = 'You are laying the foundation. Protect even 20 minutes a day to form the automatic habit loop.';

    if (percentage >= 85) {
      tierLabel = 'Elite Consistency';
      tierColor = 'text-emerald-600 dark:text-emerald-400';
      assessment = 'Exceptional adherence! Remember that taking 1 full recovery day weekly prevents mid-semester burnout.';
    } else if (percentage >= 70) {
      tierLabel = 'Optimal Sustainable Range';
      tierColor = 'text-brand-600 dark:text-brand-400';
      assessment = 'Research shows 70%–85% consistency is the sweet spot. You study consistently while absorbing life delays.';
    } else if (percentage >= 50) {
      tierLabel = 'Steady Progress';
      tierColor = 'text-indigo-600 dark:text-indigo-400';
      assessment = 'You are active more than half the time. Focus on closing the 2-day gap using the 24-Hour Recovery Protocol.';
    }

    return {
      percentage,
      missedDays,
      validStudied,
      validTotal,
      tierLabel,
      tierColor,
      assessment,
    };
  }, [daysStudied, totalDays]);

  const handleApplyPreset = (studied: number, total: number) => {
    setDaysStudied(studied);
    setTotalDays(total);
  };

  const handleReset = () => {
    setDaysStudied(22);
    setTotalDays(30);
  };

  return (
    <ToolLayout
      title="Study Consistency Calculator"
      metaTitle="Free Study Consistency Calculator – Calculate Your Study Rate"
      description="Calculate your true study consistency percentage across weekly, monthly, and custom intervals. Zero guilt, actionable momentum analysis, and realistic thresholds."
      canonicalUrl="https://thestudypilot.space/tools/study-consistency-calculator"
      badge="Performance Analytics"
      relatedArticleSlug="how-to-study-consistently"
      relatedArticleTitle="How to Study Consistently Every Day: The Practical Guide to Unbroken Streaks"
      relatedResourceSlug="goal-setting-worksheet"
      relatedResourceTitle="Academic SMART Goal Setting & Pre-Mortem Worksheet"
      keywords={[
        'study consistency calculator',
        'study streak calculator',
        'calculate study consistency',
        'habit consistency percentage',
        'student performance calculator',
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: Calculator Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Consistency Calculator Inputs</span>
              </h3>
              <Button size="sm" variant="outline" onClick={handleReset} title="Reset">
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Quick Presets
              </span>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyPreset(5, 7)}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  Last 7 Days (5/7)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(22, 30)}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  Last 30 Days (22/30)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(65, 90)}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:border-brand-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  Quarter (65/90)
                </button>
              </div>
            </div>

            {/* Input 1: Days Studied */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="days-studied" className="text-slate-700 dark:text-slate-300">Days Studied</label>
                <span className="font-mono text-brand-600 dark:text-brand-400 text-sm">
                  {daysStudied} Days
                </span>
              </div>
              <input
                id="days-studied"
                type="range"
                min="0"
                max={Math.max(1, totalDays)}
                value={daysStudied}
                onChange={(e) => setDaysStudied(parseInt(e.target.value) || 0)}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0 days</span>
                <span>Max: {totalDays} days</span>
              </div>
            </div>

            {/* Input 2: Total Tracked Days */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="total-days" className="text-slate-700 dark:text-slate-300">Total Tracked Days in Period</label>
                <span className="font-mono text-slate-900 dark:text-white text-sm">
                  {totalDays} Days
                </span>
              </div>
              <input
                id="total-days"
                type="number"
                min="1"
                max="365"
                value={totalDays}
                onChange={(e) => setTotalDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-mono dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* Formula Reference */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40 text-xs text-slate-500 font-mono">
              <span className="text-slate-400 block text-[10px] uppercase font-sans">Formula:</span>
              Consistency = (Days Studied ÷ Total Days) × 100
            </div>
          </div>
        </div>

        {/* Right Column: Visualization & Insights (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Calculated Consistency Rate
            </span>

            {/* Big Percentage Display */}
            <div className="py-2">
              <div className="text-6xl sm:text-7xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                {stats.percentage}%
              </div>
              <div className={cn('text-sm font-bold mt-2', stats.tierColor)}>
                {stats.tierLabel}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 text-xs">
              <div className="h-3.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                <div
                  className="h-full bg-brand-600 dark:bg-brand-500 transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Studied: {stats.validStudied} days</span>
                <span>Rest/Missed: {stats.missedDays} days</span>
              </div>
            </div>

            {/* Nuanced Assessment Box */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-950 dark:bg-emerald-950/20 text-left text-xs leading-relaxed text-emerald-950 dark:text-emerald-200">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Educational Insight</span>
              </div>
              <p>{stats.assessment}</p>
            </div>

            {/* Zero-Guilt Mindset Box */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40 text-left text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-200 block mb-1">
                The Anti-Guilt Principle:
              </strong>
              Consistency is not 100% perfection. Top competitive exam rankers do not study every single day without interruption. Hitting 75%–80% over 6 months beats 100% for two weeks followed by burnout.
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default StudyConsistencyCalculatorTool;
