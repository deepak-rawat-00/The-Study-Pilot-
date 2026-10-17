import React from 'react';
import { useExams } from '../../context/ExamContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  CalendarClock,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Tag,
} from 'lucide-react';

export const CountdownView: React.FC = () => {
  const { countdowns, openCreateModal, openEditModal, deleteExam } = useExams();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Examination Countdowns
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track days remaining until key test dates, prioritize revision, and stay exam-ready.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={openCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Examination
        </Button>
      </div>

      {countdowns.length === 0 ? (
        <Card className="text-center py-14 px-6">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 dark:bg-amber-950 dark:text-amber-400 mb-4">
              <CalendarClock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No examination countdowns configured
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Add your target examinations to calculate real-time days remaining and stay on top of critical test dates.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="primary"
                onClick={openCreateModal}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Exam Countdown
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {countdowns.map((item) => {
            const { exam, daysRemaining, status, formattedDate, isNextUpcoming } = item;
            const isToday = status === 'today';
            const isPassed = status === 'passed';
            const isUrgent = status === 'upcoming' && daysRemaining <= 7;

            return (
              <Card
                key={exam.id}
                hoverEffect
                className={`flex flex-col justify-between transition-all ${
                  isNextUpcoming
                    ? 'ring-2 ring-brand-500/50 bg-gradient-to-br from-white to-brand-50/20 dark:from-slate-900 dark:to-brand-950/20 shadow-md'
                    : ''
                }`}
              >
                <div>
                  {/* Top Badges & Actions */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {isNextUpcoming && (
                        <Badge variant="primary" size="sm" className="font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>Next Target</span>
                        </Badge>
                      )}
                      <Badge
                        variant={
                          isToday
                            ? 'danger'
                            : isUrgent
                            ? 'danger'
                            : isPassed
                            ? 'default'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {isToday
                          ? 'D-Day / Today'
                          : isUrgent
                          ? 'Urgent Priority'
                          : isPassed
                          ? 'Completed'
                          : `${daysRemaining} days left`}
                      </Badge>

                      {exam.priority && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          {exam.priority}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(exam)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        title="Edit exam"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete countdown for "${exam.title}"?`)) {
                            deleteExam(exam.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete exam"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-lg leading-snug">
                    {exam.title}
                  </h3>

                  {exam.subjectName && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold">
                      <Tag className="w-3 h-3" />
                      <span>{exam.subjectName}</span>
                    </div>
                  )}

                  {exam.notes && (
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {exam.notes}
                    </p>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Days remaining highlight box */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {isPassed ? 'Status' : 'Countdown'}
                    </span>
                    <span
                      className={`text-2xl font-black ${
                        isToday
                          ? 'text-rose-600 dark:text-rose-400 animate-pulse'
                          : isUrgent
                          ? 'text-rose-600 dark:text-rose-400'
                          : isPassed
                          ? 'text-slate-400'
                          : 'text-brand-600 dark:text-brand-400'
                      }`}
                    >
                      {isToday
                        ? 'Exam Today!'
                        : isPassed
                        ? `Passed (${Math.abs(daysRemaining)}d ago)`
                        : `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}`}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
