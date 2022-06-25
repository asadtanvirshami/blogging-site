import React from "react";
import axios from "axios";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";

const detail = ({ blog }) => {
  return (
    <div className="container" >
  
        <div className="row-main  ">
          <div className="column-user ">
            <img className="blog-img-user " src={blog.pfpUser} />
          </div>
          <div className="column-user mx-3 ">
            <div className=" row">
            <ul className="  card-txt-ul">
              <li>{blog.postedBy} </li>
              <li>{blog.category}</li>
              <li>Posted {moment(blog.createdAt).fromNow()}</li>
              </ul>
            </div>
          </div>
        </div>
        <div> <h1>{blog.blogtitle}</h1>
        <p className="">{blog.posts}</p>
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
    props: { blog: request[0] || null },
  };
};

export async function getStaticPaths() {
  const request = await fetch("http://localhost:8080/blogs/approveds").then(
    (r) => r.json()
  );

  console.log(request);
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
