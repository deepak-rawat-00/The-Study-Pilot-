# StudyPilot — Master Architecture & Implementation Plan
**Universal Study Productivity Platform**

---

## 1. Executive Summary & Product Vision

**StudyPilot** is an open, modern, privacy-first study productivity platform designed to help students organize their academic life, track authentic focused study hours, maintain daily streaks, and achieve exam targets.

### Target Audiences Supported
- **School Students**: Classes 9–12 across CBSE, ICSE, and State Boards.
- **Government Exam Aspirants**: SSC (CGL, CHSL, CPO, Steno, JE), RRB NTPC/Group D, Banking (IBPS, SBI), State PSCs.
- **Civil Services**: UPSC CSE & State Civil Services.
- **Competitive Entrance**: JEE Main, JEE Advanced, NEET-UG, GATE, CAT, CUET.
- **College & University**: Undergraduates and postgraduates across STEM, Humanities, Law, and Medicine.
- **International Exams**: GRE, GMAT, SAT, IELTS, TOEFL, USMLE.
- **Lifelong Learners**: Professionals upskilling or studying certification curricula.

### Fundamental Philosophy
- **Authentic Effort Only**: No fake hours, no fabricated progress bars, no vanity metrics.
- **Zero Distractions**: No social feeds, no PDF clutter, no heavy course videos. Strictly productivity and time tracking.
- **Universal & Customizable**: Never hardcoded to a single syllabus. Users can choose presets or create completely custom exam categories and subjects.
- **Local & Privacy-Preserving**: Runs in the student's browser with `localStorage`. No mandatory sign-ups, no tracking cookies, and zero cloud lock-in initially.

---

## 2. Environment & Zero-Cost Budget Confirmation

### System Inspection Results
- **Node.js**: `v21.2.0` (Verified installed and active)
- **npm**: `10.2.3` (Verified installed and active)
- **Git**: `2.43.0.windows.1` (Verified installed and active)
- **Operating System**: Windows

### Budget & Cost Guarantee
- **Total Initial Cost**: **₹0 (Completely Free)**.
- **No Paid APIs**: No OpenAI, Anthropic, or external cloud API keys required.
- **No Paid Backend**: Runs locally via browser storage (`localStorage`).
- **Free Deployment Paths**: Can be deployed at zero cost via Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
- **Future Database Path**: Architecture will use an abstracted repository pattern so transitioning to Supabase (free tier) in later phases requires zero rewrites of core domain logic.

---

## 3. Architecture & Separation of Concerns

The project follows a **layered clean architecture** separating presentation, state management, business domain calculations, and data persistence.

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│    (React Components, Tailwind CSS, Responsive Layout)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  State Management Context                   │
│   (StudyContext, TimerContext, StreakContext, ThemeContext) │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Domain Services Engine                   │
│    (Pure TypeScript Business Logic & Unit-Tested Math)      │
│  - TimerEngine (Timestamp math, duration, pause/resume)     │
│  - StreakEngine (Heatmap math, active day qualification)    │
│  - AnalyticsEngine (Daily/Weekly/Monthly/Yearly aggregation)│
│  - GoalEngine (Allocations, target progress, remaining time)│
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Persistence Repository                   │
│  - IStorageRepository (Interface definition)                │
│  - LocalStorageRepository (Safe JSON parsing & versioning)  │
│  [Future: SupabaseStorageRepository]                        │
└─────────────────────────────────────────────────────────────┘
```

### Why this architecture matters:
1. **Testability**: Pure domain functions (`calculateStreak`, `getElapsedSeconds`, `aggregateWeeklyAnalytics`) have no React or DOM dependencies. They can be tested 100% with Vitest.
2. **Portability**: When transitioning from `localStorage` to a cloud database (like Supabase or Firebase), only the repository implementation changes; components and calculation engines remain untouched.
3. **Robustness**: UI components simply display state; complex timestamp and streak math is handled by tested domain services.

---

## 4. Proposed Directory Structure

```
StudyvPilot/
├── docs/
│   ├── implementation-plan.md       # This comprehensive master plan
│   └── architecture-decisions.md   # ADR log of key technical choices
├── public/
│   └── favicon.svg                  # Brand icon
├── src/
│   ├── assets/                      # Static icons and illustrations
│   ├── components/
│   │   ├── common/                  # Atomic reusable components
│   │   │   ├── Button.tsx           # Button with variants and loading states
│   │   │   ├── Card.tsx             # Card containers with headers & footers
│   │   │   ├── ProgressBar.tsx      # Accessible progress indicators
│   │   │   ├── Badge.tsx            # Status and tag chips
│   │   │   └── Modal.tsx            # Accessible modal dialog
│   │   ├── layout/                  # Page shell
│   │   │   ├── Navbar.tsx           # Top navigation bar
│   │   │   ├── Sidebar.tsx          # Responsive navigation (desktop & mobile drawer)
│   │   │   └── ThemeToggle.tsx      # Light / Dark / System switcher
│   │   ├── onboarding/              # First-visit setup flow
│   │   │   ├── WelcomeHero.tsx      # "Your goals. Your time. Your progress."
│   │   │   ├── CategorySelector.tsx # Preset exams & custom category creation
│   │   │   ├── SubjectConfig.tsx    # Add, rename, reorder, remove subjects
│   │   │   └── GoalAllocation.tsx   # Daily target & subject hour allocation
│   │   ├── dashboard/               # Main dashboard widgets
│   │   │   ├── DailyGoalCard.tsx    # Target, completed, remaining, %
│   │   │   ├── SubjectCard.tsx      # Individual subject target vs actual progress
│   │   │   ├── StreakSummaryCard.tsx# Current and longest streak badge
│   │   │   ├── NextSubjectSuggestion.tsx # Smart suggestion based on remaining targets
│   │   │   └── RecentSessionsList.tsx # Audit log of recent focus intervals
│   │   ├── timer/                   # Timer feature components
│   │   │   ├── TimerDisplay.tsx     # Large circular timestamp clock
│   │   │   ├── TimerControls.tsx    # Start, Pause, Resume, End, Reset
│   │   │   ├── ModeSelector.tsx     # Pomodoro vs Continuous mode
│   │   │   └── BreakOverlay.tsx     # Short and long break calm view
│   │   ├── countdown/               # Exam countdown cards
│   │   ├── analytics/               # Visual charts and heatmaps
│   │   │   ├── DailyAnalytics.tsx
│   │   │   ├── WeeklyBarChart.tsx
│   │   │   ├── MonthlyHeatmap.tsx
│   │   │   └── YearlySummary.tsx
│   │   ├── tasks/                   # Tasks and revision planner
│   │   └── settings/                # Preferences and data export/reset
│   ├── context/                     # React Context providers
│   │   ├── ThemeContext.tsx         # Light / Dark / System theme state
│   │   ├── StudyContext.tsx         # Subjects, goals, and active plan
│   │   ├── TimerContext.tsx         # Timer tick, session state, mode
│   │   └── StreakContext.tsx        # Streak metrics and calendar status
│   ├── domain/                      # Pure business logic engines
│   │   ├── timerEngine.ts           # Timestamp elapsed math & validation
│   │   ├── streakEngine.ts          # Active day qualification & streak math
│   │   ├── analyticsEngine.ts       # Weekly/monthly aggregation helpers
│   │   └── goalEngine.ts            # Allocation verification & percentages
│   ├── storage/                     # Persistence abstraction
│   │   ├── storageInterface.ts      # Repository contracts
│   │   └── localStorageRepo.ts      # Safe versioned localStorage operations
│   ├── types/
│   │   └── index.ts                 # Central domain TypeScript definitions
│   ├── utils/
│   │   ├── cn.ts                    # Class name merge utility
│   │   ├── dateUtils.ts             # Local date boundaries and formatting
│   │   └── timeUtils.ts             # Seconds to hh:mm:ss formatting
│   ├── test/                        # Vitest automated test suites
│   │   ├── timerEngine.test.ts      # Timer timestamp math & pause tests
│   │   ├── streakEngine.test.ts     # Streaks, gaps, & midnight transition tests
│   │   └── goalEngine.test.ts       # Allocation calculation tests
│   ├── App.tsx                      # Main application view router
│   ├── main.tsx                     # React application entry point
│   └── index.css                    # Tailwind CSS directives & global rules
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 5. Domain Data Models (TypeScript)

