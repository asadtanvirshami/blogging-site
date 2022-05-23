import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Navbar, Nav, Container, NavDropdown,Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import AdminPanel from './AdminPanel'
import Link from 'next/link'


export const Header = () => {

    
    const router = useRouter()
    const [name,setName] = useState("")
    const [role,setRole] = useState("")

    useEffect(() => setName(Cookies.get('user')), [])
    useEffect(() => setRole( Cookies.get('isAdmin')), [])

    

    const Logout = async (e) => {
        const res = await axios.get(process.env.NEXT_PUBLIC_FP_POST_LOGOUT).then((res) => {
            console.log(res)
            console.log(res)
            router.push("/login")
        })
    };


    return role === 'admin' ? (
        <div>
            <AdminPanel />
        </div>
    ) : (
        <div>
        
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Container>
                    <Navbar.Brand href="#home" className="logo-name">BlogNow.</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto ">
                            <Nav.Link className="main-nav-links" href="/">Home</Nav.Link>
                            <Nav.Link className="main-nav-links" href="/blogfeed">Blog Feed</Nav.Link>
                            <Nav.Link className="main-nav-links" href="/createBlog">Create Blog</Nav.Link>
                            <Nav.Link className="main-nav-links" href="/yourBlogs">Your Blogs </Nav.Link>
                            <Nav.Link className="main-nav-links" href="/contact">Contact Us</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/profile" >Welcome  {name}</Nav.Link>

                            <Button className="logout-btn" onClick={Logout} >Logout</Button>
                            
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header

export async function getServerSideProps({ req, res }) {
    // Fetch data from external API
    // const cookies = new Cookies(req, res)
    // const value = await axios.get('http://localhost:8086/getToken', {
    //     headers: {
    //         "x-access-token": `${cookies.get('token')}`,
    //         "user": `${cookies.get('user')}`,
    //         "role": `${cookies.get('isAdmin')}`
    //     }
    // }).then((x) => x.data);
    // console.log(value)
    // const sessionData = await value

    // // Pass data to the page via props
    // return {
    //     props: { sessionData: sessionData }
    // }
}
