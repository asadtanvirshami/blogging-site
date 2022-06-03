import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Form, Button, Modal, FormCheck } from "react-bootstrap";
import parse from "html-react-parser";

export const ApprovalsPage = () => {
  const [Aprv, setAprv] = useState([]);
  const Router = useRouter();

  // getting all the blogs from database

  useEffect(() => {
    let res = axios
      .get(process.env.NEXT_PUBLIC_FP_GET_APPROVALS)
      .then((res) => {
        setAprv(res.data.blogs);
        // let tempState = [];
        // res.data.blogs.forEach((x, index) => {
        //     tempState[x, index] = { id: x.id, title: x.blogtitle, postedBy: x.postedBy, status: x.status }
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(Aprv);

  // approval function to backend

  const Approved = (id, e) => {
    e.preventDefault();
    axios
      .post(process.env.NEXT_PUBLIC_FP_POST_STATUS, {
        id: id,
      })
      .then((res) => {
        console.log(res.data.status);
      });
  };

  // delete function to backend

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

  return Aprv.length ? (
    <div>
      {Aprv.map((bit, i) => {
        return (
          <Form key={i}>
            {/* listed blog api for approval */}
            <Form.Group
              className=""
              style={{ color: "black" }}
              controlId="formBasicEmail"
            >
              <Form.Label>{bit.title}</Form.Label>
              <br></br>
              <Form.Label>{bit.id}</Form.Label>
              <br></br>
              <Form.Label>{bit.status}</Form.Label>
            </Form.Group>
            <Button
              variant="primary"
              onClick={(e) => {
                DeleteBlog(bit.id, e);
              }}
            >
              Yes, Delete {bit.title}
            </Button>
            {/* <div><FormCheck type="checkbox" checked={bit.status ? true : false} onClick={(e) => { Approved(bit.id, e) }} /></div> */}
            <br></br>
            <br></br>
            <br></br>
            <div>
              <Button
                onClick={(e) => {
                  Approved(bit.id, e);
                }}
              >
                Approve
              </Button>
            </div>
          </Form>
        );
      })}
    </div>
  ) : (
    <>
      <div className="empty">
        <h3>No Blogs to Approve</h3>
      </div>
    </>
  );
};

export default ApprovalsPage;
