import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  RefreshCw,
  Printer,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SubjectInput {
  id: string;
  name: string;
  color: string;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'low' | 'medium' | 'high';
  topics: string;
}

interface ScheduleBlock {
  id: string;
  type: 'study' | 'revision' | 'practice' | 'break';
  subjectName?: string;
  subjectColor?: string;
  topic?: string;
  durationMinutes: number;
  timeLabel: string;
}

interface GeneratedPlan {
  dailyFocusHours: number;
  sessionBlockMinutes: number;
  revisionMinutes: number;
  practiceMinutes: number;
  breakMinutes: number;
  dailyBlocks: ScheduleBlock[];
  weeklyDistribution: Array<{
    day: string;
    subjects: string[];
    totalHours: number;
  }>;
  generatedAt: string;
}

const STORAGE_KEY = 'studypilot_tool_study_planner_v1';

const COLOR_OPTIONS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];

export const StudyPlannerGeneratorTool: React.FC = () => {
  const [availableDailyHours, setAvailableDailyHours] = useState<number>(4);
  const [sessionBlockMinutes, setSessionBlockMinutes] = useState<number>(45);
  const [revisionPercent, setRevisionPercent] = useState<number>(20);
  const [practicePercent, setPracticePercent] = useState<number>(20);
  const [examDate, setExamDate] = useState<string>('');

  const [subjects, setSubjects] = useState<SubjectInput[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.subjects && Array.isArray(parsed.subjects)) {
          return parsed.subjects;
        }
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'sub_1',
        name: 'Mathematics',
        color: '#6366f1',
        difficulty: 'hard',
        priority: 'high',
        topics: 'Calculus, Vectors, Probability',
      },
      {
        id: 'sub_2',
        name: 'Physics',
        color: '#3b82f6',
        difficulty: 'medium',
        priority: 'medium',
        topics: 'Electromagnetism, Optics',
      },
      {
        id: 'sub_3',
        name: 'General Studies',
        color: '#10b981',
        difficulty: 'easy',
        priority: 'medium',
        topics: 'Modern History, Geography',
      },
    ];
  });

  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.generatedPlan) {
          return parsed.generatedPlan;
        }
      }
    } catch {
      // fallback
    }
    return null;
  });

  // Save to isolated local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          subjects,
          availableDailyHours,
          sessionBlockMinutes,
          revisionPercent,
          practicePercent,
          examDate,
          generatedPlan,
        })
      );
    } catch (e) {
      console.error('Failed to save study planner state', e);
    }
  }, [
    subjects,
    availableDailyHours,
    sessionBlockMinutes,
    revisionPercent,
    practicePercent,
    examDate,
    generatedPlan,
  ]);

  const handleAddSubject = () => {
    const nextColor = COLOR_OPTIONS[subjects.length % COLOR_OPTIONS.length];
    setSubjects((prev) => [
      ...prev,
      {
        id: 'sub_' + Date.now().toString(36),
        name: 'New Subject',
        color: nextColor,
        difficulty: 'medium',
        priority: 'medium',
        topics: '',
      },
    ]);
  };

  const handleUpdateSubject = (id: string, updates: Partial<SubjectInput>) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleDeleteSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  // Generate customized schedule
  const handleGeneratePlan = () => {
    if (subjects.length === 0) return;

    const totalDailyMinutes = availableDailyHours * 60;
    const revMins = Math.round(totalDailyMinutes * (revisionPercent / 100));
    const pracMins = Math.round(totalDailyMinutes * (practicePercent / 100));
    const studyMins = Math.max(30, totalDailyMinutes - revMins - pracMins);

    // Sort subjects by weighted priority: (hard=3, medium=2, easy=1) * (high=3, medium=2, low=1)
    const sortedSubjects = [...subjects].sort((a, b) => {
      const weight = (s: SubjectInput) => {
        const diffWeight = s.difficulty === 'hard' ? 3 : s.difficulty === 'medium' ? 2 : 1;
        const prioWeight = s.priority === 'high' ? 3 : s.priority === 'medium' ? 2 : 1;
        return diffWeight * prioWeight;
      };
      return weight(b) - weight(a);
    });

    const blocks: ScheduleBlock[] = [];
    let startHour = 8;
    let startMin = 30;

    const formatTime = (h: number, m: number) => {
      const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm = h >= 12 ? 'PM' : 'AM';
      return `${displayHour}:${String(m).padStart(2, '0')} ${ampm}`;
    };

    const addBlock = (
      type: ScheduleBlock['type'],
      duration: number,
      subject?: SubjectInput,
      customTopic?: string
    ) => {
      const startTimeStr = formatTime(startHour, startMin);
      startMin += duration;
      while (startMin >= 60) {
        startHour += 1;
        startMin -= 60;
      }
      const endTimeStr = formatTime(startHour, startMin);

      blocks.push({
        id: 'block_' + Math.random().toString(36).substring(2, 8),
        type,
        subjectName: subject?.name,
        subjectColor: subject?.color,
        topic: customTopic || subject?.topics.split(',')[0]?.trim() || 'Core Chapter Focus',
        durationMinutes: duration,
        timeLabel: `${startTimeStr} – ${endTimeStr}`,
      });
    };

    // 1. First Revision Block (Spaced Retrieval of previous concepts)
    if (revMins > 0) {
      addBlock('revision', Math.min(30, revMins), sortedSubjects[0], 'Previous Day Active Retrieval');
    }

    // 2. Primary Deep Focus Blocks
    let remainingStudyMins = studyMins;
    let subIdx = 0;
    while (remainingStudyMins > 0) {
      const currentSub = sortedSubjects[subIdx % sortedSubjects.length];
      const blockDuration = Math.min(sessionBlockMinutes, remainingStudyMins);

      addBlock('study', blockDuration, currentSub);
      remainingStudyMins -= blockDuration;
      subIdx++;

      // Insert break if study remains
      if (remainingStudyMins > 0) {
        addBlock('break', 10, undefined, 'Hydration, Stretch & Eye Rest');
      }
    }

    // 3. Practice Block (Questions / Problem Sets)
    if (pracMins > 0) {
      addBlock('break', 15, undefined, 'Transition & Snack Break');
      addBlock('practice', pracMins, sortedSubjects[1] || sortedSubjects[0], 'Targeted Problem Sets & Error Log');
    }

    // 4. Evening Consolidation Buffer (Remainder)
    if (revMins > 30) {
      addBlock('revision', revMins - 30, undefined, 'Daily Recap & Tomorrow Preparation');
    }

    // Generate Weekly Plan
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weeklyDistribution = days.map((day, i) => {
      if (day === 'Saturday') {
        return {
          day,
          subjects: ['Sectional Mock Practice', 'Error Log Analysis'],
          totalHours: Math.min(availableDailyHours, 3),
        };
      }
      if (day === 'Sunday') {
        return {
          day,
          subjects: ['Weekly Spaced Revision', 'Sunday Retrospective'],
          totalHours: Math.min(availableDailyHours, 2.5),
        };
      }

      // Interleave 2 subjects per weekday
      const sub1 = sortedSubjects[i % sortedSubjects.length]?.name || 'Core Focus';
      const sub2 = sortedSubjects[(i + 1) % sortedSubjects.length]?.name || 'Secondary Focus';

      return {
        day,
        subjects: [sub1, sub2],
        totalHours: availableDailyHours,
      };
    });

    setGeneratedPlan({
      dailyFocusHours: availableDailyHours,
      sessionBlockMinutes,
      revisionMinutes: revMins,
      practiceMinutes: pracMins,
      breakMinutes: blocks.filter((b) => b.type === 'break').reduce((sum, b) => sum + b.durationMinutes, 0),
      dailyBlocks: blocks,
      weeklyDistribution,
      generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolLayout
      title="Study Planner Generator"
      metaTitle="Free Study Planner Generator – Custom Daily & Weekly Timetables"
      description="Auto-generate a balanced, flexible study timetable based on your available daily hours, subject difficulty, revision quotas, and exam targets."
      canonicalUrl="https://thestudypilot.space/tools/study-planner-generator"
      badge="Interactive Schedule Generator"
      relatedArticleSlug="how-to-create-a-study-schedule"
      relatedArticleTitle="How to Create a Study Schedule You Can Actually Follow"
      relatedResourceSlug="daily-study-planner"
      relatedResourceTitle="Daily Study Focus Planner Printable"
      keywords={[
        'study planner generator',
        'create study schedule online',
        'free study timetable generator',
        'study plan calculator',
        'student schedule builder',
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          {/* Step 1: Study Parameters */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>1. Available Study Time &amp; Intervals</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Daily Study Hours ({availableDailyHours} hrs / day)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={availableDailyHours}
                  onChange={(e) => setAvailableDailyHours(parseFloat(e.target.value))}
                  className="w-full accent-brand-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>1 hr (Light)</span>
                  <span>4 hrs (Balanced)</span>
                  <span>10 hrs (Intense)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Session Block Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 45, 60, 90].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setSessionBlockMinutes(mins)}
                      className={cn(
                        'py-1.5 rounded-xl border text-xs font-semibold transition-all',
                        sessionBlockMinutes === mins
                          ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 dark:border-brand-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                      )}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Revision Time: {revisionPercent}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="5"
                    value={revisionPercent}
                    onChange={(e) => setRevisionPercent(parseInt(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Practice Time: {practicePercent}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="5"
                    value={practicePercent}
                    onChange={(e) => setPracticePercent(parseInt(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Exam Date (Optional)
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Subjects & Priorities */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>2. Subjects &amp; Priorities ({subjects.length})</span>
              </h3>
              <button
                type="button"
                onClick={handleAddSubject}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Subject</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {subjects.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 rounded-2xl border border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40 space-y-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={sub.color}
                      onChange={(e) => handleUpdateSubject(sub.id, { color: e.target.value })}
                      className="w-5 h-5 rounded-md cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleUpdateSubject(sub.id, { name: e.target.value })}
                      placeholder="Subject Name"
                      className="flex-1 font-semibold bg-transparent border-0 text-slate-900 dark:text-white focus:ring-0 p-0"
                    />
                    {subjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSubject(sub.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        aria-label="Remove subject"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400">Difficulty:</span>
                      <select
                        value={sub.difficulty}
                        onChange={(e) => handleUpdateSubject(sub.id, { difficulty: e.target.value as any })}
                        className="w-full mt-0.5 rounded-lg border border-slate-200 bg-white p-1 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      >
                        <option value="hard">Hard (Tier 1)</option>
                        <option value="medium">Medium (Tier 2)</option>
                        <option value="easy">Easy (Tier 3)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-slate-400">Priority:</span>
                      <select
                        value={sub.priority}
                        onChange={(e) => handleUpdateSubject(sub.id, { priority: e.target.value as any })}
                        className="w-full mt-0.5 rounded-lg border border-slate-200 bg-white p-1 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      >
                        <option value="high">High Priority</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={sub.topics}
                      onChange={(e) => handleUpdateSubject(sub.id, { topics: e.target.value })}
                      placeholder="Key topics (e.g. Algebra, Thermodynamics)"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleGeneratePlan}
              className="w-full justify-center font-bold shadow-md shadow-brand-500/20"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Generate Custom Study Plan
            </Button>
          </div>
        </div>

        {/* Right Column: Generated Plan View (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {!generatedPlan ? (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white/40 dark:bg-slate-900/40 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 mx-auto flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Your Schedule is Ready to Build
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Adjust your daily hours and subjects on the left, then click &quot;Generate Custom Study Plan&quot; to compute your schedule blocks and weekly timetable.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={handleGeneratePlan}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate Default Schedule
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Output Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 print:hidden shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Plan Generated at {generatedPlan.generatedAt}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {generatedPlan.dailyFocusHours} hrs daily • {generatedPlan.sessionBlockMinutes}m session intervals
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleGeneratePlan}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Regenerate
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handlePrint}
                    leftIcon={<Printer className="w-3.5 h-3.5" />}
                  >
                    Print Plan
                  </Button>
                </div>
              </div>

              {/* Schedule Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Net Study</span>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {generatedPlan.dailyFocusHours}h / day
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Revision</span>
                  <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {generatedPlan.revisionMinutes} mins
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Practice</span>
                  <p className="text-lg font-extrabold text-brand-600 dark:text-brand-400 mt-0.5">
                    {generatedPlan.practiceMinutes} mins
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rest Breaks</span>
                  <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {generatedPlan.breakMinutes} mins
                  </p>
                </div>
              </div>

              {/* Daily Schedule Blocks */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Daily Schedule Blocks</span>
                  <span className="text-xs font-normal text-slate-400">
                    {generatedPlan.dailyBlocks.length} planned intervals
                  </span>
                </h4>

                <div className="space-y-2.5">
                  {generatedPlan.dailyBlocks.map((block) => {
                    const isBreak = block.type === 'break';
                    const isRevision = block.type === 'revision';
                    const isPractice = block.type === 'practice';

                    return (
                      <div
                        key={block.id}
                        className={cn(
                          'flex items-center justify-between p-3.5 rounded-2xl border transition-all',
                          isBreak
                            ? 'border-dashed border-emerald-200 bg-emerald-50/30 text-emerald-900 dark:border-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-300'
                            : isRevision
                            ? 'border-indigo-100 bg-indigo-50/40 dark:border-indigo-950 dark:bg-indigo-950/20'
                            : isPractice
                            ? 'border-amber-100 bg-amber-50/40 dark:border-amber-950 dark:bg-amber-950/20'
                            : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/90'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: block.subjectColor || (isBreak ? '#10b981' : '#6366f1') }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {isBreak
                                  ? 'Rest & Decompression Break'
                                  : block.subjectName || 'Consolidation'}
                              </span>
                              <span
                                className={cn(
                                  'text-[10px] px-1.5 py-0.5 rounded-md font-semibold uppercase tracking-wider',
                                  isBreak
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : isRevision
                                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                    : isPractice
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                    : 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                                )}
                              >
                                {block.type}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {block.topic}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                            {block.timeLabel}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            {block.durationMinutes} mins
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Schedule Matrix */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Monday–Sunday Weekly Distribution
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {generatedPlan.weeklyDistribution.map((w) => (
                    <div
                      key={w.day}
                      className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {w.day}
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-brand-600 dark:text-brand-400">
                          {w.totalHours}h planned
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {w.subjects.map((sub, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-[10px] font-medium text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default StudyPlannerGeneratorTool;
