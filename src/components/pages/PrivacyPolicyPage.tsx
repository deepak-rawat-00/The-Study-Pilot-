import React from 'react';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { ShieldCheck, Lock, Database, Trash2, Eye, Server } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <LandingHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title & Badge */}
        <div className="border-b border-slate-200/80 pb-8 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy-First Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Last updated: October 2026 • The Study Pilot (thestudypilot.space)
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-8 space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              1. Our Core Commitment to Student Privacy
            </h2>
            <p>
              At <strong>The Study Pilot</strong>, we believe productivity tools should protect your personal study data, not monetize your behavior. You can use our core study tools completely free of charge without creating an account, providing an email address, or submitting financial information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              2. How Your Study Data Is Stored (Local Storage)
            </h2>
            <p>
              Your study plan, custom subjects, session logs, exam countdowns, timer history, and preferences are stored exclusively on your own device using standard web browser storage (HTML5 <code>localStorage</code>).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Your study logs are not transmitted to or stored on our servers.</li>
              <li>Your subject names, notes, and goals remain private to your local browser profile.</li>
              <li>Clearing your browser storage or website cache will erase your local study data. You can also manually reset your data anytime within the application Settings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              3. Analytics and Advertising Disclosures
            </h2>
            <p>
              To maintain our service as 100% free for students worldwide, The Study Pilot may display privacy-conscious advertisements in designated zones (such as Google AdSense).
            </p>
            <p>
              Third-party advertising partners may use cookies or web beacons to serve ads based on prior visits to our website or other sites on the Internet. Google’s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline"
              >
                Google Ads Settings
              </a>{' '}
              or through third-party tools such as{' '}
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline"
              >
                aboutads.info
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              4. Future Cloud Synchronization
            </h2>
            <p>
              In future milestones, The Study Pilot may introduce optional cloud synchronization for students who wish to sync their study progress across multiple devices. Cloud accounts will remain strictly optional, and you will always have the choice to continue using the local-only browser workspace.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              5. Data Control and Erasure
            </h2>
            <p>
              Because your study history is saved locally, you retain complete control over your records at all times. You can wipe all stored subjects, timers, plans, and streaks in one click by navigating to <strong>Settings &rarr; Data Management &rarr; Reset All Data</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Contacting Us About Privacy
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or your data rights, please reach out through our{' '}
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="text-brand-600 dark:text-brand-400 underline font-semibold"
              >
                Contact Page
              </button>{' '}
              or via email at <code>support@thestudypilot.com</code>.
            </p>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};
