import React, { useState } from 'react';
import { Button } from '../common/Button';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Clock,
  Flame,
  Calendar,
  Sparkles,
  Layers,
} from 'lucide-react';

interface SubjectConfigStepProps {
  examName: string;
  dailyTargetHours: number;
  onChangeDailyTargetHours: (hours: number) => void;
  minStreakMinutes: number;
  onChangeMinStreakMinutes: (mins: number) => void;
  targetExamDate: string;
  onChangeTargetExamDate: (date: string) => void;
  subjects: Array<{
    id: string;
    name: string;
    code: string;
    color: string;
    dailyTargetHours: number;
  }>;
  onUpdateSubject: (
    id: string,
    updates: Partial<{ name: string; code: string; color: string; dailyTargetHours: number }>
  ) => void;
  onAddSubject: (name: string, code: string, color: string, hours: number) => void;
  onDeleteSubject: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onBack: () => void;
  onComplete: () => void;
}

const COLOR_OPTIONS = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#0ea5e9', // Sky
  '#10b981', // Emerald
  '#14b8a6', // Teal
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#a855f7', // Purple
  '#ec4899', // Pink
];

export const SubjectConfigStep: React.FC<SubjectConfigStepProps> = ({
  examName,
  dailyTargetHours,
  onChangeDailyTargetHours,
  minStreakMinutes,
  onChangeMinStreakMinutes,
  targetExamDate,
  onChangeTargetExamDate,
  subjects,
  onUpdateSubject,
  onAddSubject,
  onDeleteSubject,
  onMoveUp,
  onMoveDown,
  onBack,
  onComplete,
}) => {
  // New subject inline state
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0]);
  const [newHours, setNewHours] = useState(1.5);
  const [validationError, setValidationError] = useState('');

  // Total allocated hours calculated automatically
  const totalAllocatedHours = subjects.reduce(
    (sum, s) => sum + (Number(s.dailyTargetHours) || 0),
    0
  );

  const roundedAllocated = Math.round(totalAllocatedHours * 10) / 10;
  const roundedTarget = Math.round(dailyTargetHours * 10) / 10;
  const diffHours = Math.round(Math.abs(roundedTarget - roundedAllocated) * 10) / 10;
  const isMatch = Math.abs(roundedTarget - roundedAllocated) < 0.1;
  const isUnder = roundedAllocated < roundedTarget;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setValidationError('Please enter a subject name');
      return;
    }
    const codeToUse = newCode.trim() ? newCode.trim().toUpperCase() : newName.slice(0, 4).toUpperCase();
    onAddSubject(newName.trim(), codeToUse, newColor, Math.max(0.5, newHours));
    setNewName('');
    setNewCode('');
    setNewColor(COLOR_OPTIONS[(subjects.length + 1) % COLOR_OPTIONS.length]);
    setNewHours(1.5);
    setValidationError('');
    setIsAdding(false);
  };

  const streakOptions = [
    { mins: 15, label: '15 mins (Light)' },
    { mins: 25, label: '25 mins (Pomodoro)' },
    { mins: 30, label: '30 mins (Recommended)' },
    { mins: 45, label: '45 mins (Deep)' },
    { mins: 60, label: '60 mins (Intense)' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Step 2 of 2
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Configure Subjects & Target Allocations
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Setting up your plan for <span className="font-semibold text-slate-800 dark:text-slate-200">{examName}</span>. Allocate daily focus hours to each subject.
        </p>
      </div>

      {/* Target & Streak Global Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Daily Study Target */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Daily Study Target</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="20"
              step="0.5"
              value={dailyTargetHours}
              onChange={(e) => onChangeDailyTargetHours(Math.max(1, Number(e.target.value)))}
              className="w-24 px-3 py-2 text-lg font-bold rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">hours / day</span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">Your total daily focus aspiration</p>
        </div>

        {/* Minimum Streak Threshold */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Min. Time for Streak</span>
          </label>
          <select
            value={minStreakMinutes}
            onChange={(e) => onChangeMinStreakMinutes(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {streakOptions.map((opt) => (
              <option key={opt.mins} value={opt.mins}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-[11px] text-slate-400">Minutes required to count as active day</p>
        </div>

        {/* Optional Target Exam Date */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Exam Date <span className="text-slate-400 font-normal lowercase">(optional)</span></span>
          </label>
          <input
            type="date"
            value={targetExamDate}
            onChange={(e) => onChangeTargetExamDate(e.target.value)}
            className="w-full px-3 py-2 text-sm font-medium rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <p className="mt-1.5 text-[11px] text-slate-400">Enables automatic days countdown</p>
        </div>
      </div>

      {/* Target Allocation Live Comparison Banner */}
      <div
        className={`rounded-2xl p-4.5 border transition-all ${
          isMatch
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800/80 dark:text-emerald-200'
            : 'bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/80 dark:text-amber-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {isMatch ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <p className="text-sm font-bold">
                {isMatch
                  ? `Balanced Allocation: ${roundedAllocated}h / ${roundedTarget}h`
                  : isUnder
                  ? `Allocation Warning: ${roundedAllocated}h of ${roundedTarget}h allocated (${diffHours}h unallocated)`
                  : `Allocation Warning: ${roundedAllocated}h exceeds daily goal of ${roundedTarget}h by ${diffHours}h`}
              </p>
              <p className="text-xs opacity-90 mt-0.5">
                {isMatch
                  ? 'Your subject allocations match your daily study goal perfectly.'
                  : 'You can adjust subject hours or change your daily target. You may also continue as-is.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-current/20">
            <span>Allocated: {roundedAllocated}h</span>
            <span>•</span>
            <span>Target: {roundedTarget}h</span>
          </div>
        </div>
      </div>

      {/* Subjects List & Reordering */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Subject List ({subjects.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Use arrows to reorder • Edit names and hours directly
          </span>
        </div>

        {subjects.map((sub, index) => (
          <div
            key={sub.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            {/* Color chip & Reorder controls */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition-opacity"
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onMoveDown(index)}
                  disabled={index === subjects.length - 1}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 transition-opacity"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Color dropdown / picker circle */}
              <div className="relative group">
                <div
                  className="w-6 h-6 rounded-lg shadow-2xs cursor-pointer ring-1 ring-black/10"
                  style={{ backgroundColor: sub.color }}
                  title="Color indicator"
                />
              </div>

              {/* Code pill */}
              <input
                type="text"
                value={sub.code}
                onChange={(e) => onUpdateSubject(sub.id, { code: e.target.value.toUpperCase() })}
                className="w-16 px-2 py-1 text-xs font-bold uppercase rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-center focus:ring-1 focus:ring-brand-500"
                title="Subject code abbreviation"
              />
            </div>

            {/* Subject Name Input */}
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={sub.name}
                onChange={(e) => onUpdateSubject(sub.id, { name: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-semibold rounded-lg border border-transparent hover:border-slate-200 focus:border-brand-500 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-800"
                placeholder="Subject name"
              />
            </div>

            {/* Daily Hours & Delete action */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily:</span>
                <input
                  type="number"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={sub.dailyTargetHours}
                  onChange={(e) =>
                    onUpdateSubject(sub.id, { dailyTargetHours: Math.max(0.5, Number(e.target.value)) })
                  }
                  className="w-14 text-xs font-bold text-slate-900 dark:text-white bg-transparent border-0 text-center focus:outline-none"
                />
                <span className="text-xs text-slate-400 font-medium">hrs</span>
              </div>

              <button
                type="button"
                onClick={() => onDeleteSubject(sub.id)}
                disabled={subjects.length <= 1}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-20 transition-all"
                title="Delete subject"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Add Subject Section */}
        {isAdding ? (
          <form
            onSubmit={handleAddNew}
            className="p-4 rounded-xl border border-brand-300 bg-brand-50/40 dark:border-brand-800 dark:bg-brand-950/30 space-y-3"
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Add New Subject
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Subject name (e.g. Organic Chemistry)"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  autoFocus
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Code (e.g. CHEM)"
                  className="w-full px-3 py-2 text-sm uppercase rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={newHours}
                  onChange={(e) => setNewHours(Number(e.target.value))}
                  className="w-20 px-2 py-2 text-sm font-bold text-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <span className="text-xs text-slate-500">hrs/day</span>
              </div>
            </div>

            {/* Color options */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-500">Color:</span>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-5 h-5 rounded-md transition-transform ${
                      newColor === c ? 'scale-125 ring-2 ring-brand-500' : 'hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>

            {validationError && (
              <p className="text-xs text-rose-500 font-medium">{validationError}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="primary" type="submit">
                Add Subject
              </Button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-slate-300 hover:border-brand-500 text-slate-600 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-400 dark:text-slate-400 dark:hover:text-brand-300 text-xs font-semibold transition-all bg-white/40 dark:bg-slate-900/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Subject</span>
          </button>
        )}
      </div>

      {/* Nav Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200/80 dark:border-slate-800">
        <Button
          variant="ghost"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={onComplete}
          disabled={subjects.length === 0}
          rightIcon={<Sparkles className="w-4 h-4" />}
          className="shadow-md font-semibold px-6 py-2.5"
        >
          Complete Plan & Enter Dashboard
        </Button>
      </div>
    </div>
  );
};
