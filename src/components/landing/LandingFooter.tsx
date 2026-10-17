import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { useRouter } from '../../context/RouterContext';
import { ShieldCheck } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const { navigate, goToApp } = useRouter();

  const handleNavClick = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  return (
    <footer className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="group flex items-center text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
              aria-label="The Study Pilot Home"
            >
              <BrandLogo size="md" subtitle="Navigation for your study goals" />
            </button>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Plan Your Study. Build Your Streak. Reach Your Goals. The Study Pilot helps students turn ambitious study plans into consistent daily habits.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Local-first architecture. All study sessions stay on your device.</span>
            </div>
          </div>

          {/* Core Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Study Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => goToApp()}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Study Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToApp()}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Focus Timer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToApp()}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Subject Allocations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToApp()}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Exam Countdown
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToApp()}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Streaks &amp; Heatmap
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Exploration */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('features')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  All Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('how-it-works')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('analytics-preview')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Consistency Analytics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('faq')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  About The Study Pilot
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Contact &amp; Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} The Study Pilot. All rights reserved. Free, privacy-first study companion.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/privacy')}
              className="hover:underline"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigate('/terms')}
              className="hover:underline"
            >
              Terms
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="hover:underline"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
