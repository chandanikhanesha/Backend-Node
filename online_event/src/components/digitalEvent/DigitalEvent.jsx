import React from "react";
import "../digitalEvent/digitalevent.css";
import art3 from "../../assets/images/art3.png";

function DigitalEvent() {
  return (
    <div className="digital_container">
      <div class="container">
        <div className="row">
          <h2 className="title">
            DISCOVER DIGITAL EVENTS
            <i class="fa fa-play-circle" aria-hidden="true" id="title_icon"></i>
          </h2>
        </div>
        <div className="row">
          <span className="subtitle">
            Join a live online event - learn, interact and be entertained.
          </span>
        </div>

        <div class="row">
          <div class="col-md-2 col-xs-6 col-sm-6">
            <img src={art3} className="art3"></img>
          </div>
          <div class="col-md-2 col-xs-6 col-sm-6">
            <img src={art3} className="art3"></img>
          </div>
          <div class="col-md-2 col-xs-6 col-sm-6">
            <img src={art3} className="art3"></img>
          </div>
          <div class="col-md-2 col-xs-6 col-sm-6">
            <img src={art3} className="art3"></img>
          </div>
          <div class="col-md-2 col-xs-6 col-sm-6">
            <img src={art3} className="art3"></img>
          </div>
          <div class="col-md-2 col-xs-6 col-sm-6">
            <img src={art3} className="art3"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalEvent;
