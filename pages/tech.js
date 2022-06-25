import React from 'react'
import axios from 'axios';
import TechPage from '../components/pagecomponents/categoryLayout/TechPage';
import TechCom from '../components/pagecomponents/homeLayout/TechCom';
import GameCom from '../components/pagecomponents/homeLayout/GameCom';

export const Tech = ({blogs}) => {
  return (
    <div className='container'>
       <div className=" mt-5">
        <h1 className="text-center heading-index-main" >Gaming blogs</h1>
        <div className=" px-2">
          <TechPage blogs={blogs}/>
        </div>
      </div>
<div>
      <div className="container mt-5">
        <div className="container px-1">
        <TechCom />
        </div>
      </div>
      <div className="container mt-5">
        <div className="container px-1">
          <GameCom/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Tech


export async function getServerSideProps({ req, res }) {
    const request = await axios
      .get(process.env.NEXT_PUBLIC_FP_TECH_BLOGS)
      .then((x) => x.data);
    console.log(request);
    const blogs = await request;
  
    // Pass data to the page via props
    return {
      props: { blogs: blogs },
    };
  }