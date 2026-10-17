import React from 'react';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { Compass, Target, ShieldCheck, Heart, Globe2 } from 'lucide-react';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';

export const AboutPage: React.FC = () => {
  const { goToOnboarding } = useRouter();

  const principles = [
    {
      icon: Target,
      title: 'Authentic Effort Only',
      desc: 'No fake progress bars or inflated study hours. Paused time and rest breaks are cleanly separated so you only count genuine active focus.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy by Default',
      desc: 'Your study goals, notes, and session times belong to you. We store data in your browser rather than harvesting your personal study patterns.',
    },
    {
      icon: Heart,
      title: 'Free Core Productivity',
      desc: 'High-quality study organization should never be locked behind steep subscriptions. Core tools will always remain 100% free for students.',
    },
    {
      icon: Globe2,
      title: 'Global Curriculum Adaptability',
      desc: 'Built for learners in every country—from high school exams to professional certifications—without regional restrictions or fixed syllabi.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <LandingHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/80 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Mission &amp; Story</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            A personal navigation system for every student
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            The Study Pilot was created to solve a universal struggle: turning ambitious study intentions into reliable, day-by-day consistency.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="mt-12 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Why we built The Study Pilot
          </h2>
          <p>
            When studying for demanding examinations, students are often bombarded with bloated applications: endless social feeds, distracting notification loops, locked features requiring credit cards, and complex workflows that take more time to configure than actual studying.
          </p>
          <p>
            We designed <strong>The Study Pilot</strong> as a clean, calm, distraction-free cockpit. Just as a pilot relies on clear instruments to navigate through turbulence, a student needs straightforward metrics to stay on course:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
            <li><strong>How much time did I actually study today?</strong> (Excluding pauses and distractions)</li>
            <li><strong>Which subjects received my energy?</strong> (Preventing neglect of difficult topics)</li>
            <li><strong>How many days remain until my examinations?</strong> (Maintaining realistic urgency)</li>
            <li><strong>Am I building a sustainable study habit?</strong> (Tracked via honest streaks and heatmaps)</li>
          </ul>
        </div>

        {/* Principles Grid */}
        <div className="mt-14 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
            Our Guiding Principles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 p-8 text-center text-white shadow-lg space-y-4">
          <h2 className="text-2xl font-bold">
            Start organizing your study sessions now
          </h2>
          <p className="text-sm text-brand-100 max-w-xl mx-auto">
            Experience a cleaner way to study without mandatory signups or hidden costs.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={goToOnboarding}
            className="bg-white text-brand-900 hover:bg-slate-100 font-bold"
          >
            Launch Free Workspace
          </Button>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};
