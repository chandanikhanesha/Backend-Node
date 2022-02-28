import React from "react";
import "./landing.css";
import DigitalEvent from "../digitalEvent/DigitalEvent";

import FeaturedEvent from "../featuredEvent/FeaturedEvent";
import BrowseEvent from "../browseEvent/BrowseEvent";
import WorkShop from "../workshop/WorkShop";
import OnlineCourse from "../onlinecourse/OnlineCourse";
import Theater from "../theater/Theater";
import Comedy from "../comedy/Comedy";
import Health from "../health/Health";
import Event from "../eventThis/Event";
import Magazine from "../magazine/Magazine";
import Artist from "../artist/Artist";
import Venues from "../venues/Venues";
import SwipeImg from "../swipeimg/SwipeImg";

function Landing() {
  return (
    <div className="main_container">
      {/* <SwipeImg /> */}
      <DigitalEvent />
      <FeaturedEvent />
      <BrowseEvent />
      <WorkShop />
      <OnlineCourse />
      <Theater />
      <Comedy />
      <Health />
      <Event />
      <Magazine />
      <Artist />
      <Venues />
    </div>
  );
}

export default Landing;
