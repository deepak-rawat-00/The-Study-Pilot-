import React from 'react';
import { useStudy } from './context/StudyContext';
import { useRouter } from './context/RouterContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { CreateSubjectModal } from './components/subjects/CreateSubjectModal';
import { ExamModal } from './components/countdown/ExamModal';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { StudyTimerView } from './components/timer/StudyTimerView';
import { SubjectsView } from './components/views/SubjectsView';
import { CountdownView } from './components/views/CountdownView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';
import { LandingPage } from './components/pages/LandingPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { BlogIndexPage } from './blog/BlogIndexPage';
import { ArticlePage } from './blog/ArticlePage';

const ToolsIndexPage = React.lazy(() => import('./tools/ToolsIndexPage'));
const StudyPlannerGeneratorTool = React.lazy(() => import('./tools/study-planner-generator/StudyPlannerGeneratorTool'));
const WeeklyStudyPlannerTool = React.lazy(() => import('./tools/weekly-study-planner/WeeklyStudyPlannerTool'));
const StudyHoursCalculatorTool = React.lazy(() => import('./tools/study-hours-calculator/StudyHoursCalculatorTool'));
const PomodoroTimerTool = React.lazy(() => import('./tools/pomodoro-timer/PomodoroTimerTool'));
const StudyHabitTrackerTool = React.lazy(() => import('./tools/study-habit-tracker/StudyHabitTrackerTool'));
const StudyConsistencyCalculatorTool = React.lazy(() => import('./tools/study-consistency-calculator/StudyConsistencyCalculatorTool'));
const ExamCountdownTool = React.lazy(() => import('./tools/exam-countdown/ExamCountdownTool'));
const ExamPrepProgressTool = React.lazy(() => import('./tools/exam-preparation-progress/ExamPrepProgressTool'));
const ResourcesIndexPage = React.lazy(() => import('./resources/ResourcesIndexPage'));

export const App: React.FC = () => {
  const { currentTab, isOnboarding } = useStudy();
  const { currentPath } = useRouter();

  // Root Public Landing Page
  if (currentPath === '/') {
    return <LandingPage />;
  }

  // Trust, Legal & Info Public Pages
  if (currentPath === '/privacy') {
    return <PrivacyPolicyPage />;
  }
  if (currentPath === '/terms') {
    return <TermsPage />;
  }
  if (currentPath === '/about') {
    return <AboutPage />;
  }
  if (currentPath === '/contact') {
    return <ContactPage />;
  }

  // Blog & Educational Guides Public Routes
  if (currentPath === '/blog') {
    return <BlogIndexPage />;
  }
  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace(/^\/blog\//, '').replace(/\/$/, '');
    return <ArticlePage slug={slug} />;
  }

  // Free Student Resource Library Public Routes
  if (currentPath === '/resources' || currentPath === '/resources/') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <ResourcesIndexPage />
      </React.Suspense>
    );
  }

  // Interactive Student Tools Public Routes
  if (currentPath === '/tools' || currentPath === '/tools/') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <ToolsIndexPage />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/study-planner-generator') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <StudyPlannerGeneratorTool />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/weekly-study-planner') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <WeeklyStudyPlannerTool />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/study-hours-calculator') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <StudyHoursCalculatorTool />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/pomodoro-timer') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <PomodoroTimerTool />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/study-habit-tracker') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <StudyHabitTrackerTool />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/study-consistency-calculator') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <StudyConsistencyCalculatorTool />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/exam-countdown') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <ExamCountdownTool />
      </React.Suspense>
    );
  }
  if (currentPath === '/tools/exam-preparation-progress') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
        <ExamPrepProgressTool />
      </React.Suspense>
    );
  }

  // Explicit Onboarding Route
  if (currentPath === '/onboarding') {
    return <OnboardingWizard />;
  }

  // Study Workspace Application Route: /app or child paths (including redirects from legacy /login or /signup)
  const isAppRoute =
    currentPath === '/app' ||
    currentPath.startsWith('/app/') ||
    currentPath === '/login' ||
    currentPath === '/signup';

  if (isAppRoute) {
    // If the student has not yet completed setup, show the wizard
    if (isOnboarding) {
      return <OnboardingWizard />;
    }

    const renderActiveView = () => {
      switch (currentTab) {
        case 'dashboard':
          return <DashboardOverview />;
        case 'timer':
          return <StudyTimerView />;
        case 'subjects':
          return <SubjectsView />;
        case 'countdown':
          return <CountdownView />;
        case 'analytics':
          return <AnalyticsView />;
        case 'settings':
          return <SettingsView />;
        default:
          return <DashboardOverview />;
      }
    };

    return (
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {/* Sidebar (Desktop sticky & Mobile drawer) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
          <Navbar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {renderActiveView()}
          </main>
        </div>

        {/* Global Modals */}
        <CreateSubjectModal />
        <ExamModal />
      </div>
    );
  }

  // Unknown route -> 404 Page
  return <NotFoundPage />;
};

export default App;
