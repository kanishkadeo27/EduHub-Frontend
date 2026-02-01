import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

/**
 * Hook to sync progress when navigating away from classroom
 */
export const useRouteProgressSync = () => {
  const location = useLocation();
  const { syncProgressToServer } = useProgress();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousPathRef.current;

    // If navigating away from classroom, sync progress
    if (previousPath.includes('/classroom/') && !currentPath.includes('/classroom/')) {
      console.log('📍 Navigating away from classroom, syncing progress...');
      syncProgressToServer().catch(error => {
        console.error('Failed to sync progress on route change:', error);
      });
    }

    previousPathRef.current = currentPath;
  }, [location.pathname, syncProgressToServer]);
};

export default useRouteProgressSync;