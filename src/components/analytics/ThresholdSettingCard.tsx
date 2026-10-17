import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { useStudy } from '../../context/StudyContext';
import { Sliders, Info } from 'lucide-react';

interface ThresholdSettingCardProps {
  currentThreshold: number;
}

export const ThresholdSettingCard: React.FC<ThresholdSettingCardProps> = ({
  currentThreshold,
}) => {
  const { plan, completeOnboarding, subjects } = useStudy();

  const thresholdOptions = [
    { minutes: 15, label: '15m', desc: 'Light / Micro-study' },
    { minutes: 30, label: '30m', desc: 'Standard Block' },
    { minutes: 45, label: '45m', desc: 'Focused Session' },
    { minutes: 60, label: '60m (Default)', desc: 'Recommended Standard' },
    { minutes: 90, label: '90m', desc: 'Intensive Goal' },
    { minutes: 120, label: '120m (2h)', desc: 'High Intensity' },
  ];

  const handleSelectThreshold = (mins: number) => {
    if (!plan) return;
    const updatedPlan = {
      ...plan,
      minStreakMinutes: mins,
    };
    completeOnboarding(updatedPlan, subjects);
  };

  return (
    <Card className="border-slate-200/80 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Daily Streak & Heatmap Threshold
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active daily study minutes required for a calendar day to qualify toward streaks
            </p>
          </div>
        </div>

        <Badge variant="primary" size="sm" className="self-start sm:self-auto font-bold">
          Current: {currentThreshold} mins / day
        </Badge>
      </div>

      <div className="py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {thresholdOptions.map((opt) => {
            const isSelected = currentThreshold === opt.minutes;

            return (
              <button
                key={opt.minutes}
                type="button"
                onClick={() => handleSelectThreshold(opt.minutes)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/60 dark:border-brand-500 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-black ${
                      isSelected
                        ? 'text-brand-700 dark:text-brand-300'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {opt.label}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400" />
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 truncate">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Explanatory Data Integrity Note */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <Info className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Data Integrity Guarantee:</strong> Changing the threshold dynamically recalculates historical streaks, heatmap qualifying dots, and consistency rates under the new threshold. Your actual saved study-session intervals are <strong>never altered, deleted, or rewritten</strong>.
          </p>
        </div>
      </div>
    </Card>
  );
};
