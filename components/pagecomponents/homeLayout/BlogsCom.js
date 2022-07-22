import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Spinner, Col, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";

const BlogsCom = ({ blogs }) => {
  const [bogList, setBlogList] = useState([]);
  const [load, setLoad] = useState(false);
  // useEffect(() => {
  //   // setBlogList(blogs);
  //   setLoad(false);
  // }, [bogList]);

  useEffect(() => {
    setBlogList(blogs)
    setLoad(blogs)
  }, []);

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
    if (load != false) {
      return (
        <div className="ld text-center mt-5">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }
  return (
    <div>
      <div className=" mt-5   ">
        <div className=" d-flex">
          <Row className="m-auto  blog-main-page align-self-center">
            <Col className="wrapper container mt-3">
              <Fragment>
                {blogs.map((bg, index) => {
                  return (
                    <div key={index} className=" main-card-div    ">
                        <Card className="cards ">
                          <img
                            className="blog-img img-fluid"
                            src={bg.blogcover}
                            />
                          <Card.Body className="px-3 pt-4">
                      <Link href={"/blogs/" + bg.id} key={bg.id}>
                            <Card.Title className="text-heading">
                              {bg.blogtitle}
                            </Card.Title>
                            </Link>
                            <div className="card-txt">
                              {parse(`${bg.posts.slice(0, 150)}...`)}
                            </div>
                            <div className="row-main  ">
                              <div className="column-user ">
                                <img
                                  className="blog-img-user "
                                  src={bg.User.pfp}
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
                    </div>
                  );
                })}
              </Fragment>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
return renderData();
};
export default BlogsCom;
