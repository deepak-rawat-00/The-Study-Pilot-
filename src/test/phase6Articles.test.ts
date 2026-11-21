import { describe, it, expect } from 'vitest';
import { getAllArticles, getArticleBySlug, getArticlesByCategory } from '../blog/articlesRegistry';

describe('Phase 6 — Supporting Content Cluster (10 High-Priority SEO Articles)', () => {
  const phase6Slugs = [
    'how-to-study-consistently',
    'how-to-stop-procrastinating-while-studying',
    'how-to-plan-multiple-subjects',
    'how-to-track-study-time',
    'pomodoro-technique-vs-deep-work',
    'how-to-create-a-weekly-study-plan',
    'competitive-exam-study-plan',
    'how-to-study-with-limited-time',
    'how-to-restart-studying-after-losing-motivation',
    'how-to-build-a-study-habit',
  ];

  it('should have 11 total registered articles (1 pillar + 10 supporting)', () => {
    const all = getAllArticles();
    expect(all.length).toBe(11);
  });

  it('should find every Phase 6 article by slug with rich metadata', () => {
    phase6Slugs.forEach((slug) => {
      const art = getArticleBySlug(slug);
      expect(art, `Article ${slug} should exist in registry`).toBeDefined();
      expect(art?.title.length).toBeGreaterThan(15);
      expect(art?.metaTitle && art.metaTitle.length > 20).toBe(true);
      expect(art?.description.length).toBeGreaterThan(80);
      expect(art?.primaryKeyword).toBeTruthy();
      expect(art?.secondaryKeywords && art.secondaryKeywords.length >= 3).toBe(true);
      expect(art?.targetAudience).toBeTruthy();
      expect(art?.summary).toBeTruthy();
      expect(art?.readingTimeMinutes).toBeGreaterThanOrEqual(5);
      expect(art?.tableOfContents.length).toBeGreaterThanOrEqual(4);
      expect(art?.relatedArticleSlugs.length).toBeGreaterThanOrEqual(2);
      expect(art?.relatedToolSlugs.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should verify all Table of Contents items have valid id and title', () => {
    phase6Slugs.forEach((slug) => {
      const art = getArticleBySlug(slug)!;
      art.tableOfContents.forEach((heading) => {
        expect(heading.id).toBeTruthy();
        expect(heading.title).toBeTruthy();
        expect(heading.level).toBeGreaterThanOrEqual(2);
      });
    });
  });

  it('should verify category filtering works across categories', () => {
    const studyPlanning = getArticlesByCategory('study-planning');
    expect(studyPlanning.length).toBeGreaterThanOrEqual(3); // pillar + multi-subject + weekly + limited-time

    const consistency = getArticlesByCategory('study-consistency');
    expect(consistency.length).toBeGreaterThanOrEqual(3); // study-consistently + restart + build-habit

    const examPrep = getArticlesByCategory('exam-prep');
    expect(examPrep.length).toBeGreaterThanOrEqual(1); // competitive-exam-study-plan

    const focus = getArticlesByCategory('focus-procrastination');
    expect(focus.length).toBeGreaterThanOrEqual(1); // stop-procrastinating

    const studyMethods = getArticlesByCategory('study-methods');
    expect(studyMethods.length).toBeGreaterThanOrEqual(1); // pomodoro-vs-deep-work

    const timeTracking = getArticlesByCategory('time-tracking');
    expect(timeTracking.length).toBeGreaterThanOrEqual(1); // track-study-time
  });

  it('should verify companion interactive tool links map to valid tool slugs', () => {
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

    phase6Slugs.forEach((slug) => {
      const art = getArticleBySlug(slug)!;
      art.relatedToolSlugs.forEach((toolSlug) => {
        expect(
          validToolSlugs.includes(toolSlug),
          `Tool ${toolSlug} in article ${slug} must be a valid interactive tool`
        ).toBe(true);
      });
    });
  });

  it('should verify each Phase 6 article component is dynamically defined', () => {
    phase6Slugs.forEach((slug) => {
      const art = getArticleBySlug(slug)!;
      expect(art.component).toBeDefined();
    });
  });
});
