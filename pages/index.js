import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookiess from "cookies";
import { BlogFeedPage } from "../components/pagecomponents/homeLayout/IndexPage";
import Router from "next/router";
import { Recent } from "../components/pagecomponents/homeLayout/Recent";
import { Tech } from "../components/pagecomponents/homeLayout/Tech";
import { Gaming } from "../components/pagecomponents/homeLayout/Gaming";

// eslint-disable-next-line react/display-name
const Index = ({ blogs, recentBlog,techBlog,gameBlog }) => {
  axios.defaults.withCredentials = true;
  const router = Router;

  return (
    // <Form.Text muted>{moment(bit.time).fromNow()}</Form.Text>

    <div className="index-bg ">
     
<div className="container">
        <Recent recentBlog={recentBlog} />
        </div>
        {/* <div className="container">
        <div className=" px-4">
        <Tech techBlog={techBlog} />
        </div>
        </div>
        <div className="container">
        <div className=" px-4">
        <Gaming gameBlog={gameBlog} />
        </div>
        </div> */}
        
        <div className="">
        <BlogFeedPage blogs={blogs} />
        </div>
        </div>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookiess(req, res);
  const value = await axios
    .get(process.env.NEXT_PUBLIC_FP_GET_JWT, {
      headers: {
        "x-access-token": `${cookies.get("token")}`,
        user: `${cookies.get("user")}`,
        role: `${cookies.get("isAdmin")}`,
      },
    })
    .then((x) => x.data);
  console.log(value);
  const sessionData = await value;

  const request = await axios.get
  (process.env.NEXT_PUBLIC_FP_GET_APPROVEDS);

  const requestRecent = await axios.get(
    process.env.NEXT_PUBLIC_FP_RECENT_BLOGS
  );
 
  const blogs = await request.data;

  // Pass data to the page via props
  return {
    props: { blogs: blogs, sessionData: sessionData,},
  };
}
