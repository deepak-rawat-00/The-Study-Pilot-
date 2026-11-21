import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { FileText, Printer, ArrowRight } from 'lucide-react';

interface ResourcePreview {
  slug: string;
  title: string;
  format: string;
  tagline: string;
}

const RESOURCES_MAP: Record<string, ResourcePreview> = {
  'daily-study-planner': {
    slug: 'daily-study-planner',
    title: 'Daily Study Focus Planner',
    format: 'Printable Sheet',
    tagline: 'Top 3 priorities, energy-matched blocks & 25-min study floor.',
  },
  'weekly-study-timetable': {
    slug: 'weekly-study-timetable',
    title: 'Weekly Study Blueprint',
    format: '7-Day Printable',
    tagline: 'Time-blocked grid with 20% flex catch-up buffers.',
  },
  'monthly-exam-planner': {
    slug: 'monthly-exam-planner',
    title: '30-Day Exam Countdown',
    format: 'Monthly Roadmap',
    tagline: '4-week milestone matrix with mock test scheduling.',
  },
  'subject-revision-tracker': {
    slug: 'subject-revision-tracker',
    title: 'Subject Revision Tracker',
    format: 'Tracking Sheet',
    tagline: '3-pass active recall matrix (+3, +14, +30 days).',
  },
  'pomodoro-session-tracker': {
    slug: 'pomodoro-session-tracker',
    title: 'Pomodoro Focus Log',
    format: 'Tracking Sheet',
    tagline: '25-minute sprint checklist with distraction tallies.',
  },
  'study-habit-tracker': {
    slug: 'study-habit-tracker',
    title: '30-Day Study Habit Tracker',
    format: 'Printable Calendar',
    tagline: 'Visual streak tracker based on the Never-Twice rule.',
  },
  'exam-countdown-planner': {
    slug: 'exam-countdown-planner',
    title: 'Exam Target Scoreboard',
    format: 'Printable Template',
    tagline: 'Countdown command sheet with top 5 weak topic hit list.',
  },
  'formula-sheet-template': {
    slug: 'formula-sheet-template',
    title: 'Core Concept Crib Sheet',
    format: '1-Page Summary',
    tagline: '4-quadrant formula, boundary conditions & traps summary.',
  },
  'mock-test-analysis-sheet': {
    slug: 'mock-test-analysis-sheet',
    title: 'Mock Test Error Journal',
    format: 'Audit Worksheet',
    tagline: 'Diagnose missteps into conceptual, calculation & time guesses.',
  },
  'goal-setting-worksheet': {
    slug: 'goal-setting-worksheet',
    title: 'SMART Goal & Pre-Mortem Sheet',
    format: 'Worksheet',
    tagline: 'Semester goal breakdown with pre-mortem obstacle defenses.',
  },
};

export interface RelatedResourcesCardProps {
  categorySlug?: string;
  customSlugs?: string[];
  className?: string;
}

export const RelatedResourcesCard: React.FC<RelatedResourcesCardProps> = ({
  categorySlug,
  customSlugs,
  className,
}) => {
  const { navigate } = useRouter();

  // Determine which resources to display
  let selectedSlugs: string[] = customSlugs || [];
  if (selectedSlugs.length === 0) {
    if (categorySlug === 'study-planning') {
      selectedSlugs = ['daily-study-planner', 'weekly-study-timetable'];
    } else if (categorySlug === 'study-consistency') {
      selectedSlugs = ['study-habit-tracker', 'goal-setting-worksheet'];
    } else if (categorySlug === 'exam-prep') {
      selectedSlugs = ['monthly-exam-planner', 'mock-test-analysis-sheet'];
    } else if (categorySlug === 'focus-procrastination') {
      selectedSlugs = ['daily-study-planner', 'pomodoro-session-tracker'];
    } else if (categorySlug === 'study-methods') {
      selectedSlugs = ['pomodoro-session-tracker', 'formula-sheet-template'];
    } else if (categorySlug === 'time-tracking') {
      selectedSlugs = ['pomodoro-session-tracker', 'weekly-study-timetable'];
    } else {
      selectedSlugs = ['daily-study-planner', 'weekly-study-timetable'];
    }
  }

  const items = selectedSlugs.map((s) => RESOURCES_MAP[s]).filter(Boolean).slice(0, 2);

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs ${className || ''}`}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        <Printer className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <span>Free Printable Sheets</span>
      </div>

      <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
        Download Physical Worksheets
      </h4>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        Print these high-contrast templates to execute this method with zero digital distractions:
      </p>

      <div className="mt-3.5 space-y-2.5">
        {items.map((item) => (
          <div
            key={item.slug}
            className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                <h5 className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                  {item.title}
                </h5>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                {item.format}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {item.tagline}
            </p>
            <button
              type="button"
              onClick={() => navigate('/resources')}
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View &amp; Print Free</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedResourcesCard;
