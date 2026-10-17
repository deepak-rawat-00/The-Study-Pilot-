import React from 'react';
import { useTimer } from '../../context/TimerContext';
import { useStudy } from '../../context/StudyContext';
import { Card } from '../common/Card';
import { calculateStudyStreaks } from '../../domain/streakEngine';
import { formatDurationHoursMinutes } from '../../domain/dashboardEngine';
import {
  Flame,
  Trophy,
  CalendarCheck,
  Check,
} from 'lucide-react';

export const StudyStreakCard: React.FC = () => {
  const { sessions } = useTimer();
  const { plan, completeOnboarding, subjects } = useStudy();

  const minStreakMinutes = plan?.minStreakMinutes || 60;

  const streakResult = calculateStudyStreaks({
    sessions,
    minStreakMinutes,
    referenceDate: new Date(),
  });

  const handleThresholdChange = (mins: number) => {
    if (!plan) return;
    const updatedPlan = {
      ...plan,
      minStreakMinutes: mins,
    };
    completeOnboarding(updatedPlan, subjects);
  };

  // Generate the last 7 calendar days
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const dayLetter = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const isToday = i === 6;

    const studiedSec = streakResult.historyMap[dateStr] || 0;
    const isQualified = studiedSec >= minStreakMinutes * 60;

    return {
      dateStr,
      dayLetter,
      isToday,
      studiedSec,
      isQualified,
    };
  });

  const todaySec = streakResult.historyMap[last7Days[6].dateStr] || 0;
  const todayMins = Math.floor(todaySec / 60);
  const remainingMinsToday = Math.max(0, minStreakMinutes - todayMins);

  return (
    <Card className="border-amber-200/60 dark:border-amber-900/40 bg-gradient-to-br from-white to-amber-50/20 dark:from-slate-900 dark:to-amber-950/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Study Streak & Consistency
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consecutive days meeting your minimum focus threshold
            </p>
          </div>
        </div>

        {/* Threshold Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-slate-400">Threshold:</span>
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => handleThresholdChange(mins)}
                className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                  minStreakMinutes === mins
                    ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-700 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
                title={`Count day active when focus time reaches ${mins} mins`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Streak Stats */}
      <div className="grid grid-cols-3 gap-4 py-4 text-center sm:text-left">
        {/* Current Streak */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 mx-auto sm:mx-0">
            <Flame className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline gap-1 justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {streakResult.currentStreak}
              </span>
              <span className="text-xs font-bold uppercase text-slate-400">
                {streakResult.currentStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Current Streak
            </p>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-slate-800 dark:text-amber-400 mx-auto sm:mx-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1 justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {streakResult.longestStreak}
              </span>
              <span className="text-xs font-bold uppercase text-slate-400">
                {streakResult.longestStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Longest Streak
            </p>
          </div>
        </div>

        {/* Total Active Days */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-slate-800 dark:text-emerald-400 mx-auto sm:mx-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1 justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {streakResult.totalActiveDays}
              </span>
              <span className="text-xs font-bold uppercase text-slate-400">days</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Total Active Days
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Consistency Visualizer Strip */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Past 7 Days Consistency
          </span>
          <span className="text-[11px] text-slate-400">
            {streakResult.isActiveToday
              ? 'Today qualified! Streak protected. 🎉'
              : remainingMinsToday > 0
              ? `${remainingMinsToday}m needed today to extend streak`
              : 'Streak qualified today!'}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {last7Days.map((d, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                d.isToday
                  ? 'ring-2 ring-brand-500/50 border-brand-300 bg-brand-50/30 dark:border-brand-800 dark:bg-brand-950/30'
                  : 'border-slate-200/70 bg-white/70 dark:border-slate-800 dark:bg-slate-900/60'
              }`}
            >
              <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                {d.dayLetter}
              </span>
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  d.isQualified
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : d.isToday && d.studiedSec > 0
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                }`}
                title={`${d.dateStr}: ${formatDurationHoursMinutes(d.studiedSec)} focus logged`}
              >
                {d.isQualified ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '•'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
