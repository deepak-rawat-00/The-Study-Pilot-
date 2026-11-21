import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ExampleCard } from '../components/ExampleCard';
import { ComparisonTable } from '../components/ComparisonTable';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { ARTICLES_REGISTRY } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const PillarStudyScheduleArticle: React.FC = () => {
  const { navigate, goToApp } = useRouter();
  const meta = ARTICLES_REGISTRY[0];

  const comparisonColumns = [
    { key: 'dimension', header: 'Core Dimension', width: 'w-1/4' },
    { key: 'rigid', header: 'Traditional Rigid Timetable', width: 'w-3/8' },
    { key: 'modular', header: 'Flexible Block Planning (Study Pilot)', width: 'w-3/8' },
  ];

  const comparisonRows = [
    {
      dimension: 'Time Allocation',
      rigid: 'Clock-based: "7:00 AM – 8:30 AM Physics"',
      modular: 'Anchor-based: "90-minute Deep Block after breakfast"',
    },
    {
      dimension: 'Response to Delays',
      rigid: 'Miss one hour and the entire day’s timetable collapses into guilt',
      modular: 'Buffer block absorbs delays; remaining blocks shift forward smoothly',
    },
    {
      dimension: 'Mental Energy',
      rigid: 'Assumes consistent motivation and identical cognitive stamina all day',
      modular: 'Pairs high-demand analytical work with biological focus peaks',
    },
    {
      dimension: 'Syllabus Focus',
      rigid: 'Measures passive hours seated at a desk',
      modular: 'Measures active recall, problem sets solved, and topic completion',
    },
    {
      dimension: 'Revision Integration',
      rigid: 'Revision is an afterthought crammed into the final week',
      modular: 'Bakes daily 15-minute retrieval and weekly consolidation blocks in advance',
    },
  ];

  const weeklyScheduleColumns = [
    { key: 'day', header: 'Day of Week', width: 'w-1/6' },
    { key: 'focus', header: 'Primary Focus Allocation', width: 'w-1/2' },
    { key: 'buffer', header: 'Consolidation & Recovery', width: 'w-1/3' },
  ];

  const weeklyScheduleRows = [
    {
      day: 'Monday',
      focus: 'Block A (Tier 1 Difficult Subject) + Block B (Tier 2 Core Paper)',
      buffer: '30-min Daily Retrieval + 45-min Flex Buffer',
    },
    {
      day: 'Tuesday',
      focus: 'Block A (Tier 1 Analytical) + Block B (Tier 3 Conceptual)',
      buffer: '30-min Problem Set Review + 45-min Flex Buffer',
    },
    {
      day: 'Wednesday',
      focus: 'Block A (Secondary Tough Subject) + Block B (Core Practice)',
      buffer: '30-min Mid-Week Check + 45-min Flex Buffer',
    },
    {
      day: 'Thursday',
      focus: 'Block A (Tier 1 Difficult Subject) + Block B (Theory Consolidation)',
      buffer: '30-min Error Log Review + 45-min Flex Buffer',
    },
    {
      day: 'Friday',
      focus: 'Block A (Mixed Problem Interleaving) + Block B (Lighter Subject)',
      buffer: '45-min Weekday Catch-up Buffer',
    },
    {
      day: 'Saturday',
      focus: 'Timed Sectional Practice / Mock Test Simulation + Error Analysis',
      buffer: 'Full Afternoon Rest / Personal Recreation',
    },
    {
      day: 'Sunday',
      focus: 'Weekly Spaced Revision of All 5 Weekday Topics',
      buffer: '15-Minute Sunday Retrospective & Next Week Schedule Setup',
    },
  ];

  const prioritizationChecklist = [
    {
      title: 'Tier 1: High Cognitive Resistance (30–40% of time)',
      desc: 'Difficult problem-solving, advanced mathematics, unfamiliar concepts, or your weakest examination subjects. Requires fresh morning or early focus.',
    },
    {
      title: 'Tier 2: Core Analytical & Conceptual (35–45% of time)',
      desc: 'Syllabus chapters you understand generally but need deliberate practice, active recall, and structured notes to master.',
    },
    {
      title: 'Tier 3: Low Energy Consolidation (15–20% of time)',
      desc: 'Revising flashcards, formula cheat sheets, watching illustrative lectures, or organizing files for tomorrow. Ideal for evenings.',
    },
  ];

  const commonMistakes = [
    {
      title: '1. The 14-Hour Illusion',
      desc: 'Writing a timetable that requires 14 hours of study when you currently struggle to complete 2. Ambition must be earned through incremental momentum.',
    },
    {
      title: '2. Zero Buffer Margin',
      desc: 'Scheduling every minute from 6:00 AM to 11:00 PM without accounting for traffic, family obligations, fatigue, or slow comprehension.',
    },
    {
      title: '3. Passive Acquisition Bias',
      desc: 'Spending 90% of your time highlighting textbooks or watching video lectures, and 0% on closed-book retrieval or solving practice questions.',
    },
    {
      title: '4. The "I Will Study Double Tomorrow" Trap',
      desc: 'Trying to compensate for a missed 4-hour study day by attempting 8 hours tomorrow. This sparks an exhausting boom-and-bust cycle.',
    },
    {
      title: '5. Constant Timetable Re-drafting',
      desc: 'Spending 3 hours redesigning your timetable every time you miss a study session. The redesign feels like work, but produces zero retention.',
    },
    {
      title: '6. Confusing Desk Presence with Focus',
      desc: 'Sitting in front of an open book for 5 hours while checking WhatsApp every 4 minutes. Real study is measured in uninterrupted cognitive depth.',
    },
  ];

  const faqItems = [
    {
      question: 'How many hours should I realistically study each day?',
      answer: (
        <p>
          For full-time college students, <strong>3 to 4 hours of genuine active focus</strong> alongside classes is exceptional. For competitive exam aspirants studying full-time, <strong>5 to 6.5 hours of net focus</strong> is the realistic ceiling before cognitive fatigue sets in. Quality and retrieval depth consistently outperform passive desk-sitting.
        </p>
      ),
    },
    {
      question: 'What should I do immediately after missing a scheduled study session?',
      answer: (
        <p>
          Do not panic, and do not try to double your hours the next day. Execute the <strong>24-Hour Recovery Protocol</strong>: cross out the missed session without emotional guilt, verify that your flex buffer can absorb the critical topic, and commit to completing just 30 minutes of low-friction study today to protect your streak.
        </p>
      ),
    },
    {
      question: 'Is it better to study one subject all day or multiple subjects?',
      answer: (
        <p>
          Cognitive science strongly supports <strong>interleaving</strong>—studying 2 to 3 distinct subjects per day rather than blocking one subject for 10 hours. Alternating between an analytical subject (like physics or math) and a conceptual subject (like biology or history) refreshes your working memory and strengthens long-term retrieval pathways.
        </p>
      ),
    },
    {
      question: 'How do I build a study schedule around an unpredictable job or college timetable?',
      answer: (
        <p>
          Use <strong>anchor-based blocks</strong> instead of clock-based timestamps. Instead of scheduling &quot;Study at 5:00 PM&quot;, anchor your session to a reliable daily routine: &quot;Block 1 starts 30 minutes after walking through the front door from college.&quot; If you arrive home at 4:30 or 5:30, your schedule shifts naturally without breaking.
        </p>
      ),
    },
    {
      question: 'How do I know if my study schedule is actually working?',
      answer: (
        <p>
          A healthy study schedule shows two tangible signs: First, your weekly completion percentage hovers between <strong>75% and 85%</strong> (a plan that hits 100% every week is too easy; one below 60% is too rigid). Second, your scores on closed-book practice questions and mock tests show steady improvement over 3 to 4 weeks.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      {/* Introduction */}
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        Every student knows the Sunday evening cycle. You feel a surge of motivation, pull out a fresh notebook or spreadsheet, and construct an immaculate, color-coded study timetable. 6:00 AM wakeup, 7:00 AM physics, 8:30 AM chemistry, evening revision, zero wasted time. By Tuesday afternoon, an unexpected college lecture or a burst of exhaustion delays one session. By Wednesday, the schedule feels broken. By Thursday, you abandon it entirely and slip back into reactive cramming.
      </p>

      <p>
        The problem is not a lack of willpower, intelligence, or ambition. The problem is that most study timetables are designed for an idealized version of human life that does not exist. They treat students like industrial machines that operate at 100% efficiency regardless of sleep, commute delays, mental fatigue, or emotional resistance.
      </p>

      <p>
        To build a study schedule you can actually stick to for three months, six months, or an entire academic year, you must trade rigid hour-by-hour timetables for a <strong>resilient, block-based planning system</strong>. Here is the exact step-by-step framework to create a sustainable study plan.
      </p>

      {/* 1. Why most study schedules fail */}
      <h2 id="why-most-study-schedules-fail">Why Most Study Schedules Fail Within a Week</h2>
      <p>
        Study schedules collapse primarily because of three structural design flaws:
      </p>
      <ol>
        <li>
          <strong>The Optimism Bias:</strong> Students schedule their days assuming best-case scenarios: they assume they will wake up instantly alert, comprehend difficult chapters on the first read, and never encounter a Wi-Fi outage or sudden errand.
        </li>
        <li>
          <strong>Fragility by Design:</strong> In a clock-bound timetable, missing one block creates a domino effect. If math runs 45 minutes late, your chemistry slot disappears, dinner gets postponed, and you go to bed feeling demoralized.
        </li>
        <li>
          <strong>Focusing on Input Instead of Output:</strong> Timetables usually say &quot;Study Economics from 4 PM to 6 PM&quot;. But what does studying mean? Staring at page 45 for two hours is not the same as solving 20 practice questions and reciting 3 theories from memory.
        </li>
      </ol>

      <WarningCallout title="The Fragility Trap">
        If a 30-minute delay causes your entire day&apos;s plan to collapse into guilt and paralysis, your system is too fragile. A resilient study schedule anticipates friction, bad days, and interruptions before they occur.
      </WarningCallout>

      {/* 2. The Fallacy of Minute-by-Minute Planning */}
      <h2 id="the-fallacy-of-minute-by-minute-planning">The Fallacy of Planning Every Minute</h2>
      <p>
        When you map every 15-minute increment of your day, you create an administrative burden that drains the very willpower needed for studying. When the clock dictates that at 3:15 PM you must switch from mathematics to history, regardless of whether you are in a state of mathematical flow or need 10 minutes of rest, the schedule becomes an adversary rather than an ally.
      </p>
      <p>
        High-performing learners do not track fixed minutes; they think in <strong>modular study blocks</strong>. A study block has a clear objective, a designated energy requirement, and movable boundaries that shift dynamically around your daily life.
      </p>

      {/* Comparison Table */}
      <ComparisonTable
        caption="Table 1: Traditional Rigid Timetables vs. Modular Block Planning"
        columns={comparisonColumns}
        rows={comparisonRows}
      />

      {/* 3. Calculating Real Available Study Time */}
      <h2 id="calculating-real-study-hours">Step 1: Calculate Your Real Available Study Hours</h2>
      <p>
        Before you select which subjects to open, you must determine your <strong>Net Focus Capacity</strong> using honest arithmetic. Most students overestimate their free time by 50%.
      </p>

      <p>Use this simple 3-step calculation:</p>

      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/60 my-4 space-y-2 text-sm">
        <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
          <span className="font-semibold text-slate-800 dark:text-slate-200">1. Total Daily Hours:</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">24.0 Hours</span>
        </div>
        <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2 text-slate-600 dark:text-slate-400">
          <span>2. Mandatory Non-Negotiables (Sleep 8h + Meals/Hygiene 2h + Commute 1.5h + Classes 6h):</span>
          <span className="font-mono text-rose-600 dark:text-rose-400 font-semibold">- 17.5 Hours</span>
        </div>
        <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
          <span className="font-semibold text-slate-800 dark:text-slate-200">3. Gross Free Discretionary Time:</span>
          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">6.5 Hours</span>
        </div>
        <div className="flex justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2 text-slate-600 dark:text-slate-400">
          <span>4. Cognitive Transition &amp; Buffer Margin (Deduct 20%):</span>
          <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">- 1.3 Hours</span>
        </div>
        <div className="flex justify-between pt-1 text-base font-bold text-slate-900 dark:text-white">
          <span>Realistic Net Daily Study Hours:</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 text-lg">5.2 Hours</span>
        </div>
      </div>

      <TipCallout title="The 20% Buffer Rule">
        Never plan for 100% of your free time. If you have 5 free hours between college lectures and bedtime, plan for <strong>4 hours of focused study</strong>. That 1-hour unallocated buffer is your shock absorber. When an unexpected delay strikes, it eats into the buffer, leaving your study targets intact.
      </TipCallout>

      <p>
        To compute your exact daily and weekly study capacity without guesswork, use our free browser-based{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-hours-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Hours Calculator
        </button>
        .
      </p>

      {/* 4. Prioritizing Subjects and Topics */}
      <h2 id="prioritizing-subjects-and-topics">Step 2: Identify Priorities and Cognitive Weight</h2>
      <p>
        One of the most frequent reasons students abandon their timetables is <strong>cognitive mismatch</strong>: scheduling their hardest, most intimidating subject for 9:30 PM when their prefrontal cortex is completely drained from a long day.
      </p>

      <p>
        Group your subjects and topics into three distinct tiers:
      </p>

      <ChecklistCard
        title="The 3-Tier Cognitive Priority System"
        items={prioritizationChecklist}
      />

      <p>
        <strong>The Rule of Chronobiology:</strong> Place Tier 1 subjects within your personal circadian peak. If you are sharpest in the morning, do not waste 8:00 AM on reading casual emails or highlighting light notes. Attack your most difficult problem sets first.
      </p>

      {/* 5. Breaking Down the Syllabus */}
      <h2 id="breaking-down-the-syllabus">Step 3: Deconstruct the Syllabus into Micro-Targets</h2>
      <p>
        Writing &quot;Study Biology&quot; on your schedule is an invitation for procrastination. The brain resists vague, oversized demands. To make a schedule actionable, translate syllabus chapters into daily deliverables:
      </p>
      <ul>
        <li><strong>Vague Target:</strong> &quot;Study Cell Biology on Tuesday.&quot; (High cognitive resistance)</li>
        <li><strong>Actionable Deliverable:</strong> &quot;Read Cell Membrane section (15 pages) + draw organelle diagram from memory + solve 15 practice questions.&quot; (Low cognitive resistance)</li>
      </ul>
      <p>
        When you know exactly what constitutes &quot;done&quot; for a study session, you eliminate the friction of figuring out where to start.
      </p>

      {/* 6. Balancing Multiple Subjects */}
      <h2 id="balancing-multiple-subjects">Step 4: Balance Multiple Subjects Without Burnout</h2>
      <p>
        Should you study one subject per day or multiple subjects?
      </p>
      <p>
        Educational psychologists call studying a single subject for 8 hours &quot;massed practice&quot;. It creates a false feeling of mastery, but long-term retention is shockingly low. Instead, practice <strong>interleaving</strong>:
      </p>
      <ul>
        <li>Rotate between <strong>2 to 3 distinct subjects per day</strong>.</li>
        <li>Pair an <em>analytical problem-solving subject</em> (like Mathematics, Accounting, or Physics) with a <em>conceptual or reading-heavy subject</em> (like History, Literature, or Biology).</li>
        <li>The cognitive contrast acts like a mental palate cleanser, reducing fatigue and reinforcing neural cross-connections.</li>
      </ul>

      {/* 7. The Modular Block System */}
      <h2 id="the-modular-block-system">Step 5: Master the Modular Study Block System</h2>
      <p>
        Instead of 10 rigid slots, organize your study day into <strong>three core blocks</strong>:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="rounded-2xl border border-brand-200/80 bg-white p-5 dark:border-brand-900/60 dark:bg-slate-900 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Block A (90–120 min)
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            The Deep Work Block
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Reserved strictly for your Tier 1 difficult subject. Airplane mode on, zero browser distractions, full focus intervals.
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-200/80 bg-white p-5 dark:border-indigo-900/60 dark:bg-slate-900 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Block B (60–90 min)
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            The Secondary Focus Block
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Dedicated to your Tier 2 core subject. Syllabus progression, concept mapping, and solving standard chapter exercises.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 dark:border-emerald-900/60 dark:bg-slate-900 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Block C (30–45 min)
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            Consolidation &amp; Buffer
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Active recall of today’s material, reviewing errors, logging study hours, and preparing your desk for tomorrow.
          </p>
        </div>
      </div>

      {/* 8. Scheduling Revision and Practice */}
      <h2 id="scheduling-revision-and-practice">Step 6: Bake in Active Revision, Practice &amp; Mocks</h2>
      <p>
        If your study schedule only includes time to read new chapters, it is incomplete. According to the forgetting curve, you lose more than half of newly learned material within two days if you do not actively retrieve it.
      </p>

      <p>
        To make revision an automated habit rather than an afterthought, follow the <strong>15/15 Rule</strong>:
      </p>
      <ul>
        <li>
          <strong>The First 15 Minutes:</strong> Before you open a new chapter, close your books and spend 15 minutes writing down everything you remember from yesterday&apos;s study session on a blank sheet of paper (Active Retrieval).
        </li>
        <li>
          <strong>The Final 15 Minutes:</strong> Conclude your study block by writing a 3-bullet summary of what you learned today without referencing your notes.
        </li>
      </ul>

      <p>
        For weekend revision, schedule dedicated <strong>Practice Sessions</strong> and <strong>Mock Exam Blocks</strong>. Treat mock tests as clinical diagnostics: if a mock exam takes 2 hours, allocate at least 1.5 hours immediately afterward to dissect your errors and update an error log.
      </p>

      {/* 9. Purposeful Breaks */}
      <h2 id="scheduling-purposeful-breaks">Step 7: Schedule Rest Intervals (Not Digital Drain)</h2>
      <p>
        A break is meant to restore mental energy. Unfortunately, most students take &quot;pseudo-breaks&quot;: scrolling through Instagram Reels, TikTok, or group chats for 20 minutes. Digital feeds bombard your brain with high-frequency stimuli, leaving your working memory more depleted than before the break.
      </p>

      <p>
        Instead, practice <strong>True Rest Breaks</strong>:
      </p>
      <ul>
        <li>Step away from your desk physically.</li>
        <li>Hydrate, drink tea, or do light stretches.</li>
        <li>Look at a distant horizon or walk outside for 5–10 minutes.</li>
        <li>Use structured Pomodoro intervals (e.g. 50 minutes study / 10 minutes rest, or 25/5).</li>
      </ul>

      <p>
        You can use our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/pomodoro-timer')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Pomodoro Study Timer
        </button>{' '}
        to enforce clean separation between focus intervals and rest periods.
      </p>

      {/* 10. The Daily Study Blueprint */}
      <h2 id="the-daily-study-blueprint">The Daily Study Blueprint</h2>
      <p>
        A reliable study day flows through four clear phases:
      </p>
      <ol>
        <li>
          <strong>The Morning Setup (5–10 mins):</strong> Review your 3 planned blocks. Confirm that textbooks, practice sets, and water are ready at your desk.
        </li>
        <li>
          <strong>The Prime Deep Block (Block A):</strong> Completed during your highest energy window without digital interruptions.
        </li>
        <li>
          <strong>The Secondary Block (Block B):</strong> Completed after a proper meal and physical reset.
        </li>
        <li>
          <strong>The Evening Shutdown (15 mins):</strong> Log your completed active study time, celebrate the streak, and write tomorrow’s 3 blocks so you wake up with zero friction.
        </li>
      </ol>

      {/* 11. The Weekly Study Plan */}
      <h2 id="the-weekly-study-plan">The Monday–Sunday Weekly Study Blueprint</h2>
      <p>
        Here is how a balanced weekly study schedule distributes effort across weekdays, tests, and recovery:
      </p>

      <ComparisonTable
        caption="Table 2: Resilient Monday-to-Sunday Weekly Distribution"
        columns={weeklyScheduleColumns}
        rows={weeklyScheduleRows}
      />

      <p>
        You can build, customize, and print your own personalized 7-day schedule using our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/weekly-study-planner')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Weekly Study Planner
        </button>
        .
      </p>

      {/* 12. Real-Life Examples */}
      <h2 id="real-life-examples">Real-Life Schedule Examples (3-Hour vs 6-Hour)</h2>

      <ExampleCard title="Schedule Example 1: The College Student with 3 Hours Available" badge="3-Hour Daily Blueprint">
        <p className="font-semibold text-slate-800 dark:text-slate-200">
          Target Student: Full-time undergraduate student balancing demanding lectures, assignments, and semester exams.
        </p>
        <div className="space-y-2 mt-3 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
            <span className="font-medium text-slate-900 dark:text-white">6:00 PM – 7:15 PM (75 min)</span>
            <span className="text-brand-600 dark:text-brand-400 font-semibold">Block 1: Difficult Subject (Calculus / Organic Chemistry)</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5 text-slate-400">
            <span>7:15 PM – 7:45 PM (30 min)</span>
            <span>Dinner, Walk &amp; Mental Decompression</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
            <span className="font-medium text-slate-900 dark:text-white">7:45 PM – 9:00 PM (75 min)</span>
            <span className="text-brand-600 dark:text-brand-400 font-semibold">Block 2: Core Theory &amp; Practice (Data Structures)</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
            <span className="font-medium text-slate-900 dark:text-white">9:15 PM – 9:45 PM (30 min)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Block 3: Daily Active Recall &amp; Tomorrow&apos;s Plan</span>
          </div>
          <div className="text-xs text-slate-500 pt-1">
            <strong>Net Focused Study:</strong> Exactly 3 hours. <strong>Guilt-Free Buffer:</strong> 45 minutes of leisure before sleep.
          </div>
        </div>
      </ExampleCard>

      <ExampleCard title="Schedule Example 2: The Competitive Exam Aspirant with 6 Hours Available" badge="6-Hour Daily Blueprint">
        <p className="font-semibold text-slate-800 dark:text-slate-200">
          Target Student: Full-time competitive examination candidate preparing for high-stakes tests (e.g. SSC, UPSC, GRE, GATE).
        </p>
        <div className="space-y-2 mt-3 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
            <span className="font-medium text-slate-900 dark:text-white">8:30 AM – 10:30 AM (120 min)</span>
            <span className="text-brand-600 dark:text-brand-400 font-semibold">Deep Block A: Quantitative Aptitude / Mathematics (Tier 1)</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
            <span className="font-medium text-slate-900 dark:text-white">11:00 AM – 1:00 PM (120 min)</span>
            <span className="text-brand-600 dark:text-brand-400 font-semibold">Deep Block B: Analytical Reasoning &amp; Problem Sets (Tier 2)</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5 text-slate-400">
            <span>1:00 PM – 3:30 PM (2.5 hrs)</span>
            <span>Nutritious Lunch, Nap &amp; Physical Reset</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
            <span className="font-medium text-slate-900 dark:text-white">3:30 PM – 5:00 PM (90 min)</span>
            <span className="text-brand-600 dark:text-brand-400 font-semibold">Block C: General Studies &amp; Reading Comprehension</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
            <span className="font-medium text-slate-900 dark:text-white">6:00 PM – 6:45 PM (45 min)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Block D: Daily Sectional Quiz &amp; Error Log</span>
          </div>
          <div className="text-xs text-slate-500 pt-1">
            <strong>Net Focused Study:</strong> 6 hours 15 minutes. <strong>Evening Freedom:</strong> Zero studying after 7 PM to guarantee deep sleep.
          </div>
        </div>
      </ExampleCard>

      {/* 13. Handling Busy Schedules */}
      <h2 id="handling-busy-schedules">Scheduling Around College, Jobs &amp; Commitments</h2>
      <p>
        If you work part-time, commute two hours, or take care of family members, you cannot copy a full-time student&apos;s routine. You must practice <strong>pocket optimization</strong>:
      </p>
      <ul>
        <li>
          <strong>The Golden 45:</strong> Wake up 45 minutes earlier than necessary. Complete your single most important revision task before the rest of your world wakes up. Even if the rest of your day goes haywire, your foundation is secure.
        </li>
        <li>
          <strong>Active Commuting:</strong> Use bus or train rides for low-friction retrieval: review flashcards on Anki, listen to recorded revision notes, or quiz yourself on formulas.
        </li>
        <li>
          <strong>Anchor Routines:</strong> Anchor study blocks to non-negotiable transition points (e.g., &quot;As soon as I change out of my work clothes, I sit at my desk for 40 minutes before touching dinner&quot;).
        </li>
      </ul>

      {/* 14. What to do when you miss a session */}
      <h2 id="the-24-hour-recovery-protocol">What to Do When You Miss a Session (The 24-Hour Rule)</h2>
      <p>
        The difference between students who succeed and students who abandon their goals is not that top students never fail. Everyone gets sick, encounters family emergencies, or experiences days where motivation is zero. The difference lies strictly in their <strong>recovery protocol</strong>:
      </p>

      <TipCallout title="The 24-Hour Recovery Protocol">
        <strong>Rule 1:</strong> Never try to study 10 hours tomorrow to compensate for 0 hours today. That triggers burnout.<br />
        <strong>Rule 2:</strong> Forgive the missed session immediately without self-criticism.<br />
        <strong>Rule 3:</strong> Protect your streak by doing the &quot;Minimum Viable Study&quot; today: 20 minutes of light review. Preserving the habit loop is infinitely more valuable than a zero day.
      </TipCallout>

      <p>
        To track your true consistency across weeks and months without beating yourself up for missed days, check your score on our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-consistency-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Consistency Calculator
        </button>
        .
      </p>

      {/* 15. Avoiding the Timetable Trap */}
      <h2 id="avoiding-the-timetable-trap">Stop Re-writing Your Plan: The 14-Day Lockdown</h2>
      <p>
        Many students suffer from <strong>&quot;Timetable Perfectionism&quot;</strong>: every time they have a mediocre study day, they spend three hours drawing a brand-new timetable. This creates an emotional dopamine hit—it feels productive, but it is actually a sophisticated form of procrastination.
      </p>
      <p>
        Enforce the <strong>14-Day Lockdown Rule</strong>: once you design your schedule, lock it in for a minimum of two full weeks. Do not touch or redraw it during the week. If a slot feels slightly off, write a quick note in the margin and adjust it during your Sunday review.
      </p>

      {/* 16. Tracking Honest Study Hours */}
      <h2 id="tracking-honest-study-hours">Track Honest Hours, Not Passive Desk Sitting</h2>
      <p>
        There is a massive distinction between <strong>Desk Time</strong> and <strong>Active Focus Time</strong>. Sitting at a desk for 8 hours with your phone buzzing, browser tabs open, and eyes wandering is worth less than 2 hours of deep, uninterrupted cognitive effort.
      </p>
      <p>
        Track only active focus time:
      </p>
      <ul>
        <li>Use a timer that you pause whenever you leave your desk or pick up your phone.</li>
        <li>Review your net daily focus total every evening.</li>
        <li>Aim for gradual improvement: turn 2 honest hours into 2.5 honest hours over 3 weeks.</li>
      </ul>
      <p>
        You can track all your focus sessions locally with the built-in{' '}
        <button
          type="button"
          onClick={goToApp}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Pilot Workspace
        </button>
        , which automatically separates pauses and break periods from your true study time.
      </p>

      {/* 17. Building Consistency & Streaks */}
      <h2 id="building-unbreakable-consistency">Building Unbreakable Consistency &amp; Streaks</h2>
      <p>
        Consistency is not an emotional feeling; it is a behavioral habit loop. To make studying second nature:
      </p>
      <ul>
        <li>
          <strong>Establish a Daily Minimum Threshold:</strong> Define a minimum session (e.g. 45 minutes) that qualifies as a successful day. Even on exhausting days, hitting this threshold keeps your psychological streak alive.
        </li>
        <li>
          <strong>Visual Progress Tracking:</strong> Seeing your unbroken streak on a calendar heatmap creates a powerful psychological incentive to sit down tomorrow.
        </li>
      </ul>
      <p>
        Use our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-habit-tracker')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Habit Tracker
        </button>{' '}
        to monitor your daily streaks and build visual momentum.
      </p>

      {/* 18. Defeating Procrastination */}
      <h2 id="defeating-task-procrastination">Overcoming Procrastination &amp; Overwhelm</h2>
      <p>
        Procrastination is rarely a sign of laziness; it is an emotional coping mechanism for overwhelm or fear of failure. When a chapter looks impossibly dense, your brain seeks immediate relief through low-stakes distractions.
      </p>
      <p>
        To bypass this cognitive resistance, use the <strong>5-Minute Activation Rule</strong>:
      </p>
      <blockquote>
        Tell yourself: &quot;I only have to sit down and read one single page for 5 minutes. If I still hate it after 5 minutes, I am allowed to stop.&quot;
      </blockquote>
      <p>
        90% of the time, the hardest part is overcoming the initial activation energy. Once you clear that first hurdle, momentum carries you through the full session.
      </p>

      {/* 19. Weekly Sunday Review System */}
      <h2 id="weekly-review-system">The 15-Minute Sunday Retrospective</h2>
      <p>
        Every Sunday evening, spend 15 minutes asking yourself three objective questions:
      </p>
      <ol>
        <li>
          <strong>What percentage of my scheduled blocks did I complete this week?</strong> (If above 80%, you are crushing it. If below 60%, your schedule is too ambitious; trim 20% of your targets for next week.)
        </li>
        <li>
          <strong>Which subject caused the most cognitive resistance?</strong> (Move this subject to an earlier time slot or pair it with an easier practice session.)
        </li>
        <li>
          <strong>What unexpected delays occurred, and did my buffers absorb them?</strong> (Adjust next week&apos;s buffer margins accordingly.)
        </li>
      </ol>

      {/* 20. 6 Common Timetable Mistakes to Avoid */}
      <h2 id="common-mistakes-to-avoid">6 Common Timetable Mistakes to Avoid</h2>
      <ChecklistCard
        title="Avoid These Pitfalls When Building Your Next Schedule"
        items={commonMistakes}
      />

      <p className="mt-8 font-semibold text-slate-800 dark:text-slate-200">
        Ready to build your plan? You can auto-generate a realistic schedule right now with our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-planner-generator')}
          className="text-brand-600 dark:text-brand-400 underline underline-offset-2"
        >
          Study Planner Generator
        </button>
        , or manage your active daily subjects and focus timer in the{' '}
        <button
          type="button"
          onClick={goToApp}
          className="text-brand-600 dark:text-brand-400 underline underline-offset-2"
        >
          Study Pilot Workspace
        </button>
        .
      </p>

      {/* 21. Frequently Asked Questions */}
      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default PillarStudyScheduleArticle;
