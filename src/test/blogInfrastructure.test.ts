import { describe, it, expect } from 'vitest';
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticle,
  getRelatedArticles,
  ARTICLES_REGISTRY,
} from '../blog/articlesRegistry';
import { BLOG_CATEGORIES } from '../blog/categories';
import { getPageTitleForPath } from '../utils/analytics';

describe('Phase 2 — Blog Infrastructure & Content Registry', () => {
  it('should have valid category definitions', () => {
    expect(BLOG_CATEGORIES.length).toBeGreaterThanOrEqual(6);
    const categorySlugs = BLOG_CATEGORIES.map((c) => c.slug);
    expect(categorySlugs).toContain('all');
    expect(categorySlugs).toContain('study-planning');
    expect(categorySlugs).toContain('study-consistency');
    expect(categorySlugs).toContain('exam-prep');
    expect(categorySlugs).toContain('focus-procrastination');
    expect(categorySlugs).toContain('study-methods');
    expect(categorySlugs).toContain('time-tracking');
  });

  it('should register the master pillar article with complete metadata', () => {
    const articles = getAllArticles();
    expect(articles.length).toBeGreaterThanOrEqual(1);

    const pillar = getArticleBySlug('how-to-create-a-study-schedule');
    expect(pillar).toBeDefined();
    expect(pillar?.title).toContain('How to Create a Study Schedule');
    expect(pillar?.categorySlug).toBe('study-planning');
    expect(pillar?.readingTimeMinutes).toBeGreaterThan(5);
    expect(pillar?.primaryKeyword).toBe('how to create a study schedule');
    expect(pillar?.tableOfContents.length).toBeGreaterThanOrEqual(5);
    expect(pillar?.relatedToolSlugs).toContain('study-planner-generator');
    expect(pillar?.relatedToolSlugs).toContain('weekly-study-planner');
  });

  it('should handle slug lookups case-insensitively and normalize slashes', () => {
    const exact = getArticleBySlug('how-to-create-a-study-schedule');
    const withPrefix = getArticleBySlug('/blog/how-to-create-a-study-schedule/');
    const upper = getArticleBySlug('HOW-TO-CREATE-A-STUDY-SCHEDULE');

    expect(exact).toBeDefined();
    expect(withPrefix?.slug).toBe(exact?.slug);
    expect(upper?.slug).toBe(exact?.slug);

    const notFound = getArticleBySlug('non-existent-article-slug');
    expect(notFound).toBeUndefined();
  });

  it('should filter articles by category', () => {
    const all = getArticlesByCategory('all');
    expect(all.length).toBe(ARTICLES_REGISTRY.length);

    const planning = getArticlesByCategory('study-planning');
    expect(planning.length).toBeGreaterThanOrEqual(1);
    expect(planning.every((a) => a.categorySlug === 'study-planning')).toBe(true);

    const empty = getArticlesByCategory('non-existent-category');
    expect(empty.length).toBe(0);
  });

  it('should identify featured article', () => {
    const featured = getFeaturedArticle();
    expect(featured).toBeDefined();
    expect(featured?.featured).toBe(true);
  });

  it('should retrieve related articles without duplicating current article', () => {
    const related = getRelatedArticles('how-to-create-a-study-schedule', 3);
    expect(Array.isArray(related)).toBe(true);
    expect(related.find((a) => a.slug === 'how-to-create-a-study-schedule')).toBeUndefined();
  });

  it('should resolve dynamic titles for /blog and nested article paths in analytics', () => {
    expect(getPageTitleForPath('/blog')).toBe('Study Guides & Productivity Blog – The Study Pilot');
    expect(getPageTitleForPath('/blog/how-to-create-a-study-schedule')).toContain('The Study Pilot');
    expect(getPageTitleForPath('/blog/any-future-slug')).toContain('Study Guide');
  });
});
