import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Button } from '../../components/common/Button';
import { Sparkles, ArrowRight, Calendar, Clock, Calculator, Flame, Hourglass, Target } from 'lucide-react';

interface ToolInfo {
  slug: string;
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
  badge: string;
}

const TOOL_REGISTRY: Record<string, ToolInfo> = {
  'study-planner-generator': {
    slug: 'study-planner-generator',
    name: 'Study Planner Generator',
    description: 'Auto-generate a personalized daily and weekly study timetable based on available hours and subjects.',
    icon: Calendar,
    path: '/tools/study-planner-generator',
    badge: 'Interactive Tool',
  },
  'weekly-study-planner': {
    slug: 'weekly-study-planner',
    name: 'Weekly Study Planner',
    description: 'Build, customize, and print your Monday–Sunday study schedule with time blocks and rest intervals.',
    icon: Calendar,
    path: '/tools/weekly-study-planner',
    badge: 'Printable & Editable',
  },
  'study-hours-calculator': {
    slug: 'study-hours-calculator',
    name: 'Study Hours Calculator',
    description: 'Calculate net active focus time, subtract breaks, and compute daily, weekly, and monthly totals.',
    icon: Calculator,
    path: '/tools/study-hours-calculator',
    badge: 'Accurate Math',
  },
  'pomodoro-timer': {
    slug: 'pomodoro-timer',
    name: 'Pomodoro Study Timer',
    description: 'Customizable 25/5 focus intervals with audio chimes and distraction-free visual timers.',
    icon: Clock,
    path: '/tools/pomodoro-timer',
    badge: 'Focus Utility',
  },
  'study-habit-tracker': {
    slug: 'study-habit-tracker',
    name: 'Study Habit Tracker',
    description: 'Track daily study habits, maintain consecutive streaks, and visualize calendar progress.',
    icon: Flame,
    path: '/tools/study-habit-tracker',
    badge: 'Consistency Tool',
  },
  'study-consistency-calculator': {
    slug: 'study-consistency-calculator',
    name: 'Study Consistency Calculator',
    description: 'Calculate your true study consistency percentage across 7, 30, and 90-day intervals without guilt.',
    icon: Target,
    path: '/tools/study-consistency-calculator',
    badge: 'Performance Analytics',
  },
  'exam-countdown': {
    slug: 'exam-countdown',
    name: 'Exam Countdown Tracker',
    description: 'Visual day, week, and month countdowns for upcoming board, semester, and competitive exams.',
    icon: Hourglass,
    path: '/tools/exam-countdown',
    badge: 'Deadline Tracker',
  },
  'exam-preparation-progress': {
    slug: 'exam-preparation-progress',
    name: 'Exam Prep Progress Calculator',
    description: 'Calculate your syllabus completion, revision rounds, and practice question coverage.',
    icon: Target,
    path: '/tools/exam-preparation-progress',
    badge: 'Syllabus Tracker',
  },
};

export interface RelatedToolsCardProps {
  toolSlugs: string[];
  className?: string;
}

export const RelatedToolsCard: React.FC<RelatedToolsCardProps> = ({ toolSlugs, className }) => {
  const { navigate, goToApp } = useRouter();

  const selectedTools = toolSlugs
    .map((slug) => TOOL_REGISTRY[slug])
    .filter(Boolean);

  if (selectedTools.length === 0) {
    // Default fallback to workspace
    return (
      <div className={`rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50/50 via-white to-indigo-50/30 p-5 dark:border-brand-900/60 dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 shadow-xs ${className || ''}`}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
          <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>Free Student Companion</span>
        </div>
        <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
          Put this method into practice
        </h4>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The Study Pilot offers a free, private study timer, streak tracking heatmap, and exam countdowns.
        </p>
        <Button
          size="sm"
          variant="primary"
          onClick={goToApp}
          className="mt-3 w-full justify-center"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Open Free Study Workspace
        </Button>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50/60 via-white to-indigo-50/40 p-5 dark:border-brand-900/60 dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 shadow-xs ${className || ''}`}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
        <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <span>Companion Free Tools</span>
      </div>

      <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
        Execute this guide with free tools
      </h4>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        Don&apos;t just read about it. Use these free, browser-based utilities to organize your schedule instantly:
      </p>

      <div className="mt-4 space-y-3">
        {selectedTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.slug}
              className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900/90 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {tool.name}
                    </h5>
                    <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 shrink-0">
                      {tool.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(tool.path)}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                  >
                    <span>Launch Free Tool</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
