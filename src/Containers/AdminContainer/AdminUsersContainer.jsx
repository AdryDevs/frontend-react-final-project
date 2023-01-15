
import React from "react";
import Header from "../../Components/Admin/AdminHeader";
import AdminUsersComponent from "../../Components/Admin/AdminUsers";
import { Container, Row, Col } from "react-bootstrap";


const AdminUsersContainer = () => {

    return (
        <Container className="fluid d-flex justify-content-center align-items-center" >
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row>
            <Col>
                <AdminUsersComponent />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminUsersContainer;