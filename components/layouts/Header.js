import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  NavItem,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import AdminPanel from "./AdminPanel";
import Link from "next/link";

export const Header = ({ data }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [log, setLog] = useState();

  useEffect(() => setName(Cookies.get("user")), []);
  useEffect(() => setRole(Cookies.get("isAdmin")), []);

  const Logout = async (e) => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("isAdmin");
    router.push("/login");
  };

  if (role === "admin") {
    return (
      <div>
        <AdminPanel />
      </div>
    );
  } else if (!name) {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" className="navbar-main">
          <Container>
            <Navbar.Brand href="#home" className="logo-name">
              BlogNow.
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ">
                <Nav.Link className="main-nav-links" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="main-nav-links" href="/createBlog">
                  Create Blog
                </Nav.Link>
                <Nav.Link className="main-nav-links" href="/yourBlogs">
                  Your Blogs
                </Nav.Link>
                <Nav.Link className="main-nav-links" href="/contact">
                  Contact Us
                </Nav.Link>
                <NavDropdown
                  title={
                    <span className="text-category my-auto">Dropdown</span>
                  }
                  className="main-nav-links"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/game">Gaming</NavDropdown.Item>
                  <NavDropdown.Item href="/tech">Technology</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link className="signup-btn" href="/signup">SIGN UP</Nav.Link>
                <Button className="logout-btn" onClick={Logout}>
                  LOGIN
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } else if (name) {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" className="navbar-main">
          <Container>
            <Navbar.Brand href="#home" className="logo-name">
              BlogNow.
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ">
                <Nav.Link className="main-nav-links" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="main-nav-links" href="/createBlog">
                  Create Blog
                </Nav.Link>
                <Nav.Link className="main-nav-links" href="/yourBlogs">
                  Your Blogs
                </Nav.Link>
                <Nav.Link className="main-nav-links" href="/contact">
                  Contact Us
                </Nav.Link>
                <NavDropdown
                  title={
                    <span className="text-category my-auto">Dropdown</span>
                  }
                  className="main-nav-links"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/game">Gaming</NavDropdown.Item>
                  <NavDropdown.Item href="/tech">Technology</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="/profile">Welcome {name}</Nav.Link>
                <Button className="logout-btn" onClick={Logout}>
                  LOGOUT
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
};

export default Header;
