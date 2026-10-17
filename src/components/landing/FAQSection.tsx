import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Is The Study Pilot completely free to use?',
      answer:
        'Yes. All core study tools—the focus timer, subject tracking, daily goals, exam countdowns, study streaks, and activity heatmaps—are 100% free with no trial periods, subscriptions, or paywalled feature locks.',
    },
    {
      id: 'faq-2',
      question: 'Do I need to create an account or provide a credit card?',
      answer:
        'No. You can start using The Study Pilot immediately without an account, email address, or payment details. Your study plan and session logs are saved directly in your browser.',
    },
    {
      id: 'faq-3',
      question: 'Where is my study data stored, and is my privacy protected?',
      answer:
        'Your study sessions, subjects, and settings are stored locally on your device via HTML5 LocalStorage. None of your personal study habits, subject names, or notes are uploaded to external tracking databases.',
    },
    {
      id: 'faq-4',
      question: 'Can I customize my subjects and examination dates?',
      answer:
        'Absolutely. You can add as many subjects as you need, assign custom color codes, specify target daily and weekly hours, and schedule multiple upcoming exam countdowns with individual priority levels.',
    },
    {
      id: 'faq-5',
      question: 'How do study streaks work, and can I change the daily requirement?',
      answer:
        'Streaks are earned by accumulating active focus time during each local calendar day. The default threshold is 60 minutes per day, but you can customize this in Settings (e.g. 30, 45, or 90 minutes) to match your personal study schedule.',
    },
    {
      id: 'faq-6',
      question: 'Does the timer count pauses and breaks as study time?',
      answer:
        'No. The Study Pilot only records active study duration. Paused minutes and rest breaks are tracked separately so your logged hours and streaks reflect genuine, focused learning.',
    },
    {
      id: 'faq-7',
      question: 'Is The Study Pilot suitable for students outside India?',
      answer:
        'Yes. While presets include popular worldwide curricula, you can customize any subject, examination name, and time target. The app respects your local calendar date and timezone without UTC date skews.',
    },
    {
      id: 'faq-8',
      question: 'What happens if I clear my browser data or switch devices?',
      answer:
        'Because data is stored locally in your browser, clearing website storage will reset your workspace. Cloud accounts and optional cross-device synchronization are in development for future milestones.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-slate-200/70 bg-slate-50/50 dark:border-slate-800/70 dark:bg-slate-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/80 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Answers to common questions
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Clear, transparent details about our tools, privacy, and roadmap.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  id={`btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors"
                >
                  <span className="text-base sm:text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`btn-${faq.id}`}
                    className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in-50 duration-150"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
