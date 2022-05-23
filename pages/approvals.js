import React, { useState, useEffect } from 'react'
import Cookiess from 'cookies'
import axios from 'axios'
import ApprovalsPage from '../components/pagecomponents/ApprovalsPage'




// eslint-disable-next-line react/display-name
export const Approvals = ({ sessionData }) => {
    useEffect(() => {

        if (sessionData.auth != true || sessionData.role != 'admin') {
            Router.push('/login')
        }
    }, [])
    
  return(
      <div>
      <ApprovalsPage/>
      </div>
  )
}

export default Approvals


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





