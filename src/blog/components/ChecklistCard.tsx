import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ChecklistCardProps {
  title: string;
  items: Array<string | { title: string; desc?: string }>;
  className?: string;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  title,
  items,
  className,
}) => {
  return (
    <div
      className={cn(
        'my-6 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-950 dark:bg-indigo-950/20',
        className
      )}
    >
      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h4>

      <ul className="space-y-2.5">
        {items.map((item, idx) => {
          const isObj = typeof item === 'object';
          const itemTitle = isObj ? item.title : item;
          const itemDesc = isObj ? item.desc : undefined;

          return (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {itemTitle}
                </span>
                {itemDesc && (
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {itemDesc}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
