import React from 'react';
import './App.css';


import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserProvider';

//import Containers
import Login from './Containers/LoginContainer/LoginContainer';
import Register from './Containers/RegisterContainer/RegisterContainer';


function App() {
  return (
    <UserProvider>
      <Container fluid className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />            
          </Routes>
        </BrowserRouter>
      </Container>
    </UserProvider>
  );
}

export default App;
