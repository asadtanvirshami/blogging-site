import React, {useEffect} from 'react'
import axios from 'axios'
import CooKies from 'js-cookie'
import Router from 'next/router'
import Cookies from 'cookies'
import { IndexPage } from '../components/pagecomponents/IndexPage'


const index = ({ sessionData }) => {

useEffect(() => {
    if (sessionData.auth != true) {
      Router.push('/login')
    }
  }, [])



  return (
    <div >

      <IndexPage/>
    </div>
  )
}

export default index

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




