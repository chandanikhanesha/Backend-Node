import React from "react";
import subimg2 from "../assets/PNG/landingpg_img_2.png";
import subimg2_1 from "../assets/PNG/landingpg_img_3.png";

function SubContainer_2() {
  return (
    <div>
      <div className="sub_container2">
        <div className="sub2_head">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <h1>
                  Vituscare
                  <h1 style={{ color: "black" }}>professional doctors</h1>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div class="row">
            <div className="col-lg-6">
              <div className="left-content-area">
                <p className="sub2_text">
                  <b>Caring Health </b>is important
                  <br></br> Than All<br></br>
                  <h5 className="sub2_text2">
                    use can easily find the doctore threw this website it is
                    very good implemention to save the time hdfhi hjdfguy
                    bhuyhgj hjguyfgb hjvguygdsf hsgdfuysdgf sdchgdfsusdgj
                    bduyfcdho dbjfhidsu
                  </h5>
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div style={{ display: "flex" }}>
                  <img src={subimg2} className="subimg2" alt=""></img>
                  <img src={subimg2_1} className="subimg2_1" alt=""></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubContainer_2;
