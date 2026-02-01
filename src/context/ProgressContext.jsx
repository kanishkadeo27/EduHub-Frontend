import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { courseService } from '../api';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    return {
      courseProgress: {},
      markVideoCompleted: () => {},
      markVideoIncomplete: () => {},
      isVideoCompleted: () => false,
      getCourseProgress: () => 0,
      getCompletedVideoCount: () => 0,
      syncingProgress: false,
      syncProgressToServer: () => Promise.resolve()
    };
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Initialize progress from localStorage
  const [courseProgress, setCourseProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('courseProgress');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
      return {};
    }
  });

  const [syncingProgress, setSyncingProgress] = useState(false);
  const syncingRef = useRef(false);
  const courseProgressRef = useRef(courseProgress);

  // Update ref when progress changes
  useEffect(() => {
    courseProgressRef.current = courseProgress;
  }, [courseProgress]);

  // Save to localStorage when progress changes
  useEffect(() => {
    try {
      localStorage.setItem('courseProgress', JSON.stringify(courseProgress));
      localStorage.setItem('courseProgressLastUpdate', Date.now().toString());
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }, [courseProgress]);

  // Sync progress to server
  const syncProgressToServer = useCallback(async () => {
    if (syncingRef.current) return;
    
    syncingRef.current = true;
    setSyncingProgress(true);
    
    try {
      const coursesToSync = [];
      const currentProgress = courseProgressRef.current;
      
      Object.keys(currentProgress).forEach(courseId => {
        const courseData = currentProgress[courseId] || {};
        const completedVideos = Object.values(courseData).filter(Boolean).length;
        const totalVideos = parseInt(localStorage.getItem(`course_${courseId}_total_videos`)) || 0;
        
        if (totalVideos > 0) {
          const progressPercentage = Math.round((completedVideos / totalVideos) * 100);
          coursesToSync.push({
            courseId: parseInt(courseId),
            progress: progressPercentage
          });
        }
      });

      if (coursesToSync.length > 0) {
        console.log(`🔄 Syncing progress for ${coursesToSync.length} courses`);
        await courseService.updateMultipleCourseProgress(coursesToSync);
        console.log('✅ Progress sync successful');
        localStorage.setItem('courseProgressLastSync', Date.now().toString());
      }
    } catch (error) {
      console.error('❌ Failed to sync progress:', error);
    } finally {
      setSyncingProgress(false);
      syncingRef.current = false;
    }
  }, []);

  // Update single course progress
  const updateCourseProgress = useCallback(async (courseId, totalVideos) => {
    if (syncingRef.current) return;
    
    syncingRef.current = true;
    setSyncingProgress(true);
    
    try {
      const courseData = courseProgressRef.current[courseId] || {};
      const completedVideos = Object.values(courseData).filter(Boolean).length;
      const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
      
      localStorage.setItem(`course_${courseId}_total_videos`, totalVideos.toString());
      
      console.log(`🔄 Syncing course ${courseId}: ${progressPercentage}%`);
      await courseService.updateCourseProgress(courseId, progressPercentage);
      console.log('✅ Course progress sync successful');
      
      localStorage.setItem('courseProgressLastSync', Date.now().toString());
    } catch (error) {
      console.error('❌ Failed to update course progress:', error);
    } finally {
      setSyncingProgress(false);
      syncingRef.current = false;
    }
  }, []);

  // Mark video as completed
  const markVideoCompleted = useCallback((courseId, videoId, totalVideos) => {
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [videoId]: true
      }
    }));

    // Debounce server sync to avoid rapid calls
    setTimeout(() => {
      updateCourseProgress(courseId, totalVideos);
    }, 500);
  }, [updateCourseProgress]);

  // Mark video as incomplete
  const markVideoIncomplete = useCallback((courseId, videoId, totalVideos) => {
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [videoId]: false
      }
    }));

    // Debounce server sync to avoid rapid calls
    setTimeout(() => {
      updateCourseProgress(courseId, totalVideos);
    }, 500);
  }, [updateCourseProgress]);

  // Check if video is completed
  const isVideoCompleted = useCallback((courseId, videoId) => {
    return courseProgressRef.current[courseId]?.[videoId] || false;
  }, []);

  // Calculate course progress percentage
  const getCourseProgress = useCallback((courseId, totalVideos) => {
    const courseData = courseProgressRef.current[courseId] || {};
    const completedVideos = Object.values(courseData).filter(Boolean).length;
    return totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
  }, []);

  // Get completed video count
  const getCompletedVideoCount = useCallback((courseId) => {
    const courseData = courseProgressRef.current[courseId] || {};
    return Object.values(courseData).filter(Boolean).length;
  }, []);

  // Sync on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const coursesToSync = [];
      const currentProgress = courseProgressRef.current;
      
      Object.keys(currentProgress).forEach(courseId => {
        const courseData = currentProgress[courseId] || {};
        const completedVideos = Object.values(courseData).filter(Boolean).length;
        const totalVideos = parseInt(localStorage.getItem(`course_${courseId}_total_videos`)) || 0;
        
        if (totalVideos > 0) {
          const progressPercentage = Math.round((completedVideos / totalVideos) * 100);
          coursesToSync.push({
            courseId: parseInt(courseId),
            progress: progressPercentage
          });
        }
      });

      if (coursesToSync.length > 0 && navigator.sendBeacon) {
        try {
          const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/progress`;
          const payload = JSON.stringify({ updates: coursesToSync });
          navigator.sendBeacon(apiUrl, new Blob([payload], { type: 'application/json' }));
          console.log('📡 Progress synced via sendBeacon');
        } catch (error) {
          console.error('Failed to sync on page unload:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const value = {
    courseProgress,
    markVideoCompleted,
    markVideoIncomplete,
    isVideoCompleted,
    getCourseProgress,
    getCompletedVideoCount,
    syncingProgress,
    syncProgressToServer
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};