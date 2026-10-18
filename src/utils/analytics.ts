/**
 * Google Analytics 4 (gtag.js) Integration
 * Measurement ID: G-DN0QM74VWJ
 *
 * Privacy-First Guarantee:
 * - Strictly zero personally identifiable information (PII)
 * - Zero user notes, subject names, or custom study data are sent to Analytics
 * - Only standard client-side page views (clean page_path, page_title, page_location)
 */

export const GA_MEASUREMENT_ID = 'G-DN0QM74VWJ';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Returns a human-friendly, privacy-safe title for any supported route.
 */
export function getPageTitleForPath(path: string): string {
  const normalizedPath = (path.split('?')[0].split('#')[0]).trim() || '/';

  switch (normalizedPath) {
    case '/':
      return 'The Study Pilot – Free Study Planner & Study Tracker';
    case '/app':
    case '/login':
    case '/signup':
      return 'Study Workspace – The Study Pilot';
    case '/onboarding':
      return 'Setup Study Plan – The Study Pilot';
    case '/privacy':
      return 'Privacy Policy – The Study Pilot';
    case '/terms':
      return 'Terms of Service – The Study Pilot';
    case '/about':
      return 'About Us – The Study Pilot';
    case '/contact':
      return 'Contact Us – The Study Pilot';
    default:
      if (normalizedPath.startsWith('/app/')) {
        return 'Study Workspace – The Study Pilot';
      }
      return 'Page Not Found – The Study Pilot';
  }
}

/**
 * Sends a manual page_view event to Google Analytics 4.
 *
 * Automatic page_view is disabled via `{ send_page_view: false }` in index.html
 * to ensure single-page application transitions are tracked cleanly without duplicates.
 */
export function trackPageView(rawPath: string, customTitle?: string): void {
  if (typeof window === 'undefined') return;

  // Sanitize path: strip query parameters and hash fragments to prevent data leakage
  const cleanPath = (rawPath.split('?')[0].split('#')[0]).trim() || '/';
  const title = customTitle || getPageTitleForPath(cleanPath);
  const cleanLocation = `${window.location.origin}${cleanPath}`;

  // Call gtag if available on window
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: cleanLocation,
      page_path: cleanPath,
      send_to: GA_MEASUREMENT_ID,
    });
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'page_view',
      page_title: title,
      page_location: cleanLocation,
      page_path: cleanPath,
      send_to: GA_MEASUREMENT_ID,
    });
  }
}
