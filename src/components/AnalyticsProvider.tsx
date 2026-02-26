import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '@/lib/analytics';

// Component to initialize GA4 and track page views
export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Initialize GA4 on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route change
  useEffect(() => {
    // Don't track admin pages in GA
    if (!location.pathname.startsWith('/admin') && location.pathname !== '/login') {
      trackPageView(location.pathname);
    }
  }, [location.pathname]);

  return <>{children}</>;
};
