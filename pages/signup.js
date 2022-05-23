import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Button, Image, Col } from 'react-bootstrap'
import Router from 'next/router'
import SignupPage from '../components/pagecomponents/SignupPage'

export const SignForm = () => {


    return (
        <div>
        <SignupPage/>
        </div>
    )
}


export default SignForm