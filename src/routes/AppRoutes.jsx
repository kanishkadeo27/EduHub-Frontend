import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

// Auth
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Search from "../pages/Search";
import Profile from "../pages/Profile";

// Courses
import CourseCatalog from "../features/courses/CourseCatalog";
import CourseDetails from "../features/courses/CourseDetails";
import CourseSyllabus from "../features/courses/CourseSyllabus";
import CreateCourse from "../features/admin/CreateCourse";
import ManageCourse from "../features/admin/ManageCourse";
import MyCourses from "../features/courses/MyCourses";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>

        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />

        {/* Courses */}
        <Route path="/courses" element={<CourseCatalog />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/:id/syllabus" element={<CourseSyllabus />} />
        <Route path="/admin/courses/create" element={<CreateCourse />} />
        <Route path="/admin/courses/manage/:id" element={<ManageCourse />} />
        <Route path="/my-courses" element={<MyCourses />} />



      </Route>
    </Routes>
  );
};

export default AppRoutes;
