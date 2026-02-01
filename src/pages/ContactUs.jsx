import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { contactService } from "../api";
import useApi from "../hooks/useApi";

const ContactUs = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Use the API hook for contact form submission
  const { loading, error, execute: submitContact } = useApi(contactService.submitContactForm);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSuccessFading, setIsSuccessFading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 3) return "Name must be at least 3 characters";
    if (name.trim().length > 100) return "Name must be less than 100 characters";
    if (!/^[a-zA-Z]+$/.test(name.trim())) return "Name can only contain alphabets (no spaces, numbers, or special characters)";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    if (message.trim().length > 2000) return "Message must be less than 2000 characters";
    return "";
  };

  // Load user data from AuthContext
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      setSubmitStatus('error');
    }
  }, [error]);

  // Auto-hide success message after 5 seconds with fade effect
  useEffect(() => {
    if (submitStatus === 'success') {
      const fadeTimer = setTimeout(() => {
        setIsSuccessFading(true);
      }, 4000);

      const removeTimer = setTimeout(() => {
        setSubmitStatus(null);
        setIsSuccessFading(false);
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [submitStatus]);

  // Real-time field validation
  const handleFieldChange = (field, value) => {
    // Only allow changes to fields that are not disabled
    if (user && (field === 'name' || field === 'email')) {
      return; // Prevent changes to name/email for logged-in users
    }
    
    setForm(prev => ({ ...prev, [field]: value }));
    
    let error = "";
    switch (field) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Comprehensive frontend validation
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const messageError = validateMessage(form.message);

    setFieldErrors({
      name: nameError,
      email: emailError,
      message: messageError
    });

    if (nameError || emailError || messageError) {
      setSubmitStatus('error');
      return;
    }

    try {
      // Use the API service instead of fetch
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      setSubmitStatus('success');
      
      // Reset form based on user status
      if (user) {
        // For logged-in users, only reset the message field
        setForm(prev => ({
          ...prev,
          message: ""
        }));
        setFieldErrors(prev => ({ ...prev, message: "" }));
      } else {
        // For guest users, reset all fields
        setForm({
          name: "",
          email: "",
          message: ""
        });
        setFieldErrors({});
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  const handleChange = (e) => {
    handleFieldChange(e.target.name, e.target.value);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or need assistance? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            {/* Subtle Info Note for Logged-in Users */}
            {user && (
              <div className="mb-8 p-4 bg-gray-50 border-l-4 border-blue-200 rounded-r-lg">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your contact information has been automatically filled from your profile. You can focus on writing your message.
                </p>
              </div>
            )}

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className={`mb-8 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl transition-opacity duration-1000 ${
                isSuccessFading ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Thank you for contacting us!</span>
                  <span className="ml-2">We'll get back to you soon.</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{error.message}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Name <span className="text-red-500">*</span>
                </label>
                {user && (
                  <p className="text-xs text-gray-500">Auto-filled from your profile</p>
                )}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    user 
                      ? 'bg-gray-50 border-gray-200 text-gray-700 cursor-not-allowed' 
                      : fieldErrors.name
                        ? 'bg-white border-red-500 text-gray-900 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                  required
                  disabled={loading || !!user}
                  placeholder={user ? "Filled from your profile" : "Enter your name (alphabets only)"}
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                )}
                {!user && (
                  <p className="text-xs text-gray-500">3-100 characters, alphabets only</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Email <span className="text-red-500">*</span>
                </label>
                {user && (
                  <p className="text-xs text-gray-500">Auto-filled from your profile</p>
                )}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    user 
                      ? 'bg-gray-50 border-gray-200 text-gray-700 cursor-not-allowed' 
                      : fieldErrors.email
                        ? 'bg-white border-red-500 text-gray-900 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                  required
                  disabled={loading || !!user}
                  placeholder={user ? "Filled from your profile" : "Enter your valid email address"}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-gray-900 placeholder-gray-500 resize-none transition-all duration-200 h-40 ${
                      fieldErrors.message
                        ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                    required
                    disabled={loading}
                    placeholder="Tell us how we can help you... (minimum 10 characters)"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                    {form.message.length}/2000
                  </div>
                </div>
                {fieldErrors.message && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || Object.values(fieldErrors).some(error => error)}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    loading || Object.values(fieldErrors).some(error => error)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;