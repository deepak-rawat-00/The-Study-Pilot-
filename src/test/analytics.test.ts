import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GA_MEASUREMENT_ID, getPageTitleForPath, trackPageView } from '../utils/analytics';

describe('Google Analytics 4 Integration (G-DN0QM74VWJ)', () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    // Provide a mocked window object for Node/Vitest test environment
    (globalThis as any).window = {
      location: {
        origin: 'https://thestudypilot.com',
      },
      dataLayer: [],
      gtag: vi.fn(),
    };
  });

  afterEach(() => {
    (globalThis as any).window = originalWindow;
    vi.restoreAllMocks();
  });

  it('has the correct Measurement ID configured', () => {
    expect(GA_MEASUREMENT_ID).toBe('G-DN0QM74VWJ');
  });

  it('generates correct, privacy-safe page titles for known routes', () => {
    expect(getPageTitleForPath('/')).toBe('The Study Pilot – Free Study Planner & Study Tracker');
    expect(getPageTitleForPath('/app')).toBe('Study Workspace – The Study Pilot');
    expect(getPageTitleForPath('/onboarding')).toBe('Setup Study Plan – The Study Pilot');
    expect(getPageTitleForPath('/privacy')).toBe('Privacy Policy – The Study Pilot');
    expect(getPageTitleForPath('/terms')).toBe('Terms of Service – The Study Pilot');
    expect(getPageTitleForPath('/about')).toBe('About Us – The Study Pilot');
    expect(getPageTitleForPath('/contact')).toBe('Contact Us – The Study Pilot');
    expect(getPageTitleForPath('/unknown-route')).toBe('Page Not Found – The Study Pilot');
  });

  it('sends page_view event via window.gtag with sanitized path and location', () => {
    const mockGtag = vi.fn();
    window.gtag = mockGtag;

    trackPageView('/privacy');

    expect(mockGtag).toHaveBeenCalledTimes(1);
    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
      page_title: 'Privacy Policy – The Study Pilot',
      page_path: '/privacy',
      page_location: 'https://thestudypilot.com/privacy',
      send_to: 'G-DN0QM74VWJ',
    });
  });

  it('strips query parameters and hash fragments to prevent data leakage', () => {
    const mockGtag = vi.fn();
    window.gtag = mockGtag;

    // Simulate URL with query strings or sensitive user text accidentally appended
    trackPageView('/app?subject=Biology&note=SecretFormula#section');

    expect(mockGtag).toHaveBeenCalledTimes(1);
    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
      page_title: 'Study Workspace – The Study Pilot',
      page_path: '/app',
      page_location: 'https://thestudypilot.com/app',
      send_to: 'G-DN0QM74VWJ',
    });
  });

  it('falls back to window.dataLayer if window.gtag is undefined', () => {
    delete (window as Partial<Window>).gtag;
    window.dataLayer = [];

    trackPageView('/about');

    expect(window.dataLayer.length).toBe(1);
    expect(window.dataLayer[0]).toEqual({
      event: 'page_view',
      page_title: 'About Us – The Study Pilot',
      page_path: '/about',
      page_location: 'https://thestudypilot.com/about',
      send_to: 'G-DN0QM74VWJ',
    });
  });

  it('does not throw if window is undefined or gtag/dataLayer are missing', () => {
    delete (globalThis as any).window;
    expect(() => trackPageView('/')).not.toThrow();
  });
});
