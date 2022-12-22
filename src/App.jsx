import React from 'react';
import './App.css';


import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import Containers
import Login from './Containers/LoginContainer/LoginContainer';


function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </Container>

  );
}

export default App;
