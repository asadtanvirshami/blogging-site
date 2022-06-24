import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const detail = ({ blog }) => {
  return (
    <div className="container" key={blog}>
      <div>
    
        <p>    {blog.blogtitle}</p></div>
    </div>
  );
};

export default detail;

export const getStaticProps = async ({params}) => {

  let request = await fetch(`http://localhost:8080/blogs/approveds/${params.id}`)
    .then(r => r.json());
    console.log(request);
  // Pass data to the page via props
  return {
    props: { blog: request[0] || null },
  };
};

export async function getStaticPaths() {
  const request = await fetch("http://localhost:8080/blogs/approveds").then(r => r.json());

  console.log(request);
return{
  paths: request.map(blogs => {
    return{
      params:{
        id:blogs.id
      }
    }
  }),
  fallback:false
}


}
