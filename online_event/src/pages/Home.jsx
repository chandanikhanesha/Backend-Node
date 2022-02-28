import React from "react";
import Header from "../components/Header/Header";
import Subcsribe from "../components/Subscribe/Subcsribe";
import DiscoverEvents from "../components/DiscoverEvents/DiscoverEvents";
import Footer from "../components/Footer/Footer";
import Landing from "../components/Landing/Landing";

export default () => {
  return (
    <React.Fragment>
      <Header />
      <Landing />
      <Subcsribe />
      <DiscoverEvents />
      <Footer />
    </React.Fragment>
  );
};
