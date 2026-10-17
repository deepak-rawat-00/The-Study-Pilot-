import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useStudy } from '../../context/StudyContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Sun, Moon, Monitor, Trash2, CheckCircle2, Sliders, Target } from 'lucide-react';
import { ThresholdSettingCard } from '../analytics/ThresholdSettingCard';
import { Theme } from '../../types';

export const SettingsView: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { subjects, plan, startOnboarding, resetAllData } = useStudy();

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all StudyPilot data? This will clear all stored subjects and the study plan, returning you to the welcome setup.'
      )
    ) {
      resetAllData();
    }
  };

  const themeOptions: { id: Theme; title: string; desc: string; icon: React.ElementType }[] = [
    {
      id: 'light',
      title: 'Light Theme',
      desc: 'Clean, high-contrast light mode designed for daytime study.',
      icon: Sun,
    },
    {
      id: 'dark',
      title: 'Dark Theme',
      desc: 'Soft, deep slate interface designed for low-light night study.',
      icon: Moon,
    },
    {
      id: 'system',
      title: 'System Theme',
      desc: 'Automatically synchronizes with your operating system preference.',
      icon: Monitor,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Customize your study workspace appearance, reconfigure goals, and manage local data.
        </p>
      </div>

      {/* Active Plan Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <CardTitle className="text-base">Current Study Plan</CardTitle>
          </div>
          <CardDescription>
            {plan ? (
              <span>Active Target: <strong>{plan.examName}</strong> ({plan.categoryLabel}) • Daily Goal: {plan.dailyTargetHours} hours</span>
            ) : (
              <span>No custom plan configured yet.</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Reconfigure Subjects & Daily Allocations
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Change your exam category, add or remove subjects, or adjust target hours anytime.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={startOnboarding}
              leftIcon={<Sliders className="w-4 h-4" />}
            >
              Reconfigure Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Streak & Consistency Threshold Configuration */}
      <ThresholdSettingCard currentThreshold={plan?.minStreakMinutes || 60} />

      {/* Theme Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Appearance & Theme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={`relative flex flex-col items-start p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/50 shadow-sm ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex w-full items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected
                        ? 'bg-brand-600 text-white dark:bg-brand-500'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  )}
                </div>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {opt.title}
                </span>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Local Storage & Data Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-600" />
            <CardTitle className="text-base text-rose-600 dark:text-rose-400">
              Data Management
            </CardTitle>
          </div>
          <CardDescription>
            The Study Pilot runs 100% locally on your browser. No external cloud accounts or tracking cookies are used.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Stored Subjects: {subjects.length}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Resetting will clear all stored subjects and restore the welcome setup flow.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={handleResetData}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Reset All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
