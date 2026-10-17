import {
  StudySession,
  HeatmapDay,
  HeatmapWeek,
  HeatmapData,
  HeatmapIntensity,
  HeatmapSubjectBreakdown,
  WeeklyDurationDay,
  ConsistencyAnalytics,
} from '../types';
import { getDayBoundaries, getSessionActiveSecondsOnDate } from './dashboardEngine';

/**
 * Maps focus duration in minutes to GitHub-style intensity levels (0 to 4):
 * - 0: 0 minutes (no activity)
 * - 1: 1–29 minutes (low activity)
 * - 2: 30–59 minutes (partial activity)
 * - 3: 60–119 minutes (goal achieved)
 * - 4: 120+ minutes (high activity)
 */
export function getIntensityLevel(minutes: number): HeatmapIntensity {
  if (minutes <= 0) return 0;
  if (minutes < 30) return 1;
  if (minutes < 60) return 2;
  if (minutes < 120) return 3;
  return 4;
}

/**
 * Formats a local date as 'YYYY-MM-DD'.
 */
export function formatLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Pure calculation engine for the GitHub-style study heatmap and consistency analytics.
 */
export function generateHeatmapData(params: {
  sessions: StudySession[];
  minStreakMinutes?: number;
  yearFilter?: number | 'last365';
  referenceDate?: Date;
}): HeatmapData {
  const {
    sessions,
    minStreakMinutes = 60,
    yearFilter = 'last365',
    referenceDate = new Date(),
  } = params;

  const thresholdSeconds = Math.max(1, minStreakMinutes) * 60;
  const { dateString: todayStr } = getDayBoundaries(referenceDate);
  const todayMidnight = new Date(referenceDate);
  todayMidnight.setHours(0, 0, 0, 0);

  // 1. Gather all available years from sessions and current year
  const yearSet = new Set<number>([referenceDate.getFullYear()]);
  for (const s of sessions) {
    if (s.dateString) {
      const y = parseInt(s.dateString.substring(0, 4), 10);
      if (!isNaN(y)) yearSet.add(y);
    }
  }
  const availableYears = Array.from(yearSet).sort((a, b) => b - a);

  // 2. Determine date range based on yearFilter
  let startDate: Date;
  let endDate: Date;

  if (yearFilter === 'last365') {
    // Exactly 365 calendar days ending on referenceDate
    endDate = new Date(todayMidnight);
    startDate = new Date(todayMidnight);
    startDate.setDate(startDate.getDate() - 364);
  } else {
    // Specific calendar year
    const targetYear = typeof yearFilter === 'number' ? yearFilter : referenceDate.getFullYear();
    startDate = new Date(targetYear, 0, 1);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(targetYear, 11, 31);
    endDate.setHours(0, 0, 0, 0);
  }

  // 3. Pre-aggregate session seconds & subject breakdowns per day
  // Map of dateString -> { totalSeconds, subjectsMap: Record<subjectId, HeatmapSubjectBreakdown> }
  const dailyAggregation: Record<
    string,
    {
      totalSeconds: number;
      subjectsMap: Record<string, HeatmapSubjectBreakdown>;
    }
  > = {};

  for (const session of sessions) {
    if (session.activeDurationSeconds <= 0) continue;

    const sStart = new Date(session.startTime);
    const sEnd = new Date(session.endTime);

    const cur = new Date(sStart);
    cur.setHours(0, 0, 0, 0);
    const sEndLimit = new Date(sEnd);
    sEndLimit.setHours(23, 59, 59, 999);

    while (cur.getTime() <= sEndLimit.getTime()) {
      const dStr = formatLocalDateString(cur);
      const testDate = new Date(cur);
      testDate.setHours(12, 0, 0, 0);

      const activeOnDay = getSessionActiveSecondsOnDate(session, testDate);
      if (activeOnDay > 0) {
        if (!dailyAggregation[dStr]) {
          dailyAggregation[dStr] = { totalSeconds: 0, subjectsMap: {} };
        }
        dailyAggregation[dStr].totalSeconds += activeOnDay;

        const subId = session.subjectId;
        if (!dailyAggregation[dStr].subjectsMap[subId]) {
          dailyAggregation[dStr].subjectsMap[subId] = {
            subjectId: subId,
            subjectName: session.subjectName,
            subjectCode: session.subjectCode,
            subjectColor: session.subjectColor,
            seconds: 0,
            minutes: 0,
            hours: 0,
          };
        }
        dailyAggregation[dStr].subjectsMap[subId].seconds += activeOnDay;
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  // Finalize subject breakdown records
  for (const dStr of Object.keys(dailyAggregation)) {
    const entry = dailyAggregation[dStr];
    for (const subId of Object.keys(entry.subjectsMap)) {
      const sRecord = entry.subjectsMap[subId];
      sRecord.minutes = Math.round(sRecord.seconds / 60);
      sRecord.hours = Math.round((sRecord.seconds / 3600) * 10) / 10;
    }
  }

  // 4. Generate all HeatmapDay objects in range
  const days: HeatmapDay[] = [];
  const iter = new Date(startDate);

  let totalPeriodStudySeconds = 0;
  let totalPeriodActiveDays = 0;

  while (iter.getTime() <= endDate.getTime()) {
    const dStr = formatLocalDateString(iter);
    const dayDate = new Date(iter);
    const isToday = dStr === todayStr;
    const isFuture = iter.getTime() > todayMidnight.getTime();

    const agg = dailyAggregation[dStr];
    const totalSeconds = agg ? agg.totalSeconds : 0;
    const totalMinutes = Math.round(totalSeconds / 60);
    const totalHours = Math.round((totalSeconds / 3600) * 10) / 10;
    const isQualified = totalSeconds >= thresholdSeconds;
    const intensity = getIntensityLevel(totalMinutes);
    const subjectBreakdown = agg ? Object.values(agg.subjectsMap) : [];

    if (!isFuture) {
      totalPeriodStudySeconds += totalSeconds;
      if (isQualified) {
        totalPeriodActiveDays += 1;
      }
    }

    days.push({
      dateString: dStr,
      date: dayDate,
      totalSeconds,
      totalMinutes,
      totalHours,
      intensity,
      isQualified,
      isToday,
      isFuture,
      subjectBreakdown,
    });

    iter.setDate(iter.getDate() + 1);
  }

  // 5. Structure into 7-day columns (weeks) Sunday=0 through Saturday=6
  // To create standard contribution calendar:
  // Week rows: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const weeks: HeatmapWeek[] = [];
  let currentWeekDays: Array<HeatmapDay | null> = [null, null, null, null, null, null, null];
  let currentWeekIndex = 0;

  // Align start padding: find day of week for startDate
  const startDayOfWeek = startDate.getDay(); // 0 (Sun) to 6 (Sat)
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeekDays[i] = null;
  }

  for (const day of days) {
    const dow = day.date.getDay();
    currentWeekDays[dow] = day;

    if (dow === 6) {
      // Saturday -> week complete
      weeks.push({
        weekIndex: currentWeekIndex,
        days: [...currentWeekDays],
      });
      currentWeekIndex += 1;
      currentWeekDays = [null, null, null, null, null, null, null];
    }
  }

  // If leftover days in the last week
  const hasRemainingDays = currentWeekDays.some((d) => d !== null);
  if (hasRemainingDays) {
    weeks.push({
      weekIndex: currentWeekIndex,
      days: [...currentWeekDays],
    });
  }

  // 6. Generate Month Labels
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthLabels: Array<{ label: string; weekIndex: number }> = [];
  let lastMonth = -1;
  let lastAddedWeek = -5;

  weeks.forEach((w, wIdx) => {
    // Find the first non-null day in this week
    const firstDay = w.days.find((d) => d !== null);
    if (firstDay) {
      const month = firstDay.date.getMonth();
      if (month !== lastMonth && wIdx - lastAddedWeek >= 3) {
        monthLabels.push({
          label: monthNames[month],
          weekIndex: wIdx,
        });
        lastMonth = month;
        lastAddedWeek = wIdx;
      }
    }
  });

  return {
    days,
    weeks,
    monthLabels,
    availableYears,
    selectedYear: yearFilter,
    totalPeriodStudySeconds,
    totalPeriodActiveDays,
  };
}

/**
 * Calculates consistency analytics (last 7 days, last 30 days, period consistency %, weekly distribution).
 */
export function calculateConsistencyAnalytics(params: {
  sessions: StudySession[];
  minStreakMinutes?: number;
  yearFilter?: number | 'last365';
  referenceDate?: Date;
}): ConsistencyAnalytics {
  const {
    sessions,
    minStreakMinutes = 60,
    yearFilter = 'last365',
    referenceDate = new Date(),
  } = params;

  const heatmap = generateHeatmapData({
    sessions,
    minStreakMinutes,
    yearFilter,
    referenceDate,
  });

  const { dateString: todayStr } = getDayBoundaries(referenceDate);
  const todayMidnight = new Date(referenceDate);
  todayMidnight.setHours(0, 0, 0, 0);

  // Map by dateString for quick lookup
  const dayMap = new Map<string, HeatmapDay>();
  for (const d of heatmap.days) {
    dayMap.set(d.dateString, d);
  }

  // 1. Last 7 calendar days ending today
  let successfulDaysLast7 = 0;
  for (let i = 0; i < 7; i++) {
    const cur = new Date(todayMidnight);
    cur.setDate(cur.getDate() - (6 - i));
    const dStr = formatLocalDateString(cur);
    const dayObj = dayMap.get(dStr);
    if (dayObj && dayObj.isQualified) {
      successfulDaysLast7 += 1;
    }
  }

  // 2. Last 30 calendar days ending today
  let successfulDaysLast30 = 0;
  for (let i = 0; i < 30; i++) {
    const cur = new Date(todayMidnight);
    cur.setDate(cur.getDate() - (29 - i));
    const dStr = formatLocalDateString(cur);
    const dayObj = dayMap.get(dStr);
    if (dayObj && dayObj.isQualified) {
      successfulDaysLast30 += 1;
    }
  }

  // 3. Period Consistency: qualifying non-future days / eligible non-future days
  const eligibleNonFutureDays = heatmap.days.filter((d) => !d.isFuture);
  const successfulDaysInPeriod = eligibleNonFutureDays.filter((d) => d.isQualified).length;
  const eligibleDaysInPeriod = eligibleNonFutureDays.length;

  const consistencyPercentage =
    eligibleDaysInPeriod > 0
      ? Math.round((successfulDaysInPeriod / eligibleDaysInPeriod) * 1000) / 10
      : 0;

  // 4. Days since last qualifying study day
  const qualifiedDays = eligibleNonFutureDays.filter((d) => d.isQualified);
  let daysSinceLastStudy: number | null = null;
  if (qualifiedDays.length > 0) {
    const lastQual = qualifiedDays[qualifiedDays.length - 1];
    const diffMs = todayMidnight.getTime() - lastQual.date.getTime();
    daysSinceLastStudy = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  }

  // 5. Weekly duration breakdown (Last 7 days)
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const weeklyDurationBreakdown: WeeklyDurationDay[] = [];
  for (let i = 0; i < 7; i++) {
    const cur = new Date(todayMidnight);
    cur.setDate(cur.getDate() - (6 - i));
    const dStr = formatLocalDateString(cur);
    const dow = cur.getDay();

    const dayObj = dayMap.get(dStr);
    const seconds = dayObj ? dayObj.totalSeconds : 0;
    const minutes = dayObj ? dayObj.totalMinutes : 0;
    const hours = dayObj ? dayObj.totalHours : 0;
    const isQualified = dayObj ? dayObj.isQualified : false;

    weeklyDurationBreakdown.push({
      dayName: dayNames[dow],
      shortDay: shortDayNames[dow],
      dateString: dStr,
      seconds,
      minutes,
      hours,
      isQualified,
      isToday: dStr === todayStr,
    });
  }

  return {
    successfulDaysLast7,
    successfulDaysLast30,
    successfulDaysInPeriod,
    eligibleDaysInPeriod,
    consistencyPercentage,
    daysSinceLastStudy,
    weeklyDurationBreakdown,
  };
}
