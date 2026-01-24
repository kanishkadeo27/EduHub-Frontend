import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * TEMP user object
 * Later this will come from AuthContext / API
 */
const user = null;
// const user = { role: "user" };
// const user = { role: "admin" };

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 text-sm uppercase ${
      location.pathname === path
        ? "font-bold text-indigo-600"
        : "text-gray-700"
    } hover:text-indigo-600`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white h-20 shadow">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/image/logo-trim-navbar.png"
            alt="EduHub Logo"
            className="h-10"
          />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            EduHub
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-2 ml-auto">

          {/* Guest */}
          {!user && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/search" className={linkClass("/search")}>Search</Link>
              <Link to="/courses" className={linkClass("/courses")}>Courses</Link>
              <Link to="/contact-us" className={linkClass("/contact-us")}>Contact Us</Link>
              <Link to="/about" className={linkClass("/about")}>About</Link>
              <Link to="/signup" className={linkClass("/signup")}>Signup</Link>

              <Link
                to="/login"
                className="ml-3 bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            </>
          )}

          {/* User */}
          {user?.role === "user" && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/search" className={linkClass("/search")}>Search</Link>
              <Link to="/courses" className={linkClass("/courses")}>Courses</Link>
              <Link to="/my-courses" className={linkClass("/my-courses")}>My Courses</Link>
              <Link to="/profile" className={linkClass("/profile")}>Profile</Link>
              <Link to="/contact-us" className={linkClass("/contact-us")}>Contact Us</Link>

              <Link
                to="/logout"
                className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Logout
              </Link>
            </>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Link to="/" className={linkClass("/")}>Home</Link>
              <Link to="/search" className={linkClass("/search")}>Search</Link>
              <Link to="/add-course" className={linkClass("/add-course")}>Add Course</Link>
              <Link to="/courses" className={linkClass("/courses")}>Manage Courses</Link>
              <Link to="/profile" className={linkClass("/profile")}>Profile</Link>

              <Link
                to="/logout"
                className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Logout
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-2">

            {!user && (
              <>
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/search" onClick={() => setOpen(false)}>Search</Link>
                <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>
                <Link to="/contact-us" onClick={() => setOpen(false)}>Contact Us</Link>
                <Link to="/about" onClick={() => setOpen(false)}>About</Link>
                <Link to="/signup" onClick={() => setOpen(false)}>Signup</Link>
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              </>
            )}

            {user?.role === "user" && (
              <>
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/my-courses" onClick={() => setOpen(false)}>My Courses</Link>
                <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
                <Link to="/logout" onClick={() => setOpen(false)}>Logout</Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link to="/add-course" onClick={() => setOpen(false)}>Add Course</Link>
                <Link to="/courses" onClick={() => setOpen(false)}>Manage Courses</Link>
                <Link to="/logout" onClick={() => setOpen(false)}>Logout</Link>
              </>
            )}

          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
