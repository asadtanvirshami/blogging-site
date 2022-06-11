import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Cookies from 'cookies'
import ContactPage from '../components/pagecomponents/ContactPage'

// eslint-disable-next-line react/display-name
export const Contact = ({sessionData}) => {

    
    return (
        <div>
          <ContactPage/>
        </div>
    )
}

export default Contact


export async function getServerSideProps({ req, res }) {
    // Fetch data from external API
    const cookies = new Cookies(req, res)
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
