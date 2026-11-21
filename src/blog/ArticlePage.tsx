import React, { Suspense } from 'react';
import { getArticleBySlug } from './articlesRegistry';
import { NotFoundPage } from '../components/pages/NotFoundPage';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingFooter } from '../components/landing/LandingFooter';

export interface ArticlePageProps {
  slug: string;
}

const ArticleSkeleton: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
    <LandingHeader />
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-16 animate-pulse space-y-6">
      <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl mt-8" />
    </div>
    <LandingFooter />
  </div>
);

export const ArticlePage: React.FC<ArticlePageProps> = ({ slug }) => {
  const article = getArticleBySlug(slug);

  if (!article) {
    return <NotFoundPage />;
  }

  const ArticleContentComponent = article.component;

  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleContentComponent />
    </Suspense>
  );
};

export default ArticlePage;
