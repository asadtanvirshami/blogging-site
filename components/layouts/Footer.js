import React from "react";
import { Col, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="main-footer mt-5">
      <Row className="container mx-auto">
        <Col md="7" className="support-col mx-auto mt-4">
          <ul style={{ listStyle: "none" }}>
            <h6 style={{ color: "white" }}>Support</h6>
            <li>Email: Blognow@gmail.com</li>
            <li>Phone: 088557442114</li>
            <li>Liberty City, USA</li>
          </ul>
        </Col>
        <Col md="4" className="mt-3 ">
          <ul>
            <h6 style={{ color: "white" }}>About this platform</h6>
            <li className="txt-about" style={{ listStyle: "none" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </li>
          </ul>
        </Col>
        <Col md="12" className="mt-3 text-center">
          <small>Copyright© BlogNow 2022 </small>
        </Col>
      </Row>
    </footer>
  );
};
