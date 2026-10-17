import { Exam, ExamCountdownInfo } from '../types';

/**
 * Calculates countdown information for an individual examination.
 */
export function calculateExamCountdown(
  exam: Exam,
  referenceDate: Date = new Date()
): ExamCountdownInfo {
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);

  // Parse exam date as local midnight
  const [year, month, day] = exam.date.split('-').map(Number);
  const examDate = new Date(year, (month || 1) - 1, day || 1);
  examDate.setHours(0, 0, 0, 0);

  const diffMs = examDate.getTime() - ref.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  let status: 'today' | 'upcoming' | 'passed';
  if (diffDays === 0) {
    status = 'today';
  } else if (diffDays > 0) {
    status = 'upcoming';
  } else {
    status = 'passed';
  }

  const formattedDate = examDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    exam,
    daysRemaining: diffDays,
    status,
    formattedDate,
    isNextUpcoming: false,
  };
}

/**
 * Processes, sorts, and identifies the next upcoming exam from an array of exams.
 */
export function processAllExamCountdowns(
  exams: Exam[],
  referenceDate: Date = new Date()
): ExamCountdownInfo[] {
  if (exams.length === 0) return [];

  const list = exams.map((exam) => calculateExamCountdown(exam, referenceDate));

  // Sort order:
  // 1. 'today' first
  // 2. 'upcoming' sorted by lowest daysRemaining
  // 3. 'passed' sorted by most recently passed (largest daysRemaining which is closest to 0)
  list.sort((a, b) => {
    if (a.status === 'today' && b.status !== 'today') return -1;
    if (b.status === 'today' && a.status !== 'today') return 1;

    if (a.status === 'upcoming' && b.status === 'upcoming') {
      return a.daysRemaining - b.daysRemaining;
    }

    if (a.status === 'upcoming' && b.status === 'passed') return -1;
    if (b.status === 'upcoming' && a.status === 'passed') return 1;

    // Both passed: sort by days passed ascending (closer to today first)
    return b.daysRemaining - a.daysRemaining;
  });

  // Flag the next upcoming exam (or exam today)
  let flagged = false;
  for (const item of list) {
    if (item.status === 'today' || item.status === 'upcoming') {
      if (!flagged) {
        item.isNextUpcoming = true;
        flagged = true;
      }
    }
  }

  return list;
}
