import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useUserToggleContext } from '../../UserProvider';
import axios from 'axios';
import { useState } from 'react';
import { useUserContext } from '../../UserProvider';

function RegisterComponent() {
    
        const [form, setForm] = useState({});
        const [errors, setErrors] = useState({});
        const navigate = useNavigate();
        const changeLogin=useUserToggleContext();
    
        const setField = (field, value) => {
            setForm({
                ...form,
                [field]: value
            })
            if (!!errors[field])
                setErrors({
                    ...errors,
                    [field]: null
                })
        }
    
        const validateForm = () => {
            const { username, email, dob, password, password2 } = form;
            const newErrors = {};
            
            if (!username || username === 'Enter username') newErrors.username = 'Please enter a username'
            if (!email || email === 'Enter email'){
                newErrors.email = 'Please enter an email'
            } else if (!/.+\@.+\..+/.test(email)) newErrors.email = 'Please input a valid email'
            if (!dob || dob === '') newErrors.dob = 'Please enter your date of birth'
            if (!password || password === 'Enter your password') newErrors.password= 'Please enter a password'
            else {
                if (!/[?=.*[0-9]]*/.test(password)) newErrors.password = 'Password must contain a number'
                if (!/[?=.*[a-z]]*/.test(password)) newErrors.password = 'Password must contain at least 1 lower case'
                if (!/[?=.*[A-Z]]*/.test(password)) newErrors.password = 'Password must contain at least 1 upper case'
                if (!/[[a-zA-Z0-9]{8,}]*/.test(password)) newErrors.password = 'Password must contain at least 8 characters'
            }
    
            if (!password2 || password2 === 'Repeat your password') newErrors.password2 = 'Please repeat your password'
            else if (password2 !== password) newErrors.password2 = 'The passwords do not match'
    
            return newErrors;
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
            const formErrors = validateForm();
            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
            } else {
                console.log("submited form")
                e.preventDefault()
                 axios.post("https://proyectobackendpeliculas-production.up.railway.app/auth/register",form)
                .then(response=>{
                  console.log(response);
                  if (response) {
                    console.log("Intentando login");
                    const body ={
                        email:form.email,
                        password:form.password
                    }
                    axios.post("https://proyectobackendpeliculas-production.up.railway.app/auth/login", body)
                    .then(response => {
                            localStorage.setItem('token', JSON.stringify(response.data.jwt));
                            localStorage.setItem('username', response.data.username);
                            localStorage.setItem('isAdmin', response.data.admin);
                            changeLogin(response.data.username,response.data.admin);
                            navigate("/"); //TODO navigate depending on user role
                    });
                }
                });
    
            }
        }
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Username' size='lg' id='form1' type='text' onChange={(e) => setField('username', e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form2' type='email'onChange={(e) => setField('email', e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'onChange={(e) => setField('password', e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Confirm password' size='lg' id='form4' type='password'/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterComponent;