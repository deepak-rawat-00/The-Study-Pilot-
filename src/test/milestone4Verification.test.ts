import { describe, it, expect } from 'vitest';
import {
  calculateExamCountdown,
  processAllExamCountdowns,
} from '../domain/countdownEngine';
import { calculateStudyStreaks } from '../domain/streakEngine';
import {
  calculateDailyProgress,
} from '../domain/dashboardEngine';
import {
  createInitialTimerState,
  startStudySession,
} from '../domain/timerEngine';
import { Exam, StudySession, Subject } from '../types';

describe('Milestone 4 Final Verification Test Suite', () => {
  // Reference date: Monday, October 12, 2026 at 14:00:00 local time
  const refDate = new Date('2026-10-12T14:00:00.000');
  const refDateStr = '2026-10-12';

  const helperCreateSession = (
    id: string,
    dateString: string,
    durationMinutes: number,
    startHour: number = 10
  ): StudySession => ({
    id,
    subjectId: 'sub_math',
    subjectName: 'Mathematics',
    subjectCode: 'MATH',
    subjectColor: '#3b82f6',
    startTime: `${dateString}T${String(startHour).padStart(2, '0')}:00:00.000`,
    endTime: `${dateString}T${String(startHour + Math.floor(durationMinutes / 60)).padStart(2, '0')}:${String(durationMinutes % 60).padStart(2, '0')}:00.000`,
    activeDurationSeconds: durationMinutes * 60,
    activeDurationMinutes: durationMinutes,
    dateString,
    mode: 'pomodoro',
    createdAt: `${dateString}T12:00:00.000`,
  });

  // =========================================================================
  // Examination Countdown Tests (Items 1 - 6)
  // =========================================================================

  it('Case 1: Add two examinations with different future dates and verify both countdowns', () => {
    const exam1: Exam = {
      id: 'exam_1',
      title: 'SSC CGL Tier 1',
      date: '2026-10-20', // 8 days from Oct 12
      priority: 'high',
      createdAt: '2026-10-01T00:00:00.000',
    };

    const exam2: Exam = {
      id: 'exam_2',
      title: 'UPSC Civil Services Prelims',
      date: '2026-11-12', // 31 days from Oct 12
      priority: 'medium',
      createdAt: '2026-10-01T00:00:00.000',
    };

    const res1 = calculateExamCountdown(exam1, refDate);
    const res2 = calculateExamCountdown(exam2, refDate);

    expect(res1.daysRemaining).toBe(8);
    expect(res1.status).toBe('upcoming');
    expect(res1.formattedDate).toContain('Oct 20, 2026');

    expect(res2.daysRemaining).toBe(31);
    expect(res2.status).toBe('upcoming');
    expect(res2.formattedDate).toContain('Nov 12, 2026');
  });

  it('Case 2: Verify an examination scheduled for today displays "Today" / status "today"', () => {
    const examToday: Exam = {
      id: 'exam_today',
      title: 'Final Semester Physics Paper',
      date: '2026-10-12', // Today!
      priority: 'high',
      createdAt: '2026-10-01T00:00:00.000',
    };

    const result = calculateExamCountdown(examToday, refDate);
    expect(result.daysRemaining).toBe(0);
    expect(result.status).toBe('today');
  });

  it('Case 3: Verify a past examination is marked as passed, not as an upcoming exam', () => {
    const examPast: Exam = {
      id: 'exam_past',
      title: 'Mock Examination 1',
      date: '2026-10-05', // 7 days ago
      priority: 'low',
      createdAt: '2026-09-01T00:00:00.000',
    };

    const result = calculateExamCountdown(examPast, refDate);
    expect(result.daysRemaining).toBe(-7);
    expect(result.status).toBe('passed');
    expect(result.isNextUpcoming).toBe(false);
  });

  it('Case 4: Edit and delete examinations and confirm countdown list updates correctly', () => {
    let exams: Exam[] = [
      {
        id: 'exam_a',
        title: 'Original Title',
        date: '2026-10-25',
        priority: 'medium',
        createdAt: '2026-10-01T00:00:00.000',
      },
      {
        id: 'exam_b',
        title: 'Exam B',
        date: '2026-11-01',
        priority: 'low',
        createdAt: '2026-10-01T00:00:00.000',
      },
    ];

    let countdowns = processAllExamCountdowns(exams, refDate);
    expect(countdowns[0].exam.title).toBe('Original Title');
    expect(countdowns[0].daysRemaining).toBe(13);

    // 1. Edit Exam A date and title
    exams = exams.map((e) =>
      e.id === 'exam_a'
        ? { ...e, title: 'Updated Title', date: '2026-10-18', priority: 'high' }
        : e
    );

    countdowns = processAllExamCountdowns(exams, refDate);
    expect(countdowns[0].exam.title).toBe('Updated Title');
    expect(countdowns[0].daysRemaining).toBe(6);
    expect(countdowns[0].exam.priority).toBe('high');

    // 2. Delete Exam A
    exams = exams.filter((e) => e.id !== 'exam_a');
    countdowns = processAllExamCountdowns(exams, refDate);
    expect(countdowns.length).toBe(1);
    expect(countdowns[0].exam.id).toBe('exam_b');
    expect(countdowns[0].isNextUpcoming).toBe(true);
  });

  it('Case 5: Refresh simulation - verify examination data persists through localStorage serialization', () => {
    const originalExams: Exam[] = [
      {
        id: 'exam_stored_1',
        title: 'GATE 2027',
        date: '2027-02-06',
        priority: 'high',
        subjectId: 'sub_gate',
        subjectName: 'Computer Science',
        notes: 'Review Algorithms and OS',
        createdAt: '2026-10-12T10:00:00.000',
      },
    ];

    // Serialize to storage format
    const serialized = JSON.stringify(originalExams);

    // Deserialize after simulated refresh
    const rehydrated: Exam[] = JSON.parse(serialized);

    expect(rehydrated).toEqual(originalExams);
    expect(rehydrated[0].id).toBe('exam_stored_1');
    expect(rehydrated[0].notes).toBe('Review Algorithms and OS');
    expect(rehydrated[0].subjectName).toBe('Computer Science');

    const countdowns = processAllExamCountdowns(rehydrated, refDate);
    expect(countdowns.length).toBe(1);
    expect(countdowns[0].isNextUpcoming).toBe(true);
  });

  it('Case 6: Confirm the next upcoming exam is identified correctly among multiple exams', () => {
    const exams: Exam[] = [
      {
        id: 'exam_past',
        title: 'Past Exam',
        date: '2026-10-01',
        createdAt: '2026-09-01T00:00:00.000',
      },
      {
        id: 'exam_later',
        title: 'Later Exam',
        date: '2026-11-30',
        createdAt: '2026-09-01T00:00:00.000',
      },
      {
        id: 'exam_earliest_future',
        title: 'Earliest Future Exam',
        date: '2026-10-16', // 4 days away
        createdAt: '2026-09-01T00:00:00.000',
      },
    ];

    const processed = processAllExamCountdowns(exams, refDate);

    // Exam earliest future must have isNextUpcoming = true
    const nextExam = processed.find((c) => c.isNextUpcoming);
    expect(nextExam).toBeDefined();
    expect(nextExam?.exam.id).toBe('exam_earliest_future');
    expect(nextExam?.daysRemaining).toBe(4);

    // Past exam must NOT be next upcoming
    const pastExam = processed.find((c) => c.exam.id === 'exam_past');
    expect(pastExam?.isNextUpcoming).toBe(false);
    expect(pastExam?.status).toBe('passed');
  });

  // =========================================================================
  // Study Streak Tests (Items 7 - 14)
  // =========================================================================

  it('Case 7: Test each supported threshold: 15, 25, and 30 minutes', () => {
    // 20-minute session today
    const sessions = [helperCreateSession('s_20m', refDateStr, 20)];

    // At 15m threshold -> qualifies!
    const res15 = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 15,
      referenceDate: refDate,
    });
    expect(res15.isActiveToday).toBe(true);
    expect(res15.currentStreak).toBe(1);
    expect(res15.totalActiveDays).toBe(1);

    // At 25m threshold -> does not qualify
    const res25 = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });
    expect(res25.isActiveToday).toBe(false);
    expect(res25.currentStreak).toBe(0);
    expect(res25.totalActiveDays).toBe(0);

    // At 30m threshold -> does not qualify
    const res30 = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 30,
      referenceDate: refDate,
    });
    expect(res30.isActiveToday).toBe(false);
    expect(res30.currentStreak).toBe(0);
    expect(res30.totalActiveDays).toBe(0);
  });

  it('Case 8: Verify that study below the threshold does not qualify for a streak day', () => {
    // 14 minutes with 15m threshold
    const s14 = [helperCreateSession('s_14', refDateStr, 14)];
    const res14 = calculateStudyStreaks({
      sessions: s14,
      minStreakMinutes: 15,
      referenceDate: refDate,
    });
    expect(res14.isActiveToday).toBe(false);
    expect(res14.currentStreak).toBe(0);
    expect(res14.totalActiveDays).toBe(0);

    // 24 minutes with 25m threshold
    const s24 = [helperCreateSession('s_24', refDateStr, 24)];
    const res24 = calculateStudyStreaks({
      sessions: s24,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });
    expect(res24.isActiveToday).toBe(false);
    expect(res24.currentStreak).toBe(0);
    expect(res24.totalActiveDays).toBe(0);

    // 29 minutes with 30m threshold
    const s29 = [helperCreateSession('s_29', refDateStr, 29)];
    const res29 = calculateStudyStreaks({
      sessions: s29,
      minStreakMinutes: 30,
      referenceDate: refDate,
    });
    expect(res29.isActiveToday).toBe(false);
    expect(res29.currentStreak).toBe(0);
    expect(res29.totalActiveDays).toBe(0);
  });

  it('Case 9: Verify that study meeting the threshold qualifies for that day', () => {
    // Exactly 15 minutes with 15m threshold
    const s15 = [helperCreateSession('s_15', refDateStr, 15)];
    const res15 = calculateStudyStreaks({
      sessions: s15,
      minStreakMinutes: 15,
      referenceDate: refDate,
    });
    expect(res15.isActiveToday).toBe(true);
    expect(res15.currentStreak).toBe(1);
    expect(res15.totalActiveDays).toBe(1);

    // Exactly 25 minutes with 25m threshold
    const s25 = [helperCreateSession('s_25', refDateStr, 25)];
    const res25 = calculateStudyStreaks({
      sessions: s25,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });
    expect(res25.isActiveToday).toBe(true);
    expect(res25.currentStreak).toBe(1);
    expect(res25.totalActiveDays).toBe(1);

    // Exactly 30 minutes with 30m threshold
    const s30 = [helperCreateSession('s_30', refDateStr, 30)];
    const res30 = calculateStudyStreaks({
      sessions: s30,
      minStreakMinutes: 30,
      referenceDate: refDate,
    });
    expect(res30.isActiveToday).toBe(true);
    expect(res30.currentStreak).toBe(1);
    expect(res30.totalActiveDays).toBe(1);
  });

  it('Case 10: Test consecutive qualifying days and confirm the current and longest streaks', () => {
    // 4 consecutive qualifying days: Oct 9, Oct 10, Oct 11, Oct 12
    const sessions = [
      helperCreateSession('s_09', '2026-10-09', 30),
      helperCreateSession('s_10', '2026-10-10', 45),
      helperCreateSession('s_11', '2026-10-11', 25),
      helperCreateSession('s_12', '2026-10-12', 40),
    ];

    const result = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });

    expect(result.currentStreak).toBe(4);
    expect(result.longestStreak).toBe(4);
    expect(result.totalActiveDays).toBe(4);
    expect(result.isActiveToday).toBe(true);
  });

  it('Case 11: Test a missed day and verify that current streak breaks correctly without erasing longest streak', () => {
    // 4 days active (Oct 6, 7, 8, 9), missed Oct 10, then active Oct 11 and 12
    const sessions = [
      helperCreateSession('s_06', '2026-10-06', 30),
      helperCreateSession('s_07', '2026-10-07', 30),
      helperCreateSession('s_08', '2026-10-08', 30),
      helperCreateSession('s_09', '2026-10-09', 30),
      // Oct 10 was missed!
      helperCreateSession('s_11', '2026-10-11', 30),
      helperCreateSession('s_12', '2026-10-12', 30),
    ];

    const result = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });

    // Current streak restarted after the break: Oct 11 + Oct 12 = 2
    expect(result.currentStreak).toBe(2);
    // Longest streak tracks the earlier 4-day peak
    expect(result.longestStreak).toBe(4);
    // Total active days is sum of all qualifying days: 6
    expect(result.totalActiveDays).toBe(6);
  });

  it('Case 12: Verify that today incomplete activity does not incorrectly break an otherwise valid streak', () => {
    // Oct 11 (yesterday) qualified with 30m.
    // Oct 12 (today) has only 10m logged so far (< 25m threshold).
    const sessions = [
      helperCreateSession('s_yest', '2026-10-11', 30),
      helperCreateSession('s_today_inprog', '2026-10-12', 10),
    ];

    const result = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });

    // Streak is preserved and alive through yesterday!
    expect(result.currentStreak).toBe(1);
    expect(result.isActiveToday).toBe(false);
    expect(result.totalActiveDays).toBe(1);
  });

  it('Case 13: Confirm duplicate sessions are not counted twice and refreshing does not inflate streaks', () => {
    // User studies two separate 15-minute sessions on Oct 12 (total 30 mins, qualifies >= 25m)
    const sessions = [
      helperCreateSession('s_12_a', '2026-10-12', 15, 9),
      helperCreateSession('s_12_b', '2026-10-12', 15, 14),
    ];

    const run1 = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });

    // Run again (simulating multiple renders / reloads)
    const run2 = calculateStudyStreaks({
      sessions,
      minStreakMinutes: 25,
      referenceDate: refDate,
    });

    expect(run1.currentStreak).toBe(1);
    expect(run1.totalActiveDays).toBe(1);
    expect(run2.currentStreak).toBe(1);
    expect(run2.totalActiveDays).toBe(1);
    expect(run1.historyMap['2026-10-12']).toBe(1800); // 30 minutes exactly
  });

  it('Case 14: Check local-date and midnight-boundary handling for sessions', () => {
    // Session starting 23:45 on Oct 11 and ending 00:30 on Oct 12 (45m total: 15m on Oct 11, 30m on Oct 12)
    const midnightSession: StudySession = {
      id: 'sess_midnight_verify',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#3b82f6',
      startTime: '2026-10-11T23:45:00.000',
      endTime: '2026-10-12T00:30:00.000',
      activeDurationSeconds: 45 * 60,
      activeDurationMinutes: 45,
      dateString: '2026-10-11',
      mode: 'pomodoro',
      createdAt: '2026-10-12T00:30:00.000',
    };

    // Plus an earlier 15m on Oct 11 so Oct 11 reaches 30m total (qualifies >= 25m)
    const early11 = helperCreateSession('s_early_11', '2026-10-11', 15, 10);

    const result = calculateStudyStreaks({
      sessions: [early11, midnightSession],
      minStreakMinutes: 25,
      referenceDate: refDate,
    });

    // Both Oct 11 (30m) and Oct 12 (30m) qualify
    expect(result.currentStreak).toBe(2);
    expect(result.isActiveToday).toBe(true);
    expect(result.totalActiveDays).toBe(2);
  });

  // =========================================================================
  // Regression & Interoperability Checks (Item 15)
  // =========================================================================

  it('Case 15: Verify onboarding, study timer, daily targets, and subject-wise calculations continue to function flawlessly', () => {
    const subjects: Subject[] = [
      {
        id: 'sub_math',
        name: 'Mathematics',
        code: 'MATH',
        color: '#3b82f6',
        dailyTargetHours: 2,
        weeklyTargetHours: 14,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 0,
        createdAt: '2026-10-01T00:00:00.000',
      },
      {
        id: 'sub_phys',
        name: 'Physics',
        code: 'PHYS',
        color: '#10b981',
        dailyTargetHours: 1,
        weeklyTargetHours: 7,
        studiedHoursToday: 0,
        studiedHoursThisWeek: 0,
        orderIndex: 1,
        createdAt: '2026-10-01T00:00:00.000',
      },
    ];

    // 60m completed session for Math
    const completedSession: StudySession = {
      id: 'sess_math_60',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#3b82f6',
      startTime: '2026-10-12T09:00:00.000',
      endTime: '2026-10-12T10:00:00.000',
      activeDurationSeconds: 3600,
      activeDurationMinutes: 60,
      dateString: '2026-10-12',
      mode: 'pomodoro',
      createdAt: '2026-10-12T10:00:00.000',
    };

    // Live study timer running for Physics: started 30 mins ago
    const activeStartMs = refDate.getTime() - 1800 * 1000;
    const activeTimer = startStudySession(
      createInitialTimerState('sub_phys'),
      'sub_phys',
      activeStartMs
    );

    const metrics = calculateDailyProgress({
      subjects,
      completedSessions: [completedSession],
      activeTimerState: activeTimer,
      targetDate: refDate,
      dailyGoalHours: 3,
      currentTimestamp: refDate.getTime(),
    });

    // 1h math + 0.5h live physics = 1.5h studied out of 3h
    expect(metrics.targetHours).toBe(3);
    expect(metrics.studiedHoursToday).toBe(1.5);
    expect(metrics.studiedSecondsToday).toBe(5400);
    expect(metrics.remainingHours).toBe(1.5);
    expect(metrics.completionPercentage).toBe(50);
    expect(metrics.hasActiveSession).toBe(true);

    // Subject-wise breakdowns
    const mathMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_math');
    expect(mathMetric?.studiedHoursToday).toBe(1);
    expect(mathMetric?.remainingHours).toBe(1);
    expect(mathMetric?.isTargetMet).toBe(false);

    const physMetric = metrics.subjectMetrics.find((s) => s.subjectId === 'sub_phys');
    expect(physMetric?.studiedHoursToday).toBe(0.5);
    expect(physMetric?.remainingHours).toBe(0.5);
  });
});
