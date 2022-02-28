import React from "react";
import img5 from "../assets/images/img5.jpg";

function Card() {
  return (
    <div>
      <div className="card featured-card ">
        <img src={img5} class="card-img-top card_img" alt="..." />
        <span className="card_btn">Music</span>
        <div>
          <div className="featured_name">
            <span>Casa BACARDÍ</span>
          </div>
          <span className="featured_date">August 21/6 AM</span>
          <span className="featured_venue ">online</span>
          <span className="featured_price  ">0 onwards</span>
          <div className="featured_footer">
            <i
              className="fa fa-youtube-play 
              featured_footericon"
              aria-hidden="true"
            ></i>
            <span>Enjoy this event from your home</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
