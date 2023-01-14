import React from 'react';


import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserProvider';

//import Containers
import Login from './Containers/LoginContainer/LoginContainer';
import Register from './Containers/RegisterContainer/RegisterContainer';
import Admin from './Containers/AdminContainer/AdminContainer';
import Booking from './Containers/BookingContainer/BookingContainer';
import AdminUsers from './Containers/AdminContainer/AdminUsersContainer';
import AdminBooking from './Containers/AdminContainer/AdminBookingContainer';


function App() {
  return (
    <UserProvider>
      <Container fluid className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin/bookings" element={<AdminBooking />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </UserProvider>
  );
}

export default App;
