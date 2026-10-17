import React from 'react';
import { Timer, Flame, BarChart3, ShieldCheck, Lock, Globe2 } from 'lucide-react';

export const ValuePropsSection: React.FC = () => {
  const benefitCards = [
    {
      icon: Timer,
      iconBg: 'bg-indigo-50 text-brand-600 dark:bg-brand-950/70 dark:text-brand-300',
      title: 'Study with focus',
      description:
        'Track real study time with a dedicated focus timer. Pauses and break periods are separated automatically so you only record genuine active learning.',
    },
    {
      icon: Flame,
      iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/70 dark:text-amber-300',
      title: 'Stay consistent',
      description:
        'Build daily study habits with streaks and an annual activity heatmap. Set your own daily focus threshold and watch your consistency compound over time.',
    },
    {
      icon: BarChart3,
      iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-300',
      title: 'Know your progress',
      description:
        'See where your study time actually goes. Compare daily and weekly allocations across subjects to ensure no critical exam topic gets left behind.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-y border-slate-200/70 bg-white/70 dark:border-slate-800/70 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Why The Study Pilot
          </h2>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Designed for real students who value honest effort
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            No gamified vanity metrics or artificial hype. Just clean, reliable tools that help you turn intention into daily execution.
          </p>
        </div>

        {/* 3 Core Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {benefitCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs hover:border-brand-500/50 hover:shadow-md transition-all group"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} mb-5 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Transparent Trust Bar */}
        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
            <div className="flex items-center gap-3 px-3 py-2 sm:py-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  100% Free Core Tools
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  No paywalls or surprise trials.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 sm:py-0">
              <Lock className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Private in Your Browser
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Data stored securely in local storage.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 sm:py-0">
              <Globe2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mx-auto sm:mx-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Universal for Any Exam
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Customizable subjects, targets, and dates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
