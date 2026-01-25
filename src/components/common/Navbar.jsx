import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * TEMP user object
 * ❗ AFTER BACKEND:
 * - REMOVE this constant
 * - GET user from AuthContext (useAuth)
 * const { user, logout } = useAuth();

 */
// const user = null;
const user = null;
// const user = { role: "user" };
// const user = { role: "admin" };

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * LOGOUT HANDLER
   * ✔ Currently clears localStorage and redirects
   *
   * 🔁 AFTER BACKEND:
   * - Call authContext.logout()
   * - Backend token invalidation (optional)
   */
  const handleLogout = () => {
    logout(); // clears context + storage
    navigate("/login");
  };

  /**
   * Desktop link styling
   */
  const linkClass = (path) =>
    `px-3 py-2 text-lg uppercase ${location.pathname === path
      ? "font-bold text-indigo-600"
      : "text-gray-700"
    } hover:text-indigo-600`;

  /**
   * Mobile link styling
   */
  const mobileLinkClass = (path) =>
    `px-3 py-2 text-md uppercase ${location.pathname === path
      ? "font-bold text-indigo-600"
      : "text-gray-700"
    } hover:text-indigo-600`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white h-20 shadow">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="/image/navbar-logo.png"
            alt="EduHub Logo"
            className="h-10"
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center space-x-2 ml-auto">

          {/* ---------- GUEST NAV ---------- */}
          {!user && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/about" className={linkClass("/about")}>About</Link>
              <Link to="/search" className={linkClass("/search")}>Search</Link>
              <Link to="/courses" className={linkClass("/courses")}>Courses</Link>
              <Link to="/contact-us" className={linkClass("/contact-us")}>Contact Us</Link>
              <Link to="/signup" className={linkClass("/signup")}>Signup</Link>

              <Link
                to="/login"
                className="ml-3 bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            </>
          )}

          {/* ---------- USER NAV ---------- */}
          {user?.role === "user" && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/search" className={linkClass("/search")}>Search</Link>
              <Link to="/courses" className={linkClass("/courses")}>Courses</Link>
              <Link to="/my-courses" className={linkClass("/my-courses")}>My Courses</Link>
              <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
              <Link to="/contact-us" className={linkClass("/contact-us")}>Contact Us</Link>

              <button
                onClick={handleLogout}
                className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}

          {/* ---------- ADMIN NAV ---------- */}
          {user?.role === "admin" && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/search" className={linkClass("/search")}>Search</Link>
              <Link to="/admin/courses/create" className={linkClass("/admin/courses/create")}>
                Add Course
              </Link>
              <Link to="/courses" className={linkClass("/courses")}>
                Manage Courses
              </Link>
              <Link to="/profile" className={linkClass("/profile")}>Profile</Link>

              <button
                onClick={handleLogout}
                className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-2">

            {/* Guest */}
            {!user && (
              <>
                <Link className={mobileLinkClass("/")} to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link className={mobileLinkClass("/search")} to="/search" onClick={() => setOpen(false)}>Search</Link>
                <Link className={mobileLinkClass("/courses")} to="/courses" onClick={() => setOpen(false)}>Courses</Link>
                <Link className={mobileLinkClass("/contact-us")} to="/contact-us" onClick={() => setOpen(false)}>Contact Us</Link>
                <Link className={mobileLinkClass("/about")} to="/about" onClick={() => setOpen(false)}>About</Link>
                <Link className={mobileLinkClass("/signup")} to="/signup" onClick={() => setOpen(false)}>Signup</Link>
                <Link className={mobileLinkClass("/login")} to="/login" onClick={() => setOpen(false)}>Login</Link>
              </>
            )}

            {/* User */}
            {user?.role === "user" && (
              <>
                <Link className={mobileLinkClass("/")} to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link className={mobileLinkClass("/my-courses")} to="/my-courses" onClick={() => setOpen(false)}>My Courses</Link>
                <Link className={mobileLinkClass("/profile")} to="/profile" onClick={() => setOpen(false)}>Profile</Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link className={mobileLinkClass("/admin/courses/create")} to="/admin/courses/create" onClick={() => setOpen(false)}>
                  Add Course
                </Link>
                <Link className={mobileLinkClass("/courses")} to="/courses" onClick={() => setOpen(false)}>
                  Manage Courses
                </Link>
                <Link className={mobileLinkClass("/profile")} to="/profile" onClick={() => setOpen(false)}>
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}

          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
