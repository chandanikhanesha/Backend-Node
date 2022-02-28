import React from "react";
import img5 from "../assets/images/img5.jpg";
function ImgCard() {
  return (
    <div>
      <div className="card featured-card ">
        <img src={img5} class="card-img-top card_img" alt="..." />
        <span className="card_btn">Music</span>
      </div>
    </div>
  );
}

export default ImgCard;
