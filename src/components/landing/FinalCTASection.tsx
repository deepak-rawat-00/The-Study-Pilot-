import React from 'react';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { useStudy } from '../../context/StudyContext';
import { ArrowRight, LayoutDashboard, Sparkles, Check } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  const { goToApp, goToOnboarding } = useRouter();
  const { plan, subjects } = useStudy();

  const hasExistingWorkspace = Boolean(plan && plan.isOnboardingCompleted && subjects.length > 0);

  const handleStart = () => {
    if (hasExistingWorkspace) {
      goToApp();
    } else {
      goToOnboarding();
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-brand-900 via-brand-800 to-indigo-900 px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-xl overflow-hidden">
          {/* Subtle background circles */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-500/20 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Small sessions. Consistent progress.</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to take flight with your study routine?
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Join students worldwide who track what they actually do. Set up your subjects in seconds and start your first focused session today.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                size="lg"
                variant="primary"
                onClick={handleStart}
                rightIcon={hasExistingWorkspace ? <LayoutDashboard className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto px-9 py-4 text-base font-bold bg-white text-brand-900 hover:bg-slate-100 shadow-lg shadow-black/25"
              >
                {hasExistingWorkspace ? 'Go to Your Dashboard' : 'Start Studying Free'}
              </Button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-brand-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Free core study tools
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> No mandatory account
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> 100% private local storage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
