import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import moment from "moment";
import { Form, Spinner, Row, Col } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export const YourBlogsPage = ({ blogs }) => {
  const [Aprv, setAprv] = useState([]);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState([false]);

  useEffect(() => {
    setAprv(blogs);
    setLoad(false);
  }, []);
  console.log(Aprv);

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };


 
  const DeleteBlog = (id, e) => {
    e.preventDefault();

    axios
      .delete(process.env.NEXT_PUBLIC_FP_DELETE_BLOG, {
        headers: {
          Id: id,
        },
      })
      .then((x) => console.log(x.data));
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
      <div className=" pt-5  align-self-center">
        <h6 className="mb-3">Currently you have {Aprv.length} blog.</h6>
        <input
          type="text"
          placeholder="Filter "
          className="textarea "
          onChange={inputHandler}
        />
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
              <div className=" mt-5   ">
                <div className=" d-flex">
                  <Row className="m-auto  blog-main-page align-self-center">
                    <Col className="container mt-3">
                      <Fragment>
                        <div key={index} className=" main-card-div    ">
                          <ul style={{ listStyle: "none" }}>
                            <li style={{ fontWeight: "bolder" }}>
                              {bit.blogtitle}
                            </li>
                            <li>
                              {parse(`${bit.posts.slice(0, 100)}...`)}
                              <Link
                                href={"/blogs/" + bit.id}
                                className="open"
                                key={bit.id}
                              >
                                ReadMore
                              </Link>
                            </li>
                            <Form.Text muted>
                              posted by {bit.postedBy}
                            </Form.Text>
                            <br />
                            <Form.Text muted>
                              {moment(bit.createdAt).fromNow()}
                            </Form.Text>
                          </ul>

                          <div className="main-div-yourblogs col-md-2 ">
                            <div>
                              <div style={{ float: "right" }} className="mx-3">
                                <li
                                  onClick={(e) => {
                                    DeleteBlog(bit.id, e);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="like"
                                  />
                                </li>
                              </div>
                              <div style={{ float: "right" }}>
                                <li>
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="like"
                                  />
                                </li>
                              </div>
                            </div>
                          </div>
                          <ul style={{ listStyle: "none" }}></ul>
                        </div>
                      </Fragment>
                    </Col>
                  </Row>
                </div>
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
