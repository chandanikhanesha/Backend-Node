import React from "react";
import button from "../assets/PNG/Button.png";
import subimg3_1 from "../assets/PNG/landingpg_img_5.png";
import subimg3 from "../assets/PNG/landingpg_img_4.png";
function SubContainer_3() {
  return (
    <div>
      <div className="sub_container3">
        <div className="container">
          <div className="row ">
            <div className="col-lg-5 col-sm-6 col-md-3">
              <div className="sub3_head">
                <h1 className="sub3_headtext">
                  <b style={{ color: "black" }}> Make an </b>
                  Appointment
                  <h5 className="sub2_text2">
                    use can easily find the doctore threw this website it is
                    very good implemention to save the time hdfhi hjdfguy
                    bhuyhgj
                  </h5>
                  <a href="/service" alt="">
                    {" "}
                    <button type="button" class="btn appointment_btn">
                      Choose Service
                    </button>
                  </a>
                </h1>
                <div className="rec_container">
                  <img src={subimg3_1} className="subimg3_1" alt=""></img>
                  <a href="/appointment" className="rec_arrow" alt="">
                    <img src={button} alt=""></img>
                  </a>
                  <div className="rectangle">
                    <h1 className="rec_text">
                      Get more information about this schedule
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-sm-6 col-md-3">
              <img src={subimg3} className="subimg3" alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubContainer_3;
