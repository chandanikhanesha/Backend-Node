import React from "react";
import "../assets/css/navbar.css";
import logo from "../assets/PNG/logo.png";
import profile from "../assets/PNG/profile.png";
import menu from "../assets/PNG/menu.png";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default () => {
  let history = useHistory();
  return (
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light">
        <a className="navbar-brand" href="#">
          <img src={logo} className="logo_img"></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav menu_container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="/service">
                  Services
                </a>
                <button
                  type="button"
                  className="btn dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/appointment">
                    Appointment
                  </a>
                  <a className="dropdown-item" href="/quote">
                    Quote
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="/blog">
                  Blog
                </a>
                <button
                  type="button"
                  className="btn dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/case-study">
                    Case Study
                  </a>
                  <a className="dropdown-item" href="/knowledgebase">
                    Knowledge Base
                  </a>
                  <a className="dropdown-item" href="/faq">
                    F.A.Q
                  </a>
                  <a className="dropdown-item" href="/career">
                    Careers
                  </a>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link" href="/about">
                  About Us
                </a>
                <button
                  type="button"
                  className="btn dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/clients-feedback">
                    Clients Feedback
                  </a>
                  <a className="dropdown-item" href="/testimonial">
                    Testimonial
                  </a>
                  <a className="dropdown-item" href="/team">
                    Team
                  </a>
                  <a className="dropdown-item" href="/contact">
                    Contact
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

// <div className="container d-flex align-items-center nav-menu">
//   <div className="logo_container">
//     <img src={logo} className="logo_img"></img>
//   </div>
//   <div className="menu_container">
//     <ul className="nav nav-pills">
//       {/* <img src={logo} className="logo_img"></img> */}
//       <li className="nav-item">
//         <a className="nav-link" href="/home">
//           Home
//         </a>
//       </li>

//       <li className="nav-item dropdown">
//         <a
//           className="nav-link dropdown-toggle"
//           data-toggle="dropdown"
//           href="/service"
//           role="button"
//           aria-haspopup="true"
//           aria-expanded="false"
//         >
//           Services
//         </a>
//         <div className="dropdown-menu">
//           <a className="dropdown-item" href="/appointment">
//             Appointment
//           </a>
//           <a className="dropdown-item" href="/quote">
//             Quote
//           </a>
//         </div>
//       </li>
//       <li className="nav-item dropdown">
//         <a
//           className="nav-link dropdown-toggle"
//           data-toggle="dropdown"
//           href="/blog"
//           role="button"
//           aria-haspopup="true"
//           aria-expanded="false"
//         >
//           Blog
//         </a>
//         <div className="dropdown-menu">
//           <a className="dropdown-item" href="/case-study">
//             Case Study
//           </a>
//           <a className="dropdown-item" href="/knowledgebase">
//             Knowledge Base
//           </a>
//           <a className="dropdown-item" href="/faq">
//             F.A.Q
//           </a>
//           <a className="dropdown-item" href="/career">
//             Careers
//           </a>
//         </div>
//       </li>
//       <li className="nav-item dropdown">
//         <a
//           className="nav-link dropdown-toggle"
//           data-toggle="dropdown"
//           href="/about"
//           role="button"
//           aria-haspopup="true"
//           aria-expanded="false"
//         >
//           About Us
//         </a>
//         <div className="dropdown-menu">
//           <a className="dropdown-item" href="/clients-feedback">
//             Clients Feedback
//           </a>
//           <a className="dropdown-item" href="/testimonial">
//             Testimonial
//           </a>
//           <a className="dropdown-item" href="/team">
//             Team
//           </a>
//           <a className="dropdown-item" href="/contact">
//             Contact
//           </a>
//         </div>
//       </li>
//       {/* <li className="nav-item dropdown">
//         <a
//           className="nav-link dropdown-toggle"
//           data-toggle="dropdown"
//           href="#"
//           role="button"
//           aria-haspopup="true"
//           aria-expanded="false"
//         >
//           our patner
//         </a>
//         <div className="dropdown-menu">
//           <a className="dropdown-item" href="#">
//             Action
//           </a>
//         </div>
//       </li>
//       <li className="nav-item dropdown">
//         <a
//           className="nav-link dropdown-toggle"
//           data-toggle="dropdown"
//           href="#"
//           role="button"
//           aria-haspopup="true"
//           aria-expanded="false"
//         >
//           blogs
//         </a>
//         <div className="dropdown-menu">
//           <a className="dropdown-item" href="#">
//             Action
//           </a>
//         </div>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">
//           About us
//         </a>
//       </li> */}
//     </ul>
//   </div>
// </div>
