import React from 'react'
import GamePage from '../components/pagecomponents/categoryLayout/GamePage';
import axios from 'axios';
import GameCom from '../components/reusablecomponents/GameCom';
import TechCom from '../components/reusablecomponents/TechCom';

export const Game = ({blogs}) => {
  return (
    <div className='container'>
         <div className=" mt-5">
        <div className=" px-2">
          <h1 className='text-center heading-index-main'>Gaming Blogs</h1>
          <GamePage blogs={blogs}/>
        </div>
      </div>

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

  )
}

export default Game


export async function getServerSideProps({ req, res }) {
    const request = await axios
      .get(process.env.NEXT_PUBLIC_FP_GAME_BLOGS)
      .then((x) => x.data);
    console.log(request);
    const blogs = await request;
  
    // Pass data to the page via props
    return {
      props: { blogs: blogs },
    };
  }