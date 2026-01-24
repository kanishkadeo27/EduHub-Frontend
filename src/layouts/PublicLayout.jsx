import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PublicLayout = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default PublicLayout;
