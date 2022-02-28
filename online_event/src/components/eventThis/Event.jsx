import React from "react";
import "./event.css";

function Event() {
  return (
    <div>
      <div className="card_list_wrapper">
        <div className="container ">
          <div className="row">
            <h2 className="title">EVENTS THIS WEEK</h2>
          </div>

          <div className="row">
            <div class="col weekend_list">
              <span className="week_title">Today </span>
              <span className="week_subtitle">Mon, 16 Aug </span>
            </div>
            <div class="col weekend_list">
              <span className="week_title">Tomorrow</span>
              <span className="week_subtitle">Tue, 17 Aug</span>
            </div>
            <div class="col weekend_list">
              <span className="week_title">Weekend</span>
              <span className="week_subtitle">121 – 22 Aug</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
