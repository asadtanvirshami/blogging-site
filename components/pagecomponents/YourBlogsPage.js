import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { Form, Spinner } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";

export const YourBlogsPage = ({ blogs }) => {
  const [Aprv, setAprv] = useState([]);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState([false]);

  useEffect(() => {
    setAprv(blogs);
    setLoad(false);
  }, [Aprv]);

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  const renderData = () => {
    if (load != false) {
      return (
        <div className="ld text-center mt-5">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }
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
                <div>
                <div></div>
                <div></div>
                </div>
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
          <h3>You Currently have no Blogs </h3>
        </div>
      </>
    );
  };
  return renderData();
};

export default YourBlogsPage;
