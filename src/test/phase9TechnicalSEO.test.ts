import { describe, it, expect } from 'vitest';
import robotsTxt from '../../public/robots.txt?raw';
import sitemapXml from '../../public/sitemap.xml?raw';
import indexHtml from '../../index.html?raw';
import { getAllArticles } from '../blog/articlesRegistry';
import { getAllResources } from '../resources/resourcesData';

describe('Phase 9 — Technical SEO & Performance Audit', () => {
  const allArticles = getAllArticles();
  const allResources = getAllResources();
  const expectedTools = [
    'study-planner-generator',
    'weekly-study-planner',
    'study-hours-calculator',
    'pomodoro-timer',
    'study-habit-tracker',
    'study-consistency-calculator',
    'exam-countdown',
    'exam-preparation-progress',
  ];

  describe('1. robots.txt Verification', () => {
    it('should allow Google AdSense crawler and Mediapartners bot', () => {
      expect(robotsTxt).toContain('User-agent: Mediapartners-Google');
      expect(robotsTxt).toContain('User-agent: AdsBot-Google');
    });

    it('should allow all public crawlable directories', () => {
      expect(robotsTxt).toContain('Allow: /');
      expect(robotsTxt).toContain('Allow: /blog');
      expect(robotsTxt).toContain('Allow: /tools');
      expect(robotsTxt).toContain('Allow: /resources');
      expect(robotsTxt).toContain('Allow: /about');
      expect(robotsTxt).toContain('Allow: /privacy');
      expect(robotsTxt).toContain('Allow: /terms');
      expect(robotsTxt).toContain('Allow: /contact');
    });

    it('should disallow private app routes and user onboarding from indexing', () => {
      expect(robotsTxt).toContain('Disallow: /app');
      expect(robotsTxt).toContain('Disallow: /app/');
      expect(robotsTxt).toContain('Disallow: /onboarding');
      expect(robotsTxt).toContain('Disallow: /onboarding/');
    });

    it('should specify the canonical sitemap location', () => {
      expect(robotsTxt).toContain('Sitemap: https://thestudypilot.space/sitemap.xml');
    });
  });

  describe('2. sitemap.xml Verification', () => {
    it('should contain the XML declaration and sitemap protocol namespace', () => {
      expect(sitemapXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemapXml).toContain('http://www.sitemaps.org/schemas/sitemap/0.9');
    });

    it('should include root and all static core pages', () => {
      const corePages = [
        'https://thestudypilot.space/',
        'https://thestudypilot.space/about',
        'https://thestudypilot.space/blog',
        'https://thestudypilot.space/tools',
        'https://thestudypilot.space/resources',
        'https://thestudypilot.space/privacy',
        'https://thestudypilot.space/terms',
        'https://thestudypilot.space/contact',
      ];

      corePages.forEach((url) => {
        expect(sitemapXml, `Sitemap must contain ${url}`).toContain(`<loc>${url}</loc>`);
      });
    });

    it('should include all registered blog articles in the sitemap', () => {
      allArticles.forEach((article) => {
        const expectedUrl = `https://thestudypilot.space/blog/${article.slug}`;
        expect(sitemapXml, `Sitemap must contain article URL: ${expectedUrl}`).toContain(
          `<loc>${expectedUrl}</loc>`
        );
      });
    });

    it('should include all 8 interactive tools in the sitemap', () => {
      expectedTools.forEach((toolSlug) => {
        const expectedUrl = `https://thestudypilot.space/tools/${toolSlug}`;
        expect(sitemapXml, `Sitemap must contain tool URL: ${expectedUrl}`).toContain(
          `<loc>${expectedUrl}</loc>`
        );
      });
    });

    it('should verify total URL count in sitemap is exactly 27 entries', () => {
      const matches = sitemapXml.match(/<loc>/g);
      expect(matches).not.toBeNull();
      expect(matches?.length).toBe(27);
    });
  });

  describe('3. Root index.html SEO, Social & Monetization Integrity', () => {
    it('should preserve Google Analytics 4 tracking snippet with correct Measurement ID', () => {
      expect(indexHtml).toContain('https://www.googletagmanager.com/gtag/js?id=G-DN0QM74VWJ');
      expect(indexHtml).toContain("gtag('config', 'G-DN0QM74VWJ'");
    });

    it('should preserve Google AdSense meta and client script with correct Publisher ID', () => {
      expect(indexHtml).toContain('ca-pub-7967739323765266');
      expect(indexHtml).toContain('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7967739323765266');
    });

    it('should contain valid primary metadata and canonical tag', () => {
      expect(indexHtml).toContain('<title>The Study Pilot – Free Study Planner &amp; Study Tracker</title>');
      expect(indexHtml).toContain('<link rel="canonical" href="https://thestudypilot.space/" />');
      expect(indexHtml).toContain('<meta name="robots" content="index, follow" />');
    });

    it('should contain Open Graph and Twitter Card tags including social share image', () => {
      expect(indexHtml).toContain('<meta property="og:type" content="website" />');
      expect(indexHtml).toContain('<meta property="og:url" content="https://thestudypilot.space/" />');
      expect(indexHtml).toContain('<meta property="og:image" content="https://thestudypilot.space/og-image.svg" />');
      expect(indexHtml).toContain('<meta property="og:image:width" content="1200" />');
      expect(indexHtml).toContain('<meta property="og:image:height" content="630" />');
      expect(indexHtml).toContain('<meta name="twitter:card" content="summary_large_image" />');
      expect(indexHtml).toContain('<meta name="twitter:image" content="https://thestudypilot.space/og-image.svg" />');
    });

    it('should include valid Schema.org WebApplication JSON-LD', () => {
      expect(indexHtml).toContain('"@type": "WebApplication"');
      expect(indexHtml).toContain('"name": "The Study Pilot"');
      expect(indexHtml).toContain('"url": "https://thestudypilot.space"');
      expect(indexHtml).toContain('"applicationCategory": "EducationalApplication"');
    });
  });

  describe('4. Content & Registry Technical SEO Consistency', () => {
    it('should verify every article has complete metadata and search keywords', () => {
      allArticles.forEach((art) => {
        expect(art.title.trim().length).toBeGreaterThan(10);
        expect(art.description.trim().length).toBeGreaterThan(30);
        expect(art.primaryKeyword.trim().length).toBeGreaterThan(3);
        expect(art.category.trim().length).toBeGreaterThan(2);
        expect(art.author.name).toBeDefined();
        expect(art.author.role).toBeDefined();
        expect(art.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(art.readingTimeMinutes).toBeGreaterThan(3);
      });
    });

    it('should verify all 10 resources have complete metadata and print specs', () => {
      allResources.forEach((res) => {
        expect(res.title.trim().length).toBeGreaterThan(5);
        expect(res.tagline.trim().length).toBeGreaterThan(10);
        expect(res.description.trim().length).toBeGreaterThan(20);
        expect(res.paperOrientation).toMatch(/^(portrait|landscape)$/);
        expect(res.benefits.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});
