import React from "react";
import "./subscribe.css";

export default () => {
  return (
    <section className="subscribe my-5">
      <div className="container ">
        <div className="row">
          <div className="col-md-7 subscribe-description px-5">
            <h4 className="subscribe-heading">
              Subscribe to receive our newsletter!
            </h4>
            <p className="subscribe-text">
              Find the best experiences happening out there in your city or
              enjoy handpicked content while sitting comfortably at home. Paytm
              Insider is your go-to place to figure out what to do today!
            </p>
          </div>
          <div className="col-md-5 px-4 subscribe-form-div">
            <h6 class="content-tuned text-center mt-4">
              Subscribe to receive our newsletter!
            </h6>
            <div class="input-group mt-5">
              <input
                type="email"
                class="form-control"
                placeholder="Enter email to subscribe"
              />
              <span class="input-group-btn">
                <button class="btn btn-subscribe" type="submit">
                  Submit
                </button>
              </span>
            </div>
            <div class="text-center mt-3 mb-4">
              <h5>
                Find us on:
                <button type="button" class="follow-icon-subscribe m-2">
                  <i className="fa fa-facebook"></i>
                </button>
                <button type="button" class="follow-icon-subscribe m-2">
                  <i className="fa fa-twitter"></i>
                </button>
                <button type="button" class="follow-icon-subscribe m-2">
                  <i className="fa fa-instagram"></i>
                </button>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
