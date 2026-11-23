import React, { useState, useMemo } from 'react';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingFooter } from '../components/landing/LandingFooter';
import { SEOHead } from '../components/seo/SEOHead';
import { getAllArticles, getFeaturedArticle } from './articlesRegistry';
import { BLOG_CATEGORIES } from './categories';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Link } from '../components/common/Link';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Calendar,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../utils/cn';

export const BlogIndexPage: React.FC = () => {
  const allArticles = useMemo(() => getAllArticles(), []);
  const featuredArticle = useMemo(() => getFeaturedArticle(), []);

  // Category filter state (query param or state)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        art.categorySlug.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.primaryKeyword.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Study Guides & Productivity Blog – The Study Pilot',
    url: 'https://thestudypilot.space/blog',
    description: 'Evidence-based guides on creating realistic study schedules, building daily consistency, defeating procrastination, and preparing for competitive exams.',
    image: 'https://thestudypilot.space/og-image.svg',
    publisher: {
      '@type': 'Organization',
      name: 'The Study Pilot',
      url: 'https://thestudypilot.space',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Dynamic SEO Head */}
      <SEOHead
        title="Study Guides & Productivity Blog – The Study Pilot"
        description="Evidence-based guides on creating realistic study schedules, building daily consistency, defeating procrastination, and preparing for competitive exams."
        canonicalUrl="https://thestudypilot.space/blog"
        keywords={[
          'study guides',
          'study schedule guide',
          'student productivity blog',
          'study timetable methods',
          'exam preparation strategies',
          'study habits consistency',
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://thestudypilot.space/' },
          { name: 'Blog & Guides', url: 'https://thestudypilot.space/blog' },
        ]}
        jsonLd={blogCollectionSchema}
      />

      <LandingHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/80 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Evidence-Based Student Resources</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Study Guides, Timetable Frameworks &amp; Habit Science
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Practical, actionable advice to help you build realistic schedules, maintain unbroken study streaks, and conquer demanding examinations without burnout.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search study schedules, active recall, exam prep..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BLOG_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150',
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs dark:bg-brand-500'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Featured Article Hero Card (Visible if no search and viewing 'all' or matching category) */}
        {featuredArticle && !searchQuery && (selectedCategory === 'all' || selectedCategory === featuredArticle.categorySlug) && (
          <div className="mt-10 rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-50/70 via-white to-indigo-50/40 p-6 sm:p-10 dark:border-brand-900/60 dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 shadow-sm">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Featured Pillar Guide
                </span>
                <Badge variant="primary" size="sm">
                  {featuredArticle.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readingTimeMinutes} min read
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="hover:text-brand-600 dark:hover:text-brand-400 text-left transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {featuredArticle.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none active:scale-[0.98] bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 text-sm px-4 py-2 gap-2"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  By {featuredArticle.author.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>
                {selectedCategory === 'all'
                  ? 'All Study Guides & Articles'
                  : BLOG_CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Articles'}
              </span>
              <span className="text-xs font-normal text-slate-400">
                ({filteredArticles.length})
              </span>
            </h3>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                No guides found matching &quot;{searchQuery}&quot;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try searching for broader terms like &quot;schedule&quot;, &quot;habit&quot;, or &quot;focus&quot;.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.slug}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs hover:border-brand-200 dark:hover:border-brand-900/80 transition-all hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="primary" size="sm">
                        {art.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        {art.readingTimeMinutes}m read
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      <Link
                        to={`/blog/${art.slug}`}
                        className="hover:text-brand-600 dark:hover:text-brand-400 text-left transition-colors"
                      >
                        {art.title}
                      </Link>
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(art.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <Link
                      to={`/blog/${art.slug}`}
                      className="font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Free Student Tools Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-700 p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              100% Free Core Student Tools
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Looking for instant execution? Explore our free interactive study tools
            </h3>

            <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
              Generate personalized schedules, calculate your true study consistency, track exam countdowns, and run Pomodoro focus sessions directly in your browser with zero signups.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/tools/study-planner-generator"
                className="inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none active:scale-[0.98] bg-white text-brand-900 hover:bg-slate-100 text-base px-5 py-2.5 gap-2.5 shadow-sm"
              >
                <span>Launch Study Planner Generator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tools"
                className="text-xs sm:text-sm font-semibold text-brand-100 hover:text-white underline underline-offset-4"
              >
                Explore All Free Tools &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Quality Standards Guarantee */}
        <div className="mt-16 border-t border-slate-200/80 pt-10 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-brand-600 dark:text-brand-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cognitive Science Backed</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Grounding timetables in active recall, spaced repetition, and cognitive load theory.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-brand-600 dark:text-brand-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Realistic &amp; Flexible</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Designed for human energy fluctuations, college lectures, and unexpected delays.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-brand-600 dark:text-brand-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Free &amp; Private</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">No mandatory accounts, paywalls, or personal data tracking on companion tools.</p>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};

export default BlogIndexPage;
