import React, { useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup, Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import Cookiess from 'cookies';
import Cookies from 'js-cookie';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


const Editor = dynamic(() =>
    import('../components/reusablecomponents/Editor/QuillEditor.js'), { ssr: false }
)

export const createBlogger = ({ sessionData }, props) => {





    useEffect(() => {
        if (sessionData.auth != true) {
            Router.push('/login')
        }
    }, [])

    let content = ''

    return (


        <div className="container mt-5 form-bg">

            <h1 className=" name-label text-center">Create Blog</h1>
            <div className="col-md-12 pb-4 " style={{ height: 300 }} >
                <Editor blog={content} />

            </div>
        </div >
    )
}
export default createBlogger;


export async function getServerSideProps({ req, res }) {
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

    // Pass data to the page via props
    return {
        props: { sessionData: sessionData }
    }
}