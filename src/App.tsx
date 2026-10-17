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
