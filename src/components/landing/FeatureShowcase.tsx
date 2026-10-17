import React from 'react';
import {
  Timer,
  Target,
  BookOpen,
  Flame,
  Calendar,
  CalendarClock,
  BarChart3,
  Coffee,
  CheckCircle2,
} from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  const features = [
    {
      id: 'focus-timer',
      icon: Timer,
      color: 'indigo',
      badge: 'Core Engine',
      title: 'Precision Focus Timer',
      description:
        'Start, pause, resume, and log study sessions effortlessly. The timer tracks pure active focus duration, cleanly subtracting paused minutes and break intervals.',
      previewText: 'Continuous stopwatch or 25-minute Pomodoro cycles with sound alerts.',
    },
    {
      id: 'daily-goals',
      icon: Target,
      color: 'emerald',
      badge: 'Goal Tracking',
      title: 'Daily Study Targets',
      description:
        'Set daily target study hours and allocate specific hours to each subject. Monitor your live progress ring as completed sessions accumulate during the day.',
      previewText: 'Live percentage completion with instant visual target feedback.',
    },
    {
      id: 'subject-tracking',
      icon: BookOpen,
      color: 'brand',
      badge: 'Organization',
      title: 'Subject-Wise Allocation',
      description:
        'Organize your academic workload with custom colors, subject codes, and weekly target hours. Prevent study imbalances before they affect your grades.',
      previewText: 'Custom color coding and balanced daily workload distribution.',
    },
    {
      id: 'study-streaks',
      icon: Flame,
      color: 'amber',
      badge: 'Consistency',
      title: 'Authentic Study Streaks',
      description:
        'Earn streaks only through qualified active study time. Customize your daily streak threshold (default 60 minutes) to match your personal study schedule.',
      previewText: 'Strict calendar day boundaries with no fabricated streak inflation.',
    },
    {
      id: 'consistency-heatmap',
      icon: Calendar,
      color: 'emerald',
      badge: '52-Week View',
      title: 'Annual Activity Heatmap',
      description:
        'A full-year contribution calendar inspired by developer workflows. Visualizes your study volume across 5 intensity levels, including days with partial sessions.',
      previewText: 'Hover over any day to see total minutes and subject breakdown.',
    },
    {
      id: 'exam-countdown',
      icon: CalendarClock,
      color: 'rose',
      badge: 'Exam Prep',
      title: 'Examination Countdowns',
      description:
        'Count down the exact days until your upcoming tests, finals, or certification exams. Prioritize your urgent milestones with custom dates and color badges.',
      previewText: 'Global date support without timezone shifts or UTC distortion.',
    },
    {
      id: 'study-analytics',
      icon: BarChart3,
      color: 'blue',
      badge: 'Insights',
      title: 'Meaningful Study Analytics',
      description:
        'Review your 7-day, 30-day, and all-time consistency ratios. Understand your most productive days and track cumulative study hours over months.',
      previewText: 'Bar charts and historical metrics calculated directly from saved sessions.',
    },
    {
      id: 'breaks-and-cycles',
      icon: Coffee,
      color: 'purple',
      badge: 'Mindful Study',
      title: 'Structured Breaks & Rhythms',
      description:
        'Switch between structured 25-minute Pomodoro cycles with short 5-minute recovery intervals, or continuous uninterrupted deep work sessions.',
      previewText: 'Audio notifications and visual cues to keep your mind fresh.',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/80 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold mb-4">
            <span>Built For Consistency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything you need to master your study routine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A focused suite of study productivity tools engineered without ads, clutter, or paywalls.
          </p>
        </div>

        {/* 8 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs hover:border-brand-400 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{feat.previewText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
