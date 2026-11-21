import React from 'react';
import { ArticleLayout } from '../components/ArticleLayout';
import { TipCallout } from '../components/TipCallout';
import { WarningCallout } from '../components/WarningCallout';
import { ChecklistCard } from '../components/ChecklistCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { getArticleBySlug } from '../articlesRegistry';
import { useRouter } from '../../context/RouterContext';

export const StopProcrastinatingArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-stop-procrastinating-while-studying')!;

  const procrastinationTriggers = [
    {
      title: 'Ambiguity Resistance',
      desc: 'When a study task is vague (e.g. &quot;Prepare for Physics&quot;), the brain does not know where to start and defaults to instant dopamine.',
    },
    {
      title: 'Perfectionism & Fear of Failure',
      desc: 'If you believe you must master the chapter in one sitting, the emotional stakes feel overwhelming. Procrastination shields your ego from struggling.',
    },
    {
      title: 'High Activation Energy',
      desc: 'If books are packed, files disorganized, and your phone is vibrating beside your hand, the friction to begin studying is high while distraction friction is zero.',
    },
  ];

  const antiProcrastinationSteps = [
    {
      title: 'Step 1: Shrink the Target to Ridiculous Proportions',
      desc: 'Instead of &quot;Solve 50 Calculus problems&quot;, write &quot;Solve problem 1A on page 42&quot;. Action breeds motivation.',
    },
    {
      title: 'Step 2: Enforce the 5-Minute Rule',
      desc: 'Commit to sitting at your desk for just 300 seconds. If you genuinely want to stop after 5 minutes, you can. 9 times out of 10, momentum carries you forward.',
    },
    {
      title: 'Step 3: Distance the Phone Physically',
      desc: 'Placing your phone face-down on your desk does not work. Research in cognitive science confirms that a smartphone within arm’s reach siphons working memory even when powered off. Put it in another room.',
    },
  ];

  const faqItems = [
    {
      question: 'Why do I procrastinate even when an exam date is tomorrow?',
      answer: (
        <p>
          Panic-induced procrastination occurs when academic anxiety exceeds your coping mechanism. Your amygdala interprets the textbook as a psychological threat, driving you toward avoidance. Breaking the syllabus into single 15-minute question drills calms this threat response.
        </p>
      ),
    },
    {
      question: 'What is the fastest way to get into a study state?',
      answer: (
        <p>
          Use a structured focus interval like a 25-minute Pomodoro timer. Having an audible start chime and a ticking countdown removes the decision of when to pause and creates immediate artificial urgency.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        You sit down at 2:00 PM intending to study. You open your laptop, decide to check one email, notice an interesting video notification, grab a snack, clean your desk, organize your highlighter pens, and suddenly it is 4:45 PM. You haven&apos;t opened page 1, but you feel completely exhausted and weighed down by guilt.
      </p>

      <p>
        Here is the truth that conventional study advice gets wrong: <strong>procrastination is not a time management problem; it is an emotional regulation problem.</strong>
      </p>

      <h2 id="why-students-procrastinate">The Emotional Roots of Procrastination</h2>
      <p>
        You do not procrastinate because you are lazy or lack discipline. You procrastinate because your brain perceives the impending study session as a source of boredom, frustration, confusion, or fear of failure.
      </p>

      <ChecklistCard
        title="The 3 Psychological Causes of Task Paralysis"
        items={procrastinationTriggers}
      />

      <h2 id="the-five-minute-rule">The 5-Minute Activation Energy Protocol</h2>
      <p>
        In chemistry, &quot;activation energy&quot; is the minimum energy required to start a reaction. Once the reaction begins, it generates its own momentum. Studying works the exact same way.
      </p>
      <p>
        The hardest part of studying is not minute 35 or minute 50; the hardest part is the first <strong>180 seconds</strong> of opening the book and reading the first paragraph.
      </p>

      <TipCallout title="The 5-Minute Activation Hack">
        Make a deal with your brain: <em>&quot;I am not studying for 3 hours. I am only going to read for 5 minutes. If I still want to stop after 5 minutes, I am completely allowed to stop.&quot;</em> By lowering the activation threshold, you bypass the amygdala&apos;s threat response. Once you clear minute 5, cognitive inertia takes over.
      </TipCallout>

      <h2 id="practical-friction-design">Engineering Environmental Friction</h2>
      <p>
        Human behavior naturally follows the path of least resistance. If opening TikTok takes 1 second, but opening your organic chemistry binder, finding your notes, and sharpening your pencil takes 2 minutes, distraction will win every single time.
      </p>
      <p>
        You must flip the friction equation:
      </p>
      <ul>
        <li><strong>Increase Distraction Friction:</strong> Place your phone in another room or inside a drawer. Log out of social media on your browser.</li>
        <li><strong>Decrease Study Friction:</strong> Prepare your desk the evening before. Leave the textbook open to the exact page and problem set you will tackle first thing in the morning.</li>
      </ul>

      <WarningCallout title="The Smartphone Drain">
        Keeping your smartphone on your desk, even in silent mode, drains cognitive bandwidth. Subconscious energy is spent resisting the urge to check notifications. Remove it from your visual field entirely.
      </WarningCallout>

      <h2 id="step-by-step-anti-procrastination-framework">The 3-Step Anti-Procrastination Protocol</h2>
      <ChecklistCard
        title="Immediate Steps to Break Procrastination"
        items={antiProcrastinationSteps}
      />

      <p className="mt-6">
        To start a focused sprint right now with zero friction, launch our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/pomodoro-timer')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Pomodoro Study Timer
        </button>{' '}
        or generate an organized step-by-step schedule with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-planner-generator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Planner Generator
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default StopProcrastinatingArticle;
