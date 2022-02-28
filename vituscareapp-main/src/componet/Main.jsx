import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import "../assets/css/main.css";
import subimg1 from "../assets/PNG/landingpg_img_1.png";
import subimg2 from "../assets/PNG/landingpg_img_2.png";
import subimg2_1 from "../assets/PNG/landingpg_img_3.png";
import subimg3 from "../assets/PNG/landingpg_img_4.png";
import addimg from "../assets/PNG/add_1.png";
import button from "../assets/PNG/Button.png";
import subimg3_1 from "../assets/PNG/landingpg_img_5.png";
import SubContainer_2 from "../pages/SubContainer_2";
import SubContainer_3 from "../pages/SubContainer_3";

import Footer from "./Footer";

function Main() {
  return (
    <div>
      <div className="main_container">
        <Header />
        <div className="sub_container1">
          <div className="main-content" id="home">
            <Navbar />
            {/* <div className="overlay"> */}
            <div className="container">
              <div className="banner-info text-left">
                <h3>Find a Doctor & Book Online</h3>
                <p className="my-3">
                  use can easily find the doctore threw this website it is very
                  good implemention to save the time
                </p>
                <div className="read-more-button">
                  <a href="/appointment" className="read-more scroll btn">
                    <i className="fa fa-plus-circle icon"></i> Make a
                    Appointment
                  </a>
                </div>
              </div>
              <div className="row mt-5 mb-5">
                <div className="col-sm-6 col-md-3 ">
                  <div className="card-sl">
                    <div className="card-heading">Our Services</div>
                    <div className="card-text">
                      our services is the best for time saving
                    </div>
                  </div>
                  <a href="/service">
                    {" "}
                    <img src={button} className="card-action" />
                  </a>
                </div>
                <div className="col-sm-6 col-md-3 ">
                  <div className="card-sl">
                    <div className="card-heading">Working Hours</div>
                    <div className="card-text">
                      Mon-Fri <br /> <b>8 AM- 8 AM</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* <div className="main_heading_container">
            <h1 className="main_heading">Find a Doctor & Book Online</h1>
            <h5 className="some_text">
              use can easily find the doctore threw this website it is very good
              implemention to save the time hdfhi hjdfguy bhuyhgj hjguyfgb
              hjvguygdsf hsgdfuysdgf sdchgdfsusdgj bduyfcdho dbjfhidsu
            </h5>
            <a href="/appointment" className="btn appointment_btn">
              <img src={addimg} className="addimg"></img>
              Make a Appointment
            </a>
            <div style={{ display: "flex" }}>
              <div className="box">
                <div className="box_data">
                  <span className="box_head">Our Services</span>
                  <p className="box_text">
                    our services is the best for time saving
                  </p>
                </div>
                <a href="/service">
                  <img src={button} className="arrowbtn"></img>
                </a>
              </div>
              <div className="box">
                <div className="box_data">
                  <span className="box_head">Working Hours</span>

                  <p className="box_text">
                    Mon-Fri<br></br>
                    <span className="box_time">8 AM- 8 AM</span>
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <SubContainer_2 />
        <SubContainer_3 />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
