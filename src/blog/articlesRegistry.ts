import React from 'react';
import { ArticleDefinition, ArticleMeta } from './types';

// Registry array storing all published articles
export const ARTICLES_REGISTRY: ArticleDefinition[] = [
  {
    slug: 'how-to-create-a-study-schedule',
    title: 'How to Create a Study Schedule You Can Actually Follow',
    metaTitle: 'How to Create a Study Schedule You Can Actually Follow (Step-by-Step Guide)',
    description: 'Learn how to build a realistic study schedule that survives real-life interruptions. Includes flexible block planning, 3-hour and 6-hour timetable examples, revision buffers, and consistency frameworks.',
    category: 'Study Planning',
    categorySlug: 'study-planning',
    clusterId: 'cluster-1',
    publishDate: '2026-11-20',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 12,
    featured: true,
    primaryKeyword: 'how to create a study schedule',
    secondaryKeywords: [
      'study schedule',
      'study timetable',
      'daily study plan',
      'weekly study schedule',
      'study routine',
      'time management for students',
    ],
    targetAudience: 'Students balancing multiple subjects, exams, or limited study hours',
    summary: 'Most study timetables fail because they plan every minute like a factory assembly line. Here is how to construct a flexible, block-based study schedule that accommodates low-energy days, multiple subjects, and urgent deadlines without falling apart.',
    tableOfContents: [
      { id: 'why-most-study-schedules-fail', title: 'Why Most Study Schedules Fail Within a Week', level: 2 },
      { id: 'the-fallacy-of-minute-by-minute-planning', title: 'The Fallacy of Planning Every Minute', level: 2 },
      { id: 'calculating-real-study-hours', title: 'Step 1: Calculate Your Real Available Study Hours', level: 2 },
      { id: 'prioritizing-subjects-and-topics', title: 'Step 2: Identify Priorities & Cognitive Weight', level: 2 },
      { id: 'breaking-down-the-syllabus', title: 'Step 3: Deconstruct the Syllabus into Micro-Targets', level: 2 },
      { id: 'balancing-multiple-subjects', title: 'Step 4: Balance Multiple Subjects Without Burnout', level: 2 },
      { id: 'the-modular-block-system', title: 'Step 5: The Modular Block Scheduling Framework', level: 2 },
      { id: 'scheduling-revision-and-practice', title: 'Step 6: Bake in Active Revision, Practice & Mocks', level: 2 },
      { id: 'scheduling-purposeful-breaks', title: 'Step 7: Schedule Rest Intervals (Not Digital Drain)', level: 2 },
      { id: 'the-daily-study-blueprint', title: 'The Daily Study Blueprint', level: 2 },
      { id: 'the-weekly-study-plan', title: 'The Monday–Sunday Weekly Study Blueprint', level: 2 },
      { id: 'real-life-examples', title: 'Real-Life Schedule Examples (3-Hour vs 6-Hour)', level: 2 },
      { id: 'handling-busy-schedules', title: 'Scheduling Around College, Jobs & Commitments', level: 2 },
      { id: 'the-24-hour-recovery-protocol', title: 'What to Do When You Miss a Session', level: 2 },
      { id: 'avoiding-the-timetable-trap', title: 'Stop Re-writing Your Plan: The 14-Day Lockdown', level: 2 },
      { id: 'tracking-honest-study-hours', title: 'Track Honest Hours, Not Passive Desk Sitting', level: 2 },
      { id: 'building-unbreakable-consistency', title: 'Building Unbreakable Consistency & Streaks', level: 2 },
      { id: 'defeating-task-procrastination', title: 'Overcoming Procrastination & Overwhelm', level: 2 },
      { id: 'weekly-review-system', title: 'The 15-Minute Sunday Retrospective', level: 2 },
      { id: 'common-mistakes-to-avoid', title: '6 Common Timetable Mistakes to Avoid', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-study-consistently',
      'how-to-plan-multiple-subjects',
      'how-to-track-study-time',
    ],
    relatedToolSlugs: [
      'study-planner-generator',
      'weekly-study-planner',
      'study-hours-calculator',
    ],
    component: React.lazy(() => import('./articles/PillarStudyScheduleArticle')),
  },
  {
    slug: 'how-to-study-consistently',
    title: 'How to Study Consistently Every Day (Without Relying on Motivation)',
    metaTitle: 'How to Study Consistently Every Day: The 25-Minute Floor & Anti-Cramming Guide',
    description: 'Learn the exact behavioral systems to build unbroken daily study habits. Includes the 25-minute minimum viable session, the Never-Twice rule, and streak tracking.',
    category: 'Consistency & Habits',
    categorySlug: 'study-consistency',
    clusterId: 'cluster-2',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 8,
    featured: false,
    primaryKeyword: 'how to study consistently',
    secondaryKeywords: [
      'daily study habit',
      'study consistency',
      'stop cramming',
      'study routine',
      'habit streak',
    ],
    targetAudience: 'Students struggling with erratic study patterns, all-or-nothing mindsets, or cramming cycles',
    summary: 'Studying consistently beats intense cramming marathons every single time. Discover the 25-minute minimum viable session, the Never-Twice recovery rule, and how visual habit heatmaps build effortless momentum.',
    tableOfContents: [
      { id: 'the-boom-and-bust-trap', title: 'The Boom-and-Bust Cramming Trap', level: 2 },
      { id: 'the-minimum-viable-study-day', title: 'The 25-Minute Minimum Viable Session', level: 2 },
      { id: 'the-never-twice-rule', title: 'The "Never Twice" Rule', level: 2 },
      { id: 'rules-for-unbroken-consistency', title: '4 Core Rules for Unbroken Consistency', level: 2 },
      { id: 'visual-streak-tracking', title: 'Visual Streak Tracking & Habit Heatmaps', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-build-a-study-habit',
      'how-to-restart-studying-after-losing-motivation',
      'how-to-create-a-study-schedule',
    ],
    relatedToolSlugs: [
      'study-habit-tracker',
      'study-consistency-calculator',
      'pomodoro-timer',
    ],
    component: React.lazy(() => import('./articles/StudyConsistentlyArticle')),
  },
  {
    slug: 'how-to-stop-procrastinating-while-studying',
    title: 'How to Stop Procrastinating While Studying (The Science-Backed Guide)',
    metaTitle: 'How to Stop Procrastinating While Studying: The 5-Minute Activation Rule',
    description: 'Defeat academic procrastination using cognitive science. Learn why procrastination is an emotional regulation problem, how to lower activation energy, and friction design.',
    category: 'Focus & Distractions',
    categorySlug: 'focus-procrastination',
    clusterId: 'cluster-4',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 7,
    featured: false,
    primaryKeyword: 'how to stop procrastinating while studying',
    secondaryKeywords: [
      'study procrastination',
      'focus while studying',
      'study motivation',
      'task paralysis',
      'pomodoro technique',
    ],
    targetAudience: 'Students experiencing task resistance, perfectionist anxiety, or constant digital distractions',
    summary: 'Procrastination is not laziness; it is an emotional regulation challenge. Learn the 5-minute activation rule, how to flip environmental friction against distractions, and practical focus triggers.',
    tableOfContents: [
      { id: 'why-students-procrastinate', title: 'The Emotional Roots of Procrastination', level: 2 },
      { id: 'the-five-minute-rule', title: 'The 5-Minute Activation Energy Protocol', level: 2 },
      { id: 'practical-friction-design', title: 'Engineering Environmental Friction', level: 2 },
      { id: 'step-by-step-anti-procrastination-framework', title: 'The 3-Step Anti-Procrastination Protocol', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'pomodoro-technique-vs-deep-work',
      'how-to-study-consistently',
      'how-to-create-a-study-schedule',
    ],
    relatedToolSlugs: [
      'pomodoro-timer',
      'study-planner-generator',
    ],
    component: React.lazy(() => import('./articles/StopProcrastinatingArticle')),
  },
  {
    slug: 'how-to-plan-multiple-subjects',
    title: 'How to Plan and Balance Multiple Subjects Without Burnout',
    metaTitle: 'How to Plan Multiple Subjects: Interleaving, Daily Limits & Rotations',
    description: 'Master the art of balancing 4 to 6 subjects without cognitive exhaustion. Learn subject cognitive classification, interleaving, and the 2-to-3 subject daily limit.',
    category: 'Study Planning',
    categorySlug: 'study-planning',
    clusterId: 'cluster-1',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 9,
    featured: false,
    primaryKeyword: 'how to plan multiple subjects',
    secondaryKeywords: [
      'balance multiple subjects',
      'study schedule multiple subjects',
      'interleaving study',
      'study rotation timetable',
    ],
    targetAudience: 'Students enrolled in multiple challenging courses, board exams, or multi-subject competitive exams',
    summary: 'Cramming one subject all day creates quick mental burnout and fast forgetting. Discover how to classify subjects by cognitive load, apply the Rule of 2 to 3, and build a balanced weekly rotation.',
    tableOfContents: [
      { id: 'the-multisubject-dilemma', title: 'The Multi-Subject Dilemma: Why Cramming One Subject Fails', level: 2 },
      { id: 'cognitive-weight-classification', title: 'Classify Subjects by Cognitive Load: Analytical vs. Descriptive', level: 2 },
      { id: 'the-rule-of-three', title: 'The Rule of 2 to 3: Daily Subject Limits', level: 2 },
      { id: 'interleaving-benefits', title: 'The Power of Interleaving (Why Mixing Subjects Boosts Recall)', level: 2 },
      { id: 'sample-weekly-rotation-schedule', title: 'Sample 4-Subject Weekly Rotation Schedule', level: 2 },
      { id: 'preventing-subject-neglect', title: 'The "Neglected Subject" Triage System', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-create-a-weekly-study-plan',
      'how-to-create-a-study-schedule',
      'competitive-exam-study-plan',
    ],
    relatedToolSlugs: [
      'study-planner-generator',
      'weekly-study-planner',
    ],
    component: React.lazy(() => import('./articles/PlanMultipleSubjectsArticle')),
  },
  {
    slug: 'how-to-track-study-time',
    title: 'How to Track Study Time: Measure Active Focus vs Desk Sitting',
    metaTitle: 'How to Track Study Time Honestly: Measure Focus Hours vs Desk Sitting',
    description: 'Stop counting fake desk hours. Learn the difference between gross desk time and net cognitive focus, the 3 strict timer pause rules, and how to audit weekly efficiency.',
    category: 'Time Tracking & Data',
    categorySlug: 'time-tracking',
    clusterId: 'cluster-7',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 8,
    featured: false,
    primaryKeyword: 'how to track study time',
    secondaryKeywords: [
      'track study hours',
      'effective study time',
      'study time tracker',
      'focus efficiency ratio',
      'honest study hours',
    ],
    targetAudience: 'Students who sit at desks for long hours but feel their exam marks do not reflect the time spent',
    summary: 'The Desk-Sitting Delusion leads students to overestimate their real study hours by up to 60%. Here is how to apply strict pause rules, calculate your Focus Efficiency Ratio, and log output rather than passive time.',
    tableOfContents: [
      { id: 'the-desk-sitting-delusion', title: 'The Desk-Sitting Delusion: Gross vs. Net Study Hours', level: 2 },
      { id: 'why-passive-hours-harm-progress', title: 'Why Inflating Study Hours Destroys Realistic Planning', level: 2 },
      { id: 'active-vs-passive-study-metrics', title: 'Active Focus vs. Passive Desk Sitting Comparison', level: 2 },
      { id: 'the-strict-pause-rules', title: 'The 3 Strict Pause Rules for Honest Tracking', level: 2 },
      { id: 'the-weekly-efficiency-audit', title: 'The Weekly Efficiency Audit Formula', level: 2 },
      { id: 'practical-tracking-workflow', title: 'A Simple 4-Step Daily Tracking Workflow', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'pomodoro-technique-vs-deep-work',
      'how-to-study-with-limited-time',
      'how-to-create-a-study-schedule',
    ],
    relatedToolSlugs: [
      'study-hours-calculator',
      'pomodoro-timer',
    ],
    component: React.lazy(() => import('./articles/TrackStudyTimeArticle')),
  },
  {
    slug: 'pomodoro-technique-vs-deep-work',
    title: 'Pomodoro Technique vs Deep Work: Which Study Method Is Better?',
    metaTitle: 'Pomodoro Technique vs Deep Work for Students: Complete Comparison',
    description: 'Compare 25-minute Pomodoro intervals against 90-minute Deep Work immersion. Discover which method wins for your specific study tasks, and how to use the Hybrid Protocol.',
    category: 'Study Methods',
    categorySlug: 'study-methods',
    clusterId: 'cluster-5',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 9,
    featured: false,
    primaryKeyword: 'pomodoro technique vs deep work',
    secondaryKeywords: [
      'pomodoro vs deep work for studying',
      'best study method',
      'deep work student',
      'pomodoro technique guide',
    ],
    targetAudience: 'Students deciding between short structured sprints and extended distraction-free focus blocks',
    summary: 'The Pomodoro Technique destroys procrastination on high-resistance tasks, while Deep Work enables profound conceptual synthesis. Learn how top rankers combine both using the Dual-Phase Hybrid Protocol.',
    tableOfContents: [
      { id: 'the-core-mechanics', title: 'Understanding the Mechanics: 25-Minute Intervals vs. 90-Minute Immersion', level: 2 },
      { id: 'head-to-head-comparison', title: 'Pomodoro Technique vs. Deep Work: Detailed Comparison', level: 2 },
      { id: 'when-to-use-pomodoro', title: 'When the Pomodoro Technique Wins (Best Use Cases)', level: 2 },
      { id: 'when-to-use-deep-work', title: 'When Deep Work Wins (Best Use Cases)', level: 2 },
      { id: 'the-hybrid-model', title: 'The Hybrid Protocol: Combining Both for Maximum Retention', level: 2 },
      { id: 'practical-daily-schedule', title: 'A Sample Hybrid Study Day', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-stop-procrastinating-while-studying',
      'how-to-track-study-time',
      'how-to-create-a-study-schedule',
    ],
    relatedToolSlugs: [
      'pomodoro-timer',
      'weekly-study-planner',
    ],
    component: React.lazy(() => import('./articles/PomodoroVsDeepWorkArticle')),
  },
  {
    slug: 'how-to-create-a-weekly-study-plan',
    title: 'How to Create a Weekly Study Plan That Survives the Week',
    metaTitle: 'How to Create a Weekly Study Plan (Monday-Sunday Schedule Blueprint)',
    description: 'Build a flexible 7-day weekly study schedule with built-in catch-up buffers, realistic study capacities, and a 20-minute Sunday reset ritual.',
    category: 'Study Planning',
    categorySlug: 'study-planning',
    clusterId: 'cluster-1',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 10,
    featured: false,
    primaryKeyword: 'how to create a weekly study plan',
    secondaryKeywords: [
      'weekly study schedule',
      'study timetable weekly',
      'weekly study blueprint',
      'study plan template',
    ],
    targetAudience: 'Students frustrated by rigid timetables that fall apart the moment a weekday schedule delay occurs',
    summary: 'Rigid timetables snap at the first unexpected disruption. Learn how to map fixed commitments, schedule at 80% capacity, use Friday catch-up buffers, and conduct the 20-minute Sunday reset.',
    tableOfContents: [
      { id: 'why-daily-lists-fail', title: 'Why Daily To-Do Lists Fail Without a Weekly Horizon', level: 2 },
      { id: 'the-4-step-weekly-architecture', title: 'The 4-Step Weekly Blueprint Architecture', level: 2 },
      { id: 'anchoring-fixed-commitments', title: 'Step 1: Anchor Fixed Commitments & Bio-Basics', level: 2 },
      { id: 'calculating-weekly-study-capacity', title: 'Step 2: Calculate Honest Study Capacity', level: 2 },
      { id: 'the-20-percent-buffer-rule', title: 'Step 3: The 20% Flex Buffer Principle', level: 2 },
      { id: 'the-sunday-reset-ritual', title: 'Step 4: The 20-Minute Sunday Reset Ritual', level: 2 },
      { id: 'sample-weekly-schedule', title: 'Complete Monday–Sunday Sample Schedule', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-plan-multiple-subjects',
      'how-to-create-a-study-schedule',
      'how-to-study-consistently',
    ],
    relatedToolSlugs: [
      'weekly-study-planner',
      'study-hours-calculator',
    ],
    component: React.lazy(() => import('./articles/WeeklyStudyPlanArticle')),
  },
  {
    slug: 'competitive-exam-study-plan',
    title: 'Competitive Exam Study Plan: The 3-Phase Blueprint for Serious Aspirants',
    metaTitle: 'Competitive Exam Study Plan: The 3-Phase Strategy & Error Log System',
    description: 'A comprehensive multi-phase study plan for competitive exams (SSC, UPSC, GRE, GATE, JEE). Master syllabus pacing, past-year question banks, and the Error Log System.',
    category: 'Exam Preparation',
    categorySlug: 'exam-prep',
    clusterId: 'cluster-6',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 11,
    featured: false,
    primaryKeyword: 'competitive exam study plan',
    secondaryKeywords: [
      'competitive exam preparation',
      'mock test error log',
      'exam study strategy',
      'syllabus tracking',
    ],
    targetAudience: 'Aspirants preparing for high-stakes competitive examinations requiring speed, accuracy, and endurance',
    summary: 'Competitive examinations demand strategic periodization. Discover the 3-phase preparation architecture, the rigorous Error Log Protocol, and how to measure preparation across 4 distinct dimensions.',
    tableOfContents: [
      { id: 'the-3-phase-architecture', title: 'The 3-Phase Competitive Exam Architecture', level: 2 },
      { id: 'phase-1-concept-mastery', title: 'Phase 1: Concept Mastery & High-Yield Notes', level: 2 },
      { id: 'phase-2-question-bank-drills', title: 'Phase 2: Question Banks & Past-Year Topic Mastery', level: 2 },
      { id: 'phase-3-mock-tests-and-error-logs', title: 'Phase 3: Timed Mock Tests & Error Log Elimination', level: 2 },
      { id: 'the-error-log-mastery-system', title: 'The Error Log Protocol: Why Rankers Track Mistakes', level: 2 },
      { id: 'tracking-4-dimensions-of-prep', title: 'Track the 4 Dimensions of Preparation (Not Just Syllabus %)', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-plan-multiple-subjects',
      'how-to-create-a-study-schedule',
      'how-to-study-consistently',
    ],
    relatedToolSlugs: [
      'exam-preparation-progress',
      'exam-countdown',
    ],
    component: React.lazy(() => import('./articles/CompetitiveExamPlanArticle')),
  },
  {
    slug: 'how-to-study-with-limited-time',
    title: 'How to Study With Limited Time: The 2-Hour Daily Protocol for Working Students',
    metaTitle: 'How to Study With Limited Time: The 2-Hour High-Yield Daily Protocol',
    description: 'How to study effectively when you have a job, family, or packed college schedule. The 80/20 syllabus pruning rule, 60-minute morning golden window, and micro-sessions.',
    category: 'Study Planning',
    categorySlug: 'study-planning',
    clusterId: 'cluster-3',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 9,
    featured: false,
    primaryKeyword: 'how to study with limited time',
    secondaryKeywords: [
      'study with a full time job',
      '2 hour daily study routine',
      'efficient studying',
      'busy student study schedule',
    ],
    targetAudience: 'Working professionals, part-time workers, parents, or students with packed class timetables',
    summary: 'You do not need 8 hours to excel academically. Discover how to apply the 80/20 rule to your syllabus, capture 60 uninterrupted minutes in the morning, and leverage weekend force multipliers.',
    tableOfContents: [
      { id: 'the-limited-time-reality', title: 'The Working Student\'s Reality: Why 8-Hour Timetables Are Irrelevant', level: 2 },
      { id: 'the-80-20-syllabus-pruning', title: 'The 80/20 Principle: Prune Your Syllabus Ruthlessly', level: 2 },
      { id: 'the-2-hour-daily-protocol', title: 'The 2-Hour Daily High-Yield Protocol', level: 2 },
      { id: 'finding-hidden-micro-windows', title: 'Mining 45 Minutes of Hidden Micro-Windows', level: 2 },
      { id: 'active-recall-vs-passive-highlighting', title: 'Eliminating Low-Yield Study Rituals', level: 2 },
      { id: 'weekend-force-multipliers', title: 'The 4-Hour Weekend Force Multiplier', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-track-study-time',
      'how-to-create-a-weekly-study-plan',
      'how-to-create-a-study-schedule',
    ],
    relatedToolSlugs: [
      'study-hours-calculator',
      'weekly-study-planner',
    ],
    component: React.lazy(() => import('./articles/LimitedTimeStudyArticle')),
  },
  {
    slug: 'how-to-restart-studying-after-losing-motivation',
    title: 'How to Restart Studying After Losing Motivation or Falling Behind',
    metaTitle: 'How to Restart Studying After Losing Motivation: 48-Hour Reset Protocol',
    description: 'Overcome the shame spiral and restart studying after skipping days or weeks. Avoid timetable rewriting procrastination, triage your backlog, and execute a 15-minute re-entry.',
    category: 'Consistency & Habits',
    categorySlug: 'study-consistency',
    clusterId: 'cluster-2',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 8,
    featured: false,
    primaryKeyword: 'how to restart studying after losing motivation',
    secondaryKeywords: [
      'falling behind in studies',
      'how to get back on track studying',
      'study burnout recovery',
      'lost motivation to study',
    ],
    targetAudience: 'Students who fell off track, broke their study routine, or feel overwhelmed by an accumulated backlog',
    summary: 'The What-The-Hell Effect causes temporary lapses to turn into weeks of paralysis. Learn how to forgive sunk hours, triage your backlog into three tiers, and use the 15-minute re-entry rule.',
    tableOfContents: [
      { id: 'the-shame-spiral-trap', title: 'The Shame Spiral: Why Falling Behind Paralyses You', level: 2 },
      { id: 'the-re-entry-fallacy', title: 'The Re-Entry Fallacy: Why Timetable Rewriting Delays You', level: 2 },
      { id: 'the-48-hour-reboot-protocol', title: 'The 48-Hour Reset Protocol (Step-by-Step)', level: 2 },
      { id: 'triage-the-backlog', title: 'Step 1: Triage the Backlog (The Sunk Cost Cure)', level: 2 },
      { id: 'the-15-minute-micro-session', title: 'Step 2: The 15-Minute Zero-Resistance Re-Entry', level: 2 },
      { id: 'streak-resumption-psychology', title: 'Step 3: Resume the Chain (Consistency Over Perfection)', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-study-consistently',
      'how-to-build-a-study-habit',
      'how-to-create-a-study-schedule',
    ],
    relatedToolSlugs: [
      'study-consistency-calculator',
      'study-habit-tracker',
    ],
    component: React.lazy(() => import('./articles/RestartStudyingMotivationArticle')),
  },
  {
    slug: 'how-to-build-a-study-habit',
    title: 'How to Build an Unbreakable Daily Study Habit: The Cue-Routine-Reward System',
    metaTitle: 'How to Build a Daily Study Habit: Behavioral Loops & Friction Architecture',
    description: 'Stop relying on willpower. Learn how to install an automatic daily study habit using cue-routine-reward loops, habit stacking, friction design, and visual streak tracking.',
    category: 'Consistency & Habits',
    categorySlug: 'study-consistency',
    clusterId: 'cluster-2',
    publishDate: '2026-11-21',
    modifiedDate: '2026-11-21',
    author: {
      name: 'The Study Pilot Editorial Team',
      role: 'Cognitive Learning & Productivity Research',
    },
    readingTimeMinutes: 8,
    featured: false,
    primaryKeyword: 'how to build a study habit',
    secondaryKeywords: [
      'daily study habit',
      'habit stacking for students',
      'study routine formation',
      'study discipline',
    ],
    targetAudience: 'Students tired of relying on fleeting willpower who want to make studying as automatic as brushing teeth',
    summary: 'Willpower is an exhaustible biological fuel. Discover the cue-routine-reward habit loop, how to stack study sessions onto morning coffee, reduce friction, and build identity-based habits.',
    tableOfContents: [
      { id: 'the-habit-loop-anatomy', title: 'The Anatomy of a Study Habit: Cue, Routine, Reward', level: 2 },
      { id: 'habit-stacking-for-students', title: 'Habit Stacking: Anchor Study to Existing Daily Rituals', level: 2 },
      { id: 'friction-design-principles', title: 'Friction Architecture: Make Study Easy and Distraction Hard', level: 2 },
      { id: 'the-two-minute-rule', title: 'The 2-Minute Gateway Habit Rule', level: 2 },
      { id: 'identity-based-studying', title: 'Identity-Based Study Habits: Stop Trying to Study, Become a Student', level: 2 },
      { id: 'visual-feedback-and-streaks', title: 'Visual Habit Tracking & The Power of Streaks', level: 2 },
      { id: 'frequently-asked-questions', title: 'Frequently Asked Questions', level: 2 },
    ],
    relatedArticleSlugs: [
      'how-to-study-consistently',
      'how-to-restart-studying-after-losing-motivation',
      'how-to-create-a-study-schedule',
    ],
    relatedToolSlugs: [
      'study-habit-tracker',
      'study-consistency-calculator',
    ],
    component: React.lazy(() => import('./articles/BuildStudyHabitArticle')),
  },
];

/**
 * Returns all registered articles sorted by publish date descending.
 */
export function getAllArticles(): ArticleMeta[] {
  return [...ARTICLES_REGISTRY].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/**
 * Finds an article definition by its URL slug.
 */
export function getArticleBySlug(slug: string): ArticleDefinition | undefined {
  const cleanSlug = slug.trim().toLowerCase().replace(/^\/blog\//, '').replace(/\/$/, '');
  return ARTICLES_REGISTRY.find((a) => a.slug.toLowerCase() === cleanSlug);
}

/**
 * Returns articles belonging to a specific category slug.
 */
export function getArticlesByCategory(categorySlug: string): ArticleMeta[] {
  if (!categorySlug || categorySlug === 'all') {
    return getAllArticles();
  }
  return getAllArticles().filter(
    (a) => a.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}

/**
 * Retrieves the featured article for hero placement.
 */
export function getFeaturedArticle(): ArticleMeta | undefined {
  return ARTICLES_REGISTRY.find((a) => a.featured) || getAllArticles()[0];
}

/**
 * Retrieves related articles for an article slug.
 */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  const others = getAllArticles().filter((a) => a.slug !== current.slug);
  const matched = others.filter((a) => current.relatedArticleSlugs.includes(a.slug));
  const categoryMatched = others.filter((a) => a.categorySlug === current.categorySlug && !matched.includes(a));

  return [...matched, ...categoryMatched, ...others].slice(0, limit);
}
