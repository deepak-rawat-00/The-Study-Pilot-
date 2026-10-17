export type NavigationTab =
  | 'dashboard'
  | 'timer'
  | 'subjects'
  | 'countdown'
  | 'analytics'
  | 'settings';

export type Theme = 'light' | 'dark' | 'system';

export type TimerPhase = 'idle' | 'studying' | 'paused' | 'short_break' | 'long_break';

export type TimerMode = 'pomodoro' | 'continuous';

export interface ExamPlan {
  id: string;
  category: string;
  categoryLabel: string;
  examName: string;
  dailyTargetHours: number;
  minStreakMinutes: number;
  targetExamDate?: string;
  isOnboardingCompleted: boolean;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  description?: string;
  dailyTargetHours: number;
  weeklyTargetHours: number;
  studiedHoursToday: number;
  studiedHoursThisWeek: number;
  orderIndex: number;
  examDate?: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  title: string;
  date: string; // ISO date 'YYYY-MM-DD'
  subjectId?: string;
  subjectName?: string;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
  location?: string;
  createdAt?: string;
}

export interface ExamCountdownInfo {
  exam: Exam;
  daysRemaining: number;
  status: 'today' | 'upcoming' | 'passed';
  formattedDate: string;
  isNextUpcoming: boolean;
}

export interface StudySession {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  subjectColor: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  activeDurationSeconds: number; // Actual active focus time in seconds
  activeDurationMinutes: number; // Duration in minutes (rounded to 1 decimal)
  dateString: string; // Local user date YYYY-MM-DD
  mode: TimerMode;
  notes?: string;
  createdAt: string;
}

export interface ActiveTimerState {
  phase: TimerPhase;
  mode: TimerMode;
  selectedSubjectId: string;
  targetDurationSeconds: number; // 0 for continuous mode, e.g. 1500 for 25m Pomodoro
  pomodoroCycle: number;
  sessionStartTimestamp: number | null; // Date.now() when session initially started
  lastResumeTimestamp: number | null;    // Date.now() when focus resumed
  accumulatedFocusSeconds: number;       // Accumulated active focus seconds prior to lastResume
  breakStartTimestamp: number | null;    // Date.now() when break started
  accumulatedBreakSeconds: number;       // Accumulated break seconds
  isSoundEnabled: boolean;
  isNotificationEnabled: boolean;
}

export interface StreakResult {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  totalMissedDays: number;
  totalStudyHours: number;
  totalStudySeconds: number;
  lastSuccessfulStudyDate: string | null;
  daysSinceLastStudy: number | null;
  isActiveToday: boolean;
  minStreakMinutes: number;
  historyMap: Record<string, number>; // dateString -> activeSeconds
  qualifiedDates: string[]; // sorted list of qualifying YYYY-MM-DD strings
}

export type HeatmapIntensity = 0 | 1 | 2 | 3 | 4;

export interface HeatmapSubjectBreakdown {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  subjectColor: string;
  seconds: number;
  minutes: number;
  hours: number;
}

export interface HeatmapDay {
  dateString: string;
  date: Date;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  intensity: HeatmapIntensity;
  isQualified: boolean;
  isToday: boolean;
  isFuture: boolean;
  subjectBreakdown: HeatmapSubjectBreakdown[];
}

export interface HeatmapWeek {
  weekIndex: number;
  days: Array<HeatmapDay | null>;
}

export interface HeatmapData {
  days: HeatmapDay[];
  weeks: HeatmapWeek[];
  monthLabels: Array<{ label: string; weekIndex: number }>;
  availableYears: number[];
  selectedYear: number | 'last365';
  totalPeriodStudySeconds: number;
  totalPeriodActiveDays: number;
}

export interface WeeklyDurationDay {
  dayName: string;
  shortDay: string;
  dateString: string;
  seconds: number;
  minutes: number;
  hours: number;
  isQualified: boolean;
  isToday: boolean;
}

export interface ConsistencyAnalytics {
  successfulDaysLast7: number;
  successfulDaysLast30: number;
  successfulDaysInPeriod: number;
  eligibleDaysInPeriod: number;
  consistencyPercentage: number;
  daysSinceLastStudy: number | null;
  weeklyDurationBreakdown: WeeklyDurationDay[];
}

export interface SubjectFormData {
  name: string;
  code: string;
  color: string;
  description?: string;
  dailyTargetHours?: number;
  weeklyTargetHours?: number;
  examDate?: string;
}

export interface CategoryPreset {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  defaultExamName: string;
  defaultDailyTargetHours: number;
  minStreakMinutes: number;
  defaultSubjects: Array<{
    name: string;
    code: string;
    color: string;
    dailyTargetHours: number;
  }>;
}
