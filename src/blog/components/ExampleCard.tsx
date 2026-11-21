import React from 'react';
import { CalendarClock } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ExampleCardProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  badge = 'Realistic Case Example',
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'my-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h4>
        </div>
        {badge && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {badge}
          </span>
        )}
      </div>

      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
        {children}
      </div>
    </div>
  );
};
