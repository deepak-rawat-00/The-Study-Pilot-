import React from 'react';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { useStudy } from '../../context/StudyContext';
import { InteractiveProductPreview } from './InteractiveProductPreview';
import { ArrowRight, Compass, Check } from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { navigate, goToApp, goToOnboarding } = useRouter();
  const { plan, subjects } = useStudy();

  const hasExistingWorkspace = Boolean(plan && plan.isOnboardingCompleted && subjects.length > 0);

  const handleStart = () => {
    if (hasExistingWorkspace) {
      goToApp();
    } else {
      goToOnboarding();
    }
  };

  const handleExplore = () => {
    navigate('/#features');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Subtle atmospheric background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="aspect-1155/678 w-[68rem] bg-gradient-to-tr from-brand-500/20 via-indigo-400/15 to-emerald-400/20 opacity-70 dark:opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Brand Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/70 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold mb-6 shadow-xs animate-in fade-in duration-300">
            <Compass className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Plan Your Study. Build Your Streak. Reach Your Goals.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Build Better Study Habits.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-600 dark:from-brand-400 dark:via-indigo-300 dark:to-emerald-400">
              Reach Your Goals.
            </span>
          </h1>

          {/* Supporting Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Plan your study sessions, track daily progress, count down to exams, and build lasting consistency with your free personal study workspace.
          </p>

          {/* Primary & Secondary Call To Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-lg shadow-brand-500/25"
            >
              {hasExistingWorkspace ? 'Continue to Dashboard' : 'Start Studying Free'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleExplore}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-medium"
            >
              Explore Features
            </Button>
          </div>

          {/* Supporting Microcopy & Trust Anchors */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Free study tools
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> No subscription required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Browser-local privacy
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Ready in seconds
            </span>
          </div>
        </div>

        {/* Hero Visual Mockup Preview */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/60 via-slate-100/40 to-transparent dark:from-slate-800/60 dark:via-slate-900/40">
            <InteractiveProductPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
