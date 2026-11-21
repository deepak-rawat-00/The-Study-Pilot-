import React from 'react';
import { Lightbulb } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TipCalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TipCallout: React.FC<TipCalloutProps> = ({
  title = 'Practical Pilot Tip',
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'my-6 rounded-2xl border border-emerald-200/90 bg-emerald-50/60 p-4 sm:p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100',
        className
      )}
      role="note"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/80 dark:text-emerald-300">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="flex-1 text-sm leading-relaxed">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-1">
            {title}
          </h4>
          <div className="text-slate-700 dark:text-slate-300 space-y-2 text-xs sm:text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
