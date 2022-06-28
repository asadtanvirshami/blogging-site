import React from "react";
import axios from "axios";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import TechCom from "../../components/pagecomponents/homeLayout/TechCom";
import GameCom from "../../components/pagecomponents/homeLayout/GameCom";

const detail = ({ blog }) => {
  return (
    <div className="container">
      <div className="row-main  ">
        <div className="column-user ">
          <img className="blog-img-user " src={blog.User.pfp} />
        </div>
        <div className="column-user  ">
          <ul className="  card-txt-ul">
            <li>{blog.postedBy} </li>
            <li>{blog.User.bio}</li>
            <li>
              {blog.User.country}, {blog.User.city}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <img className="blog-cover img-fluid " src={blog.blogcover} />
        <div>
        
          <h1 className="text-center mt-5">{blog.blogtitle}</h1>
          Posted {moment(blog.createdAt).fromNow()}
          <div className="mt-4">{parse(blog.posts)}</div>
        </div>
      </div>
      <div className="mt-2">
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
    `http://localhost:8080/blogs/approveds/${params.id}`
  ).then((r) => r.json());

  console.log(request);
  // Pass data to the page via props
  return {
    props: { blog: request[0] || null, user: request[0] },
  };
};

export async function getStaticPaths() {
  const request = await fetch("http://localhost:8080/blogs/approveds").then(
    (r) => r.json()
  );

  return {
    paths: request.map((blogs) => {
      return {
        params: {
          id: blogs.id,
        },
      };
    }),
    fallback: false,
  };
}
