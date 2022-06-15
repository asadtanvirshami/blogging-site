import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Grid from "@material-ui/core/Grid";
import { Recent } from "./Recent";

export const BlogFeedPage = ({ blogs }) => {
  const [bogList, setBlogList] = useState([]);
  const [showMore, setShowMore] = useState(false);


  useEffect(() => {
    setBlogList(blogs);
    
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
    <div className=" mt-5 container  ">
      <div className=" d-flex">
        <Row className="m-auto blog-main-page align-self-center">
          <Col className="wrapper">
            {bogList.map((bg, index) => {
              return (
                <div key={index} className=" main-card-div    ">
                    <Card style={{ width: "25rem" }} className="cards ">
                      <img className="blog-img img-fluid" src={bg.blogcover} />
                      <Card.Body>
                        <Card.Title>{bg.blogtitle}</Card.Title>
                        <Card.Text>
                          {parse(`${bg.posts.slice(0, 150)}...`)}
                          <a>Readmore</a>
                        </Card.Text>
                        <Form.Text muted>
                          by {bg.firstname} {bg.lastname}
                        </Form.Text>
                        <br />
                        <Form.Text muted>
                          Posted {moment(bg.createdAt).fromNow()}
                        </Form.Text>
                        <span style={{ float: "right" }}>
                          <FontAwesomeIcon icon={faHeart} className="like" />
                          <b className="likes-count">{bg.likes}</b>
                        </span>
                      </Card.Body>
                    </Card>
                </div>
              );
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BlogFeedPage;
