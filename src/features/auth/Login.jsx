import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 🔹 FORM STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Get redirect path from location state
  const from = location.state?.from?.pathname || "/";

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Real-time field validation
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
      password: validatePassword(value)
    }));
  };

  /**
   * HANDLE LOGIN SUBMIT
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Comprehensive frontend validation
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setFieldErrors({
      email: emailError,
      password: passwordError
    });

    if (emailError || passwordError) {
      setError("Please fix the errors above");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);
      
      // Redirect to intended page or home
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT ILLUSTRATION ================= */}
          <div className="hidden lg:flex justify-center">
            <img
              src="/image/superadmin-login-trim.jpg"
              alt="Login Illustration"
              className="w-full max-w-2xl"
            />
          </div>

          {/* ================= LOGIN FORM ================= */}
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl"
            >
              <div className="border rounded-xl shadow-lg p-10">

                {/* LOGO */}
                <div className="flex justify-center mb-6">
                  <img
                    src="/image/navbar-logo.png"
                    alt="CourseCraft Logo"
                    className="h-12"
                  />
                </div>

                <h3 className="text-center text-2xl font-medium mb-6">
                  Login
                </h3>

                {/* ERROR MESSAGE */}
                {error && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {error}
                  </p>
                )}

                {/* EMAIL */}
                <div className="mb-5">
                  <label className="block text-gray-800 text-sm mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.email 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-indigo-400'
                    }`}
                    placeholder="Enter your email"
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
                <div className="mb-5">
                  <label className="block text-gray-800 text-sm mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.password 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-indigo-400'
                    }`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    required
                  />
                  {fieldErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
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

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading || fieldErrors.email || fieldErrors.password}
                  className="w-full bg-indigo-500 text-white py-3 rounded-md font-medium hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "LOGIN"}
                </button>

                {/* SIGNUP LINK */}
                <p className="text-sm text-right mt-5">
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:underline"
                  >
                    Don’t have an account? Sign up
                  </Link>
                </p>

                {/*
                  🚀 AFTER BACKEND:
                  -----------------
                  - Disable button while API call is loading
                  - Show spinner inside button
                  - Handle 401 / 403 errors properly
                */}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Login;
