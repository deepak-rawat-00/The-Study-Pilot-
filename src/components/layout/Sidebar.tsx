import React from 'react';
import {
  LayoutDashboard,
  Timer,
  BookOpen,
  CalendarClock,
  BarChart3,
  Settings,
  Globe,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { useRouter } from '../../context/RouterContext';
import { NavigationTab } from '../../types';
import { cn } from '../../utils/cn';
import { BrandLogo } from '../brand/BrandLogo';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, subjects, isMobileSidebarOpen, setIsMobileSidebarOpen } =
    useStudy();
  const { navigate } = useRouter();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'timer',
      label: 'Study Timer',
      icon: Timer,
    },
    {
      id: 'subjects',
      label: 'My Subjects',
      icon: BookOpen,
      badge: subjects.length > 0 ? subjects.length : undefined,
    },
    {
      id: 'countdown',
      label: 'Exam Countdown',
      icon: CalendarClock,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setIsMobileSidebarOpen(false);
  };

  const handleVisitPublicSite = () => {
    setIsMobileSidebarOpen(false);
    navigate('/');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2">
          <button
            type="button"
            onClick={handleVisitPublicSite}
            className="text-left focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
            aria-label="The Study Pilot - Visit Public Website"
          >
            <BrandLogo size="md" subtitle="Study Companion" />
          </button>

          {/* Close button for mobile drawer */}
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Study Workspace
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={cn(
                  'group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs dark:bg-brand-950/60 dark:text-brand-300 dark:shadow-none'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                      isActive
                        ? 'bg-brand-600 text-white dark:bg-brand-500'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3">
            <button
              type="button"
              onClick={handleVisitPublicSite}
              className="group flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-slate-400 group-hover:text-brand-600 dark:text-slate-500" />
                <span>Landing Page &amp; FAQ</span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-indigo-50/30 p-3.5 dark:border-slate-800 dark:from-slate-900/60 dark:to-brand-950/20">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>The Study Pilot</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <ShieldCheck className="w-3 h-3" /> Private Local
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Plan Your Study. Build Your Streak. Reach Your Goals.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 lg:block sticky top-0">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl dark:bg-slate-900 transition-transform">
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
