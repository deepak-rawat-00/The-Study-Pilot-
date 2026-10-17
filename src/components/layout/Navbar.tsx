import React from 'react';
import { Menu, Plus, Globe } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useRouter } from '../../context/RouterContext';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../common/Button';
import { BrandLogo } from '../brand/BrandLogo';

export const Navbar: React.FC = () => {
  const { openCreateModal, setIsMobileSidebarOpen, isMobileSidebarOpen } = useStudy();
  const { navigate } = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 sm:px-6 lg:px-8">
      {/* Left side: Mobile menu toggle & brand on mobile */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
            aria-label="The Study Pilot - Return to Home"
          >
            <BrandLogo size="sm" />
          </button>
        </div>
      </div>

      {/* Right side: Actions, Public site link & Theme toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate('/')}
          leftIcon={<Globe className="w-3.5 h-3.5" />}
          className="text-xs hidden md:inline-flex"
        >
          Website
        </Button>

        <Button
          size="sm"
          variant="primary"
          onClick={openCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-xs font-semibold"
        >
          <span className="hidden sm:inline">New Subject</span>
          <span className="sm:hidden">Add</span>
        </Button>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-700/80 mx-1 hidden sm:block" />

        <ThemeToggle />
      </div>
    </header>
  );
};
