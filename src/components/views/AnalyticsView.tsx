import React, { useState, useMemo } from 'react';
import { useStudy } from '../../context/StudyContext';
import { useTimer } from '../../context/TimerContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { StreakStatsGrid } from '../analytics/StreakStatsGrid';
import { StudyHeatmap } from '../heatmap/StudyHeatmap';
import { ConsistencyCard } from '../analytics/ConsistencyCard';
import { ThresholdSettingCard } from '../analytics/ThresholdSettingCard';
import { calculateStudyStreaks } from '../../domain/streakEngine';
import {
  generateHeatmapData,
  calculateConsistencyAnalytics,
} from '../../domain/heatmapEngine';
import { formatDurationHoursMinutes } from '../../domain/dashboardEngine';
import {
  Play,
  PieChart,
  Sparkles,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { plan, setCurrentTab } = useStudy();
  const { sessions } = useTimer();

  const minStreakMinutes = plan?.minStreakMinutes || 60;
  const [selectedYear, setSelectedYear] = useState<number | 'last365'>('last365');

  // Compute live streaks using authentic sessions
  const streak = useMemo(() => {
    return calculateStudyStreaks({
      sessions,
      minStreakMinutes,
      referenceDate: new Date(),
    });
  }, [sessions, minStreakMinutes]);

  // Compute contribution heatmap data
  const heatmapData = useMemo(() => {
    return generateHeatmapData({
      sessions,
      minStreakMinutes,
      yearFilter: selectedYear,
      referenceDate: new Date(),
    });
  }, [sessions, minStreakMinutes, selectedYear]);

  // Compute consistency analytics
  const consistencyAnalytics = useMemo(() => {
    return calculateConsistencyAnalytics({
      sessions,
      minStreakMinutes,
      yearFilter: selectedYear,
      referenceDate: new Date(),
    });
  }, [sessions, minStreakMinutes, selectedYear]);

  // Subject focus distribution over all sessions
  const subjectTotals = useMemo(() => {
    const totals: Record<
      string,
      {
        subjectId: string;
        subjectName: string;
        subjectCode: string;
        subjectColor: string;
        totalSeconds: number;
      }
    > = {};

    for (const s of sessions) {
      if (!totals[s.subjectId]) {
        totals[s.subjectId] = {
          subjectId: s.subjectId,
          subjectName: s.subjectName,
          subjectCode: s.subjectCode,
          subjectColor: s.subjectColor,
          totalSeconds: 0,
        };
      }
      totals[s.subjectId].totalSeconds += s.activeDurationSeconds;
    }

    return Object.values(totals).sort((a, b) => b.totalSeconds - a.totalSeconds);
  }, [sessions]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Study Consistency & Heatmap
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Transparent consistency metrics and contribution calendar calculated strictly from authentic focus sessions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentTab('timer')}
            leftIcon={<Play className="w-4 h-4 fill-current" />}
          >
            Start Timer
          </Button>
        </div>
      </div>

      {/* LeetCode-Style Streak Statistics Cards */}
      <StreakStatsGrid streak={streak} minStreakMinutes={minStreakMinutes} />

      {/* GitHub-Style Contribution Heatmap */}
      <StudyHeatmap
        data={heatmapData}
        minStreakMinutes={minStreakMinutes}
        onSelectYear={setSelectedYear}
      />

      {/* Period Consistency & 7-Day Focus Distribution */}
      <ConsistencyCard
        analytics={consistencyAnalytics}
        minStreakMinutes={minStreakMinutes}
      />

      {/* Subject Focus Distribution Section */}
      {subjectTotals.length > 0 && (
        <Card className="border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                <PieChart className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                All-Time Subject Focus Distribution
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {subjectTotals.length} active {subjectTotals.length === 1 ? 'subject' : 'subjects'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {subjectTotals.map((st) => {
              const percentOfTotal =
                streak.totalStudySeconds > 0
                  ? Math.round((st.totalSeconds / streak.totalStudySeconds) * 100)
                  : 0;

              return (
                <div
                  key={st.subjectId}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-bold text-white shadow-2xs"
                        style={{ backgroundColor: st.subjectColor }}
                      >
                        {st.subjectCode}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {percentOfTotal}%
                      </span>
                    </div>
                    <p
                      className="font-bold text-slate-900 dark:text-white text-sm truncate"
                      title={st.subjectName}
                    >
                      {st.subjectName}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Focused:</span>
                    <span className="font-mono text-sm font-black text-slate-900 dark:text-white">
                      {formatDurationHoursMinutes(st.totalSeconds)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Threshold Configuration Card */}
      <ThresholdSettingCard currentThreshold={minStreakMinutes} />

      {/* First-visit empty state callout if no sessions have been logged */}
      {sessions.length === 0 && (
        <Card className="border-brand-200/60 dark:border-brand-900/40 bg-gradient-to-br from-white to-brand-50/20 dark:from-slate-900 dark:to-brand-950/20 text-center py-10 px-4">
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No focus sessions logged yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              StudyPilot does not generate placeholder statistics. Start your first study session in the timer to light up your heatmap and begin building your study streak!
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setCurrentTab('timer')}
                leftIcon={<Play className="w-4 h-4 fill-current" />}
              >
                Start First Study Session
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
