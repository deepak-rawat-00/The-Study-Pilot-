import React from 'react';
import { LandingHeader } from '../../components/landing/LandingHeader';
import { LandingFooter } from '../../components/landing/LandingFooter';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../blog/components/Breadcrumbs';
import { useRouter } from '../../context/RouterContext';
import { Link } from '../../components/common/Link';
import { Badge } from '../../components/common/Badge';
import { Sparkles, ArrowLeft, BookOpen, ArrowRight, Printer, Compass } from 'lucide-react';

export interface ToolLayoutProps {
  title: string;
  metaTitle?: string;
  description: string;
  canonicalUrl: string;
  badge?: string;
  relatedArticleSlug?: string;
  relatedArticleTitle?: string;
  relatedResourceSlug?: string;
  relatedResourceTitle?: string;
  keywords?: string[];
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  metaTitle,
  description,
  canonicalUrl,
  badge = 'Free Student Tool',
  relatedArticleSlug,
  relatedArticleTitle,
  relatedResourceSlug,
  relatedResourceTitle,
  keywords,
  children,
}) => {
  const { navigate } = useRouter();

  const breadcrumbs = [
    { label: 'Free Tools', href: '/tools' },
    { label: title },
  ];

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    url: canonicalUrl,
    description: description,
    image: 'https://thestudypilot.space/og-image.svg',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All modern browsers',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      <SEOHead
        title={`${metaTitle || title} – The Study Pilot`}
        description={description}
        canonicalUrl={canonicalUrl}
        keywords={keywords}
        ogType="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://thestudypilot.space/' },
          { name: 'Free Tools', url: 'https://thestudypilot.space/tools' },
          { name: title, url: canonicalUrl },
        ]}
        jsonLd={toolSchema}
      />

      <div className="print:hidden">
        <LandingHeader />
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
          <Breadcrumbs items={breadcrumbs} />

          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Interactive Tools</span>
          </Link>
        </div>

        {/* Tool Header Section */}
        <header className="mb-8 space-y-3 print:mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">
              <Sparkles className="w-3 h-3 text-brand-600 dark:text-brand-400" />
              <span>{badge}</span>
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              100% Free • Private Browser Local Storage
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {description}
          </p>

          {/* Related Guide Context Link */}
          {relatedArticleSlug && relatedArticleTitle && (
            <div className="pt-2 print:hidden">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-brand-200/80 bg-brand-50/60 px-3.5 py-2 text-xs text-brand-900 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-200">
                <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>Want the complete methodology?</span>
                <button
                  type="button"
                  onClick={() => navigate(`/blog/${relatedArticleSlug}`)}
                  className="font-bold underline underline-offset-2 hover:text-brand-700 dark:hover:text-brand-100 inline-flex items-center gap-0.5"
                >
                  <span>Read: {relatedArticleTitle}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Tool Interactive Interface */}
        <div className="w-full">
          {children}
        </div>

        {/* Related Strategy Guides, Companion Printables & Sister Tools */}
        <section className="mt-14 pt-8 border-t border-slate-200/90 dark:border-slate-800 space-y-6 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Recommended Study Resources &amp; Companion Tools</span>
            </h2>
            <Link
              to="/tools"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Explore All 8 Tools</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Guide Card */}
            {relatedArticleSlug && relatedArticleTitle && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>In-Depth Strategy Guide</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                    {relatedArticleTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Step-by-step cognitive learning principles, schedule examples, and evidence-based routines.
                  </p>
                </div>
                <Link
                  to={`/blog/${relatedArticleSlug}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Printable Resource Card */}
            {relatedResourceSlug && relatedResourceTitle && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Printable Worksheet</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                    {relatedResourceTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    High-contrast physical study sheet to execute your sessions without screen distractions.
                  </p>
                </div>
                <Link
                  to="/resources"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>Print Worksheet Free</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Free Workspace Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-50/60 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border border-brand-200/80 dark:border-brand-900/60 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Study Pilot App</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Full Study Dashboard &amp; Streaks
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Private, browser-stored focus timer with 52-week activity heatmap and daily targets.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app')}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <LandingFooter />
      </div>
    </div>
  );
};
