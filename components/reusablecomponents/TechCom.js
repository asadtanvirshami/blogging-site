import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Slider from "react-slick";
import Link from "next/link";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

export const TechCom = () => {
  const [techBlogs, setTechBlogs] = useState([]);
  const [load, setLoad] = useState([false]);


  useEffect(() => {
    let res = axios
      .get(process.env.NEXT_PUBLIC_FP_TECH_BLOGS)

      .then((res) => {
        setTechBlogs(res.data);
        setLoad(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(techBlogs);

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
    slidesToShow: 2,
    speed: 500,
    centerPadding: "20px",
    autoPlay: false,
    useTransform: false,

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
        <div className="ld text-center">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }
    return (
      <div className=" slider-div  container">
        <Slider {...settings} className="  ">
          {techBlogs.slice(0, 4).map((bg, index) => {
            return (
              <div className="px-2 mt-3 mb-3" key={index}>
                <div className=" main-card-div    ">
                  <Link href={"/blogs/" + bg.id} key={bg.id}>
                    <Card className="slider-card  ">
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
                            <img className="blog-img-user " src={bg.pfpUser} />
                          </div>
                          <div className="column-user ">
                            <p className="card-txt px-2">
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

export default TechCom;
