import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button, NavLink } from 'react-bootstrap'
import Cookies from 'js-cookie'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';



export const AdminPanel = () => {


    const router = useRouter()
    const [name, setname] = useState("")

    useEffect(() => setname(Cookies.get('user')), [])


    const Logout = async (e) => {
        const res = await axios.get(process.env.NEXT_PUBLIC_FP_POST_LOGOUT).then((res) => {
            console.log(res)
            console.log(res)
            router.push("/login")
        })
    };



    return (
        <div>
            <div>

                <Navbar collapseOnSelect expand="lg"  bg="dark" variant="dark"  sticky="top">
                    <Container  >
                        <Navbar.Brand href="#home" className="logo-name">BlogNow.</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto ">
                                <Nav.Link className="main-nav-links" href="/">Home</Nav.Link>
                                <Nav.Link className="main-nav-links" href="/blogfeed">Blog Feed</Nav.Link>
                                <Nav.Link className="main-nav-links" href="/createBlog">Create Blog</Nav.Link>
                                <Nav.Link className="main-nav-links" href="/yourBlogs">Your Blogs </Nav.Link>
                                <Nav.Link className="main-nav-links" href="/approvals">Approvals</Nav.Link>
                            </Nav>
                            <Nav>
                                <button className="logout-btn" onClick={Logout} >Logout</button>
                                <Nav.Link href="/profile" style={{ color: 'white' }}>Welcome {name}</Nav.Link>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}
export default AdminPanel