import { describe, it, expect } from 'vitest';
import { getAllArticles, getArticleBySlug } from '../blog/articlesRegistry';
import { getAllResources, getResourceBySlug } from '../resources/resourcesData';

describe('Phase 8 — Internal Linking & Topical Authority Network', () => {
  const allArticles = getAllArticles();
  const allResources = getAllResources();
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

  it('should verify every article links to at least 2 valid tools', () => {
    allArticles.forEach((article) => {
      expect(
        article.relatedToolSlugs.length,
        `Article ${article.slug} should link to at least 2 tools`
      ).toBeGreaterThanOrEqual(2);

      article.relatedToolSlugs.forEach((toolSlug) => {
        expect(
          validToolSlugs.includes(toolSlug),
          `Tool slug "${toolSlug}" in article "${article.slug}" must be valid`
        ).toBe(true);
      });
    });
  });

  it('should verify every article links to at least 2 related articles that exist in the registry', () => {
    allArticles.forEach((article) => {
      expect(
        article.relatedArticleSlugs.length,
        `Article ${article.slug} should link to at least 2 other articles`
      ).toBeGreaterThanOrEqual(2);

      article.relatedArticleSlugs.forEach((relatedSlug) => {
        const found = getArticleBySlug(relatedSlug);
        expect(
          found,
          `Related article slug "${relatedSlug}" referenced in "${article.slug}" must exist`
        ).toBeDefined();
      });
    });
  });

  it('should verify every printable resource links to a valid tool and valid article', () => {
    allResources.forEach((res) => {
      expect(
        validToolSlugs.includes(res.pairedToolSlug),
        `Resource "${res.slug}" must pair with a valid tool, found "${res.pairedToolSlug}"`
      ).toBe(true);

      const foundArticle = getArticleBySlug(res.pairedArticleSlug);
      expect(
        foundArticle,
        `Resource "${res.slug}" must pair with an existing article, found "${res.pairedArticleSlug}"`
      ).toBeDefined();
    });
  });

  it('should verify bidirectional connectivity: tools can find their companion resources and guides', () => {
    const toolToResourceMap: Record<string, { articleSlug: string; resourceSlug: string }> = {
      'study-planner-generator': {
        articleSlug: 'how-to-create-a-study-schedule',
        resourceSlug: 'daily-study-planner',
      },
      'weekly-study-planner': {
        articleSlug: 'how-to-create-a-weekly-study-plan',
        resourceSlug: 'weekly-study-timetable',
      },
      'study-hours-calculator': {
        articleSlug: 'how-to-track-study-time',
        resourceSlug: 'pomodoro-session-tracker',
      },
      'pomodoro-timer': {
        articleSlug: 'pomodoro-technique-vs-deep-work',
        resourceSlug: 'pomodoro-session-tracker',
      },
      'study-habit-tracker': {
        articleSlug: 'how-to-build-a-study-habit',
        resourceSlug: 'study-habit-tracker',
      },
      'study-consistency-calculator': {
        articleSlug: 'how-to-study-consistently',
        resourceSlug: 'goal-setting-worksheet',
      },
      'exam-countdown': {
        articleSlug: 'competitive-exam-study-plan',
        resourceSlug: 'exam-countdown-planner',
      },
      'exam-preparation-progress': {
        articleSlug: 'competitive-exam-study-plan',
        resourceSlug: 'mock-test-analysis-sheet',
      },
    };

    Object.entries(toolToResourceMap).forEach(([toolSlug, mapping]) => {
      const art = getArticleBySlug(mapping.articleSlug);
      expect(art, `Article ${mapping.articleSlug} for tool ${toolSlug} must exist`).toBeDefined();

      const res = getResourceBySlug(mapping.resourceSlug);
      expect(res, `Resource ${mapping.resourceSlug} for tool ${toolSlug} must exist`).toBeDefined();
    });
  });

  it('should verify the Pillar Article forms the central topological hub', () => {
    const pillar = getArticleBySlug('how-to-create-a-study-schedule')!;
    expect(pillar).toBeDefined();
    expect(pillar.relatedArticleSlugs.length).toBeGreaterThanOrEqual(3);
    expect(pillar.relatedToolSlugs.length).toBeGreaterThanOrEqual(3);

    // Other articles should backlink to the pillar
    const backlinkCount = allArticles.filter((a) =>
      a.relatedArticleSlugs.includes('how-to-create-a-study-schedule')
    ).length;
    expect(backlinkCount).toBeGreaterThanOrEqual(8);
  });
});
