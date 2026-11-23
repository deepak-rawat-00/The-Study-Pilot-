import React from 'react';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider } from './context/RouterContext';
import { StudyProvider } from './context/StudyContext';
import { ExamProvider } from './context/ExamContext';
import { TimerProvider } from './context/TimerContext';

// Pages
import { LandingPage } from './components/pages/LandingPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { BlogIndexPage } from './blog/BlogIndexPage';
import { ResourcesIndexPage } from './resources/ResourcesIndexPage';
import { ToolsIndexPage } from './tools/ToolsIndexPage';

// 8 Interactive Tools
import { StudyPlannerGeneratorTool } from './tools/study-planner-generator/StudyPlannerGeneratorTool';
import { WeeklyStudyPlannerTool } from './tools/weekly-study-planner/WeeklyStudyPlannerTool';
import { StudyHoursCalculatorTool } from './tools/study-hours-calculator/StudyHoursCalculatorTool';
import { PomodoroTimerTool } from './tools/pomodoro-timer/PomodoroTimerTool';
import { StudyHabitTrackerTool } from './tools/study-habit-tracker/StudyHabitTrackerTool';
import { StudyConsistencyCalculatorTool } from './tools/study-consistency-calculator/StudyConsistencyCalculatorTool';
import { ExamCountdownTool } from './tools/exam-countdown/ExamCountdownTool';
import { ExamPrepProgressTool } from './tools/exam-preparation-progress/ExamPrepProgressTool';

// 11 Educational Articles
import { PillarStudyScheduleArticle } from './blog/articles/PillarStudyScheduleArticle';
import { StudyConsistentlyArticle } from './blog/articles/StudyConsistentlyArticle';
import { StopProcrastinatingArticle } from './blog/articles/StopProcrastinatingArticle';
import { PlanMultipleSubjectsArticle } from './blog/articles/PlanMultipleSubjectsArticle';
import { TrackStudyTimeArticle } from './blog/articles/TrackStudyTimeArticle';
import { PomodoroVsDeepWorkArticle } from './blog/articles/PomodoroVsDeepWorkArticle';
import { WeeklyStudyPlanArticle } from './blog/articles/WeeklyStudyPlanArticle';
import { CompetitiveExamPlanArticle } from './blog/articles/CompetitiveExamPlanArticle';
import { LimitedTimeStudyArticle } from './blog/articles/LimitedTimeStudyArticle';
import { RestartStudyingMotivationArticle } from './blog/articles/RestartStudyingMotivationArticle';
import { BuildStudyHabitArticle } from './blog/articles/BuildStudyHabitArticle';

import { getArticleBySlug } from './blog/articlesRegistry';

export interface RouteMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  publishDate?: string;
  modifiedDate?: string;
  noindex?: boolean;
}

const ROUTE_COMPONENTS: Record<string, React.ComponentType> = {
  '/': LandingPage,
  '/about': AboutPage,
  '/contact': ContactPage,
  '/privacy': PrivacyPolicyPage,
  '/terms': TermsPage,
  '/blog': BlogIndexPage,
  '/resources': ResourcesIndexPage,
  '/tools': ToolsIndexPage,
  // 8 Tools
  '/tools/study-planner-generator': StudyPlannerGeneratorTool,
  '/tools/weekly-study-planner': WeeklyStudyPlannerTool,
  '/tools/study-hours-calculator': StudyHoursCalculatorTool,
  '/tools/pomodoro-timer': PomodoroTimerTool,
  '/tools/study-habit-tracker': StudyHabitTrackerTool,
  '/tools/study-consistency-calculator': StudyConsistencyCalculatorTool,
  '/tools/exam-countdown': ExamCountdownTool,
  '/tools/exam-preparation-progress': ExamPrepProgressTool,
  // 11 Articles
  '/blog/how-to-create-a-study-schedule': PillarStudyScheduleArticle,
  '/blog/how-to-study-consistently': StudyConsistentlyArticle,
  '/blog/how-to-stop-procrastinating-while-studying': StopProcrastinatingArticle,
  '/blog/how-to-plan-multiple-subjects': PlanMultipleSubjectsArticle,
  '/blog/how-to-track-study-time': TrackStudyTimeArticle,
  '/blog/pomodoro-technique-vs-deep-work': PomodoroVsDeepWorkArticle,
  '/blog/how-to-create-a-weekly-study-plan': WeeklyStudyPlanArticle,
  '/blog/competitive-exam-study-plan': CompetitiveExamPlanArticle,
  '/blog/how-to-study-with-limited-time': LimitedTimeStudyArticle,
  '/blog/how-to-restart-studying-after-losing-motivation': RestartStudyingMotivationArticle,
  '/blog/how-to-build-a-study-habit': BuildStudyHabitArticle,
  '/404': NotFoundPage,
};

