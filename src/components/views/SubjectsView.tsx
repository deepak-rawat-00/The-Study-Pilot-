import React, { useMemo } from 'react';
import { useStudy } from '../../context/StudyContext';
import { useTimer } from '../../context/TimerContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import {
  calculateDailyProgress,
  formatDurationHoursMinutes,
} from '../../domain/dashboardEngine';
import {
  Plus,
  Trash2,
  Calendar,
  Clock,
  BookOpen,
  ArrowUp,
  ArrowDown,
  Play,
  CheckCircle2,
} from 'lucide-react';

export const SubjectsView: React.FC = () => {
  const { subjects, deleteSubject, moveSubjectUp, moveSubjectDown, openCreateModal, setCurrentTab } =
    useStudy();
  const { sessions, timerState, activeSeconds, setSelectedSubjectId } = useTimer();

  const metrics = useMemo(() => {
    return calculateDailyProgress({
      subjects,
      completedSessions: sessions,
      activeTimerState: timerState,
      targetDate: new Date(),
      currentTimestamp: Date.now(),
    });
  }, [subjects, sessions, timerState, activeSeconds]);

  const handleStudy = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentTab('timer');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Subjects
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Organize your courses, set daily study allocations, and track target hours.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={openCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Subject
        </Button>
      </div>

      {subjects.length === 0 ? (
        <Card className="text-center py-12 px-6">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 dark:bg-brand-950 dark:text-brand-400 mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No subjects added yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Add your first course or subject to set target study hours and keep track of your daily and weekly progress.
            </p>
            <Button
              className="mt-6"
              variant="primary"
              onClick={openCreateModal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Your First Subject
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject, index) => {
            const subMetric =
              metrics.subjectMetrics.find((m) => m.subjectId === subject.id) || {
                studiedSecondsToday: 0,
                studiedHoursToday: 0,
                remainingHours: subject.dailyTargetHours,
                dailyTargetSeconds: Math.round(subject.dailyTargetHours * 3600),
                isTargetMet: false,
              };

            const isCurrentlyStudying =
              metrics.hasActiveSession && metrics.activeSubjectId === subject.id;

            return (
              <Card key={subject.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: subject.color }}
                      >
                        {subject.code}
                      </span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => moveSubjectUp(index)}
                          disabled={index === 0}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20"
                          title="Move subject up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSubjectDown(index)}
                          disabled={index === subjects.length - 1}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20"
                          title="Move subject down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isCurrentlyStudying && (
                        <Badge variant="primary" size="sm" className="animate-pulse">
                          Active
                        </Badge>
                      )}
                      {subMetric.isTargetMet && (
                        <Badge variant="success" size="sm">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Goal Met</span>
                        </Badge>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete "${subject.name}"?`)) {
                            deleteSubject(subject.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete subject"
                        aria-label={`Delete ${subject.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                    {subject.name}
                  </h3>

                  {subject.description ? (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {subject.description}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 italic">
                      No additional notes provided.
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" size="sm">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Daily Goal: {subject.dailyTargetHours}h</span>
                    </Badge>
                    <Badge variant="outline" size="sm">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Weekly: {subject.weeklyTargetHours}h</span>
                    </Badge>
                    {subject.examDate && (
                      <Badge variant="warning" size="sm">
                        <Calendar className="w-3 h-3" />
                        <span>Exam: {subject.examDate}</span>
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>Today's Progress</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {formatDurationHoursMinutes(subMetric.studiedSecondsToday)} / {subject.dailyTargetHours}h
                    </span>
                  </div>
                  <ProgressBar
                    value={subMetric.studiedSecondsToday}
                    max={subMetric.dailyTargetSeconds}
                    color={subject.color}
                    size="sm"
                    showPercentage={false}
                  />

                  <Button
                    size="sm"
                    variant={isCurrentlyStudying ? 'secondary' : 'primary'}
                    onClick={() => handleStudy(subject.id)}
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                    className="w-full text-xs font-semibold"
                  >
                    <span>{isCurrentlyStudying ? 'View Active Session' : `Study ${subject.code}`}</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
