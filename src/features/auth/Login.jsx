import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // 🔹 FORM STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  /**
   * HANDLE LOGIN SUBMIT
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation (keep this even after backend)
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");

    /**
     * 🚀 AFTER BACKEND INTEGRATION:
     * --------------------------------
     * 1️⃣ Call backend login API (axios/fetch)
     *    POST /auth/login
     *    body: { email, password }
     *
     * 2️⃣ On success:
     *    - Save JWT token (localStorage / cookies)
     *    - Save user object (id, name, role)
     *    - Update AuthContext (setUser)
     *
     * 3️⃣ Redirect user based on role:
     *    - user  → /courses or /search
     *    - admin → /admin/dashboard
     *
     * 4️⃣ On failure:
     *    - Show backend error message
     */

    console.log({ email, password }); // TEMP (remove after backend)

    // Example (after backend):
    // const res = await axios.post("/api/auth/login", { email, password });
    // localStorage.setItem("token", res.data.token);
    // setUser(res.data.user);
    // navigate("/");
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
                    alt="EduHub Logo"
                    className="h-12"
                  />
                </div>

                <h3 className="text-center text-2xl font-medium mb-6">
                  Students | Login
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
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-5">
                  <label className="block text-gray-800 text-sm mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
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
                  className="w-full bg-indigo-500 text-white py-3 rounded-md font-medium hover:bg-indigo-600 transition"
                >
                  LOGIN
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
