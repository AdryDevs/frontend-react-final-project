
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserBooking from "../../Components/UserBookingComponent/UserBookingComponent";


const UserPage = () => {

    return (
        <div>
            <Row>
                <Col>
                    <UserBooking />
                </Col>
            </Row>
        </div>
    )
}

export default UserPage;

    