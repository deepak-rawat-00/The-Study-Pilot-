import React from 'react';
import { ArticleMeta } from '../types';
import { LandingHeader } from '../../components/landing/LandingHeader';
import { LandingFooter } from '../../components/landing/LandingFooter';
import { ReadingProgressBar } from './ReadingProgressBar';
import { Breadcrumbs } from './Breadcrumbs';
import { TableOfContents } from './TableOfContents';
import { AuthorCard } from './AuthorCard';
import { RelatedToolsCard } from './RelatedToolsCard';
import { RelatedResourcesCard } from './RelatedResourcesCard';
import { RelatedArticlesGrid } from './RelatedArticlesGrid';
import { SEOHead } from '../../components/seo/SEOHead';
import { Badge } from '../../components/common/Badge';
import { getAllArticles } from '../articlesRegistry';

export interface ArticleLayoutProps {
  meta: ArticleMeta;
  children: React.ReactNode;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ meta, children }) => {
  const canonicalUrl = `https://thestudypilot.space/blog/${meta.slug}`;

  // Find related articles
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => meta.relatedArticleSlugs.includes(a.slug) || (a.categorySlug === meta.categorySlug && a.slug !== meta.slug))
    .slice(0, 3);

  const breadcrumbs = [
    { label: 'Blog & Guides', href: '/blog' },
    { label: meta.category, href: `/blog?category=${meta.categorySlug}` },
    { label: meta.title },
  ];

  // BlogPosting Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    image: 'https://thestudypilot.space/og-image.svg',
    author: {
      '@type': 'Person',
      name: meta.author.name,
      jobTitle: meta.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Study Pilot',
      url: 'https://thestudypilot.space',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thestudypilot.space/favicon.svg',
      },
    },
    datePublished: meta.publishDate,
    dateModified: meta.modifiedDate || meta.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: meta.secondaryKeywords
      ? [meta.primaryKeyword, ...meta.secondaryKeywords].join(', ')
      : meta.primaryKeyword,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Dynamic SEO Meta Injection */}
      <SEOHead
        title={`${meta.metaTitle || meta.title} – The Study Pilot`}
        description={meta.description}
        canonicalUrl={canonicalUrl}
        keywords={meta.secondaryKeywords ? [meta.primaryKeyword, ...meta.secondaryKeywords] : [meta.primaryKeyword]}
        ogType="article"
        publishDate={meta.publishDate}
        modifiedDate={meta.modifiedDate}
        authorName={meta.author.name}
        breadcrumbs={[
          { name: 'Home', url: 'https://thestudypilot.space/' },
          { name: 'Blog', url: 'https://thestudypilot.space/blog' },
          { name: meta.category, url: `https://thestudypilot.space/blog?category=${meta.categorySlug}` },
          { name: meta.title, url: canonicalUrl },
        ]}
        jsonLd={articleSchema}
      />

      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* Site Header */}
      <LandingHeader />

      {/* Main Content Area */}
      <main id="main-article" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Article Header Header Section */}
        <header className="max-w-4xl mx-auto my-6 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">
              {meta.category}
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {meta.targetAudience}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {meta.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {meta.summary}
          </p>

          <AuthorCard
            author={meta.author}
            publishDate={meta.publishDate}
            modifiedDate={meta.modifiedDate}
            readingTimeMinutes={meta.readingTimeMinutes}
          />
        </header>

        {/* Two-Column Layout (Article Content + Sticky Desktop Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
          {/* Main Article Body (8 cols on desktop) */}
          <article className="lg:col-span-8 min-w-0">
            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-6">
              <TableOfContents items={meta.tableOfContents} />
            </div>

            {/* Render Article Prose Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl sm:prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline">
              {children}
            </div>

            {/* Mobile Related Tools & Resources callout after article */}
            <div className="lg:hidden mt-8 space-y-6">
              <RelatedToolsCard toolSlugs={meta.relatedToolSlugs} />
              <RelatedResourcesCard categorySlug={meta.categorySlug} />
            </div>
          </article>

          {/* Sticky Desktop Sidebar (4 cols on desktop) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={meta.tableOfContents} />
              <RelatedToolsCard toolSlugs={meta.relatedToolSlugs} />
              <RelatedResourcesCard categorySlug={meta.categorySlug} />
            </div>
          </aside>
        </div>

        {/* Bottom Related Articles Section */}
        <RelatedArticlesGrid articles={relatedArticles} />
      </main>

      {/* Global Footer */}
      <LandingFooter />
    </div>
  );
};
