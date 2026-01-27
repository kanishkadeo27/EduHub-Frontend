import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProgress } from '../../context/ProgressContext';
import PdfViewer from '../../components/common/PdfViewer';

const Classroom = () => {
  const { id } = useParams(); // Course ID from URL
  const { markVideoCompleted, markVideoIncomplete, isVideoCompleted, getCourseProgress } = useProgress();
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [selectedContent, setSelectedContent] = useState('video'); // 'video' or 'pdf'
  const [selectedPdf, setSelectedPdf] = useState(0);

  // Mock course data with videos - replace with API call
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Mock course data - replace with actual API call
    setCourse({
      id: parseInt(id),
      courseName: "React Fundamentals",
      videos: [
        { 
          id: 1, 
          title: "Introduction to React", 
          duration: "10:30", 
          url: "https://www.youtube.com/embed/SqcY0GlETPk" 
        },
        { 
          id: 2, 
          title: "JSX and Components", 
          duration: "15:45", 
          url: "https://www.youtube.com/embed/Tn6-PIqc4UM" 
        },
        { 
          id: 3, 
          title: "Props and State", 
          duration: "20:15", 
          url: "https://www.youtube.com/embed/O6P86uwfdR0" 
        },
        { 
          id: 4, 
          title: "Event Handling", 
          duration: "12:30", 
          url: "https://www.youtube.com/embed/Rh3tobg7hEo" 
        },
        { 
          id: 5, 
          title: "Hooks Introduction", 
          duration: "18:20", 
          url: "https://www.youtube.com/embed/TNhaISOUy6Q" 
        },
      ],
      pdfs: [
        {
          id: 1,
          title: "React Fundamentals Guide",
          filename: "react_fundamentals.pdf",
          url: "/pdf/study-material/spring_boot_tutorial.pdf",
          description: "Complete guide to React fundamentals and concepts"
        },
        {
          id: 2,
          title: "Component Lifecycle",
          filename: "component_lifecycle.pdf", 
          url: "/pdf/study-material/spring_boot_tutorial.pdf",
          description: "Understanding React component lifecycle methods"
        },
        {
          id: 3,
          title: "State Management",
          filename: "state_management.pdf",
          url: "/pdf/study-material/spring_boot_tutorial.pdf", 
          description: "Managing state in React applications"
        }
      ]
    });
  }, [id]);

  if (!course) {
    return <div className="text-center mt-20">Loading classroom...</div>;
  }

  const currentVideo = course.videos[selectedVideo];
  const currentPdf = course.pdfs[selectedPdf];
  const progress = getCourseProgress(course.id, course.videos.length);

  const handleVideoComplete = (videoId) => {
    markVideoCompleted(course.id, videoId);
  };

  const handleVideoIncomplete = (videoId) => {
    markVideoIncomplete(course.id, videoId);
  };

  const switchToVideo = (index) => {
    setSelectedContent('video');
    setSelectedVideo(index);
  };

  const switchToPdf = (index) => {
    setSelectedContent('pdf');
    setSelectedPdf(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-2">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.courseName}</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 rounded-full px-4 py-2">
              <span className="text-indigo-800 font-semibold">Progress: {progress}%</span>
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-2">
              <span className="text-gray-700">
                {course.videos.filter(video => isVideoCompleted(course.id, video.id)).length} / {course.videos.length} videos completed
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Content Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              
              {/* Content Type Tabs */}
              <div className="bg-gray-100 px-6 py-3 border-b">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedContent('video')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedContent === 'video'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    📹 Videos
                  </button>
                  <button
                    onClick={() => setSelectedContent('pdf')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedContent === 'pdf'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    📄 Study Materials
                  </button>
                </div>
              </div>

              {/* Video Player */}
              {selectedContent === 'video' && (
                <>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentVideo.url}
                      title={currentVideo.title}
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Video Controls */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentVideo.title}</h2>
                    <p className="text-gray-600 mb-4">Duration: {currentVideo.duration}</p>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleVideoComplete(currentVideo.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          isVideoCompleted(course.id, currentVideo.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isVideoCompleted(course.id, currentVideo.id) ? '✓ Completed' : 'Mark as Complete'}
                      </button>
                      
                      {isVideoCompleted(course.id, currentVideo.id) && (
                        <button
                          onClick={() => handleVideoIncomplete(currentVideo.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Mark as Incomplete
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* PDF Viewer */}
              {selectedContent === 'pdf' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentPdf.title}</h2>
                  <p className="text-gray-600 mb-4">{currentPdf.description}</p>
                  
                  <div className="mt-4">
                    <PdfViewer
                      pdfUrl={currentPdf.url}
                      title={currentPdf.title}
                      height="600px"
                      showControls={true}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Content</h3>
              
              {/* Videos Section */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  📹 Videos ({course.videos.length})
                </h4>
                <div className="space-y-2">
                  {course.videos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => switchToVideo(index)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContent === 'video' && selectedVideo === index
                          ? 'bg-indigo-100 border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 text-sm">{video.title}</h5>
                          <p className="text-gray-600 text-xs mt-1">{video.duration}</p>
                        </div>
                        
                        <div className="ml-3">
                          {isVideoCompleted(course.id, video.id) ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PDFs Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  📄 Study Materials ({course.pdfs.length})
                </h4>
                <div className="space-y-2">
                  {course.pdfs.map((pdf, index) => (
                    <div
                      key={pdf.id}
                      onClick={() => switchToPdf(index)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContent === 'pdf' && selectedPdf === index
                          ? 'bg-indigo-100 border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-gray-900 text-sm truncate">{pdf.title}</h5>
                          <p className="text-gray-600 text-xs mt-1 truncate">{pdf.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;