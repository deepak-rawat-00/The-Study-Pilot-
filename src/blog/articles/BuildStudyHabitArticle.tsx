import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ExampleCard } from '../components/ExampleCard';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { getArticleBySlug } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const BuildStudyHabitArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-build-a-study-habit')!;

  const habitStackingExamples = [
    {
      title: 'Coffee Stack',
      desc: '&quot;After I pour my first morning cup of coffee, I will sit at my desk and open my flashcard deck for 10 minutes.&quot;',
    },
    {
      title: 'Class Dismissal Stack',
      desc: '&quot;After the final lecture ends, I will walk straight to the university library and complete 30 minutes of lecture review before heading home.&quot;',
    },
    {
      title: 'Dinner Conclusion Stack',
      desc: '&quot;After I clear the dinner table, I will put my smartphone into the charging dock across the room and open my practice workbook.&quot;',
    },
  ];

  const frictionRules = [
    {
      title: '1. The 20-Second Rule for Distractions',
      desc: 'Increase the friction to access your phone by at least 20 seconds: turn it off, place it inside a zippered bag, and put that bag in another room.',
    },
    {
      title: '2. The Zero-Friction Study Setup',
      desc: 'Before going to sleep, open your notebook to the exact page, lay out your pen and calculator, and place a filled water bottle on your desk. When you wake up, beginning requires zero cognitive resistance.',
    },
    {
      title: '3. Single-Purpose Study Sanctum',
      desc: 'Never study in bed or on the couch where your brain expects sleep or entertainment. Dedicate one specific chair and desk exclusively for focused work.',
    },
  ];

  const faqItems = [
    {
      question: 'How many days does it take to form a study habit?',
      answer: (
        <p>
          Research by Dr. Phillippa Lally at University College London found that it takes an average of <strong>66 days</strong> for a new behavior to become automatic, ranging from 18 to 254 days depending on complexity. The key is not flawless perfection, but consistency—missing a single day does not reset the process, provided you return the following day.
        </p>
      ),
    },
    {
      question: 'Why do I always abandon my study habit after 2 or 3 weeks?',
      answer: (
        <p>
          Most students abandon habits because they set their initial baseline too high (e.g. attempting 4 hours a day immediately). When motivation inevitably wanes after two weeks, the high baseline feels impossible. Set your baseline to just 25 minutes; once 25 minutes is an automatic reflex, slowly scale upward.
        </p>
      ),
    },
    {
      question: 'What is an effective immediate reward for studying?',
      answer: (
        <p>
          Choose a healthy reward that provides immediate closure: a fresh cup of specialty tea, a 15-minute walk outside, or listening to an episode of your favorite podcast. The brain relies on immediate dopamine signals to cement the preceding routine.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        Every year, millions of students rely on sheer willpower to study. They wake up and ask themselves: <em>&quot;Do I feel like studying right now?&quot;</em>
      </p>

      <p>
        The answer to that question is almost always &quot;no&quot;. Willpower is a finite biological resource that depletes rapidly as your day progresses. If studying depends on feeling inspired, your study routine will always be erratic, stressful, and fragile.
      </p>
      <p>
        Elite students do not possess greater motivation than you. They possess <strong>automatic study habits</strong>. When studying becomes an ingrained behavioral reflex—like brushing your teeth before bed—you sit down and work without debate, hesitation, or emotional friction.
      </p>

      <h2 id="the-habit-loop-anatomy">The Anatomy of a Study Habit: Cue, Routine, Reward</h2>
      <p>
        In behavioral psychology, every habit follows a three-part neural loop (popularized by Charles Duhigg and James Clear):
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300">
        <li><strong>The Cue (Trigger):</strong> An environmental or temporal signal that tells your brain to go into automatic pilot mode.</li>
        <li><strong>The Routine (Behavior):</strong> The actual action performed (e.g., opening your notes and solving practice questions).</li>
        <li><strong>The Reward (Payoff):</strong> The neurological satisfaction that tells your brain: <em>&quot;This loop was worth remembering for the future.&quot;</em></li>
      </ol>

      <WarningCallout title="The Missing Cue Trap">
        Telling yourself &quot;I will study sometime this afternoon&quot; fails because there is no explicit cue. An effective cue is precise: &quot;At 4:00 PM, immediately after pouring my afternoon tea...&quot;
      </WarningCallout>

      <h2 id="habit-stacking-for-students">Habit Stacking: Anchor Study to Existing Daily Rituals</h2>
      <p>
        The fastest way to install a new study habit is to &quot;stack&quot; it directly onto an established, automatic daily routine using the formula:
      </p>
      <div className="my-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
        <span className="font-mono text-base sm:text-lg font-bold text-brand-600 dark:text-brand-400">
          After [CURRENT HABIT], I will [STUDY BEHAVIOR FOR 15 MINUTES].
        </span>
      </div>

      <ChecklistCard
        title="High-Impact Study Habit Stacks"
        items={habitStackingExamples}
      />

      <h2 id="friction-design-principles">Friction Architecture: Make Study Easy and Distraction Hard</h2>
      <p>
        Human beings are biological efficiency-seekers. You will naturally gravitate toward whichever behavior requires the fewest physical steps.
      </p>

      <ChecklistCard
        title="The 3 Principles of Study Friction Architecture"
        items={frictionRules}
      />

      <h2 id="the-two-minute-rule">The 2-Minute Gateway Habit Rule</h2>
      <p>
        When establishing a new habit, scale it down until it takes <strong>less than two minutes</strong> to start.
      </p>
      <ul>
        <li>&quot;Study organic chemistry for 3 hours&quot; becomes <em>&quot;Open the chemistry binder and read one reaction formula.&quot;</em></li>
        <li>&quot;Solve 40 calculus problems&quot; becomes <em>&quot;Write down the equation for Problem #1.&quot;</em></li>
      </ul>
      <p>
        A habit must be established before it can be improved. You cannot optimize a study session that never begins.
      </p>

      <TipCallout title="Master the Art of Showing Up">
        Even if you only study for 10 minutes on a hectic day, showing up reinforces your neurological habit loop. It is 100 times easier to expand an existing 10-minute habit than to restart a dead one.
      </TipCallout>

      <h2 id="identity-based-studying">Identity-Based Study Habits: Stop Trying to Study, Become a Student</h2>
      <p>
        True behavioral change is identity change. Most students say: <em>&quot;I am trying to study for this exam.&quot;</em>
      </p>
      <p>
        A top performer says: <em>&quot;I am someone who never misses a daily focus block.&quot;</em>
      </p>
      <p>
        Every time you sit at your desk and complete a 25-minute Pomodoro, you cast a vote for your new identity. One vote does not change who you are, but 60 consecutive daily votes transform your self-belief permanently.
      </p>

      <h2 id="visual-feedback-and-streaks">Visual Habit Tracking &amp; The Power of Streaks</h2>
      <p>
        Jerry Seinfeld famously advised young comedians to hang a yearly calendar on their wall and draw a big red X over every day they wrote material. The only rule was: <strong>&quot;Don&apos;t break the chain.&quot;</strong>
      </p>
      <p>
        Visual feedback satisfies our biological need for immediate progress. When you see your habit streak growing day by day on a heatmap, skipping a session becomes psychologically painful.
      </p>

      <ExampleCard title="The Habit Loop Transformation: Maya's Story" badge="Case Study">
        <p>
          Maya struggled with erratic study habits. She would study 6 hours on Saturday, then nothing for 5 days. She felt constantly stressed and unprepared.
        </p>
        <p className="mt-2">
          She anchored a new 30-minute study habit to her post-dinner herbal tea. She tracked it daily on a digital habit tracker. After 40 days, the habit was so automatic that sitting down required zero effort. She expanded it to 90 minutes effortlessly and finished the semester with a 3.9 GPA.
        </p>
      </ExampleCard>

      <p className="mt-6">
        Build and protect your daily study habits with our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-habit-tracker')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Habit Tracker
        </button>{' '}
        or calculate your long-term streak strength with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-consistency-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Consistency Calculator
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default BuildStudyHabitArticle;
