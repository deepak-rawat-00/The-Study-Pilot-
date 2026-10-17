import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { ThemeToggle } from '../layout/ThemeToggle';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import { useStudy } from '../../context/StudyContext';
import { Menu, X, ArrowRight, LayoutDashboard, Sparkles, BookOpen } from 'lucide-react';

export const LandingHeader: React.FC = () => {
  const { navigate, goToApp, goToOnboarding } = useRouter();
  const { plan, subjects } = useStudy();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hasExistingWorkspace = Boolean(plan && plan.isOnboardingCompleted && subjects.length > 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    navigate(`/#${sectionId}`);
  };

  const handlePrimaryAction = () => {
    setMobileMenuOpen(false);
    if (hasExistingWorkspace) {
      goToApp();
    } else {
      goToOnboarding();
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'border-b border-slate-200/90 bg-white/90 backdrop-blur-md shadow-xs dark:border-slate-800/90 dark:bg-slate-950/90'
          : 'border-b border-slate-100 bg-white/60 backdrop-blur-xs dark:border-slate-800/60 dark:bg-slate-950/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
            aria-label="The Study Pilot - Home"
          >
            <BrandLogo size="md" subtitle="Navigation for your study goals" />
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <button
              type="button"
              onClick={() => handleNavClick('features')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 outline-hidden"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 outline-hidden"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('analytics-preview')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 outline-hidden"
            >
              Study Analytics
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 outline-hidden"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />

            <Button
              variant="primary"
              size="md"
              onClick={handlePrimaryAction}
              rightIcon={hasExistingWorkspace ? <LayoutDashboard className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              className="font-semibold shadow-md shadow-brand-500/20"
            >
              {hasExistingWorkspace ? 'Go to Dashboard' : 'Start Studying Free'}
            </Button>
          </div>

          {/* Mobile menu and theme buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200/80 bg-white/95 px-4 pt-2 pb-6 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1 py-2 text-base font-medium text-slate-700 dark:text-slate-200">
            <button
              type="button"
              onClick={() => handleNavClick('features')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left"
            >
              <span>Features</span>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left"
            >
              <span>How It Works</span>
              <Sparkles className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('analytics-preview')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left"
            >
              <span>Study Analytics</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 text-left"
            >
              <span>FAQ</span>
            </button>
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handlePrimaryAction}
              className="w-full justify-center text-center font-semibold"
              rightIcon={hasExistingWorkspace ? <LayoutDashboard className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            >
              {hasExistingWorkspace ? 'Go to Dashboard' : 'Start Studying Free'}
            </Button>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              100% Free core study tools. No credit card required.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
