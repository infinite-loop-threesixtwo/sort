import React from "react";
import './navbar.css';

function Navbar() {
  return (
    <nav>
      <a href="/sort">
        <span className="nav-link">Home</span>
      </a>
      <a href="bubble">
        <span className="nav-link">Bubble Sort</span>
      </a>
      <a href="thirdlargest">
        <span className="nav-link">Third Largest</span>
      </a>
      <a href="merge">
        <span className="nav-link">Merge Sort</span>
      </a>
      <a href="maxsub">
        <span className="nav-link">Max Subarray</span>
      </a>
    </nav>
  );
}

export default Navbar;