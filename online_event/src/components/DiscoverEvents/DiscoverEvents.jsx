import React from "react";

import "./discover-events.css";

import DownloadOnAppStore from "../../assets/images/download-on-app-store.png";
import DownloadOnPlayStore from "../../assets/images/download-on-play-store.png";

export default () => {
  return (
    <section className="discover-events-section py-5">
      <div class="container">
        <div class="row flex-column-reverse flex-md-row">
          <div className="col-md-4 py-5">
            <h3 className="discover-evnts-heading">Discover Digital Events</h3>
            <p className="discover-evnts-description mb-5">
              We bring you online experiences to make sure you've got an
              exciting plan every day. <br />
              <br />
              Bake a cake, get in some yoga, and stay entertained with digital
              events on the Paytm Insider app.
            </p>
            <div className="download-from mt-4">
              <img
                src={DownloadOnAppStore}
                className="download-from-svg mr-2"
              />
              <img src={DownloadOnPlayStore} className="download-from-svg" />
            </div>
          </div>
          <div className="col-md-8">
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/j8aC6ZUpghY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
