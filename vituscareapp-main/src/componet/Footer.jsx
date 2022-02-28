import React from "react";
import logo from "../assets/PNG/logo.png";
import footer from "../assets/PNG/facebook.png";
import linkd from "../assets/PNG/linkedin.png";
import twit from "../assets/PNG/twitter.png";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import DraftsIcon from "@material-ui/icons/Drafts";
import NearMeIcon from "@material-ui/icons/NearMe";
import recentpost from "../assets/recentpost.jpg";
import "../assets/css/footer.css";
function Footer() {
  return (
    // <div className="footer">
    //   <img src={logo} className="footer_logo"></img>
    //   <span>@2021 vituscare.All Rights Reserved</span>
    //   <img src={footer} className="fb_logo"></img>
    //   <img src={linkd} className="linkd_logo"></img>
    //   <img src={twit} className="twit_logo"></img>
    // </div>
    <div className="footer">
      <div className="footer_top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <h4 className="title">Sample</h4>

              <input
                type="email"
                class="form-control footer_input"
                placeholder="Your Email "
              />
              <div className="submit-btn ">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <img src={logo} className="footer_logo"></img>
              <p className="logo_p">
                Vituscare commits to providing a World Class Dialysis Management
                Program that focuses on improving the quality of life of
                individuals and their families. We offer quality services with
                state of art technology to achieve holistic care and well being
                of our guests. Our aim is to provide exemplary Kidney Care that
                is Available, Accessible & Affordable in India.
              </p>
            </div>
            <div class="col-lg-3 col-md-6">
              <h4 className="title">Recent Posts</h4>
              <div style={{ display: "flex" }}>
                <img src={recentpost} className="recentpost"></img>
                <p className="contact_info">
                  <a href="" className="a_link">
                    Top 20 VC's in France
                  </a>
                  <br></br>
                  <span style={{ fontSize: "14px" }}>Mon Aug 2021</span>
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <h4 className="title">Contact Info </h4>
              <div style={{ display: "flex" }}>
                <HomeIcon style={{ color: "#a68cc9" }}></HomeIcon>
                <p className="contact_info">
                  Vituscare Medlife Pvt. Ltd., Emaar Digital Green, Golf Course
                  Extn. Road, Tower B, Floor 11, Sector 61 Gurugram, Haryana -
                  122102
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <CallIcon style={{ color: "#a68cc9" }} />
                <p className="contact_info">8888855555</p>
              </div>
              <div style={{ display: "flex" }}>
                <DraftsIcon style={{ color: "#a68cc9" }} />
                <p className="contact_info">example@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright_area">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <span className="contact_info">
                © 2021 All right reserved by Erebor Cybernetics.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
