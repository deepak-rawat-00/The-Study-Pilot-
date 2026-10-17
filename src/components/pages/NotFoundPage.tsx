import React from 'react';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { Compass, Home, LayoutDashboard } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const NotFoundPage: React.FC = () => {
  const { navigate, goToApp } = useRouter();
  const { plan, subjects } = useStudy();

  const hasExistingWorkspace = Boolean(plan && plan.isOnboardingCompleted && subjects.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <LandingHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Page Not Found
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The page you are looking for doesn&apos;t exist or has moved. Let&apos;s navigate you back to your study workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/')}
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return Home
            </Button>
            {hasExistingWorkspace && (
              <Button
                variant="outline"
                size="md"
                onClick={goToApp}
                leftIcon={<LayoutDashboard className="w-4 h-4" />}
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};
