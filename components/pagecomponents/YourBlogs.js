import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Cookies from "js-cookie";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";

export const YourBlogsPage = () => {

  
  const [Aprv, setAprv] = useState([]);
  const [search, setSearch] = useState("");



  useEffect(() => {
    let res = axios
      .get(process.env.NEXT_PUBLIC_FP_POST_BLOGBY, {
        headers: {
          username: `${Cookies.get("user")}`,
        },
      })

      .then((res) => {
        setAprv(res.data.blogs);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(Aprv);

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  return Aprv.length ? (
    <div className="container pt-5">
      <h6 className="mb-3">Currently you have {Aprv.length} blog.</h6>
      <Fragment>
        {Aprv.filter((bit, index) => {
          if (search == "") {
            return bit;
          } else if (
            bit.blogtitle?.toLowerCase().includes(search.toLowerCase())
          ) {
            return bit;
          }
        }).map((bit, index) => {
          return (
            <div className="container" key={index}>
              <h3>{bit.blogtitle}</h3>
              <p> {parse(`${bit.posts}`)}</p>
              <Form.Text muted>
                posted by {bit.firstname} {bit.lastname}
              </Form.Text>
              <br />
              <Form.Text muted>{moment(bit.createdAt).fromNow()}</Form.Text>
            </div>
          );
        })}
      </Fragment>
    </div>
  ) : (
    <>
      <div className="empty">
        <h3>You Currently have no Blogs</h3>
      </div>
    </>
  );
};

export default YourBlogsPage;
