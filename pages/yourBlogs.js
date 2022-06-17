import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { YourBlogsPage } from '../components/pagecomponents/YourBlogs'
import Cookiess from 'cookies';
import Router from 'next/router';


export const YourBlogs = ({sessionData}) => {
     useEffect(() => {
        if (sessionData.auth != true) {
            Router.push('/login')
        }
    }, [])

    return (

        <div className="container pt-5">
        <YourBlogsPage/>
        </div>
    ) 

}

export default YourBlogsPage

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


    const request = await axios.get(process.env.NEXT_PUBLIC_FP_GET_APPROVEDS)
    const blogs = await request.data

    // Pass data to the page via props
    return {
        props: { blogs: blogs, sessionData: sessionData }
    }
}