export const ROUTES: string[] = Object.keys(ROUTE_COMPONENTS);

export function getRouteMeta(path: string): RouteMetadata {
  if (path === '/') {
    return {
      title: 'The Study Pilot – Free Study Planner & Study Tracker',
      description:
        "Plan study sessions, track study hours, build consistent study habits, and count down to exams with The Study Pilot's free study planner and progress tracker.",
      canonicalUrl: 'https://thestudypilot.space/',
      keywords: [
        'free study planner',
        'study tracker',
        'study time tracker',
        'study streak tracker',
        'study consistency tracker',
        'exam countdown timer',
        'student productivity tools',
        'daily study planner',
      ],
      ogType: 'website',
    };
  }

  if (path === '/about') {
    return {
      title: 'About Us – The Study Pilot: Mission, Principles & Student Privacy',
      description:
        "Learn about The Study Pilot's mission: authentic study tracking, local-first privacy, and free, distraction-free productivity tools for students worldwide.",
      canonicalUrl: 'https://thestudypilot.space/about',
      ogType: 'website',
    };
  }

  if (path === '/contact') {
    return {
      title: 'Contact Us & Student Feedback – The Study Pilot',
      description:
        'Get in touch with The Study Pilot team. Send feedback, report issues, or request study features. We are here to help students succeed.',
      canonicalUrl: 'https://thestudypilot.space/contact',
      ogType: 'website',
    };
  }

  if (path === '/privacy') {
    return {
      title: 'Privacy Policy – The Study Pilot: Local-First Student Data Protection',
      description:
        "Read The Study Pilot's privacy policy. Learn how our local-first browser storage keeps your study hours, session notes, and targets 100% private.",
      canonicalUrl: 'https://thestudypilot.space/privacy',
      ogType: 'website',
    };
  }

  if (path === '/terms') {
    return {
      title: 'Terms of Service – The Study Pilot',
      description:
        "Read the terms of use and service agreement for The Study Pilot's free study tools, calculators, printables, and study planning guides.",
      canonicalUrl: 'https://thestudypilot.space/terms',
      ogType: 'website',
    };
  }

  if (path === '/blog') {
    return {
      title: 'Study Guides, Productivity Systems & Exam Preparation Strategies – The Study Pilot',
      description:
        'Practical, evidence-based study schedules, consistency frameworks, exam countdown strategies, and productivity techniques to help students reach their goals.',
      canonicalUrl: 'https://thestudypilot.space/blog',
      ogType: 'website',
    };
  }

  if (path === '/resources') {
    return {
      title:
        'Free Student Resource Library: Downloadable & Printable Study Planners & Trackers – The Study Pilot',
      description:
        'Download and print free high-contrast study templates: daily study planners, weekly timetables, 30-day habit trackers, exam countdown roadmaps, and mock test error logs.',
      canonicalUrl: 'https://thestudypilot.space/resources',
      ogType: 'website',
    };
  }

  if (path === '/tools') {
    return {
      title: 'Free Student Productivity Tools, Calculators & Planners – The Study Pilot',
      description:
        'Free, interactive study productivity tools: timetable generators, Pomodoro focus timers, study hours calculators, streak trackers, and exam countdowns.',
      canonicalUrl: 'https://thestudypilot.space/tools',
      ogType: 'website',
    };
  }

  if (path.startsWith('/blog/')) {
    const slug = path.replace(/^\/blog\//, '').replace(/\/$/, '');
    const article = getArticleBySlug(slug);
    if (article) {
      return {
        title: `${article.metaTitle || article.title} – The Study Pilot`,
        description: article.description,
        canonicalUrl: `https://thestudypilot.space/blog/${article.slug}`,
        keywords: article.secondaryKeywords
          ? [article.primaryKeyword, ...article.secondaryKeywords]
          : [article.primaryKeyword],
        ogType: 'article',
        publishDate: article.publishDate,
        modifiedDate: article.modifiedDate,
      };
    }
  }

  const toolMeta: Record<string, { title: string; description: string }> = {
    '/tools/study-planner-generator': {
      title: 'Free Study Planner Generator: Create a Balanced Daily & Weekly Timetable – The Study Pilot',
      description:
        'Auto-generate a custom, balanced daily and weekly study timetable based on available hours, subject difficulty, and exam dates.',
    },
    '/tools/weekly-study-planner': {
      title: 'Weekly Study Planner: Customizable 7-Day Timetable & Goal Tracker – The Study Pilot',
      description:
        'Build, edit, track, and print your complete Monday–Sunday study schedule with time blocks, daily goals, and completion checkboxes.',
    },
    '/tools/study-hours-calculator': {
      title: 'Study Hours Calculator: Calculate Net Focus Time & Projections – The Study Pilot',
      description:
        'Calculate your actual focused study time, subtract breaks, and project your weekly and monthly study output without deceptive desk time.',
    },
    '/tools/pomodoro-timer': {
      title: 'Pomodoro Study Timer: 25/5 & 50/10 Focus Intervals – The Study Pilot',
      description:
        'Customizable 25/5 and 50/10 focus intervals with audio chimes and distraction-free visual timers.',
    },
    '/tools/study-habit-tracker': {
      title: 'Study Habit Tracker: Build Daily Streaks & Consistency – The Study Pilot',
      description:
        'Track daily study habits, maintain consecutive streaks, and visualize calendar progress without guilt.',
    },
    '/tools/study-consistency-calculator': {
      title: 'Study Consistency Calculator: Measure Your 7, 30 & 90-Day Focus – The Study Pilot',
      description:
        'Calculate your true study consistency percentage across 7, 30, and 90-day intervals.',
    },
    '/tools/exam-countdown': {
      title: 'Exam Countdown Tracker: Visual Days, Weeks & Progress Until Exams – The Study Pilot',
      description:
        'Visual day, week, and month countdowns for upcoming board, semester, and competitive exams.',
    },
    '/tools/exam-preparation-progress': {
      title: 'Exam Preparation Progress Calculator: Syllabus Coverage & Readiness – The Study Pilot',
      description:
        'Track syllabus completion across subjects, calculate readiness score, and identify high-priority revision areas before exams.',
    },
  };

  if (toolMeta[path]) {
    return {
      title: toolMeta[path].title,
      description: toolMeta[path].description,
      canonicalUrl: `https://thestudypilot.space${path}`,
      ogType: 'website',
    };
  }

  return {
    title: 'Page Not Found – The Study Pilot',
    description:
      'The requested page could not be found. Return to The Study Pilot to plan your studies, track focus hours, and build lasting consistency.',
    canonicalUrl: 'https://thestudypilot.space/404',
    noindex: true,
  };
}

export function renderRoute(path: string): { html: string; meta: RouteMetadata } {
  const Component = ROUTE_COMPONENTS[path] || NotFoundPage;
  const meta = getRouteMeta(path);

  const html = renderToString(
    <ThemeProvider>
      <RouterProvider initialPath={path}>
        <StudyProvider>
          <ExamProvider>
            <TimerProvider>
              <Component />
            </TimerProvider>
          </ExamProvider>
        </StudyProvider>
      </RouterProvider>
    </ThemeProvider>
  );

  return { html, meta };
}
