import React from "react";

 const BlogPagination = ({page, totalBlogs, paginate,}) => {

  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalBlogs / page); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
   
      <nav className="pagination-bar ">
        <ul
          className="pagination page-item   "
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="800"
          data-aos-once
        >
          {pageNumbers.map((number) => (
            <li key={number} className="page-item ">
              <button
                style={{}}
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BlogPagination
