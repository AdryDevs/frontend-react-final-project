import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useUserToggleContext } from '../../UserProvider';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import './Register.scss';

function RegisterComponent() {

  const API_URL = 'http://localhost:3000/user/register';
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
        navigate(response.data.admin ? '/admin' : '/user');
      }
    } catch (error) {
      // TODO: Handle error
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
                <label><b>Username</b></label>
                <div className={`error ${errors.username && touched.username ? 'd-block' : 'd-none'}`}>
                  {errors.username}
                </div>
                <MDBInput
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username && touched.username && errors.username}
                />
                <label><b>Email</b></label>
                <div className={`error ${errors.email && touched.email ? 'd-block' : 'd-none'}`}>
                  {errors.email}
                </div>
                <MDBInput
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email && errors.email}
                />
                <label><b>Password</b></label>
                <div className={`error ${errors.password && touched.password ? 'd-block' : 'd-none'}`}>
                  {errors.password}
                </div>
                <MDBInput
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password && errors.password}
                />
                <label><b>Confirm Password</b></label>
                <MDBInput
                  type="password"
                  name="password2"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password2 && touched.password2 && errors.password2}
                />
                <div className="text-center">
                  <MDBBtn disabled={isSubmitting} type="submit">Register</MDBBtn>
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