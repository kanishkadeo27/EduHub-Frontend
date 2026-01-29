import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CourseContentManager = () => {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Form state
  const [courseData, setCourseData] = useState({
    name: "",
    description: ""
  });
  
  const [contentPairs, setContentPairs] = useState(Array(10).fill().map((_, index) => ({
    id: index + 1,
    video: {
      title: "",
      url: "",
      duration: "",
      description: ""
    },
    pdf: {
      title: "",
      url: "",
      description: ""
    }
  })));

  // Load all courses for dropdown
  useEffect(() => {
    const loadCourses = async () => {
      try {
        // TODO: Replace with actual API call
        // const coursesData = await courseService.getAllCourses();
        
        // Mock courses data
        const mockCourses = [
          {
            id: 1,
            name: "React Fundamentals",
            description: "Learn the basics of React development",
            topic: "Web Development",
            subtopic: "Frontend"
          },
          {
            id: 2,
            name: "Advanced JavaScript",
            description: "Master advanced JavaScript concepts",
            topic: "Programming",
            subtopic: "JavaScript"
          },
          {
            id: 3,
            name: "Node.js Backend Development",
            description: "Build scalable backend applications",
            topic: "Web Development",
            subtopic: "Backend"
          },
          {
            id: 4,
            name: "Database Design",
            description: "Learn database design principles",
            topic: "Database",
            subtopic: "SQL"
          }
        ];
        
        setCourses(mockCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
        setMessage({ type: 'error', text: 'Failed to load courses' });
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Load specific course content when course is selected
  useEffect(() => {
    const loadCourseContent = async () => {
      if (!selectedCourseId) {
        setSelectedCourse(null);
        setCourseData({ name: "", description: "" });
        setContentPairs(Array(10).fill().map((_, index) => ({
          id: index + 1,
          video: {
            title: "",
            url: "",
            duration: "",
            description: ""
          },
          pdf: {
            title: "",
            url: "",
            description: ""
          }
        })));
        return;
      }

      try {
        // TODO: Replace with actual API call
        // const courseContent = await courseService.getCourseContent(selectedCourseId);
        
        // Find selected course from courses list
        const course = courses.find(c => c.id === parseInt(selectedCourseId));
        if (!course) return;

        // Mock existing content data
        const mockContent = {
          videos: selectedCourseId === "1" ? [
            { id: 1, title: "Introduction to React", url: "https://example.com/video1", duration: "15:30", description: "Basic React concepts" },
            { id: 2, title: "Components and Props", url: "https://example.com/video2", duration: "20:45", description: "Understanding components" }
          ] : [],
          pdfs: selectedCourseId === "1" ? [
            { id: 1, title: "React Cheat Sheet", url: "https://example.com/pdf1", description: "Quick reference guide" },
            { id: 2, title: "Best Practices", url: "https://example.com/pdf2", description: "React best practices" }
          ] : []
        };
        
        setSelectedCourse(course);
        setCourseData({
          name: course.name,
          description: course.description
        });
        
        // Populate existing content pairs
        const updatedContentPairs = Array(10).fill().map((_, index) => ({
          id: index + 1,
          video: {
            title: "",
            url: "",
            duration: "",
            description: ""
          },
          pdf: {
            title: "",
            url: "",
            description: ""
          }
        }));
        
        // Fill with existing data
        mockContent.videos.forEach((video, index) => {
          if (index < 10) {
            updatedContentPairs[index].video = video;
          }
        });
        
        mockContent.pdfs.forEach((pdf, index) => {
          if (index < 10) {
            updatedContentPairs[index].pdf = pdf;
          }
        });
        
        setContentPairs(updatedContentPairs);
        
      } catch (error) {
        console.error("Error loading course content:", error);
        setMessage({ type: 'error', text: 'Failed to load course content' });
      }
    };

    if (courses.length > 0) {
      loadCourseContent();
    }
  }, [selectedCourseId, courses]);

  // Auto-hide messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCourseDataChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVideoChange = (index, field, value) => {
    const updatedContentPairs = [...contentPairs];
    updatedContentPairs[index].video = {
      ...updatedContentPairs[index].video,
      [field]: value
    };
    setContentPairs(updatedContentPairs);
  };

  const handlePdfChange = (index, field, value) => {
    const updatedContentPairs = [...contentPairs];
    updatedContentPairs[index].pdf = {
      ...updatedContentPairs[index].pdf,
      [field]: value
    };
    setContentPairs(updatedContentPairs);
  };

  const handleSave = async () => {
    if (!selectedCourseId) {
      setMessage({ type: 'error', text: 'Please select a course first' });
      return;
    }

    try {
      setSaving(true);
      
      // Prepare data for API
      const contentData = {
        courseId: selectedCourseId,
        name: courseData.name,
        description: courseData.description,
        videos: contentPairs.filter(pair => pair.video.title && pair.video.url).map(pair => pair.video),
        pdfs: contentPairs.filter(pair => pair.pdf.title && pair.pdf.url).map(pair => pair.pdf)
      };
      
      // TODO: Replace with actual API call
      // await courseService.updateCourseContent(selectedCourseId, contentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Course content updated successfully! Redirecting to dashboard...' });
      
      // Navigate to dashboard after showing success message
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error("Error saving course content:", error);
      setMessage({ type: 'error', text: 'Failed to save course content. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading course content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add Course Content</h1>
              <p className="text-gray-600 mt-2">Select a course and add videos and PDFs</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                {message.type === 'success' ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                )}
              </svg>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        {/* Course Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Course *
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a course...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} - {course.topic}
                  </option>
                ))}
              </select>
            </div>
            {selectedCourse && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Details
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{selectedCourse.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{selectedCourse.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {selectedCourse.topic}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {selectedCourse.subtopic}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Basic Info */}
        {selectedCourse && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={courseData.name}
                  onChange={(e) => handleCourseDataChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course name"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => handleCourseDataChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course description"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content Pairs Section */}
        {selectedCourse && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Content (Up to 10 Video-PDF Pairs)</h2>
            <div className="space-y-8">
              {contentPairs.map((pair, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Content Pair {index + 1}</h3>
                  
                  {/* Video Section */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-blue-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Video {index + 1}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Video Title
                        </label>
                        <input
                          type="text"
                          value={pair.video.title}
                          onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter video title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Video URL
                        </label>
                        <input
                          type="url"
                          value={pair.video.url}
                          onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/video.mp4"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={pair.video.duration}
                          onChange={(e) => handleVideoChange(index, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 15:30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Video Description
                        </label>
                        <input
                          type="text"
                          value={pair.video.description}
                          onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Brief description of the video"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PDF Section */}
                  <div>
                    <h4 className="text-md font-medium text-red-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      PDF {index + 1}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PDF Title
                        </label>
                        <input
                          type="text"
                          value={pair.pdf.title}
                          onChange={(e) => handlePdfChange(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter PDF title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PDF URL
                        </label>
                        <input
                          type="url"
                          value={pair.pdf.url}
                          onChange={(e) => handlePdfChange(index, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/document.pdf"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PDF Description
                        </label>
                        <input
                          type="text"
                          value={pair.pdf.description}
                          onChange={(e) => handlePdfChange(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Brief description of the PDF"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {selectedCourse && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-2 rounded-lg transition ${
                saving
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving...' : 'Save Content'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CourseContentManager;