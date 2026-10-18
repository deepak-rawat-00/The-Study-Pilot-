import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { trackPageView, getPageTitleForPath } from '../utils/analytics';

export type AppRoute =
  | '/'
  | '/app'
  | '/onboarding'
  | '/privacy'
  | '/terms'
  | '/about'
  | '/contact'
  | '/login'
  | '/signup';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => void;
  isLandingPage: boolean;
  isApp: boolean;
  goToLanding: () => void;
  goToApp: () => void;
  goToOnboarding: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPath = (): string => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    return path || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track page views on initial load and client-side route transitions without duplicate events
  useEffect(() => {
    if (lastTrackedPathRef.current === currentPath) {
      return;
    }
    lastTrackedPathRef.current = currentPath;

    const title = getPageTitleForPath(currentPath);
    if (typeof document !== 'undefined') {
      document.title = title;
    }
    trackPageView(currentPath, title);
  }, [currentPath]);

  const navigate = useCallback((path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => {
    const [pathname, hash] = path.split('#');
    const targetPath = pathname || '/';

    if (typeof window !== 'undefined') {
      if (options?.replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(targetPath);

      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else if (options?.scrollToTop !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const goToLanding = useCallback(() => navigate('/'), [navigate]);
  const goToApp = useCallback(() => navigate('/app'), [navigate]);
  const goToOnboarding = useCallback(() => navigate('/onboarding'), [navigate]);

  const isLandingPage = currentPath === '/';
  const isApp = currentPath.startsWith('/app');

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        isLandingPage,
        isApp,
        goToLanding,
        goToApp,
        goToOnboarding,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
