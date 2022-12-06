import React from "react";
import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, useFormik } from "formik";
import { signupSchema } from "../schemas";

export const Signup = ({}) => {
  const onSubmit = async (values, actions) => {
    const options = {
      method: "POST",
      body: `
            { "email":"${values.email}",
              "password":"${values.password}",
              "first_name":"${values.firstName}",
              "last_name":"${values.lastName}",
              "contact":"${values.phoneNumber}",
              "address_1":"${values.address1}",
              "address_2":"${values.address2}",
              "age":"${values.age}"
          }
            
            `,
    };

    await fetch(
      "https://3001-4geeksacade-reactflaskh-yr9yengmj8h.ws-eu77.gitpod.io/api/signup",
      options
    )
      .then((response) => response.json())
      .then((response) => alert(response.msg))
      .catch((err) => alert.error(err));
    await actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      age: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  console.log(errors);

  return (
    <div className="contentWrapper">
    <form
      className="SignUp-container"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
         <h1 className="mb-5">Sign up</h1>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px))",
          gridGap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px #00000029",
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
        <Box>
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword && touched.confirmPassword}
            helperText={
              errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword
            }
            variant="outlined"
          />
        </Box>

        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName && touched.firstName}
          helperText={errors.firstName && touched.firstName && errors.firstName}
          variant="outlined"
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName && touched.lastName}
          helperText={errors.lastName && touched.lastName && errors.lastName}
          variant="outlined"
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phoneNumber && touched.phoneNumber}
          helperText={
            errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
          }
          variant="outlined"
        />
        <TextField
          id="address1"
          name="address1"
          label="Address 1"
          type="text"
          value={values.address1}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address1 && touched.address1}
          helperText={errors.address1 && touched.address1 && errors.address1}
          variant="outlined"
        />
        <TextField
          id="address2"
          name="address2"
          label="Address 2"
          type="text"
          value={values.address2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address2 && touched.address2}
          helperText={errors.address2 && touched.address2 && errors.address2}
          variant="outlined"
        />
        <TextField
          id="age"
          name="age"
          label="Age"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.age && touched.age}
          helperText={errors.age && touched.age && errors.age}
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </form>
    </div>
  );
};
