
import React from "react";
import Header from "../../Components/Admin/AdminHeader";
import AdminUsersComponent from "../../Components/Admin/AdminUsers";
import { Container, Row, Col } from "react-bootstrap";


const AdminUsersContainer = () => {

    return (
        <div>
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
        </div>
    )
}

export default AdminUsersContainer;