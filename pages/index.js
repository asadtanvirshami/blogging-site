import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Cookiess from 'cookies';
import {BlogFeedPage} from '../components/pagecomponents/IndexPage'
import Router from 'next/router';


// eslint-disable-next-line react/display-name
const Index = ({ blogs, sessionData }) => {


    axios.defaults.withCredentials = true
    const router = Router

  

    return (
        // <Form.Text muted>{moment(bit.time).fromNow()}</Form.Text>
        <div className='index-bg'>
            <BlogFeedPage blogs={blogs} />
        </div>
    )
}




export default Index

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

