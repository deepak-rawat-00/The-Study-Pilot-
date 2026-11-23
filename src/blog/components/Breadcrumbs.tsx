import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '../../components/common/Link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs text-slate-500 dark:text-slate-400 py-2 overflow-x-auto whitespace-nowrap scrollbar-none"
    >
      <ol className="flex items-center gap-1.5">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:outline-hidden focus-visible:underline"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  to={item.href!}
                  className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:outline-hidden focus-visible:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
