

import React from 'react';

const UserBooking = () => {

    const username = localStorage.getItem('user');


    return (
        <div>
            <h2>{username}'s Bookings</h2>
        </div>
    )
}

export default UserBooking;
