import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const NewUserBooking = () => {
    const navigate = useNavigate();

    const handleNewBooking = () => {
        navigate('/user/form');
    }



  return (
    <>
      <MDBBtn rounded className='mx-1' color='info' onClick={handleNewBooking}>
        New Booking
      </MDBBtn>

    </>
  );
}

export default NewUserBooking;