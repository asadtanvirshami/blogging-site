import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Form, Row, Col, InputGroup, Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import Cookies from 'js-cookie';




export const Editor = ({ blog }, props) => {
  const [blog, setBlog] = useState('')
  const [titleLog, setTitle] = useState("");
  const [lastLog, setLast] = useState("");
  const [firstLog, setFirst] = useState("");
  const [detail, setDetail] = useState([]);
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")


  useEffect(() => {
    function getData() {
      setBlog(props.blog)
    }
    getData();
    return () => setBlog('')
  }, [props.blog])

  useEffect(() => setName(Cookies.get('user')), []); console.log(name)

  const onChange = value => {
    setBlog(value);
  };


  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]



  useEffect(() => {


    const res = axios.get(process.env.NEXT_PUBLIC_FP_GET_USERDETAIL, {
      headers: {
        username: `${Cookies.get('user')}`
      }
    }).then((res) => {
      setDetail(res.data.userdetail[0].pfp)
      console.log(res.data.userdetail[0].pfp)
    })
      .catch((err) => {
        console.log(err);
      });

  }, [])
  console.log[detail]

  useEffect(() => {
    let res = axios.get(process.env.NEXT_PUBLIC_FP_GET_USERS,
      {
        headers: {
          username: `${Cookies.get('user')}`

        }
      }).then((res) => {

        setFirst(res.data.user[0].firstname)
        setLast(res.data.user[0].lastname)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])
  console.log[firstLog, lastLog]


  const Post = async (e) => {
    e.preventDefault();
    const res = await axios.post(process.env.NEXT_PUBLIC_FP_POST_BLOG,
      {
        firstName: firstLog,
        lastName: lastLog,
        blogName: titleLog,
        content: blog,
        userLog: name,
        Category: category,
        pfp: detail

      }).then((res) => {
        console.log(res.data)
      });

  }



  return (
    <div className="text-editor">
      <div className="container mt-5 form-bg">
        <Form>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername" >
            <InputGroup hasValidation className="input-div">
              <InputGroup.Text id="inputGroupPrepend" className="blog-input" >Blog Title</InputGroup.Text>
              <Form.Control
                type="blogname"
                placeholder="Blog Title"
                aria-describedby="inputGroupPrepend"
                className="title-holder"
                required
                onChange={(e) => { setTitle(e.target.value) }}
              />

            </InputGroup>
              <Form.Group className="mb-3">
                <Form.Label>Select Category</Form.Label>
                <Form.Select onChange={(e) => { setCategory(e.target.value) }} >
                  <option >Technology</option>
                  <option>Gaming</option>
                  <option>Education</option>
                  <option>Sports</option>
                  <option>Health</option>
                  <option>Photography</option>
                </Form.Select>
              </Form.Group>
          </Form.Group>
          <Row className="">
            <Form.Group className="" controlId="exampleForm.ControlTextarea1">
            </Form.Group>
          </Row>
          <Form.Group className="mb-3 ">
          </Form.Group>
          <ReactQuill
            theme="snow"
            value={blog}
            onChange={onChange}
            placeholder={"Write something awesome..."}
            style={{ color: "white" }}
            modules={modules}
            formats={formats}
          />
          <Button onClick={Post} className="createacc-btn col-md-12" >
            Submit
          </Button>
        </Form>


      </div >



    </div>
  );
};



export default Editor;

