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

export const TrackStudyTimeArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-track-study-time')!;

  const comparisonColumns = [
    { key: 'dimension', header: 'Dimension', width: 'w-1/4' },
    { key: 'passive', header: 'Passive Desk Sitting', width: 'w-3/8' },
    { key: 'active', header: 'Honest Net Focus Tracking', width: 'w-3/8' },
  ];

  const comparisonRows = [
    {
      dimension: 'Measurement Target',
      passive: 'Total clock time spent in chair',
      active: 'Stopwatch paused for all distractions',
    },
    {
      dimension: 'Phone Handling',
      passive: 'Phone on desk, periodic checks',
      active: 'Phone outside room or timer paused',
    },
    {
      dimension: 'Mental Fatigue',
      passive: 'Low engagement, emotional exhaustion',
      active: 'High cognitive engagement, clean mental closure',
    },
    {
      dimension: 'Long-Term Retention',
      passive: 'Low: 20–30% recall after 7 days',
      active: 'High: 70–85% retention through active recall',
    },
    {
      dimension: 'Daily Realism',
      passive: 'Claims 10–12 hours daily (illusory)',
      active: 'Consistent 3–5 hours daily (sustainable for months)',
    },
  ];

  const pauseRules = [
    {
      title: '1. The Screen Unlock Rule',
      desc: 'The millisecond your hand touches your smartphone to unlock it, check an alert, or reply to a text, stop the timer. Do not let the clock tick while you scroll.',
    },
    {
      title: '2. The Bathroom & Snack Break Rule',
      desc: 'Getting up to grab water, brew coffee, or stretch is rest, not study time. Pause the timer immediately upon leaving your desk.',
    },
    {
      title: '3. The Mind-Drift Rule',
      desc: 'If you catch yourself daydreaming or reading the same paragraph three times without registering the words, pause the timer, stand up, take 3 deep breaths, and restart only when focus returns.',
    },
  ];

  const dailyTrackingSteps = [
    {
      title: 'Step 1: Set an Intentional Session Objective',
      desc: 'Never hit &quot;Start Timer&quot; without an explicit, verifiable micro-goal. Write: &quot;Solve problems 14 to 22 in Chapter 3&quot;, not &quot;Study Math&quot;.',
    },
    {
      title: 'Step 2: Use an Unforgiving Stopwatch or Focus Timer',
      desc: 'Count up or down with zero auto-accumulation. If you step away from the desk, the timer stops.',
    },
    {
      title: 'Step 3: Log Subject-Wise Net Minutes Immediately',
      desc: 'At the end of each block, record the exact net minutes worked and the task completed. Recording immediately avoids retrospective estimation bias.',
    },
    {
      title: 'Step 4: Conduct a Sunday Efficiency Audit',
      desc: 'Compare total desk hours against logged focus hours to calculate your personal Focus Efficiency Ratio.',
    },
  ];

  const faqItems = [
    {
      question: 'How many honest study hours can a human sustain daily?',
      answer: (
        <p>
          Cognitive research shows that <strong>4 to 5 hours of deep, high-intensity focus</strong> is the realistic upper limit for most humans before cognitive fatigue causes sharp diminishing returns. Anyone claiming to study 14 hours of deep focus every day is confusing desk sitting with active neural encoding.
        </p>
      ),
    },
    {
      question: 'Should I track time spent watching online video lectures?',
      answer: (
        <p>
          Yes, but categorize it separately as <em>passive intake</em> or <em>instruction time</em>. Real mastery happens during <em>active output</em> (solving questions, deriving formulas, testing recall). Aim for at least a 1:1 ratio between lecture consumption and active problem-solving.
        </p>
      ),
    },
    {
      question: 'Does tracking my study time create unnecessary stress?',
      answer: (
        <p>
          It creates stress only if you treat hours as an ego contest. When used scientifically, time tracking frees you from anxiety. Once you hit your scheduled 3.5 net hours, you can enjoy your evening with zero lingering guilt, knowing your work is complete.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        Ask any struggling student how much they studied today, and they will likely tell you: <em>&quot;I studied for 8 hours!&quot;</em> But if you examine those 8 hours under a microscope, you will find 2 hours of checking social media notifications, 1.5 hours of highlighting notes without reading them, 1 hour daydreaming, and 45 minutes finding Spotify study playlists.
      </p>

      <p>
        Their net, high-retention cognitive work was closer to <strong>2 hours and 15 minutes</strong>. This gap between illusion and reality is the &quot;Desk-Sitting Delusion&quot;—and it is the number one reason students wonder why their exam scores do not reflect their study hours.
      </p>

      <h2 id="the-desk-sitting-delusion">The Desk-Sitting Delusion: Gross vs. Net Study Hours</h2>
      <p>
        There are two fundamentally different numbers you can measure:
      </p>
      <ul>
        <li><strong>Gross Desk Time:</strong> The total clock time elapsed while sitting in your study chair with books open (e.g., 9:00 AM to 5:00 PM = 8 hours).</li>
        <li><strong>Net Focus Time:</strong> The actual time your brain was actively solving problems, retrieving concepts from memory, or writing analyses with zero digital distractions.</li>
      </ul>

      <WarningCallout title="The Vanity Metric Hazard">
        Tracking gross desk time rewards physical presence over mental engagement. It gives you a false sense of achievement while leaving you intellectually unprepared on exam day.
      </WarningCallout>

      <h2 id="why-passive-hours-harm-progress">Why Inflating Study Hours Destroys Realistic Planning</h2>
      <p>
        When you tell yourself you study 8 hours every day, you plan future revisions based on a phantom capacity. You assign yourself 50 chapters in 6 days, fail to complete them, experience intense frustration, and assume you are simply not smart enough.
      </p>
      <p>
        When you switch to measuring <strong>honest net hours</strong>, you discover that 3.5 hours of uninterrupted deep work consistently outperforms 8 hours of distracted desk lingering. You can plan realistically, sleep 8 hours, and eliminate study guilt forever.
      </p>

      <h2 id="active-vs-passive-study-metrics">Active Focus vs. Passive Desk Sitting Comparison</h2>
      <ComparisonTable
        caption="Passive Desk Sitting vs. Honest Net Focus Tracking"
        columns={comparisonColumns}
        rows={comparisonRows}
      />

      <h2 id="the-strict-pause-rules">The 3 Strict Pause Rules for Honest Tracking</h2>
      <p>
        To track study time accurately, adopt the three non-negotiable pause rules used by top researchers and competitive exam rankers:
      </p>

      <ChecklistCard
        title="The Strict Timer Pause Policy"
        items={pauseRules}
      />

      <h2 id="the-weekly-efficiency-audit">The Weekly Efficiency Audit Formula</h2>
      <p>
        At the end of every week, calculate your <strong>Focus Efficiency Ratio (FER)</strong>:
      </p>
      <div className="my-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
        <span className="font-mono text-base sm:text-lg font-bold text-brand-600 dark:text-brand-400">
          Focus Efficiency Ratio (FER) = (Net Focus Hours / Gross Desk Hours) × 100
        </span>
      </div>

      <ExampleCard title="Weekly Efficiency Audit: Ananya's Shift" badge="Case Study">
        <p>
          <strong>Week 1 (Unmeasured):</strong> Ananya sat at her desk from 10:00 AM to 6:00 PM (480 minutes gross). She kept her phone on her desk. She felt exhausted, yet completed only 12 physics problems. Her estimated FER was <strong>32%</strong> (~150 minutes real work).
        </p>
        <p className="mt-2">
          <strong>Week 2 (Strict Tracking):</strong> Ananya placed her phone in another room and used a focus timer with strict pause rules. She studied from 9:30 AM to 1:30 PM (240 minutes gross) and logged <strong>210 net minutes</strong> (3.5 hours) of genuine problem solving. Her FER surged to <strong>87.5%</strong>. She finished 28 physics problems and had the entire evening free to exercise and relax.
        </p>
      </ExampleCard>

      <h2 id="practical-tracking-workflow">A Simple 4-Step Daily Tracking Workflow</h2>
      <p>
        Follow this 4-step routine to build honest study time measurement into your daily schedule:
      </p>

      <ChecklistCard
        title="The 4-Step Daily Tracking Routine"
        items={dailyTrackingSteps}
      />

      <TipCallout title="Log Output, Not Just Minutes">
        Beside every logged hour, record the tangible output: &quot;2 hours = 18 Chemistry PYQs + 1 summary mind map&quot;. Time without output is an unverified assumption.
      </TipCallout>

      <p className="mt-6">
        Calculate your real daily study capacity and optimize your schedule using our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-hours-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Hours &amp; Capacity Calculator
        </button>{' '}
        or run your study sessions with our distraction-free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/pomodoro-timer')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Pomodoro Study Timer
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default TrackStudyTimeArticle;
