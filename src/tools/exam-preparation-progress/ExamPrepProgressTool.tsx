import React, { useState, useEffect, useMemo } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Target,
  BookOpen,
  RotateCcw,
  Plus,
  Trash2,
  HelpCircle,
  FileCheck,
  Brain,
} from 'lucide-react';

interface SubjectProgressItem {
  id: string;
  name: string;
  totalTopics: number;
  completedTopics: number;
  revisedTopics: number;
  practicedTopics: number;
}

const STORAGE_KEY = 'studypilot_tool_exam_progress_v1';

const DEFAULT_SUBJECTS: SubjectProgressItem[] = [
  { id: 'sub_1', name: 'Mathematics / Quantitative', totalTopics: 24, completedTopics: 18, revisedTopics: 12, practicedTopics: 10 },
  { id: 'sub_2', name: 'Reasoning & Analytical', totalTopics: 20, completedTopics: 16, revisedTopics: 14, practicedTopics: 12 },
  { id: 'sub_3', name: 'General Studies / Science', totalTopics: 30, completedTopics: 15, revisedTopics: 8, practicedTopics: 6 },
];

export const ExamPrepProgressTool: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectProgressItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.subjects && Array.isArray(parsed.subjects)) return parsed.subjects;
      }
    } catch {
      // fallback
    }
    return DEFAULT_SUBJECTS;
  });

  const [completedMocks, setCompletedMocks] = useState<number>(6);
  const [targetMocks, setTargetMocks] = useState<number>(15);

  // Sync to isolated local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ subjects, completedMocks, targetMocks }));
    } catch (e) {
      console.error('Failed to save exam progress state', e);
    }
  }, [subjects, completedMocks, targetMocks]);

  // Aggregate metrics
  const aggregateMetrics = useMemo(() => {
    let totalTopics = 0;
    let completedTopics = 0;
    let revisedTopics = 0;
    let practicedTopics = 0;

    subjects.forEach((s) => {
      totalTopics += Math.max(1, s.totalTopics);
      completedTopics += Math.min(s.totalTopics, s.completedTopics);
      revisedTopics += Math.min(s.completedTopics, s.revisedTopics);
      practicedTopics += Math.min(s.completedTopics, s.practicedTopics);
    });

    const learningPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const revisionPercent = completedTopics > 0 ? Math.round((revisedTopics / completedTopics) * 100) : 0;
    const practicePercent = completedTopics > 0 ? Math.round((practicedTopics / completedTopics) * 100) : 0;

    const validTargetMocks = Math.max(1, targetMocks);
    const mockPercent = Math.min(100, Math.round((completedMocks / validTargetMocks) * 100));

    return {
      totalTopics,
      completedTopics,
      revisedTopics,
      practicedTopics,
      learningPercent,
      revisionPercent,
      practicePercent,
      mockPercent,
    };
  }, [subjects, completedMocks, targetMocks]);

  const handleAddSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        id: 'sub_' + Date.now().toString(36),
        name: `Subject ${prev.length + 1}`,
        totalTopics: 15,
        completedTopics: 5,
        revisedTopics: 3,
        practicedTopics: 2,
      },
    ]);
  };

  const handleUpdateSubject = (id: string, updates: Partial<SubjectProgressItem>) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleDeleteSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Reset progress calculator to default values?')) {
      setSubjects(DEFAULT_SUBJECTS);
      setCompletedMocks(6);
      setTargetMocks(15);
    }
  };

  return (
    <ToolLayout
      title="Exam Preparation Progress Calculator"
      metaTitle="Free Exam Prep Progress Calculator – Multi-Dimensional Syllabus Tracker"
      description="Track syllabus learning, revision depth, practice sets, and mock tests across distinct dimensions. Never settle for misleading single-score metrics."
      canonicalUrl="https://thestudypilot.space/tools/exam-preparation-progress"
      badge="Multi-Dimensional Progress"
      relatedArticleSlug="competitive-exam-study-plan"
      relatedArticleTitle="Competitive Exam Study Plan: The 3-Phase Strategy & Error Log System"
      relatedResourceSlug="mock-test-analysis-sheet"
      relatedResourceTitle="Mock Test Error Analysis Journal (Post-Test Error Log)"
      keywords={[
        'exam preparation progress calculator',
        'syllabus completion tracker',
        'revision progress tracker',
        'mock test tracker',
        'competitive exam progress',
      ]}
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Anti-Misleading Notice */}
        <div className="rounded-2xl border border-indigo-200/90 bg-indigo-50/60 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30 text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-indigo-900 dark:text-indigo-100 mb-0.5">
              Strict Multi-Dimensional Transparency:
            </strong>
            Reading a topic once is not the same as revising it or practicing test questions. This tool keeps <strong>Learning</strong>, <strong>Revision</strong>, <strong>Practice</strong>, and <strong>Mocks</strong> strictly separated rather than fabricating a misleading &quot;total progress percentage&quot;.
          </div>
        </div>

        {/* 4 Distinct Core Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dimension 1: Learning Progress */}
          <div className="p-5 rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Learning</span>
              <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
              {aggregateMetrics.learningPercent}%
            </div>
            <div className="space-y-1 text-xs text-slate-500">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-brand-600 dark:bg-brand-500 transition-all"
                  style={{ width: `${aggregateMetrics.learningPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] pt-0.5">
                <span>{aggregateMetrics.completedTopics} of {aggregateMetrics.totalTopics} topics</span>
                <span>First Read</span>
              </div>
            </div>
          </div>

          {/* Dimension 2: Revision Depth */}
          <div className="p-5 rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Revision</span>
              <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
              {aggregateMetrics.revisionPercent}%
            </div>
            <div className="space-y-1 text-xs text-slate-500">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all"
                  style={{ width: `${aggregateMetrics.revisionPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] pt-0.5">
                <span>{aggregateMetrics.revisedTopics} of {aggregateMetrics.completedTopics} revised</span>
                <span>Active Recall</span>
              </div>
            </div>
          </div>

          {/* Dimension 3: Problem Practice */}
          <div className="p-5 rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Practice</span>
              <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              {aggregateMetrics.practicePercent}%
            </div>
            <div className="space-y-1 text-xs text-slate-500">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all"
                  style={{ width: `${aggregateMetrics.practicePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] pt-0.5">
                <span>{aggregateMetrics.practicedTopics} of {aggregateMetrics.completedTopics} practiced</span>
                <span>Question Sets</span>
              </div>
            </div>
          </div>

          {/* Dimension 4: Mock Test Simulation */}
          <div className="p-5 rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">4. Mock Tests</span>
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-500">
              {aggregateMetrics.mockPercent}%
            </div>
            <div className="space-y-1 text-xs text-slate-500">
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all"
                  style={{ width: `${aggregateMetrics.mockPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] pt-0.5">
                <span>{completedMocks} of {targetMocks} simulated</span>
                <span>Exam Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subject-Wise Granular Inputs Table */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Subject-Wise Syllabus Inputs ({subjects.length})</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Update chapter numbers for each subject. All metrics update instantly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleReset} title="Reset">
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={handleAddSubject}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Subject
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => handleUpdateSubject(sub.id, { name: e.target.value })}
                    className="text-sm font-bold text-slate-900 dark:text-white bg-transparent border-0 p-0 focus:ring-0 flex-1"
                  />
                  {subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSubject(sub.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      aria-label="Delete subject"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Total Topics</label>
                    <input
                      type="number"
                      min="1"
                      value={sub.totalTopics}
                      onChange={(e) =>
                        handleUpdateSubject(sub.id, { totalTopics: parseInt(e.target.value) || 1 })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Topics Completed</label>
                    <input
                      type="number"
                      min="0"
                      max={sub.totalTopics}
                      value={sub.completedTopics}
                      onChange={(e) =>
                        handleUpdateSubject(sub.id, { completedTopics: parseInt(e.target.value) || 0 })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Topics Revised</label>
                    <input
                      type="number"
                      min="0"
                      max={sub.completedTopics}
                      value={sub.revisedTopics}
                      onChange={(e) =>
                        handleUpdateSubject(sub.id, { revisedTopics: parseInt(e.target.value) || 0 })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Topics Practiced</label>
                    <input
                      type="number"
                      min="0"
                      max={sub.completedTopics}
                      value={sub.practicedTopics}
                      onChange={(e) =>
                        handleUpdateSubject(sub.id, { practicedTopics: parseInt(e.target.value) || 0 })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mock Test Settings */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Mock Exam Parameters:
            </span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-slate-500">
                <span>Completed:</span>
                <input
                  type="number"
                  min="0"
                  value={completedMocks}
                  onChange={(e) => setCompletedMocks(parseInt(e.target.value) || 0)}
                  className="w-16 rounded-xl border border-slate-200 bg-white p-1 font-mono text-center dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <label className="flex items-center gap-1.5 text-slate-500">
                <span>Target Mocks:</span>
                <input
                  type="number"
                  min="1"
                  value={targetMocks}
                  onChange={(e) => setTargetMocks(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 rounded-xl border border-slate-200 bg-white p-1 font-mono text-center dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ExamPrepProgressTool;
