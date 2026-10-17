import React from 'react';
import { Card } from '../common/Card';
import { StreakResult } from '../../types';
import {
  Flame,
  Trophy,
  CalendarCheck,
  CalendarX,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface StreakStatsGridProps {
  streak: StreakResult;
  minStreakMinutes: number;
}

export const StreakStatsGrid: React.FC<StreakStatsGridProps> = ({
  streak,
  minStreakMinutes,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {/* 1. Current Streak */}
      <Card className="p-4 flex flex-col justify-between border-amber-200/70 dark:border-amber-900/40 bg-gradient-to-br from-white to-amber-50/20 dark:from-slate-900 dark:to-amber-950/20">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Current Streak
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <Flame className="w-4 h-4 fill-current" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {streak.currentStreak}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {streak.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1 truncate">
            {streak.isActiveToday
              ? 'Qualified today! 🔥'
              : streak.currentStreak > 0
              ? 'Protected (In progress)'
              : `Need ${minStreakMinutes}m today`}
          </p>
        </div>
      </Card>

      {/* 2. Longest Streak */}
      <Card className="p-4 flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Longest Streak
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {streak.longestStreak}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {streak.longestStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            All-time consistency peak
          </p>
        </div>
      </Card>

      {/* 3. Total Successful Days */}
      <Card className="p-4 flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Successful Days
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <CalendarCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {streak.totalActiveDays}
            </span>
            <span className="text-xs font-bold text-slate-400">days</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Days reaching {minStreakMinutes}m+
          </p>
        </div>
      </Card>

      {/* 4. Total Missed Days */}
      <Card className="p-4 flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total Missed
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <CalendarX className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-700 dark:text-slate-300">
              {streak.totalMissedDays}
            </span>
            <span className="text-xs font-bold text-slate-400">days</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Past non-qualifying days
          </p>
        </div>
      </Card>

      {/* 5. Total Study Hours */}
      <Card className="p-4 flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total Focused
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400">
              {streak.totalStudyHours}
            </span>
            <span className="text-xs font-bold text-slate-400">hrs</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Total logged active focus
          </p>
        </div>
      </Card>

      {/* 6. Last Successful Date */}
      <Card className="p-4 flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Last Qualified
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
            {streak.lastSuccessfulStudyDate
              ? new Date(streak.lastSuccessfulStudyDate + 'T00:00:00').toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })
              : 'None yet'}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            {streak.daysSinceLastStudy === 0
              ? 'Today! 🎉'
              : streak.daysSinceLastStudy === 1
              ? 'Yesterday'
              : streak.daysSinceLastStudy !== null
              ? `${streak.daysSinceLastStudy} days ago`
              : 'Awaiting first session'}
          </p>
        </div>
      </Card>
    </div>
  );
};
