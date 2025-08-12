import React from "react";
import "../css/Preloader.css";

export default function Preloader() {
  return (
    <div className="preloader-bg">
      <div className="preloader-orb">
        <div className="preloader-glow"></div>
        <div className="preloader-dot"></div>
      </div>
      <div className="preloader-text">Student Assist</div>
    </div>
  );
}
