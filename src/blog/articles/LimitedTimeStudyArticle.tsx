import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ExampleCard } from '../components/ExampleCard';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { ComparisonTable } from '../components/ComparisonTable';
import { getArticleBySlug } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const LimitedTimeStudyArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-study-with-limited-time')!;

  const comparisonColumns = [
    { key: 'activity', header: 'Study Activity', width: 'w-1/3' },
    { key: 'yield', header: 'Yield per Hour', width: 'w-1/3' },
    { key: 'action', header: 'Action for Busy Students', width: 'w-1/3' },
  ];

  const comparisonRows = [
    {
      activity: 'Rereading textbook chapters',
      yield: 'Very Low (15% retention)',
      action: 'Stop immediately. Use practice questions instead.',
    },
    {
      activity: 'Color-coding and rewriting notes',
      yield: 'Low (20% retention)',
      action: 'Replace with bulleted summaries or digital flashcards.',
    },
    {
      activity: 'Watching 3-hour video lectures',
      yield: 'Moderate (35% retention)',
      action: 'Watch at 1.5x speed; pause every 15 min to solve a problem.',
    },
    {
      activity: 'Active recall (testing yourself)',
      yield: 'Extremely High (85% retention)',
      action: 'Dedicate 60% of your available study time here.',
    },
    {
      activity: 'Timed past-year questions',
      yield: 'Extremely High (90% retention)',
      action: 'Dedicate 40% of your available study time here.',
    },
  ];

  const twoHourProtocol = [
    {
      title: 'Block 1: Morning Focus Sprint (60 Minutes) — 06:00 to 07:00 AM',
      desc: 'Wake up 1 hour earlier. Before opening email, social media, or family conversations, complete 60 minutes of high-priority problem solving or dense conceptual learning. Your willpower is 100% full.',
    },
    {
      title: 'Block 2: Lunch / Transit Micro-Session (20 Minutes) — Midday',
      desc: 'Use digital flashcards (Anki / Quizlet) or formula sheets during your commute or lunch break. 20 minutes of active retrieval consolidates morning learning.',
    },
    {
      title: 'Block 3: Evening Output Block (40 Minutes) — 08:30 to 09:10 PM',
      desc: 'Solve 10 timed practice questions or write a 1-page summary. Stop promptly at 40 minutes to protect wind-down time and 7.5 hours of sleep.',
    },
  ];

  const microWindows = [
    {
      title: 'Morning Commute / Transit (15–20 Mins)',
      desc: 'Review 30 digital flashcards or listen to an educational podcast episode on your headphones instead of browsing short-form videos.',
    },
    {
      title: 'Waiting in Line / Between Meetings (5–10 Mins)',
      desc: 'Review a 1-page formula summary sheet saved as an image on your smartphone lock screen.',
    },
    {
      title: 'Pre-Sleep Recall (10 Mins)',
      desc: 'Close your eyes and mentally reconstruct the 3 core principles you studied that morning before drifting off to sleep.',
    },
  ];

  const faqItems = [
    {
      question: 'Can I really pass competitive or university exams studying only 2 hours a day?',
      answer: (
        <p>
          Yes, provided you study consistently over months and focus purely on high-yield active recall. 2 hours of daily uninterrupted problem-solving over 180 days equals <strong>360 net focus hours</strong>. A full-time student cramming in the final 3 weeks rarely achieves 150 net focus hours.
        </p>
      ),
    },
    {
      question: 'What if I am completely exhausted after an 8-hour workday?',
      answer: (
        <p>
          Never schedule your main study session for the late evening when physical and mental stamina are spent. Move your primary 60-minute session to the <strong>early morning before work</strong>. You give your freshest brain to your future, not your employer&apos;s leftovers.
        </p>
      ),
    },
    {
      question: 'Should I sacrifice sleep to get an extra hour of study?',
      answer: (
        <p>
          Never. Sleep is the physiological mechanism through which the hippocampus transfers temporary memories into long-term neocortical storage. Cutting sleep from 7 hours to 5 hours reduces memory retention by up to 40%, completely neutralizing whatever you studied during that tired hour.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        If you search online for study advice, most articles assume you have infinite free time: <em>&quot;Wake up at 5:00 AM, meditate for 45 minutes, study for 8 hours, go for a 2-hour workout...&quot;</em>
      </p>

      <p>
        For university students working part-time jobs, parents returning to education, or working professionals preparing for competitive career exams, this advice is completely detached from reality. You don&apos;t have 8 hours. You have <strong>90 to 120 minutes</strong> on weekdays, wedged between commutes, deadlines, and household obligations.
      </p>
      <p>
        The good news? You do not need 8 hours. When time is scarce, artificial constraints force extreme focus. Here is the exact <strong>2-hour daily protocol</strong> that enables busy students to outperform full-time crammers.
      </p>

      <h2 id="the-limited-time-reality">The Working Student&apos;s Reality: Why 8-Hour Timetables Are Irrelevant</h2>
      <p>
        Full-time students frequently succumb to <strong>Parkinson&apos;s Law</strong>: work expands to fill the time available for its completion. When someone has 10 free hours, a task that requires 90 minutes takes 6 hours of distracted browsing, frequent snack breaks, and endless note beautification.
      </p>
      <p>
        When you have only 2 hours, you cannot afford fluff. You cannot waste 40 minutes color-coding notes or drawing decorative title pages. You operate with surgical precision.
      </p>

      <h2 id="the-80-20-syllabus-pruning">The 80/20 Principle: Prune Your Syllabus Ruthlessly</h2>
      <p>
        The Pareto Principle dictates that <strong>80% of exam marks come from 20% of core syllabus concepts</strong>.
      </p>
      <p>
        When your time is limited, trying to achieve 100% textbook coverage is a losing strategy. Instead:
      </p>
      <ul>
        <li>Analyze the last 5 to 7 years of exam papers to identify recurring core themes.</li>
        <li>Assign top priority to high-weightage topics that appear on every single test.</li>
        <li>Aggressively de-prioritize obscure, low-yield subtopics that represent only 1–2% of total marks.</li>
      </ul>

      <WarningCallout title="The Perfectionism Hazard">
        Attempting to master every obscure footnote in a textbook when you have 90 minutes a day guarantees you will run out of time before mastering the core formulas that carry 80% of the grade.
      </WarningCallout>

      <h2 id="the-2-hour-daily-protocol">The 2-Hour Daily High-Yield Protocol</h2>
      <p>
        Do not attempt to sit for 2 continuous hours after a exhausting workday. Split your time into three energy-matched blocks:
      </p>

      <ChecklistCard
        title="The 3-Block Daily High-Yield Architecture"
        items={twoHourProtocol}
      />

      <TipCallout title="The Golden Morning Window">
        Always complete your most intellectually demanding study task in the early morning. Once that 60-minute block is finished, your primary study goal for the day is secure, regardless of how chaotic your workday becomes.
      </TipCallout>

      <h2 id="finding-hidden-micro-windows">Mining 45 Minutes of Hidden Micro-Windows</h2>
      <p>
        You do not need continuous multi-hour study sessions to reinforce memory. Micro-windows of 5 to 15 minutes are scientifically proven to be ideal for <strong>spaced retrieval practice</strong>:
      </p>

      <ChecklistCard
        title="Hidden Daily Micro-Study Opportunities"
        items={microWindows}
      />

      <h2 id="active-recall-vs-passive-highlighting">Eliminating Low-Yield Study Rituals</h2>
      <p>
        When study hours are scarce, low-yield study methods are completely unaffordable:
      </p>

      <ComparisonTable
        caption="Study Activity Yield Comparison for Busy Students"
        columns={comparisonColumns}
        rows={comparisonRows}
      />

      <h2 id="weekend-force-multipliers">The 4-Hour Weekend Force Multiplier</h2>
      <p>
        Use your weekends not to cram 12 hours, but to conduct two focused 2-hour deep work blocks (total 4 hours each Saturday and Sunday morning).
      </p>
      <ExampleCard title="The Weekend Multiplier Calculation" badge="Math Breakdown">
        <p>
          <strong>Weekdays:</strong> 2 hours/day × 5 days = 10 hours<br />
          <strong>Weekends:</strong> 4 hours/day × 2 days = 8 hours<br />
          <strong>Total Weekly Net Study Time:</strong> <strong>18 hours of pure, distraction-free active recall</strong>.
        </p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Over 6 months, 18 hours per week totals 468 net hours of rigorous study—more than enough to excel in demanding university finals or competitive certifications.
        </p>
      </ExampleCard>

      <p className="mt-6">
        Calculate your exact weekly study capacity with your unique work and life constraints using our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-hours-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Hours &amp; Capacity Calculator
        </button>{' '}
        or organize your limited time blocks with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/weekly-study-planner')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Weekly Study Planner
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default LimitedTimeStudyArticle;
