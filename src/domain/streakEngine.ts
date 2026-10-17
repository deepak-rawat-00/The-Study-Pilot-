import { StudySession, StreakResult } from '../types';
import { getDayBoundaries, getSessionActiveSecondsOnDate } from './dashboardEngine';

/**
 * Pure calculation engine for study streaks.
 * Strict active focus threshold, calendar boundaries, and zero fake stats.
 */
export function calculateStudyStreaks(params: {
  sessions: StudySession[];
  minStreakMinutes?: number;
  referenceDate?: Date;
}): StreakResult {
  const {
    sessions,
    minStreakMinutes = 60,
    referenceDate = new Date(),
  } = params;

  const thresholdSeconds = Math.max(1, minStreakMinutes) * 60;

  // 1. Build daily active seconds map across all sessions
  const historyMap: Record<string, number> = {};
  let totalStudySeconds = 0;

  for (const session of sessions) {
    if (session.activeDurationSeconds <= 0) continue;
    totalStudySeconds += session.activeDurationSeconds;

    // Check session start and end dates
    const startDate = new Date(session.startTime);
    const endDate = new Date(session.endTime);

    // Collect dates that might overlap
    const datesToCheck: string[] = [];
    const cur = new Date(startDate);
    cur.setHours(0, 0, 0, 0);
    const endBoundary = new Date(endDate);
    endBoundary.setHours(23, 59, 59, 999);

    while (cur.getTime() <= endBoundary.getTime()) {
      const year = cur.getFullYear();
      const month = String(cur.getMonth() + 1).padStart(2, '0');
      const day = String(cur.getDate()).padStart(2, '0');
      datesToCheck.push(`${year}-${month}-${day}`);
      cur.setDate(cur.getDate() + 1);
    }

    for (const dStr of datesToCheck) {
      const d = new Date(dStr + 'T12:00:00');
      const activeSecOnDay = getSessionActiveSecondsOnDate(session, d);
      if (activeSecOnDay > 0) {
        historyMap[dStr] = (historyMap[dStr] || 0) + activeSecOnDay;
      }
    }
  }

  const totalStudyHours = Math.round((totalStudySeconds / 3600) * 10) / 10;

  // 2. Identify qualified dates meeting the threshold
  const qualifiedDates = Object.keys(historyMap)
    .filter((dStr) => (historyMap[dStr] || 0) >= thresholdSeconds)
    .sort();

  const qualifiedSet = new Set(qualifiedDates);
  const totalActiveDays = qualifiedDates.length;

  const lastSuccessfulStudyDate =
    qualifiedDates.length > 0 ? qualifiedDates[qualifiedDates.length - 1] : null;

  let daysSinceLastStudy: number | null = null;
  if (lastSuccessfulStudyDate) {
    const lastDate = new Date(lastSuccessfulStudyDate + 'T00:00:00');
    const refMidnight = new Date(referenceDate);
    refMidnight.setHours(0, 0, 0, 0);
    const diffMs = refMidnight.getTime() - lastDate.getTime();
    daysSinceLastStudy = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  }

  // 3. Compute Total Missed Days
  // Eligible period starts at the first recorded session date and goes up to yesterday (or today if today qualified)
  let totalMissedDays = 0;
  const recordedDates = Object.keys(historyMap).sort();
  if (recordedDates.length > 0) {
    const firstDate = new Date(recordedDates[0] + 'T00:00:00');
    const todayMidnight = new Date(referenceDate);
    todayMidnight.setHours(0, 0, 0, 0);

    const { dateString: todayStr } = getDayBoundaries(referenceDate);
    const isTodayQualified = (historyMap[todayStr] || 0) >= thresholdSeconds;

    // Up to yesterday, plus today if today has reached threshold
    const endEvaluationDate = new Date(todayMidnight);
    if (!isTodayQualified) {
      endEvaluationDate.setDate(endEvaluationDate.getDate() - 1);
    }

    if (endEvaluationDate.getTime() >= firstDate.getTime()) {
      const diffDays =
        Math.round((endEvaluationDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      const qualifiedInSpan = qualifiedDates.filter((dStr) => {
        const d = new Date(dStr + 'T00:00:00');
        return d.getTime() >= firstDate.getTime() && d.getTime() <= endEvaluationDate.getTime();
      }).length;

      totalMissedDays = Math.max(0, diffDays - qualifiedInSpan);
    }
  }

  // 4. Compute Longest Streak across all qualified dates
  let longestStreak = 0;
  if (qualifiedDates.length > 0) {
    let currentRun = 0;
    let prevDate: Date | null = null;

    for (const dateStr of qualifiedDates) {
      const currentDate = new Date(dateStr + 'T12:00:00');
      if (!prevDate) {
        currentRun = 1;
      } else {
        const diffMs = currentDate.getTime() - prevDate.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentRun += 1;
        } else if (diffDays > 1) {
          currentRun = 1;
        }
      }
      if (currentRun > longestStreak) {
        longestStreak = currentRun;
      }
      prevDate = currentDate;
    }
  }

  // 5. Compute Current Streak relative to referenceDate
  const { dateString: todayStr } = getDayBoundaries(referenceDate);
  const isActiveToday = (historyMap[todayStr] || 0) >= thresholdSeconds;

  // Date of yesterday
  const yest = new Date(referenceDate);
  yest.setDate(yest.getDate() - 1);
  const { dateString: yesterdayStr } = getDayBoundaries(yest);

  let currentStreak = 0;

  // Determine starting point for current streak check
  let checkDate: Date;
  if (isActiveToday) {
    // Today has already qualified! Count backwards starting from today
    checkDate = new Date(referenceDate);
  } else if (qualifiedSet.has(yesterdayStr)) {
    // Today is still in progress / not qualified, but yesterday was active -> streak is alive!
    checkDate = new Date(yest);
  } else {
    // Neither today nor yesterday qualified -> streak is 0
    return {
      currentStreak: 0,
      longestStreak,
      totalActiveDays,
      totalMissedDays,
      totalStudyHours,
      totalStudySeconds,
      lastSuccessfulStudyDate,
      daysSinceLastStudy,
      isActiveToday: false,
      minStreakMinutes,
      historyMap,
      qualifiedDates,
    };
  }

  // Walk backwards counting consecutive qualifying calendar days
  while (true) {
    const { dateString: curStr } = getDayBoundaries(checkDate);
    if (qualifiedSet.has(curStr)) {
      currentStreak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  return {
    currentStreak,
    longestStreak,
    totalActiveDays,
    totalMissedDays,
    totalStudyHours,
    totalStudySeconds,
    lastSuccessfulStudyDate,
    daysSinceLastStudy,
    isActiveToday,
    minStreakMinutes,
    historyMap,
    qualifiedDates,
  };
}
