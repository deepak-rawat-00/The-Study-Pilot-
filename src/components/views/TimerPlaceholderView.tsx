import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { Card, CardHeader, CardTitle, CardDescription } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Play, RotateCcw, Sparkles, BookOpen } from 'lucide-react';

export const TimerPlaceholderView: React.FC = () => {
  const { subjects, openCreateModal } = useStudy();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    subjects[0]?.id || ''
  );
  const [duration, setDuration] = useState<number>(25);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="primary" size="sm">
            Milestone 2 Preview
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Study Timer
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Focus sessions will link directly to your subjects and log real study hours to your weekly targets.
        </p>
      </div>

      {/* Main Timer Display Preview */}
      <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
        {/* Subject selector preview */}
        <div className="mb-8 w-full max-w-xs">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            Target Subject
          </label>
          {subjects.length > 0 ? (
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={openCreateModal}
              leftIcon={<BookOpen className="w-4 h-4" />}
              className="w-full"
            >
              Add subject to link timer
            </Button>
          )}
        </div>

        {/* Circular Clock Mockup */}
        <div className="relative flex h-60 w-60 sm:h-72 sm:w-72 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50 shadow-inner dark:border-slate-800 dark:bg-slate-900/60">
          <div className="text-center">
            <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              {String(duration).padStart(2, '0')}:00
            </span>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {selectedSubject ? selectedSubject.name : 'Focus Mode'}
            </p>
          </div>
        </div>

        {/* Duration Selectors */}
        <div className="mt-8 flex items-center gap-2">
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setDuration(mins)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                duration === mins
                  ? 'bg-brand-600 text-white shadow-sm dark:bg-brand-500'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Action Controls Preview */}
        <div className="mt-8 flex items-center gap-3">
          <Button
            size="lg"
            variant="primary"
            leftIcon={<Play className="w-5 h-5 fill-current" />}
            onClick={() => {
              alert('The interactive timer engine will be introduced in Milestone 2. Current focus: layout foundation and subject architecture.');
            }}
            className="px-8 shadow-md"
          >
            Start Focus Session
          </Button>
          <Button
            size="lg"
            variant="secondary"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={() => setDuration(25)}
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <CardTitle className="text-base">Milestone 1 Scope Note</CardTitle>
          </div>
          <CardDescription>
            The project architecture and navigation foundation are ready. Per Milestone 1 specifications, the complete timer engine (tick loop, sound notifications, pause/resume, and automatic session recording) is reserved for Milestone 2.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
