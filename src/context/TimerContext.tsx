import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { ActiveTimerState, StudySession, TimerMode } from '../types';
import {
  createInitialTimerState,
  calculateActiveElapsedSeconds,
  calculateBreakElapsedSeconds,
  startStudySession,
  pauseStudySession,
  resumeStudySession,
  startBreakPeriod,
  endBreakPeriod,
  resetTimerState,
  createCompletedStudySession,
  DEFAULT_POMODORO_FOCUS_SECONDS,
  DEFAULT_SHORT_BREAK_SECONDS,
  DEFAULT_LONG_BREAK_SECONDS,
} from '../domain/timerEngine';
import { soundService, sendTimerNotification } from '../utils/soundAndNotifications';
import { useStudy } from './StudyContext';

interface TimerContextType {
  timerState: ActiveTimerState;
  activeSeconds: number;
  breakSeconds: number;
  targetDurationSeconds: number;
  remainingSeconds: number;
  progressPercentage: number;
  sessions: StudySession[];
  startStudy: (subjectId?: string) => void;
  pauseStudy: () => void;
  resumeStudy: () => void;
  endStudySession: (notes?: string) => StudySession | null;
  discardStudySession: () => void;
  startBreak: (type: 'short_break' | 'long_break') => void;
  skipBreak: () => void;
  setMode: (mode: TimerMode) => void;
  setTargetDuration: (seconds: number) => void;
  setSelectedSubjectId: (subjectId: string) => void;
  toggleSound: () => void;
  toggleNotification: () => void;
  deleteSession: (id: string) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const TIMER_STORAGE_KEY = 'studypilot_timer_state_v1';
const SESSIONS_STORAGE_KEY = 'studypilot_sessions_v1';

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { subjects } = useStudy();

