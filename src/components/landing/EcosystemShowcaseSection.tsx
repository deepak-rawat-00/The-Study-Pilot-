import React from 'react';
import { Link } from '../common/Link';
import {
  Calendar,
  Clock,
  Printer,
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  Compass,
} from 'lucide-react';

export const EcosystemShowcaseSection: React.FC = () => {
  const featuredTools = [
    {
      title: 'Study Planner Generator',
      desc: 'Auto-generate a custom daily and weekly study timetable based on available hours and subjects.',
      icon: Calendar,
      path: '/tools/study-planner-generator',
      badge: 'Interactive',
    },
    {
      title: 'Weekly Study Planner',
      desc: '7-day Monday to Sunday study blueprint with 20% flex buffers to absorb real-life delays.',
      icon: Compass,
      path: '/tools/weekly-study-planner',
      badge: 'Printable',
    },
    {
      title: 'Pomodoro Study Timer',
      desc: 'Clean 25/5 focus intervals with audio chimes, cycle counters, and complete local privacy.',
      icon: Clock,
      path: '/tools/pomodoro-timer',
      badge: 'Focus Engine',
    },
    {
      title: 'Study Habit Tracker',
      desc: 'Track daily study routines, visualize streak heatmaps, and enforce the Never-Twice recovery rule.',
      icon: Target,
      path: '/tools/study-habit-tracker',
      badge: 'Consistency',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/80 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Complete Study Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Free Tools, Strategy Guides &amp; Printables
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything you need to plan your study, build unbroken streaks, and prepare for high-stakes exams.
          </p>
        </div>

        {/* 3 Pillar Cards: Pillar Guide + Interactive Tools + Printable Worksheets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: Featured Pillar Guide */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-6 sm:p-8 hover:border-brand-400 hover:shadow-lg transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-2.5 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                  Featured Pillar Guide
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                How to Create a Study Schedule You Can Actually Follow
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Most study schedules fail within a week because they plan every minute like a rigid factory. Learn the modular block system, 3-hour vs 6-hour timetable blueprints, and Sunday reviews.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/80 mt-6 flex items-center justify-between">
              <Link
                to="/blog/how-to-create-a-study-schedule"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Read Full 20-Point Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blog"
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                All 11 Guides &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: Interactive Student Tools */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-6 sm:p-8 hover:border-brand-400 hover:shadow-lg transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  8 Free Utilities
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Interactive Study Calculators &amp; Generators
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Browser-based tools including the Study Hours Calculator, Pomodoro Timer, Habit Tracker, Exam Countdown, and Exam Prep Progress Calculator.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/80 mt-6 flex items-center justify-between">
              <Link
                to="/tools"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Launch Interactive Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tools/study-planner-generator"
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                Planner Generator &rarr;
              </Link>
            </div>
          </div>

          {/* Card 3: Free Student Resource Library (Printables) */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-6 sm:p-8 hover:border-brand-400 hover:shadow-lg transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  10 Free Printables
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Free Student Printable Resource Library
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ink-friendly, high-contrast study templates: Daily Study Planners, 30-Day Habit Calendars, Revision Matrices, and Mock Test Error Journals for zero-distraction desk study.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/80 mt-6 flex items-center justify-between">
              <Link
                to="/resources"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Browse &amp; Print Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/resources"
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                10 Worksheets &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Quick Launch Tool Mini-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                to={tool.path}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-brand-400 hover:shadow-xs transition-all group flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
                      {tool.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{tool.badge}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EcosystemShowcaseSection;
