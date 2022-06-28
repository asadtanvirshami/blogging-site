import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import CooKies from "js-cookie";
import Router from "next/router";
import Cookies from "cookies";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export const LoginPage = () => {
  axios.defaults.withCredentials = true;
  const [userLog, setUserName] = useState("");
  const [passwordLog, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState("");
  const [isLoggedIn, setLoggedIn] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

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
          <Form
            name="normal_login"
            className="login-form mt-4 login-form px-5 pt-5 pb-5"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <h1 className="login-lables-heading text-center mb-5">Login</h1>
            <Form.Item
         
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                 className="control-login"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
               className="control-login"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item className="text-center">
              <Button
                type="primary"
                onClick={Login}
                htmlType="submit"
                className="login-form-button col-md-12 mb-1 mt-3"
              >
                Log in
              </Button>
              <div className="text-center">
              <small className="">or</small>
            </div>
            <Button
             type="primary"
             htmlType="submit"
             className="createacc-btn col-md-12 mb-3"
              href="/signup"
            >
              Create new account
            </Button>
              <div className="col-md-12 text-center">
                <a className="" href="/resetpassword">
                  Forget password?
                </a>
              </div>
            </Form.Item>
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
