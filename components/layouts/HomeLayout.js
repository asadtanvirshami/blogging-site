import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const HomeLayout = ({blogs}) => {

  const [bogList, setBlogList] = useState([])

  useEffect(() => {
    setBlogList(blogs)
  }, [])

  const likeLog = async(id, i) => {

    let like = false;
    // parse an array to find likes in local storage

    if(like){
      // do nothibng
    }else{
      await axios.post(process.env.NEXT_PUBLIC_FP_LIKE_BLOG,{id:id}).then((x)=>{
        console.log(x.status)
        if(x.status===200){
          let tempState = [...bogList];
          tempState.forEach((x, index)=>{
            if(index==i){
              x.likes = x.likes + 1;
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
        bogList.map((bg, index)=>{
          return(
            <div key={index} className="my-3">
                <div>{bg.name}</div>
                <div> <button onClick={()=>likeLog(bg.id, index)}>Like</button> {bg.likes}</div>
            </div>
          )
        })
      }
    </div>
  )
}
