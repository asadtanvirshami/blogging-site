import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select,Option } from "antd";
import axios from "axios";
import Router from "next/router";
import Cookies from "cookies";

// eslint-disable-next-line react/display-name
export const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [comment, setComment] = useState("");

  // sending post req to backend

  const contact = (e) => {
    e.preventDefault();
    axios
      .post(process.env.NEXT_PUBLIC_FP_POST_CONTACT, {
        name: name,
        email: email,
        country: country,
        comment: comment,
      })
      .then((x) => console.log(x.data));
  };

  // using useEffect to get country apis

  const [type, setType] = useState([]);

  useEffect(() => {
    let res = axios
      .get("https://restcountries.com/v2/all")

      .then((res) => {
        setType(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const a variable to use map function

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

  /* eslint-disable no-template-curly-in-string */

  return (
    <div>
      <div className="container ">
        <div className="col-md-12  d-flex justify-content-center signup-form-div">
          <Form {...formItemLayout} className="login-form mt-4 px-5  pt-5 pb-5">
            <h1 className="text-center signup-heading mb-5  ">Contact Us</h1>
            <Form.Item
              name={["user", "name"]}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name="Country"
              label="Country"
              rules={[{ required: true, message: "Missing area" }]}
            >
              <Select placeholder="Select Country" onChange={setCountry}>
                {type.map((d, index) => (
                  <option className="scr-form dropdown" key={index}>
                    {d.name}
                  </option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              className=""
              name={["user", "introduction"]}
              label="Introduction"
            >
              <Input.TextArea
                className="input-contact"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={contact}
                className="col-md-12"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
