import React from 'react'
import { HomeLayout } from '../components/layouts/HomeLayout'
import axios from 'axios'

const index = ({blogs}) => {
  return (
    <div className='home-styles'>
      <div className='header'> <HomeLayout blogs={blogs} /> </div>
    </div>
  )
}

export default index

export async function getServerSideProps({req,res}){

  // const sessionRequest = await axios.get(process.env.NEXT_PUBLIC_EVE_AUTHENTICATE_TOKEN,{
  //     headers:{
  //         "x-access-token": `${cookies.get('token')}`
  //     }
  // }).then((x)=>x.data);
  // const sessionData = await sessionRequest

  const request = await axios.get(process.env.NEXT_PUBLIC_FP_GET_BLOGS)
  const blogs = await request.data

  return{
      props: { blogs: blogs }
  }
}