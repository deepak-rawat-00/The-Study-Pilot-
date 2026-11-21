import React from 'react';

export type ResourceFormat = 'Printable Template' | 'Worksheet' | 'Tracking Sheet' | 'Cheat Sheet';

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  format: ResourceFormat;
  category: 'planners' | 'trackers' | 'exam-prep' | 'worksheets';
  categoryLabel: string;
  description: string;
  paperOrientation: 'portrait' | 'landscape';
  recommendedPaper: 'A4' | 'Letter';
  howToUseSteps: Array<{
    stepNumber: number;
    title: string;
    description: string;
  }>;
  benefits: string[];
  pairedToolSlug: string;
  pairedToolName: string;
  pairedArticleSlug: string;
  pairedArticleTitle: string;
  renderPrintable: () => React.ReactNode;
}
