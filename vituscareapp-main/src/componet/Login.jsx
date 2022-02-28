import React from "react";
import logo from "../assets/PNG/logo.png";
import male from "../assets/PNG/register_img_1.png";
import { useHistory } from "react-router-dom";
import "../assets/css/login.css";
import patient from "../assets/PNG/Patient.png";
import caregiver from "../assets/PNG/Caregiver.png";
import doctor from "../assets/PNG/Doctor.png";
import chemist from "../assets/PNG/Chemist.png";

function Login() {
  let history = useHistory();
  return (
    <div className="login_container">
      <img src={logo} className="loginlogo" alt="" />
      <div className="login_page">
        <img src={male} className="maledoc"></img>

        <div className="side_border"></div>
        <h1 className="login_head">
          welcome back !<br></br>
          <h2 style={{ fontWeight: "bold" }}>Login </h2>
        </h1>
        <div className="login_box">
          <h5 className="num_text">Choose User Type</h5>
          <div className="container">
            <div className="row display-flex">
              <div className=" smallbox">
                <img src={patient} className="patient_img"></img>

                <span className="img_text">Patient</span>
              </div>
              <div className="smallbox ">
                <img src={caregiver} className="caregiver_img"></img>
                <span className="img_text">Caregiver</span>
              </div>
              <div className="smallbox  ">
                <img src={doctor} className="doctor_img"></img>
                <span className="img_text">Doctor</span>
              </div>
              <div className="smallbox ">
                <img src={chemist} className="chemist_img"></img>
                <span className="img_text">Chemist</span>
              </div>
            </div>
          </div>
          <span className="num_text">enter your phone number</span>
          <br></br>
          <div style={{ display: "flex" }}>
            <select
              className="form-select select_num"
              aria-label="Default select example"
            >
              <option selected>+ 91</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <input
              type="text"
              className="form-control mobile_input "
              placeholder="Mobile Number"
            />
          </div>

          <button type="button" className="btn loginbtn">
            Login
          </button>
        </div>
      </div>

      <button
        type="button"
        className="last_text"
        onClick={() => history.push("/register")}
      >
        <span>
          Haven't Register yet?
          <b style={{ color: "red" }}> Registor Now</b>
        </span>
      </button>
    </div>
  );
}

export default Login;
