import React from 'react';
import { Globe, GraduationCap, Award, BookCheck } from 'lucide-react';

export const InternationalSection: React.FC = () => {
  const pathways = [
    {
      icon: GraduationCap,
      title: 'High School & Secondary',
      examples: 'IB Diploma, AP Courses, A-Levels, GCSE, CBSE, and National Baccalaureates',
      description: 'Balance core subjects, coursework deadlines, and final board exams with manageable daily allocations.',
    },
    {
      icon: Award,
      title: 'University & College Degrees',
      examples: 'Undergraduate, Master’s & PhD candidates across STEM, Humanities, Law, and Medicine',
      description: 'Track heavy reading loads, research assignments, lab work, and midterm exams without burning out.',
    },
    {
      icon: Globe,
      title: 'International Standardized Tests',
      examples: 'GRE, GMAT, SAT, ACT, IELTS, TOEFL, MCAT, and LSAT',
      description: 'Count down remaining preparation days, target high-yield sections, and maintain strict practice consistency.',
    },
    {
      icon: BookCheck,
      title: 'Professional Certifications',
      examples: 'CPA, CFA, Bar Examination, USMLE, NCLEX, AWS, CompTIA, and PMP',
      description: 'Designed for working adults and candidates who need to fit high-stakes study into evenings and weekends.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-950/80 dark:border-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Built For Global Education Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Universal flexibility for learners worldwide
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Never locked into one country&apos;s curriculum. The Study Pilot adapts to your specific examination format, subjects, and study schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-950/40 shadow-xs hover:border-brand-500/50 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/80 dark:text-brand-300 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                  {item.examples}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
