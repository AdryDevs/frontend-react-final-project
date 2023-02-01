
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserToggleContext } from "../../UserProvider";
import axios from "axios";
import { Formik } from "formik";
import "./Login.scss";

const LoginComponent = () => {
  const API_URL = "http://localhost:3000/user/login";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    const { email, password } = form;
    setErrors({
      email: !email ? "Please enter an email" : "",
      password: !password ? "Please enter a password" : "",
      noLogin: "",
    });

    const newErrors = {};
    if (!email || email === "Enter your email") {
      newErrors.email = "Please enter an email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      newErrors.email = "Invalid email address";
    if (!password || password === "")
      newErrors.password = "";
    return newErrors;
  };

  const changeLogin = useUserToggleContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log(formErrors);
    } else {
      axios
        .post(API_URL, form)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.username));
          localStorage.setItem("isAdmin", res.data.admin);
          changeLogin(res.data.username, res.data.admin);
          if (res.data.admin) {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        })
        .catch((err) => {
          newErrors.noLogin = "Invalid email or password";
          setErrors(newErrors);
        });
    }
  };

  const initialFormState = {
    email: "",
    password: "",
  };

  const globalError = errors.noLogin ? (
    <div className="error d-block">{errors.noLogin}</div>
  ) : null;

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="text-black my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="px-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Welcome!</h2>
              <p className="text-black-50 mb-5">
                Please enter your email and password
              </p>
              <Formik
                initialValues={initialFormState}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <div
                      className={`error ${
                        errors.email && touched.email ? "d-block" : "d-none"
                      }`}
                    >
                      {errors.email}
                    </div>
                    <MDBInput
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      wrapperClass="mb-4 mx-auto w-100"
                      labelClass="text-black"
                      id="formControlLg"
                      size="lg"
                      error={errors.email && touched.email && errors.email}
                    />
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div
                      className={`error ${
                        errors.password && touched.password
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {errors.password}
                    </div>
                    <MDBInput
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      wrapperClass="mb-4 mx-auto w-100"
                      labelClass="text-black"
                      id="formControlLg"
                      size="lg"
                      error={
                        errors.password && touched.password && errors.password
                      }
                    />
                    <div className="text-center">
                      <MDBBtn
                        disabled={isSubmitting}
                        type="submit"
                        onClick={() => navigate("/user")}
                      >
                        Login
                      </MDBBtn>
                    </div>
                    <div
                      className={`error global-error ${
                        globalError ? "d-block" : "d-none"
                      }`}
                    >
                      {globalError}
                    </div>
                    <MDBBtn
                      type="button"
                      className="mx-2 px-5"
                      color="black"
                      size="lg"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </MDBBtn>
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
