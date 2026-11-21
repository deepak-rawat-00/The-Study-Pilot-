import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { ComparisonTable } from '../components/ComparisonTable';
import { getArticleBySlug } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const CompetitiveExamPlanArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('competitive-exam-study-plan')!;

  const comparisonColumns = [
    { key: 'parameter', header: 'Practice Parameter', width: 'w-1/4' },
    { key: 'amateur', header: 'Amateur Approach', width: 'w-3/8' },
    { key: 'ranker', header: 'Ranker Approach', width: 'w-3/8' },
  ];

  const comparisonRows = [
    {
      parameter: 'Mock Test Timing',
      amateur: 'Untimed, relaxed couch sitting',
      ranker: 'Exact exam slot (e.g. 9:00–12:00) with desk setup',
    },
    {
      parameter: 'Post-Test Review',
      amateur: 'Glances at score, feels happy/sad (15 min)',
      ranker: 'Deep 3-hour post-test audit of every incorrect question',
    },
    {
      parameter: 'Mistake Handling',
      amateur: 'Believes "I will get it right next time"',
      ranker: 'Logs mistake in physical Error Journal with re-test date',
    },
    {
      parameter: 'Revision Style',
      amateur: 'Rereads entire 600-page book from start',
      ranker: 'Targeted review of error log and 2-page summary sheets',
    },
  ];

  const errorLogFields = [
    {
      title: '1. Exact Question ID & Topic',
      desc: 'Note the book, test series number, or question ID (e.g. &quot;Mock 4, Q37: Thermodynamics Enthalpy Calculation&quot;).',
    },
    {
      title: '2. Root Cause of Error (The 4 Categories)',
      desc: 'Was it a Conceptual Gap, a Calculation/Silly Slip, a Misread Question stem, or a Time-Pressure Guess? Never label a mistake as &quot;just unlucky&quot;.',
    },
    {
      title: '3. Correct Solution & Underlying Rule',
      desc: 'Write out the single conceptual rule, formula, or trap that you overlooked in one crisp sentence.',
    },
    {
      title: '4. Re-Test Date',
      desc: 'Schedule the exact question to be solved again in 7 days without looking at the answer key.',
    },
  ];

  const preparationPhases = [
    {
      title: 'Phase 1: Foundation & Concept Encoding (Months 1–4)',
      desc: 'Primary focus: 70% First-time syllabus coverage and lecture notes + 30% basic chapter-end exercises. Goal is complete conceptual clarity with zero skipped chapters.',
    },
    {
      title: 'Phase 2: Intensive Problem Solving & PYQs (Months 5–8)',
      desc: 'Primary focus: 60% Past 10-year question drilling under timed conditions + 40% spaced revision passes of Phase 1 notes.',
    },
    {
      title: 'Phase 3: Full-Length Mocks & Precision Error Elimination (Months 9–12)',
      desc: 'Primary focus: 50% Full-length official mock tests under strict exam hours + 50% Error Log triage, formula memorization, and rapid revision loops.',
    },
  ];

  const faqItems = [
    {
      question: 'When should I start taking full-length mock tests?',
      answer: (
        <p>
          Do not wait until 100% of the syllabus is completed. Start taking sectional timed tests when you cross 50% syllabus coverage, and begin full-length mocks at 75–80% coverage. Taking mocks early trains your exam temperament and reveals high-yield question patterns.
        </p>
      ),
    },
    {
      question: 'How many mock tests are enough for competitive exams?',
      answer: (
        <p>
          Quality and depth of post-test analysis are far more important than raw volume. <strong>25 to 40 full-length mocks thoroughly analyzed with an error log</strong> outperforms 100 mocks taken hastily without reviewing errors.
        </p>
      ),
    },
    {
      question: 'How do I handle negative marking and wild guessing?',
      answer: (
        <p>
          Eliminate random guesswork entirely. Only attempt questions where you can eliminate at least two answer options. Track your &quot;guess accuracy&quot; across five mock tests; if your net score from guesses is negative, raise your guessing threshold strictly.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        Competitive examinations—whether SSC, UPSC, GATE, GRE, NEET, JEE, or state civil service tests—are fundamentally different from university exams. In college, scoring 70% earns an &apos;A&apos; grade. In a competitive examination with 500,000 applicants and 1,000 vacancies, scoring 70% often leaves you without a rank.
      </p>

      <p>
        Competitive exams do not measure how many hours you sat at a desk or how neatly you highlighted your textbooks. They measure <strong>speed, accuracy, conceptual depth under stress, and error minimization</strong>.
      </p>
      <p>
        Here is the proven, multi-phase operational blueprint used by top rankers to turn massive syllabi into predictable results.
      </p>

      <h2 id="the-3-phase-architecture">The 3-Phase Competitive Exam Architecture</h2>
      <p>
        The most common fatal mistake in competitive exam prep is treating the entire year identically: reading books month after month until exam week arrives. Successful aspirants structure their timeline into three distinct operational phases:
      </p>

      <ChecklistCard
        title="The 3 Strategic Preparation Phases"
        items={preparationPhases}
      />

      <h2 id="phase-1-concept-mastery">Phase 1: Concept Mastery &amp; High-Yield Notes</h2>
      <p>
        During Phase 1, your singular goal is to build an unbreakable foundation. Do not rush through chapters superficially just to tick boxes on a wall chart.
      </p>
      <ul>
        <li><strong>Create Micro-Summaries:</strong> For every 50-page chapter, condense the key formulas, definitions, and exception rules into a 2-page &quot;crib sheet&quot;. You will rely on these sheets during the final 30 days.</li>
        <li><strong>Solve Basic Examples Immediately:</strong> Reading theory without solving 10 immediate application questions leaves concepts unanchored in working memory.</li>
      </ul>

      <WarningCallout title="The Video Lecture Trap">
        Watching 6 hours of coaching videos per day is passive intake, not studying. For every 1 hour of video instruction, you must spend at least 1 hour solving problems on physical paper with pen in hand.
      </WarningCallout>

      <h2 id="phase-2-question-bank-drills">Phase 2: Question Banks &amp; Past-Year Topic Mastery</h2>
      <p>
        The secret to competitive exams is that examiners are bounded by the syllabus. High-yield themes repeat year after year in varied permutations.
      </p>
      <p>
        In Phase 2, past 10-year question papers (PYQs) become your primary curriculum. Break PYQs down topic by topic rather than doing full papers all at once. If you just finished Electrostatics, immediately solve every question asked on Electrostatics over the last decade.
      </p>

      <h2 id="phase-3-mock-tests-and-error-logs">Phase 3: Timed Mock Tests &amp; Error Log Elimination</h2>
      <p>
        The final 90 days before your examination must be dedicated to test-taking endurance and error eradication.
      </p>

      <ComparisonTable
        caption="Amateur vs. Ranker Approach to Mock Tests and Error Logs"
        columns={comparisonColumns}
        rows={comparisonRows}
      />

      <h2 id="the-error-log-mastery-system">The Error Log Protocol: Why Rankers Track Mistakes</h2>
      <p>
        Every missed question in a mock test represents a leak in your score. If you take 30 mocks and make 20 mistakes per mock, you encounter 600 specific failure points. If you do not record them, you will repeat at least 40% of those same mistakes on official exam day.
      </p>

      <ChecklistCard
        title="4 Essential Error Log Fields"
        items={errorLogFields}
      />

      <TipCallout title="The Sunday Error Log Sprint">
        Spend Sunday morning solving only past questions from your Error Log that you got wrong two weeks ago. If you can solve them flawlessly now, you have permanently plugged that knowledge leak.
      </TipCallout>

      <h2 id="tracking-4-dimensions-of-prep">Track the 4 Dimensions of Preparation (Not Just Syllabus %)</h2>
      <p>
        Do not deceive yourself with a single &quot;Syllabus % Completed&quot; number. A student who has read 100% of the syllabus once, but revised zero times and taken zero mocks, is in severe danger.
      </p>
      <p>
        Always track four independent metrics:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300">
        <li><strong>First-Pass Learning:</strong> Topics read and understood with basic notes taken.</li>
        <li><strong>Revision Passes:</strong> Topics actively retrieved and revised at least twice.</li>
        <li><strong>Practice Mastery:</strong> Chapters where you have solved at least 50+ past questions.</li>
        <li><strong>Mock Test Readiness:</strong> Total full-length timed tests completed under exam conditions.</li>
      </ol>

      <p className="mt-6">
        Track your exact preparation readiness across all four dimensions with our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/exam-preparation-progress')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Exam Preparation Progress Calculator
        </button>{' '}
        and count down your study days with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/exam-countdown')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Exam Countdown &amp; Revision Milestone Tool
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default CompetitiveExamPlanArticle;
