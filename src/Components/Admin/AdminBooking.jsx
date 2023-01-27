import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminBooking.scss';

const AdminBooking = () => {

    const API_URL = 'http://localhost:3000/booking/';
    const [bookings, setBookings] = useState([]);

    const handleDelete = (id) => {
        axios.delete(API_URL + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })  
    };

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setBookings(res.data, console.log(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className='table'>
            <h2>Bookings</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.email}</td>
                            <td>{booking.date}</td>
                            <td>{booking.username}</td>
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

export default AdminBooking;