```typescript
// 1. Examination Plan & Category
export interface ExamPlan {
  id: string;
  category: string; // 'SSC' | 'UPSC' | 'JEE' | 'NEET' | 'College' | 'Custom'
  examName: string; // e.g. "SSC CGL 2025" or "B.Tech Computer Science"
  targetExamDate?: string; // ISO Date YYYY-MM-DD
  dailyTargetHours: number; // e.g. 8 hours
  minMinutesForStreak: number; // e.g. 15, 25, or 30 minutes
  createdAt: string;
}

// 2. Subject with Target Allocation
export interface Subject {
  id: string;
  name: string;
  code: string; // e.g. "MATH", "GK"
  color: string; // Hex color for chips & charts
  dailyTargetMinutes: number; // e.g. 180 (3 hours)
  orderIndex: number; // For drag/reorder
  isActive: boolean;
  createdAt: string;
}

// 3. Study Session (The Source of Truth)
export interface StudySession {
  id: string;
  subjectId: string;
  subjectName: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  durationMinutes: number; // Focused time only (excluding pause and break)
  dateString: string; // Local user date 'YYYY-MM-DD'
  mode: 'pomodoro' | 'continuous';
  notes?: string;
  createdAt: string;
}

// 4. Timer State (Persisted across tab reloads)
export interface ActiveTimerState {
  isRunning: boolean;
  isPaused: boolean;
  isBreak: boolean;
  breakType: 'none' | 'short' | 'long';
  mode: 'pomodoro' | 'continuous';
  subjectId: string;
  targetDurationSeconds: number; // e.g. 1500 for 25m Pomodoro
  sessionStartTimestamp: number | null; // Epoch ms
  lastResumeTimestamp: number | null;    // Epoch ms
  accumulatedFocusMs: number;            // Prior focus elapsed before last pause
  accumulatedPauseMs: number;            // Paused duration to subtract
}

// 5. Streak Metrics
export interface StreakMetrics {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  lastActiveDate: string | null; // 'YYYY-MM-DD'
  minMinutesRequired: number;
  historyMap: Record<string, number>; // { '2026-10-12': 185 } (minutes per day)
}

// 6. Exam Countdown
export interface ExamCountdown {
  id: string;
  name: string;
  examDate: string; // 'YYYY-MM-DD'
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

// 7. Study Tasks
export interface StudyTask {
  id: string;
  subjectId: string;
  title: string;
  estimatedMinutes: number;
  dueDate: string; // 'YYYY-MM-DD'
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  completedAt?: string;
}

// 8. User Settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  pomodoroFocusMinutes: number; // default 25
  pomodoroShortBreakMinutes: number; // default 5
  pomodoroLongBreakMinutes: number; // default 15
  soundEnabled: boolean;
  reducedMotion: boolean;
  storageVersion: number;
}
```

---

## 6. Core Calculation Strategies

### 6.1. Study Timer Correctness Strategy
A critical defect in naive web timers is calculating elapsed time with `seconds++` inside `setInterval(..., 1000)`. When a browser tab goes into the background, operating systems throttle timers, losing minutes or stopping entirely.

#### Timestamp-Based Architecture:
1. When the user clicks **Start**:
   - Record `startTimestamp = Date.now()`.
   - Set `accumulatedFocusMs = 0`.
2. While running:
   - On every tick (e.g., 250ms interval for smooth UI):
     $$\text{currentFocusMs} = \text{accumulatedFocusMs} + (\text{Date.now()} - \text{lastResumeTimestamp})$$
   - Display formatted elapsed time.
3. When the user clicks **Pause**:
   - `accumulatedFocusMs += (Date.now() - lastResumeTimestamp)`
   - Set `lastResumeTimestamp = null`.
4. When the user clicks **Resume**:
   - `lastResumeTimestamp = Date.now()`.
5. When the user clicks **End / Save Session**:
   - Calculate final focus minutes: $\lfloor\text{accumulatedFocusMs} / 60000\rfloor$.
   - **Duplicate-Save Prevention**: Generate a unique session ID immediately, transition timer to idle, disable save button, and write to storage atomically.
   - **Interrupted Session Recovery**: On page reload, if `sessionStartTimestamp` exists in `localStorage`, compute real elapsed time immediately without reset.

### 6.2. Streak Calculation Strategy
A streak must reflect authentic effort on consecutive calendar days.

1. **Active Day Qualification**:
   A day $D$ is classified as "active" if and only if:
   $$\sum_{\text{sessions on } D} \text{durationMinutes} \ge \text{minMinutesForStreak}$$
2. **Calendar Date Calculation**:
   - Group sessions strictly by the user's **local date** (`YYYY-MM-DD`).
   - If today is not yet qualified, the streak is NOT broken if yesterday was active.
   - If yesterday was active and today reaches the minimum, streak increases by 1.
   - If yesterday had zero qualified study, current streak resets to 1 (if today is qualified) or 0.
3. **Midnight Transitions**:
   If a study session begins at 11:45 PM and ends at 12:30 AM, attribute the elapsed time correctly to the calendar day where the focus occurred or split appropriately.

---

## 7. Edge Cases & Resilience Strategy

