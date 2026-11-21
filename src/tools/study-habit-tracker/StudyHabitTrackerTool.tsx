import React, { useState, useEffect, useMemo } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Flame,
  CheckCircle2,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface HabitItem {
  id: string;
  name: string;
  color: string;
  category: 'focus' | 'revision' | 'practice' | 'wellness';
  history: Record<string, boolean>; // 'YYYY-MM-DD' -> true/false
}

const STORAGE_KEY = 'studypilot_tool_habit_tracker_v1';

const DEFAULT_HABITS: HabitItem[] = [
  {
    id: 'h1',
    name: 'Study 90 mins uninterrupted',
    color: '#6366f1',
    category: 'focus',
    history: {},
  },
  {
    id: 'h2',
    name: 'Revise yesterday’s topics (15 mins)',
    color: '#3b82f6',
    category: 'revision',
    history: {},
  },
  {
    id: 'h3',
    name: 'Solve 20 practice questions',
    color: '#10b981',
    category: 'practice',
    history: {},
  },
  {
    id: 'h4',
    name: 'Zero phone scrolling during study',
    color: '#ec4899',
    category: 'wellness',
    history: {},
  },
];

export const StudyHabitTrackerTool: React.FC = () => {
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_HABITS;
  });

  const [newHabitName, setNewHabitName] = useState('');

  // Persist to isolated local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (e) {
      console.error('Failed to save habit tracker state', e);
    }
  }, [habits]);

  // Today string YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  // Generate last 7 days array
  const last7Days = useMemo(() => {
    const list: Array<{ dateStr: string; label: string; dayShort: string; isToday: boolean }> = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      list.push({
        dateStr: str,
        label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: str === todayStr,
      });
    }
    return list;
  }, [todayStr]);

  // Generate last 28 days for mini monthly heatmap
  const last28Days = useMemo(() => {
    const list: string[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      list.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      );
    }
    return list;
  }, []);

  // Toggle habit for date
  const handleToggleHabit = (habitId: string, dateStr: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const current = Boolean(h.history[dateStr]);
        const next = { ...h.history };
        if (current) {
          delete next[dateStr];
        } else {
          next[dateStr] = true;
        }
        return { ...h, history: next };
      })
    );
  };

  const handleAddHabit = () => {
    if (!newHabitName.trim()) return;
    const colors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    const newHabit: HabitItem = {
      id: 'h_' + Date.now().toString(36),
      name: newHabitName.trim(),
      color: colors[habits.length % colors.length],
      category: 'focus',
      history: { [todayStr]: true },
    };
    setHabits((prev) => [...prev, newHabit]);
    setNewHabitName('');
  };

  const handleDeleteHabit = (id: string) => {
    if (habits.length <= 1) return;
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // Streak calculations
  const habitStats = useMemo(() => {
    let currentStreak = 0;
    let longestStreak = 0;

    // Check consecutive days starting from today or yesterday
    const d = new Date();
    const todayActive = habits.some((h) => h.history[todayStr]);

    if (!todayActive) {
      d.setDate(d.getDate() - 1);
    }

    while (true) {
      const checkStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const completedAny = habits.some((h) => h.history[checkStr]);
      if (completedAny) {
        currentStreak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }

    // Longest streak across last 30 days
    let run = 0;
    for (const dStr of last28Days) {
      const active = habits.some((h) => h.history[dStr]);
      if (active) {
        run++;
        if (run > longestStreak) longestStreak = run;
      } else {
        run = 0;
      }
    }

    // Today's completion
    const todayCompleted = habits.filter((h) => h.history[todayStr]).length;
    const todayPercent = habits.length > 0 ? Math.round((todayCompleted / habits.length) * 100) : 0;

    return { currentStreak, longestStreak, todayCompleted, todayPercent };
  }, [habits, todayStr, last28Days]);

  return (
    <ToolLayout
      title="Study Habit Tracker"
      metaTitle="Free Study Habit Tracker – Daily Streaks & Progress Heatmap"
      description="Track your daily study habits, build unbroken streaks, and visualize your progress on interactive weekly and monthly calendar views. 100% private."
      canonicalUrl="https://thestudypilot.space/tools/study-habit-tracker"
      badge="Habit Formation"
      relatedArticleSlug="how-to-study-consistently"
      relatedArticleTitle="How to Study Consistently Every Day: The Practical Guide to Unbroken Streaks"
      relatedResourceSlug="study-habit-tracker"
      relatedResourceTitle="30-Day Study Habit & Streak Tracker Printable"
      keywords={[
        'study habit tracker',
        'student habit tracker online',
        'study streak tracker',
        'daily study habits',
        'free habit tracker',
      ]}
    >
      <div className="space-y-8">
        {/* Metric Cards Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Streak</span>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                {habitStats.currentStreak} Days
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Longest Run</span>
              <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                {habitStats.longestStreak} Days
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today Done</span>
              <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {habitStats.todayCompleted} / {habits.length}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Daily Score</span>
              <p className="text-xl font-extrabold text-brand-600 dark:text-brand-400 font-mono">
                {habitStats.todayPercent}%
              </p>
            </div>
          </div>
        </div>

        {/* 7-Day Interactive Matrix */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Weekly Habit Matrix (Last 7 Days)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Click any checkbox to toggle completion. Preserving even 1 habit daily keeps your streak alive!
              </p>
            </div>

            {/* Quick Add Habit Bar */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
                placeholder="New habit (e.g. Read 20 pages)..."
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              <Button size="sm" variant="primary" onClick={handleAddHabit}>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </Button>
            </div>
          </div>

          {/* Table Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-3 px-3 font-bold text-slate-700 dark:text-slate-300 min-w-[200px]">
                    Habit Item
                  </th>
                  {last7Days.map((d) => (
                    <th
                      key={d.dateStr}
                      className={cn(
                        'py-3 px-2 text-center font-bold min-w-[60px]',
                        d.isToday
                          ? 'text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/30 rounded-t-xl'
                          : 'text-slate-500 dark:text-slate-400'
                      )}
                    >
                      <div>{d.dayShort}</div>
                      <div className="text-[10px] font-normal">{d.label}</div>
                    </th>
                  ))}
                  <th className="py-3 px-2 text-right font-bold text-slate-400 w-10">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {habits.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: h.color }}
                        />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {h.name}
                        </span>
                      </div>
                    </td>

                    {last7Days.map((d) => {
                      const isDone = Boolean(h.history[d.dateStr]);
                      return (
                        <td
                          key={d.dateStr}
                          className={cn(
                            'py-3 px-2 text-center align-middle',
                            d.isToday && 'bg-brand-50/30 dark:bg-brand-950/20'
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleHabit(h.id, d.dateStr)}
                            className={cn(
                              'w-7 h-7 rounded-xl inline-flex items-center justify-center transition-all',
                              isDone
                                ? 'bg-emerald-500 text-white shadow-xs'
                                : 'bg-slate-100 text-transparent hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
                            )}
                            title={`${h.name} - ${d.label} (${isDone ? 'Completed' : 'Click to complete'})`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </td>
                      );
                    })}

                    <td className="py-3 px-2 text-right">
                      {habits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteHabit(h.id)}
                          className="text-slate-300 hover:text-rose-500 p-1"
                          aria-label="Delete habit"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 28-Day Mini Calendar Visualizer */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>4-Week Consistency Heatmap (28 Days)</span>
            </h4>
            <span className="text-xs text-slate-400">Green = At least 1 habit completed</span>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
            {last28Days.map((dStr) => {
              const count = habits.filter((h) => h.history[dStr]).length;
              const isToday = dStr === todayStr;

              return (
                <div
                  key={dStr}
                  className={cn(
                    'h-10 rounded-xl flex flex-col items-center justify-center text-[10px] transition-all',
                    count >= 3
                      ? 'bg-emerald-500 text-white font-bold'
                      : count > 0
                      ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 font-semibold'
                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800',
                    isToday && 'ring-2 ring-brand-500'
                  )}
                  title={`${dStr}: ${count} of ${habits.length} habits done`}
                >
                  <span>{dStr.split('-')[2]}</span>
                  {count > 0 && <span className="text-[9px]">{count}✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default StudyHabitTrackerTool;
