import { describe, it, expect } from 'vitest';
import robotsTxt from '../../public/robots.txt?raw';
import sitemapXml from '../../public/sitemap.xml?raw';
import redirectsTxt from '../../public/_redirects?raw';
import indexHtml from '../../index.html?raw';
import { ROUTES, getRouteMeta } from '../entry-prerender';
import { getAllArticles } from '../blog/articlesRegistry';

describe('Indexing Optimization & Prerender Verification Suite', () => {
  const allArticles = getAllArticles();
  const allTools = [
    'study-planner-generator',
    'weekly-study-planner',
    'study-hours-calculator',
    'pomodoro-timer',
    'study-habit-tracker',
    'study-consistency-calculator',
    'exam-countdown',
    'exam-preparation-progress',
  ];

  it('verifies all 27 canonical pages are accounted for in ROUTES', () => {
    expect(ROUTES).toContain('/');
    expect(ROUTES).toContain('/about');
    expect(ROUTES).toContain('/contact');
    expect(ROUTES).toContain('/privacy');
    expect(ROUTES).toContain('/terms');
    expect(ROUTES).toContain('/blog');
    expect(ROUTES).toContain('/resources');
    expect(ROUTES).toContain('/tools');
    expect(ROUTES).toContain('/404');

    allArticles.forEach((art) => {
      expect(ROUTES).toContain(`/blog/${art.slug}`);
    });

    allTools.forEach((toolSlug) => {
      expect(ROUTES).toContain(`/tools/${toolSlug}`);
    });

    // 27 canonical pages + 1 404 page = 28 routes
    expect(ROUTES.length).toBe(28);
  });

  it('verifies unique titles, descriptions, and canonical URLs for all routes', () => {
    const titles = new Set<string>();
    const canonicals = new Set<string>();

    ROUTES.filter((r) => r !== '/404').forEach((route) => {
      const meta = getRouteMeta(route);
      expect(meta.title.length, `Title for ${route} must be valid`).toBeGreaterThan(15);
      expect(meta.description.length, `Description for ${route} must be valid`).toBeGreaterThan(30);
      expect(meta.canonicalUrl).toBe(`https://thestudypilot.space${route === '/' ? '/' : route}`);

      titles.add(meta.title);
      canonicals.add(meta.canonicalUrl);
    });

    expect(titles.size).toBe(27);
    expect(canonicals.size).toBe(27);
  });

  it('verifies 404 route specifies noindex directive', () => {
    const meta404 = getRouteMeta('/404');
    expect(meta404.noindex).toBe(true);
    expect(meta404.title).toContain('Page Not Found');
  });

  it('verifies Cloudflare Pages _redirects configuration', () => {
    expect(redirectsTxt).toContain('/*  /index.html  200');
  });

  it('verifies robots.txt references sitemap and sets proper crawl directives', () => {
    expect(robotsTxt).toContain('Sitemap: https://thestudypilot.space/sitemap.xml');
    expect(robotsTxt).toContain('User-agent: *');
    expect(robotsTxt).toContain('Allow: /');
    expect(robotsTxt).toContain('Disallow: /app');
    expect(robotsTxt).toContain('Disallow: /onboarding');
  });

  it('verifies sitemap.xml contains exactly 27 canonical URLs matching all routes', () => {
    const matches = sitemapXml.match(/<loc>/g);
    expect(matches?.length).toBe(27);

    ROUTES.filter((r) => r !== '/404').forEach((route) => {
      const expectedUrl = `https://thestudypilot.space${route === '/' ? '/' : route}`;
      expect(sitemapXml).toContain(`<loc>${expectedUrl}</loc>`);
    });
  });

  it('verifies index.html has Schema.org WebSite, Organization, and WebApplication JSON-LD', () => {
    expect(indexHtml).toContain('"@type": "WebSite"');
    expect(indexHtml).toContain('"@type": "Organization"');
    expect(indexHtml).toContain('"@type": "WebApplication"');
  });
});
