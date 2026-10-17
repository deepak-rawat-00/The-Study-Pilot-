import React, { useState, useMemo } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  HeatmapData,
  HeatmapDay,
  HeatmapIntensity,
} from '../../types';
import { formatDurationHoursMinutes } from '../../domain/dashboardEngine';
import {
  Calendar,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface StudyHeatmapProps {
  data: HeatmapData;
  minStreakMinutes: number;
  onSelectYear: (year: number | 'last365') => void;
}

interface MonthGroup {
  monthKey: string;
  label: string;
  year: number;
  columns: Array<Array<HeatmapDay | null>>;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildMonthColumns(group: { monthKey: string; label: string; year: number; days: HeatmapDay[] }): MonthGroup {
  const columns: Array<Array<HeatmapDay | null>> = [];
  if (group.days.length === 0) {
    return { ...group, columns };
  }

  const firstDay = group.days[0];
  const startDayOfWeek = firstDay.date.getDay(); // 0=Sun .. 6=Sat

  let currentCol: Array<HeatmapDay | null> = [null, null, null, null, null, null, null];
  for (let i = 0; i < startDayOfWeek; i++) {
    currentCol[i] = null;
  }

  for (const day of group.days) {
    const dow = day.date.getDay();
    currentCol[dow] = day;

    if (dow === 6) {
      columns.push([...currentCol]);
      currentCol = [null, null, null, null, null, null, null];
    }
  }

  if (currentCol.some((d) => d !== null)) {
    columns.push([...currentCol]);
  }

  return {
    monthKey: group.monthKey,
    label: group.label,
    year: group.year,
    columns,
  };
}

export const StudyHeatmap: React.FC<StudyHeatmapProps> = ({
  data,
  minStreakMinutes,
  onSelectYear,
}) => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<HeatmapDay | null>(null);

  const activeDay = hoveredDay || selectedDay;

  // Group days into months with separate weekly columns for distinct month spacing
  const monthGroups = useMemo(() => {
    const groups: MonthGroup[] = [];
    let currentGroup: {
      monthKey: string;
      label: string;
      year: number;
      days: HeatmapDay[];
    } | null = null;

    for (const day of data.days) {
      const y = day.date.getFullYear();
      const m = day.date.getMonth();
      const key = `${y}-${m}`;

      if (!currentGroup || currentGroup.monthKey !== key) {
        if (currentGroup) {
          groups.push(buildMonthColumns(currentGroup));
        }
        currentGroup = {
          monthKey: key,
          label: monthNames[m],
          year: y,
          days: [day],
        };
      } else {
        currentGroup.days.push(day);
      }
    }

    if (currentGroup) {
      groups.push(buildMonthColumns(currentGroup));
    }

    return groups;
  }, [data.days]);

  // Intensity classes (light and dark theme)
  const getIntensityClass = (intensity: HeatmapIntensity, isFuture: boolean) => {
    if (isFuture) {
      return 'bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-200/50 dark:border-slate-800/50 cursor-not-allowed opacity-40';
    }
    switch (intensity) {
      case 0:
        return 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/70 dark:hover:bg-slate-700/80 border-slate-200/60 dark:border-slate-700/60';
      case 1:
        return 'bg-emerald-200 hover:bg-emerald-300 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 border-emerald-300/60 dark:border-emerald-800/70';
      case 2:
        return 'bg-emerald-400 hover:bg-emerald-500 dark:bg-emerald-700/90 dark:hover:bg-emerald-600 border-emerald-500/70 dark:border-emerald-600/70';
      case 3:
        return 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 border-emerald-600 dark:border-emerald-400';
      case 4:
        return 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-400 dark:hover:bg-emerald-300 border-emerald-800 dark:border-emerald-300';
    }
  };

  const weekdayLabels = [
    { label: '', row: 0 },   // Sun
    { label: 'Mon', row: 1 },
    { label: '', row: 2 },   // Tue
    { label: 'Wed', row: 3 },
    { label: '', row: 4 },   // Thu
    { label: 'Fri', row: 5 },
    { label: '', row: 6 },   // Sat
  ];

  return (
    <Card className="border-slate-200/80 dark:border-slate-800">
      {/* Header with Year Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Study Consistency Heatmap
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            GitHub-style daily contribution calendar derived strictly from authentic active focus sessions.
          </p>
        </div>

        {/* Year Filter Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => onSelectYear('last365')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              data.selectedYear === 'last365'
                ? 'bg-brand-600 text-white shadow-xs dark:bg-brand-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            Last 12 Months
          </button>
          {data.availableYears.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => onSelectYear(y)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                data.selectedYear === y
                  ? 'bg-brand-600 text-white shadow-xs dark:bg-brand-500'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Grid Area (Horizontally Scrollable) with distinct gaps between months */}
      <div className="py-5 overflow-x-auto scrollbar-thin">
        <div className="inline-block min-w-full">
          <div className="flex items-start">
            {/* Weekday Labels Column */}
            <div className="flex flex-col select-none pr-2.5 shrink-0">
              <div className="flex flex-col gap-1">
                {weekdayLabels.map((w, idx) => (
                  <div
                    key={idx}
                    className="h-3.5 w-6 flex items-center justify-end text-[10px] font-medium text-slate-400 dark:text-slate-500"
                  >
                    {w.label}
                  </div>
                ))}
              </div>
              {/* Spacer so weekday labels match grid height and not bottom month labels */}
              <div className="mt-2 text-[10px] h-4" aria-hidden="true" />
            </div>

            {/* Months Container: with clear, distinct gaps between months */}
            <div className="flex gap-3 sm:gap-3.5 items-start">
              {monthGroups.map((month) => (
                <div key={month.monthKey} className="flex flex-col items-center">
                  {/* Columns of this month */}
                  <div className="flex gap-1">
                    {month.columns.map((col, cIdx) => (
                      <div key={cIdx} className="flex flex-col gap-1">
                        {col.map((day, rIdx) => {
                          if (!day) {
                            return (
                              <div
                                key={rIdx}
                                className="w-3.5 h-3.5 invisible"
                                aria-hidden="true"
                              />
                            );
                          }

                          const isCurrentHovered = activeDay?.dateString === day.dateString;

                          return (
                            <button
                              key={day.dateString}
                              type="button"
                              onClick={() => setSelectedDay(day)}
                              onMouseEnter={() => setHoveredDay(day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              disabled={day.isFuture}
                              aria-label={`${day.dateString}: ${day.totalMinutes} minutes studied`}
                              className={`w-3.5 h-3.5 rounded-xs border transition-all relative flex items-center justify-center ${getIntensityClass(
                                day.intensity,
                                day.isFuture
                              )} ${
                                isCurrentHovered
                                  ? 'ring-2 ring-brand-500 ring-offset-1 z-10 scale-125'
                                  : ''
                              } ${
                                day.isToday
                                  ? 'ring-1 ring-brand-500'
                                  : ''
                              }`}
                              title={`${day.dateString}: ${day.totalMinutes}m logged${
                                day.isQualified ? ' (Streak Qualified ✓)' : ''
                              }`}
                            >
                              {/* Additional visual indicator for qualifying days */}
                              {day.isQualified && (
                                <span
                                  className="w-1 h-1 rounded-full bg-white dark:bg-slate-950 shadow-2xs pointer-events-none"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Month Label directly beneath each month block */}
                  <span className="mt-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center select-none">
                    {month.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Inspector / Tooltip Bar */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        {activeDay ? (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {activeDay.date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                {activeDay.isToday && (
                  <Badge variant="primary" size="sm">
                    Today
                  </Badge>
                )}
                {activeDay.isQualified ? (
                  <Badge variant="success" size="sm" className="font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Streak Goal Met (60m+)</span>
                  </Badge>
                ) : activeDay.totalSeconds > 0 ? (
                  <Badge variant="warning" size="sm">
                    Partial Focus ({activeDay.totalMinutes}m / {minStreakMinutes}m)
                  </Badge>
                ) : (
                  <Badge variant="default" size="sm">
                    No Focus Logged
                  </Badge>
                )}
              </div>

              {/* Subject Breakdown Pills */}
              {activeDay.subjectBreakdown.length > 0 ? (
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-[11px] font-semibold text-slate-400">Subjects:</span>
                  {activeDay.subjectBreakdown.map((sb) => (
                    <span
                      key={sb.subjectId}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: sb.subjectColor }}
                      />
                      <span>{sb.subjectCode}</span>
                      <span className="text-slate-400">({sb.minutes}m)</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-1">
                  Zero active focus intervals recorded on this date.
                </p>
              )}
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-slate-400 font-medium">Total Focus Time</span>
              <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {formatDurationHoursMinutes(activeDay.totalSeconds)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 py-1">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Hover or click any calendar square to inspect detailed focus breakdowns.</span>
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {data.totalPeriodActiveDays} qualifying study days in selected period
            </span>
          </div>
        )}
      </div>

      {/* Legend & Accessibility Notes */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        {/* Colors Legend */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase text-slate-400">Activity:</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400">Less</span>
            <span className="w-3.5 h-3.5 rounded-xs border bg-slate-100 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700" title="0 minutes" />
            <span className="w-3.5 h-3.5 rounded-xs border bg-emerald-200 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800" title="1–29 minutes" />
            <span className="w-3.5 h-3.5 rounded-xs border bg-emerald-400 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-600" title="30–59 minutes" />
            <span className="w-3.5 h-3.5 rounded-xs border bg-emerald-500 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-400" title="60–119 minutes" />
            <span className="w-3.5 h-3.5 rounded-xs border bg-emerald-700 dark:bg-emerald-400 border-emerald-800 dark:border-emerald-300" title="120+ minutes" />
            <span className="text-[11px] text-slate-400">More</span>
          </div>
        </div>

        {/* Visual Indicator Legend */}
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-xs border bg-emerald-500 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white shadow-2xs" />
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-300">
            White dot denotes <strong>streak goal qualified</strong> ({minStreakMinutes}m+)
          </span>
        </div>
      </div>
    </Card>
  );
};
