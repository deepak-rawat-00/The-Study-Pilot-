import React, { useState, useEffect, useMemo } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Calendar,
  CheckCircle2,
  Plus,
  Trash2,
  RotateCcw,
  Printer,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface WeeklySession {
  id: string;
  subject: string;
  color: string;
  type: 'study' | 'revision' | 'practice' | 'break';
  time: string; // e.g. "09:00 AM - 10:30 AM"
  durationMinutes: number;
  completed: boolean;
  notes?: string;
}

interface DayPlan {
  dayName: string;
  shortDay: string;
  dailyGoal: string;
  sessions: WeeklySession[];
}

const STORAGE_KEY = 'studypilot_tool_weekly_planner_v1';

const DEFAULT_DAYS: DayPlan[] = [
  {
    dayName: 'Monday',
    shortDay: 'Mon',
    dailyGoal: 'Calculus derivatives & Physics electromagnetism review',
    sessions: [
      { id: 'm1', subject: 'Calculus', color: '#6366f1', type: 'study', time: '08:30 AM – 10:00 AM', durationMinutes: 90, completed: false },
      { id: 'm2', subject: 'Rest Break', color: '#10b981', type: 'break', time: '10:00 AM – 10:15 AM', durationMinutes: 15, completed: false },
      { id: 'm3', subject: 'Physics', color: '#3b82f6', type: 'study', time: '10:15 AM – 11:45 AM', durationMinutes: 90, completed: false },
      { id: 'm4', subject: 'Active Revision', color: '#8b5cf6', type: 'revision', time: '05:00 PM – 05:45 PM', durationMinutes: 45, completed: false },
    ],
  },
  {
    dayName: 'Tuesday',
    shortDay: 'Tue',
    dailyGoal: 'Organic chemistry reactions & active recall testing',
    sessions: [
      { id: 't1', subject: 'Chemistry', color: '#ec4899', type: 'study', time: '08:30 AM – 10:00 AM', durationMinutes: 90, completed: false },
      { id: 't2', subject: 'Rest Break', color: '#10b981', type: 'break', time: '10:00 AM – 10:15 AM', durationMinutes: 15, completed: false },
      { id: 't3', subject: 'Calculus Practice', color: '#6366f1', type: 'practice', time: '10:15 AM – 11:30 AM', durationMinutes: 75, completed: false },
    ],
  },
  {
    dayName: 'Wednesday',
    shortDay: 'Wed',
    dailyGoal: 'Physics optics problems & daily error analysis',
    sessions: [
      { id: 'w1', subject: 'Physics', color: '#3b82f6', type: 'study', time: '09:00 AM – 10:30 AM', durationMinutes: 90, completed: false },
      { id: 'w2', subject: 'Break', color: '#10b981', type: 'break', time: '10:30 AM – 10:45 AM', durationMinutes: 15, completed: false },
      { id: 'w3', subject: 'General Studies', color: '#f59e0b', type: 'study', time: '10:45 AM – 12:00 PM', durationMinutes: 75, completed: false },
    ],
  },
  {
    dayName: 'Thursday',
    shortDay: 'Thu',
    dailyGoal: 'Calculus integral review & chemistry synthesis practice',
    sessions: [
      { id: 'th1', subject: 'Calculus', color: '#6366f1', type: 'study', time: '08:30 AM – 10:00 AM', durationMinutes: 90, completed: false },
      { id: 'th2', subject: 'Chemistry', color: '#ec4899', type: 'practice', time: '10:15 AM – 11:45 AM', durationMinutes: 90, completed: false },
    ],
  },
  {
    dayName: 'Friday',
    shortDay: 'Fri',
    dailyGoal: 'Weekly catch-up buffer & interleaved problem solving',
    sessions: [
      { id: 'f1', subject: 'Mixed Problem Sets', color: '#8b5cf6', type: 'practice', time: '09:00 AM – 10:30 AM', durationMinutes: 90, completed: false },
      { id: 'f2', subject: 'Weekly Flex Buffer', color: '#10b981', type: 'revision', time: '04:00 PM – 05:00 PM', durationMinutes: 60, completed: false },
    ],
  },
  {
    dayName: 'Saturday',
    shortDay: 'Sat',
    dailyGoal: 'Timed sectional practice simulation & error log',
    sessions: [
      { id: 's1', subject: 'Full Mock Test', color: '#ef4444', type: 'practice', time: '09:00 AM – 11:30 AM', durationMinutes: 150, completed: false },
      { id: 's2', subject: 'Error Dissection', color: '#f59e0b', type: 'revision', time: '04:00 PM – 05:00 PM', durationMinutes: 60, completed: false },
    ],
  },
  {
    dayName: 'Sunday',
    shortDay: 'Sun',
    dailyGoal: 'Weekly spaced review & Sunday 15-minute retrospective',
    sessions: [
      { id: 'su1', subject: 'Weekly Spaced Review', color: '#6366f1', type: 'revision', time: '10:00 AM – 11:30 AM', durationMinutes: 90, completed: false },
      { id: 'su2', subject: 'Sunday Retrospective', color: '#10b981', type: 'revision', time: '06:00 PM – 06:20 PM', durationMinutes: 20, completed: false },
    ],
  },
];

