import { describe, it, expect } from 'vitest';
import { getAllResources, getResourceBySlug, getResourcesByCategory } from '../resources/resourcesData';
import { getArticleBySlug } from '../blog/articlesRegistry';

describe('Phase 7 — Free Student Resource Library', () => {
  const expectedResourceSlugs = [
    'daily-study-planner',
    'weekly-study-timetable',
    'monthly-exam-planner',
    'subject-revision-tracker',
    'pomodoro-session-tracker',
    'study-habit-tracker',
    'exam-countdown-planner',
    'formula-sheet-template',
    'mock-test-analysis-sheet',
    'goal-setting-worksheet',
  ];

  it('should have exactly 10 high-value printable resources in catalog', () => {
    const resources = getAllResources();
    expect(resources.length).toBe(10);
  });

  it('should find every resource by slug with rich educational metadata', () => {
    expectedResourceSlugs.forEach((slug) => {
      const res = getResourceBySlug(slug);
      expect(res, `Resource ${slug} must exist`).toBeDefined();
      expect(res?.title.length).toBeGreaterThan(10);
      expect(res?.tagline.length).toBeGreaterThan(15);
      expect(res?.description.length).toBeGreaterThan(50);
      expect(res?.benefits.length).toBeGreaterThanOrEqual(3);
      expect(res?.howToUseSteps.length).toBeGreaterThanOrEqual(3);
      expect(res?.paperOrientation).toMatch(/^(portrait|landscape)$/);
      expect(res?.recommendedPaper).toMatch(/^(A4|Letter)$/);
    });
  });

  it('should verify how-to-use steps are sequentially numbered and informative', () => {
    expectedResourceSlugs.forEach((slug) => {
      const res = getResourceBySlug(slug)!;
      res.howToUseSteps.forEach((step, idx) => {
        expect(step.stepNumber).toBe(idx + 1);
        expect(step.title.length).toBeGreaterThan(5);
        expect(step.description.length).toBeGreaterThan(15);
      });
    });
  });

  it('should verify all paired article slugs resolve to valid articles in the registry', () => {
    expectedResourceSlugs.forEach((slug) => {
      const res = getResourceBySlug(slug)!;
      const pairedArticle = getArticleBySlug(res.pairedArticleSlug);
      expect(
        pairedArticle,
        `Resource ${slug} pairedArticleSlug "${res.pairedArticleSlug}" must exist in ARTICLES_REGISTRY`
      ).toBeDefined();
    });
  });

  it('should verify all paired tool slugs map to existing interactive tools', () => {
    const validToolSlugs = [
      'study-planner-generator',
      'weekly-study-planner',
      'study-hours-calculator',
      'pomodoro-timer',
      'study-habit-tracker',
      'study-consistency-calculator',
      'exam-countdown',
      'exam-preparation-progress',
    ];

    expectedResourceSlugs.forEach((slug) => {
      const res = getResourceBySlug(slug)!;
      expect(
        validToolSlugs.includes(res.pairedToolSlug),
        `Resource ${slug} pairedToolSlug "${res.pairedToolSlug}" must be in valid tools list`
      ).toBe(true);
    });
  });

  it('should filter resources accurately across categories', () => {
    const planners = getResourcesByCategory('planners');
    expect(planners.length).toBe(2);

    const trackers = getResourcesByCategory('trackers');
    expect(trackers.length).toBe(3);

    const examPrep = getResourcesByCategory('exam-prep');
    expect(examPrep.length).toBe(3);

    const worksheets = getResourcesByCategory('worksheets');
    expect(worksheets.length).toBe(2);

    const all = getResourcesByCategory('all');
    expect(all.length).toBe(10);
  });

  it('should render printable components cleanly for each resource', () => {
    expectedResourceSlugs.forEach((slug) => {
      const res = getResourceBySlug(slug)!;
      const element = res.renderPrintable();
      expect(element).toBeDefined();
    });
  });
});
