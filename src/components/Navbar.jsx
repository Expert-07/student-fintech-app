import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HamburgerMenu from "./HamburgerMenu";

const fontAwesomeLink = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  return (
    <>
      {/* FontAwesome CDN */}
      <link rel="stylesheet" href={fontAwesomeLink} />
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
          {/* Hamburger menu for mobile */}
          <div className="md:hidden block">
            <HamburgerMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
