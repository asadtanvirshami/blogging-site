import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookiess from "cookies";
import Image from "next/image";
import Router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import game_logo from '/public/games.png';
import hero_img from "/public/hero.jpg";
import tech_logo from '/public/technology.png';
import blogs_logo from '/public/article.png';
import GameCom from "../components/pagecomponents/homeLayout/GameCom";
import TechCom from "../components/pagecomponents/homeLayout/TechCom";
import IndexPage from "../components/pagecomponents/homeLayout/IndexPage";


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
      </Swiper>

      <div className=" mt-5">
        <h1 className="text-center heading-index-main" >All Blogs <Image src={blogs_logo} width={28} height={28}/></h1>
        <div className=" px-2">
          <IndexPage blogs={blogs}/>
        </div>
      </div>

      <div className="container mt-5">
        <h1 className="text-center heading-index-main">Technology Blogs  <Image src={tech_logo} width={28} height={28}/></h1>
        <div className="container px-1">
        <TechCom />
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="text-center heading-index-main">Gaming Blogs <Image src={game_logo} width={28} height={28}/></h1>
        <div className="container px-1">
          <GameCom/>
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
