import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");

    // TODO: replace with API call
    console.log({ email, password });
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Image */}
          <div className="hidden lg:block">
            <img
              src="/image/superadmin-login-trim.jpg"
              alt="Login"
              className="mt-32 w-full"
            />
          </div>

          {/* Login Form */}
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mt-24 mb-32"
            >
              <div className="border rounded-lg shadow p-6">

                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img src="/image/logo-trim.png" alt="Logo" />
                </div>

                <h3 className="text-center text-xl font-medium mb-4">
                  Students | Login
                </h3>

                {error && (
                  <p className="text-red-500 text-sm text-center mb-3">
                    {error}
                  </p>
                )}

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Show Password */}
                <div className="flex items-center mb-4">
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

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
                >
                  Login
                </button>

                {/* Signup Link */}
                <p className="text-sm text-right mt-4">
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:underline"
                  >
                    Don’t have an account? Sign up
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

export default Login;
