import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Col, Row, Spinner, Card } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const GamePage = ({ blogs }) => {
  const [bogList, setBlogList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [load, setLoad] = useState([false]);

  useEffect(() => {
    setBlogList(blogs);
    setLoad(false);
  }, [bogList]);

  const likeLog = async (id, i) => {
    let like = false;
    // parse an array to find likes in local storage

    if (like) {
      // do nothibng
    } else {
      await axios
        .post(process.env.NEXT_PUBLIC_FP_LIKE_BLOGS, { id: id })
        .then((x) => {
          console.log(x.status);
          if (x.status === 200) {
            let tempState = [...bogList];
            tempState.forEach((x, index) => {
              if (index === i) {
                x.likes = x.likes + 1;
                console.log(x.likes);
              }
            });
            setBlogList(tempState);
          }
        });
    }
  };

  const renderData = () => {
    if (load == true) {
      return (
        <div className="ld text-center">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }
    return (
      <div className=" mt-5   ">
        <div className=" d-flex justify-content-center">
          <Row className="m-auto  blog-main-page ">
            <Col className="wrapper container mt-3">
              <Fragment>
                {bogList.map((bg, index) => {
                  return (
                    <div key={index} className=" main-card-div    ">
                      <Link href={"/blogs/" + bg.id} key={bg.id}>
                        <Card className="cards ">
                          <img
                            className="blog-img img-fluid"
                            src={bg.blogcover}
                          />
                          <Card.Body className="px-3 pt-4">
                            <Card.Title className="text-heading">
                              {bg.blogtitle}
                            </Card.Title>
                            <div className="card-txt">
                              {parse(`${bg.posts.slice(0, 150)}...`)}
                            </div>
                            <div className="row-main  ">
                              <div className="column-user ">
                                <img
                                  className="blog-img-user "
                                  src={bg.pfpUser}
                                />
                              </div>
                              <div className="column-user ">
                                <p className="card-txt px-2">
                                  {bg.postedBy} <br />
                                  Posted {moment(bg.createdAt).fromNow()}
                                </p>
                              </div>
                            </div>
                            <span style={{ float: "right" }}>
                              <FontAwesomeIcon
                                icon={faHeart}
                                className="like"
                              />
                              <b className="likes-count">{bg.likes}</b>
                            </span>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  );
                })}
              </Fragment>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  return renderData();
};

export default GamePage;
