import React from 'react';
import { Button } from '../common/Button';
import { useStudy } from '../../context/StudyContext';
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  Target,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  const { exploreDemo } = useStudy();

  const supportedPillars = [
    {
      title: 'School Students (9–12)',
      desc: 'CBSE, ICSE & State Boards',
    },
    {
      title: 'Government Exams',
      desc: 'SSC CGL, CHSL, CPO, RRB & Banking',
    },
    {
      title: 'Civil Services',
      desc: 'UPSC CSE & State PSC Exams',
    },
    {
      title: 'Engineering & Medical',
      desc: 'JEE Main, Advanced, NEET-UG & GATE',
    },
    {
      title: 'College & University',
      desc: 'Undergraduate & Masters Semester Goals',
    },
    {
      title: 'International Exams',
      desc: 'GRE, GMAT, SAT, IELTS & TOEFL',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 text-center max-w-4xl mx-auto">
      {/* Brand Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/60 dark:border-brand-800/80 dark:text-brand-300 text-xs font-semibold mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
        <span>The Study Pilot • Personal Study Navigation</span>
      </div>

      {/* Main Required Headline & Subheading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-[1.15]">
        Your goals. Your time. Your progress.
      </h1>

      <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        Build your study routine, track every session, and make every day count.
      </p>

      {/* Primary Actions: Get Started & Explore Demo */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
        <Button
          size="lg"
          variant="primary"
          onClick={onStart}
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-lg shadow-brand-500/25"
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={exploreDemo}
          leftIcon={<PlayCircle className="w-5 h-5" />}
          className="w-full sm:w-auto px-6 py-3.5 text-base font-medium"
        >
          Explore Demo
        </Button>
      </div>

      {/* Supporting Examination Categories */}
      <div className="mt-14 w-full">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Engineered for all academic pathways
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
          {supportedPillars.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-white/60 p-3.5 dark:border-slate-800/80 dark:bg-slate-900/60 backdrop-blur-sm shadow-xs"
            >
              <h2 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              100% Authentic Tracking
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Zero fabricated study statistics. Every metric is backed by actual focus sessions.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Daily Target Balancing
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Allocate hours by subject and keep daily study workloads in balance.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Browser Local & Private
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Stores securely in your browser. No mandatory accounts or subscriptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
