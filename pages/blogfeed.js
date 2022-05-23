import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Cookiess from 'cookies';
import { BlogFeed } from '../components/pagecomponents/Blogfeed'
import Router from 'next/router';

const blogFeed = ({ blogs, sessionData }) => {


    axios.defaults.withCredentials = true
    const router = Router

    React.useEffect(() => {
        if (sessionData.auth != true) {
            Router.push('/login')
        }
    }, [])

    return (
        // <Form.Text muted>{moment(bit.time).fromNow()}</Form.Text>
        <div>
            <BlogFeed blogs={blogs} />
        </div>
    )
}




export default blogFeed

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
