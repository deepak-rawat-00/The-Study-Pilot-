import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { Link } from '../common/Link';
import { useRouter } from '../../context/RouterContext';
import { ShieldCheck } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const { goToApp } = useRouter();

  return (
    <footer className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="group flex items-center text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
              aria-label="The Study Pilot Home"
            >
              <BrandLogo size="md" subtitle="Navigation for your study goals" />
            </Link>

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
              Free Study Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/tools/study-planner-generator"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Study Planner Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/weekly-study-planner"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Weekly Study Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/study-hours-calculator"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Study Hours Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/pomodoro-timer"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Pomodoro Focus Timer
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium text-brand-600 dark:text-brand-400"
                >
                  All 8 Interactive Tools &rarr;
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToApp()}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Study Workspace (App)
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Exploration & Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Explore &amp; Guides
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/blog"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium text-brand-600 dark:text-brand-400"
                >
                  Study Guides &amp; Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/how-to-create-a-study-schedule"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-xs"
                >
                  Study Schedule Blueprint
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/how-to-study-consistently"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-xs"
                >
                  Daily Consistency Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/how-to-stop-procrastinating-while-studying"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-xs"
                >
                  Stop Procrastinating Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium text-brand-600 dark:text-brand-400"
                >
                  Free Printables &amp; Sheets
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  About The Study Pilot
                </Link>
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
                <Link
                  to="/privacy"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Contact &amp; Support
                </Link>
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
            <Link
              to="/privacy"
              className="hover:underline"
            >
              Privacy
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              className="hover:underline"
            >
              Terms
            </Link>
            <span>•</span>
            <Link
              to="/contact"
              className="hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
