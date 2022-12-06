import React from "react";
import { useState, useEffect } from "react";
import { TextField, Box, Button, dividerClasses, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, useFormik } from "formik";
import { loginSchema } from '../schemas'
import { Navigate, useNavigate } from "react-router-dom";


export const Login = () => {

  const Navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const onSubmit = async (values, actions) => {
    const options ={
      method:'POST',
      body:`{"email": "${values.email}", "password": "${values.password}"}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await fetch(
      "https://3001-4geeksacade-reactflaskh-yr9yengmj8h.ws-eu77.gitpod.io/api/login",
      options
    )
    
      .then((response) => response.json())
      .then((response) => response.access_token ? sessionStorage.setItem('token', response.access_token) : null)
      .catch((error) => alert(error));
    await actions.resetForm();
    
  };

  useEffect (() => {
    if (sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== undefined) {
      Navigate("/user_profile")
    }
  }, [token])


  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmiting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: loginSchema,
  });

console.log(errors);

  return (
      <div className="contentWrapper">
        <form
        className="SignUp-container"
        onSubmit={handleSubmit}
        autoComplete="off"
        >
          <h1 className="mb-5">Log in</h1>
          <Box
          sx={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
            gridGap: "20px",
            justifyContent:"center",
            alignItems:"center",
            width:"100%",
            height:"100%",
            padding:"1rem",
            backgroundColor:"#f5f5f5",
            borderRadius:"10px",
            boxShadow:"0px 0px 10px #00000029",
          }}
          >
            <TextField
            id="email"
            name="email"
            label="Email address"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            variant="outlined"
            />
            <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            variant="outlined"
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmiting}
            >
              Log in
              {isSubmiting && (
                <CircularProgress
                size={24}
                className="buttonProgress"
                />
              )}
            </Button>
          </Box>
        </form>
      </div>
  );
};

export default Login
 