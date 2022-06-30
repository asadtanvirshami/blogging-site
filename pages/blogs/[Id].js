import React from "react";
import axios from "axios";
import Image from "next/image";
import moment from "moment";
import { Typography } from "antd";
import { useRouter } from "next/router";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import TechCom from "../../components/pagecomponents/homeLayout/TechCom";
import GameCom from "../../components/pagecomponents/homeLayout/GameCom";

const detail = ({ blog }) => {
  return (
    <div className="container ">
      <div>
        <div className="row-main m-auto align-self-center mt-5 mb-5 ">
          <div className="column-user">
            <img className="blog-user" src={blog.User.pfp} />
          </div>
          <div className="column-user-detail m-auto ">
            <ul className="  card-txt-ul">
              <li className="blog-username">@{blog.postedBy} </li>
              <li className="blog-user-detail">{blog.User.bio}</li>
              <li className="blog-user-detail">
                {blog.User.country}, {blog.User.city}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <img className="blog-cover img-fluid " src={blog.blogcover} />
        <div>
          <h1 className="blog-heading mt-5">{blog.blogtitle}</h1>
          <p className="blog-time">Posted {moment(blog.createdAt).fromNow()}</p>
          <div className="blog-text mt-5 " style={{ textAlign: "justify" }}>
            <Typography>{parse(blog.posts)}</Typography>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TechCom/>
      </div>
      <div className="mt-5">
        <GameCom/>
      </div>
    </div>
  

  );
};

export default detail;

export const getStaticProps = async ({ params }) => {
  let request = await fetch(
    `${process.env.NEXT_PUBLIC_FP_GET_BLOGSBYID}${params.Id}`
  ).then((r) => r.json());

  console.log(request);
  // Pass data to the page via props
  return {
    props: { blog: request[0] || null, user: request[0] },
  };
};

export async function getStaticPaths() {
  const request = await fetch(process.env.NEXT_PUBLIC_FP_GET_APPROVEDS).then(
    (r) => r.json()
  ); 
  

  return {
    paths: request.map((blogs) => {
      return {
        params: {
          Id: blogs.id.toString(),
        },
      };
    }),
    fallback: false,
  };
}
