import { useState, useCallback } from 'react';

/**
 * Custom hook to force component re-renders
 * @returns {Function} forceUpdate - Function to trigger re-render
 */
export const useForceUpdate = () => {
  const [, setTick] = useState(0);
  
  const forceUpdate = useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  
  return forceUpdate;
};

export default useForceUpdate;