  // Load sessions from localStorage
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load study sessions', e);
    }
    return [];
  });

  // Load active timer state from localStorage
  const [timerState, setTimerState] = useState<ActiveTimerState>(() => {
    try {
      const stored = localStorage.getItem(TIMER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ActiveTimerState;
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load timer state', e);
    }
    return createInitialTimerState(subjects[0]?.id || '');
  });

  const [activeSeconds, setActiveSeconds] = useState<number>(() =>
    calculateActiveElapsedSeconds(timerState, Date.now())
  );
  const [breakSeconds, setBreakSeconds] = useState<number>(() =>
    calculateBreakElapsedSeconds(timerState, Date.now())
  );

  // Double-save prevention lock
  const isSavingRef = useRef(false);

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions', e);
    }
  }, [sessions]);

  // Sync timer state to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerState));
    } catch (e) {
      console.error('Failed to persist timer state', e);
    }
  }, [timerState]);

  // If initial subject wasn't set and subjects become available, update selectedSubjectId
  useEffect(() => {
    if (!timerState.selectedSubjectId && subjects.length > 0) {
      setTimerState((prev) => ({ ...prev, selectedSubjectId: subjects[0].id }));
    }
  }, [subjects, timerState.selectedSubjectId]);

  // Real-time tick effect (250ms interval for smooth UI and immediate timestamp updates)
  useEffect(() => {
    const isTicking =
      timerState.phase === 'studying' ||
      timerState.phase === 'short_break' ||
      timerState.phase === 'long_break';

    if (!isTicking) {
      setActiveSeconds(calculateActiveElapsedSeconds(timerState, Date.now()));
      setBreakSeconds(calculateBreakElapsedSeconds(timerState, Date.now()));
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const currentActive = calculateActiveElapsedSeconds(timerState, now);
      const currentBreak = calculateBreakElapsedSeconds(timerState, now);
      setActiveSeconds(currentActive);
      setBreakSeconds(currentBreak);

      // Check if Pomodoro target is reached
      if (
        timerState.mode === 'pomodoro' &&
        timerState.phase === 'studying' &&
        timerState.targetDurationSeconds > 0 &&
        currentActive >= timerState.targetDurationSeconds
      ) {
        if (timerState.isSoundEnabled) {
          soundService.playChime();
        }
        if (timerState.isNotificationEnabled) {
          sendTimerNotification(
            'Focus Session Completed! 🎉',
            `Great work! You reached your ${Math.round(
              timerState.targetDurationSeconds / 60
            )}m study goal. Time to take a break or save your session.`
          );
        }
      }

      // Check if break target is reached
      const breakTarget =
        timerState.phase === 'short_break'
          ? DEFAULT_SHORT_BREAK_SECONDS
          : DEFAULT_LONG_BREAK_SECONDS;
      if (
        (timerState.phase === 'short_break' || timerState.phase === 'long_break') &&
        currentBreak >= breakTarget
      ) {
        if (timerState.isSoundEnabled) {
          soundService.playChime();
        }
        if (timerState.isNotificationEnabled) {
          sendTimerNotification(
            'Break Ended ☕',
            'Your break is complete! Ready to start your next study interval?'
          );
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [timerState]);

  const startStudy = useCallback((subjectId?: string) => {
    const targetSubjectId = subjectId || timerState.selectedSubjectId || subjects[0]?.id || '';
    setTimerState((prev) => startStudySession(prev, targetSubjectId, Date.now()));
  }, [timerState.selectedSubjectId, subjects]);

  const pauseStudy = useCallback(() => {
    setTimerState((prev) => pauseStudySession(prev, Date.now()));
  }, []);

  const resumeStudy = useCallback(() => {
    setTimerState((prev) => resumeStudySession(prev, Date.now()));
  }, []);

  const startBreak = useCallback((type: 'short_break' | 'long_break') => {
    setTimerState((prev) => startBreakPeriod(prev, type, Date.now()));
  }, []);

  const skipBreak = useCallback(() => {
    setTimerState((prev) => endBreakPeriod(prev));
  }, []);

  const endStudySession = useCallback((notes?: string): StudySession | null => {
    if (isSavingRef.current) return null; // Mutex lock prevents duplicate saves
    isSavingRef.current = true;

    try {
      const now = Date.now();
      const currentActive = calculateActiveElapsedSeconds(timerState, now);

      // Even if short, save the record accurately
      const activeSub =
        subjects.find((s) => s.id === timerState.selectedSubjectId) ||
        subjects[0] || {
          id: 'general',
          name: 'General Study',
          code: 'GEN',
          color: '#6366f1',
        };

      const newSession = createCompletedStudySession(timerState, activeSub, now, notes);

      // Only record if at least 5 seconds were studied to avoid phantom clicks
      if (currentActive >= 5) {
        setSessions((prev) => [newSession, ...prev]);
        if (timerState.isSoundEnabled) {
          soundService.playChime();
        }
      }

      // Reset timer back to idle
      setTimerState((prev) => resetTimerState(prev));
      setActiveSeconds(0);
      setBreakSeconds(0);

      return newSession;
    } finally {
      setTimeout(() => {
        isSavingRef.current = false;
      }, 500);
    }
  }, [timerState, subjects]);

  const discardStudySession = useCallback(() => {
    setTimerState((prev) => resetTimerState(prev));
    setActiveSeconds(0);
    setBreakSeconds(0);
  }, []);

  const setMode = useCallback((mode: TimerMode) => {
    setTimerState((prev) => ({
      ...prev,
      mode,
      targetDurationSeconds:
        mode === 'pomodoro' ? DEFAULT_POMODORO_FOCUS_SECONDS : 0,
    }));
  }, []);

  const setTargetDuration = useCallback((seconds: number) => {
    setTimerState((prev) => ({ ...prev, targetDurationSeconds: seconds }));
  }, []);

  const setSelectedSubjectId = useCallback((subjectId: string) => {
    setTimerState((prev) => ({ ...prev, selectedSubjectId: subjectId }));
  }, []);

  const toggleSound = useCallback(() => {
    setTimerState((prev) => {
      const nextVal = !prev.isSoundEnabled;
      if (nextVal) soundService.playChime(0.2);
      return { ...prev, isSoundEnabled: nextVal };
    });
  }, []);

  const toggleNotification = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isNotificationEnabled: !prev.isNotificationEnabled,
    }));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Compute remaining seconds and progress percentage
  const targetDurationSeconds = timerState.targetDurationSeconds;
  const isBreak =
    timerState.phase === 'short_break' || timerState.phase === 'long_break';
  const currentElapsed = isBreak ? breakSeconds : activeSeconds;
  const currentTarget = isBreak
    ? timerState.phase === 'short_break'
      ? DEFAULT_SHORT_BREAK_SECONDS
      : DEFAULT_LONG_BREAK_SECONDS
    : targetDurationSeconds;

  const remainingSeconds =
    currentTarget > 0 ? Math.max(0, currentTarget - currentElapsed) : currentElapsed;

  const progressPercentage =
    currentTarget > 0
      ? Math.min(100, Math.round((currentElapsed / currentTarget) * 100))
      : 0;

  return (
    <TimerContext.Provider
      value={{
        timerState,
        activeSeconds,
        breakSeconds,
        targetDurationSeconds,
        remainingSeconds,
        progressPercentage,
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
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
