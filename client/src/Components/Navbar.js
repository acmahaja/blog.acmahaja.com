import React from "react";

import { NavLink } from "react-router-dom";

import "../css/Components/Navbar.css";
import "../css/Components/Light/Navbar.css";
import "../css/Components/Dark/Navbar.css";

export default function Navbar() {
  return (
    <nav className="Navbar">
      <div className="Accent"></div>
      <div className="collapse Content">
        <ul className="nav">
          <li className="nav-link">                
              <NavLink to="home" /> Home <NavLink />
          </li>
          <li className="nav-link">                
              <NavLink to="about" /> About <NavLink />
          </li>
          <li className="nav-link">                
              <NavLink to="categories" /> Categories <NavLink />
          </li>
        </ul>
        <div className="brand">
            <b>blog@</b>acmahaja
        </div>
        <div className="helper-tools">
            <form action="">
                <input type="text" name="search" id="search" placeholder="Search Articles" />
                <button data-icon="search"></button>
            </form>
            <button data-icon="settings"></button>
        </div>
      </div>
    </nav>
  );
}
