import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Button, Image, Col } from 'react-bootstrap'
import Router from 'next/router'

export const SignupPage = () => {

    const [usernameReg, setUsername] = useState("")
    const [emailReg, setEmail] = useState("")
    const [FirstReg, setFirst] = useState("")
    const [LastReg, setLast] = useState("")
    const [passwordReg, setPassword] = useState("")
    const [CountryReg, setCountry] = useState("")
    const [CityReg, setCity] = useState("")
    const [Cpassword, setCPassword] = useState("")


    // sending post req to backend

    const register = async (e) => {
        e.preventDefault();
       await axios.post(process.env.NEXT_PUBLIC_FP_POST_USER,
            {
                FirstName: FirstReg,
                LastName: LastReg,
                email: emailReg,
                password: passwordReg,
                cpassword: Cpassword,
                username: usernameReg,
                city:CityReg,
                country:CountryReg

            }).then((x) => {
                if (x.data.message === 'Welcome User') {
                    Router.push('/login')
                } else {
                    console.log(x.data)
                }
            }
            )

    };



    //  using useEffect to get country apis

    const [type, setType] = useState([])


    useEffect( () => {
        let res = axios.get('https://restcountries.com/v2/all')

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
            <div className="row mt-5 container">

                {/* image div */}

                <div className="image-contact-div mb-5 text-center col-md-6" >
                    <Image className="contact-img " />
                </div>

                {/* form div */}

                <div className=" col-md-6  d-flex justify-content-center     ">
                    <Form onSubmit={register} className=" sign-form  " >
                        <h1 className="contact-labels text-center " >Sign up</h1>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label className="name-label">First name</Form.Label>
                            <Form.Control
                                required
                                type="firstname"
                                placeholder="First name"
                                onChange={(e) => { setFirst(e.target.value) }}
                            />

                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label className="name-label">Last name</Form.Label>
                            <Form.Control
                                required
                                type="lastname"
                                placeholder="Last name"
                                onChange={(e) => { setLast(e.target.value) }}
                            />

                        </Form.Group>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label className="name-label">City</Form.Label>
                            <Form.Control
                                required
                                type="lastname"
                                placeholder="Last name"
                                onChange={(e) => { setCity(e.target.value) }}
                            />

                          
                        <Form.Group className="mb-3">
                            <Form.Label className="contact-labels" >Select Country:</Form.Label>
                            <Form.Select className="scr-form  " required onChange={(e) => { setCountry(e.target.value) }} >
                                {listItems}
                            </Form.Select>
                        </Form.Group>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="contact-labels">Username</Form.Label>
                            <Form.Control type="" className="placholder-space" onChange={(e) => {
                                setUsername(e.target.value)
                            }} placeholder="Enter Name" required />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="contact-labels">Email address</Form.Label>
                            <Form.Control onChange={(e) => { setEmail(e.target.value) }} required className="placholder-space" type="email" placeholder="Enter email" />
                            <Form.Text className="" style={{ color: "white" }}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="contact-labels">Password</Form.Label>
                            <Form.Control className="placholder-space" required type="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="contact-labels">Confirm Password</Form.Label>
                            <Form.Control className="placholder-space" required type="password" onChange={(e) => {
                                setCPassword(e.target.value)
                            }} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" required className="" style={{ color: "white" }} label="Check me out" />
                        </Form.Group>
                        <div className="col-md-12">
                            <Button variant="primary" className="signup-button col-sm-12" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>

                </div>
            </div >
        </div>
    )
}


export default SignupPage
