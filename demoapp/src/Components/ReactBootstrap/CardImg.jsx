import React from "react";
import img from "../image/adimage(1).jpg";

import Carousel from "react-bootstrap/Carousel";

function CardImg() {
  return (
    <div>
      <Carousel className="row">
        <Carousel.Item>
          <div className="img_grid">
            <img src={img} alt="" className="onlyimg" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img_grid">
            <img src={img} alt="" className="onlyimg" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CardImg;
