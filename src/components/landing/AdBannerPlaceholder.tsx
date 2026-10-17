import React from 'react';

interface AdBannerPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export const AdBannerPlaceholder: React.FC<AdBannerPlaceholderProps> = ({
  slotId = 'landing_bottom_banner',
  format = 'horizontal',
  className = '',
}) => {
  return (
    <div
      aria-label="Sponsored Advertisement Area"
      className={`mx-auto max-w-4xl px-4 py-4 ${className}`}
    >
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-100/60 p-4 text-center dark:border-slate-800 dark:bg-slate-900/50">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
        <div
          className={`mt-1 flex items-center justify-center rounded-lg bg-slate-200/50 dark:bg-slate-800/40 text-xs text-slate-400 dark:text-slate-500 font-mono ${
            format === 'horizontal' ? 'h-20 sm:h-24' : 'h-60'
          }`}
        >
          <span>Google AdSense Display Zone • Slot [{slotId}]</span>
        </div>
        <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
          Unobtrusive, policy-compliant placement isolated from interactive controls.
        </p>
      </div>
    </div>
  );
};
