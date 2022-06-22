import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useRouter } from 'next/router'


const Layout = ({ children, sessionData }) => {
  
  const router = useRouter();
  useEffect(() => {
    console.log(router.route);
  }, [])

  const sign = "/signup"
  const login = "/login"
  const detail = "/detail"


  if (router.route === login) {
    return (
      <>
        <>{children}</>
  
      </>


    )
  } else if (router.route === sign) {
    return (
      <>
        <>{children}</>
      
      </>
    )


  } else{
    return(
    <>
      <Header data={sessionData}/>
      <>{children}</>
      <Footer/>
    </>
    )
  }

}

export default Layout

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




