import React from "react";
import "./styles.scss";


function HamburgerMenu() {
  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-menu-main-content">
        <label>
          <input type="checkbox" />
          <span className="menu">
            <span className="hamburger" />
          </span>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contactus">Contact Us</a></li>
          </ul>
        </label>
      </div>
    </div>
  );
}

export default HamburgerMenu;