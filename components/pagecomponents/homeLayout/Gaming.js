import React, { useEffect, useState } from "react";
import axios from "axios";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Card } from "react-bootstrap";
import { red } from "@mui/material/colors";




export const GamingPage = () => {
  const [gameBlogs, setGameBlogs] = useState([]);

  useEffect(() => {
    let res = axios
      .get(process.env.NEXT_PUBLIC_FP_GAME_BLOGS, {})

      .then((res) => {
        setGameBlogs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(gameBlogs);

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
    slidesToShow: 2,
    slidesToScroll: 2,
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
    <div className="slider-div ">
      <Slider {...settings} className=" ">
        {gameBlogs.map((bg, index) => {
          return (
            <div key={index} className="px-2 mt-3 mb-3    ">
               <div key={index} className=" main-card-div    ">
                  <Card className="slider-card ">
                    <img className="blog-img img-fluid" src={bg.blogcover} />
                    <Card.Body className="px-3 pt-4">
                      <Card.Title className="text-heading">{bg.blogtitle}</Card.Title>
                      <div className="card-txt">{parse(`${bg.posts.slice(0, 150)}...`)}</div>
                      <div className="row-main  ">
                        <div className="column-user ">
                          <img className="blog-img-user " src={bg.pfpUser} />
                        </div>
                        <div className="column-user ">
                          <p className="card-txt px-2">
                            {bg.postedBy} <br />
                            Posted {moment(bg.createdAt).fromNow()}
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
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default GamingPage;
