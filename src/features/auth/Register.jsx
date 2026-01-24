import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");

    // TODO: Replace with API call
    console.log({ name, email, password });
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Image */}
          <div className="hidden lg:block">
            <img
              src="/image/superadmin-login-trim.jpg"
              alt="Signup"
              className="mt-32 w-full"
            />
          </div>

          {/* Signup Form */}
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mt-24 mb-24"
            >
              <div className="border rounded-lg shadow p-6">

                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img src="/image/logo-trim.png" alt="Logo" />
                </div>

                <h3 className="text-center text-xl font-medium mb-4">
                  Students | Signup
                </h3>

                {error && (
                  <p className="text-red-500 text-sm text-center mb-3">
                    {error}
                  </p>
                )}

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-800 text-sm mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

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
                  Sign Up
                </button>

                {/* Login Link */}
                <p className="text-sm text-right mt-4">
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:underline"
                  >
                    Already have an account? Log in
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
