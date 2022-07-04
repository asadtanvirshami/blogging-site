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
import BlogPagination from "../components/pagecomponents/homeLayout/BlogPagination";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// eslint-disable-next-line react/display-name
const Index = ({ blogs }) => {

  const [BLOGS, setBLOG] = useState([]);  
  const [currentC, setCurrent] = useState(1);

useEffect(() => {
  setBLOG(blogs)
}, [BLOGS])


  const [page] = useState(20);
  axios.defaults.withCredentials = true;
  const router = Router;

     // Get current posts
     const indexOfLastBlogs = currentC * page;
     const indexOfFirstBlogs = indexOfLastBlogs - page;
     const currentBlogs = BLOGS.slice(indexOfFirstBlogs, indexOfLastBlogs);
   
     // Change page
     const paginate = pageNumbers => setCurrent(pageNumbers);



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
          <IndexPage  blogs={ currentBlogs }/>
          <BlogPagination
           page={page}
           totalBlogs={blogs.length}
           paginate={paginate}
            />
        </div>
      </div>

      <div className="container mt-5">
        <h1 className="text-center heading-index-main">Technology Blogs  </h1>
        <div className="container px-1">
        <TechCom />
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="text-center heading-index-main">Gaming Blogs</h1>
        <div className="container px-1">
          <GameCom/>
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function  getServerSideProps({ req, res }) {
  const request = await fetch(process.env.NEXT_PUBLIC_FP_GET_APPROVEDS)
  .then((r) => r.json());

  console.log(request);
  const blogs = await request;

  // Pass data to the page via props
  return {
    props: { blogs: blogs || null},
  };
}
