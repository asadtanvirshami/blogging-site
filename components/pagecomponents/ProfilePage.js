import React, { useState, useEffect } from 'react'
import { Button, Image, InputGroup, Form, Modal, props } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';


export const ProfilePage = ({user}) => {

    const { Upload } = require("upload-js");
    const upload = new Upload({ apiKey: "free" });
    const [username, setusername] = useState("");
    const [bioReg, setBioReg] = useState("")
    const [eduReg, setEduReg] = useState("")
    const [userReg, setUserReg] = useState("")
    const [CountryReg, setCountry] = useState("");
    const [CityReg, setCity] = useState("");
    const [name, setname] = useState("")
    const [detail, setDetail] = useState([])





    const [type, setType] = useState([])
    useEffect(() => {
        let res = axios.get('https://restcountries.com/v2/all')

            .then((res) => {
                setType(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])







    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);


    const [selectedFile, setSelectedFile] = useState([]);

    async function onFileSelected(event) {
        const [file] = event.target.files;
        const { fileUrl } = await upload.uploadFile({
            file,
            onBegin: ({ cancel }) => console.log("File upload started!"),
            onProgress: ({ progress }) => console.log(`File uploading... ${progress}%`)
        });
        console.log(`File uploaded! ${fileUrl}`);
        console.log(event.target.files[0]);


        const res = axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_PFP, {
            username: `${Cookies.get('user')}`,
            pfp: `${fileUrl}`
        }).then((x) => {
            console.log("uploaded!")
        })


      const done = axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_PFP_BLOG, {
            user: `${Cookies.get('user')}`,
            pfp: `${fileUrl}`
        })


    }




    const update = (e) => {

        e.preventDefault();
        const res = axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_USERSINFO, {

            username: `${Cookies.get('user')}`,
            update_user: userReg,
            update_bio: bioReg,
            update_edu: eduReg,
            update_city:CityReg,
            update_country:CountryReg

        }) .then((x) => {
            console.log(x.status);
            Cookies.set("user", userReg);
            
        });

    }


    useEffect(() => {
        let res = axios.get(process.env.NEXT_PUBLIC_FP_GET_USERDETAIL,
            {
                headers: {
                    username: `${Cookies.get('user')}`
                },


            }).then((res) => {
                setDetail(res.data.userdetail);
                console.log(res.data.userdetail)
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])
    console.log[detail]







    const listItems = type.map((d, index) => <option className="scr-form dropdown" key={index}>{d.name}</option>);

    return (


        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Setting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="edu"
                                autoFocus
                                onChange={(e) => { setUserReg(e.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => { setBioReg(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Education</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="edu"
                                autoFocus
                                onChange={(e) => { setEduReg(e.target.value) }}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="edu"
                                autoFocus
                                onChange={(e) => { setCountry(e.target.value) }}
                            />
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="edu"
                                autoFocus
                                onChange={(e) => { setCity(e.target.value) }}
                            />
                        </Form.Group>


                   
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={update}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                detail.map((bit, index) => {
                    return (
                        <div key={index} className="container mx-auto" >
                            <Form className="container mx-auto" >

                                <br></br>
                                <br></br>
                                <Image roundedCircle src={bit.pfp} width={100} height={100} />
                                <br></br>
                                <input type="file" onChange={onFileSelected} />
                                <br></br>
                                <br></br>
                                <h5>Username: {name}</h5>
                                <h6>Name: {bit.firstname} {bit.lastname}</h6>
                                <br></br>
                                <h6>Bio: {bit.bio}</h6>
                                <h6>Country:{bit.country} </h6>
                                <h6>City: {bit.city}</h6>
                                <h6>Education: {bit.edu}</h6>
                                <small onClick={handleShow}>edit</small>

                            </Form>
                        </div>

                    )
                })}

        </div>
    )
}

export default ProfilePage