import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ExampleCard } from '../components/ExampleCard';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { getArticleBySlug } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const RestartStudyingMotivationArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-restart-studying-after-losing-motivation')!;

  const rebootSteps = [
    {
      title: 'Step 1: Declare Sunk-Cost Amnesty',
      desc: 'You cannot get back last week’s lost hours. Wasting today grieving over yesterday multiplies your loss. Write off the lost days with zero moral judgment.',
    },
    {
      title: 'Step 2: Ruthlessly Slash the Backlog',
      desc: 'Do not attempt to cram 7 days of missed work into today. Pick the top 20% most critical concepts and fold them into future flex buffers. Forgive the rest.',
    },
    {
      title: 'Step 3: Execute a 15-Minute Re-Entry Session',
      desc: 'Do not aim for a 5-hour marathon. Sit down, open your book, and study for exactly 15 minutes. Once 15 minutes is complete, you have officially broken your zero streak.',
    },
    {
      title: 'Step 4: Record a Green Win on Your Tracker',
      desc: 'Mark today as active on your habit tracker. Visually seeing the streak resume restores your self-identity as a consistent student.',
    },
  ];

  const triageTiers = [
    {
      title: 'Tier 1: Non-Negotiable Foundations (Must Reschedule)',
      desc: 'Core topics that serve as prerequisites for subsequent chapters (e.g. Chemical Bonding, Newton’s Laws, Basic Accounting Principles). Reschedule these in weekend buffers.',
    },
    {
      title: 'Tier 2: High-Scoring Standalone Topics (Keep If Time Permits)',
      desc: 'Chapters with high exam weightage that do not depend on other chapters. Keep them in standard rotation.',
    },
    {
      title: 'Tier 3: Low-Weightage Niceties (Archive / Forgive)',
      desc: 'Peripheral historical notes or obscure subtopics. Cut them entirely. Protecting your mental momentum is infinitely more valuable.',
    },
  ];

  const faqItems = [
    {
      question: 'How do I overcome the guilt of wasting two weeks?',
      answer: (
        <p>
          Recognize that guilt is a passive emotion that drains the exact working memory you need to study. Top performers fail all the time—the only difference between an elite student and a struggling student is that the elite student resumes their routine in 24 hours while the struggling student spends two weeks feeling guilty.
        </p>
      ),
    },
    {
      question: 'Should I pull an all-nighter to catch up on lost material?',
      answer: (
        <p>
          Absolutely not. An all-nighter creates physical exhaustion and brain fog that impairs your studying for the next 3 to 4 days. Trying to solve a consistency problem with an extreme marathon creates the exact boom-and-bust cycle that caused the slump in the first place.
        </p>
      ),
    },
    {
      question: 'What if I sit down to restart and still feel zero motivation?',
      answer: (
        <p>
          Do not wait for an emotional feeling of motivation. <strong>Motivation is the result of action, not the cause of it.</strong> Complete just one single practice problem or review 5 flashcards. Small mechanical actions release dopamine, which sparks the motivation to continue.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        You started the semester full of optimism. You studied diligently for two weeks. Then you caught a cold, had family visiting, or faced a stressful week at work. One missed day turned into three. Three missed days became two weeks.
      </p>

      <p>
        Now, whenever you look at your textbooks or study app, you don&apos;t just feel unprepared—you feel a wave of <strong>heavy guilt, dread, and shame</strong>. Your plan feels so hopelessly derailed that opening a book seems pointless.
      </p>
      <p>
        If this is you right now, stop beating yourself up. Falling off track is not an indicator of weak character; it is a universal part of human behavior. Here is how to execute a <strong>clean mental reboot</strong> and restart your study engine today.
      </p>

      <h2 id="the-shame-spiral-trap">The Shame Spiral: Why Falling Behind Paralyses You</h2>
      <p>
        When you miss multiple study sessions, psychology explains why restarting is so difficult: the <strong>What-The-Hell Effect</strong> (first identified by researchers Janet Polivy and C. Peter Herman).
      </p>
      <p>
        Once you break your streak, your brain assumes the entire effort is ruined: <em>&quot;I already skipped 10 days, what difference does skipping day 11 make?&quot;</em>
      </p>

      <WarningCallout title="The Toxic Illusion of Ruined Plans">
        A study schedule is not a glass vase that shatters permanently when dropped. It is an elastic fitness routine. Missing 10 days of workouts does not mean your muscles vanish; it simply means today is Day 1 of getting back on track.
      </WarningCallout>

      <h2 id="the-re-entry-fallacy">The Re-Entry Fallacy: Why Timetable Rewriting Delays You</h2>
      <p>
        When students feel the guilt of falling behind, 90% resort to a subconscious avoidance strategy: <strong>rewriting the timetable from scratch</strong>.
      </p>
      <p>
        You spend 4 hours buying fresh colored markers, creating a new color-coded spreadsheet, and recalculating hours. It feels productive, but it is pure procrastination. Rewriting your plan does not put a single formula into your brain.
      </p>

      <TipCallout title="The Immediate Action Rule">
        Never spend more than 10 minutes adjusting a disrupted schedule. Close the spreadsheet, grab one book, set a timer for 15 minutes, and start immediately.
      </TipCallout>

      <h2 id="the-48-hour-reboot-protocol">The 48-Hour Reset Protocol (Step-by-Step)</h2>
      <p>
        Follow this 4-step emergency reboot framework to break task paralysis and regain momentum within 48 hours:
      </p>

      <ChecklistCard
        title="The 4-Step Emergency Study Reboot"
        items={rebootSteps}
      />

      <h2 id="triage-the-backlog">Step 1: Triage the Backlog (The Sunk Cost Cure)</h2>
      <p>
        When you fall behind by 30 hours, trying to &quot;catch up&quot; by studying 14 hours a day is suicide. You must triage your missed chapters into three strict tiers:
      </p>

      <ChecklistCard
        title="The 3 Backlog Triage Tiers"
        items={triageTiers}
      />

      <h2 id="the-15-minute-micro-session">Step 2: The 15-Minute Zero-Resistance Re-Entry</h2>
      <p>
        The objective of your restart day is not to cover vast amounts of syllabus. The objective is simply to <strong>break the spell of avoidance</strong>.
      </p>
      <p>
        Tell yourself: <em>&quot;I am going to study for exactly 15 minutes. At minute 15, I will stand up and walk away.&quot;</em> By lowering the stakes, you remove the fear of failure.
      </p>

      <ExampleCard title="The Re-Entry Shift: Arjun's Comeback" badge="Real Story">
        <p>
          Arjun stopped studying for 3 weeks following a family emergency. He owed 40 hours of engineering physics. Every day he promised himself he would study 8 hours tomorrow, and every day he froze and avoided it.
        </p>
        <p className="mt-2">
          On Thursday, Arjun decided to abandon his 40-hour backlog. He set a timer for <strong>just 15 minutes</strong> to solve two simple textbook problems. He stopped promptly at minute 15. The next day, he felt relieved and completed two 25-minute sessions. By Sunday, he was back to a consistent 3 hours daily. The micro-session broke the paralysis.
        </p>
      </ExampleCard>

      <h2 id="streak-resumption-psychology">Step 3: Resume the Chain (Consistency Over Perfection)</h2>
      <p>
        Once you complete your 15-minute re-entry session, record it immediately. Your consistency percentage will take a few weeks to climb back up, but watching the green streak tiles reappear on your dashboard provides immediate neuro-chemical validation.
      </p>

      <p className="mt-6">
        Recalculate your consistency percentage and track your recovery journey with our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-consistency-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Consistency Calculator
        </button>{' '}
        or restart your daily habit chain using our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-habit-tracker')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Habit Tracker
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default RestartStudyingMotivationArticle;
