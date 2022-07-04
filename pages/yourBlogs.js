import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Cookiess from "cookies";
import Router from "next/router";
import { Spinner } from "react-bootstrap";
import { YourBlogsPage } from "../components/pagecomponents/YourBlogsPage";

export const YourBlogs = ({ sessionData, blogs }) => {
  const [load, setLoad] = useState([false]);

  useEffect(() => {
    if (sessionData.auth != true) {
      Router.push("/login");
      setLoad(false);
    }
  }, []);

  const renderData = () => {
    if (load === false) {
      return (
        <div className="ld text-center mt-5">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }
    return (
      <div className="container pt-5">
        <YourBlogsPage blogs={blogs} />
      </div>
    );
  };
  return renderData();
};

export default YourBlogs;

export async function getServerSideProps({ req, res }) {
  // Fetch data from external API

  // Fetch data from external API
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

  const request = await fetch(process.env.NEXT_PUBLIC_FP_POST_BLOGBY, {
    headers: {
      username: `${cookies.get("user")}`,
    },
  }).then((r) => r.json());

  console.log(request);
  const blogs = await request;

  // Pass data to the page via props
  return {
    props: { sessionData: sessionData, blogs: blogs || null },
  };
}
