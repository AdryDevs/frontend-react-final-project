import React, { useReducer } from 'react';
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
import * as Yup from 'yup';
import { Formik } from 'formik';
import './Login.scss';


const LoginComponent = () => {

  const API_URL = 'https://backendexpressfinalproject-production.up.railway.app/user/login';
  const navigate = useNavigate();
  const changeLogin = useUserToggleContext();
  const initialFormState = {
    email: '',
    password: '',
  };
  const initialErrorsState = {
    email: '',
    password: '',
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return {
          ...state,
          [action.field]: action.value,
        };
      case 'SET_ERRORS':
        return {
          ...state,
          [action.field]: action.error,
        };
      default:
        return state;
    }
  };

  const [form, dispatchForm] = useReducer(formReducer, initialFormState);
  const [errors, dispatchErrors] = useReducer(formReducer, initialErrorsState);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please input a valid email')
      .required('Please enter an email'),
    password: Yup.string().required('Please enter a password'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post(API_URL, values);
      if (data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', JSON.stringify(data.user));
      localStorage.setItem('isAdmin', data.user.admin);
      changeLogin(data.user, data.admin);
      navigate.push(data.user.admin ? '/admin' : '/booking');
      }
      } catch (error) {
      console.log(error);
      if (error.response) {
      const { data } = error.response;
      if (data) {
      dispatchErrors({ type: 'SET_ERRORS', field: 'email', error: data.error });
      }
      }
      setSubmitting(false);
      }
      };
      
      return (
      <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
      <MDBCol col="12">
      <MDBCard className="text-black my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px' }}>
      <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
      <h2 className="fw-bold mb-2 text-uppercase">Welcome!</h2>
      <p className="text-black-50 mb-5">Please enter your email and password</p>
      <Formik
                   initialValues={initialFormState}
                   validationSchema={validationSchema}
                   onSubmit={handleSubmit}
                 >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
      <MDBInput
      type="email"
      name="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      label="Email"
      wrapperClass='mb-4 mx-5 w-100'
      labelClass='text-black'
      id='formControlLg'
      size="lg"
      error={errors.email && touched.email && errors.email}
      />
      <MDBInput
      type="password"
      name="password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      label="Password"
      wrapperClass='mb-4 mx-5 w-100'
      labelClass='text-black'
      id='formControlLg'
      size="lg"
      error={errors.password && touched.password && errors.password}
      />
      <div className="text-center">
      <MDBBtn disabled={isSubmitting} type="submit">Submit</MDBBtn>
      </div>
      </form>
      )}
      </Formik>
      </MDBCardBody>
      </MDBCard>
      </MDBCol>
      </MDBRow>
      </MDBContainer>
      );
      };
      
      export default LoginComponent;