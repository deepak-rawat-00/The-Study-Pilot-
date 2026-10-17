import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { Button } from '../common/Button';
import { PlusCircle, Target, Sparkles, Clock, CalendarDays } from 'lucide-react';

export const EmptyState: React.FC = () => {
  const { openCreateModal } = useStudy();

  const features = [
    {
      icon: Target,
      title: 'Targeted Weekly Goals',
      description: 'Set realistic study hour goals for each subject and monitor your authentic weekly progress.',
    },
    {
      icon: Clock,
      title: 'Focus Tracking',
      description: 'Zero fabricated numbers—every minute logged will be backed by your real study sessions.',
    },
    {
      icon: CalendarDays,
      title: 'Exam Countdown',
      description: 'Never miss an exam date. Stay ahead of revisions with clear, real-time countdowns.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/60 dark:border-brand-800/80 dark:text-brand-300 text-xs font-semibold mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Welcome to StudyPilot</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-2xl leading-tight">
        Build your personalized, distraction-free study plan
      </h2>

      <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        You don't have any subjects yet. Add your courses or subjects to organize study sessions, set weekly target hours, and prepare for upcoming exams.
      </p>

      {/* Clear CTA Action Button */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Button
          size="lg"
          variant="primary"
          onClick={openCreateModal}
          leftIcon={<PlusCircle className="w-5 h-5" />}
          className="shadow-lg shadow-brand-500/25 text-base px-6 py-3 font-semibold"
        >
          Create your study plan
        </Button>
      </div>

      {/* Feature Value Highlights */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300 mb-3.5">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
