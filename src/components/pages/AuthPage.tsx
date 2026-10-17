import React, { useState } from 'react';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingFooter } from '../landing/LandingFooter';
import { BrandLogo } from '../brand/BrandLogo';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { useStudy } from '../../context/StudyContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { navigate, goToApp, goToOnboarding } = useRouter();
  const { plan, subjects } = useStudy();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const hasExistingWorkspace = Boolean(plan && plan.isOnboardingCompleted && subjects.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both your email address and password.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError(null);
    setInfoMessage(
      'Cloud accounts are in development! Entering your private, local-first browser workspace now...'
    );

    setTimeout(() => {
      if (hasExistingWorkspace) {
        goToApp();
      } else {
        goToOnboarding();
      }
    }, 1200);
  };

  const handleInstantGuest = () => {
    if (hasExistingWorkspace) {
      goToApp();
    } else {
      goToOnboarding();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <LandingHeader />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="w-full max-w-md space-y-6">
          {/* Card Container */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xl">
            {/* Header / Mode Toggle */}
            <div className="text-center mb-6">
              <div className="inline-flex justify-center mb-3">
                <BrandLogo variant="icon" size="lg" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {mode === 'login' ? 'Sign in to The Study Pilot' : 'Create your free account'}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {mode === 'login'
                  ? 'Access your personal study workspace'
                  : 'Start tracking consistent study habits today'}
              </p>
            </div>

            {/* Local-First Transparency Notice */}
            <div className="mb-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 dark:border-emerald-900/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Zero Mandatory Signup:</strong> The Study Pilot is 100% functional right in your browser. All session history is safely stored on your device.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-center gap-2 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {infoMessage && (
                <div className="p-3 rounded-xl border border-brand-200 bg-brand-50 text-brand-800 text-xs flex items-center gap-2 dark:border-brand-900 dark:bg-brand-950 dark:text-brand-200 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-600" />
                  <span>{infoMessage}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="auth-email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="auth-password"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center font-semibold mt-2"
              >
                {mode === 'login' ? 'Sign In / Sync Workspace' : 'Create Free Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-5 relative flex items-center justify-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
                Or Continue Directly
              </span>
            </div>

            {/* Instant Local Workspace Button */}
            <Button
              variant="outline"
              size="md"
              onClick={handleInstantGuest}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center font-medium border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {hasExistingWorkspace ? 'Launch Existing Dashboard' : 'Start As Guest (Instant)'}
            </Button>

            {/* Switch Mode */}
            <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
              {mode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setError(null);
                    }}
                    className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError(null);
                    }}
                    className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Privacy & Terms Note */}
          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            By using The Study Pilot, you acknowledge our{' '}
            <button
              type="button"
              onClick={() => navigate('/privacy')}
              className="underline hover:text-slate-600 dark:hover:text-slate-300"
            >
              Privacy Policy
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => navigate('/terms')}
              className="underline hover:text-slate-600 dark:hover:text-slate-300"
            >
              Terms of Use
            </button>.
          </p>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};
