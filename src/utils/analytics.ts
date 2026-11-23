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
    case '/blog':
      return 'Study Guides & Productivity Blog – The Study Pilot';
    case '/tools':
      return 'Free Student Productivity Tools – The Study Pilot';
    case '/resources':
      return 'Free Student Resource Library – The Study Pilot';
    // Interactive Tool Routes
    case '/tools/study-planner-generator':
      return 'Study Planner Generator – The Study Pilot';
    case '/tools/weekly-study-planner':
      return 'Weekly Study Planner – The Study Pilot';
    case '/tools/study-hours-calculator':
      return 'Study Hours Calculator – The Study Pilot';
    case '/tools/pomodoro-timer':
      return 'Pomodoro Study Timer – The Study Pilot';
    case '/tools/study-habit-tracker':
      return 'Study Habit Tracker – The Study Pilot';
    case '/tools/study-consistency-calculator':
      return 'Study Consistency Calculator – The Study Pilot';
    case '/tools/exam-countdown':
      return 'Exam Countdown Tracker – The Study Pilot';
    case '/tools/exam-preparation-progress':
      return 'Exam Preparation Progress Tracker – The Study Pilot';
    // Educational Article Routes
    case '/blog/how-to-create-a-study-schedule':
      return 'How to Create a Study Schedule You Can Actually Follow – The Study Pilot';
    case '/blog/how-to-study-consistently':
      return 'How to Study Consistently Every Day – The Study Pilot';
    case '/blog/how-to-stop-procrastinating-while-studying':
      return 'How to Stop Procrastinating While Studying – The Study Pilot';
    case '/blog/how-to-plan-multiple-subjects':
      return 'How to Plan and Balance Multiple Subjects – The Study Pilot';
    case '/blog/how-to-track-study-time':
      return 'How to Track Study Time Accurately – The Study Pilot';
    case '/blog/pomodoro-technique-vs-deep-work':
      return 'Pomodoro Technique vs Deep Work – The Study Pilot';
    case '/blog/how-to-create-a-weekly-study-plan':
      return 'How to Create a Weekly Study Plan – The Study Pilot';
    case '/blog/competitive-exam-study-plan':
      return 'Competitive Exam Study Plan Framework – The Study Pilot';
    case '/blog/how-to-study-with-limited-time':
      return 'How to Study with Limited Time – The Study Pilot';
    case '/blog/how-to-restart-studying-after-losing-motivation':
      return 'How to Restart Studying After Losing Motivation – The Study Pilot';
    case '/blog/how-to-build-a-study-habit':
      return 'How to Build a Permanent Daily Study Habit – The Study Pilot';
    default:
      if (normalizedPath.startsWith('/app/')) {
        return 'Study Workspace – The Study Pilot';
      }
      if (normalizedPath.startsWith('/blog/')) {
        return 'Study Guide – The Study Pilot';
      }
      if (normalizedPath.startsWith('/tools/')) {
        return 'Free Student Tool – The Study Pilot';
      }
      if (normalizedPath.startsWith('/resources/')) {
        return 'Free Student Resource – The Study Pilot';
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
