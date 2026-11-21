import { ResourceItem } from './types';
import DailyStudyPlannerSheet from './templates/DailyStudyPlannerSheet';
import WeeklyTimetableSheet from './templates/WeeklyTimetableSheet';
import MonthlyExamPlannerSheet from './templates/MonthlyExamPlannerSheet';
import SubjectRevisionTrackerSheet from './templates/SubjectRevisionTrackerSheet';
import PomodoroTrackerSheet from './templates/PomodoroTrackerSheet';
import StudyHabitTrackerSheet from './templates/StudyHabitTrackerSheet';
import ExamCountdownPlannerSheet from './templates/ExamCountdownPlannerSheet';
import FormulaSheetTemplate from './templates/FormulaSheetTemplate';
import MockTestAnalysisSheet from './templates/MockTestAnalysisSheet';
import GoalSettingWorksheet from './templates/GoalSettingWorksheet';

export const RESOURCES_CATALOG: ResourceItem[] = [
  {
    id: 'daily-study-planner',
    slug: 'daily-study-planner',
    title: 'Daily Study Focus Planner Printable',
    tagline: 'High-contrast daily planner with top 3 priorities, energy-matched blocks, and 25-minute floor.',
    format: 'Printable Template',
    category: 'planners',
    categoryLabel: 'Planners & Timetables',
    description: 'A structured, single-sheet daily study planner engineered to eliminate academic overwhelm. Features Top 3 Non-Negotiable Outcomes, a 25-minute minimum study floor, energy-matched study blocks, and a distraction parking lot.',
    paperOrientation: 'portrait',
    recommendedPaper: 'A4',
    benefits: [
      'Eliminates decision fatigue with the 3 Top Priority System',
      'Protects your habit streak with the 25-Minute Minimum Viable Session',
      'Stops phone distraction with an analog Distraction Parking Lot',
      'Tracks net focus hours honestly without digital timer clutter',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Define the Daily Floor First',
        description: 'Fill in your 25-minute minimum viable session before anything else. This ensures that even on chaotic days, your streak stays alive.',
      },
      {
        stepNumber: 2,
        title: 'Select Top 3 Measurable Outcomes',
        description: 'Write down 3 tangible outputs (e.g. "Solve 15 calculus problems", "Summarize chapter 4"), not vague tasks like "Study Math".',
      },
      {
        stepNumber: 3,
        title: 'Use the Distraction Parking Lot',
        description: 'When random thoughts or smartphone impulses arise during deep work, write them in the parking lot and return immediately to focus.',
      },
    ],
    pairedToolSlug: 'study-planner-generator',
    pairedToolName: 'Study Planner Generator',
    pairedArticleSlug: 'how-to-create-a-study-schedule',
    pairedArticleTitle: 'How to Create a Study Schedule You Can Actually Follow',
    renderPrintable: () => <DailyStudyPlannerSheet />,
  },
  {
    id: 'weekly-study-timetable',
    slug: 'weekly-study-timetable',
    title: 'Weekly Study Blueprint (7-Day Resilient Time Blocking)',
    tagline: 'Monday-Sunday weekly study timetable featuring anchor commitments and 20% flex catch-up buffers.',
    format: 'Printable Template',
    category: 'planners',
    categoryLabel: 'Planners & Timetables',
    description: 'A 7-day master study timetable designed to survive real-world interruptions. Maps morning deep focus blocks, afternoon practice drills, evening consolidation, and a dedicated Friday/Saturday flex buffer.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Bakes in an automatic 20% flex buffer to absorb unexpected weekly delays',
      'Separates high-alertness morning deep work from afternoon practice sets',
      'Includes a built-in 20-minute Sunday Audit & Schedule Reset framework',
      'Displays target hours vs. actual logged hours for honest performance tracking',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Block Sleep and Fixed Anchors First',
        description: 'Shade out lecture timings, commuting hours, meal breaks, and mandatory 7–8 hours of nightly sleep.',
      },
      {
        stepNumber: 2,
        title: 'Schedule at 80% Capacity',
        description: 'Assign subjects to 80% of your remaining free time. Keep Friday evening completely blank as a catch-up flex buffer.',
      },
      {
        stepNumber: 3,
        title: 'Conduct the Sunday Audit',
        description: 'Review completed hours every Sunday evening, consolidate your error logs, and print a fresh sheet for the upcoming week.',
      },
    ],
    pairedToolSlug: 'weekly-study-planner',
    pairedToolName: 'Weekly Study Planner Tool',
    pairedArticleSlug: 'how-to-create-a-weekly-study-plan',
    pairedArticleTitle: 'How to Create a Weekly Study Plan That Survives the Week',
    renderPrintable: () => <WeeklyTimetableSheet />,
  },
  {
    id: 'monthly-exam-planner',
    slug: 'monthly-exam-planner',
    title: '30-Day Exam Countdown & Monthly Roadmap',
    tagline: '4-week strategic milestone planner mapping foundation, problem drills, mocks, and formula lock-in.',
    format: 'Printable Template',
    category: 'exam-prep',
    categoryLabel: 'Exam Prep & Error Logs',
    description: 'A strategic 4-week exam periodization roadmap for competitive and university examinations. Divides your final 30 days into structured phases with milestone targets, mock test schedules, and sanity guidelines.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Prevents last-minute cramming by periodizing prep into 4 structured weekly themes',
      'Maps exact chapter closure deadlines before full-length mocks begin',
      'Tracks total chapters remaining, target score percentage, and mock numbers',
      'Keeps daily study aligned with official examination countdown targets',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Set Target Exam Date and Score',
        description: 'Record your official exam date, days remaining, and target percentile or score benchmark at the top.',
      },
      {
        stepNumber: 2,
        title: 'Assign Weekly Operational Themes',
        description: 'Allocate Week 1 to theory closure, Week 2 to past-year questions, Week 3 to mock batteries, and Week 4 to formula retrieval.',
      },
      {
        stepNumber: 3,
        title: 'Audit Chapter Milestones Weekly',
        description: 'Cross off finished chapters and update mock test dates every Sunday to maintain steady momentum.',
      },
    ],
    pairedToolSlug: 'exam-countdown',
    pairedToolName: 'Exam Countdown & Milestones Tool',
    pairedArticleSlug: 'competitive-exam-study-plan',
    pairedArticleTitle: 'Competitive Exam Study Plan: The 3-Phase Blueprint',
    renderPrintable: () => <MonthlyExamPlannerSheet />,
  },
  {
    id: 'subject-revision-tracker',
    slug: 'subject-revision-tracker',
    title: 'Subject Revision & Spaced Retrieval Tracker',
    tagline: 'Evidence-based 3-pass active recall matrix with intervals at +3 days, +14 days, and +30 days.',
    format: 'Tracking Sheet',
    category: 'trackers',
    categoryLabel: 'Trackers & Heatmaps',
    description: 'An evidence-based revision tracker that halts the Ebbinghaus forgetting curve. Organizes chapters by exam weightage and tracks 3 spaced retrieval passes (+3 days, +14 days, +30 days) along with past-question mastery.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Halts memory decay by locking spaced retrieval intervals onto paper',
      'Prevents the illusion of competence by tracking active testing rather than passive rereading',
      'Categorizes chapters into High, Medium, and Low exam weightage',
      'Confirms 50+ solved past-year questions for true exam readiness',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'List All Curriculum Chapters',
        description: 'Write down every chapter in the subject and assign its exam weightage tier (High, Medium, or Low).',
      },
      {
        stepNumber: 2,
        title: 'Log First-Pass Date and Confidence',
        description: 'Record the date you completed initial notes and rate your conceptual clarity from 1 to 5.',
      },
      {
        stepNumber: 3,
        title: 'Execute Spaced Retrieval Passes',
        description: 'Schedule Rev 1 for 3 days later, Rev 2 for 14 days later, and Rev 3 for 30 days later using active recall question sets.',
      },
    ],
    pairedToolSlug: 'exam-preparation-progress',
    pairedToolName: 'Exam Preparation Progress Calculator',
    pairedArticleSlug: 'how-to-plan-multiple-subjects',
    pairedArticleTitle: 'How to Plan and Balance Multiple Subjects Without Burnout',
    renderPrintable: () => <SubjectRevisionTrackerSheet />,
  },
  {
    id: 'pomodoro-session-tracker',
    slug: 'pomodoro-session-tracker',
    title: 'Pomodoro Focus Log (25-Minute Interval System)',
    tagline: 'Analog sprint tracker with visual tomato checkpoints, distraction tallies, and net focus audit.',
    format: 'Tracking Sheet',
    category: 'trackers',
    categoryLabel: 'Trackers & Heatmaps',
    description: 'A physical distraction-free focus tracking worksheet. Lets you plan daily Pomodoro sprints, tally internal and external distraction urges, log 5-minute rest breaks, and record honest tangible output.',
    paperOrientation: 'portrait',
    recommendedPaper: 'A4',
    benefits: [
      'Eliminates digital timer distractions by keeping your sprint log on paper',
      'Quantifies mental distraction urges with simple tally marks',
      'Enforces mandatory 5-minute brain rest intervals to prevent afternoon fatigue',
      'Computes your true Net Focus Time and Focus Efficiency Ratio at the end of the day',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Set Daily Sprint Target',
        description: 'Aim for 6 to 8 Pomodoros (3 to 4 net hours). Cross out each visual checkpoint box as you complete sprints.',
      },
      {
        stepNumber: 2,
        title: 'Record Task and Distractions',
        description: 'Before each 25-minute sprint, write down the specific question set. Tally each time you feel an urge to check notifications.',
      },
      {
        stepNumber: 3,
        title: 'Calculate End-of-Day Net Focus',
        description: 'Multiply completed sprints by 25 minutes to find your real net cognitive work.',
      },
    ],
    pairedToolSlug: 'pomodoro-timer',
    pairedToolName: 'Pomodoro Study Timer',
    pairedArticleSlug: 'pomodoro-technique-vs-deep-work',
    pairedArticleTitle: 'Pomodoro Technique vs Deep Work: Which Study Method Is Better?',
    renderPrintable: () => <PomodoroTrackerSheet />,
  },
  {
    id: 'study-habit-tracker',
    slug: 'study-habit-tracker',
    title: '30-Day Study Habit & Streak Tracker Printable',
    tagline: 'Visual habit formation calendar based on identity anchoring and the "Never Miss Twice" rule.',
    format: 'Tracking Sheet',
    category: 'trackers',
    categoryLabel: 'Trackers & Heatmaps',
    description: 'A printable 30-day streak preservation calendar. Track up to 4 foundational study habits (such as the 25-minute floor, phone distancing, and desk preparation) using Jerry Seinfeld’s "Don’t Break the Chain" system.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Releases neurochemical satisfaction as you mark off consecutive daily streak boxes',
      'Anchors study routines to explicit daily cues and habit stacks',
      'Protects momentum with the strict Never Miss Twice recovery framework',
      'Includes an Identity Anchor Statement to foster long-term student self-discipline',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Write Your Identity Statement',
        description: 'Fill in the identity anchor statement at the top to solidify your commitment as a consistent student.',
      },
      {
        stepNumber: 2,
        title: 'Define 2 to 4 Micro-Habits',
        description: 'Choose habits with precise triggers (e.g. "Complete 25-min review immediately after morning tea").',
      },
      {
        stepNumber: 3,
        title: 'Mark Boxes Immediately',
        description: 'Mark each day with a bold marker the moment you finish. Hang the sheet above your study desk.',
      },
    ],
    pairedToolSlug: 'study-habit-tracker',
    pairedToolName: 'Study Habit Tracker Tool',
    pairedArticleSlug: 'how-to-build-a-study-habit',
    pairedArticleTitle: 'How to Build an Unbreakable Daily Study Habit',
    renderPrintable: () => <StudyHabitTrackerSheet />,
  },
  {
    id: 'exam-countdown-planner',
    slug: 'exam-countdown-planner',
    title: 'Exam Countdown & Target Score Planner',
    tagline: 'Strategic exam scoreboard tracking total days left, cutoff goals, and weak topic hit lists.',
    format: 'Printable Template',
    category: 'exam-prep',
    categoryLabel: 'Exam Prep & Error Logs',
    description: 'An executive exam command sheet designed to display your examination countdown, score targets, baseline mock scores, top 5 weak topic hit lists, and official test trajectory log on a single printable page.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Creates constructive urgency by prominently displaying days remaining',
      'Isolates the 5 weakest high-yield topics causing the greatest score leaks',
      'Tracks mock score progression across 6 full-length test simulations',
      'Monitors negative marks lost to eliminate impulsive guessing habits',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Fill Out Score Benchmarks',
        description: 'Enter your baseline mock score, target qualification cutoff, and target accuracy rate.',
      },
      {
        stepNumber: 2,
        title: 'Identify the Top 5 Weak Topics',
        description: 'List the 5 specific syllabus chapters that cost you the most points in previous tests and prioritize them for PYQ drilling.',
      },
      {
        stepNumber: 3,
        title: 'Log Mock Trajectory',
        description: 'After each full-length mock test, record your raw score, percentile, and negative marks lost.',
      },
    ],
    pairedToolSlug: 'exam-countdown',
    pairedToolName: 'Exam Countdown Tool',
    pairedArticleSlug: 'competitive-exam-study-plan',
    pairedArticleTitle: 'Competitive Exam Study Plan: The 3-Phase Strategy',
    renderPrintable: () => <ExamCountdownPlannerSheet />,
  },
  {
    id: 'formula-sheet-template',
    slug: 'formula-sheet-template',
    title: 'Core Formula & Concept Crib Sheet (1-Page Synthesis)',
    tagline: '4-quadrant topic summary with formulas, boundary conditions, traps, and worked archetypes.',
    format: 'Cheat Sheet',
    category: 'worksheets',
    categoryLabel: 'Goal Setting & Worksheets',
    description: 'A clean 4-quadrant condensation template for difficult STEM and quantitative topics. Synthesizes key formulas, boundary conditions/theorems, examiner traps, and a worked archetype problem onto a single high-yield reference page.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Replaces messy 50-page lecture notes with a crisp 1-page active retrieval sheet',
      'Forces cognitive synthesis by limiting notes to core equations and boundary conditions',
      'Explicitly highlights examiner traps and common calculation slip-ups',
      'Provides a benchmark worked problem for immediate step-by-step recall on test day',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Limit to 1 Sheet per Chapter',
        description: 'Condense an entire textbook chapter into this single 4-quadrant sheet. The constraint forces high-yield prioritization.',
      },
      {
        stepNumber: 2,
        title: 'Document Traps and Boundary Conditions',
        description: 'Fill in Quadrant 2 and Quadrant 3 with explicit rules (e.g. "Only applies when friction is zero", "Remember to convert units to Kelvin").',
      },
      {
        stepNumber: 3,
        title: 'Solve the Archetype Problem',
        description: 'Write down the classic examination problem that represents 70% of standard question variations for this topic.',
      },
    ],
    pairedToolSlug: 'study-planner-generator',
    pairedToolName: 'Study Planner Generator',
    pairedArticleSlug: 'how-to-study-with-limited-time',
    pairedArticleTitle: 'How to Study With Limited Time: The 2-Hour Daily Protocol',
    renderPrintable: () => <FormulaSheetTemplate />,
  },
  {
    id: 'mock-test-analysis-sheet',
    slug: 'mock-test-analysis-sheet',
    title: 'Mock Test Error Analysis Journal (Post-Test Error Log)',
    tagline: 'Comprehensive error categorization: conceptual gaps, calculation slips, and 7-day re-testing.',
    format: 'Worksheet',
    category: 'exam-prep',
    categoryLabel: 'Exam Prep & Error Logs',
    description: 'The exact post-test audit sheet used by top competitive exam rankers. Categorizes mistakes into Conceptual Gaps, Calculation Slips, Misread Stems, and Time Pressure Guesses, pairing every error with a mandatory 7-day re-test date.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Stops repetitive test errors by diagnosing root causes across 4 distinct misstep categories',
      'Enforces mandatory 7-day re-testing to confirm knowledge leaks are permanently plugged',
      'Tracks total negative marks lost to train disciplined risk management under exam conditions',
      'Synthesizes Top 3 Strategic Corrections before sitting for your next mock test',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'Audit All Missed Questions',
        description: 'Spend at least 2 hours analyzing your mock test. Do not just look at your score—audit every single incorrect and skipped question.',
      },
      {
        stepNumber: 2,
        title: 'Classify Root Causes',
        description: 'Tag each mistake as [C] Conceptual, [S] Silly/Calc, [M] Misread, or [G] Guesswork. Never dismiss an error as bad luck.',
      },
      {
        stepNumber: 3,
        title: 'Schedule Sunday Re-Tests',
        description: 'Re-solve questions tagged in your error log 7 days later on physical paper without looking at the answer key.',
      },
    ],
    pairedToolSlug: 'exam-preparation-progress',
    pairedToolName: 'Exam Prep Progress Calculator',
    pairedArticleSlug: 'competitive-exam-study-plan',
    pairedArticleTitle: 'Competitive Exam Study Plan: The 3-Phase Strategy',
    renderPrintable: () => <MockTestAnalysisSheet />,
  },
  {
    id: 'goal-setting-worksheet',
    slug: 'goal-setting-worksheet',
    title: 'Academic SMART Goal Setting & Pre-Mortem Worksheet',
    tagline: 'Actionable semester goal breakdown with emotional drivers and pre-mortem obstacle defense.',
    format: 'Worksheet',
    category: 'worksheets',
    categoryLabel: 'Goal Setting & Worksheets',
    description: 'A purpose-driven goal-setting and obstacle defense worksheet for students. Deconstructs semester outcomes using the S.M.A.R.T. methodology and incorporates a pre-mortem protocol to pre-program responses to distractions, burnout, and setbacks.',
    paperOrientation: 'landscape',
    recommendedPaper: 'A4',
    benefits: [
      'Connects daily academic routines to your deep emotional and career "Why"',
      'Translates vague desires ("do well") into specific, measurable, time-bound metrics',
      'Pre-programs psychological defenses against digital temptation and lost motivation',
      'Includes an accountability signature block to create authentic psychological commitment',
    ],
    howToUseSteps: [
      {
        stepNumber: 1,
        title: 'State the Primary Academic Objective',
        description: 'Write down your exact target GPA, rank, or percentile clearly and unhesitatingly.',
      },
      {
        stepNumber: 2,
        title: 'Break Down into S.M.A.R.T. Components',
        description: 'Specify the exact daily focus habits, sustainable net hours, and milestone deadlines that make the goal realistic.',
      },
      {
        stepNumber: 3,
        title: 'Fill the Pre-Mortem Defense Plan',
        description: 'Anticipate exactly when and how you will feel like quitting, and write down your predetermined response in advance.',
      },
    ],
    pairedToolSlug: 'study-consistency-calculator',
    pairedToolName: 'Study Consistency Calculator',
    pairedArticleSlug: 'how-to-study-consistently',
    pairedArticleTitle: 'How to Study Consistently Every Day (Without Relying on Motivation)',
    renderPrintable: () => <GoalSettingWorksheet />,
  },
];

export function getAllResources(): ResourceItem[] {
  return RESOURCES_CATALOG;
}

export function getResourceBySlug(slug: string): ResourceItem | undefined {
  const clean = slug.trim().toLowerCase().replace(/^\/resources\//, '').replace(/\/$/, '');
  return RESOURCES_CATALOG.find((r) => r.slug.toLowerCase() === clean);
}

export function getResourcesByCategory(category: string): ResourceItem[] {
  if (!category || category === 'all') {
    return RESOURCES_CATALOG;
  }
  return RESOURCES_CATALOG.filter((r) => r.category === category);
}
