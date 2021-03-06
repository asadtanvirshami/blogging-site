import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card, Spinner } from "react-bootstrap";
import { red } from "@mui/material/colors";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const GameCom = () => {
  const [gameBlogs, setGameBlogs] = useState([]);
  const [load, setLoad] = useState([false]);

  useEffect(() => {
    let res =  axios.get(process.env.NEXT_PUBLIC_FP_GAME_BLOGS)
      .then((res) => {
        setGameBlogs(res.data);
        setLoad(false);
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

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    centerPadding: "15px",
    autoPlay: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: true,
          arrows: true,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 1,
          useTransform: false,
          swipeToSlide: true,
        },
      },
    ],
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
      <div className="slider-div  container">
        <Slider {...settings} className=" ">
          {gameBlogs.slice(0, 4).map((bg, index) => {
            return (
              <div className="px-2 mt-3 mb-3" key={index}>
                <div className=" main-card-div">
                  <Link href={"/blogs/" + bg.id} key={bg.id}>
                    <Card className="slider-card ">
                      <img className="blog-img img-fluid" src={bg.blogcover} />
                      <Card.Body className="px-3 pt-4">
                        <Card.Title className="text-heading">
                          {bg.blogtitle}
                        </Card.Title>
                        <div className="card-txt">
                          {parse(`${bg.posts.slice(0, 150)}...`)}
                        </div>
                        <div className="row-main  ">
                          <div className="column-user ">
                          
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
                  </Link>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  };
  return renderData();
};

export default GameCom;