| Edge Case | Risk | Engineered Solution |
| :--- | :--- | :--- |
| **Tab Background / Laptop Sleep** | Timer stops or drifts | Use `Date.now()` timestamp diffs. Timer calculates exact real-world elapsed time upon wake. |
| **Accidental Tab Closure / Refresh** | Current study session lost | Persist active timer snapshot (`sessionStartTimestamp`, `accumulatedMs`) to `localStorage` every 5 seconds. Offer "Resume Session" upon reload. |
| **Rapid Button Clicks** | Multiple duplicate sessions saved | Debounce action buttons and apply a boolean mutex lock (`isSaving`) during session creation. |
| **Midnight Crossing** | Session logged under wrong date | Compare start date and end date; tag session using user's local timezone calendar boundary. |
| **Subject Deletion** | Orphaned historical sessions | Retain historical sessions by storing both `subjectId` and `subjectName` snapshot in `StudySession`. Historical stats remain intact. |
| **Corrupt LocalStorage / Quota** | App crashes on boot | Wrap all storage reads in `try/catch` with schema versioning (`studypilot_v1`). Provide self-healing fallback defaults. |
| **Daily Goal vs Allocation Mismatch** | Confusion if subject hours != daily goal | Provide a real-time auto-sum indicator with friendly badge: "Allocated: 7h / Goal: 8h (1h unallocated)". Never block user harshly. |

---

## 8. Dependencies Required

### Production Dependencies
- `react` & `react-dom` (`^18.3.1`): Stable UI framework.
- `lucide-react` (`^0.447.0`): Consistent icon system.
- `clsx` & `tailwind-merge`: Reliable utility class merging.
- `recharts`: For Milestone 5 analytics (responsive, zero cost, works completely client-side).

### Development & Testing Dependencies
- `typescript` (`^5.5.3`): Type safety and interfaces.
- `vite` (`^5.4.2`): High-performance dev server and bundler.
- `tailwindcss` (`^3.4.11`), `postcss`, `autoprefixer`: Modern responsive styling.
- `vitest` (`^2.1.0`): Fast unit testing for calculation engines.

---

## 9. Phased Milestone Roadmap

### Milestone 1: Foundation & Setup Flow *(Current Status: Foundation initialized)*
- Responsive dashboard layout (Desktop sidebar + mobile drawer).
- Reusable components (`Button`, `Card`, `ProgressBar`, `Badge`, `Modal`).
- Theme switcher (Light / Dark / System).
- First-visit onboarding experience:
  - Preset exam categories (SSC, UPSC, JEE, NEET, College, Custom).
  - Subject creation, renaming, reordering, and removal.
  - Daily target and subject hour allocation with mismatch warnings.
- Verification: Build and type check clean.

### Milestone 2: Functional Study Timer & Break Engine
- Timestamp-based focus timer (Start, Pause, Resume, End, Reset).
- Pomodoro mode (25m / 5m / 15m) and Continuous stopwatch mode.
- Subject selection and active session tracking.
- Session persistence to `localStorage` (anti-duplicate lock).
- Interrupted session recovery after browser reload.
- Automated Vitest test suite for timer calculations.

### Milestone 3: Daily Goals & Subject Progress Dashboard
- Daily Goal card showing Target, Completed, Remaining, Completion %.
- Subject cards showing real-time target vs actual progress bars.
- Immediate dashboard updates upon saving a session.
- Today's study schedule and suggested next subject.
- Audit list of recent study sessions with delete option.

### Milestone 4: Study Streaks & Exam Countdowns
- Streak engine with configurable daily threshold (15, 25, 30 mins).
- Current streak and longest streak calculations.
- Examination countdown manager (create, edit, delete countdowns).
- Urgency badges ("Today", "5 days left", "Completed").
- Automated Vitest test suite for streak edge cases.

### Milestone 5: Analytics & Visual Reports
- Daily, Weekly, Monthly, and Yearly analytics views.
- Monday–Sunday weekly bar chart (via Recharts).
- Monthly active-day calendar heatmap.
- Subject-wise time distribution breakdown.
- Strictly authentic calculations derived from saved sessions.

### Milestone 6: Tasks Planner, UI Polish & Accessibility
- Study tasks and revision task manager (due dates, priorities, completion).
- Data export (JSON download) and data backup/reset tools.
- WCAG color contrast checks, keyboard navigation, and reduced-motion support.

### Milestone 7: Final Testing, Production Build & Deployment
- Full end-to-end automated testing run.
- Production build optimization and asset check.
- Deployment guide for free hosting (Vercel, Netlify, GitHub Pages).

---

## 10. Manual Verification Guide for Each Milestone

For every milestone, we will follow this verification process:
1. **Automated Verification**:
   - `npm run type-check`: Strict TypeScript type verification.
   - `npm run test`: Vitest unit test executions.
   - `npm run build`: Production bundle compilation.
2. **Manual In-Browser Verification**:
   - Test responsive layout on desktop and mobile viewports.
   - Test theme toggle (Light, Dark, System).
   - Test data persistence: refresh browser and verify data survives.
   - Test edge cases (pauses, reloads, invalid inputs).

---

*Plan formulated for StudyPilot development under Google Antigravity.*
