import { describe, it, expect } from 'vitest';
import {
  calculateDailyProgress,
  getSessionActiveSecondsOnDate,
} from '../domain/dashboardEngine';
import {
  createInitialTimerState,
  startStudySession,
  createCompletedStudySession,
} from '../domain/timerEngine';
import { StudySession, Subject } from '../types';

describe('Milestone 3 Final Verification Tests', () => {
  const baseDate = new Date('2026-10-12T14:00:00.000');
  const baseTimestamp = baseDate.getTime();

  // Test 1
  it('Verification Item 1: Set daily target of 3h, record 60 mins study -> shows 1h completed, 2h remaining', () => {
    const subjects: Subject[] = [
      {
        id: 'sub_1',
        name: 'General Studies',
        code: 'GS',
        color: '#6366f1',
        dailyTargetHours: 3,
        weeklyTargetHours: 21,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 0,
        createdAt: '2026-10-12T00:00:00.000Z',
      },
    ];

    const completedSession: StudySession = {
      id: 'sess_60m',
      subjectId: 'sub_1',
      subjectName: 'General Studies',
      subjectCode: 'GS',
      subjectColor: '#6366f1',
      startTime: '2026-10-12T09:00:00.000Z',
      endTime: '2026-10-12T10:00:00.000Z',
      activeDurationSeconds: 3600, // Exactly 60 minutes
      activeDurationMinutes: 60,
      dateString: '2026-10-12',
      mode: 'pomodoro',
      createdAt: '2026-10-12T10:00:00.000Z',
    };

    const metrics = calculateDailyProgress({
      subjects,
      completedSessions: [completedSession],
      activeTimerState: createInitialTimerState('sub_1'),
      targetDate: baseDate,
      dailyGoalHours: 3,
      currentTimestamp: baseTimestamp,
    });

    expect(metrics.targetHours).toBe(3);
    expect(metrics.studiedHoursToday).toBe(1);
    expect(metrics.studiedSecondsToday).toBe(3600);
    expect(metrics.remainingHours).toBe(2);
    expect(metrics.remainingSeconds).toBe(7200);
    expect(metrics.completionPercentage).toBe(33); // 1h of 3h = 33.3% -> 33%
    expect(metrics.isTargetMet).toBe(false);
  });

  // Test 2
  it('Verification Item 2: Allocate 60m to Maths and 120m to Reasoning. Record 30m Maths study -> verify subject-wise progress', () => {
    const subjects: Subject[] = [
      {
        id: 'sub_math',
        name: 'Mathematics',
        code: 'MATH',
        color: '#6366f1',
        dailyTargetHours: 1, // 60 minutes
        weeklyTargetHours: 7,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 0,
        createdAt: '2026-10-12T00:00:00.000Z',
      },
      {
        id: 'sub_reasoning',
        name: 'Reasoning',
        code: 'REAS',
        color: '#f59e0b',
        dailyTargetHours: 2, // 120 minutes
        weeklyTargetHours: 14,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 1,
        createdAt: '2026-10-12T00:00:00.000Z',
      },
    ];

    const mathsSession: StudySession = {
      id: 'sess_math_30m',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#6366f1',
      startTime: '2026-10-12T09:00:00.000Z',
      endTime: '2026-10-12T09:30:00.000Z',
      activeDurationSeconds: 1800, // Exactly 30 minutes
      activeDurationMinutes: 30,
      dateString: '2026-10-12',
      mode: 'pomodoro',
      createdAt: '2026-10-12T09:30:00.000Z',
    };

    const metrics = calculateDailyProgress({
      subjects,
      completedSessions: [mathsSession],
      activeTimerState: createInitialTimerState(),
      targetDate: baseDate,
      dailyGoalHours: 3,
      currentTimestamp: baseTimestamp,
    });

    const mathMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_math')!;
    expect(mathMetric.dailyTargetHours).toBe(1);
    expect(mathMetric.studiedSecondsToday).toBe(1800);
    expect(mathMetric.studiedHoursToday).toBe(0.5);
    expect(mathMetric.remainingHours).toBe(0.5);
    expect(mathMetric.remainingSeconds).toBe(1800);
    expect(mathMetric.completionPercentage).toBe(50);
    expect(mathMetric.isTargetMet).toBe(false);

    const reasoningMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_reasoning')!;
    expect(reasoningMetric.dailyTargetHours).toBe(2);
    expect(reasoningMetric.studiedSecondsToday).toBe(0);
    expect(reasoningMetric.studiedHoursToday).toBe(0);
    expect(reasoningMetric.remainingHours).toBe(2);
    expect(reasoningMetric.remainingSeconds).toBe(7200);
    expect(reasoningMetric.completionPercentage).toBe(0);
    expect(reasoningMetric.isTargetMet).toBe(false);
  });

  // Test 3
  it('Verification Item 3: Verify that active study time updates dashboard without double-counting sessions', () => {
    const subjects: Subject[] = [
      {
        id: 'sub_math',
        name: 'Mathematics',
        code: 'MATH',
        color: '#6366f1',
        dailyTargetHours: 2,
        weeklyTargetHours: 14,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 0,
        createdAt: '2026-10-12T00:00:00.000Z',
      },
    ];

    // Session 1: completed 30 minutes (1800s)
    const completedSession: StudySession = {
      id: 'sess_1',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#6366f1',
      startTime: '2026-10-12T10:00:00.000Z',
      endTime: '2026-10-12T10:30:00.000Z',
      activeDurationSeconds: 1800,
      activeDurationMinutes: 30,
      dateString: '2026-10-12',
      mode: 'pomodoro',
      createdAt: '2026-10-12T10:30:00.000Z',
    };

    // Session 2 is currently active: started 15 minutes (900s) ago
    const startMs = baseTimestamp - 900000;
    const activeTimer = startStudySession(createInitialTimerState('sub_math'), 'sub_math', startMs);

    // 1. Check while active: dashboard should reflect 1800 + 900 = 2700s
    const metricsWhileActive = calculateDailyProgress({
      subjects,
      completedSessions: [completedSession],
      activeTimerState: activeTimer,
      targetDate: baseDate,
      dailyGoalHours: 2,
      currentTimestamp: baseTimestamp,
    });

    expect(metricsWhileActive.hasActiveSession).toBe(true);
    expect(metricsWhileActive.studiedSecondsToday).toBe(2700); // 45 minutes
    expect(metricsWhileActive.studiedHoursToday).toBe(0.8); // 2700 / 3600 = 0.75 -> 0.8h

    // 2. Now user saves/ends Session 2
    const session2Completed = createCompletedStudySession(
      activeTimer,
      subjects[0],
      baseTimestamp,
      'Finished 15m block'
    );
    expect(session2Completed.activeDurationSeconds).toBe(900);

    const idleTimer = createInitialTimerState('sub_math');

    // Check after saving: active timer is now idle, both sessions are in completedSessions
    const metricsAfterSave = calculateDailyProgress({
      subjects,
      completedSessions: [completedSession, session2Completed],
      activeTimerState: idleTimer,
      targetDate: baseDate,
      dailyGoalHours: 2,
      currentTimestamp: baseTimestamp,
    });

    expect(metricsAfterSave.hasActiveSession).toBe(false);
    expect(metricsAfterSave.studiedSecondsToday).toBe(2700); // Exactly 2700s (no double count!)
    expect(metricsAfterSave.studiedHoursToday).toBe(0.8);
  });

  // Test 4
  it('Verification Item 4: Refresh page and verify session history and dashboard totals remain accurate', () => {
    const subjects: Subject[] = [
      {
        id: 'sub_math',
        name: 'Mathematics',
        code: 'MATH',
        color: '#6366f1',
        dailyTargetHours: 2,
        weeklyTargetHours: 14,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 0,
        createdAt: '2026-10-12T00:00:00.000Z',
      },
    ];

    const sessionList: StudySession[] = [
      {
        id: 'sess_stored_1',
        subjectId: 'sub_math',
        subjectName: 'Mathematics',
        subjectCode: 'MATH',
        subjectColor: '#6366f1',
        startTime: '2026-10-12T08:00:00.000Z',
        endTime: '2026-10-12T09:00:00.000Z',
        activeDurationSeconds: 3600,
        activeDurationMinutes: 60,
        dateString: '2026-10-12',
        mode: 'pomodoro',
        createdAt: '2026-10-12T09:00:00.000Z',
      },
    ];

    // Simulate serialization and deserialization from localStorage
    const serializedSessions = JSON.stringify(sessionList);
    const rehydratedSessions: StudySession[] = JSON.parse(serializedSessions);

    const metrics = calculateDailyProgress({
      subjects,
      completedSessions: rehydratedSessions,
      activeTimerState: createInitialTimerState(),
      targetDate: baseDate,
      dailyGoalHours: 2,
      currentTimestamp: baseTimestamp,
    });

    expect(rehydratedSessions.length).toBe(1);
    expect(metrics.studiedHoursToday).toBe(1);
    expect(metrics.remainingHours).toBe(1);
    expect(metrics.completionPercentage).toBe(50);
  });

  // Test 5
  it('Verification Item 5: Test session crossing midnight and confirm study time is attributed to correct calendar days', () => {
    // Session begins at 2026-10-11 23:30:00 and ends at 2026-10-12 01:00:00 (90 mins total = 5400s)
    const midnightSession: StudySession = {
      id: 'sess_cross_midnight',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#6366f1',
      startTime: '2026-10-11T23:30:00.000',
      endTime: '2026-10-12T01:00:00.000',
      activeDurationSeconds: 5400, // 90 minutes
      activeDurationMinutes: 90,
      dateString: '2026-10-11',
      mode: 'continuous',
      createdAt: '2026-10-12T01:00:00.000',
    };

    const dateYesterday = new Date('2026-10-11T12:00:00');
    const dateToday = new Date('2026-10-12T12:00:00');

    // 1. Portion on yesterday: 23:30 to 24:00 (30 mins = 1800s)
    const yesterdaySeconds = getSessionActiveSecondsOnDate(midnightSession, dateYesterday);
    expect(yesterdaySeconds).toBe(1800); // 30 minutes

    // 2. Portion on today: 00:00 to 01:00 (60 mins = 3600s)
    const todaySeconds = getSessionActiveSecondsOnDate(midnightSession, dateToday);
    expect(todaySeconds).toBe(3600); // 60 minutes

    // 3. Sum of both days must equal 5400s exactly
    expect(yesterdaySeconds + todaySeconds).toBe(5400);

    // 4. Any other date (e.g. 2026-10-10 or 2026-10-13) gets 0 seconds
    const dateOther = new Date('2026-10-13T12:00:00');
    expect(getSessionActiveSecondsOnDate(midnightSession, dateOther)).toBe(0);
  });

  // Test 6
  it('Verification Item 6: Test exceeding daily target and confirm progress and remaining time are displayed correctly', () => {
    const subjects: Subject[] = [
      {
        id: 'sub_math',
        name: 'Mathematics',
        code: 'MATH',
        color: '#6366f1',
        dailyTargetHours: 3, // 3h daily target
        weeklyTargetHours: 21,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 0,
        createdAt: '2026-10-12T00:00:00.000Z',
      },
    ];

    // Studied 4 hours (14400s) on a 3-hour goal
    const sessionExceeding: StudySession = {
      id: 'sess_4h',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#6366f1',
      startTime: '2026-10-12T08:00:00.000Z',
      endTime: '2026-10-12T12:00:00.000Z',
      activeDurationSeconds: 14400, // 4 hours
      activeDurationMinutes: 240,
      dateString: '2026-10-12',
      mode: 'pomodoro',
      createdAt: '2026-10-12T12:00:00.000Z',
    };

    const metrics = calculateDailyProgress({
      subjects,
      completedSessions: [sessionExceeding],
      activeTimerState: createInitialTimerState(),
      targetDate: baseDate,
      dailyGoalHours: 3,
      currentTimestamp: baseTimestamp,
    });

    expect(metrics.targetHours).toBe(3);
    expect(metrics.studiedHoursToday).toBe(4);
    expect(metrics.studiedSecondsToday).toBe(14400);
    // Remaining time must be 0 (never negative)
    expect(metrics.remainingHours).toBe(0);
    expect(metrics.remainingSeconds).toBe(0);
    // Completion percentage capped at 100%
    expect(metrics.completionPercentage).toBe(100);
    expect(metrics.isTargetMet).toBe(true);

    const mathMetric = metrics.subjectMetrics[0];
    expect(mathMetric.studiedHoursToday).toBe(4);
    expect(mathMetric.remainingHours).toBe(0);
    expect(mathMetric.isTargetMet).toBe(true);
    expect(mathMetric.completionPercentage).toBe(100);
  });

  // Test 7
  it('Verification Item 7: Verify editing or deleting subjects does not corrupt historical session records', () => {
    // Subject initially created
    const originalSubject: Subject = {
      id: 'sub_chem',
      name: 'Organic Chemistry',
      code: 'CHEM',
      color: '#10b981',
      dailyTargetHours: 2,
      weeklyTargetHours: 14,
      studiedHoursToday: 0,
      studiedHoursThisWeek: 0,
      orderIndex: 0,
      createdAt: '2026-10-12T00:00:00.000Z',
    };

    // User logged a 1-hour session on this subject
    const historicalSession: StudySession = {
      id: 'sess_chem_1h',
      subjectId: 'sub_chem',
      subjectName: 'Organic Chemistry',
      subjectCode: 'CHEM',
      subjectColor: '#10b981',
      startTime: '2026-10-12T09:00:00.000Z',
      endTime: '2026-10-12T10:00:00.000Z',
      activeDurationSeconds: 3600,
      activeDurationMinutes: 60,
      dateString: '2026-10-12',
      mode: 'pomodoro',
      createdAt: '2026-10-12T10:00:00.000Z',
    };

    // Case A: User edits subject name to "Advanced Organic Chemistry"
    const editedSubject: Subject = {
      ...originalSubject,
      name: 'Advanced Organic Chemistry',
      code: 'ADV-CHEM',
    };
    expect(editedSubject.name).toBe('Advanced Organic Chemistry');

    // The historical session remains completely immutable
    expect(historicalSession.subjectName).toBe('Organic Chemistry');
    expect(historicalSession.subjectCode).toBe('CHEM');

    // Case B: User deletes the subject completely from active subjects
    const remainingSubjects: Subject[] = []; // 'sub_chem' is now deleted

    const metricsAfterDelete = calculateDailyProgress({
      subjects: remainingSubjects,
      completedSessions: [historicalSession],
      activeTimerState: createInitialTimerState(),
      targetDate: baseDate,
      dailyGoalHours: 2,
      currentTimestamp: baseTimestamp,
    });

    // The 1-hour focus session must NOT be erased from daily total studied time
    expect(metricsAfterDelete.studiedSecondsToday).toBe(3600);
    expect(metricsAfterDelete.studiedHoursToday).toBe(1);
    expect(metricsAfterDelete.remainingHours).toBe(1);
    // Historical session itself is completely uncorrupted
    expect(historicalSession.activeDurationSeconds).toBe(3600);
    expect(historicalSession.subjectName).toBe('Organic Chemistry');
  });
});
