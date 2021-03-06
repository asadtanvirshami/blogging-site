import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";

export const Recent = ({ recent }) => {
  const [recentBLOG, setRecent] = useState([]);
  useEffect(() => {
    let res = axios
      .get(process.env.NEXT_PUBLIC_FP_RECENT_BLOGS, {})

      .then((res) => {
        setRecent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(recentBLOG);

  return (
    <div className=" mt-5 container   ">
      <div className=" ">
        <h3>Technology</h3>
        {recentBLOG.slice(0, 1).map((bg, index) => {
          return (
            <div key={index} className="   ">
              <Card className="cards ">
                <img className="blog-img img-fluid" src={bg.blogcover} />
                <Card.Body>
                  <Card.Title className="text-heading">
                    {bg.blogtitle}
                  </Card.Title>
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

export default Recent;
