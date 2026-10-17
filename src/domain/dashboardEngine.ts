import { ActiveTimerState, StudySession, Subject } from '../types';
import { calculateActiveElapsedSeconds } from './timerEngine';

export interface SubjectDailyMetric {
  subjectId: string;
  name: string;
  code: string;
  color: string;
  dailyTargetHours: number;
  dailyTargetSeconds: number;
  studiedSecondsToday: number;
  studiedHoursToday: number;
  remainingSeconds: number;
  remainingHours: number;
  completionPercentage: number;
  isTargetMet: boolean;
}

export interface DailyDashboardMetrics {
  targetHours: number;
  targetSeconds: number;
  studiedSecondsToday: number;
  studiedHoursToday: number;
  remainingSeconds: number;
  remainingHours: number;
  completionPercentage: number;
  isTargetMet: boolean;
  completedSubjectTargetsCount: number;
  totalSubjectsCount: number;
  subjectMetrics: SubjectDailyMetric[];
  hasActiveSession: boolean;
  activeSubjectId: string | null;
}

/**
 * Returns the local start-of-day and end-of-day epoch timestamps for a given date.
 */
export function getDayBoundaries(targetDate: Date): {
  startOfDayMs: number;
  endOfDayMs: number;
  dateString: string;
} {
  const d = new Date(targetDate);
  d.setHours(0, 0, 0, 0);
  const startOfDayMs = d.getTime();

  d.setHours(23, 59, 59, 999);
  const endOfDayMs = d.getTime();

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  return { startOfDayMs, endOfDayMs, dateString };
}

/**
 * Calculates the exact active study seconds belonging to a specific calendar date.
 * Handles sessions that span across midnight by partitioning active time proportionally.
 */
export function getSessionActiveSecondsOnDate(
  session: StudySession,
  targetDate: Date
): number {
  if (session.activeDurationSeconds <= 0) return 0;

  const { startOfDayMs, endOfDayMs, dateString } = getDayBoundaries(targetDate);

  const startMs = new Date(session.startTime).getTime();
  const endMs = new Date(session.endTime).getTime();

  // If the session has a dateString that matches and start/end are on the same day
  if (session.dateString === dateString && endMs <= endOfDayMs && startMs >= startOfDayMs) {
    return session.activeDurationSeconds;
  }

  // Check if session interval overlaps with the target day [startOfDayMs, endOfDayMs]
  const overlapStart = Math.max(startMs, startOfDayMs);
  const overlapEnd = Math.min(endMs, endOfDayMs);

  if (overlapEnd <= overlapStart) {
    return 0; // No overlap with this calendar date
  }

  const overlapMs = overlapEnd - overlapStart;
  const totalSpanMs = Math.max(1, endMs - startMs);

  // Allocate active seconds based on the portion of elapsed time falling on this day
  const allocatedSeconds = Math.round(
    session.activeDurationSeconds * (overlapMs / totalSpanMs)
  );

  return Math.min(session.activeDurationSeconds, Math.max(0, allocatedSeconds));
}

/**
 * Calculates the active seconds of an in-progress or paused timer that belong to targetDate.
 */
export function getLiveActiveSecondsOnDate(
  state: ActiveTimerState,
  targetDate: Date,
  currentTimestamp: number
): number {
  if (state.phase !== 'studying' && state.phase !== 'paused') {
    return 0;
  }

  const liveActiveTotal = calculateActiveElapsedSeconds(state, currentTimestamp);
  if (liveActiveTotal <= 0) return 0;

  const { startOfDayMs, endOfDayMs } = getDayBoundaries(targetDate);
  const sessionStartMs = state.sessionStartTimestamp || currentTimestamp;

  // Normal case: session started today and current time is today
  if (sessionStartMs >= startOfDayMs && currentTimestamp <= endOfDayMs) {
    return liveActiveTotal;
  }

  // Midnight crossing active session
  const overlapStart = Math.max(sessionStartMs, startOfDayMs);
  const overlapEnd = Math.min(currentTimestamp, endOfDayMs);

  if (overlapEnd <= overlapStart) {
    return 0;
  }

  const overlapMs = overlapEnd - overlapStart;
  const totalSpanMs = Math.max(1, currentTimestamp - sessionStartMs);

  const allocatedSeconds = Math.round(liveActiveTotal * (overlapMs / totalSpanMs));
  return Math.min(liveActiveTotal, Math.max(0, allocatedSeconds));
}

/**
 * Pure calculation engine for daily dashboard metrics.
 * Combines completed sessions + live active timer without double counting.
 */
