import React from 'react';
import { ArticleMeta } from '../types';
import { Link } from '../../components/common/Link';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export interface RelatedArticlesGridProps {
  articles: ArticleMeta[];
  className?: string;
}

export const RelatedArticlesGrid: React.FC<RelatedArticlesGridProps> = ({
  articles,
  className,
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={`my-12 border-t border-slate-200/80 pt-10 dark:border-slate-800 ${className || ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            <BookOpen className="w-4 h-4" />
            <span>Continue Learning</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Related Guides &amp; Frameworks
          </h3>
        </div>

        <Link
          to="/blog"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 hidden sm:inline-flex items-center gap-1"
        >
          <span>All Guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <article
            key={art.slug}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant="primary" size="sm">
                  {art.category}
                </Badge>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  {art.readingTimeMinutes}m read
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                <Link
                  to={`/blog/${art.slug}`}
                  className="hover:text-brand-600 dark:hover:text-brand-400 text-left transition-colors"
                >
                  {art.title}
                </Link>
              </h4>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                {art.author.name}
              </span>
              <Link
                to={`/blog/${art.slug}`}
                className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 inline-flex items-center gap-1"
              >
                <span>Read</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
