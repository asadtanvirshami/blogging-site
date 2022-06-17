import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";

export const Recent = ({ recentBlog }) => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent(recentBlog);
    console.log(recentBlog);
  }, [recent]);

  return (
    <div className=" mt-5 container   ">
      <div className=" ">
        {recent.slice(0, 1).map((bg, index) => {
          return (
            <div key={index} className="   ">
              <Card  className="cards ">
                <img className="blog-img img-fluid" src={bg.blogcover} />
                <Card.Body>
                  <Card.Title className="text-heading">{bg.blogtitle}</Card.Title>
                  <Card.Text className="card-txt">
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
                  <span style={{ float: "right" }}>
                    <FontAwesomeIcon icon={faHeart} className="like" />
                    <b className="likes-count">{bg.likes}</b>
                  </span>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
