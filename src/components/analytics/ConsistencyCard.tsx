import React from 'react';
import { Card } from '../common/Card';
import { ConsistencyAnalytics } from '../../types';
import {
  BarChart2,
  Check,
  Percent,
} from 'lucide-react';

interface ConsistencyCardProps {
  analytics: ConsistencyAnalytics;
  minStreakMinutes: number;
}

export const ConsistencyCard: React.FC<ConsistencyCardProps> = ({
  analytics,
  minStreakMinutes,
}) => {
  const maxWeeklyHours = Math.max(
    ...analytics.weeklyDurationBreakdown.map((d) => d.hours),
    2 // minimum scale ceiling 2 hours so empty bars look proportional
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Consistency Period Summary Cards */}
      <Card className="lg:col-span-1 border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              <Percent className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Consistency Metrics
            </h3>
          </div>

          <div className="mt-4 space-y-4">
            {/* Consistency % */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Period Consistency Rate
                </span>
                <span className="font-extrabold text-brand-600 dark:text-brand-400">
                  {analytics.consistencyPercentage}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, analytics.consistencyPercentage)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {analytics.successfulDaysInPeriod} qualifying days of {analytics.eligibleDaysInPeriod} non-future days.
              </p>
            </div>

            {/* 7-day and 30-day badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Last 7 Days
                </span>
                <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  {analytics.successfulDaysLast7}
                  <span className="text-xs font-semibold text-slate-400"> / 7</span>
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {Math.round((analytics.successfulDaysLast7 / 7) * 100)}% active
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Last 30 Days
                </span>
                <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  {analytics.successfulDaysLast30}
                  <span className="text-xs font-semibold text-slate-400"> / 30</span>
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {Math.round((analytics.successfulDaysLast30 / 30) * 100)}% active
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Threshold rule:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            ≥ {minStreakMinutes}m daily focus
          </span>
        </div>
      </Card>

      {/* Weekly Duration Bar Chart */}
      <Card className="lg:col-span-2 border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <BarChart2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Last 7 Days Study Duration
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Daily authentic focus hours
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="grid grid-cols-7 gap-2.5 pt-6 pb-2 items-end min-h-[140px]">
            {analytics.weeklyDurationBreakdown.map((day) => {
              const heightPercent = Math.min(
                100,
                Math.max(8, Math.round((day.hours / maxWeeklyHours) * 100))
              );

              return (
                <div key={day.dateString} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                  {/* Duration label */}
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {day.hours > 0 ? `${day.hours}h` : '0h'}
                  </span>

                  {/* Bar */}
                  <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800/80 rounded-t-lg h-24 flex items-end overflow-hidden p-0.5">
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 flex items-center justify-center ${
                        day.isQualified
                          ? 'bg-emerald-500 group-hover:bg-emerald-600'
                          : day.seconds > 0
                          ? 'bg-emerald-300 dark:bg-emerald-800/80 group-hover:bg-emerald-400'
                          : 'bg-transparent'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    >
                      {day.isQualified && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3] hidden sm:block" />
                      )}
                    </div>
                  </div>

                  {/* Day label */}
                  <div className="text-center">
                    <span
                      className={`text-[11px] font-bold block ${
                        day.isToday
                          ? 'text-brand-600 dark:text-brand-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {day.shortDay}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      {day.dateString.slice(5)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>Target achieved (≥{minStreakMinutes}m)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-800" />
            <span>Partial activity</span>
          </span>
        </div>
      </Card>
    </div>
  );
};
