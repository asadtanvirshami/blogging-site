import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Image, FormSelect } from 'react-bootstrap'
import axios from 'axios'
import Router from 'next/router'
import Cookies from 'cookies'


// eslint-disable-next-line react/display-name
export const ContactPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [comment, setComment] = useState("")


    // sending post req to backend

    const contact = (e) => {
        e.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_FP_POST_CONTACT,
            {
                name: name,
                email: email,
                country: country,
                comment: comment
            }).then((x) => console.log(x.data))

    };



    // using useEffect to get country apis

    const [type, setType] = useState([])


    useEffect( () => {
        let res =  axios.get('https://restcountries.com/v2/all')

            .then((res) => {
                setType(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    // const a variable to use map function

    const listItems = type.map((d, index) => <option className="scr-form dropdown" key={index}>{d.name}</option>);


    return (
        <div>
            <div className="container   mt-5 row" >

                {/* image div */}

                <div className="image-contact-div mb-5 text-center col-md-6" >
                    <Image className="contact-img"  />
                </div>

                {/* form div */}

                <div className=" col-md-6 d-flex justify-content-center  ">
                    <Form onSubmit={contact} className="form-div  " >
                        <h1 className="text-center contact-labels" >Contact Us</h1>
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label className="contact-labels" >Name</Form.Label>
                            <Form.Control type="" className="placholder-space" required onChange={(e) => {
                                setName(e.target.value)
                            }} placeholder="Enter Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="contact-labels" >Email address</Form.Label>
                            <Form.Control required onChange={(e) => { setEmail(e.target.value) }} className="placholder-space" type="email" placeholder="Enter email" />
                            <Form.Text className="" style={{ color: "white" }}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label className="contact-labels" >Select Country:</Form.Label>
                            <Form.Select className="scr-form  " required onChange={(e) => { setCountry(e.target.value) }} >
                                {listItems}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="contact-labels" >Comment</Form.Label>
                            <Form.Control required className="placholder-space" type="comment" onChange={(e) => {
                                setComment(e.target.value)
                            }} placeholder="Comment" />
                        </Form.Group>

                        <Button className="contact-button col-md-12 " type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>
            </div >
        </div>
    )
}

export default ContactPage

