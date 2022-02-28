import React from "react";
import logo from "../assets/PNG/logo.png";
import "../assets/css/register.css";
import male from "../assets/PNG/register_img_1.png";
import patient from "../assets/PNG/Patient.png";
import caregiver from "../assets/PNG/Caregiver.png";
import doctor from "../assets/PNG/Doctor.png";
import chemist from "../assets/PNG/Chemist.png";
import RegisterForm from "../pages/RegisterForm";
function Register() {
  return (
    <div>
      <div class="register_container">
        <div class="row">
          <div class="col-5 img_grid">
            <img src={logo} className="register_logo" alt="" />
            <br></br>
            <img src={male} className="register_img"></img>
          </div>
          <div class="col register_grid ">
            <div className="textborder">
              <h1 className="register_text">Register Now </h1>
              <button type="button" className="exits_user">
                <span>
                  Existing User?
                  <b style={{ color: "red" }}> Login</b>
                </span>
              </button>
            </div>

            <div class="container smallbox_container">
              <div class="row display-flex">
                <h5 className="choose_text">Choose User Type</h5>
                <div class=" smallbox">
                  <img src={patient} className="patient_img"></img>

                  <span className="img_text">Patient</span>
                </div>
                <div class="smallbox ">
                  <img src={caregiver} className="caregiver_img"></img>
                  <span className="img_text">Caregiver</span>
                </div>
                <div class="smallbox  ">
                  <img src={doctor} className="doctor_img"></img>
                  <span className="img_text">Doctor</span>
                </div>
                <div class="smallbox ">
                  <img src={chemist} className="chemist_img"></img>
                  <span className="img_text">Chemist</span>
                </div>
              </div>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
