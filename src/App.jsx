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


function App() {
  return (
    <UserProvider>
      <Container fluid className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </UserProvider>
  );
}

export default App;
