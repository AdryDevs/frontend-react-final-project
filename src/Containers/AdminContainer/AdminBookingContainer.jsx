
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdminBooking from "../../Components/Admin/AdminBooking";
import Header from "../../Components/Admin/AdminHeader";

const AdminContainer = () => {

    return (
        <div>
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
        </div>
    )
}

export default AdminContainer