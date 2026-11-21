import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  className,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // Open first item by default

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className={cn('my-10 space-y-4', className)} aria-label={title}>
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-slate-800">
        <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const questionId = `faq-q-${idx}`;
          const answerId = `faq-a-${idx}`;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                id={questionId}
                aria-controls={answerId}
                aria-expanded={isOpen}
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3',
                    isOpen && 'rotate-180 text-brand-600 dark:text-brand-400'
                  )}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 space-y-2"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
