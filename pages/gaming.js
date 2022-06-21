import axios from 'axios'
import React from 'react'
import { GamingPage } from '../components/pagecomponents/homeLayout/Gaming'


export const Gaming = ({gameBlog}) => {
  return (
    <div>
        <GamingPage />
    </div>
  )
  
}

export default Gaming



export async function getServerSideProps({ req, res }) {
   


    const request = await axios
    .get(process.env.NEXT_PUBLIC_FP_GAME_BLOGS).then((x) => x.data);

  console.log(request);
  const gameBlog = await request;

  // Pass data to the page via props
  return {
    props: { gameBlog: gameBlog},
  };
  
}