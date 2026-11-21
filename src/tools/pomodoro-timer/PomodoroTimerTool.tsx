import React, { useState, useEffect, useCallback } from 'react';
import { ToolLayout } from '../common/ToolLayout';
import { Button } from '../../components/common/Button';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Sparkles,
  Coffee,
  Brain,
} from 'lucide-react';
import { cn } from '../../utils/cn';

type PomodoroPhase = 'focus' | 'short_break' | 'long_break';

interface PomodoroSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  soundEnabled: boolean;
}

const STORAGE_KEY = 'studypilot_tool_pomodoro_v1';

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  soundEnabled: true,
};

export const PomodoroTimerTool: React.FC = () => {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.settings) return parsed.settings;
      }
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [phase, setPhase] = useState<PomodoroPhase>('focus');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [totalFocusMinutesCompleted, setTotalFocusMinutesCompleted] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Time remaining in current phase (seconds)
  const getPhaseDurationSeconds = useCallback((p: PomodoroPhase, s: PomodoroSettings): number => {
    switch (p) {
      case 'focus':
        return s.focusMinutes * 60;
      case 'short_break':
        return s.shortBreakMinutes * 60;
      case 'long_break':
        return s.longBreakMinutes * 60;
    }
  }, []);

  const [secondsRemaining, setSecondsRemaining] = useState<number>(() =>
    getPhaseDurationSeconds('focus', settings)
  );

  // Web Audio Chime generator
  const playChime = useCallback(() => {
    if (!settings.soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [settings.soundEnabled]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ settings }));
    } catch {
      // fallback
    }
  }, [settings]);

  // Timer Tick Effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Phase Completed!
          playChime();

          if (phase === 'focus') {
            const nextCycles = completedCycles + 1;
            setCompletedCycles(nextCycles);
            setTotalFocusMinutesCompleted((m) => m + settings.focusMinutes);

            // Determine break type
            const nextPhase: PomodoroPhase =
              nextCycles % settings.longBreakInterval === 0 ? 'long_break' : 'short_break';
            setPhase(nextPhase);
            return getPhaseDurationSeconds(nextPhase, settings);
          } else {
            // Break finished -> back to focus
            setPhase('focus');
            return getPhaseDurationSeconds('focus', settings);
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isRunning,
    phase,
    completedCycles,
    settings,
    playChime,
    getPhaseDurationSeconds,
  ]);

  // Format MM:SS
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Progress Percentage
  const currentTotalSeconds = getPhaseDurationSeconds(phase, settings);
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(((currentTotalSeconds - secondsRemaining) / currentTotalSeconds) * 100))
  );

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(getPhaseDurationSeconds(phase, settings));
  };

  const handleSkipPhase = () => {
    setIsRunning(false);
    if (phase === 'focus') {
      const nextPhase: PomodoroPhase =
        (completedCycles + 1) % settings.longBreakInterval === 0 ? 'long_break' : 'short_break';
      setPhase(nextPhase);
      setSecondsRemaining(getPhaseDurationSeconds(nextPhase, settings));
    } else {
      setPhase('focus');
      setSecondsRemaining(getPhaseDurationSeconds('focus', settings));
    }
  };

  const handleSwitchPhase = (targetPhase: PomodoroPhase) => {
    setIsRunning(false);
    setPhase(targetPhase);
    setSecondsRemaining(getPhaseDurationSeconds(targetPhase, settings));
  };

  // Circular progress dimensions
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <ToolLayout
      title="Pomodoro Study Timer"
      metaTitle="Free Pomodoro Study Timer – 25/5 Focus & Break Intervals"
      description="Boost your study concentration with clean, customizable 25-minute focus intervals and restorative breaks. Audio chimes, streak cycle counters, and complete local privacy."
      canonicalUrl="https://thestudypilot.space/tools/pomodoro-timer"
      badge="Focus & Productivity"
      relatedArticleSlug="pomodoro-technique-vs-deep-work"
      relatedArticleTitle="Pomodoro Technique vs Deep Work: Which Is Better for Studying?"
      relatedResourceSlug="pomodoro-session-tracker"
      relatedResourceTitle="Pomodoro Focus Log (25-Minute Interval System)"
      keywords={[
        'pomodoro timer',
        'free study timer online',
        'pomodoro study technique',
        'focus timer for students',
        '25 minute study timer',
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Phase Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200/80 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          <button
            type="button"
            onClick={() => handleSwitchPhase('focus')}
            className={cn(
              'px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
              phase === 'focus'
                ? 'bg-brand-600 text-white shadow-xs dark:bg-brand-500'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            )}
          >
            <Brain className="w-4 h-4" />
            <span>Focus Session ({settings.focusMinutes}m)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchPhase('short_break')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
              phase === 'short_break'
                ? 'bg-emerald-600 text-white shadow-xs dark:bg-emerald-500'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            )}
          >
            <Coffee className="w-4 h-4" />
            <span>Short Break ({settings.shortBreakMinutes}m)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchPhase('long_break')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2',
              phase === 'long_break'
                ? 'bg-indigo-600 text-white shadow-xs dark:bg-indigo-500'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            )}
          >
            <Sparkles className="w-4 h-4" />
            <span>Long Break ({settings.longBreakMinutes}m)</span>
          </button>
        </div>

        {/* Circular Timer Visual Display */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 dark:border-slate-800 dark:bg-slate-900 shadow-sm text-center relative overflow-hidden">
          <div className="relative inline-flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-72 h-72 sm:w-80 sm:h-80 -rotate-90 transform">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                className={cn(
                  'transition-all duration-500 ease-linear',
                  phase === 'focus'
                    ? 'stroke-brand-600 dark:stroke-brand-500'
                    : phase === 'short_break'
                    ? 'stroke-emerald-500'
                    : 'stroke-indigo-500'
                )}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {phase === 'focus' ? 'Deep Work Focus' : phase === 'short_break' ? 'Short Recovery' : 'Restorative Long Break'}
              </span>

              <div className="text-5xl sm:text-6xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                {formatTime(secondsRemaining)}
              </div>

              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Cycle #{completedCycles + 1} • {progressPercent}% elapsed
              </div>
            </div>
          </div>

          {/* Primary Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {!isRunning ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handleStart}
                className="px-8 font-bold shadow-lg shadow-brand-500/20 text-base"
                leftIcon={<Play className="w-5 h-5 fill-current" />}
              >
                Start Focus
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handlePause}
                className="px-8 font-bold shadow-lg shadow-brand-500/20 text-base bg-amber-500 hover:bg-amber-600 border-amber-600"
                leftIcon={<Pause className="w-5 h-5 fill-current" />}
              >
                Pause
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              title="Reset current interval"
              className="p-3"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSkipPhase}
              title="Skip to next phase"
              className="p-3"
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
              title={settings.soundEnabled ? 'Mute chime' : 'Enable chime'}
              className="p-3"
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowSettings(!showSettings)}
              title="Timer Settings"
              className="p-3"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Collapsible Settings Panel */}
        {showSettings && (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Custom Interval Settings</span>
              <button
                type="button"
                onClick={() => setSettings(DEFAULT_SETTINGS)}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
              >
                Restore Defaults (25 / 5 / 15)
              </button>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">Focus (min)</label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={settings.focusMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 25;
                    setSettings((s) => ({ ...s, focusMinutes: val }));
                    if (phase === 'focus' && !isRunning) setSecondsRemaining(val * 60);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Short Break (min)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreakMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 5;
                    setSettings((s) => ({ ...s, shortBreakMinutes: val }));
                    if (phase === 'short_break' && !isRunning) setSecondsRemaining(val * 60);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Long Break (min)</label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={settings.longBreakMinutes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 15;
                    setSettings((s) => ({ ...s, longBreakMinutes: val }));
                    if (phase === 'long_break' && !isRunning) setSecondsRemaining(val * 60);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Long Break Every</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={settings.longBreakInterval}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, longBreakInterval: parseInt(e.target.value) || 4 }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 font-mono dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Cycle & Milestone Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Sprints</span>
            <p className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 font-mono mt-0.5">
              {completedCycles}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Net Focus</span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {totalFocusMinutesCompleted}m
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next Long Break</span>
            <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
              in {settings.longBreakInterval - (completedCycles % settings.longBreakInterval)} cycles
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PomodoroTimerTool;
