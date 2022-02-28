import React from "react";
import singer from "../../assets/images/singer.jpg";
import "./artist.css";

function Artist() {
  return (
    <div className="artist_conatiner">
      <div className="container">
        <div className="row">
          <h2 className="title">Artist</h2>
        </div>
        <div className="row">
          <div className="col">
            <img src={singer} className="singer"></img>
            <span className="round_name">Usha Uthup</span>
            <span className="round_subname">1 event</span>
          </div>
          <div className="col">
            <img src={singer} className="singer"></img>
            <span className="round_name">Usha Uthup</span>
            <span className="round_subname">1 event</span>
          </div>
          <div className="col">
            <img src={singer} className="singer"></img>
            <span className="round_name">Usha Uthup</span>
            <span className="round_subname">1 event</span>
          </div>
          <div className="col">
            <img src={singer} className="singer"></img>
            <span className="round_name">Usha Uthup</span>
            <span className="round_subname">1 event</span>
          </div>
          <div className="col">
            <img src={singer} className="singer"></img>
            <span className="round_name">Usha Uthup</span>
            <span className="round_subname">1 event</span>
          </div>
          <div className="col">
            <img src={singer} className="singer"></img>
            <br></br>
            <span className="round_name">Usha Uthup</span>
            <span className="round_subname">1 event</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
