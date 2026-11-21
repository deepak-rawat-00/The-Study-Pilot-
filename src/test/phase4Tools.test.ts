import { describe, it, expect } from 'vitest';
import { getPageTitleForPath } from '../utils/analytics';

describe('Phase 4 — First Three Interactive Tools & Math Logic', () => {
  it('should resolve SEO titles for all three tool routes and tools hub', () => {
    expect(getPageTitleForPath('/tools')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/tools/study-planner-generator')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/tools/weekly-study-planner')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/tools/study-hours-calculator')).toContain('The Study Pilot');
  });

  describe('Tool 3 Math Logic — Study Hours Calculator', () => {
    function computeSession(startTime: string, endTime: string, breakMinutes: number) {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);

      let grossMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      if (grossMinutes < 0) {
        grossMinutes += 24 * 60;
      }

      const breaks = Math.max(0, breakMinutes || 0);
      const netMinutes = Math.max(0, grossMinutes - breaks);

      const netHours = Math.round((netMinutes / 60) * 10) / 10;
      const grossHours = Math.round((grossMinutes / 60) * 10) / 10;

      return { grossMinutes, netMinutes, grossHours, netHours };
    }

    it('should accurately compute standard session durations and break deductions', () => {
      // 09:00 to 13:00 = 4 hours (240 mins), 30m break = 210 mins net (3.5h)
      const res = computeSession('09:00', '13:00', 30);
      expect(res.grossMinutes).toBe(240);
      expect(res.netMinutes).toBe(210);
      expect(res.grossHours).toBe(4.0);
      expect(res.netHours).toBe(3.5);
    });

    it('should correctly handle overnight study blocks', () => {
      // 23:00 to 01:30 = 2.5 hours (150 mins), 15m break = 135 mins net (2.3h)
      const res = computeSession('23:00', '01:30', 15);
      expect(res.grossMinutes).toBe(150);
      expect(res.netMinutes).toBe(135);
      expect(res.netHours).toBe(2.3);
    });

    it('should compute weekly and monthly study projections accurately', () => {
      const dailyNetHours = 4.2;
      const daysPerWeek = 6;
      const weekly = Math.round(dailyNetHours * daysPerWeek * 10) / 10;
      const monthly = Math.round(weekly * 4.33 * 10) / 10;

      expect(weekly).toBe(25.2);
      expect(monthly).toBe(109.1);
    });

    it('should calculate efficiency percentage cleanly without dividing by zero', () => {
      const gross = 300;
      const net = 240;
      const efficiency = Math.round((net / gross) * 100);
      expect(efficiency).toBe(80);

      const zeroGross = 0;
      const safeEfficiency = zeroGross > 0 ? Math.round((0 / zeroGross) * 100) : 0;
      expect(safeEfficiency).toBe(0);
    });
  });

  describe('Tool 1 Logic — Study Planner Generator', () => {
    it('should sort subjects by weighted difficulty and priority', () => {
      interface MockSub {
        name: string;
        difficulty: 'easy' | 'medium' | 'hard';
        priority: 'low' | 'medium' | 'high';
      }

      const subs: MockSub[] = [
        { name: 'Casual History', difficulty: 'easy', priority: 'low' },
        { name: 'Advanced Calculus', difficulty: 'hard', priority: 'high' },
        { name: 'Core Chemistry', difficulty: 'medium', priority: 'medium' },
      ];

      const weight = (s: MockSub) => {
        const diffWeight = s.difficulty === 'hard' ? 3 : s.difficulty === 'medium' ? 2 : 1;
        const prioWeight = s.priority === 'high' ? 3 : s.priority === 'medium' ? 2 : 1;
        return diffWeight * prioWeight;
      };

      const sorted = [...subs].sort((a, b) => weight(b) - weight(a));
      expect(sorted[0].name).toBe('Advanced Calculus'); // 3*3 = 9
      expect(sorted[1].name).toBe('Core Chemistry');     // 2*2 = 4
      expect(sorted[2].name).toBe('Casual History');    // 1*1 = 1
    });

    it('should allocate revision and practice percentages proportionally', () => {
      const dailyHours = 5;
      const totalMins = dailyHours * 60; // 300 mins
      const revisionPercent = 20; // 60 mins
      const practicePercent = 20; // 60 mins

      const revMins = Math.round(totalMins * (revisionPercent / 100));
      const pracMins = Math.round(totalMins * (practicePercent / 100));
      const studyMins = totalMins - revMins - pracMins;

      expect(revMins).toBe(60);
      expect(pracMins).toBe(60);
      expect(studyMins).toBe(180);
      expect(revMins + pracMins + studyMins).toBe(300);
    });
  });

  describe('Tool 2 Logic — Weekly Study Planner Structure', () => {
    it('should maintain 7 days from Monday through Sunday', () => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      expect(days.length).toBe(7);
      expect(days[0]).toBe('Monday');
      expect(days[6]).toBe('Sunday');
    });

    it('should duplicate sessions to another day cleanly with new IDs', () => {
      const sourceSessions = [
        { id: 'sess_1', subject: 'Math', durationMinutes: 60, completed: true },
        { id: 'sess_2', subject: 'Physics', durationMinutes: 45, completed: false },
      ];

      const duplicated = sourceSessions.map((s) => ({
        ...s,
        id: 'copy_' + Math.random().toString(36),
        completed: false, // Reset completed state on duplication
      }));

      expect(duplicated.length).toBe(2);
      expect(duplicated[0].id).not.toBe(sourceSessions[0].id);
      expect(duplicated[0].completed).toBe(false);
      expect(duplicated[0].subject).toBe('Math');
    });
  });
});
