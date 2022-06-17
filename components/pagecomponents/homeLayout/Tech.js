import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Col, Button, Row, Card } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Tech = ({ techBlog }) => {
  const [techBlogs, setTechBlogs] = useState([]);

  useEffect(() => {
    setTechBlogs(techBlog);
    console.log(techBlog);
  }, [techBlogs]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" ">
      <Slider {...settings} className="  ">
        {techBlogs.map((bg, index) => {
          return (
            <div key={index} className="px-2 mt-3 mb-3   ">
              <Card className="cards-tech m-auto">
                <img className="blog-img img-fluid" src={bg.blogcover} />
                <Card.Body className="card-btm   ">
                  <Card.Title className="text-heading ">
                    {bg.blogtitle}
                  </Card.Title>
                  <div className="card-txt">{parse(`${bg.posts.slice(0, 150)}...`)}</div>
                  <div className="row-main  ">
                    <div className="column-user mx-1 px-1">
                      <img className="blog-img-user " src={bg.pfpUser} />
                    </div>
                    <div className="column-user">
                      <p className="card-detail">
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
      </Slider>
    </div>
  );
};
