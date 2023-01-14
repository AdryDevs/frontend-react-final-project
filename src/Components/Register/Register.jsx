import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useUserToggleContext } from '../../UserProvider';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';

function RegisterComponent() {

  const API_URL = 'https://backendexpressfinalproject-production.up.railway.app/user/register';
  const navigate = useNavigate();
  const changeLogin = useUserToggleContext();
  const initialFormState = {
    username: '',
    email: '',
    dob: '',
    password: '',
    password2: '',
  };
  const initialErrorsState = {
    username: '',
    email: '',
    dob: '',
    password: '',
    password2: '',
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
    username: Yup.string().required('Please enter a username'),
    email: Yup.string()
      .email('Please input a valid email')
      .required('Please enter an email'),
    password: Yup.string()
      .matches(/[?=.*[0-9]]*/, 'Password must contain a number')
      .matches(/[?=.*[a-z]]*/, 'Password must contain at least 1 lower case')
      .matches(/[?=.*[A-Z]]*/, 'Password must contain at least 1 upper case')
      .matches(/[[a-zA-Z0-9]{8,}]*/, 'Password must contain at least 8 characters')
      .required('Please enter a password'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'The passwords do not match')
      .required('Please repeat your password'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(API_URL, values);
      setSubmitting(false);
      if (response) {
        sessionStorage.setItem('token', JSON.stringify(response.data.jwt));
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('isAdmin', response.data.admin);
        changeLogin(response.data.username, response.data.admin);
        navigate.push(response.data.admin ? '/admin' : '/');
        }
        } catch (error) {
        console.log(error);
        }
        };
        
        return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center' >
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
        <Formik
                 initialValues={initialFormState}
                 validationSchema={validationSchema}
                 onSubmit={handleSubmit}
               >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
        <MDBInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Username"
        error={errors.username && touched.username && errors.username}
        />
        <MDBInput
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Email"
        error={errors.email && touched.email && errors.email}
        />
        <MDBInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Password"
        error={errors.password && touched.password && errors.password}
        />
        <MDBInput
        type="password"
        name="password2"
        value={values.password2}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Confirm Password"
        error={errors.password2 && touched.password2 && errors.password2}
        />
        <div className="text-center">
        <MDBBtn disabled={isSubmitting} type="submit">Submit</MDBBtn>
        </div>
        </form>
        )}
        </Formik>
        </MDBCardBody>
        </MDBCard>
        </MDBContainer>
        );
        }
        
        export default RegisterComponent;