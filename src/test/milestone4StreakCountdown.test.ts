import { describe, it, expect } from 'vitest';
import {
  calculateExamCountdown,
  processAllExamCountdowns,
} from '../domain/countdownEngine';
import { calculateStudyStreaks } from '../domain/streakEngine';
import { Exam, StudySession } from '../types';

describe('Milestone 4: Examination Countdowns & Study Streaks', () => {
  // =========================================================================
  // 1. Examination Countdown Tests
  // =========================================================================
  describe('Examination Countdown Engine', () => {
    // Reference date: October 15, 2026 at noon
    const referenceDate = new Date('2026-10-15T12:00:00.000');

    it('calculates future exam date accurately with positive days and upcoming status', () => {
      const exam: Exam = {
        id: 'exam_1',
        title: 'SSC CGL Tier 1',
        date: '2026-10-25',
        priority: 'high',
        createdAt: '2026-10-01T00:00:00.000Z',
      };

      const result = calculateExamCountdown(exam, referenceDate);
      expect(result.daysRemaining).toBe(10);
      expect(result.status).toBe('upcoming');
      expect(result.isNextUpcoming).toBe(false);
      expect(result.formattedDate).toContain('Oct 25, 2026');
    });

    it('calculates exam happening today (D-Day) as 0 daysRemaining and today status', () => {
      const exam: Exam = {
        id: 'exam_today',
        title: 'Midterm Physics Exam',
        date: '2026-10-15',
        priority: 'high',
        createdAt: '2026-10-01T00:00:00.000Z',
      };

      const result = calculateExamCountdown(exam, referenceDate);
      expect(result.daysRemaining).toBe(0);
      expect(result.status).toBe('today');
    });

    it('calculates past exam date with negative daysRemaining and passed status', () => {
      const exam: Exam = {
        id: 'exam_past',
        title: 'Mock Test 1',
        date: '2026-10-10',
        priority: 'low',
        createdAt: '2026-10-01T00:00:00.000Z',
      };

      const result = calculateExamCountdown(exam, referenceDate);
      expect(result.daysRemaining).toBe(-5);
      expect(result.status).toBe('passed');
    });

    it('sorts multiple exams chronologically and highlights the next upcoming exam', () => {
      const exams: Exam[] = [
        {
          id: 'exam_far',
          title: 'Final Examination',
          date: '2026-12-01',
          priority: 'medium',
          createdAt: '2026-10-01T00:00:00.000Z',
        },
        {
          id: 'exam_near',
          title: 'Prelims Test',
          date: '2026-10-20',
          priority: 'high',
          createdAt: '2026-10-01T00:00:00.000Z',
        },
        {
          id: 'exam_passed',
          title: 'Unit Test',
          date: '2026-10-05',
          priority: 'low',
          createdAt: '2026-10-01T00:00:00.000Z',
        },
      ];

      const processed = processAllExamCountdowns(exams, referenceDate);
      expect(processed.length).toBe(3);

      // Earliest upcoming should be exam_near (5 days left)
      expect(processed[0].exam.id).toBe('exam_near');
      expect(processed[0].daysRemaining).toBe(5);
      expect(processed[0].isNextUpcoming).toBe(true);

      // Next should be exam_far (47 days left)
      expect(processed[1].exam.id).toBe('exam_far');
      expect(processed[1].isNextUpcoming).toBe(false);

      // Passed exam should be placed at the bottom
      expect(processed[2].exam.id).toBe('exam_passed');
      expect(processed[2].status).toBe('passed');
      expect(processed[2].isNextUpcoming).toBe(false);
    });

    it('handles exam happening today as next upcoming target', () => {
      const exams: Exam[] = [
        {
          id: 'exam_today',
          title: 'Today Final Exam',
          date: '2026-10-15',
          priority: 'high',
          createdAt: '2026-10-01T00:00:00.000Z',
        },
        {
          id: 'exam_tomorrow',
          title: 'Tomorrow Exam',
          date: '2026-10-16',
          priority: 'high',
          createdAt: '2026-10-01T00:00:00.000Z',
        },
      ];

      const processed = processAllExamCountdowns(exams, referenceDate);
      expect(processed[0].exam.id).toBe('exam_today');
      expect(processed[0].isNextUpcoming).toBe(true);
      expect(processed[0].status).toBe('today');
      expect(processed[1].isNextUpcoming).toBe(false);
    });

    it('gracefully handles empty exam list', () => {
      const processed = processAllExamCountdowns([], referenceDate);
      expect(processed).toEqual([]);
    });
  });

  // =========================================================================
  // 2. Study Streak Engine Tests
  // =========================================================================
  describe('Study Streak Engine', () => {
    // Reference date: Monday, October 19, 2026
    const refDate = new Date('2026-10-19T14:00:00.000');

    const createSession = (
      id: string,
      dateString: string,
      durationMinutes: number
    ): StudySession => ({
      id,
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectCode: 'MATH',
      subjectColor: '#3b82f6',
      startTime: `${dateString}T10:00:00.000`,
      endTime: `${dateString}T11:00:00.000`,
      activeDurationSeconds: durationMinutes * 60,
      activeDurationMinutes: durationMinutes,
      dateString,
      mode: 'pomodoro',
      createdAt: `${dateString}T11:00:00.000`,
    });

    it('counts a day as active ONLY when total focus time reaches the configured threshold (e.g. 25m)', () => {
      // 24 minutes on Oct 19 -> sub-threshold (threshold is 25m)
      const subThreshold = [createSession('s1', '2026-10-19', 24)];
      const resultSub = calculateStudyStreaks({
        sessions: subThreshold,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });
      expect(resultSub.isActiveToday).toBe(false);
      expect(resultSub.totalActiveDays).toBe(0);
      expect(resultSub.currentStreak).toBe(0);

      // Exactly 25 minutes -> meets threshold
      const exactThreshold = [createSession('s2', '2026-10-19', 25)];
      const resultExact = calculateStudyStreaks({
        sessions: exactThreshold,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });
      expect(resultExact.isActiveToday).toBe(true);
      expect(resultExact.totalActiveDays).toBe(1);
      expect(resultExact.currentStreak).toBe(1);
    });

    it('supports user-selected threshold of 15m, 25m, or 30m', () => {
      // A session with 20 minutes
      const sessions = [createSession('s1', '2026-10-19', 20)];

      // Under 15m threshold -> qualifies!
      const result15 = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 15,
        referenceDate: refDate,
      });
      expect(result15.isActiveToday).toBe(true);
      expect(result15.currentStreak).toBe(1);

      // Under 25m threshold -> does not qualify
      const result25 = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });
      expect(result25.isActiveToday).toBe(false);
      expect(result25.currentStreak).toBe(0);

      // Under 30m threshold -> does not qualify
      const result30 = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 30,
        referenceDate: refDate,
      });
      expect(result30.isActiveToday).toBe(false);
      expect(result30.currentStreak).toBe(0);
    });

    it('preserves active streak when yesterday met threshold and today is in progress (< threshold)', () => {
      // Yesterday (Oct 18) met threshold with 30m.
      // Today (Oct 19) is in progress with only 10m.
      const sessions = [
        createSession('s_yest', '2026-10-18', 30),
        createSession('s_today', '2026-10-19', 10),
      ];

      const result = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });

      // Yesterday was active, today is still in progress, so current streak remains alive (= 1)
      expect(result.currentStreak).toBe(1);
      expect(result.isActiveToday).toBe(false);
      expect(result.totalActiveDays).toBe(1);
    });

    it('extends streak by 1 when today completes threshold', () => {
      // 3 consecutive qualified days: Oct 17, Oct 18, and Oct 19
      const sessions = [
        createSession('s_17', '2026-10-17', 30),
        createSession('s_18', '2026-10-18', 45),
        createSession('s_19', '2026-10-19', 25),
      ];

      const result = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });

      expect(result.currentStreak).toBe(3);
      expect(result.longestStreak).toBe(3);
      expect(result.isActiveToday).toBe(true);
      expect(result.totalActiveDays).toBe(3);
    });

    it('resets current streak to 0 if yesterday was missed and today has not yet qualified', () => {
      // Oct 16 was active, but Oct 17 and 18 were missed.
      // Today (Oct 19) has 5m logged.
      const sessions = [
        createSession('s_16', '2026-10-16', 60),
        createSession('s_19', '2026-10-19', 5),
      ];

      const result = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });

      // Current streak is 0 because yesterday was missed and today is < threshold
      expect(result.currentStreak).toBe(0);
      expect(result.isActiveToday).toBe(false);
      // Longest streak tracks the earlier 1-day run
      expect(result.longestStreak).toBe(1);
      expect(result.totalActiveDays).toBe(1);
    });

    it('starts new streak of 1 if yesterday was missed but today completes threshold', () => {
      // Oct 16 was active, Oct 17 and 18 were missed.
      // Today (Oct 19) reached 30m.
      const sessions = [
        createSession('s_16', '2026-10-16', 60),
        createSession('s_19', '2026-10-19', 30),
      ];

      const result = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });

      expect(result.currentStreak).toBe(1);
      expect(result.isActiveToday).toBe(true);
      expect(result.totalActiveDays).toBe(2);
    });

    it('accurately calculates historical longest streak across gap periods', () => {
      // 5-day streak in early October (Oct 1 to Oct 5)
      // Then a 5-day break
      // Then a 2-day streak (Oct 11 to Oct 12)
      // Then today is Oct 19 (no sessions yet)
      const sessions: StudySession[] = [
        createSession('s_01', '2026-10-01', 30),
        createSession('s_02', '2026-10-02', 40),
        createSession('s_03', '2026-10-03', 25),
        createSession('s_04', '2026-10-04', 50),
        createSession('s_05', '2026-10-05', 35),
        // Gap
        createSession('s_11', '2026-10-11', 30),
        createSession('s_12', '2026-10-12', 30),
      ];

      const result = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });

      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(5);
      expect(result.totalActiveDays).toBe(7);
    });

    it('accumulates multiple sessions on the same calendar day without duplicate streak inflation', () => {
      // 3 separate 10-minute sessions on Oct 19 -> total 30 mins (qualifies >= 25m)
      const sessions = [
        createSession('s_19_a', '2026-10-19', 10),
        createSession('s_19_b', '2026-10-19', 10),
        createSession('s_19_c', '2026-10-19', 10),
      ];

      const result = calculateStudyStreaks({
        sessions,
        minStreakMinutes: 25,
        referenceDate: refDate,
      });

      expect(result.isActiveToday).toBe(true);
      // Single calendar day should count as exactly 1 day streak
      expect(result.currentStreak).toBe(1);
      expect(result.totalActiveDays).toBe(1);
      expect(result.historyMap['2026-10-19']).toBe(30 * 60);
    });

    it('properly attributes midnight-spanning split sessions to their respective days', () => {
      // Session starts Oct 18 at 23:45 and ends Oct 19 at 00:30 (45 mins total: 15m on Oct 18, 30m on Oct 19)
      const midnightSpanningSession: StudySession = {
        id: 'sess_midnight',
        subjectId: 'sub_math',
        subjectName: 'Mathematics',
        subjectCode: 'MATH',
        subjectColor: '#3b82f6',
        startTime: '2026-10-18T23:45:00.000',
        endTime: '2026-10-19T00:30:00.000',
        activeDurationSeconds: 45 * 60,
        activeDurationMinutes: 45,
        dateString: '2026-10-18', // Started on 18th
        mode: 'pomodoro',
        createdAt: '2026-10-19T00:30:00.000',
      };

      // Also Oct 18 had a 15m session earlier (so Oct 18 total is 15m + 15m = 30m)
      const earlierSession = createSession('s_18_early', '2026-10-18', 15);

      const result = calculateStudyStreaks({
        sessions: [earlierSession, midnightSpanningSession],
        minStreakMinutes: 25,
        referenceDate: refDate,
      });

      // Oct 18 got 15m + 15m = 30m (qualifies >= 25m)
      // Oct 19 got 30m (qualifies >= 25m)
      // Both days qualify, so streak is 2!
      expect(result.currentStreak).toBe(2);
      expect(result.isActiveToday).toBe(true);
      expect(result.totalActiveDays).toBe(2);
    });
  });
});
