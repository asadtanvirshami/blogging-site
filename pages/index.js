import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookiess from "cookies";
import { Row, Col, Carousel, CarouselItem } from "react-bootstrap";
import { BlogFeedPage } from "../components/pagecomponents/homeLayout/IndexPage";
import Router from "next/router";
import { Recent } from "../components/pagecomponents/homeLayout/Recent";
import { TechPage } from "../components/pagecomponents/homeLayout/Tech";
import { GamingPage } from "../components/pagecomponents/homeLayout/Gaming";
import Image from "next/Image";
import hero_img from "/public/hero.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// eslint-disable-next-line react/display-name
const Index = ({ blogs }) => {
  axios.defaults.withCredentials = true;
  const router = Router;

  return (
    <div className="index-bg ">
      {/* <div className="container">
        <Recent recent={recent} />
        </div> */}

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Image className="" src={hero_img} height={1300} width={3000} />
        </SwiperSlide>
        ...
      </Swiper>

      <div className=" mt-5">
        <h1 className="text-center">All Blogs</h1>
        <div className=" px-2">
          <BlogFeedPage blogs={blogs} />
        </div>
      </div>

      <div className="container mt-5">
        <h1 className="text-center">Technology Blogs</h1>
        <div className=" px-3">
          <TechPage />
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="text-center">Gaming Blogs</h1>
        <div className=" px-3">
          <GamingPage />
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  const request = await axios
    .get(process.env.NEXT_PUBLIC_FP_GET_APPROVEDS)
    .then((x) => x.data);
  console.log(request);
  const blogs = await request;

  // Pass data to the page via props
  return {
    props: { blogs: blogs },
  };
}
