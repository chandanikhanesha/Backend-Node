import React, { useState } from "react";

import TextBox from "./TextBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainContainer from "./MainContainer";
import Navbar from "./Navbar";
import RightSild from "./RightSild";
import Data from "../../data.json";
import Tag from "../../tag.json";

function ReactBootstrap() {
  const [Alldata, setAlldata] = useState(Data);
  const [alltags] = useState(Tag);

  const filteritem = (tagitem) => {
    const filterdata = Data.filter((itemele) => {
      return itemele.Tags.includes(tagitem);
    });
    setAlldata(filterdata);
    console.log(filterdata);
  };

  return (
    <div>
      <div className="main_page">
        <Navbar />
        <Container>
          <Row className="row">
            <Col xs={6} md={4}>
              <div className="first_grid">
                <TextBox alltags={alltags} filteritem={filteritem} />
              </div>
            </Col>
            <Col xs={10} md={5}>
              <div className="second_grid">
                <MainContainer Alldata={Alldata} />
              </div>
            </Col>

            <Col xs={4} md={3}>
              <div className="third_grid">
                <RightSild />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ReactBootstrap;
