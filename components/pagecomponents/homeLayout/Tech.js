import React, { useEffect, useState } from "react";
import axios from "axios";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FormText } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Form } from "react-bootstrap";
import { maxHeight } from "@mui/system";





const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


export const TechPage = () => {
  const [techBlogs, setTechBlogs] = useState([]);


  useEffect(() => {
    let res = axios
      .get(process.env.NEXT_PUBLIC_FP_TECH_BLOGS, {
      })

      .then((res) => {
        setTechBlogs(res.data);
        console.log(res.data);
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
            <div key={index} className="px-2 mt-3 mb-3    ">
              <Card sx={{ maxWidth: 345}} className="game-card">
        
                <CardMedia
                  component="img"
                  height="1940"
                  className="img-fluid "
                  image={bg.blogcover}

                />
                <CardContent>
                <h5>{bg.blogtitle}</h5>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{parse(`${bg.posts.slice(0, 150)}...`)}</Typography>
                  <CardHeader
              
                  avatar={
                    <Avatar>
                      <img className="img-fluid" src={bg.pfpUser} />
                    
                    </Avatar>
                  }

                  
                  title={bg.postedBy}
                  subheader={moment((bg.createdAt)).fromNow()}
                />
                   <span style={{ float: "right" }} className="pb-2">
                    <FontAwesomeIcon icon={faHeart} className="like" />
                    <b className="likes-count">{bg.likes}</b>
                  </span>
                </CardContent>
                
              </Card>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};


export default TechPage