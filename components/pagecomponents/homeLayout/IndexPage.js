import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Recent } from "./Recent";

export const BlogFeedPage = ({ blogs }) => {
  const [bogList, setBlogList] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setBlogList(blogs);
    console.log(blogs)
    
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

  return (
    <div className=" mt-5   ">
      <div className=" d-flex">
        <Row className="m-auto blog-main-page align-self-center">
          <Col className="wrapper container">
            <Fragment>
            {bogList.map((bg, index) => {
              return (
                <div key={index} className=" main-card-div    ">
                  <Card className="cards ">
                    <img className="blog-img img-fluid" src={bg.blogcover} />
                    <Card.Body className="px-3 pt-4">
                      <Card.Title className="text-heading">{bg.blogtitle}</Card.Title>
                      <div className="">{parse(`${bg.posts.slice(0, 150)}...`)}</div>
                      <div className="row-main  ">
                        <div className="column-user mx-1 px-1">
                          <img className="blog-img-user " src={bg.pfpUser} />
                        </div>
                        <div className="column-user">
                          <p className="card-txt">
                            {bg.postedBy} <br />
                            <p>Posted {moment(bg.createdAt).fromNow()}</p>
                          </p>
                        </div>
                      </div>
                      <span style={{ float: "right" }}>
                        <FontAwesomeIcon icon={faHeart} className="like" />
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
  );
};

export default BlogFeedPage;
