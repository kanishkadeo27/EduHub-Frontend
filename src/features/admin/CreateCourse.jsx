import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../api";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trainersLoading, setTrainersLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);
  
  const [course, setCourse] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    price: "",
    level: "BEGINNER",
    mode: "ONLINE",
    language: "English",
    isPublished: true,
    trainerId: "",
    topics: []
  });

  const [topicsInput, setTopicsInput] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateTitle = (title) => {
    if (!title.trim()) return "Course title is required";
    if (title.trim().length < 3) return "Title must be at least 3 characters";
    if (title.trim().length > 200) return "Title must be less than 200 characters";
    if (!/[a-zA-Z]/.test(title.trim())) return "Title must contain at least one alphabet";
    return "";
  };

  const validateDescription = (description) => {
    if (!description.trim()) return "Course description is required";
    if (description.trim().length < 10) return "Description must be at least 10 characters";
    if (description.trim().length > 2000) return "Description must be less than 2000 characters";
    return "";
  };

  const validatePrice = (price) => {
    if (!price && price !== "0") return "Price is required";
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) return "Price must be a valid number";
    if (priceNum < 0) return "Price cannot be negative";
    if (priceNum > 999999) return "Price cannot exceed ₹999,999";
    return "";
  };

  const validateThumbnailUrl = (url) => {
    if (!url.trim()) return ""; // Optional field
    try {
      new URL(url);
      if (!url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return "Image URL must end with a valid image extension (jpg, jpeg, png, gif, webp)";
      }
    } catch {
      return "Please enter a valid URL";
    }
    return "";
  };

  const validateTrainer = (trainerId) => {
    if (!trainerId) return "Please select a trainer";
    return "";
  };

  const validateTopics = (topics) => {
    if (!topics || topics.length === 0) return "At least one topic is required";
    if (topics.length > 10) return "Maximum 10 topics allowed";
    
    for (let topic of topics) {
      if (topic.length < 2) return "Each topic must be at least 2 characters";
      if (topic.length > 50) return "Each topic must be less than 50 characters";
    }
    return "";
  };

  // Load trainers from API
  useEffect(() => {
    const loadTrainers = async () => {
      try {
        setTrainersLoading(true);
        const response = await adminService.getAllTrainers();
        setTrainers(response.data.data || []);
      } catch (err) {
        setSubmitStatus('error');
        setTrainers([]);
      } finally {
        setTrainersLoading(false);
      }
    };
    loadTrainers();
  }, []);

  // Auto-fade messages after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });

    // Real-time validation
    let error = "";
    switch (name) {
      case 'title':
        error = validateTitle(value);
        break;
      case 'description':
        error = validateDescription(value);
        break;
      case 'price':
        error = validatePrice(value);
        break;
      case 'thumbnailUrl':
        error = validateThumbnailUrl(value);
        break;
      case 'trainerId':
        error = validateTrainer(value);
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleTopicsChange = (e) => {
    setTopicsInput(e.target.value);
    // Convert comma-separated string to array
    const topicsArray = e.target.value
      .split(',')
      .map(topic => topic.trim())
      .filter(topic => topic.length > 0);
    
    setCourse({
      ...course,
      topics: topicsArray
    });

    // Real-time validation for topics
    const error = validateTopics(topicsArray);
    setFieldErrors(prev => ({ ...prev, topics: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Comprehensive frontend validation
    const titleError = validateTitle(course.title);
    const descriptionError = validateDescription(course.description);
    const priceError = validatePrice(course.price);
    const thumbnailUrlError = validateThumbnailUrl(course.thumbnailUrl);
    const trainerError = validateTrainer(course.trainerId);
    const topicsError = validateTopics(course.topics);

    setFieldErrors({
      title: titleError,
      description: descriptionError,
      price: priceError,
      thumbnailUrl: thumbnailUrlError,
      trainerId: trainerError,
      topics: topicsError
    });

    if (titleError || descriptionError || priceError || thumbnailUrlError || trainerError || topicsError) {
      setSubmitStatus('error');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: course.title.trim(),
        description: course.description.trim(),
        thumbnailUrl: course.thumbnailUrl.trim() || null,
        price: course.price ? parseFloat(course.price) : 0,
        level: course.level,
        mode: course.mode,
        language: course.language,
        isPublished: course.isPublished,
        trainerId: parseInt(course.trainerId),
        topics: course.topics
      };

      setLoading(false);
      
      // Navigate to course content manager with course data
      navigate("/admin/courses/content", { 
        state: { 
          courseData: payload,
          isNewCourse: true 
        } 
      });
      
    } catch (err) {
      setSubmitStatus('error');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">Fill in the course details, then add content in the next step</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded transition-opacity duration-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Course created successfully! Redirecting to all courses...</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded transition-opacity duration-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Please fix the errors below before submitting.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Course Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.title 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Enter course title (must contain at least one letter)"
                  required
                  disabled={loading}
                />
                {fieldErrors.title && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>
                )}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3-200 characters, must contain at least one alphabet, all special characters allowed</span>
                  <span>{course.title.length}/200</span>
                </div>
              </div>

              {/* Course Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.description 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Describe the course content and objectives..."
                  required
                  disabled={loading}
                />
                {fieldErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>
                )}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10-2000 characters</span>
                  <span>{course.description.length}/2000</span>
                </div>
              </div>

              {/* Thumbnail URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  name="thumbnailUrl"
                  value={course.thumbnailUrl}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.thumbnailUrl 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="https://example.com/course-thumbnail.jpg"
                  disabled={loading}
                />
                {fieldErrors.thumbnailUrl && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.thumbnailUrl}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Optional. Provide a URL to the course thumbnail image (jpg, jpeg, png, gif, webp).
                </p>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.price 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="0 for free course"
                  required
                  disabled={loading}
                />
                {fieldErrors.price && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.price}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Enter 0 for free courses. Maximum ₹999,999.
                </p>
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="level"
                  value={course.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={loading}
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>

              {/* Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Mode <span className="text-red-500">*</span>
                </label>
                <select
                  name="mode"
                  value={course.mode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={loading}
                >
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Offline</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  name="language"
                  value={course.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={loading}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              {/* Topics */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Topics <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topicsInput}
                  onChange={handleTopicsChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.topics 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Enter topics separated by commas (e.g., JavaScript, React, Node.js)"
                  required
                  disabled={loading}
                />
                {fieldErrors.topics && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.topics}</p>
                )}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1-10 topics, each 2-50 characters. Separate with commas.</span>
                  <span>{course.topics.length}/10 topics</span>
                </div>
                {course.topics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {course.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Trainer Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Trainer <span className="text-red-500">*</span>
                </label>
                {trainersLoading ? (
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 flex items-center">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 mr-2"></div>
                    Loading trainers...
                  </div>
                ) : (
                  <select
                    name="trainerId"
                    value={course.trainerId}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.trainerId 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    required
                    disabled={loading}
                  >
                    <option value="">Choose a trainer...</option>
                    {trainers.map((trainer) => (
                      <option key={trainer.id} value={trainer.id}>
                        {trainer.name} • {trainer.description.length > 50 
                          ? trainer.description.substring(0, 50) + '...' 
                          : trainer.description}
                      </option>
                    ))}
                  </select>
                )}
                {fieldErrors.trainerId && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.trainerId}</p>
                )}
                {trainers.length === 0 && !trainersLoading && (
                  <p className="text-xs text-red-500 mt-1">
                    No trainers available. Please create trainers first.
                  </p>
                )}
              </div>

              {/* Published Status */}
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={course.isPublished}
                    onChange={(e) => setCourse({...course, isPublished: e.target.checked})}
                    className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    disabled={loading}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Publish course immediately
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Uncheck to save as draft
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || Object.values(fieldErrors).some(error => error)}
                className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                  loading || Object.values(fieldErrors).some(error => error)
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }`}
              >
                {loading ? 'Processing...' : 'Add Course Content'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
