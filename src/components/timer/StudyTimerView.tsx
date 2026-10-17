import React, { useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { useStudy } from '../../context/StudyContext';
import { Card, CardHeader, CardTitle, CardDescription } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { formatSecondsToTimeString } from '../../domain/timerEngine';
import { requestNotificationPermission } from '../../utils/soundAndNotifications';
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  CheckCircle,
  Trash2,
  Clock,
  Plus,
  Check,
} from 'lucide-react';

export const StudyTimerView: React.FC = () => {
  const {
    timerState,
    activeSeconds,
    remainingSeconds,
    sessions,
    startStudy,
    pauseStudy,
    resumeStudy,
    endStudySession,
    discardStudySession,
    startBreak,
    skipBreak,
    setMode,
    setTargetDuration,
    setSelectedSubjectId,
    toggleSound,
    toggleNotification,
    deleteSession,
  } = useTimer();

  const { subjects, openCreateModal } = useStudy();

  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  const currentSubject =
    subjects.find((s) => s.id === timerState.selectedSubjectId) || subjects[0];

  const isStudying = timerState.phase === 'studying';
  const isPaused = timerState.phase === 'paused';
  const isBreak =
    timerState.phase === 'short_break' || timerState.phase === 'long_break';
  const isIdle = timerState.phase === 'idle';

  // Display time
  const displayTime =
    timerState.mode === 'pomodoro'
      ? isBreak
        ? formatSecondsToTimeString(remainingSeconds)
        : formatSecondsToTimeString(remainingSeconds)
      : formatSecondsToTimeString(activeSeconds);

  const handleStartOrResume = () => {
    if (isIdle) {
      startStudy(currentSubject?.id);
    } else if (isPaused) {
      resumeStudy();
    }
  };

  const handleEndSessionClick = () => {
    setIsEndModalOpen(true);
  };

  const handleConfirmEndSession = () => {
    const saved = endStudySession(sessionNotes);
    setIsEndModalOpen(false);
    setSessionNotes('');
    if (saved) {
      setSaveSuccessMessage(
        `Session saved! ${saved.activeDurationMinutes} mins added to ${saved.subjectName}.`
      );
      setTimeout(() => setSaveSuccessMessage(''), 5000);
    }
  };

  const handleDiscardClick = () => {
    if (
      window.confirm(
        'Discard current session? The elapsed time will not be recorded.'
      )
    ) {
      discardStudySession();
    }
  };

  const handleEnableNotification = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      toggleNotification();
    } else {
      alert('Browser notifications were blocked or not granted in browser settings.');
    }
  };

  // Preset minute buttons for Pomodoro
  const pomodoroPresets = [15, 25, 45, 60];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="primary" size="sm">
              Focus Engine
            </Badge>
            {isBreak && (
              <Badge variant="warning" size="sm">
                Break in progress
              </Badge>
            )}
            {isPaused && (
              <Badge variant="danger" size="sm">
                Paused (Not Counting)
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Study Timer
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track authentic focus sessions with timestamp accuracy. Pauses and breaks are never counted.
          </p>
        </div>

        {/* Audio & Notification Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
              timerState.isSoundEnabled
                ? 'bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-950/60 dark:border-brand-800 dark:text-brand-300'
                : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
            }`}
            title={timerState.isSoundEnabled ? 'Sound alerts enabled' : 'Sound alerts muted'}
          >
            {timerState.isSoundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={handleEnableNotification}
            className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
              timerState.isNotificationEnabled
                ? 'bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-950/60 dark:border-brand-800 dark:text-brand-300'
                : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
            }`}
            title={
              timerState.isNotificationEnabled
                ? 'Browser notifications enabled'
                : 'Click to enable notifications'
            }
          >
            {timerState.isNotificationEnabled ? (
              <Bell className="w-4 h-4" />
            ) : (
              <BellOff className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccessMessage && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{saveSuccessMessage}</span>
        </div>
      )}

      {/* Main Timer Display Card */}
      <Card className="flex flex-col items-center justify-center p-6 sm:p-12 text-center relative overflow-hidden">
        {/* Mode Selector Tabs (Pomodoro vs Continuous) */}
        {isIdle && (
          <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80 mb-8 border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setMode('pomodoro')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timerState.mode === 'pomodoro'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Pomodoro Mode
            </button>
            <button
              type="button"
              onClick={() => setMode('continuous')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timerState.mode === 'continuous'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Continuous Stopwatch
            </button>
          </div>
        )}

        {/* Subject Selector */}
        <div className="mb-6 w-full max-w-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Subject in Focus
          </label>
          {subjects.length > 0 ? (
            <div className="relative">
              <select
                value={currentSubject?.id || ''}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                disabled={!isIdle}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:opacity-80"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.code} — {sub.name} ({sub.dailyTargetHours}h daily goal)
                  </option>
                ))}
              </select>
              {currentSubject && (
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full ring-1 ring-white/20"
                  style={{ backgroundColor: currentSubject.color }}
                />
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={openCreateModal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add a Subject First
            </Button>
          )}
        </div>

        {/* Circular Clock Display with Phase Status */}
        <div className="relative my-4 flex h-64 w-64 sm:h-72 sm:w-72 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50/70 shadow-inner dark:border-slate-800 dark:bg-slate-900/60 transition-all">
          {/* Subtle colored accent ring */}
          <div
            className={`absolute inset-0 rounded-full border-4 transition-colors ${
              isBreak
                ? 'border-emerald-500/40'
                : isPaused
                ? 'border-amber-500/40'
                : isStudying
                ? 'border-brand-500/50'
                : 'border-transparent'
            }`}
          />

          <div className="text-center z-10 px-4">
            <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              {displayTime}
            </span>

            <div className="mt-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isBreak
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : isPaused
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : isStudying
                    ? 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {isBreak
                  ? timerState.phase === 'short_break'
                    ? 'Short Break'
                    : 'Long Break'
                  : isPaused
                  ? 'Paused (Paused time not counted)'
                  : isStudying
                  ? 'Active Focus'
                  : 'Ready to Study'}
              </span>
            </div>

            {currentSubject && (
              <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                {currentSubject.name}
              </p>
            )}
          </div>
        </div>

        {/* Duration Selectors for Pomodoro (when idle) */}
        {isIdle && timerState.mode === 'pomodoro' && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {pomodoroPresets.map((mins) => {
              const sec = mins * 60;
              const isSelected = timerState.targetDurationSeconds === sec;
              return (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTargetDuration(sec)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs dark:bg-brand-500'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {mins} mins
                </button>
              );
            })}
          </div>
        )}

        {/* Primary Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* If on Break */}
          {isBreak && (
            <>
              <Button
                size="lg"
                variant="primary"
                onClick={skipBreak}
                leftIcon={<Play className="w-5 h-5 fill-current" />}
              >
                End Break & Study
              </Button>
            </>
          )}

          {/* If Studying */}
          {isStudying && (
            <>
              <Button
                size="lg"
                variant="secondary"
                onClick={pauseStudy}
                leftIcon={<Pause className="w-5 h-5 fill-current" />}
              >
                Pause
              </Button>
              <Button
                size="lg"
                variant="primary"
                onClick={handleEndSessionClick}
                leftIcon={<Check className="w-5 h-5 stroke-[3]" />}
              >
                End & Save Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => startBreak('short_break')}
                leftIcon={<Coffee className="w-4 h-4" />}
              >
                Take Break
              </Button>
            </>
          )}

          {/* If Paused */}
          {isPaused && (
            <>
              <Button
                size="lg"
                variant="primary"
                onClick={resumeStudy}
                leftIcon={<Play className="w-5 h-5 fill-current" />}
              >
                Resume
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleEndSessionClick}
                leftIcon={<Check className="w-5 h-5 stroke-[3]" />}
              >
                Save Focus ({Math.round((activeSeconds / 60) * 10) / 10}m)
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={handleDiscardClick}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Discard
              </Button>
            </>
          )}

          {/* If Idle */}
          {isIdle && (
            <>
              <Button
                size="lg"
                variant="primary"
                onClick={handleStartOrResume}
                leftIcon={<Play className="w-5 h-5 fill-current" />}
                className="px-8 shadow-md text-base font-semibold"
              >
                Start Study Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => startBreak('short_break')}
                leftIcon={<Coffee className="w-4 h-4" />}
              >
                Short Break (5m)
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Recent Sessions List for Today */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <CardTitle className="text-base">Recorded Study Sessions</CardTitle>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'} logged
            </span>
          </div>
          <CardDescription>
            All completed focus intervals are backed by authentic timer sessions and immediately update your daily goal progress.
          </CardDescription>
        </CardHeader>

        {sessions.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
            No study sessions recorded yet today. Click "Start Study Session" to log your first focus block.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {sessions.map((sess) => {
              const startTimeFormatted = new Date(sess.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });
              const endTimeFormatted = new Date(sess.endTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={sess.id}
                  className="py-3.5 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-2xs"
                      style={{ backgroundColor: sess.subjectColor }}
                    >
                      {sess.subjectCode}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {sess.subjectName}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {startTimeFormatted} – {endTimeFormatted} • {sess.dateString}
                        {sess.notes && <span> • "{sess.notes}"</span>}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-base">
                      {sess.activeDurationMinutes} mins
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Delete this saved session?')) {
                          deleteSession(sess.id);
                        }
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* End Session Confirmation Modal */}
      <Modal
        isOpen={isEndModalOpen}
        onClose={() => setIsEndModalOpen(false)}
        title="Complete Study Session"
        description="Save your authentic focused time to update your daily goals."
      >
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Subject:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currentSubject?.name} ({currentSubject?.code})
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Active Focus Time:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {Math.round((activeSeconds / 60) * 10) / 10} minutes ({formatSecondsToTimeString(activeSeconds)})
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Paused / Break time:</span>
              <span>Excluded (0m added)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Session Notes <span className="text-slate-400 lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="e.g. Completed Chapter 4 exercises, reviewed formulas"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="ghost" onClick={() => setIsEndModalOpen(false)}>
              Keep Studying
            </Button>
            <Button variant="primary" onClick={handleConfirmEndSession}>
              Save Session Record
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
