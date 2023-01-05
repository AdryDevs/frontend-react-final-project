

import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useUserToggleContext } from '../../UserProvider';
import axios from 'axios';

const LoginComponent = () => {
  
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
    if (!!error[field]) setError({
      ...error,
      [field]: null
    });
  };
  // Validate form
  const validateForm = () => {
    const { email, password } = form;
    setError({
      email: !email ? 'Email is required' : null,
      password: !password ? 'Password is required' : null
    });

    return !email || !password;
  };
  // Login
  const changeLogin = useUserToggleContext();
  
  // Form data is sent to the backend to be validated against the database and if it's valid, the user is logged in, otherwise an error is displayed.
  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      console.log(formErrors);
    } else {
      axios.post('backendexpressfinalproject-production.up.railway.app/login', form)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('isAmdin', res.data.user.admin);
          changeLogin(res.data.user, res.data.admin);
          navigate('/');//TODO navigate to page depending on user type
        }).catch((err) => {
          newError.noLogin = 'Email or password is incorrect';
          setError(newError);
        });
    }
  };

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='text-black my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Welcome!</h2>
              <p className="text-black-50 mb-5">Please enter your email and password</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Password' id='formControlLg' type='password' size="lg"/>

              <p className="small mb-3 pb-lg-2"><a class="text-black-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-2 px-5' color='black' size='lg'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a class="text-black-50 fw-bold" onClick={handleClick}>Register</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default LoginComponent;