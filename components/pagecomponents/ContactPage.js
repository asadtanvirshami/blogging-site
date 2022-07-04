import React, { useState, useRef } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";

// eslint-disable-next-line react/display-name
export const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [comment, setComment] = useState("");

  // sending post req to backend

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "blognow",
        "template_5nywv2p",
        form.current,
        "AjWOPAYfBXb_5zm6y"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div className="container ">
        <div className="col-md-12  d-flex justify-content-center signup-form-div">
          <Form
            className=" mt-4 login-form px-5 pt-5 pb-5"
            ref={form}
            onSubmit={sendEmail}
          >
            <h1 className="text-center signup-heading mb-5  ">Contact Us</h1>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="user_first"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="user_last"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="user_email"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Subject</Form.Label>
              <Form.Select defaultValue="Choose..." name="user_select">
                <option>Help</option>
                <option>Support</option>
                <option>Queries</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3 mt-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" name="message" rows={3} />
            </Form.Group>
            <Button type="submit" value="Send">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
