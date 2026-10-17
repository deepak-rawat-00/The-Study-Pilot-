import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  subtitle?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  subtitle,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Pilot Compass Icon Mark */}
      <div
        className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 text-white shadow-md shadow-brand-500/25 ring-1 ring-white/20`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[72%] h-[72%]"
        >
          {/* Subtle outer compass orbit */}
          <circle
            cx="20"
            cy="20"
            r="16.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeDasharray="2.5 3"
            strokeOpacity="0.45"
          />
          {/* North cardinal tick */}
          <path
            d="M20 3.5V6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* East / West subtle ticks */}
          <path
            d="M33.5 20H36.5M3.5 20H6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          {/* Open Book Wings at bottom */}
          <path
            d="M10 27.5C13.5 26 17 26.5 20 28.5C23 26.5 26.5 26 30 27.5V30C26.5 28.5 23 29 20 31C17 29 13.5 28.5 10 30V27.5Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          {/* Pilot Navigation Arrow / Jet Apex Pointing North-East (representing Progress) */}
          <path
            d="M20 7L28 23L20 19L12 23L20 7Z"
            fill="currentColor"
            className="text-white drop-shadow-sm"
          />
          {/* Accent Guidance Needle / Progress Dot */}
          <circle cx="20" cy="19" r="2.2" fill="#10B981" />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold tracking-tight text-slate-900 dark:text-white leading-none ${textSizes[size]}`}
            >
              The Study Pilot
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          {subtitle && (
            <span
              className={`font-medium text-slate-500 dark:text-slate-400 mt-0.5 tracking-normal leading-tight ${subtitleSizes[size]}`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
