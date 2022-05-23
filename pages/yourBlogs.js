import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import YourBlogs from '../components/pagecomponents/YourBlogs'


export const yourBlogs = () => {

    return (

        <div className="container pt-5">
        <YourBlogs/>
        </div>
    ) 

}

export default yourBlogs
