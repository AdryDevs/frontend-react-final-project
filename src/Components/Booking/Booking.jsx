import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingComponent = () => {

    const API_URL = 'https://backendexpressfinalproject-production.up.railway.app/booking/all';
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setBookings(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h2>Bookings</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.email}</td>
                            <td>{booking.startDate}</td>
                            <td>{booking.endDate}</td>
                            <td>{booking.totalPrice}</td>
                            <td>
                                <button className="btn btn-danger mr-2" onClick={() => handleDelete(booking.id)}>Delete</button>
                                <button className="btn btn-primary" onClick={() => handleEdit(booking.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingComponent;