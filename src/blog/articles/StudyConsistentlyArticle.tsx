import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ExampleCard } from '../components/ExampleCard';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { getArticleBySlug } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const StudyConsistentlyArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-study-consistently')!;

  const consistencyRules = [
    {
      title: '1. Establish a Minimum Viable Session (The 25-Minute Floor)',
      desc: 'On days when you feel exhausted or demotivated, do not aim for 4 hours. Complete just 25 minutes of light review. Protecting the daily habit loop is 10x more valuable than a zero day.',
    },
    {
      title: '2. The Never-Twice Rule',
      desc: 'Missing one day is an accident; missing two consecutive days is the start of a new habit of skipping. When life disrupts your schedule, make returning the next day your single non-negotiable priority.',
    },
    {
      title: '3. Track Active Focus, Not Desk Hours',
      desc: 'Do not count time spent checking phone notifications as study time. Honest streak tracking builds authentic self-trust.',
    },
    {
      title: '4. Remove Environmental Friction',
      desc: 'Set up your desk, open your textbook to the exact page, and fill your water bottle the night before. Zero decision fatigue in the morning.',
    },
  ];

  const faqItems = [
    {
      question: 'Is it bad to take a day off studying each week?',
      answer: (
        <p>
          Not at all. In fact, scheduling one deliberate rest day per week (like Sunday afternoon) prevents mid-semester burnout. Consistency means following a sustainable rhythm—studying 6 days consistently for six months beats studying 7 days for two weeks followed by collapse.
        </p>
      ),
    },
    {
      question: 'How do I maintain consistency when I have zero motivation?',
      answer: (
        <p>
          Rely on <strong>activation energy reduction</strong> rather than waiting for an emotional feeling of motivation. Tell yourself you only have to study for 5 minutes. Motivation almost always arrives <em>after</em> you begin taking action, not before.
        </p>
      ),
    },
    {
      question: 'What is the best way to track study consistency?',
      answer: (
        <p>
          Use a visual calendar heatmap. Seeing a chain of qualifying study days activates psychological streak preservation, making it much harder to procrastinate.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        Most students believe academic success is driven by intense marathons: locked in a library for 14 hours during exam week, fueled by energy drinks, running on four hours of sleep. But anyone who has attempted this knows the inevitable hangover: three days of utter exhaustion, mental fog, and zero retention.
      </p>

      <p>
        The students who top examinations and master difficult subjects rarely cram. They master the unglamorous art of <strong>daily study consistency</strong>. Studying 3 hours every day for 90 days yields 270 hours of relaxed, high-retention mastery. Cramming 10 hours a day for two weeks yields 140 hours of stressed, superficial recall.
      </p>

      <h2 id="the-boom-and-bust-trap">The Boom-and-Bust Cramming Trap</h2>
      <p>
        Why do students struggle so profoundly with consistency? The culprit is the &quot;All-or-Nothing&quot; cognitive bias. You tell yourself: <em>&quot;If I cannot study for 4 hours today, there is no point in studying at all.&quot;</em>
      </p>
      <p>
        This mindset guarantees failure. Life is inherently volatile. Lectures run late, family events arise, illness strikes, and energy fluctuates. When your target is rigid perfection, any small disruption causes you to surrender the entire day.
      </p>

      <WarningCallout title="The All-or-Nothing Fallacy">
        A 30-minute study session on a chaotic day is not a failure; it is a monumental victory. It preserves your neural habit loop, keeps concepts fresh in working memory, and prevents the emotional friction of &quot;restarting&quot; tomorrow.
      </WarningCallout>

      <h2 id="the-minimum-viable-study-day">The 25-Minute Minimum Viable Session</h2>
      <p>
        The cornerstone of unbroken study streaks is setting a <strong>Daily Study Floor</strong>.
      </p>
      <p>
        Your study ceiling might be 5 hours on high-energy weekends. But your study floor should be just <strong>25 minutes</strong>. On days when you feel drained, overwhelmed, or sick:
      </p>
      <ul>
        <li>You do not attempt complex new syllabus chapters.</li>
        <li>You sit down and complete one 25-minute Pomodoro session of active review: flashcards, formula sheets, or 10 practice questions.</li>
        <li>Once the timer rings, you give yourself full permission to stop.</li>
      </ul>
      <p>
        By protecting your minimum viable session, you eliminate zero days. Over a semester, avoiding zero days is the single greatest predictor of academic mastery.
      </p>

      <h2 id="the-never-twice-rule">The &quot;Never Twice&quot; Rule</h2>
      <p>
        Missing a study day happens to every human being on the planet. Elite students do not possess superhuman willpower; they simply possess an aggressive recovery policy: <strong>never miss twice</strong>.
      </p>
      <p>
        If Tuesday was a zero day due to an emergency, Wednesday becomes sacred. You do not try to study double on Wednesday. You simply ensure that Wednesday is not zero. A single missed day is a statistical blip; two consecutive missed days is the seed of a new habit of avoidance.
      </p>

      <TipCallout title="The 24-Hour Reset">
        Never carry guilt into the next day. Cross off yesterday’s missed session without emotional drama and focus 100% of your energy on executing today&apos;s first focus block.
      </TipCallout>

      <h2 id="rules-for-unbroken-consistency">4 Core Rules for Unbroken Consistency</h2>
      <ChecklistCard
        title="The Daily Consistency Checklist"
        items={consistencyRules}
      />

      <h2 id="visual-streak-tracking">Visual Streak Tracking &amp; Habit Heatmaps</h2>
      <p>
        Human motivation responds powerfully to visual feedback. When you mark an X on a calendar or see an unbroken row of green tiles on a heatmap, your brain naturally wants to protect the streak.
      </p>
      <p>
        You can track your daily habits and streak history for free with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-habit-tracker')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Habit Tracker
        </button>{' '}
        or calculate your long-term consistency percentage with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-consistency-calculator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Consistency Calculator
        </button>
        .
      </p>

      <ExampleCard title="Consistency in Action: Rahul vs. Priya" badge="Real Student Comparison">
        <p>
          <strong>Rahul</strong> studies in bursts. He studies 8 hours on Sunday, burns out, studies 0 hours Monday through Thursday, panics Friday and studies 7 hours. Total: 15 hours. He feels exhausted and forgets 60% of what he crammed.
        </p>
        <p className="mt-2">
          <strong>Priya</strong> studies 2.5 hours every day from Monday through Saturday, taking Sunday afternoon off. Total: 15 hours. Same total time, but Priya experiences zero panic, sleeps 8 hours nightly, and scores in the top 5% because spaced repetition solidifies her long-term memory.
        </p>
      </ExampleCard>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default StudyConsistentlyArticle;
