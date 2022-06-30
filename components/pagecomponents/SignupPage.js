import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import Router from "next/router";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const SignupPage = () => {
  const [form] = Form.useForm();

  const [usernameReg, setUsername] = useState("");
  const [emailReg, setEmail] = useState("");
  const [FirstReg, setFirst] = useState("");
  const [LastReg, setLast] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  // sending post req to backend

  const register = (e) => {
    e.preventDefault();
    axios
      .post(process.env.NEXT_PUBLIC_FP_POST_USER, {
        FirstName: FirstReg,
        LastName: LastReg,
        email: emailReg,
        password: passwordReg,
        cpassword: Cpassword,
        username: usernameReg,
      })
      .then((x) => {
        if (x.data.message === "Welcome User") {
          Router.push("/login");
        } else {
          console.log(x.data);
        }
      });
  };

  return (
    <div>
      <div className="container ">
        <div className="col-md-12  d-flex justify-content-center signup-form-div">
          <Form
            {...formItemLayout}
            scrollToFirstError
            form={form}
            className="login-form mt-4 login-form px-5 pt-5 pb-5"
          >
            <h1 className="text-center signup-heading mb-5  ">Sign Up</h1>
            <Form.Item
              name="First Name"
              label="First Name"
              rules={[
                {
                  message: "Please input your First name!",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
                placeholder="First Name"
              />
            </Form.Item>

            <Form.Item
              name="Last Name"
              label="Last Name"
              rules={[
                {
                  message: "Please input your Last name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setLast(e.target.value);
                }}
                placeholder="Last Name"
              />
            </Form.Item>

            <Form.Item
              name="Username"
              label="Username"
              tooltip="Set your username for id"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="abc@gmail.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="Confirm"
              label="Confirm Password    "
              className=""
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
                className="confirm-input"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="col-md-12 mt-3"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
