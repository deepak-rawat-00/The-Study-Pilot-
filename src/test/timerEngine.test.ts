import { describe, it, expect } from 'vitest';
import {
  createInitialTimerState,
  startStudySession,
  pauseStudySession,
  resumeStudySession,
  startBreakPeriod,
  endBreakPeriod,
  calculateActiveElapsedSeconds,
  calculateBreakElapsedSeconds,
  createCompletedStudySession,
  formatSecondsToTimeString,
} from '../domain/timerEngine';

describe('timerEngine: Correctness & Precision', () => {
  it('initializes with default idle state and zero active time', () => {
    const state = createInitialTimerState('sub_math');
    expect(state.phase).toBe('idle');
    expect(state.selectedSubjectId).toBe('sub_math');
    expect(state.accumulatedFocusSeconds).toBe(0);
    expect(calculateActiveElapsedSeconds(state, Date.now())).toBe(0);
  });

  it('starts study session and calculates active elapsed time from timestamps', () => {
    const startMs = 1700000000000;
    const initial = createInitialTimerState('sub_math');
    const running = startStudySession(initial, 'sub_math', startMs);

    expect(running.phase).toBe('studying');
    expect(running.sessionStartTimestamp).toBe(startMs);
    expect(running.lastResumeTimestamp).toBe(startMs);

    // After 60 seconds (60,000 ms)
    const activeSec60 = calculateActiveElapsedSeconds(running, startMs + 60000);
    expect(activeSec60).toBe(60);

    // After 25 minutes (1,500,000 ms)
    const activeSec25m = calculateActiveElapsedSeconds(running, startMs + 1500000);
    expect(activeSec25m).toBe(1500);
  });

  it('excludes paused time: active seconds do not increase while paused', () => {
    const startMs = 1700000000000;
    const initial = createInitialTimerState('sub_math');
    const running = startStudySession(initial, 'sub_math', startMs);

    // Studied for 300 seconds (5 minutes)
    const pauseMs = startMs + 300000;
    const paused = pauseStudySession(running, pauseMs);

    expect(paused.phase).toBe('paused');
    expect(paused.accumulatedFocusSeconds).toBe(300);
    expect(paused.lastResumeTimestamp).toBeNull();

    // While paused for 10 minutes (600,000 ms)
    const duringPause1 = calculateActiveElapsedSeconds(paused, pauseMs + 100000);
    const duringPause2 = calculateActiveElapsedSeconds(paused, pauseMs + 600000);

    expect(duringPause1).toBe(300);
    expect(duringPause2).toBe(300);
  });

  it('resumes accurately and continues accumulating only active time', () => {
    const startMs = 1700000000000;
    const initial = createInitialTimerState('sub_math');
    const running = startStudySession(initial, 'sub_math', startMs);

    // Studied for 300s, then paused for 600s
    const pauseMs = startMs + 300000;
    const paused = pauseStudySession(running, pauseMs);
    const resumeMs = pauseMs + 600000;
    const resumed = resumeStudySession(paused, resumeMs);

    expect(resumed.phase).toBe('studying');
    expect(resumed.accumulatedFocusSeconds).toBe(300);

    // Studied for an additional 120s after resume
    const checkMs = resumeMs + 120000;
    const totalActive = calculateActiveElapsedSeconds(resumed, checkMs);

    expect(totalActive).toBe(420); // 300s + 120s = 420s (7 mins). 600s paused time completely excluded!
  });

  it('break isolation: break time does NOT count toward study time', () => {
    const startMs = 1700000000000;
    const initial = createInitialTimerState('sub_math');
    const running = startStudySession(initial, 'sub_math', startMs);

    // Studied for 1500 seconds (25 minutes Pomodoro)
    const studyDoneMs = startMs + 1500000;
    const breakState = startBreakPeriod(running, 'short_break', studyDoneMs);

    expect(breakState.phase).toBe('short_break');
    expect(breakState.accumulatedFocusSeconds).toBe(1500);

    // 5 minutes break elapsed (300,000 ms)
    const midBreakMs = studyDoneMs + 300000;
    const studySecondsDuringBreak = calculateActiveElapsedSeconds(breakState, midBreakMs);
    const breakElapsedSeconds = calculateBreakElapsedSeconds(breakState, midBreakMs);

    // Active study time MUST remain 1500
    expect(studySecondsDuringBreak).toBe(1500);
    // Break elapsed should be 300
    expect(breakElapsedSeconds).toBe(300);

    // Ending break transitions back to idle for next cycle
    const afterBreak = endBreakPeriod(breakState);
    expect(afterBreak.phase).toBe('idle');
    expect(afterBreak.pomodoroCycle).toBe(2);
  });

  it('creates completed study session with exact active minutes and local date', () => {
    const startMs = 1700000000000;
    const initial = createInitialTimerState('sub_physics');
    const running = startStudySession(initial, 'sub_physics', startMs);

    // Studied 1800 seconds (30 mins)
    const endMs = startMs + 1800000;
    const session = createCompletedStudySession(
      running,
      { id: 'sub_physics', name: 'Physics', code: 'PHY', color: '#f59e0b' },
      endMs,
      'Solved mechanics problems'
    );

    expect(session.subjectId).toBe('sub_physics');
    expect(session.subjectName).toBe('Physics');
    expect(session.subjectCode).toBe('PHY');
    expect(session.activeDurationSeconds).toBe(1800);
    expect(session.activeDurationMinutes).toBe(30);
    expect(session.notes).toBe('Solved mechanics problems');
    expect(session.dateString).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('formats time string into MM:SS and HH:MM:SS properly', () => {
    expect(formatSecondsToTimeString(0)).toBe('00:00');
    expect(formatSecondsToTimeString(45)).toBe('00:45');
    expect(formatSecondsToTimeString(1500)).toBe('25:00'); // 25 mins
    expect(formatSecondsToTimeString(3600)).toBe('01:00:00'); // 1 hour
    expect(formatSecondsToTimeString(3665)).toBe('01:01:05'); // 1 hour 1 min 5 sec
  });
});