export function calculateDailyProgress(params: {
  subjects: Subject[];
  completedSessions: StudySession[];
  activeTimerState: ActiveTimerState;
  targetDate: Date;
  dailyGoalHours?: number;
  currentTimestamp?: number;
}): DailyDashboardMetrics {
  const {
    subjects,
    completedSessions,
    activeTimerState,
    targetDate,
    dailyGoalHours,
    currentTimestamp = Date.now(),
  } = params;

  // 1. Calculate active seconds from completed sessions for target date
  let totalCompletedSecondsToday = 0;
  const completedSecondsPerSubject: Record<string, number> = {};
  for (const s of subjects) {
    completedSecondsPerSubject[s.id] = 0;
  }

  for (const session of completedSessions) {
    const activeSecOnDay = getSessionActiveSecondsOnDate(session, targetDate);
    if (activeSecOnDay > 0) {
      totalCompletedSecondsToday += activeSecOnDay;
      completedSecondsPerSubject[session.subjectId] =
        (completedSecondsPerSubject[session.subjectId] || 0) + activeSecOnDay;
    }
  }

  // 2. Add uncommitted live active timer seconds (strictly to the selected subject)
  const isTimerActive =
    activeTimerState.phase === 'studying' || activeTimerState.phase === 'paused';
  const liveActiveSeconds = getLiveActiveSecondsOnDate(
    activeTimerState,
    targetDate,
    currentTimestamp
  );

  const liveSubjectId =
    isTimerActive && liveActiveSeconds > 0
      ? activeTimerState.selectedSubjectId
      : null;

  let totalLiveSecondsToday = 0;
  if (liveSubjectId && liveActiveSeconds > 0) {
    totalLiveSecondsToday = liveActiveSeconds;
    completedSecondsPerSubject[liveSubjectId] =
      (completedSecondsPerSubject[liveSubjectId] || 0) + liveActiveSeconds;
  }

  const totalStudiedSecondsToday = totalCompletedSecondsToday + totalLiveSecondsToday;

  // 3. Build Subject Metrics
  const subjectMetrics: SubjectDailyMetric[] = subjects.map((sub) => {
    const studiedSec = completedSecondsPerSubject[sub.id] || 0;

    const targetSec = Math.round(sub.dailyTargetHours * 3600);
    const studiedHours = Math.round((studiedSec / 3600) * 10) / 10;
    const remainingSec = Math.max(0, targetSec - studiedSec);
    const remainingHours = Math.max(0, Math.round((sub.dailyTargetHours - studiedHours) * 10) / 10);
    const percent =
      targetSec > 0 ? Math.min(100, Math.round((studiedSec / targetSec) * 100)) : 0;

    return {
      subjectId: sub.id,
      name: sub.name,
      code: sub.code,
      color: sub.color,
      dailyTargetHours: sub.dailyTargetHours,
      dailyTargetSeconds: targetSec,
      studiedSecondsToday: studiedSec,
      studiedHoursToday: studiedHours,
      remainingSeconds: remainingSec,
      remainingHours: remainingHours,
      completionPercentage: percent,
      isTargetMet: studiedSec >= targetSec && targetSec > 0,
    };
  });

  // 4. Overall Daily Target Calculation
  const totalTargetHours =
    dailyGoalHours !== undefined && dailyGoalHours > 0
      ? dailyGoalHours
      : subjects.reduce((sum, s) => sum + s.dailyTargetHours, 0);

  const totalTargetSeconds = Math.round(totalTargetHours * 3600);
  const totalStudiedHoursToday =
    Math.round((totalStudiedSecondsToday / 3600) * 10) / 10;
  const overallRemainingSeconds = Math.max(
    0,
    totalTargetSeconds - totalStudiedSecondsToday
  );
  const overallRemainingHours = Math.max(
    0,
    Math.round((totalTargetHours - totalStudiedHoursToday) * 10) / 10
  );
  const overallPercentage =
    totalTargetSeconds > 0
      ? Math.min(
          100,
          Math.round((totalStudiedSecondsToday / totalTargetSeconds) * 100)
        )
      : 0;

  const completedTargetsCount = subjectMetrics.filter((m) => m.isTargetMet).length;

  return {
    targetHours: totalTargetHours,
    targetSeconds: totalTargetSeconds,
    studiedSecondsToday: totalStudiedSecondsToday,
    studiedHoursToday: totalStudiedHoursToday,
    remainingSeconds: overallRemainingSeconds,
    remainingHours: overallRemainingHours,
    completionPercentage: overallPercentage,
    isTargetMet:
      totalStudiedSecondsToday >= totalTargetSeconds && totalTargetSeconds > 0,
    completedSubjectTargetsCount: completedTargetsCount,
    totalSubjectsCount: subjects.length,
    subjectMetrics,
    hasActiveSession: isTimerActive && liveActiveSeconds > 0,
    activeSubjectId: liveSubjectId,
  };
}

/**
 * Formats duration into human-readable hours and minutes (e.g., "2h 30m" or "45m").
 */
export function formatDurationHoursMinutes(totalSeconds: number): string {
  const safeSec = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSec / 3600);
  const minutes = Math.floor((safeSec % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  return `${minutes}m`;
}
