import React from "react";
import ImgCard from "../ImgCard";
import Slider from "react-slick";
import "./swipeimg.css";

function SwipeImg() {
  const settings = {
    slidesToShow: 2,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="swipe_container">
        <div className="demo">
          <Slider {...settings}>
            <ImgCard />
            <ImgCard />
            <ImgCard />
            <ImgCard />
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default SwipeImg;
