import React, { useEffect, useState, Fragment } from "react";
import ReactPaginate from 'react-paginate';
import { Spinner } from "react-bootstrap";
import BlogsCom from "./BlogsCom";
import axios from "axios";

 const IndexPage = () => {
  
  
  const [BLOGS, setBLOG] = useState([]);  
  const [load, setLoad] = useState([false]);



  useEffect(() => {


   const getBlogs = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_FP_PAGINATED_BLOGS}?page=1&limit=6`).then((r) => r.json(setLoad(false)) );
    const data = await res;
    setBLOG(data.blogs)
 
   }
getBlogs();
    
   }, []);
   console.log(BLOGS)

   const fetchBlogs = async (currentPage)=>{
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FP_PAGINATED_BLOGS}?page=${currentPage}&limit=6`
    ).then((r) => r.json());
    const data = await res
    
    return data.blogs
   }

   const handlePageClick =async (data) =>{
     console.log(data.selected)
     let currentPage=data.selected+1
     const blogsFromDatabase = await fetchBlogs(currentPage)
     setBLOG(blogsFromDatabase)
   }



     
   const renderData = () => {
    if (load != false) {
      return (
        <div className="ld text-center mt-5">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }
    return (
      <div className=" mt-5   ">
        <div className=" ">
          <BlogsCom blogs={ BLOGS }/>
        </div>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={"pagination justify-content-center mt-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      
      />

      </div>
    );
  };
  return renderData();
};
 

export default IndexPage;
