
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdminBooking from "../../Components/Admin/AdminBooking";
import Header from "../../Components/Admin/AdminHeader";

const AdminContainer = () => {

    return (
        <Container className="fluid d-flex flex-column">
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col>
                    <AdminBooking />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminContainer