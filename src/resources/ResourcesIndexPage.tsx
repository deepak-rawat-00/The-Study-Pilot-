import React, { useState, useMemo } from 'react';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingFooter } from '../components/landing/LandingFooter';
import { SEOHead } from '../components/seo/SEOHead';
import { getAllResources, getResourcesByCategory } from './resourcesData';
import { ResourceItem } from './types';
import { PrintableSheetModal } from './components/PrintableSheetModal';
import { useRouter } from '../context/RouterContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  FileText,
  Printer,
  Search,
  CheckCircle2,
  HelpCircle,
  Compass,
} from 'lucide-react';
import { cn } from '../utils/cn';

export const ResourcesIndexPage: React.FC = () => {
  const { navigate } = useRouter();
  const allResources = useMemo(() => getAllResources(), []);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalResource, setActiveModalResource] = useState<ResourceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Resources', count: allResources.length },
    { id: 'planners', label: 'Planners & Timetables', count: getResourcesByCategory('planners').length },
    { id: 'trackers', label: 'Trackers & Heatmaps', count: getResourcesByCategory('trackers').length },
    { id: 'exam-prep', label: 'Exam Prep & Error Logs', count: getResourcesByCategory('exam-prep').length },
    { id: 'worksheets', label: 'Goal Setting & Worksheets', count: getResourcesByCategory('worksheets').length },
  ];

  const filteredResources = useMemo(() => {
    return allResources.filter((res) => {
      const matchesCategory =
        selectedCategory === 'all' || res.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.tagline.toLowerCase().includes(q) ||
        res.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allResources, selectedCategory, searchQuery]);

  const faqs = [
    {
      q: 'Are all resources in this library 100% free to print and use?',
      a: 'Yes, completely free. There are no paywalls, subscriptions, or watermarks. Every study planner, timetable, habit tracker, and error journal is designed for unrestricted personal and educational use.',
    },
    {
      q: 'What is the best way to print these templates without distortion?',
      a: 'Click "Print / Save PDF" on any template. In your browser print dialog, select "Fit to Printable Area", set Margins to "Default" or "Minimum", enable "Background Graphics" (so headers render with high contrast), and match the recommended paper orientation (Portrait or Landscape).',
    },
    {
      q: 'Why should I use physical printable sheets instead of digital study apps?',
      a: 'Cognitive research proves that writing by hand activates deeper motor-memory pathways than typing on a screen. More importantly, physical paper on your desk cannot display pop-up notifications, incoming emails, or algorithmically driven social media feeds. Physical sheets provide an oasis of distraction-free focus.',
    },
    {
      q: 'Can educators or schools print these for their classrooms?',
      a: 'Yes! Teachers, tutors, and academic counselors are warmly encouraged to print and distribute these templates to their students to teach time management and habit consistency.',
    },
  ];

  const resourceSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free Student Resource Library',
      url: 'https://thestudypilot.space/resources',
      description: 'Download and print free high-contrast study templates: daily study planners, weekly timetables, 30-day habit trackers, exam countdown roadmaps, and mock test error logs.',
      image: 'https://thestudypilot.space/og-image.svg',
      publisher: {
        '@type': 'Organization',
        name: 'The Study Pilot',
        url: 'https://thestudypilot.space',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* SEO Head & Schema */}
      <SEOHead
        title="Free Student Resource Library: Downloadable & Printable Study Planners & Trackers – The Study Pilot"
        description="Download and print free high-contrast study templates: daily study planners, weekly timetables, 30-day habit trackers, exam countdown roadmaps, and mock test error logs."
        canonicalUrl="https://thestudypilot.space/resources"
        keywords={[
          'free student printables',
          'printable study planner',
          'weekly study timetable printable',
          'study habit tracker printable',
          'exam countdown template',
          'mock test error log sheet',
          'study worksheets free',
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://thestudypilot.space/' },
          { name: 'Resource Library', url: 'https://thestudypilot.space/resources' },
        ]}
        jsonLd={resourceSchema}
      />

      <LandingHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 dark:bg-brand-950/80 dark:border-brand-800 dark:text-brand-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Free Student Printables &amp; Worksheets</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Free Student Resource Library
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            High-contrast, printer-friendly study sheets engineered to eliminate academic overwhelm, protect daily streaks, and organize high-stakes examination preparation.
          </p>

          {/* Search Input */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search daily planners, habit trackers, error logs..."
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

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8 pb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5',
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 dark:bg-brand-500'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-mono',
                  selectedCategory === cat.id
                    ? 'bg-brand-700 text-white dark:bg-brand-600'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                )}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No resources found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search query or switching categories.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="primary" size="sm">
                    {res.format}
                  </Badge>
                  <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 uppercase">
                    {res.recommendedPaper} &bull; {res.paperOrientation}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed flex-1">
                  {res.description}
                </p>

                {/* Key Benefits */}
                <div className="my-4 py-3 border-y border-slate-100 dark:border-slate-800/80 space-y-1.5">
                  {res.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Connected Tool & Guide */}
                <div className="space-y-1 mb-4 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-slate-400">Tool:</span>
                    <button
                      type="button"
                      onClick={() => navigate(`/tools/${res.pairedToolSlug}`)}
                      className="font-medium text-brand-600 dark:text-brand-400 hover:underline truncate"
                    >
                      {res.pairedToolName}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-slate-400">Guide:</span>
                    <button
                      type="button"
                      onClick={() => navigate(`/blog/${res.pairedArticleSlug}`)}
                      className="font-medium text-brand-600 dark:text-brand-400 hover:underline truncate"
                    >
                      {res.pairedArticleTitle}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveModalResource(res)}
                    leftIcon={<Printer className="w-4 h-4" />}
                    className="flex-1 font-semibold shadow-xs"
                  >
                    Print / View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Why Physical Printables Matter Educational Section */}
        <section className="mt-16 sm:mt-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Physical Printables Supercharge Study Focus
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              In an age of infinite digital pings and notification fatigue, paper remains an unparalleled cognitive superpower.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Zero Attention Residue
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A physical piece of paper cannot receive a social media notification or tab switch. It creates a sacred physical zone for single-task focus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Motor Memory Encoding
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Writing down mathematical derivations, formulas, and error logs physically recruits neural pathways that keyboard typing completely skips.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Visual Accountability
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Hanging your 30-day streak tracker or 7-day weekly blueprint on the wall directly in front of your desk activates constant subconscious self-monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16 sm:mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Everything you need to know about printing and using our student resources.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 mt-1 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Printable Sheet Modal */}
      {activeModalResource && (
        <PrintableSheetModal
          resource={activeModalResource}
          isOpen={Boolean(activeModalResource)}
          onClose={() => setActiveModalResource(null)}
        />
      )}

      <LandingFooter />
    </div>
  );
};

export default ResourcesIndexPage;
