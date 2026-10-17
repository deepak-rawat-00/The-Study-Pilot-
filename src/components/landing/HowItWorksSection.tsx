import React from 'react';
import { Target, Timer, Flame, ArrowRight, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { useStudy } from '../../context/StudyContext';

export const HowItWorksSection: React.FC = () => {
  const { goToOnboarding, goToApp } = useRouter();
  const { plan, subjects } = useStudy();

  const hasExistingWorkspace = Boolean(plan && plan.isOnboardingCompleted && subjects.length > 0);

  const steps = [
    {
      number: '01',
      icon: Target,
      title: 'Set your study goals',
      description:
        'Choose your subjects, configure your target examination dates, and select a balanced daily study target that fits your lifestyle.',
      highlights: ['Custom subjects & codes', 'Custom daily study hours', 'Custom exam deadlines'],
    },
    {
      number: '02',
      icon: Timer,
      title: 'Focus and study',
      description:
        'Launch the study timer for any subject. Work in 25-minute Pomodoro cycles or continuous focus mode. Pauses and breaks are automatically separated.',
      highlights: ['Active focus stopwatch', 'Pomodoro 25/5 rhythm', 'Audio completion cues'],
    },
    {
      number: '03',
      icon: Flame,
      title: 'Track your consistency',
      description:
        'Watch your daily streak grow and review your 52-week activity heatmap. See exactly which subjects received your effort and adjust your routine.',
      highlights: ['Streak threshold tracking', '52-week heatmap grid', 'Weekly subject ratios'],
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Simple 3-Step Routine
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How The Study Pilot works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            From your very first session, turning daily plans into consistent habits is frictionless.
          </p>
        </div>

        {/* 3 Step Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-950/40 shadow-xs hover:border-brand-500/50 transition-all"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-slate-300 dark:text-slate-700">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                  {step.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
                  {step.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below section */}
        <div className="mt-14 text-center">
          <Button
            size="lg"
            variant="primary"
            onClick={hasExistingWorkspace ? goToApp : goToOnboarding}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="px-8 py-3.5 text-base font-semibold shadow-lg shadow-brand-500/25"
          >
            Build Your Study Routine
          </Button>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Takes under 2 minutes • No sign-up or credit card required
          </p>
        </div>
      </div>
    </section>
  );
};
