import React from 'react';
import { AuthorInfo } from '../types';
import { Award, Calendar, Clock } from 'lucide-react';

export interface AuthorCardProps {
  author: AuthorInfo;
  publishDate: string;
  modifiedDate?: string;
  readingTimeMinutes: number;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  publishDate,
  modifiedDate,
  readingTimeMinutes,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-xs">
          {author.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
            <span>{author.name}</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Award className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Verified Guide
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{author.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {new Date(publishDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            {modifiedDate && modifiedDate !== publishDate && ' (Updated)'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{readingTimeMinutes} min read</span>
        </div>
      </div>
    </div>
  );
};
