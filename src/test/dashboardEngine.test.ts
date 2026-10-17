import { describe, it, expect } from 'vitest';
import {
  calculateDailyProgress,
  getSessionActiveSecondsOnDate,
  formatDurationHoursMinutes,
} from '../domain/dashboardEngine';
import { createInitialTimerState, startStudySession, pauseStudySession } from '../domain/timerEngine';
import { StudySession, Subject } from '../types';

describe('dashboardEngine: Daily Targets & Progress Calculations', () => {
  const mockSubjects: Subject[] = [
    {
      id: 'sub_math',
      name: 'Mathematics',
      code: 'MATH',
      color: '#6366f1',
      dailyTargetHours: 3,
      weeklyTargetHours: 21,
      studiedHoursToday: 0,
      studiedHoursThisWeek: 0,
      orderIndex: 0,
      createdAt: '2026-10-12T00:00:00.000Z',
    },
    {
      id: 'sub_physics',
      name: 'Physics',
      code: 'PHY',
      color: '#f59e0b',
      dailyTargetHours: 2,
      weeklyTargetHours: 14,
      studiedHoursToday: 0,
      studiedHoursThisWeek: 0,
      orderIndex: 1,
      createdAt: '2026-10-12T00:00:00.000Z',
    },
    {
      id: 'sub_chem',
      name: 'Chemistry',
      code: 'CHEM',
      color: '#10b981',
      dailyTargetHours: 2,
      weeklyTargetHours: 14,
      studiedHoursToday: 0,
      studiedHoursThisWeek: 0,
      orderIndex: 2,
      createdAt: '2026-10-12T00:00:00.000Z',
    },
  ];

  it('calculates authentic 0h progress when no sessions exist', () => {
    const today = new Date('2026-10-12T12:00:00');
    const idleTimer = createInitialTimerState();

    const metrics = calculateDailyProgress({
      subjects: mockSubjects,
      completedSessions: [],
      activeTimerState: idleTimer,
      targetDate: today,
      dailyGoalHours: 7,
      currentTimestamp: today.getTime(),
    });

    expect(metrics.targetHours).toBe(7);
    expect(metrics.studiedSecondsToday).toBe(0);
    expect(metrics.studiedHoursToday).toBe(0);
    expect(metrics.remainingHours).toBe(7);
    expect(metrics.completionPercentage).toBe(0);
    expect(metrics.completedSubjectTargetsCount).toBe(0);
    expect(metrics.hasActiveSession).toBe(false);

    // Subject metrics
    const mathMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_math')!;
    expect(mathMetric.studiedSecondsToday).toBe(0);
    expect(mathMetric.remainingHours).toBe(3);
    expect(mathMetric.isTargetMet).toBe(false);
  });

  it('calculates completed study sessions accurately for today', () => {
    const today = new Date('2026-10-12T15:00:00');
    const idleTimer = createInitialTimerState();

    const completedSessions: StudySession[] = [
      {
        id: 'sess_1',
        subjectId: 'sub_math',
        subjectName: 'Mathematics',
        subjectCode: 'MATH',
        subjectColor: '#6366f1',
        startTime: '2026-10-12T09:00:00.000Z',
        endTime: '2026-10-12T10:30:00.000Z',
        activeDurationSeconds: 5400, // 1.5 hours
        activeDurationMinutes: 90,
        dateString: '2026-10-12',
        mode: 'pomodoro',
        createdAt: '2026-10-12T10:30:00.000Z',
      },
      {
        id: 'sess_2',
        subjectId: 'sub_physics',
        subjectName: 'Physics',
        subjectCode: 'PHY',
        subjectColor: '#f59e0b',
        startTime: '2026-10-12T11:00:00.000Z',
        endTime: '2026-10-12T12:00:00.000Z',
        activeDurationSeconds: 3600, // 1.0 hour
        activeDurationMinutes: 60,
        dateString: '2026-10-12',
        mode: 'continuous',
        createdAt: '2026-10-12T12:00:00.000Z',
      },
    ];

    const metrics = calculateDailyProgress({
      subjects: mockSubjects,
      completedSessions,
      activeTimerState: idleTimer,
      targetDate: today,
      dailyGoalHours: 7,
      currentTimestamp: today.getTime(),
    });

    expect(metrics.studiedSecondsToday).toBe(9000); // 5400 + 3600 = 9000s = 2.5h
    expect(metrics.studiedHoursToday).toBe(2.5);
    expect(metrics.remainingHours).toBe(4.5); // 7 - 2.5 = 4.5h
    expect(metrics.completionPercentage).toBe(36); // (2.5 / 7) * 100 = 35.7% -> 36%

    // Subject checks
    const mathMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_math')!;
    expect(mathMetric.studiedHoursToday).toBe(1.5);
    expect(mathMetric.remainingHours).toBe(1.5); // 3.0 - 1.5 = 1.5h

    const phyMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_physics')!;
    expect(phyMetric.studiedHoursToday).toBe(1);
    expect(phyMetric.remainingHours).toBe(1); // 2.0 - 1.0 = 1.0h
  });

  it('includes active running timer session live without double counting', () => {
    const today = new Date('2026-10-12T14:30:00');
    const startMs = today.getTime() - 1800000; // started 30 mins (1800s) ago

    let timer = createInitialTimerState('sub_chem');
    timer = startStudySession(timer, 'sub_chem', startMs);

    const metrics = calculateDailyProgress({
      subjects: mockSubjects,
      completedSessions: [],
      activeTimerState: timer,
      targetDate: today,
      dailyGoalHours: 7,
      currentTimestamp: today.getTime(),
    });

    expect(metrics.hasActiveSession).toBe(true);
    expect(metrics.activeSubjectId).toBe('sub_chem');
    expect(metrics.studiedSecondsToday).toBe(1800); // 30 mins
    expect(metrics.studiedHoursToday).toBe(0.5);

    const chemMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_chem')!;
    expect(chemMetric.studiedHoursToday).toBe(0.5);
    expect(chemMetric.remainingHours).toBe(1.5); // 2.0 - 0.5 = 1.5h
  });

  it('includes paused timer session with frozen active time', () => {
    const today = new Date('2026-10-12T16:00:00');
    const startMs = today.getTime() - 3600000;

    let timer = createInitialTimerState('sub_math');
    timer = startStudySession(timer, 'sub_math', startMs);
    // Paused after 20 minutes (1200s)
    timer = pauseStudySession(timer, startMs + 1200000);

    const metrics = calculateDailyProgress({
      subjects: mockSubjects,
      completedSessions: [],
      activeTimerState: timer,
      targetDate: today,
      dailyGoalHours: 7,
      currentTimestamp: today.getTime(),
    });

    expect(metrics.hasActiveSession).toBe(true);
    expect(metrics.studiedSecondsToday).toBe(1200); // 20 mins exactly
    expect(metrics.studiedHoursToday).toBe(0.3);
  });

  it('handles midnight-crossing sessions correctly by allocating active time per calendar day', () => {
    // Session started at 2026-10-11 23:45:00 and ended at 2026-10-12 00:30:00 (45 mins total span, 45 mins active)
    const midnightSession: StudySession = {
      id: 'sess_midnight',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#6366f1',
      startTime: '2026-10-11T23:45:00.000',
      endTime: '2026-10-12T00:30:00.000',
      activeDurationSeconds: 2700, // 45 mins (2700s)
      activeDurationMinutes: 45,
      dateString: '2026-10-11',
      mode: 'continuous',
      createdAt: '2026-10-12T00:30:00.000',
    };

    const dateYesterday = new Date('2026-10-11T12:00:00');
    const dateToday = new Date('2026-10-12T12:00:00');

    // For yesterday: 15 minutes of the session (900 seconds)
    const yesterdaySeconds = getSessionActiveSecondsOnDate(midnightSession, dateYesterday);
    expect(yesterdaySeconds).toBe(900); // 15 mins

    // For today: 30 minutes of the session (1800 seconds)
    const todaySeconds = getSessionActiveSecondsOnDate(midnightSession, dateToday);
    expect(todaySeconds).toBe(1800); // 30 mins

    // Total must sum to 2700s (no lost or double counted seconds)
    expect(yesterdaySeconds + todaySeconds).toBe(2700);
  });

  it('formats human readable duration correctly', () => {
    expect(formatDurationHoursMinutes(0)).toBe('0m');
    expect(formatDurationHoursMinutes(1500)).toBe('25m');
    expect(formatDurationHoursMinutes(3600)).toBe('1h');
    expect(formatDurationHoursMinutes(5400)).toBe('1h 30m');
    expect(formatDurationHoursMinutes(7200)).toBe('2h');
  });
});
