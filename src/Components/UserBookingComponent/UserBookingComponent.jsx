import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/AdminBooking.scss'
import UserBookingName from '../UserNameComponent/UserNameComponent';

const UserBooking = () => {
    const id = localStorage.getItem('id');
    const API_URL = 'http://localhost:3000/booking/'+ id;
    const [bookings, setBookings] = useState([]);



    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method:'DELETE',
            headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`},
        }
        axios.delete(API_URL + id, requestOptions)
            .then(res => {
                setBookings(bookings.filter(booking => booking.id !== id));
            })  
    };

    useEffect(() => {
        axios.get(API_URL, {
            headers: {
                Authorization: 'Bearer ' +  localStorage.getItem('token')
            }
        })

            .then(res => {
                console.log(res.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, []);



    return (
        <div className='table'>
            <UserBookingName />
            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Meal</th>
                        <th>Guests</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id_user}>
                            <td>{booking.email}</td>
                            <td>{booking.phone}</td>
                            <td>{booking.date}</td>
                            <td>{booking.meal}</td>
                            <td>{booking.people}</td>

                            <td>
                                <button className="btn btn-danger mr-2" onClick={() => handleDelete(booking.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserBooking;