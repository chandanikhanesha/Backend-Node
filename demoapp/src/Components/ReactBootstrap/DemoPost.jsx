import React, { useState } from "react";
import Navbar from "./Navbar";
import postdata from "./leagues.json";
function DemoPost() {
  const [data2, setdata2] = useState(postdata);
  return (
    <div>
      <div className="main_page">
        <Navbar />
        <div className="container tournament-page-1 mt-5">
          {/* make outer grid*/}
          <h4 className="tournament-title">Popular Leagues</h4>
          <div className="tournament-container">
            {data2.length > 0 ? (
              data2.map((data) => (
                <div className="tournament-container">
                  <img
                    className="tournamentimg"
                    src={data.posterImage}
                    alt="Card image cap"
                  />
                  <div className="tournament-body p-2">
                    <span className="tournament-time">{data.date}</span>
                    <br></br>
                    <span className="text-uppercase mb-0">{data.gameName}</span>
                    <h5 className="text-uppercase mb-0">{data.title}</h5>
                    <div className="upcoming-tournament-details">
                      <img src="../assets/img/prize_pool.svg" alt="" />
                      <span>280k</span>
                      <img src="../assets/img/play_mode.svg" alt="" />
                      <span>5v5</span>
                      <img src="../assets/img/platform.svg" alt="" />
                      <span>pc</span>
                      <img src="../assets/img/players.svg" alt="" />
                      <span>4 groups</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div> No tournament </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoPost;
