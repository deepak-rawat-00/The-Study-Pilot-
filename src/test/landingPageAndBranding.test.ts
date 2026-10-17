import { describe, it, expect } from 'vitest';
import { CATEGORY_PRESETS } from '../constants/categoryPresets';
import { BrandLogo } from '../components/brand/BrandLogo';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingHero } from '../components/landing/LandingHero';
import { FeatureShowcase } from '../components/landing/FeatureShowcase';
import { ValuePropsSection } from '../components/landing/ValuePropsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { FAQSection } from '../components/landing/FAQSection';
import { AnalyticsPreviewSection } from '../components/landing/AnalyticsPreviewSection';
import { InternationalSection } from '../components/landing/InternationalSection';
import { AdBannerPlaceholder } from '../components/landing/AdBannerPlaceholder';
import { LandingFooter } from '../components/landing/LandingFooter';
import { PrivacyPolicyPage } from '../components/pages/PrivacyPolicyPage';
import { TermsPage } from '../components/pages/TermsPage';
import { AboutPage } from '../components/pages/AboutPage';
import { ContactPage } from '../components/pages/ContactPage';
import { AuthPage } from '../components/pages/AuthPage';
import { NotFoundPage } from '../components/pages/NotFoundPage';
import { LandingPage } from '../components/pages/LandingPage';

describe('The Study Pilot - Brand & Landing Page Architecture', () => {
  it('verifies BrandLogo is exported and has standard function signature', () => {
    expect(BrandLogo).toBeDefined();
    expect(typeof BrandLogo).toBe('function');
  });

  it('verifies all landing page and trust page components are exported and valid', () => {
    const components = [
      LandingHeader,
      LandingHero,
      FeatureShowcase,
      ValuePropsSection,
      HowItWorksSection,
      FAQSection,
      AnalyticsPreviewSection,
      InternationalSection,
      AdBannerPlaceholder,
      LandingFooter,
      LandingPage,
      PrivacyPolicyPage,
      TermsPage,
      AboutPage,
      ContactPage,
      AuthPage,
      NotFoundPage,
    ];

    for (const comp of components) {
      expect(comp).toBeDefined();
      expect(typeof comp).toBe('function');
    }
  });

  it('verifies CATEGORY_PRESETS includes international and custom presets', () => {
    expect(CATEGORY_PRESETS.length).toBeGreaterThanOrEqual(8);

    const internationalPreset = CATEGORY_PRESETS.find((p) => p.id === 'international');
    expect(internationalPreset).toBeDefined();
    expect(internationalPreset?.title).toBe('International Examinations');
    expect(internationalPreset?.defaultSubjects.length).toBeGreaterThan(0);

    const customPreset = CATEGORY_PRESETS.find((p) => p.id === 'custom');
    expect(customPreset).toBeDefined();
    expect(customPreset?.title).toBe('Custom Study Plan');

    const collegePreset = CATEGORY_PRESETS.find((p) => p.id === 'college');
    expect(collegePreset).toBeDefined();
    expect(collegePreset?.title).toBe('College & University');
  });

  it('verifies all presets contain realistic streak thresholds and target hours', () => {
    for (const preset of CATEGORY_PRESETS) {
      expect(preset.defaultDailyTargetHours).toBeGreaterThanOrEqual(1);
      expect(preset.defaultDailyTargetHours).toBeLessThanOrEqual(16);
      expect(preset.minStreakMinutes).toBeGreaterThanOrEqual(15);
      expect(preset.minStreakMinutes).toBeLessThanOrEqual(120);
      expect(preset.defaultSubjects.length).toBeGreaterThan(0);
    }
  });
});
