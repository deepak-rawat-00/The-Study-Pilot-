import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface WarningCalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const WarningCallout: React.FC<WarningCalloutProps> = ({
  title = 'Common Trap to Avoid',
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'my-6 rounded-2xl border border-amber-200/90 bg-amber-50/60 p-4 sm:p-5 dark:border-amber-900/60 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100',
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/80 dark:text-amber-300">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="flex-1 text-sm leading-relaxed">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-1">
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
