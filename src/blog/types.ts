import React from 'react';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface AuthorInfo {
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  category: string;
  categorySlug: string;
  clusterId: string;
  publishDate: string;
  modifiedDate?: string;
  author: AuthorInfo;
  readingTimeMinutes: number;
  featured?: boolean;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  targetAudience: string;
  summary: string;
  tableOfContents: TableOfContentsItem[];
  relatedArticleSlugs: string[];
  relatedToolSlugs: string[];
}

export interface ArticleDefinition extends ArticleMeta {
  component: React.ComponentType;
}
