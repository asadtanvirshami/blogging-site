import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import CooKies from "js-cookie";
import Router from "next/router";
import Cookies from "cookies";

export const LoginPage = () => {
  axios.defaults.withCredentials = true;
  const [userLog, setUserName] = useState("");
  const [passwordLog, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState("");
  const [isLoggedIn, setLoggedIn] = useState("");
  // sending post req to backend

  const Login = (e) => {
    e.preventDefault();
    axios
      .post(process.env.NEXT_PUBLIC_FP_POST_AUTH, {
        username: userLog,
        password: passwordLog,
      })
      .then((res) => {
        console.log(res);
        if (!res.data.auth) {
          setLoginStatus(res.data.message);
          setLoggedIn(false);
        } else {
          CooKies.set("token", res.data.accessToken);
          CooKies.set("user", res.data.username);
          CooKies.set("isAdmin", res.data.role);
          console.log(res.data);
          setLoggedIn(true);
          Router.push("/");
        }
      });
  };

  useEffect(() => {
    const res = axios
      .get(process.env.NEXT_PUBLIC_FP_GET_AUTH_DETAIL)
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div>
      <div className="container ">
        {/* form div */}
        <div className="col-md-12  d-flex justify-content-center ">
          <Form className="mt-4 login-form px-5 pt-5 pb-5 " onSubmit={Login}>
            <h1 className="login-lables-heading text-center mb-4">BlogNow</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="login-lables">Username</Form.Label>
              <Form.Control
                type="name"
                className="form-space"
                placeholder="Enter email"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="login-lables">Password</Form.Label>
              <Form.Control
                className="form-space"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button className="login-btn col-md-12 mt-3" type="submit">
              Login
            </Button>
            <div className="text-center">
              <Form.Text className="">or</Form.Text>
            </div>

            <Button
              href="/signup"
              className="createacc-btn col-md-12 mb-2"
              type="submit"
            >
              Create new account
            </Button>
            <div className="col-md-12 text-center">
              <a className="">Forget password?</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps({ req, res }) {
  // Fetch data from external API
  const cookies = new Cookies(req, res);
  const value = await axios
    .get(process.env.NEXT_PUBLIC_FP_GET_JWT, {
      headers: {
        "x-access-token": `${cookies.get("token")}`,
        user: `${cookies.get("user")}`,
        role: `${cookies.get("isAdmin")}`,
      },
    })
    .then((x) => x.data);
  console.log(value);
  const sessionData = await value;

  // Pass data to the page via props
  return {
    props: { sessionData: sessionData },
  };
}
