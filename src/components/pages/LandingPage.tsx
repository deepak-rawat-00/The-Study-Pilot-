import React from 'react';
import { SEOHead } from '../seo/SEOHead';
import { LandingHeader } from '../landing/LandingHeader';
import { LandingHero } from '../landing/LandingHero';
import { ValuePropsSection } from '../landing/ValuePropsSection';
import { FeatureShowcase } from '../landing/FeatureShowcase';
import { EcosystemShowcaseSection } from '../landing/EcosystemShowcaseSection';
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
      {/* Dynamic SEO Head Reset for Root Route */}
      <SEOHead
        title="The Study Pilot – Free Study Planner & Study Tracker"
        description="Plan study sessions, track study hours, build consistent study habits, and count down to exams with The Study Pilot's free study planner and progress tracker."
        canonicalUrl="https://thestudypilot.space/"
        keywords={[
          'free study planner',
          'study tracker',
          'study time tracker',
          'study streak tracker',
          'study consistency tracker',
          'exam countdown timer',
          'student productivity tools',
          'daily study planner',
        ]}
      />

      {/* Sticky Top Header */}
      <LandingHeader />

      {/* Main Landing Page Content */}
      <main id="main-content" className="flex-1">
        <LandingHero />
        <ValuePropsSection />
        <FeatureShowcase />
        <EcosystemShowcaseSection />
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
