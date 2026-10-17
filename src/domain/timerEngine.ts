import { ActiveTimerState, StudySession } from '../types';

export const DEFAULT_POMODORO_FOCUS_SECONDS = 25 * 60; // 25 mins
export const DEFAULT_SHORT_BREAK_SECONDS = 5 * 60;     // 5 mins
export const DEFAULT_LONG_BREAK_SECONDS = 15 * 60;     // 15 mins

export function createInitialTimerState(subjectId: string = ''): ActiveTimerState {
  return {
    phase: 'idle',
    mode: 'pomodoro',
    selectedSubjectId: subjectId,
    targetDurationSeconds: DEFAULT_POMODORO_FOCUS_SECONDS,
    pomodoroCycle: 1,
    sessionStartTimestamp: null,
    lastResumeTimestamp: null,
    accumulatedFocusSeconds: 0,
    breakStartTimestamp: null,
    accumulatedBreakSeconds: 0,
    isSoundEnabled: true,
    isNotificationEnabled: false,
  };
}

/**
 * Calculates accurate active study time using real-world timestamps.
 * Crucial: Paused periods and break periods are strictly excluded.
 */
export function calculateActiveElapsedSeconds(
  state: ActiveTimerState,
  currentTimestamp: number
): number {
  if (state.phase === 'studying' && state.lastResumeTimestamp !== null) {
    const liveChunk = Math.max(
      0,
      Math.floor((currentTimestamp - state.lastResumeTimestamp) / 1000)
    );
    return state.accumulatedFocusSeconds + liveChunk;
  }
  return state.accumulatedFocusSeconds;
}

/**
 * Calculates break elapsed seconds. Strictly separated from study time.
 */
export function calculateBreakElapsedSeconds(
  state: ActiveTimerState,
  currentTimestamp: number
): number {
  if (
    (state.phase === 'short_break' || state.phase === 'long_break') &&
    state.breakStartTimestamp !== null
  ) {
    const liveChunk = Math.max(
      0,
      Math.floor((currentTimestamp - state.breakStartTimestamp) / 1000)
    );
    return state.accumulatedBreakSeconds + liveChunk;
  }
  return state.accumulatedBreakSeconds;
}

export function startStudySession(
  state: ActiveTimerState,
  subjectId: string,
  currentTimestamp: number
): ActiveTimerState {
  // If already studying, avoid duplicate start
  if (state.phase === 'studying') {
    return state;
  }

  return {
    ...state,
    phase: 'studying',
    selectedSubjectId: subjectId || state.selectedSubjectId,
    sessionStartTimestamp: state.sessionStartTimestamp ?? currentTimestamp,
    lastResumeTimestamp: currentTimestamp,
    accumulatedFocusSeconds: state.phase === 'paused' ? state.accumulatedFocusSeconds : 0,
    breakStartTimestamp: null,
    accumulatedBreakSeconds: 0,
  };
}

export function pauseStudySession(
  state: ActiveTimerState,
  currentTimestamp: number
): ActiveTimerState {
  if (state.phase !== 'studying') {
    return state;
  }

  const liveActive = calculateActiveElapsedSeconds(state, currentTimestamp);

  return {
    ...state,
    phase: 'paused',
    lastResumeTimestamp: null,
    accumulatedFocusSeconds: liveActive,
  };
}

export function resumeStudySession(
  state: ActiveTimerState,
  currentTimestamp: number
): ActiveTimerState {
  if (state.phase !== 'paused') {
    return state;
  }

  return {
    ...state,
    phase: 'studying',
    lastResumeTimestamp: currentTimestamp,
  };
}

export function startBreakPeriod(
  state: ActiveTimerState,
  breakType: 'short_break' | 'long_break',
  currentTimestamp: number
): ActiveTimerState {
  // Freeze any active study time before switching into break
  const activeSoFar = calculateActiveElapsedSeconds(state, currentTimestamp);

  return {
    ...state,
    phase: breakType,
    lastResumeTimestamp: null,
    accumulatedFocusSeconds: activeSoFar,
    breakStartTimestamp: currentTimestamp,
    accumulatedBreakSeconds: 0,
  };
}

export function endBreakPeriod(state: ActiveTimerState): ActiveTimerState {
  return {
    ...state,
    phase: 'idle',
    breakStartTimestamp: null,
    accumulatedBreakSeconds: 0,
    pomodoroCycle: state.pomodoroCycle + 1,
  };
}

export function resetTimerState(
  state: ActiveTimerState,
  subjectId?: string
): ActiveTimerState {
  return {
    ...createInitialTimerState(subjectId || state.selectedSubjectId),
    mode: state.mode,
    targetDurationSeconds: state.targetDurationSeconds,
    isSoundEnabled: state.isSoundEnabled,
    isNotificationEnabled: state.isNotificationEnabled,
  };
}

/**
 * Creates an immutable StudySession record.
 * Guarantees that only active study time is counted.
 */
export function createCompletedStudySession(
  state: ActiveTimerState,
  subject: { id: string; name: string; code: string; color: string },
  currentTimestamp: number,
  notes?: string
): StudySession {
  const finalActiveSeconds = calculateActiveElapsedSeconds(state, currentTimestamp);
  const startTime = new Date(
    state.sessionStartTimestamp || currentTimestamp - finalActiveSeconds * 1000
  ).toISOString();
  const endTime = new Date(currentTimestamp).toISOString();

  // Local calendar date (YYYY-MM-DD)
  const localDate = new Date(currentTimestamp);
  const dateString = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(localDate.getDate()).padStart(2, '0')}`;

  return {
    id: 'sess_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    subjectId: subject.id,
    subjectName: subject.name,
    subjectCode: subject.code,
    subjectColor: subject.color,
    startTime,
    endTime,
    activeDurationSeconds: finalActiveSeconds,
    activeDurationMinutes: Math.round((finalActiveSeconds / 60) * 10) / 10,
    dateString,
    mode: state.mode,
    notes: notes?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Formats seconds into HH:MM:SS or MM:SS
 */
export function formatSecondsToTimeString(totalSeconds: number): string {
  const safeSec = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSec / 3600);
  const minutes = Math.floor((safeSec % 3600) / 60);
  const seconds = safeSec % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
