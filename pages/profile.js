import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Cookiess from 'cookies';
import Router from 'next/router';
import ProfilePage from '../components/pagecomponents/ProfilePage'

export const Pfp = ({sessionData, info}) => {

    axios.defaults.withCredentials = true
    const router = Router

   useEffect(() => {
        if (sessionData.auth != true) {
            Router.push('/login')
        }
    }, [])

    return (
        <div>
            <ProfilePage info={info}/>
        </div>
    )
}

export default Pfp

export async function getServerSideProps({ req, res }) {
    // Fetch data from external API

    // Fetch data from external API
    const cookies = new Cookiess(req, res)
    const value = await axios.get(process.env.NEXT_PUBLIC_FP_GET_JWT, {
        headers: {
            "x-access-token": `${cookies.get('token')}`,
            "user": `${cookies.get('user')}`,
            "role": `${cookies.get('isAdmin')}`
        }
    }).then((x) => x.data);
    console.log(value)
    const sessionData = await value


    const request = await axios
    .get(process.env.NEXT_PUBLIC_FP_GET_USERDETAIL, {
        headers: {
          username: `${cookies.get("user")}`,
        },
      }).then((x) => x.data);

  console.log(request);
  const info = await request;

  // Pass data to the page via props
  return {
    props: { info: info, sessionData: sessionData },
  };
  
}