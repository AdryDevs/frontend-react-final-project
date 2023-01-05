
import React from "react";
import { Row, Col } from "react-bootstrap";

import "./RegisterContainer.scss";
import RegisterComponent from "../../Components/Register/Register";

const RegisterContainer = () => {
    return (
        <Row className="containerRegister">
        <Col />
        <Col xs={10} sm={8} md={6} lg={4}>
            <RegisterComponent />
        </Col>
        <Col />
        </Row>
    );
    }

export default RegisterContainer;
