import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Image,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import Router from "next/router";

export const SignupPage = () => {
  const [usernameReg, setUsername] = useState("");
  const [emailReg, setEmail] = useState("");
  const [FirstReg, setFirst] = useState("");
  const [LastReg, setLast] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [CountryReg, setCountry] = useState("");
  const [CityReg, setCity] = useState("");
  const [Cpassword, setCPassword] = useState("");

  // sending post req to backend

  const register = async (e) => {
    e.preventDefault();
    await axios
      .post(process.env.NEXT_PUBLIC_FP_POST_USER, {
        FirstName: FirstReg,
        LastName: LastReg,
        email: emailReg,
        password: passwordReg,
        cpassword: Cpassword,
        username: usernameReg,
        city: CityReg,
        country: CountryReg,
      })
      .then((x) => {
        if (x.data.message === "Welcome User") {
          Router.push("/login");
        } else {
          console.log(x.data);
        }
      });
  };

  //  using useEffect to get country apis

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

  const listItems = type.map((d, index) => (
    <option className="scr-form dropdown" key={index}>
      {d.name}
    </option>
  ));

  return (
    <div>
      <div className=" mt-5 container">
        {/* form div */}
        <h1 className='txt-heading text-center  mt-5'>Signup up for BlogNow!</h1>
        <div className=" col-md-12  d-flex justify-content-center    ">
          <Form
            onSubmit={register}
            className=" sign-form mt-4 login-form px-5 pt-5 pb-5  "
          >
            <h1 className="contact-label-heading text-center mb-4 ">Sign up</h1>

            <Row className="mb-3">
              <Form.Group className="mb-2" as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  onChange={(e) => {
                    setFirst(e.target.value);
                }}
                className="form-space"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  onChange={(e) => {
                    setLast(e.target.value);
                  }}
                  className="form-space"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4"  controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      className="form-space"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-2" md="4" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="xyz@gmail.com" required   className="form-space" onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
                
              </Form.Group>
              <Form.Group className="mb-2" as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Passsword</Form.Label>
                <Form.Control type="text" placeholder="Password"  onChange={(e) => {
                  setPassword(e.target.value);
                }} required   className="form-space"/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" className="mt-2" controlId="validationCustom05">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="text" placeholder="Confirm Password"  onChange={(e) => {
                  setCPassword(e.target.value);
                }} required  className="form-space" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
           
            <div className="col-md-6">
              <Button
                variant="primary"
                className="signup-button col-sm-6"
                type="submit"
              >
                Submit
              </Button>
            </div>
            <Form.Text className="">
                We'll never share your email with anyone else.
              </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
