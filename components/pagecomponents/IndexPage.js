import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const BlogFeedPage = ({ blogs }) => {

  const [bogList, setBlogList] = useState([])

  useEffect(() => {
    setBlogList(blogs)
  }, [bogList])

  const likeLog = async (id, i) => {

    let like = false;
    // parse an array to find likes in local storage

    if (like) {
      // do nothibng
    } else {
      await axios.post(process.env.NEXT_PUBLIC_FP_LIKE_BLOGS, { id: id }).then((x) => {
        console.log(x.status)
        if (x.status === 200) {
          let tempState = [...bogList];
          tempState.forEach((x, index) => {
            if (index === i) {
              x.likes = x.likes + 1;
              console.log(x.likes)
            }
          });
          setBlogList(tempState)
        }
      });
    }
  }

  return (
    <div>
      {
        bogList.map((bg, index) => {
          return (
            <div key={index} className="my-3">
              <div>{bg.firstname}</div>
              <div>{bg.posts}</div>
              <div> <button onClick={() => likeLog(bg.id, index)}>Like</button> {bg.likes}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default BlogFeedPage