export const WeeklyStudyPlannerTool: React.FC = () => {
  const [days, setDays] = useState<DayPlan[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 7) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_DAYS;
  });

  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  // Sync to isolated local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
    } catch (e) {
      console.error('Failed to save weekly planner data', e);
    }
  }, [days]);

  // Calculations
  const stats = useMemo(() => {
    let totalSessions = 0;
    let completedSessions = 0;
    let totalStudyMinutes = 0;

    days.forEach((d) => {
      d.sessions.forEach((s) => {
        if (s.type !== 'break') {
          totalSessions++;
          totalStudyMinutes += s.durationMinutes;
          if (s.completed) completedSessions++;
        }
      });
    });

    const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
    const totalHours = Math.round((totalStudyMinutes / 60) * 10) / 10;

    return { totalSessions, completedSessions, totalHours, completionRate };
  }, [days]);

  const activeDay = days[activeDayIndex];

  const handleToggleSessionComplete = (dayIdx: number, sessionId: string) => {
    setDays((prev) =>
      prev.map((d, i) => {
        if (i !== dayIdx) return d;
        return {
          ...d,
          sessions: d.sessions.map((s) =>
            s.id === sessionId ? { ...s, completed: !s.completed } : s
          ),
        };
      })
    );
  };

  const handleAddSession = (dayIdx: number) => {
    const newSession: WeeklySession = {
      id: 'sess_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      subject: 'New Study Block',
      color: '#6366f1',
      type: 'study',
      time: '02:00 PM – 03:00 PM',
      durationMinutes: 60,
      completed: false,
    };

    setDays((prev) =>
      prev.map((d, i) => (i === dayIdx ? { ...d, sessions: [...d.sessions, newSession] } : d))
    );
  };

  const handleUpdateSession = (dayIdx: number, sessionId: string, updates: Partial<WeeklySession>) => {
    setDays((prev) =>
      prev.map((d, i) => {
        if (i !== dayIdx) return d;
        return {
          ...d,
          sessions: d.sessions.map((s) => (s.id === sessionId ? { ...s, ...updates } : s)),
        };
      })
    );
  };

  const handleDeleteSession = (dayIdx: number, sessionId: string) => {
    setDays((prev) =>
      prev.map((d, i) => {
        if (i !== dayIdx) return d;
        return {
          ...d,
          sessions: d.sessions.filter((s) => s.id !== sessionId),
        };
      })
    );
  };

  const handleDuplicateDay = (sourceDayIdx: number, targetDayIdx: number) => {
    if (sourceDayIdx === targetDayIdx) return;
    const sourceSessions = days[sourceDayIdx].sessions.map((s) => ({
      ...s,
      id: 'copy_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      completed: false,
    }));

    setDays((prev) =>
      prev.map((d, i) => (i === targetDayIdx ? { ...d, sessions: sourceSessions } : d))
    );
  };

  const handleUpdateDailyGoal = (dayIdx: number, goal: string) => {
    setDays((prev) =>
      prev.map((d, i) => (i === dayIdx ? { ...d, dailyGoal: goal } : d))
    );
  };

  const handleReset = () => {
    if (window.confirm('Reset weekly study planner to default layout? Your changes will be cleared.')) {
      setDays(DEFAULT_DAYS);
    }
  };

  return (
    <ToolLayout
      title="Weekly Study Planner"
      metaTitle="Free Weekly Study Planner – Printable Monday to Sunday Timetable"
      description="Build, track, and print your weekly study schedule. Allocate study sessions across Monday through Sunday, set daily goals, and track completion."
      canonicalUrl="https://thestudypilot.space/tools/weekly-study-planner"
      badge="Customizable & Printable"
      relatedArticleSlug="how-to-create-a-weekly-study-plan"
      relatedArticleTitle="How to Create a Weekly Study Plan That Survives the Week"
      relatedResourceSlug="weekly-study-timetable"
      relatedResourceTitle="Weekly Study Blueprint (7-Day Resilient Time Blocking)"
      keywords={[
        'weekly study planner',
        'printable study planner',
        'monday to sunday study schedule',
        'weekly study timetable',
        'study goal tracker',
      ]}
    >
      <div className="space-y-6">
        {/* Top Overview & Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Planned</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {stats.totalHours} Hours
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Sessions</span>
            <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
              {stats.totalSessions} Blocks
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed</span>
            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {stats.completedSessions} Blocks
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Weekly Progress</span>
              <p className="text-xl font-extrabold text-brand-600 dark:text-brand-400 mt-0.5">
                {stats.completionRate}%
              </p>
            </div>
            <div className="flex items-center gap-1.5 print:hidden">
              <Button size="sm" variant="outline" onClick={handleReset} title="Reset to defaults">
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              <Button size="sm" variant="primary" onClick={() => window.print()} title="Print schedule">
                <Printer className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Day Selector Tabs (Monday through Sunday) */}
        <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 scrollbar-none print:hidden">
          {days.map((d, idx) => {
            const isSelected = activeDayIndex === idx;
            const completedCount = d.sessions.filter((s) => s.completed && s.type !== 'break').length;
            const totalCount = d.sessions.filter((s) => s.type !== 'break').length;

            return (
              <button
                key={d.dayName}
                type="button"
                onClick={() => setActiveDayIndex(idx)}
                className={cn(
                  'px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2',
                  isSelected
                    ? 'border-brand-600 bg-brand-600 text-white shadow-xs dark:bg-brand-500 dark:border-brand-500'
                    : 'border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                )}
              >
                <span>{d.dayName}</span>
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded-md text-[10px] font-semibold',
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  )}
                >
                  {completedCount}/{totalCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Day Planner Editor View */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
          {/* Day Header & Daily Goal Input */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeDay.dayName}&apos;s Study Schedule
                </h3>
              </div>
              <input
                type="text"
                value={activeDay.dailyGoal}
                onChange={(e) => handleUpdateDailyGoal(activeDayIndex, e.target.value)}
                placeholder="Enter today's primary focus or deliverable goal..."
                className="w-full text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 bg-transparent border-0 focus:ring-0 p-0 placeholder-slate-400 italic"
              />
            </div>

            {/* Actions for this day */}
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <select
                aria-label="Copy to another day"
                onChange={(e) => {
                  const targetIdx = parseInt(e.target.value);
                  if (!isNaN(targetIdx)) {
                    handleDuplicateDay(activeDayIndex, targetIdx);
                    alert(`Copied ${activeDay.dayName}'s sessions to ${days[targetIdx].dayName}`);
                  }
                }}
                defaultValue=""
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <option value="" disabled>Copy Day to...</option>
                {days.map((d, i) => (
                  <option key={d.dayName} value={i} disabled={i === activeDayIndex}>
                    {d.dayName}
                  </option>
                ))}
              </select>

              <Button
                size="sm"
                variant="primary"
                onClick={() => handleAddSession(activeDayIndex)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Session Block
              </Button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {activeDay.sessions.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No study sessions scheduled for {activeDay.dayName}. Click &quot;Add Session Block&quot; to plan this day.
              </div>
            ) : (
              activeDay.sessions.map((sess) => {
                const isBreak = sess.type === 'break';

                return (
                  <div
                    key={sess.id}
                    className={cn(
                      'p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3',
                      sess.completed
                        ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-950 dark:bg-emerald-950/10'
                        : isBreak
                        ? 'border-dashed border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40'
                        : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
                    )}
                  >
                    {/* Left: Checkbox & Name */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {!isBreak && (
                        <button
                          type="button"
                          onClick={() => handleToggleSessionComplete(activeDayIndex, sess.id)}
                          className="text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                          aria-label={sess.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          <CheckCircle2
                            className={cn(
                              'w-5 h-5 transition-colors',
                              sess.completed
                                ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950'
                                : 'text-slate-300 dark:text-slate-600'
                            )}
                          />
                        </button>
                      )}

                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: sess.color }}
                      />

                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={sess.subject}
                          onChange={(e) =>
                            handleUpdateSession(activeDayIndex, sess.id, { subject: e.target.value })
                          }
                          className={cn(
                            'w-full text-xs sm:text-sm font-bold bg-transparent border-0 p-0 focus:ring-0 truncate',
                            sess.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-900 dark:text-white'
                          )}
                        />
                      </div>
                    </div>

                    {/* Middle: Type & Timing */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <select
                        aria-label="Session type"
                        value={sess.type}
                        onChange={(e) =>
                          handleUpdateSession(activeDayIndex, sess.id, { type: e.target.value as any })
                        }
                        className="rounded-lg border border-slate-200 bg-white p-1 text-[11px] font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      >
                        <option value="study">Study</option>
                        <option value="revision">Revision</option>
                        <option value="practice">Practice</option>
                        <option value="break">Break</option>
                      </select>

                      <input
                        type="text"
                        value={sess.time}
                        onChange={(e) =>
                          handleUpdateSession(activeDayIndex, sess.id, { time: e.target.value })
                        }
                        placeholder="Time slot"
                        className="w-36 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      />

                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="5"
                          max="300"
                          step="5"
                          value={sess.durationMinutes}
                          onChange={(e) =>
                            handleUpdateSession(activeDayIndex, sess.id, {
                              durationMinutes: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-16 rounded-lg border border-slate-200 bg-white px-1.5 py-1 text-[11px] font-mono text-right text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        />
                        <span className="text-[11px] text-slate-400">min</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteSession(activeDayIndex, sess.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 print:hidden"
                        aria-label="Delete session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Complete 7-Day Print/Export Grid (Visible during print or quick preview) */}
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Weekly Schedule Matrix (Monday – Sunday)</span>
            <span className="text-xs font-normal text-slate-400 print:hidden">
              Printable 7-day overview
            </span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {days.map((d, i) => (
              <div
                key={d.dayName}
                onClick={() => setActiveDayIndex(i)}
                className={cn(
                  'p-3 rounded-2xl border text-xs cursor-pointer transition-all',
                  activeDayIndex === i
                    ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30 dark:border-brand-800'
                    : 'border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/30 hover:border-slate-300'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 dark:text-white">{d.shortDay}</span>
                  <span className="text-[10px] text-slate-400">
                    {d.sessions.filter((s) => s.type !== 'break').length} blk
                  </span>
                </div>

                <div className="space-y-1 text-[11px]">
                  {d.sessions.slice(0, 3).map((s) => (
                    <div key={s.id} className="truncate text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="truncate">{s.subject}</span>
                    </div>
                  ))}
                  {d.sessions.length > 3 && (
                    <span className="text-[10px] text-slate-400 italic">+{d.sessions.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default WeeklyStudyPlannerTool;
