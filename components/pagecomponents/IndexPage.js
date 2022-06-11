import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ban from "../../public/headban.png";

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
    <div className=" mt-5 ">
      {/* <div className="container main-top  mt-5 ">
        <div className=" mx-auto ">
          <div className="row">
            <div className="mx-auto mt-5">
              <div className="row ">
                <div className="col-md-6 ban-div px-4 pt-5 mb-4 ">
                  <span className="ban-span   ">
                    Welcome to <span className="ban-h ">BlogNow.</span>
                  </span>

                  <p className="ban-txt mt-4 ">
                    -Build a strong bloggers comunity.
                  </p>

                  <Button
                    href="/contact"
                    className="mx-2 ban-btn col-md-3 mt-2"
                  >
                    Contact Us
                  </Button>
                </div>

                <div className="col-md-6">
                  <Image src={ban} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className=" blog-main-page  mt-5 container">
            {/* <div
              className="blogs-div mx-auto p-4 mt-5 justify-content-center"
              key={index}
            >
              <img className="blog-img" class="img-fluid" src={bg.blogcover} />
              <h3>{bg.postedBy}</h3>
              <h2>{bg.blogtitle}</h2>
              <p> {parse(`${bg.posts}`)}</p>
              <Form.Text muted>
                by {bg.firstname} {bg.lastname}
              </Form.Text>
              <br />
              <Form.Text muted>
                Posted {moment(bg.createdAt).fromNow()}
              </Form.Text>
              <span
                style={{ float: "right", cursor: "pointer" }}
                onClick={() => likeLog(bg.id, index)}
              >
                <FontAwesomeIcon icon={faHeart} className="liked" />
                <b className="likes-count">{bg.likes}</b>
              </span>
            </div> */}
         <Row xs={1} md={2} className="g-4 blog-main-page">
          <Col className="">
            {bogList.map((bg, index) => {
              return (
                <div key={index} className="my-5 ">
                  <Card style={{ width: "18rem" }}>
                    <img
                      className="blog-img"
                      class="img-fluid"
                      src={bg.blogcover}
                    />
                    <Card.Body>
                      <Card.Title>{bg.blogtitle}</Card.Title>
                      <Card.Text>
                        {parse(`${bg.posts.slice(0, 160)}...`)}
                        <a>Readmore</a>
                      </Card.Text>
                      <Form.Text muted>
                        by {bg.firstname} {bg.lastname}
                      </Form.Text>
                      <br />
                      <Form.Text muted>
                        Posted {moment(bg.createdAt).fromNow()}
                      </Form.Text>
                      <span
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => likeLog(bg.id, index)}
                      >
                        <FontAwesomeIcon icon={faHeart} className="liked" />
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
