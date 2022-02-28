import React from "react";
import cake from "../../assets/images/cake.jpg";
import "./venues.css";
function Venues() {
  return (
    <div className="venues_container">
      <div className="container">
        <div className="row">
          <h2 className="title">Venues</h2>
        </div>
        <div className="row">
          <div className="box">
            <img src={cake} className="boximg"></img>
            <span className="round_name">Garv's Comedy Buffet</span>
            <span className="round_subname">15 event</span>
          </div>
          <div className="box">
            <img src={cake} className="boximg"></img>
            <span className="round_name">The Zwende Space</span>
            <span className="round_subname">1 event</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venues;
