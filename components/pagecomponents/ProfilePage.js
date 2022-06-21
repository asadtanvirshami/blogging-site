import React, { useState, useEffect } from "react";
import { Button, Image, InputGroup, Form, Modal, props } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

export const ProfilePage = ({ user }) => {



  const [bioReg, setBioReg] = useState("");
  const [eduReg, setEduReg] = useState("");
  const [userReg, setUserReg] = useState("");
  const [CountryReg, setCountry] = useState("");
  const [CityReg, setCity] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  // const onFileSelected = async (event, files) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", selectedImage);
  //   formData.append("upload_preset", "coverPics");

  //   await axios.post(process.env.CLOUDINARY_URL, {
  //     formData
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data.url);

  //       axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_PFP, {
  //         username: `${Cookies.get("user")}`,
  //         pfp: data.url,
  //       });

  //       axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_PFP_BLOG, {
  //         username: `${Cookies.get("user")}`,
  //         pfp: data.url,
  //       });
  //     });
  // };

  const update = (e) => {
    e.preventDefault();
     axios
      .post(process.env.NEXT_PUBLIC_FP_UPDATE_USERSINFO, {
        update_user: userReg,
        update_bio: bioReg,
        update_edu: eduReg,
        update_city: CityReg,
        update_country: CountryReg,
      })
      .then((x) => {
        console.log(x.status);
      });
  };

  useEffect(() => {
    let res = axios
      .get(process.env.NEXT_PUBLIC_FP_GET_USERDETAIL, {
        headers: {
          username: `${Cookies.get("user")}`,
        },
      })
      .then((res) => {
        setDetail(res.data.userdetail);
        console.log(res.data.userdetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log[detail];

  const listItems = type.map((d, index) => (
    <option className="scr-form dropdown" key={index}>
      {d.name}
    </option>
  ));

  return (
    <div>

          <Form onSubmit={update}  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="edu"
                autoFocus
                onChange={(e) => {
                  setUserReg(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setBioReg(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Education</Form.Label>
              <Form.Control
                type="text"
                placeholder="edu"
                autoFocus
                onChange={(e) => {
                  setEduReg(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="edu"
                autoFocus
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="edu"
                autoFocus
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" >
            Save Changes
          </Button>
          </Form>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         


      {detail.map((bit, index) => {
        return (
          <div key={index} className="container mx-auto">
            <Form className="container mx-auto">
              <br></br>
              <br></br>

              <br></br>
              <img src={bit.pfp} width={100} height={100} />
              <input
                type="file"
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                }}
              />

              <button
                onClick={(e) => {
                  onFileSelected(e);
                }}
              >
                Upload
              </button>
              <br></br>
              <br></br>
              <h5>Username: {name}</h5>
              <h6>
                Name: {bit.firstname} {bit.lastname}
              </h6>
              <br></br>
              <h6>Bio: {bit.bio}</h6>
              <h6>Country:{bit.country} </h6>
              <h6>City: {bit.city}</h6>
              <h6>Education: {bit.edu}</h6>
              <small onClick={handleShow}>edit</small>
            </Form>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePage;
