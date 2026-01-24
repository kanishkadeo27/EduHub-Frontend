import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public layout */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Temporary home page */}
        <Route
          path="/"
          element={<div className="pt-32 text-center">Home Page</div>}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
