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
        <Footer/>
      </>


    )
  } else if (router.route === sign) {
    return (
      <>
        <>{children}</>
        <Footer/>
      </>
    )


  } else{
    return(
    <>
    <Header/>
      <>{children}</>
      <Footer/>
    </>
    )
  }

}

export default Layout