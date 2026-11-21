import React from 'react';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingFooter } from '../components/landing/LandingFooter';
import { SEOHead } from '../components/seo/SEOHead';
import { useRouter } from '../context/RouterContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Sparkles,
  Calendar,
  Clock,
  Calculator,
  ArrowRight,
  Flame,
  Target,
  Hourglass,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface ToolCardItem {
  slug: string;
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
  badge: string;
  status: 'active' | 'upcoming';
  category: string;
}

const TOOLS_LIST: ToolCardItem[] = [
  {
    slug: 'study-planner-generator',
    name: 'Study Planner Generator',
    description: 'Auto-generate a custom, balanced daily and weekly study timetable based on available hours, subject difficulty, and exam dates.',
    icon: Calendar,
    path: '/tools/study-planner-generator',
    badge: 'Popular Generator',
    status: 'active',
    category: 'Planning',
  },
  {
    slug: 'weekly-study-planner',
    name: 'Weekly Study Planner',
    description: 'Build, edit, track, and print your complete Monday–Sunday study schedule with time blocks, daily goals, and completion checkboxes.',
    icon: Calendar,
    path: '/tools/weekly-study-planner',
    badge: 'Printable & Editable',
    status: 'active',
    category: 'Planning',
  },
  {
    slug: 'study-hours-calculator',
    name: 'Study Hours Calculator',
    description: 'Calculate your actual focused study time, subtract breaks, and project your weekly and monthly study output without deceptive desk time.',
    icon: Calculator,
    path: '/tools/study-hours-calculator',
    badge: 'Accurate Math',
    status: 'active',
    category: 'Analytics',
  },
  {
    slug: 'pomodoro-timer',
    name: 'Pomodoro Study Timer',
    description: 'Customizable 25/5 and 50/10 focus intervals with audio chimes and distraction-free visual timers.',
    icon: Clock,
    path: '/tools/pomodoro-timer',
    badge: 'Focus Timer',
    status: 'active',
    category: 'Focus',
  },
  {
    slug: 'study-habit-tracker',
    name: 'Study Habit Tracker',
    description: 'Track daily study habits, maintain consecutive streaks, and visualize calendar progress without guilt.',
    icon: Flame,
    path: '/tools/study-habit-tracker',
    badge: 'Streaks & Habits',
    status: 'active',
    category: 'Consistency',
  },
  {
    slug: 'study-consistency-calculator',
    name: 'Study Consistency Calculator',
    description: 'Calculate your true study consistency percentage across 7, 30, and 90-day intervals.',
    icon: Target,
    path: '/tools/study-consistency-calculator',
    badge: 'Honest Metric',
    status: 'active',
    category: 'Analytics',
  },
  {
    slug: 'exam-countdown',
    name: 'Exam Countdown Tracker',
    description: 'Visual day, week, and month countdowns for upcoming board, semester, and competitive exams.',
    icon: Hourglass,
    path: '/tools/exam-countdown',
    badge: 'Visual Urgency',
    status: 'active',
    category: 'Exams',
  },
  {
    slug: 'exam-preparation-progress',
    name: 'Exam Prep Progress Calculator',
    description: 'Calculate your syllabus completion, revision rounds, and practice question coverage.',
    icon: Target,
    path: '/tools/exam-preparation-progress',
    badge: 'Multi-Dimensional',
    status: 'active',
    category: 'Exams',
  },
];

export const ToolsIndexPage: React.FC = () => {
  const { navigate, goToApp } = useRouter();

  const toolsCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Student Productivity Tools – The Study Pilot',
    url: 'https://thestudypilot.space/tools',
    description: 'Free, privacy-first interactive study tools: Study Planner Generator, Weekly Study Planner, and Study Hours Calculator. Zero signups, 100% private.',
    image: 'https://thestudypilot.space/og-image.svg',
    publisher: {
      '@type': 'Organization',
      name: 'The Study Pilot',
      url: 'https://thestudypilot.space',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      <SEOHead
        title="Free Student Productivity Tools – The Study Pilot"
        description="Free, privacy-first interactive study tools: Study Planner Generator, Weekly Study Planner, and Study Hours Calculator. Zero signups, 100% private."
        canonicalUrl="https://thestudypilot.space/tools"
        keywords={[
          'free student tools',
          'study tools online',
          'study planner generator',
          'weekly study planner printable',
          'study hours calculator',
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://thestudypilot.space/' },
          { name: 'Free Study Tools', url: 'https://thestudypilot.space/tools' },
        ]}
        jsonLd={toolsCollectionSchema}
      />

      <LandingHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/80 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free Core Student Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Interactive Tools for Focused, Consistent Study
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Generate personalized schedules, track your weekly timetable, and calculate net study hours. Built to run directly in your browser with zero signups and complete data privacy.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Local-first architecture. All your schedules remain on your device.</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOOLS_LIST.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.status === 'active';

            return (
              <div
                key={tool.slug}
                className={cn(
                  'flex flex-col justify-between rounded-3xl border p-6 transition-all shadow-xs',
                  isActive
                    ? 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 hover:border-brand-300 dark:hover:border-brand-700 hover:-translate-y-1'
                    : 'border-dashed border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40 opacity-80'
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={isActive ? 'primary' : 'default'} size="sm">
                      {tool.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {tool.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {isActive ? (
                    <Button
                      size="md"
                      variant="primary"
                      onClick={() => navigate(tool.path)}
                      className="w-full justify-center font-bold"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Launch Tool
                    </Button>
                  ) : (
                    <span className="block text-center text-xs text-slate-400 py-2 font-medium">
                      Available Soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Workspace Callout */}
        <div className="mt-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-700 p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <h3 className="text-2xl font-extrabold">
              Need Continuous Focus &amp; Streak Tracking?
            </h3>
            <p className="text-sm text-brand-100">
              The Study Pilot Workspace features a live Pomodoro study timer, 365-day consistency heatmap, and multi-exam countdowns.
            </p>
          </div>
          <Button
            size="lg"
            variant="primary"
            onClick={goToApp}
            className="bg-white text-brand-900 hover:bg-slate-100 font-bold shrink-0 shadow-lg"
          >
            Launch Free Workspace
          </Button>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};

export default ToolsIndexPage;
