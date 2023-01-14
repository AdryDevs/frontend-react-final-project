
import { Row, Col } from "react-bootstrap";

import "./RegisterContainer.scss";
import Register from "../../Components/Register/Register";

const RegisterContainer = () => {
    return (
        <Row className="containerRegister">
            <Col />
            <Col xs={12} sm={10} md={8} lg={8}>
            <Register />
            </Col>
            <Col />
        </Row>
    );
}

export default RegisterContainer;
