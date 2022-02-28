import React from "react";
import addbtn2 from "../assets/PNG/add_2.png";

function RegisterForm() {
  return (
    <div>
      <div class="container ">
        <div class="row">
          <div class="col">
            <div className="register_form">
              <form>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Age" />
                  </div>
                  <div class="col">
                    <select
                      class="form-control "
                      aria-label="Default select example"
                    >
                      <option selected>Gender</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <select
                      class="form-control "
                      aria-label="Default select example"
                    >
                      <option selected>Occupation</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="col">
                    <select
                      class="form-control "
                      aria-label="Default select example"
                    >
                      <option selected>State</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <select
                      class="form-control "
                      aria-label="Default select example"
                    >
                      <option selected>City</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="col">
                    <select
                      class="form-control "
                      aria-label="Default select example"
                    >
                      <option selected>Package Time</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email id"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mobile Number"
                    />
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <span className="add2_text">
                    <img src={addbtn2} className="addbtn2"></img>
                    Add patient
                  </span>
                  <span className="add2_text">
                    <img src={addbtn2} className="addbtn2"></img>Add Caretaker
                  </span>
                </div>

                <button type="button" class="btn register_btn">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
