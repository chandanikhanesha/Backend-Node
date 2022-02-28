import React from "react";
import "../assets/css/header.css";
import logo from "../assets/PNG/logo.png";
import profile from "../assets/PNG/profile.png";
import menu from "../assets/PNG/menu.png";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  let history = useHistory();
  return (
    <div>
      {/* <ul class="nav nav-pills">
        <img src={logo} className="logo_img"></img>
        <li class="nav-item nav_active">
          <NavLink class="nav-link active" to="/">
            Home
          </NavLink>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Services
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            our patner
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            blogs
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            About us
          </a>
        </li>

        <li class="nav-item">
          <button
            type="button"
            class="btn  login_btn"
            onClick={() => history.push("/login")}
          >
            <img src={profile} style={{ marginRight: "10px" }}></img>
            Login and Registration
          </button>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle language_btn"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            English
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
          </div>
        </li>
        <img src={menu} onClick={() => history.push("/register")}></img>
      </ul> */}
      <div className="topbar-area">
        <div class="container">
          <div class="row display-flex">
            <div class="col-lg-12">
              <div className="topbar-inner">
                <div className="left-area">
                  <ul>
                    <li>
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </li>
                  </ul>
                </div>
                <div className="right-area">
                  <ul>
                    <li>
                      <a href="/login">Login</a>
                      <span>/</span>
                      <a href="/register">Register</a>
                    </li>
                    <li>
                      <select className="select_language ">
                        <option selected>English (USA)</option>

                        <option value="1">Hindi</option>
                      </select>
                    </li>

                    <div className="btn-wrraper">
                      <a href="/appointment" class="boxed-text">
                        Schedule an Appointment
                      </a>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
