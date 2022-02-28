import React from "react";

import "./header.css";

import logo from "../../assets/images/logo.png";

export default () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      {/* <a className="navbar-brand" href="#"> */}
      <img
        src={logo}
        className="navbar-logo px-3"
        alt="logo"
        style={{ maxWidth: "10%" }}
      />
      {/* </a> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-bars"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item px-2">
            <a className="nav-link" href="#">
              Popular Events
            </a>
          </li>
          <li className="nav-item px-2">
            <a className="nav-link" href="#">
              Free Events
            </a>
          </li>
          <li className="nav-item px-2">
            <a className="nav-link" href="#">
              Today's event
            </a>
          </li>
        </ul>

        <div class="form-inline my-2 my-lg-0 nav-buttons">
          <button class="btn btn-outline-nav mr-2" type="submit">
            Corporate Events
          </button>
          <button class="btn btn-outline-nav mr-2" type="submit">
            List your event
          </button>
          <button class="btn btn-outline-nav mr2" type="submit">
            We are hiring!
          </button>
          <div class="form-inline ml-4 my-lg-0 nav-icons">
            <a class="nav-link p-2 mr-3" href="#">
              <i className="fa fa-heart nav-link-icon"></i>
            </a>
            <a class="nav-link p-2 mr-3" href="#">
              <i className="fa fa-search nav-link-icon"></i>
            </a>
            <a class="nav-link p-2 mr-3" href="#">
              <i className="fa fa-user nav-link-icon"></i>
            </a>
            <a class="nav-link p-2" href="#">
              <i className="fa fa-map-marker nav-link-icon"></i>
              <span> Online</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
