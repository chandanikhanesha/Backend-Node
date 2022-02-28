import React from "react";
import Slider from "react-slick";

import Card from "../Card";

import "./featuredevent.css";

function FeaturedEvent() {
  const settings = {
    className: "center",

    centerPadding: "60px",
    slidesToShow: 4,
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
    <div className="card-list-wrapper ">
      <div className="container ">
        <div className="row">
          <h2 className="title">FEATURED EVENTS</h2>
        </div>

        <div className="card_Carousel">
          <Slider {...settings}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default FeaturedEvent;
