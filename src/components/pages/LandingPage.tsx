import React from 'react';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingHero } from '../landing/LandingHero';
import { ValuePropsSection } from '../landing/ValuePropsSection';
import { FeatureShowcase } from '../landing/FeatureShowcase';
import { HowItWorksSection } from '../landing/HowItWorksSection';
import { AnalyticsPreviewSection } from '../landing/AnalyticsPreviewSection';
import { InternationalSection } from '../landing/InternationalSection';
import { FAQSection } from '../landing/FAQSection';
import { AdBannerPlaceholder } from '../landing/AdBannerPlaceholder';
import { FinalCTASection } from '../landing/FinalCTASection';
import { LandingFooter } from '../landing/LandingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Sticky Top Header */}
      <LandingHeader />

      {/* Main Landing Page Content */}
      <main id="main-content" className="flex-1">
        <LandingHero />
        <ValuePropsSection />
        <FeatureShowcase />
        <HowItWorksSection />
        <AnalyticsPreviewSection />
        <InternationalSection />
        <FAQSection />
        <AdBannerPlaceholder slotId="landing_bottom_banner" format="horizontal" />
        <FinalCTASection />
      </main>

      {/* Polished Global Footer */}
      <LandingFooter />
    </div>
  );
};
