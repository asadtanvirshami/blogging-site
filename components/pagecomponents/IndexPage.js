import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";
import parse, { domToReact, htmlToDOM, Element } from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export const BlogFeedPage = ({ blogs }) => {
  const [bogList, setBlogList] = useState([]);

  useEffect(() => {
    setBlogList(blogs);

  }, [bogList]);

  const likeLog = async (id, i) => {
    let like = false;
    // parse an array to find likes in local storage

    if (like) {
      // do nothibng
    } else {
      await axios
        .post(process.env.NEXT_PUBLIC_FP_LIKE_BLOGS, { id: id })
        .then((x) => {
          console.log(x.status);
          if (x.status === 200) {
            let tempState = [...bogList];
            tempState.forEach((x, index) => {
              if (index === i) {
                x.likes = x.likes + 1;
                console.log(x.likes);
              }
            });
            setBlogList(tempState);
          }
        });
    }
  };  

  return (
    <div>
      {bogList.map((bg, index) => {
        return (
          <div key={index} className="my-5">
            <div className="blogs-div container col-md-7 mx-auto p-4 justify-content-center" key={index}>
              <img  src={bg.pfpUser} width={50} height={50}/><h3>{bg.postedBy}</h3>
              <img  src={bg.blogcover} height={100} /><h3>{bg.postedBy}</h3>
              <h2>{bg.blogtitle}</h2>
              <p> {parse(`${bg.posts}`)}</p>
              <Form.Text muted>
                  by {bg.firstname} {bg.lastname}
              </Form.Text>
              <br />
              <Form.Text muted>Posted {moment(bg.createdAt).fromNow()}</Form.Text>
              <span style={{ float: "right", cursor: "pointer" }}  onClick={() => likeLog(bg.id, index)}>
                <FontAwesomeIcon icon={faHeart} className="liked" />
                <b className="likes-count">{bg.likes}</b>
              </span>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogFeedPage;
