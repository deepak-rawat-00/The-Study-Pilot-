import { describe, it, expect } from 'vitest';
import { calculateStudyStreaks } from '../domain/streakEngine';
import {
  getIntensityLevel,
  generateHeatmapData,
  calculateConsistencyAnalytics,
} from '../domain/heatmapEngine';
import { StudySession } from '../types';

describe('Milestone 5: Study Consistency Heatmap & LeetCode-Style Streak Tracker', () => {
  // Reference date: Monday, October 12, 2026 at 14:00:00 local time
  const refDate = new Date('2026-10-12T14:00:00.000');
  const refDateStr = '2026-10-12';

  const helperCreateSession = (params: {
    id: string;
    subjectId?: string;
    subjectName?: string;
    subjectCode?: string;
    subjectColor?: string;
    dateString: string;
    durationMinutes: number;
    startHour?: number;
  }): StudySession => {
    const {
      id,
      subjectId = 'sub_math',
      subjectName = 'Mathematics',
      subjectCode = 'MATH',
      subjectColor = '#3b82f6',
      dateString,
      durationMinutes,
      startHour = 10,
    } = params;

    const endH = startHour + Math.floor(durationMinutes / 60);
    const endM = durationMinutes % 60;

    return {
      id,
      subjectId,
      subjectName,
      subjectCode,
      subjectColor,
      startTime: `${dateString}T${String(startHour).padStart(2, '0')}:00:00.000`,
      endTime: `${dateString}T${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}:00.000`,
      activeDurationSeconds: durationMinutes * 60,
      activeDurationMinutes: durationMinutes,
      dateString,
      mode: 'pomodoro',
      createdAt: `${dateString}T12:00:00.000`,
    };
  };

  // =========================================================================
  // Criteria 1 - 3: 60-Minute Qualifying Rule & Session Aggregation
  // =========================================================================

  it('Criterion 1: Exactly 60 minutes of active study qualifies a day', () => {
    const session60 = helperCreateSession({
      id: 's_60',
      dateString: refDateStr,
      durationMinutes: 60,
    });

    const result = calculateStudyStreaks({
      sessions: [session60],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    expect(result.isActiveToday).toBe(true);
    expect(result.totalActiveDays).toBe(1);
    expect(result.currentStreak).toBe(1);
    expect(result.totalStudyHours).toBe(1);
    expect(result.lastSuccessfulStudyDate).toBe(refDateStr);
    expect(result.daysSinceLastStudy).toBe(0);
  });

  it('Criterion 2: Multiple sessions on the same calendar day combine correctly to qualify', () => {
    // 30 mins Maths + 30 mins Reasoning on Oct 12
    const sessionMath = helperCreateSession({
      id: 's_math_30',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      dateString: refDateStr,
      durationMinutes: 30,
      startHour: 9,
    });

    const sessionReasoning = helperCreateSession({
      id: 's_reason_30',
      subjectId: 'sub_reason',
      subjectName: 'Reasoning',
      subjectCode: 'REAS',
      subjectColor: '#10b981',
      dateString: refDateStr,
      durationMinutes: 30,
      startHour: 11,
    });

    const result = calculateStudyStreaks({
      sessions: [sessionMath, sessionReasoning],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    // 30m + 30m = 60m => qualifies!
    expect(result.isActiveToday).toBe(true);
    expect(result.totalActiveDays).toBe(1);
    expect(result.currentStreak).toBe(1);
    expect(result.historyMap[refDateStr]).toBe(3600); // exactly 3600s
  });

  it('Criterion 3: A day with less than 60 minutes does not qualify for a streak day', () => {
    // 59 minutes study on Oct 12
    const session59 = helperCreateSession({
      id: 's_59',
      dateString: refDateStr,
      durationMinutes: 59,
    });

    const result = calculateStudyStreaks({
      sessions: [session59],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    expect(result.isActiveToday).toBe(false);
    expect(result.totalActiveDays).toBe(0);
    expect(result.currentStreak).toBe(0);
    expect(result.lastSuccessfulStudyDate).toBeNull();
  });

  // =========================================================================
  // Criteria 4 - 6: Streak Progression, Missed Days, & In-Progress Continuity
  // =========================================================================

  it('Criterion 4: Consecutive qualifying days produce the correct current streak and longest streak', () => {
    // 3 consecutive 60-minute days: Oct 10, Oct 11, Oct 12
    const s10 = helperCreateSession({ id: 's_10', dateString: '2026-10-10', durationMinutes: 60 });
    const s11 = helperCreateSession({ id: 's_11', dateString: '2026-10-11', durationMinutes: 75 });
    const s12 = helperCreateSession({ id: 's_12', dateString: '2026-10-12', durationMinutes: 60 });

    const result = calculateStudyStreaks({
      sessions: [s10, s11, s12],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
    expect(result.totalActiveDays).toBe(3);
    expect(result.totalMissedDays).toBe(0);
    expect(result.isActiveToday).toBe(true);
  });

  it('Criterion 5: Missed days break current streak without erasing the longest streak', () => {
    // 3 qualifying days: Oct 5, Oct 6, Oct 7 (3-day streak)
    // Gap: Oct 8, Oct 9 missed
    // New qualifying day: Oct 11 (yesterday)
    // Today (Oct 12): 60 mins
    const s05 = helperCreateSession({ id: 's_05', dateString: '2026-10-05', durationMinutes: 60 });
    const s06 = helperCreateSession({ id: 's_06', dateString: '2026-10-06', durationMinutes: 60 });
    const s07 = helperCreateSession({ id: 's_07', dateString: '2026-10-07', durationMinutes: 60 });

    const s11 = helperCreateSession({ id: 's_11', dateString: '2026-10-11', durationMinutes: 60 });
    const s12 = helperCreateSession({ id: 's_12', dateString: '2026-10-12', durationMinutes: 60 });

    const result = calculateStudyStreaks({
      sessions: [s05, s06, s07, s11, s12],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    // Current streak restarted after the gap: Oct 11 + Oct 12 = 2
    expect(result.currentStreak).toBe(2);
    // Longest streak tracks the earlier 3-day run
    expect(result.longestStreak).toBe(3);
    expect(result.totalActiveDays).toBe(5);
    // Total missed days: Oct 8, Oct 9, Oct 10 = 3 missed days
    expect(result.totalMissedDays).toBe(3);
  });

  it('Criterion 6: Today incomplete activity does not prematurely break an otherwise valid streak', () => {
    // Yesterday (Oct 11) qualified with 90m
    // Today (Oct 12) user has only studied 25m so far (< 60m threshold)
    const sYest = helperCreateSession({ id: 's_yest', dateString: '2026-10-11', durationMinutes: 90 });
    const sTodayIncomplete = helperCreateSession({ id: 's_today', dateString: '2026-10-12', durationMinutes: 25 });

    const result = calculateStudyStreaks({
      sessions: [sYest, sTodayIncomplete],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    // Streak is preserved and alive through yesterday!
    expect(result.currentStreak).toBe(1);
    expect(result.isActiveToday).toBe(false);
    expect(result.totalActiveDays).toBe(1);
    expect(result.daysSinceLastStudy).toBe(1);
  });

  // =========================================================================
  // Criteria 7 - 9: Heatmap Intensity, Aggregation, & Future Dates Exclusion
  // =========================================================================

  it('Criterion 7: Heatmap intensity levels and qualifying-day indicators adhere to specification', () => {
    // 0m -> intensity 0
    expect(getIntensityLevel(0)).toBe(0);

    // 1-29m -> intensity 1
    expect(getIntensityLevel(1)).toBe(1);
    expect(getIntensityLevel(15)).toBe(1);
    expect(getIntensityLevel(29)).toBe(1);

    // 30-59m -> intensity 2
    expect(getIntensityLevel(30)).toBe(2);
    expect(getIntensityLevel(45)).toBe(2);
    expect(getIntensityLevel(59)).toBe(2);

    // 60-119m -> intensity 3
    expect(getIntensityLevel(60)).toBe(3);
    expect(getIntensityLevel(90)).toBe(3);
    expect(getIntensityLevel(119)).toBe(3);

    // 120m+ -> intensity 4
    expect(getIntensityLevel(120)).toBe(4);
    expect(getIntensityLevel(180)).toBe(4);
  });

  it('Criterion 8: Weekly, monthly, and yearly totals use authentic saved sessions', () => {
    const s1 = helperCreateSession({
      id: 's1',
      subjectId: 'sub_math',
      dateString: '2026-10-11',
      durationMinutes: 60,
    });
    const s2 = helperCreateSession({
      id: 's2',
      subjectId: 'sub_phys',
      subjectName: 'Physics',
      subjectCode: 'PHYS',
      dateString: '2026-10-12',
      durationMinutes: 90,
    });

    const heatmap = generateHeatmapData({
      sessions: [s1, s2],
      minStreakMinutes: 60,
      yearFilter: 2026,
      referenceDate: refDate,
    });

    // Total period study seconds = (60 + 90) * 60 = 9000s
    expect(heatmap.totalPeriodStudySeconds).toBe(9000);
    expect(heatmap.totalPeriodActiveDays).toBe(2);

    // Find Oct 12 day in heatmap
    const oct12Day = heatmap.days.find((d) => d.dateString === '2026-10-12');
    expect(oct12Day).toBeDefined();
    expect(oct12Day?.totalMinutes).toBe(90);
    expect(oct12Day?.intensity).toBe(3);
    expect(oct12Day?.isQualified).toBe(true);
    expect(oct12Day?.subjectBreakdown.length).toBe(1);
    expect(oct12Day?.subjectBreakdown[0].subjectCode).toBe('PHYS');
    expect(oct12Day?.subjectBreakdown[0].minutes).toBe(90);
  });

  it('Criterion 9: Consistency percentages exclude future dates from eligible count', () => {
    // Current year is 2026. RefDate is Oct 12, 2026.
    // Days from Oct 13 to Dec 31 are future dates!
    const s1 = helperCreateSession({
      id: 's_oct12',
      dateString: '2026-10-12',
      durationMinutes: 60,
    });

    const analytics = calculateConsistencyAnalytics({
      sessions: [s1],
      minStreakMinutes: 60,
      yearFilter: 2026,
      referenceDate: refDate,
    });

    // Eligible days in period must ONLY count days up to Oct 12 (Jan 1 to Oct 12 = 285 days)
    // It must NOT include the remaining 80 days of 2026 that are in the future!
    expect(analytics.eligibleDaysInPeriod).toBe(285);
    expect(analytics.successfulDaysInPeriod).toBe(1);
    expect(analytics.consistencyPercentage).toBe(
      Math.round((1 / 285) * 1000) / 10
    );
  });

  // =========================================================================
  // Criteria 10 - 12: Idempotence, Threshold Changes, & Midnight Boundaries
  // =========================================================================

  it('Criterion 10: Refreshing does not duplicate activity or inflate streaks', () => {
    const s1 = helperCreateSession({ id: 's_rel_1', dateString: '2026-10-11', durationMinutes: 60 });
    const s2 = helperCreateSession({ id: 's_rel_2', dateString: '2026-10-12', durationMinutes: 60 });

    const rawSessions = [s1, s2];

    // Simulate serialization & deserialization from localStorage
    const rehydratedSessions: StudySession[] = JSON.parse(JSON.stringify(rawSessions));

    const runA = calculateStudyStreaks({
      sessions: rehydratedSessions,
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    const runB = calculateStudyStreaks({
      sessions: rehydratedSessions,
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    expect(runA.currentStreak).toBe(2);
    expect(runB.currentStreak).toBe(2);
    expect(runA.totalActiveDays).toBe(2);
    expect(runB.totalActiveDays).toBe(2);
    expect(runA.totalStudyHours).toBe(2);
    expect(runB.totalStudyHours).toBe(2);
  });

  it('Criterion 11: Threshold changes recalculate historical statistics correctly without altering records', () => {
    // Session of 45 minutes on Oct 12
    const session45 = helperCreateSession({
      id: 's_45',
      dateString: refDateStr,
      durationMinutes: 45,
    });

    // Under default 60m threshold: DOES NOT qualify
    const res60 = calculateStudyStreaks({
      sessions: [session45],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });
    expect(res60.isActiveToday).toBe(false);
    expect(res60.totalActiveDays).toBe(0);
    expect(res60.currentStreak).toBe(0);

    // User switches threshold in settings to 30m: RECALCULATES & QUALIFIES
    const res30 = calculateStudyStreaks({
      sessions: [session45],
      minStreakMinutes: 30,
      referenceDate: refDate,
    });
    expect(res30.isActiveToday).toBe(true);
    expect(res30.totalActiveDays).toBe(1);
    expect(res30.currentStreak).toBe(1);

    // Underlying session timestamps are preserved completely untouched
    expect(session45.activeDurationSeconds).toBe(2700);
    expect(session45.activeDurationMinutes).toBe(45);
  });

  it('Criterion 12: Midnight-crossing sessions are allocated to the correct local dates', () => {
    // Session starting 23:30 on Oct 11 and ending 00:30 on Oct 12 (60m total: 30m on Oct 11, 30m on Oct 12)
    const midnightSession: StudySession = {
      id: 'sess_midnight_m5',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#3b82f6',
      startTime: '2026-10-11T23:30:00.000',
      endTime: '2026-10-12T00:30:00.000',
      activeDurationSeconds: 60 * 60,
      activeDurationMinutes: 60,
      dateString: '2026-10-11',
      mode: 'pomodoro',
      createdAt: '2026-10-12T00:30:00.000',
    };

    // User also studied 30m earlier on Oct 11 (so Oct 11 total = 30m + 30m = 60m => qualifies >= 60m)
    const early11 = helperCreateSession({
      id: 's_early_11',
      dateString: '2026-10-11',
      durationMinutes: 30,
      startHour: 10,
    });

    // User also studied 30m later on Oct 12 (so Oct 12 total = 30m + 30m = 60m => qualifies >= 60m)
    const late12 = helperCreateSession({
      id: 's_late_12',
      dateString: '2026-10-12',
      durationMinutes: 30,
      startHour: 11,
    });

    const result = calculateStudyStreaks({
      sessions: [early11, midnightSession, late12],
      minStreakMinutes: 60,
      referenceDate: refDate,
    });

    // Both Oct 11 and Oct 12 reached 60 minutes each!
    expect(result.currentStreak).toBe(2);
    expect(result.isActiveToday).toBe(true);
    expect(result.totalActiveDays).toBe(2);
    expect(result.historyMap['2026-10-11']).toBe(3600);
    expect(result.historyMap['2026-10-12']).toBe(3600);
  });
});
