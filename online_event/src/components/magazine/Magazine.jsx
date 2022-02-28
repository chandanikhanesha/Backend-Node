import React from "react";
import Slider from "react-slick";
import ImgCard from "../ImgCard";
function Magazine() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
  };
  return (
    <div>
      <div className="card-list-wrapper ">
        <div className="container ">
          <div className="row">
            <h2 className="title">Magazine</h2>
          </div>

          <div className="card_Carousel">
            <Slider {...settings}>
              <ImgCard />
              <ImgCard />
              <ImgCard />
              <ImgCard />
              <ImgCard />
              <ImgCard />
              <ImgCard />
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Magazine;
