import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z]+$/.test(name.trim())) return "Name can only contain alphabets (no spaces, numbers, or special characters)";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
    if (!/(?=.*[@$!%*?&])/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  // Real-time field validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setFieldErrors(prev => ({
      ...prev,
      name: validateName(value)
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setFieldErrors(prev => ({
      ...prev,
      email: validateEmail(value)
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setFieldErrors(prev => ({
      ...prev,
      password: validatePassword(value),
      confirmPassword: confirmPassword ? validateConfirmPassword(confirmPassword, value) : ""
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setFieldErrors(prev => ({
      ...prev,
      confirmPassword: validateConfirmPassword(value, password)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive frontend validation
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    setFieldErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setError("Please fix the errors above");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(name.trim(), email.trim(), password);
      setSuccess("Registration successful! Please login.");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT ILLUSTRATION ================= */}
          <div className="hidden lg:flex justify-center">
            <img
              src="/image/superadmin-login-trim.jpg"
              alt="Signup Illustration"
              className="max-w-md w-full"
            />
          </div>

          {/* ================= SIGNUP FORM ================= */}
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg xl:max-w-xl"
            >
              <div className="border rounded-lg shadow-lg p-8">

                {/* LOGO */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/image/navbar-logo.png"
                    alt="CourseCraft Logo"
                    className="h-10"
                  />
                </div>

                <h3 className="text-center text-2xl font-semibold mb-6">
                   Signup
                </h3>

                {/* ERROR MESSAGE */}
                {error && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {error}
                  </p>
                )}

                {/* SUCCESS MESSAGE */}
                {success && (
                  <p className="text-green-500 text-sm text-center mb-4">
                    {success}
                  </p>
                )}

                {/* NAME */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.name 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="name"
                    required
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.email 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.password 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    required
                  />
                  {fieldErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                  )}
                  <div className="mt-1 text-xs text-gray-500">
                    Password must contain: 8+ characters, uppercase, lowercase, number, special character
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    autoComplete="new-password"
                    required
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>
                  )}
                </div>

                {/* SHOW PASSWORD */}
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span className="text-sm text-gray-700">
                    Show Password
                  </span>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading || Object.values(fieldErrors).some(error => error)}
                  className="w-full bg-indigo-500 text-white py-3 rounded font-semibold hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>

                {/* LOGIN LINK */}
                <p className="text-sm text-center mt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:underline"
                  >
                    Log in
                  </Link>
                </p>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Register;
