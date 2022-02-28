import React from "react";
import Slider from "react-slick";

import Card from "../Card";

import img5 from "../../assets/images/img5.jpg";
function OnlineCourse() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
  };
  return (
    <div>
      <div className="card-list-wrapper ">
        <div className="container ">
          <div className="row">
            <h2 className="title">online Courses</h2>
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
    </div>
  );
}

export default OnlineCourse;
