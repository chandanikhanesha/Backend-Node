import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar sticky-top navbar-light justify-content-center">
        <NavLink className="navlink" to="/">
          Feed
        </NavLink>
        <NavLink className="navlink" to="/change">
          Tournament
        </NavLink>
        <NavLink className="navlink" to="/login">
          Login
        </NavLink>

        <NavLink className="navlink" to="/signup">
          Sign Up
        </NavLink>

        <NavLink className="navlink" to="/login">
          Log Out
        </NavLink>
        <NavLink className="navlink" to="/map">
          Location
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
