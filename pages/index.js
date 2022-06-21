import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookiess from "cookies";
import { BlogFeedPage } from "../components/pagecomponents/homeLayout/IndexPage";
import Router from "next/router";
import { Recent } from "../components/pagecomponents/homeLayout/Recent";
import { TechPage } from "../components/pagecomponents/homeLayout/Tech";
import { Gaming, GamingPage } from "../components/pagecomponents/homeLayout/Gaming";

// eslint-disable-next-line react/display-name
const Index = ({blogs}) => {
  axios.defaults.withCredentials = true;
  const router = Router;

  return (
    // <Form.Text muted>{moment(bit.time).fromNow()}</Form.Text>

    <div className="index-bg ">
           
{/* <div className="container">
        <Recent recent={recent} />
        </div> */}
        <div className="container">
        <div className=" px-4">
        <TechPage />
        </div>
        </div>
        <div className="container">
        <div className=" px-4">
        <GamingPage  />
        </div>
        </div>

      <div className="">
        <BlogFeedPage blogs={blogs} />
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
