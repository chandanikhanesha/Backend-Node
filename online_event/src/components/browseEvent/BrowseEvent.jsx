import React from "react";
import iconlist from "../../assets/images/iconlist.jpg";
import "./browse.css";

function BrowseEvent() {
  return (
    <div className="card_list_wrapper">
      <div className="container ">
        <div className="row">
          <h2 className="title">Browse events by genre</h2>
        </div>

        <div className="row">
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>

            <span className="icon_title">Workshop </span>

            <span className="icon_subtitle">157 events </span>
          </div>
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>
            <span className="icon_title">Online Courses</span>
            <span className="icon_subtitle">111 events</span>
          </div>
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>
            <span className="icon_title">Theatre & Arts</span>
            <span className="icon_subtitle">54 events</span>
          </div>
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>
            <span className="icon_title">Comedy</span>
            <span className="icon_subtitle">47 events</span>
          </div>
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>
            <span className="icon_title">Health & Wellness</span>
            <span className="icon_subtitle">31 events</span>
          </div>
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>
            <span className="icon_title">Kids</span>
            <span className="icon_subtitle">24 events</span>
          </div>
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>
            <span className="icon_title">Music</span>
            <span className="icon_subtitle">24 events</span>
          </div>
          <div class="col iconcard_list">
            <img src={iconlist} className="iconlist" alt=""></img>
            <span className="icon_title">Art&Craft</span>
            <span className="icon_subtitle">17 events</span>
          </div>
        </div>
        <div className="row">
          <button className="show_btn">show more</button>
        </div>
      </div>
    </div>
  );
}

export default BrowseEvent;
