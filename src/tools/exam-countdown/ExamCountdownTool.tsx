import React, { useState, useEffect, useMemo } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Target,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface CountdownExamItem {
  id: string;
  name: string;
  date: string; // 'YYYY-MM-DD'
  priority: 'high' | 'medium' | 'low';
  syllabusPercent: number;
  dailyGoalHours: number;
}

const STORAGE_KEY = 'studypilot_tool_exam_countdown_v1';

const DEFAULT_EXAMS: CountdownExamItem[] = [
  {
    id: 'exam_1',
    name: 'Final Semester Examination',
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'high',
    syllabusPercent: 65,
    dailyGoalHours: 4,
  },
  {
    id: 'exam_2',
    name: 'National Competitive Entrance',
    date: new Date(Date.now() + 110 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: 'medium',
    syllabusPercent: 40,
    dailyGoalHours: 5,
  },
];

export const ExamCountdownTool: React.FC = () => {
  const [exams, setExams] = useState<CountdownExamItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_EXAMS;
  });

  const [selectedExamId, setSelectedExamId] = useState<string>(() => exams[0]?.id || '');
  const [isAdding, setIsAdding] = useState(false);
  const [newExamName, setNewExamName] = useState('');
  const [newExamDate, setNewExamDate] = useState('');
  const [newExamPriority, setNewExamPriority] = useState<'high' | 'medium' | 'low'>('high');

  // Persist to isolated local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
    } catch (e) {
      console.error('Failed to save exam countdown state', e);
    }
  }, [exams]);

  // Selected exam calculation
  const activeExam = useMemo(() => {
    return exams.find((e) => e.id === selectedExamId) || exams[0];
  }, [exams, selectedExamId]);

  const countdown = useMemo(() => {
    if (!activeExam || !activeExam.date) {
      return { days: 0, weeks: 0, months: 0, isPassed: false, isToday: false };
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const target = new Date(activeExam.date + 'T00:00:00');
    const diffMs = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const isPassed = diffDays < 0;
    const isToday = diffDays === 0;

    const days = Math.max(0, diffDays);
    const weeks = Math.round((days / 7) * 10) / 10;
    const months = Math.round((days / 30.4) * 10) / 10;

    return { days, weeks, months, isPassed, isToday };
  }, [activeExam]);

  const handleAddExam = () => {
    if (!newExamName.trim() || !newExamDate) return;

    const newExam: CountdownExamItem = {
      id: 'exam_' + Date.now().toString(36),
      name: newExamName.trim(),
      date: newExamDate,
      priority: newExamPriority,
      syllabusPercent: 20,
      dailyGoalHours: 3.5,
    };

    setExams((prev) => [...prev, newExam]);
    setSelectedExamId(newExam.id);
    setNewExamName('');
    setNewExamDate('');
    setIsAdding(false);
  };

  const handleUpdateExam = (id: string, updates: Partial<CountdownExamItem>) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const handleDeleteExam = (id: string) => {
    if (exams.length <= 1) return;
    const remaining = exams.filter((e) => e.id !== id);
    setExams(remaining);
    setSelectedExamId(remaining[0]?.id || '');
  };

  return (
    <ToolLayout
      title="Exam Countdown Tracker"
      metaTitle="Free Exam Countdown Tracker – Days, Weeks & Syllabus Tracker"
      description="Calculate exact days, weeks, and months remaining until your examination date. Track syllabus completion and maintain daily study momentum."
      canonicalUrl="https://thestudypilot.space/tools/exam-countdown"
      badge="Deadline & Urgency"
      relatedArticleSlug="competitive-exam-study-plan"
      relatedArticleTitle="Competitive Exam Study Plan: The 3-Phase Strategy & Error Log System"
      relatedResourceSlug="exam-countdown-planner"
      relatedResourceTitle="Exam Countdown & Target Score Planner"
      keywords={[
        'exam countdown timer',
        'days until exam calculator',
        'exam deadline tracker',
        'syllabus completion countdown',
        'study countdown clock',
      ]}
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Multi-Exam Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white border border-slate-200/80 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {exams.map((exam) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => setSelectedExamId(exam.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2',
                  activeExam?.id === exam.id
                    ? 'bg-brand-600 text-white shadow-xs dark:bg-brand-500'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                )}
              >
                <span>{exam.name}</span>
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    exam.priority === 'high' ? 'bg-rose-400' : exam.priority === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
                  )}
                />
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add New Exam
          </Button>
        </div>

        {/* Add Exam Modal/Panel */}
        {isAdding && (
          <div className="rounded-3xl border border-brand-200/80 bg-brand-50/40 p-6 dark:border-brand-900/60 dark:bg-brand-950/20 space-y-4 animate-in slide-in-from-top-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Create Target Examination Countdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Exam Title</label>
                <input
                  type="text"
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  placeholder="e.g. UPSC Prelims, MCAT, GRE"
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Target Date</label>
                <input
                  type="date"
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Priority</label>
                <select
                  value={newExamPriority}
                  onChange={(e) => setNewExamPriority(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="primary" onClick={handleAddExam}>
                Save Exam
              </Button>
            </div>
          </div>
        )}

        {/* Primary Countdown Display */}
        {activeExam && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 dark:border-slate-800 dark:bg-slate-900 shadow-sm text-center space-y-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Exam
                </span>
                <span className="text-slate-300">•</span>
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider',
                    activeExam.priority === 'high'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : activeExam.priority === 'medium'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  )}
                >
                  {activeExam.priority} Priority
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {activeExam.name}
              </h2>

              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Scheduled for {new Date(activeExam.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              {/* Big Flip-Card Style Countdown Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto py-2">
                <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-4xl sm:text-6xl font-extrabold font-mono text-brand-600 dark:text-brand-400">
                    {countdown.days}
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                    Days Left
                  </span>
                </div>

                <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-4xl sm:text-6xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                    {countdown.weeks}
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                    Weeks
                  </span>
                </div>

                <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-4xl sm:text-6xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    {countdown.months}
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                    Months
                  </span>
                </div>
              </div>

              {countdown.isToday && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Exam Day is Today! Stay calm and execute your plan.</span>
                </div>
              )}
            </div>

            {/* Interactive Syllabus & Target Adjustments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-brand-600" />
                    <span>Syllabus Completion</span>
                  </span>
                  <span className="text-brand-600 dark:text-brand-400 font-mono text-sm">
                    {activeExam.syllabusPercent}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={activeExam.syllabusPercent}
                  onChange={(e) =>
                    handleUpdateExam(activeExam.id, { syllabusPercent: parseInt(e.target.value) || 0 })
                  }
                  className="w-full accent-brand-600"
                />

                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-brand-600 dark:bg-brand-500 transition-all duration-300"
                    style={{ width: `${activeExam.syllabusPercent}%` }}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Daily Study Target</span>
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                    {activeExam.dailyGoalHours}h / day
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={activeExam.dailyGoalHours}
                  onChange={(e) =>
                    handleUpdateExam(activeExam.id, { dailyGoalHours: parseFloat(e.target.value) || 3 })
                  }
                  className="w-full accent-indigo-600"
                />

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  At {activeExam.dailyGoalHours}h/day, you will invest approximately{' '}
                  <strong className="text-slate-900 dark:text-white">
                    {Math.round(countdown.days * activeExam.dailyGoalHours)} hours
                  </strong>{' '}
                  before exam day.
                </p>
              </div>
            </div>

            {/* Delete current exam button */}
            {exams.length > 1 && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => handleDeleteExam(activeExam.id)}
                  className="text-xs text-slate-400 hover:text-rose-500 inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove {activeExam.name}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ExamCountdownTool;
