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

export const PlanMultipleSubjectsArticle: React.FC = () => {
  const { navigate } = useRouter();
  const meta = getArticleBySlug('how-to-plan-multiple-subjects')!;

  const comparisonColumns = [
    { key: 'attribute', header: 'Attribute', width: 'w-1/4' },
    { key: 'blocked', header: 'Blocked Single-Subject Study', width: 'w-3/8' },
    { key: 'interleaved', header: 'Interleaved Multi-Subject Study', width: 'w-3/8' },
  ];

  const comparisonRows = [
    {
      attribute: 'Daily Variety',
      blocked: '1 subject for 4–6 hours',
      interleaved: '2–3 complementary subjects in 60–90 min blocks',
    },
    {
      attribute: 'Mental Fatigue',
      blocked: 'High after 2 hours on same topic',
      interleaved: 'Low: brain resets when switching cognitive modes',
    },
    {
      attribute: 'Forgetting Rate',
      blocked: 'Severe decay over the 6 non-study days',
      interleaved: 'Low: subjects revisited every 48–72 hours',
    },
    {
      attribute: 'Problem Discrimination',
      blocked: 'Predictable: identical problem types',
      interleaved: 'High: trains brain to recognize varied patterns',
    },
    {
      attribute: 'Ideal For',
      blocked: 'Emergency 24-hr cramming (superficial)',
      interleaved: 'Long-term exam prep, college semesters, deep mastery',
    },
  ];

  const subjectClassification = [
    {
      title: 'Heavy Analytical Subjects (High Mental Load)',
      desc: 'Mathematics, Physics, Coding, Quantitative Aptitude, Logic, and Organic Chemistry. These require active problem solving, rapid working memory, and intense concentration. Best tackled during peak morning alertness.',
    },
    {
      title: 'Descriptive & Conceptual Subjects (Moderate Mental Load)',
      desc: 'Economics, Biology, Political Science, Psychology, and History. These require narrative comprehension, conceptual linkages, and mind-mapping.',
    },
    {
      title: 'Rote & Review Subjects (Lower Creative Load)',
      desc: 'Vocabulary, Grammar rules, Formula sheet review, Flashcard decks, and previous year MCQ drilling. Excellent for afternoon dips or post-dinner study blocks.',
    },
  ];

  const rotationRules = [
    {
      title: '1. Never Pair Two Heavy Analytical Subjects in One Day',
      desc: 'Studying Advanced Calculus followed immediately by Physics Problem Sets leads to severe mental friction and cognitive exhaustion within 90 minutes.',
    },
    {
      title: '2. Pair Analytical with Descriptive',
      desc: 'Follow a demanding Math problem set with a narrative subject like History or Biology. This allows the neural networks responsible for analytical computation to rest while conceptual memory networks activate.',
    },
    {
      title: '3. Cap Daily Active Subjects at 2 or 3',
      desc: 'Attempting to study 6 different subjects in a single day wastes 30% of your cognitive energy on context switching. 2 or 3 subjects allow deep immersion without boredom.',
    },
    {
      title: '4. Dedicated Weekly Review Day',
      desc: 'Every subject must receive at least 30 minutes of retrieval practice every 7 days to halt the Ebbinghaus forgetting curve.',
    },
  ];

  const faqItems = [
    {
      question: 'Should I study one subject all day or rotate between multiple subjects?',
      answer: (
        <p>
          Cognitive science demonstrates that <strong>interleaving</strong> (rotating between 2 or 3 subjects in distinct blocks) produces significantly higher long-term retention than &quot;blocked practice&quot; (studying one subject for 12 hours straight). Blocked practice creates the illusion of mastery, but interleaving forces your brain to continually discriminate between concepts.
        </p>
      ),
    },
    {
      question: 'What if I have an exam in 3 days and 4 subjects to revise?',
      answer: (
        <p>
          Prioritize based on mark weightage and current mastery gaps. Allocate 60% of your daily hours to your weakest high-yield subject, 30% to your second priority, and 10% to rapid flashcard review of the remaining two subjects to keep them active in memory.
        </p>
      ),
    },
    {
      question: 'How do I prevent avoiding my most hated subject?',
      answer: (
        <p>
          Use the <strong>Eat the Frog</strong> rule: place your most difficult subject in your first focus block of the day, limited strictly to 45 minutes. Knowing that you only have to endure 45 minutes makes starting bearable, and finishing it provides a massive psychological momentum boost for the rest of your day.
        </p>
      ),
    },
  ];

  return (
    <ArticleLayout meta={meta}>
      <p className="lead text-lg text-slate-700 dark:text-slate-300">
        When you are managing four, five, or six subjects simultaneously, standard timetable advice falls apart. If you try to study all six subjects every day, you spend your entire evening switching books and making zero real progress. If you study only one subject per week, by the time you cycle back, you have forgotten everything you covered three weeks prior.
      </p>

      <p>
        Balancing multiple subjects requires an intelligent <strong>interleaved rotation system</strong> based on cognitive load, active recall intervals, and energy-matched scheduling.
      </p>

      <h2 id="the-multisubject-dilemma">The Multi-Subject Dilemma: Why Cramming One Subject Fails</h2>
      <p>
        Many students default to &quot;blocked studying&quot;: spending all of Monday on Chemistry, all of Tuesday on Calculus, and all of Wednesday on English Literature.
      </p>
      <p>
        While this feels organized, it triggers rapid <strong>memory decay</strong>. Because Chemistry is ignored from Tuesday through the following Sunday, the Ebbinghaus forgetting curve wipes out up to 70% of newly encoded neural connections before you review it again.
      </p>

      <WarningCallout title="The Illusion of Blocked Mastery">
        Studying one subject for 8 hours creates fluency during the session, but rapid forgetting afterwards. Rotating subjects with deliberate rest intervals forces your brain to reload information from long-term memory, reinforcing retention pathways.
      </WarningCallout>

      <h2 id="cognitive-weight-classification">Classify Subjects by Cognitive Load: Analytical vs. Descriptive</h2>
      <p>
        Before building a schedule, categorize every subject in your curriculum into one of three cognitive tiers:
      </p>

      <ChecklistCard
        title="The 3 Cognitive Weight Tiers"
        items={subjectClassification}
      />

      <h2 id="the-rule-of-three">The Rule of 2 to 3: Daily Subject Limits</h2>
      <p>
        The golden rule of sustainable multi-subject planning is: <strong>no fewer than 2 subjects, and no more than 3 subjects per study day</strong>.
      </p>
      <ul>
        <li><strong>1 Subject per day:</strong> High risk of mental fatigue, diminishing returns after hour 3, and rapid decay of other subjects.</li>
        <li><strong>2–3 Subjects per day:</strong> Optimal. Provides variety, refreshes mental stamina, prevents cognitive friction, and keeps all curriculum tracks advancing.</li>
        <li><strong>4+ Subjects per day:</strong> Severe context-switching penalty. You spend more time organizing notes, setting up textbooks, and adjusting your mindset than actually engaging in deep work.</li>
      </ul>

      <TipCallout title="The Complementary Pairing Principle">
        Always pair one Heavy Analytical subject with one Descriptive or Practice-based subject in the same day. For example: Calculus (Morning, 90 mins) + Economics (Evening, 60 mins).
      </TipCallout>

      <h2 id="interleaving-benefits">The Power of Interleaving (Why Mixing Subjects Boosts Recall)</h2>
      <p>
        Educational researchers Robert Bjork and Nate Kornell proved that <strong>interleaved practice</strong>—mixing related but distinct skills or topics—enhances learning retention by up to 43% compared to massed study blocks.
      </p>

      <ComparisonTable
        caption="Interleaved Multi-Subject Study vs. Blocked Single-Subject Study"
        columns={comparisonColumns}
        rows={comparisonRows}
      />

      <h2 id="sample-weekly-rotation-schedule">Sample 4-Subject Weekly Rotation Schedule</h2>
      <p>
        Here is a proven weekly template for a student juggling four demanding subjects: <em>Math</em> (Analytical), <em>Physics</em> (Analytical), <em>Chemistry</em> (Hybrid), and <em>English</em> (Descriptive):
      </p>

      <ExampleCard title="4-Subject Balanced Weekly Rotation (3 Hours Daily)" badge="Proven Template">
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p><strong>Monday:</strong> Math (90 min: Problem sets) + Chemistry (60 min: Organic reaction mechanisms) + 30 min buffer review</p>
          <p><strong>Tuesday:</strong> Physics (90 min: Mechanics derivations) + English (60 min: Essay analysis) + 30 min flashcards</p>
          <p><strong>Wednesday:</strong> Math (90 min: Integration) + Chemistry (60 min: Physical chemistry formulas) + 30 min buffer review</p>
          <p><strong>Thursday:</strong> Physics (90 min: Electricity &amp; Magnetism) + English (60 min: Literature synthesis) + 30 min flashcards</p>
          <p><strong>Friday:</strong> Math (60 min: Difficult PYQs) + Physics (60 min: PYQ practice) + Chemistry (60 min: Flashcard recall)</p>
          <p><strong>Saturday:</strong> Comprehensive Mock / Practice Test across all 4 subjects (2.5 hours) + Error Log Analysis (1 hour)</p>
          <p><strong>Sunday:</strong> Rest afternoon + 45-minute Weekly Planning &amp; Schedule Reset</p>
        </div>
      </ExampleCard>

      <h2 id="preventing-subject-neglect">The &quot;Neglected Subject&quot; Triage System</h2>
      <p>
        Every student has one subject they despise or fear. Left unchecked, that subject gets postponed until it triggers a crisis two weeks before exams.
      </p>
      <ChecklistCard
        title="Rules to Protect Your Weakest Subject"
        items={rotationRules}
      />

      <p className="mt-6">
        Generate your customized, multi-subject daily and weekly timetable in seconds using our free{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/study-planner-generator')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Study Planner Generator
        </button>{' '}
        or organize your complete weekly time-blocks with our{' '}
        <button
          type="button"
          onClick={() => navigate('/tools/weekly-study-planner')}
          className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2"
        >
          Weekly Study Planner Tool
        </button>
        .
      </p>

      <div id="frequently-asked-questions">
        <FAQAccordion items={faqItems} />
      </div>
    </ArticleLayout>
  );
};

export default PlanMultipleSubjectsArticle;
