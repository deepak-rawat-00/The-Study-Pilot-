import { describe, it, expect } from 'vitest';
import { getPageTitleForPath } from '../utils/analytics';

describe('Phase 5 — Remaining Five Interactive Tools Logic', () => {
  it('should resolve SEO titles for all 5 new tool routes', () => {
    expect(getPageTitleForPath('/tools/pomodoro-timer')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/tools/study-habit-tracker')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/tools/study-consistency-calculator')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/tools/exam-countdown')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/tools/exam-preparation-progress')).toContain('The Study Pilot');
  });

  describe('Tool 6 Logic — Study Consistency Calculator', () => {
    function computeConsistency(daysStudied: number, totalDays: number) {
      const validTotal = Math.max(1, totalDays);
      const validStudied = Math.min(validTotal, Math.max(0, daysStudied));
      const percentage = Math.min(100, Math.round((validStudied / validTotal) * 100));
      const missedDays = Math.max(0, validTotal - validStudied);
      return { percentage, missedDays };
    }

    it('should compute exact consistency percentages', () => {
      expect(computeConsistency(22, 30).percentage).toBe(73);
      expect(computeConsistency(5, 7).percentage).toBe(71);
      expect(computeConsistency(30, 30).percentage).toBe(100);
      expect(computeConsistency(0, 30).percentage).toBe(0);
    });

    it('should calculate missed days accurately', () => {
      expect(computeConsistency(22, 30).missedDays).toBe(8);
      expect(computeConsistency(30, 30).missedDays).toBe(0);
      expect(computeConsistency(0, 30).missedDays).toBe(30);
    });

    it('should prevent divide-by-zero crashes when total days is 0', () => {
      expect(computeConsistency(0, 0).percentage).toBe(0);
      expect(computeConsistency(5, 0).percentage).toBe(100);
    });
  });

  describe('Tool 7 Logic — Exam Countdown Math', () => {
    function computeCountdown(targetDateStr: string, refDate: Date = new Date()) {
      const now = new Date(refDate);
      now.setHours(0, 0, 0, 0);

      const target = new Date(targetDateStr + 'T00:00:00');
      const diffMs = target.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      const isPassed = diffDays < 0;
      const isToday = diffDays === 0;

      const days = Math.max(0, diffDays);
      const weeks = Math.round((days / 7) * 10) / 10;
      const months = Math.round((days / 30.4) * 10) / 10;

      return { days, weeks, months, isPassed, isToday };
    }

    it('should accurately compute days, weeks, and months until exam date', () => {
      const ref = new Date('2026-11-20T12:00:00');
      const target = '2027-01-04'; // 45 days away

      const res = computeCountdown(target, ref);
      expect(res.days).toBe(45);
      expect(res.weeks).toBe(6.4);
      expect(res.months).toBe(1.5);
      expect(res.isPassed).toBe(false);
      expect(res.isToday).toBe(false);
    });

    it('should recognize when the exam date is today', () => {
      const ref = new Date('2026-11-20T12:00:00');
      const target = '2026-11-20';

      const res = computeCountdown(target, ref);
      expect(res.days).toBe(0);
      expect(res.isToday).toBe(true);
      expect(res.isPassed).toBe(false);
    });

    it('should recognize when an exam date has passed', () => {
      const ref = new Date('2026-11-20T12:00:00');
      const target = '2026-11-10';

      const res = computeCountdown(target, ref);
      expect(res.days).toBe(0);
      expect(res.isPassed).toBe(true);
    });
  });

  describe('Tool 8 Logic — Exam Preparation Progress Multi-Dimensional Tracking', () => {
    interface Sub {
      total: number;
      completed: number;
      revised: number;
      practiced: number;
    }

    function computeMetrics(subjects: Sub[], completedMocks: number, targetMocks: number) {
      let totalTopics = 0;
      let completedTopics = 0;
      let revisedTopics = 0;
      let practicedTopics = 0;

      subjects.forEach((s) => {
        totalTopics += Math.max(1, s.total);
        completedTopics += Math.min(s.total, s.completed);
        revisedTopics += Math.min(s.completed, s.revised);
        practicedTopics += Math.min(s.completed, s.practiced);
      });

      const learningPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
      const revisionPercent = completedTopics > 0 ? Math.round((revisedTopics / completedTopics) * 100) : 0;
      const practicePercent = completedTopics > 0 ? Math.round((practicedTopics / completedTopics) * 100) : 0;
      const mockPercent = Math.min(100, Math.round((completedMocks / Math.max(1, targetMocks)) * 100));

      return { learningPercent, revisionPercent, practicePercent, mockPercent };
    }

    it('should maintain strict dimensional separation between learning, revision, practice, and mocks', () => {
      const subjects: Sub[] = [
        { total: 20, completed: 15, revised: 10, practiced: 8 },
        { total: 30, completed: 15, revised: 5, practiced: 5 },
      ];

      const res = computeMetrics(subjects, 5, 10);
      // Total topics = 50, Completed = 30 -> Learning = 60%
      expect(res.learningPercent).toBe(60);

      // Completed = 30, Revised = 15 -> Revision = 50%
      expect(res.revisionPercent).toBe(50);

      // Completed = 30, Practiced = 13 -> Practice = 43%
      expect(res.practicePercent).toBe(43);

      // Mocks = 5 / 10 = 50%
      expect(res.mockPercent).toBe(50);

      // Verify that learning and revision are distinct and not artificially blended
      expect(res.learningPercent).not.toBe(res.revisionPercent);
    });
  });

  describe('Tool 5 Logic — Study Habit Tracker Streak Calculations', () => {
    it('should count consecutive active days without breaking on current day if active', () => {
      const datesHistory = {
        '2026-11-20': true,
        '2026-11-19': true,
        '2026-11-18': true,
        '2026-11-16': true, // gap on 17th
      };

      const refDate = new Date('2026-11-20T12:00:00');
      let streak = 0;
      const cur = new Date(refDate);

      while (true) {
        const str = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
        if (datesHistory[str as keyof typeof datesHistory]) {
          streak++;
          cur.setDate(cur.getDate() - 1);
        } else {
          break;
        }
      }

      expect(streak).toBe(3);
    });
  });
});
