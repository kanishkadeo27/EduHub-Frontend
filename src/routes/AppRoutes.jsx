import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Search from "../pages/Search";





const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact-us" element={<ContactUs />} />
  <Route path="/search" element={<Search />} />

</Route>
    </Routes>
  );
};

export default AppRoutes;
