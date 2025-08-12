import React, { useEffect, useState } from "react";
import "../css/Landing.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HamburgerMenu from "./HamburgerMenu";
// FontAwesome CDN for icons
const fontAwesomeLink = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    // Navbar scroll effect and back-to-top
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      const backToTop = document.querySelector(".back-to-top");
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Back to top
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
      backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* FontAwesome CDN */}
      <link rel="stylesheet" href={fontAwesomeLink} />
      {/* Main Styles moved to Landing.css */}

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="logo">
            <i className="fas fa-graduation-cap"></i>
            <span className="ske">Student</span><span className="mart">Assist</span>
          </a>
          <ul className={`nav-links${menuOpen ? " active" : ""}`}>
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/edtech" className="nav-link">Features</a></li>
            <li><a href="" className="nav-link">Pricing</a></li>
            <li><a href="" className="nav-link">Contact</a></li>
          <div className="nav-buttons">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              style={{ display: 'inline-block' }}
            >
              <Link to="/login" className="btn" style={{height:'44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Login</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              style={{ display: 'inline-block', marginLeft: '0.5rem' }}
            >
              <Link to="/register" className="btn" style={{height:'44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sign Up</Link>
            </motion.div>
          </div>
          </ul>
          <div className="md:hidden block">
            <HamburgerMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ marginTop: '80px' }}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Transform Your <span>Academic Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            All-in-one platform for managing your studies, finances, and personal growth as a student
          </motion.p>
          <div className="cta-buttons">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            >
              <Link to="/register" className="btn" aria-label="Sign up for StudentAssist" style={{ textDecoration: 'none' }}>Get Started</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              style={{ display: 'inline-block' }}
            >
              <button className="btn btn-outline" type="button">Explore Features</button>
            </motion.div>
          </div>
          <div style={{ marginTop: "3rem" }}>
            <i className="fas fa-arrow-down floating" style={{ fontSize: "2.5rem", color: "rgba(255,255,255,0.8)" }}></i>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our <span>Features</span>
          </motion.h2>
          <div className="feature-cards">
            <div className="card slide-in">
              <Link to="/edtech" className="card-link">

              <i className="fas fa-book"></i>
              <h3>Academic Planner</h3>
              <p>Organize your courses, track reading progress, and manage assignments with our powerful academic tools.</p>
            </Link>

            </div>
            <div className="card slide-in">
              <i className="fas fa-wallet"></i>
              <h3>Finance Tracker</h3>
              <p>Manage your budget, track expenses, and set savings goals to maintain financial stability.</p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                style={{ display: 'inline-block' }}
              >
                <Link to="/finance" className="btn btn-primary mt-2">Go to Finance Tracker</Link>
              </motion.div>
            </div>
            <div className="card slide-in">
              <i className="fas fa-chart-line"></i>
              <h3>Progress Analytics</h3>
              <p>Visualize your academic and financial progress with detailed charts and insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ background: "var(--card-bg)" }}>
        <div className="container">
          <motion.h2
            className="testimonials"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            What Students <span>Say</span>
          </motion.h2>
          <div className="row justify-content-center">
            <div className="col-md-8 flex">
              <div className="card">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" className="rounded-circle me-3" width="60" height="60" alt="Student" />
                  <div>
                    <h4 className="mb-0">Sarah Johnson</h4>
                    <p className="text-muted mb-0">Computer Science Major</p>
                  </div>
                </div>
                <p>"StudentAssist completely transformed how I manage my studies and finances. The reading planner helped me stay on track with my textbooks, and the finance tracker saved me from overspending!"</p>
                <div className="mt-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
              </div>

                            <div className="card">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" className="rounded-circle me-3" width="60" height="60" alt="Student" />
                  <div>
                    <h4 className="mb-0">Sarah Johnson</h4>
                    <p className="text-muted mb-0">Computer Science Major</p>
                  </div>
                </div>
                <p>"StudentAssist completely transformed how I manage my studies and finances. The reading planner helped me stay on track with my textbooks, and the finance tracker saved me from overspending!"</p>
                <div className="mt-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
              </div>

                            <div className="card">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" className="rounded-circle me-3" width="60" height="60" alt="Student" />
                  <div>
                    <h4 className="mb-0">Sarah Johnson</h4>
                    <p className="text-muted mb-0">Computer Science Major</p>
                  </div>
                </div>
                <p>"StudentAssist completely transformed how I manage my studies and finances. The reading planner helped me stay on track with my textbooks, and the finance tracker saved me from overspending!"</p>
                <div className="mt-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}>
        <div className="container">
          <motion.h2
            style={{ color: "white" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ready to Transform Your Student Life?
          </motion.h2>
          <p className="mb-4" style={{ maxWidth: 600, margin: "0 auto", color: "rgba(255,255,255,0.9)" }}>
            Join thousands of students who are already achieving academic and financial success with StudentAssist.
          </p>
          <motion.a
            href="#"
            className="btn"
            style={{ background: "#121212", color: "var(--primary)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            Create Your Free Account
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="logo mb-3">
                <i className="fas fa-graduation-cap"></i>
                <span className="ske">Student</span><span className="mart">Assist</span>
              </div>
              <p>The all-in-one platform for academic success and financial management.</p>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <h5>Features</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-muted">Academic Planner</a></li>
                <li><Link to="/finance" className="text-decoration-none text-muted">Finance Tracker</Link></li>
                <li><a href="#" className="text-decoration-none text-muted">Goal Setting</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Progress Reports</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h5>Resources</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-muted">Blog</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Tutorials</a></li>
                <li><a href="#" className="text-decoration-none text-muted">FAQs</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Support</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Newsletter</h5>
              <p>Subscribe to get tips and updates on student success.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Your email" style={{ background: "var(--card-bg)", border: "1px solid #2d2d2d", color: "var(--text-color)" }} />
                <motion.button
                  className="btn btn-primary"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
          <hr style={{ borderColor: "#2d2d2d" }} />
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">&copy; 2025 StudentAssist. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="#" className="text-decoration-none text-muted me-3">Privacy Policy</a>
              <a href="#" className="text-decoration-none text-muted">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <a href="#" className="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </a>
    </>
  );
};

export default LandingPage;