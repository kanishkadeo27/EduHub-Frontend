import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

/// ===== GLOBAL STYLES =====
import "./assets/styles/global.css";
import "./assets/styles/style.css";

// ===== COURSE THEME =====
import "./assets/styles/course/normalize.css";
import "./assets/styles/course/bootstrap.min.css";
import "./assets/styles/course/animate.min.css";
import "./assets/styles/course/style.css";
import "./assets/styles/course/responsive.css";
import "./assets/styles/course/color1.css";

// ===== REMOVED UNUSED CSS IMPORTS =====
// Removed: niceselect.css, owl.carousel.min.css, slicknav.min.css, 
// magnific-popup.css, jquery.fancybox.min.css, cube-portfolio.min.css,
// coursedetail.css, signup.css

// ===== FOOTER =====
import "./assets/styles/common/footer_style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
