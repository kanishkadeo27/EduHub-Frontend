import "../../assets/styles/common/footer_style.css";

const CourseFooter = () => {
  return (
    <footer className="ftr-footer relative">
      {/* Background */}
      <div
        className="ftr-footer_background absolute inset-0"
        style={{ backgroundImage: "url(/image/footer/background.png)" }}
      />

      <div className="ftr-container relative z-10">
        <div className="ftr-row footer-row">
          <div className="ftr-col">
            <div className="ftr-footer_content">
              <div className="ftr-row">

                {/* About */}
                <div className="ftr-col-lg-3 ftr_col">
                  <div className="ftr-footer_section footer_about">
                    <div className="ftr-footer_logo_container">
                      <img
                        src="/image/footer/logo-trim-footer.png"
                        alt="EduHub"
                      />
                    </div>

                    <div className="ftr-footer_social">
                      <ul>
                        <li>
                          <a href="https://www.facebook.com/profile.php?id=100023224683482" target="_blank" rel="noreferrer">
                            <img src="/image/footer/facebook.png" alt="Facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="https://github.com/arehman1711" target="_blank" rel="noreferrer">
                            <img src="/image/footer/icons8-github-512.png" alt="GitHub" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/a.rehman1711/" target="_blank" rel="noreferrer">
                            <img src="/image/footer/instagram.png" alt="Instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/in/arehman1711" target="_blank" rel="noreferrer">
                            <img src="/image/footer/linkedin.png" alt="LinkedIn" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="ftr-col-lg-3 ftr_col">
                  <div className="ftr-footer_section ftr_contact">
                    <div className="ftr-footer_title">Contact Us</div>
                    <ul>
                      <li>Email: projectmail027@gmail.com</li>
                      <li>Phone: +91 6264547523</li>
                      <li>Address: Pune 411008, Maharashtra, India</li>
                    </ul>
                  </div>
                </div>

                {/* Menu */}
                <div className="ftr-col-lg-3 footer_col">
                  <div className="ftr-footer_section footer_links">
                    <div className="ftr-footer_title">Menu</div>
                    <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/search">Search</a></li>
                      <li><a href="/contact-us">Contact Us</a></li>
                      <li><a href="/courses">Courses</a></li>
                      <li><a href="/about">About</a></li>
                      <li><a href="/signup">Sign Up</a></li>
                    </ul>
                  </div>
                </div>

                {/* Mobile App */}
                <div className="ftr-col-lg-3 footer_col clearfix">
                  <div className="ftr-footer_section ftr-footer_mobile">
                    <div className="ftr-footer_title">Mobile App</div>
                    <div className="ftr-footer_mobile_content">
                      <a href="#">
                        <img src="/image/footer/mobile_1.png" alt="Mobile App 1" />
                      </a>
                      <a href="#">
                        <img src="/image/footer/mobile_2.png" alt="Mobile App 2" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="ftr-row copyright_row">
          <div className="ftr-col">
            <div className="ftr-copyright">
              <div className="ftr-cr_text">
                © {new Date().getFullYear()} EduHub. All rights reserved.
              </div>
              <ul className="ftr-cr_list">
                <li><a href="#">Copyright</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default CourseFooter;
