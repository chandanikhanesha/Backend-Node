import React from "react";
import CardImg from "./CardImg";
import { MDBContainer } from "mdbreact";
function RightSild() {
  const scrollContainerStyle = { height: "400px" };
  return (
    <div>
      <MDBContainer className="scrollbar scrollbar-primary  mt-5 mx-auto">
        <div style={scrollContainerStyle}>
          <CardImg />
          <CardImg />
          <CardImg />
        </div>
      </MDBContainer>
    </div>
  );
}

export default RightSild;
