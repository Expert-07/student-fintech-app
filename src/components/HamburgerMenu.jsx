import React from "react";

const HamburgerMenu = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className={`hamburger${isOpen ? " open" : ""}`}
      aria-label="Toggle navigation menu"
      onClick={() => setIsOpen(!isOpen)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <span className="bar" style={{ display: 'block', width: 25, height: 3, background: '#00ffff', margin: '5px 0', borderRadius: 2, transition: '0.3s' }}></span>
      <span className="bar" style={{ display: 'block', width: 25, height: 3, background: '#00ffff', margin: '5px 0', borderRadius: 2, transition: '0.3s' }}></span>
      <span className="bar" style={{ display: 'block', width: 25, height: 3, background: '#00ffff', margin: '5px 0', borderRadius: 2, transition: '0.3s' }}></span>
    </button>
  );
};

export default HamburgerMenu;
