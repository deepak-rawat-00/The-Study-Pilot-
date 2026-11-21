import { describe, it, expect } from 'vitest';
import { getArticleBySlug } from '../blog/articlesRegistry';

describe('Phase 3 — Pillar Article Quality & SEO Integrity', () => {
  const article = getArticleBySlug('how-to-create-a-study-schedule');

  it('should find the pillar article by slug', () => {
    expect(article).toBeDefined();
    expect(article?.slug).toBe('how-to-create-a-study-schedule');
  });

  it('should have valid title, meta description, and primary keyword', () => {
    expect(article?.title).toBe('How to Create a Study Schedule You Can Actually Follow');
    expect(article?.primaryKeyword).toBe('how to create a study schedule');
    expect(article?.description.length).toBeGreaterThan(100);
    expect(article?.description.length).toBeLessThan(250);
  });

  it('should have all 21 table of contents items matching article sections', () => {
    const toc = article?.tableOfContents || [];
    expect(toc.length).toBe(21);

    const expectedHeadingIds = [
      'why-most-study-schedules-fail',
      'the-fallacy-of-minute-by-minute-planning',
      'calculating-real-study-hours',
      'prioritizing-subjects-and-topics',
      'breaking-down-the-syllabus',
      'balancing-multiple-subjects',
      'the-modular-block-system',
      'scheduling-revision-and-practice',
      'scheduling-purposeful-breaks',
      'the-daily-study-blueprint',
      'the-weekly-study-plan',
      'real-life-examples',
      'handling-busy-schedules',
      'the-24-hour-recovery-protocol',
      'avoiding-the-timetable-trap',
      'tracking-honest-study-hours',
      'building-unbreakable-consistency',
      'defeating-task-procrastination',
      'weekly-review-system',
      'common-mistakes-to-avoid',
      'frequently-asked-questions',
    ];

    expectedHeadingIds.forEach((id) => {
      expect(toc.some((item) => item.id === id)).toBe(true);
    });
  });

  it('should link to companion interactive tools', () => {
    expect(article?.relatedToolSlugs).toContain('study-planner-generator');
    expect(article?.relatedToolSlugs).toContain('weekly-study-planner');
    expect(article?.relatedToolSlugs).toContain('study-hours-calculator');
  });

  it('should link to related cluster articles', () => {
    expect(article?.relatedArticleSlugs.length).toBeGreaterThanOrEqual(3);
    expect(article?.relatedArticleSlugs).toContain('how-to-study-consistently');
    expect(article?.relatedArticleSlugs).toContain('how-to-plan-multiple-subjects');
  });

  it('should have valid author attribution and reading time', () => {
    expect(article?.author.name).toBeTruthy();
    expect(article?.author.role).toBeTruthy();
    expect(article?.readingTimeMinutes).toBeGreaterThanOrEqual(10);
  });
});
