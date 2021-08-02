import React from "react";
import Container from "react-bootstrap/Container";
import img from "../image/king.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import heal from "../image/heal.svg";
import damage from "../image/damage.svg";
import gift from "../image/gift.svg";
import share from "../image/share.svg";

import TimeAgo from "timeago-react";
import ErrorBox from "./ErrorBox";

function MainContainer(props) {
  return (
    <div>
      {props.Alldata.map((post, i) => {
        return (
          <div key={i}>
            <Container>
              <Row className="row">
                <Col xs={12} md={12} className="main_grid">
                  <div>
                    <div className="d-flex mt-4">
                      <img
                        alt=""
                        src={post.avatar}
                        className="user-image"
                      ></img>
                      <div className="ml-2 w-100">
                        <div className="card-text mb-0">
                          {post.posterName}
                          <img alt="" src={img} />
                          <div>
                            <span className="ml-1 f-12 text-muted font-weight-bold">
                              <TimeAgo
                                datetime={post.dateTimeOfPost}
                                locale="zh_en"
                              />
                            </span>
                          </div>
                          <div className="maincard">
                            <div className="d-flex w-25 mb-1">
                              {post.Tags.map((item, i) => (
                                <span key={i} className="span-main-text">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="ml-29">
                            <h6 className="card-title text-white">
                              {post.postDescription}
                            </h6>
                            <img
                              alt=""
                              src={post.media}
                              className="feed-img"
                            ></img>
                          </div>
                          <div className="d-flex mt-2 cardicon">
                            <div className="custom-icons mr-2 ">
                              <img alt="" src={heal} />
                            </div>
                            <div className="custom-icons mr-2 ">
                              <img alt="" src={damage} />
                            </div>
                            <div className="custom-icons mr-2 ">
                              <img alt="" src={gift} />
                            </div>
                            <div className="custom-icons mr-2">
                              <img alt="" src={share} />
                            </div>
                          </div>
                          <div className="mt-2 d-flex border-top border-muted align-items-center cardborder">
                            <div className="mr-auto d-flex">
                              <div>
                                <strong>{post.like}</strong>
                                <span className="ml-1 f-12 text-muted font-weight-bold">
                                  Healing
                                </span>
                              </div>
                              <div className="ml-2">
                                <strong>{post.dislike}</strong>
                                <span className="ml-1 f-12 text-muted font-weight-bold">
                                  Damage
                                </span>
                              </div>
                              <div className="ml-2">
                                <strong>{post.comments.length}</strong>
                                <span className="ml-1 f-12 text-muted font-weight-bold">
                                  Comments
                                </span>
                                <br></br>
                              </div>
                            </div>
                          </div>

                          {post.comments.map((comments, i) => {
                            return (
                              <div key={i} className="comment">
                                <span>
                                  {comments.who}
                                  <span className="ml-1 f-12 text-muted font-weight-bold">
                                    <TimeAgo
                                      datetime={comments.createdAt}
                                      locale="zh_en"
                                    />
                                  </span>
                                </span>
                                <br></br>
                                <span className="ml-1 f-12 text-muted font-weight-bold">
                                  {comments.comment}
                                  <br></br>
                                </span>
                              </div>
                            );
                          })}
                          <ErrorBox postid={post._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
    </div>
  );
}

export default MainContainer;
