import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../../api";

const CreateTrainer = () => {
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState({
    name: "",
    description: "",
    rating: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Trainer name is required";
    if (name.trim().length < 3) return "Name must be at least 3 characters";
    if (name.trim().length > 100) return "Name must be less than 100 characters";
    if (!/^[a-zA-Z]+$/.test(name.trim())) return "Name can only contain alphabets (no spaces, numbers, or special characters)";
    return "";
  };

  const validateDescription = (description) => {
    if (!description.trim()) return "Description is required";
    if (description.trim().length < 10) return "Description must be at least 10 characters";
    if (description.trim().length > 1000) return "Description must be less than 1000 characters";
    return "";
  };

  const validateRating = (rating) => {
    if (!rating) return "Rating is required";
    const ratingNum = parseFloat(rating);
    if (isNaN(ratingNum)) return "Rating must be a valid number";
    if (ratingNum < 1 || ratingNum > 5) return "Rating must be between 1 and 5";
    return "";
  };

  const validateImageUrl = (imageUrl) => {
    if (!imageUrl.trim()) return "Image URL is required";
    try {
      new URL(imageUrl);
      if (!imageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return "Image URL must end with a valid image extension (jpg, jpeg, png, gif, webp)";
      }
    } catch {
      return "Please enter a valid URL";
    }
    return "";
  };

  // Real-time field validation
  const handleFieldChange = (field, value) => {
    setTrainer(prev => ({ ...prev, [field]: value }));
    
    let error = "";
    switch (field) {
      case 'name':
        error = validateName(value);
        break;
      case 'description':
        error = validateDescription(value);
        break;
      case 'rating':
        error = validateRating(value);
        break;
      case 'imageUrl':
        error = validateImageUrl(value);
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    if (!user.role || !user.role.toLowerCase().includes('admin')) {
      // User may not have admin privileges
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");

    // Comprehensive validation
    const nameError = validateName(trainer.name);
    const descriptionError = validateDescription(trainer.description);
    const ratingError = validateRating(trainer.rating);
    const imageUrlError = validateImageUrl(trainer.imageUrl);

    setFieldErrors({
      name: nameError,
      description: descriptionError,
      rating: ratingError,
      imageUrl: imageUrlError
    });

    if (nameError || descriptionError || ratingError || imageUrlError) {
      setErrorMessage("Please fix the errors above");
      setSubmitStatus('error');
      return;
    }

    setLoading(true);

    try {
      const trainerData = {
        name: trainer.name.trim(),
        description: trainer.description.trim(),
        rating: parseFloat(trainer.rating),
        imageUrl: trainer.imageUrl.trim(),
      };

      await adminService.createTrainer(trainerData);
      
      setSubmitStatus('success');
      setTrainer({ name: "", description: "", rating: "", imageUrl: "" });
      setFieldErrors({});
      
      setTimeout(() => {
        navigate('/admin/trainers');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create trainer');
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Trainer</h1>
          <p className="text-gray-600 mt-2">Add a new trainer to the platform</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow p-6">
          
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded transition-opacity duration-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Trainer created successfully! Redirecting to manage trainers...</span>
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
                <span>{errorMessage || "Failed to create trainer. Please try again."}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Trainer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trainer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={trainer.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.name 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Enter trainer's name (alphabets only)"
                  required
                  disabled={loading}
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={trainer.rating}
                  onChange={(e) => handleFieldChange('rating', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.rating 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Enter rating (1.0-5.0)"
                  required
                  disabled={loading}
                />
                {fieldErrors.rating && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.rating}</p>
                )}
              </div>

              {/* Trainer Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trainer Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={trainer.imageUrl}
                  onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.imageUrl 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="https://example.com/trainer-photo.jpg"
                  required
                  disabled={loading}
                />
                {fieldErrors.imageUrl && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.imageUrl}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Provide a URL to the trainer's profile image (jpg, jpeg, png, gif, webp).
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trainer Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={trainer.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.description 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Describe the trainer's background, expertise, and teaching experience..."
                  required
                  disabled={loading}
                />
                {fieldErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>
                )}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Minimum 10 characters, maximum 1000 characters</span>
                  <span>{trainer.description.length}/1000</span>
                </div>
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
                {loading ? 'Creating...' : 'Create Trainer'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateTrainer;