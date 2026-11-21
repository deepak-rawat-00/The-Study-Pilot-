import React, { useEffect, useState } from 'react';
import { TableOfContentsItem } from '../types';
import { List, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, className }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleScrollToHeading = (id: string) => {
    setIsOpenMobile(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn('rounded-2xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-xs', className)}
    >
      {/* Mobile Accordion Toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="flex w-full items-center justify-between py-1 text-sm font-semibold text-slate-800 dark:text-slate-200"
          aria-expanded={isOpenMobile}
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            Table of Contents
          </span>
          <ChevronDown
            className={cn('w-4 h-4 text-slate-500 transition-transform duration-200', isOpenMobile && 'rotate-180')}
          />
        </button>

        {isOpenMobile && (
          <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            {items.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}
              >
                <button
                  type="button"
                  onClick={() => handleScrollToHeading(item.id)}
                  className={cn(
                    'w-full text-left py-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors',
                    activeId === item.id
                      ? 'font-bold text-brand-600 dark:text-brand-400'
                      : 'text-slate-600 dark:text-slate-400'
                  )}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Sticky View */}
      <div className="hidden lg:block space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          <List className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>On this page</span>
        </div>

        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={cn(
                  'transition-all duration-150',
                  item.level === 3 && 'pl-3'
                )}
              >
                <button
                  type="button"
                  onClick={() => handleScrollToHeading(item.id)}
                  className={cn(
                    'group flex w-full text-left py-1 px-2 rounded-lg transition-colors leading-relaxed',
                    isActive
                      ? 'bg-brand-50 font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                      : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                  )}
                >
                  <span className={cn('line-clamp-2', isActive && 'text-brand-600 dark:text-brand-400')}>
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
