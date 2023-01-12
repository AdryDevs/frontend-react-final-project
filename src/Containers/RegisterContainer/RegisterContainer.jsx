
import { Row, Col } from "react-bootstrap";

import "./RegisterContainer.scss";
import Register from "../../Components/Register/Register";

const RegisterContainer = () => {
    return (
        <Row className="containerRegister">
            <Col />
            <Col xs={10} sm={8} md={6} lg={12}>
            <Register />
            </Col>
            <Col />
        </Row>
    );
}

export default RegisterContainer;
