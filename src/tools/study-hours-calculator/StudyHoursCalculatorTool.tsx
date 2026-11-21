import React, { useState, useEffect, useMemo } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Plus,
  Trash2,
  RotateCcw,
  Printer,
  Clock,
  PieChart,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface StudySessionInput {
  id: string;
  name: string;
  startTime: string; // 'HH:MM' 24hr format
  endTime: string;   // 'HH:MM' 24hr format
  breakMinutes: number;
}

const STORAGE_KEY = 'studypilot_tool_hours_calc_v1';

const DEFAULT_SESSIONS: StudySessionInput[] = [
  { id: 's1', name: 'Morning Deep Work', startTime: '08:30', endTime: '11:45', breakMinutes: 15 },
  { id: 's2', name: 'Afternoon Practice Block', startTime: '14:00', endTime: '16:30', breakMinutes: 20 },
  { id: 's3', name: 'Evening Review & Recall', startTime: '19:00', endTime: '20:30', breakMinutes: 10 },
];

export const StudyHoursCalculatorTool: React.FC = () => {
  const [sessions, setSessions] = useState<StudySessionInput[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sessions && Array.isArray(parsed.sessions)) {
          return parsed.sessions;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_SESSIONS;
  });

  const [daysPerWeek, setDaysPerWeek] = useState<number>(6);

  // Sync to isolated local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions, daysPerWeek }));
    } catch (e) {
      console.error('Failed to save study hours calculator state', e);
    }
  }, [sessions, daysPerWeek]);

  // Compute session durations
  const sessionCalculations = useMemo(() => {
    return sessions.map((sess) => {
      const [startH, startM] = sess.startTime.split(':').map(Number);
      const [endH, endM] = sess.endTime.split(':').map(Number);

      let grossMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      if (grossMinutes < 0) {
        // Handles overnight crossing (e.g. 23:00 to 01:00)
        grossMinutes += 24 * 60;
      }

      const breaks = Math.max(0, sess.breakMinutes || 0);
      const netMinutes = Math.max(0, grossMinutes - breaks);

      const netHours = Math.round((netMinutes / 60) * 10) / 10;
      const grossHours = Math.round((grossMinutes / 60) * 10) / 10;

      return {
        ...sess,
        grossMinutes,
        netMinutes,
        netHours,
        grossHours,
      };
    });
  }, [sessions]);

  // Total daily and projections
  const totals = useMemo(() => {
    const grossMinutes = sessionCalculations.reduce((sum, s) => sum + s.grossMinutes, 0);
    const breakMinutes = sessionCalculations.reduce((sum, s) => sum + s.breakMinutes, 0);
    const netMinutes = sessionCalculations.reduce((sum, s) => sum + s.netMinutes, 0);

    const grossHours = Math.round((grossMinutes / 60) * 10) / 10;
    const breakHours = Math.round((breakMinutes / 60) * 10) / 10;
    const netHours = Math.round((netMinutes / 60) * 10) / 10;

    const efficiencyRatio = grossMinutes > 0 ? Math.round((netMinutes / grossMinutes) * 100) : 0;

    const weeklyNetHours = Math.round(netHours * daysPerWeek * 10) / 10;
    const monthlyNetHours = Math.round(weeklyNetHours * 4.33 * 10) / 10;

    return {
      grossMinutes,
      breakMinutes,
      netMinutes,
      grossHours,
      breakHours,
      netHours,
      efficiencyRatio,
      weeklyNetHours,
      monthlyNetHours,
    };
  }, [sessionCalculations, daysPerWeek]);

  const handleAddSession = () => {
    setSessions((prev) => [
      ...prev,
      {
        id: 'sess_' + Date.now().toString(36),
        name: `Study Session ${prev.length + 1}`,
        startTime: '10:00',
        endTime: '12:00',
        breakMinutes: 10,
      },
    ]);
  };

  const handleUpdateSession = (id: string, updates: Partial<StudySessionInput>) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleDeleteSession = (id: string) => {
    if (sessions.length <= 1) return;
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Reset calculator to default sessions?')) {
      setSessions(DEFAULT_SESSIONS);
    }
  };

  return (
    <ToolLayout
      title="Study Hours Calculator"
      metaTitle="Free Study Hours Calculator – Calculate Net Active Focus Time"
      description="Calculate your actual focused study time, subtract breaks, and project your weekly and monthly study output without deceptive desk time."
      canonicalUrl="https://thestudypilot.space/tools/study-hours-calculator"
      badge="Accurate Math"
      relatedArticleSlug="how-to-track-study-time"
      relatedArticleTitle="How to Track Study Time: Measure Active Focus vs Desk Sitting"
      relatedResourceSlug="pomodoro-session-tracker"
      relatedResourceTitle="Pomodoro Focus Log (25-Minute Interval System)"
      keywords={[
        'study hours calculator',
        'calculate study time',
        'effective study time calculator',
        'study break calculator',
        'study efficiency ratio',
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sessions List Input (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Daily Study Sessions ({sessions.length})</span>
              </h3>
              <div className="flex items-center gap-2 print:hidden">
                <Button size="sm" variant="outline" onClick={handleReset} title="Reset">
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleAddSession}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add Session
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {sessionCalculations.map((sess) => (
                <div
                  key={sess.id}
                  className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={sess.name}
                      onChange={(e) => handleUpdateSession(sess.id, { name: e.target.value })}
                      placeholder="Session Name (e.g. Morning Physics)"
                      className="font-bold text-sm bg-transparent border-0 text-slate-900 dark:text-white p-0 focus:ring-0 flex-1"
                    />
                    {sessions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSession(sess.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 print:hidden"
                        aria-label="Delete session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={sess.startTime}
                        onChange={(e) => handleUpdateSession(sess.id, { startTime: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={sess.endTime}
                        onChange={(e) => handleUpdateSession(sess.id, { endTime: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                        Breaks Deducted (mins)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="180"
                        step="5"
                        value={sess.breakMinutes}
                        onChange={(e) =>
                          handleUpdateSession(sess.id, { breakMinutes: parseInt(e.target.value) || 0 })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-800 text-[11px]">
                    <span className="text-slate-500">
                      Gross at Desk: <strong>{sess.grossHours}h</strong> ({sess.grossMinutes}m)
                    </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Net Active Study: {sess.netHours} Hours ({sess.netMinutes}m)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Weekly Study Days:
              </label>
              <div className="flex gap-1.5">
                {[5, 6, 7].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDaysPerWeek(days)}
                    className={cn(
                      'px-3 py-1 rounded-lg border font-bold text-xs transition-colors',
                      daysPerWeek === days
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'
                    )}
                  >
                    {days} Days / wk
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Metrics & Projections (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Study Hours Summary</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 print:hidden flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </h3>

            {/* Big Primary Metric */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50/80 via-white to-emerald-50/40 border border-brand-200/80 dark:border-brand-900/60 dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Daily Net Focused Study
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {totals.netHours} <span className="text-xl font-medium text-slate-400">Hours</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Equivalent to {totals.netMinutes} minutes of uninterrupted focus
              </p>
            </div>

            {/* Efficiency Breakdown Bar */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Desk Focus Efficiency</span>
                <span className="text-emerald-600 dark:text-emerald-400">{totals.efficiencyRatio}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${totals.efficiencyRatio}%` }}
                  title={`Net Study: ${totals.netMinutes}m`}
                />
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${100 - totals.efficiencyRatio}%` }}
                  title={`Breaks: ${totals.breakMinutes}m`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Active Study: {totals.netHours}h</span>
                <span>Breaks: {totals.breakHours}h ({totals.breakMinutes}m)</span>
              </div>
            </div>

            {/* Projections Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Weekly Output</span>
                </div>
                <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {totals.weeklyNetHours}h
                </p>
                <span className="text-[10px] text-slate-400">
                  {daysPerWeek} active study days
                </span>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <PieChart className="w-3.5 h-3.5" />
                  <span>Monthly Projection</span>
                </div>
                <p className="text-xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">
                  {totals.monthlyNetHours}h
                </p>
                <span className="text-[10px] text-slate-400">
                  ~4.33 weeks projection
                </span>
              </div>
            </div>

            {/* Educational Insight Callout */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 dark:border-indigo-950 dark:bg-indigo-950/20 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>The Honest Study Principle</span>
              </div>
              Deducting breaks prevents the illusion of productivity. 4 hours of net active cognitive focus yields far better exam retention than 7 hours of distracted desk-sitting.
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default StudyHoursCalculatorTool;
