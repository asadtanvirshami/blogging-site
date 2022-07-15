import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookiess from "cookies";
import Image from "next/image";
import Router from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import GameCom from "../components/reusablecomponents/GameCom";
import TechCom from "../components/reusablecomponents/TechCom";
import IndexPage from "../components/pagecomponents/homeLayout/IndexPage";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// eslint-disable-next-line react/display-name
const Index = () => {

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
          <img className="img-fluid hero-img"  src="/hero.jpg" />
        </SwiperSlide>
      </Swiper>

      <div className=" mt-5">
        <h1 className="text-center heading-index-main" >All Blogs</h1>
        <div className=" px-2">
          <IndexPage/>
        </div>
      </div>

      <div className="container mt-5">
        <h1 className="text-center heading-index-main">Technology Blogs  </h1>
        <div className="container px-1 mt-3">
        <TechCom />
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="text-center heading-index-main">Gaming Blogs</h1>
        <div className="container px-1 mt-3">
          <GameCom/>
        </div>
      </div>
    </div>
  );
};

export default Index;

// export async function  getServerSideProps({ req, res }) {
//   const request = await fetch("http://localhost:8080/blogs/approveds")
//   .then((r) => r.json());

//   console.log(request);
//   const blogs = await request;

//   // Pass data to the page via props
//   return {
//     props: { blogs: blogs || null},
//   };
// }
