import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, useFormik } from "formik";
import { useReducer } from "react";

const UserForm = () => {
  const API_URL = "http://localhost:3000/booking/new";
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
    username: "",
    email: "",
    phone: "",
    date: "",
    meal: "",
    people: "",
    },
    onSubmit: (values) => {
        axios.post(API_URL, values)
            .then((response) => {
              response.json();
                console.log("response");
                if (response) {
                    navigate("/booking/");
                }
            })
            .catch((error) => {
                console.log(error);
                console.log("no vaaaaaa");
            });
    },
    });

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please enter a username"),
        email: Yup.string()
            .email("Please input a valid email")
            .required("Please enter an email"),
        phone: Yup.string()
            .matches(/^[0-9]{9}$/, "Phone number must be 9 digits")
            .required("Please enter a phone number"),
        date: Yup.string().required("Please enter a date"),
        meal: Yup.string().required("Please enter a meal"),
        guests: Yup.string().required("Please enter a number of guests"),
    });


  return (
    <Formik
      initialFormState={{
        username: "",
        email: "",
        phone: "",
        date: "",
        meal: "",
        guests: "",
      }}
      validationSchema={validationSchema}
      onSubmit={formik.handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <MDBRow className="mb-4">
            <MDBCol className="form-group">
              <label>Username</label>
              <Field
                name="username"
                id="username"
                component={MDBInput}
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              
            </MDBCol>
          </MDBRow>
          <div className="form-group">
            <label>Email</label>
            <Field
              name="email"
              id="email"
              component={MDBInput}
              type="email"
              placeholder="Email"
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <Field
              name="phone"
              id="phone"
              component={MDBInput}
              type="tel"
              placeholder="Phone Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
            />
            
          </div>
          <div className="form-group">
            <label>Date</label>
            <Field
              name="date"
              id="date"
              component={MDBInput}
              type="date"
              placeholder="Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
            />
            
          </div>
          <div className="form-group">
            <label>Meal</label>
            <Field
              name="meal"
              id="meal"
              component={MDBInput}
              type="text"
              placeholder="Meal"
              onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.meal}
            />
            
          </div>
          <div className="form-group">
            <label>Guests</label>
            <Field
              name="people"
            id="people"
              component={MDBInput}
              type="number"
              placeholder="Guests"
                onChange={formik.handleChange}
                value={formik.values.guests}
            />
            
            
          </div>
          <div className="form-group">
            <MDBBtn
              disabled={isSubmitting}
              rounded
              className="mx-1"
              color="info"
              type="submit"
              component="button"
            >
              Book now
            </MDBBtn>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
