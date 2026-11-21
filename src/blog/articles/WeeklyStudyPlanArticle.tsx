import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ExampleCard } from '../components/ExampleCard';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { getArticleBySlug } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const WeeklyStudyPlanArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-create-a-weekly-study-plan')!;

  const weeklySteps = [
    {
      title: '1. Map Fixed Commitments First (The Non-Negotiables)',
      desc: 'Before scheduling a single study hour, block out your class lectures, coaching batches, commutes, meal times, and a mandatory 7–8 hours of nightly sleep.',
    },
    {
      title: '2. Define Weekly Focus Themes per Day',
      desc: 'Assign clear thematic priorities (e.g., Monday/Wednesday = Problem Solving, Tuesday/Thursday = Conceptual Reading & Derivations, Friday = PYQs & Error Logs, Saturday = Full Mock Tests).',
    },
    {
      title: '3. Build in a 20% Flex Buffer',
      desc: 'Leave Friday evening or Saturday morning completely empty of new material. When inevitable weekday delays occur, you absorb them into the buffer without derailing your schedule.',
    },
    {
      title: '4. Schedule the Sunday 20-Minute Review',
      desc: 'Audit your completed hours versus your planned targets. Close gaps, update your syllabus checklist, and set next week&apos;s targets before Monday morning arrives.',
    },
  ];

  const sundayAuditChecklist = [
    {
      title: 'Target vs. Actual Hours Completed',
      desc: 'Count your honest net focus hours. If you planned 25 hours but achieved 18, adjust next week&apos;s plan down to 20 rather than pretending you will suddenly achieve 35.',
    },
    {
      title: 'Syllabus Milestone Check',
      desc: 'Verify if scheduled chapters were completed. If a chapter took longer than expected, redistribute remaining chapters across the upcoming fortnight.',
    },
    {
      title: 'Error Log Consolidation',
      desc: 'Review mistakes made during the week&apos;s practice questions and mock tests. Flag recurring weak formulas or concepts for immediate Monday review.',
    },
  ];

  const faqItems = [
    {
      question: 'Why should I plan weekly instead of daily?',
      answer: (
        <p>
          Daily planning suffers from &quot;tactical myopia&quot;—you fight fires every morning without knowing if your overall syllabus trajectory is on pace for exam day. A 7-day weekly horizon gives you enough perspective to balance multiple subjects and absorb unexpected interruptions without emotional panic.
        </p>
      ),
    },
    {
      question: 'What do I do if I fall behind by Wednesday?',
      answer: (
        <p>
          Do not panic or attempt to stay awake until 3:00 AM. That is the exact purpose of the <strong>Friday Flex Buffer</strong>. Simply keep moving forward with Thursday’s scheduled blocks, and complete Wednesday&apos;s delayed session during the Friday buffer.
        </p>
      ),
    },
    {
      question: 'How many study hours should I aim for in a single week?',
      answer: (
        <p>
          For a full-time college student, <strong>20 to 25 net study hours per week</strong> outside classes is a fantastic, sustainable target. For full-time competitive exam aspirants, <strong>35 to 42 net hours per week</strong> represents an elite, sustainable volume when paired with restorative rest.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        Every student has experienced the Sunday evening burst of inspiration: you buy highlighters, open a fresh notebook, and draw a pristine timetable covering 6:00 AM to 11:00 PM for every day of the week.
      </p>

      <p>
        By Tuesday afternoon, a delayed bus, an unexpected assignment, or a headache knocks the schedule off track by 45 minutes. The dominoes fall: Wednesday feels ruined, Thursday is abandoned, and by Friday you are back to zero, waiting for &quot;next Monday&quot; to try again.
      </p>
      <p>
        The problem was not your discipline. The problem was your plan&apos;s structural rigidity. Here is how to create a <strong>flexible weekly study plan</strong> that accommodates real-life turbulence while keeping your syllabus completion on track.
      </p>

      <h2 id="why-daily-lists-fail">Why Daily To-Do Lists Fail Without a Weekly Horizon</h2>
      <p>
        Daily to-do lists create reactive panic. You wake up, look at 10 items, and rush to finish whatever feels easiest or most urgent. Without a weekly structural roadmap, you neglect foundational revision and difficult subjects in favor of easy tasks.
      </p>
      <p>
        A 7-day weekly blueprint balances:
      </p>
      <ul>
        <li><strong>New syllabus learning:</strong> 60% of total weekly study time.</li>
        <li><strong>Active recall &amp; past question drills:</strong> 25% of total time.</li>
        <li><strong>Flex buffer &amp; error analysis:</strong> 15% of total time.</li>
      </ul>

      <WarningCallout title="The Fragility of Zero-Buffer Schedules">
        If your weekly schedule plans every hour with zero slack, it has a 100% mathematical probability of failure. High-performance study systems must be built like shock absorbers: flexible enough to absorb delays without snapping.
      </WarningCallout>

      <h2 id="the-4-step-weekly-architecture">The 4-Step Weekly Blueprint Architecture</h2>
      <p>
        To build a resilient weekly plan, follow this sequential 4-step framework:
      </p>
      <ChecklistCard
        title="The Weekly Planning Framework"
        items={weeklySteps}
      />

      <h2 id="anchoring-fixed-commitments">Step 1: Anchor Fixed Commitments &amp; Bio-Basics</h2>
      <p>
        Your study time does not exist in a vacuum. Start with a blank 7-day grid and shade out:
      </p>
      <ul>
        <li><strong>Sleep:</strong> 7 to 8 hours daily (non-negotiable for neural consolidation).</li>
        <li><strong>Lectures &amp; Classes:</strong> Actual hours including travel and prep.</li>
        <li><strong>Biological Needs:</strong> Meals, hygiene, physical exercise, and family commitments.</li>
      </ul>
      <p>
        What remains is your <strong>True Available Discretionary Window</strong>.
      </p>

      <h2 id="calculating-weekly-study-capacity">Step 2: Calculate Honest Study Capacity</h2>
      <p>
        If your remaining free window is 30 hours across the week, <strong>do not schedule 30 hours of studying</strong>. Schedule a maximum of 22 to 24 hours (roughly 75–80% of capacity). Leaving a cushion prevents fatigue and accounts for low-energy days.
      </p>

      <TipCallout title="The 80% Rule">
        Planning at 80% capacity guarantees that when you have a brilliant, high-energy day, you exceed your plan and gain psychological momentum. Planning at 100% capacity guarantees you will constantly feel behind.
      </TipCallout>

      <h2 id="the-20-percent-buffer-rule">Step 3: The 20% Flex Buffer Principle</h2>
      <p>
        Every bulletproof weekly study plan designates a specific block as the <strong>Catch-Up &amp; Flex Zone</strong>. Friday afternoon or Saturday morning is ideal.
      </p>
      <p>
        If you missed Tuesday&apos;s physics problem set because you were unwell, you do not scramble on Wednesday. You simply move Tuesday&apos;s physics task into Friday&apos;s buffer block. If your week went perfectly and you have no backlog, Friday&apos;s buffer becomes free personal time or early weekend relaxation!
      </p>

      <h2 id="the-sunday-reset-ritual">Step 4: The 20-Minute Sunday Reset Ritual</h2>
      <p>
        Sunday evening is the bridge between your past performance and your future progress. Set a recurring 20-minute timer every Sunday to conduct your review:
      </p>
      <ChecklistCard
        title="The 20-Minute Sunday Audit"
        items={sundayAuditChecklist}
      />

      <h2 id="sample-weekly-schedule">Complete Monday–Sunday Sample Schedule</h2>
      <ExampleCard title="The Sustainable Weekly Study Blueprint (24 Net Hours)" badge="Full 7-Day Template">
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p><strong>Monday (3.5 hrs):</strong> Subject A Theory &amp; Notes (2 hrs) + Subject B Practice Drills (1.5 hrs)</p>
          <p><strong>Tuesday (3.5 hrs):</strong> Subject C Conceptual Problem Solving (2 hrs) + Subject A Flashcard Revision (1.5 hrs)</p>
          <p><strong>Wednesday (3.5 hrs):</strong> Subject B Core Derivations (2 hrs) + Subject C PYQs (1.5 hrs)</p>
          <p><strong>Thursday (3.5 hrs):</strong> Subject A Deep Work Block (2 hrs) + Subject B Quick Review (1.5 hrs)</p>
          <p><strong>Friday (3.5 hrs):</strong> 1.5 hrs Subject C Practice + <strong>2.0 hrs Flex Catch-Up Buffer</strong> (absorbs any weekly backlog)</p>
          <p><strong>Saturday (4.5 hrs):</strong> Full-Length Timed Sectional Mock Test (2.5 hrs) + Detailed Error Log Review (2 hrs)</p>
          <p><strong>Sunday (2 hrs):</strong> 45 min Formula &amp; Memory Sheet Review + 20 min Sunday Audit &amp; Next Week Schedule Generation + <strong>Afternoon Off</strong></p>
        </div>
      </ExampleCard>

      <p className="mt-6">
        Ready to map your week? Use our free interactive{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/weekly-study-planner')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Weekly Study Planner
        </button>{' '}
        to generate time blocks and print your customized 7-day schedule, or verify your available hours with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-hours-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Hours Calculator
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default WeeklyStudyPlanArticle;
