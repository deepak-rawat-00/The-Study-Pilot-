import React from 'react';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { FileText, AlertCircle } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const TermsPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <LandingHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title */}
        <div className="border-b border-slate-200/80 pb-8 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-950/80 dark:border-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>User Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Terms of Use
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Last updated: October 2026 • The Study Pilot (thestudypilot.com)
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-8 space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using <strong>The Study Pilot</strong> (&quot;the Service&quot;), you agree to be bound by these Terms of Use. If you disagree with any portion of these terms, you should discontinue using the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Educational Productivity Purpose
            </h2>
            <p>
              The Study Pilot is an independent self-study organization and time-management companion. It provides focus timers, target tracking, exam countdowns, and study consistency heatmaps.
            </p>
            <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/60 dark:border-amber-900/60 dark:bg-slate-900 text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">
                <strong>Academic Disclaimer:</strong> The Study Pilot does not guarantee admission, passing marks, or specific test scores on any school, college, government, or professional certification exam. All educational results depend solely on the user&apos;s personal diligence and academic effort.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Free Access &amp; Availability
            </h2>
            <p>
              The core study workspace is provided free of charge. We strive to maintain continuous service availability, but we do not warrant that access will be completely uninterrupted or error-free at all times.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. User Responsibility for Local Storage
            </h2>
            <p>
              Because your study history is preserved in your device&apos;s browser storage (HTML5 LocalStorage), maintaining regular backups and preventing unintended clearing of browser cache is the user&apos;s responsibility. The Study Pilot cannot recover data that has been permanently wiped from your local browser profile.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Intellectual Property
            </h2>
            <p>
              The Study Pilot logo, software design, interface components, domain algorithms, brand assets, and original written content are the exclusive intellectual property of The Study Pilot. Users may not copy, reverse engineer, or redistribute our proprietary software without prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, The Study Pilot and its creators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              7. Inquiries &amp; Support
            </h2>
            <p>
              For any questions regarding these Terms, please reach out via our{' '}
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="text-brand-600 dark:text-brand-400 underline font-semibold"
              >
                Contact Page
              </button>{' '}
              or email us at <code>support@thestudypilot.com</code>.
            </p>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};
