import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";
import { TextField, Box, Button, MenuItem } from "@mui/material";
import { Formik, useFormik } from "formik";
import { familyMemberSchema } from '../schemas';
import Header from '../component/Header';

export const MemberAddition = ({}) => {
    const { store, actions } = useContext(Context);
    const [families, setFamilies] = useState({});

    const onSubmit = async (values, ax) => {
        const options = {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body:`{
                "birth_day":"${values.birthDay}",
                "first_name":"${values.firstName}",
                "lucky_number":${values.luckyNumber},
                "last_name":"${values.lastName}"
            }`};
      await fetch('https://3001-4geeksacade-reactflaskh-yr9yengmj8h.ws-eu77.gitpod.io/api/families/Jackson/members/',
       options)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
      ax.resetForm();
    }
useEffect(() => {
    actions.getFamilies();
}, []);
useEffect (() => {
    setFamilies(store?.families);
}, [store?.families]);

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
          firstName: "",
          luckyNumber: "",
          birthDay: "",
          lastName: ""
        },
        validationSchema: familyMemberSchema,
        onSubmit,
      });
  return (
    <Box m="20px">
    <Header title="Add a new member" subtitle="Create a new member for the family" />
    <div className='contentWrapper'>
  
        <form
        className='SignUp-Container'
        onSubmit={handleSubmit}
        autoComplete="off">

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
        id="firstName"
        label="First Name"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.firstName && touched.firstName}
        helperText={errors.firstName && touched.firstName && errors.firstName}
        variant="outlined"
        />
          { store.families ?<TextField
          name="lastName"
          label="Last Name"
          select
          value={values.lastName}
          onChange={handleChange}
          helperText="Please select a family"
        >
          {store?.families?.map((option) => (
            
            <MenuItem key={option.id} value={option.last_name}>
              {option.last_name}
            </MenuItem>
            ))}
        </TextField>: <></>}
        <TextField
        id="luckyNumber"
        label="Lucky Number"
        name="luckyNumber"
        type="number"
        value={values.luckyNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.luckyNumber && touched.luckyNumber}
        helperText={errors.luckyNumber && touched.luckyNumber && errors.luckyNumber}
        variant="outlined"
        />
        <TextField
        id="birthDay"
        name="birthDay"
        type="date"
        value={values.birthDay}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.birthDay && touched.birthDay}
        helperText={errors.birthDay && touched.birthDay && errors.birthDay}
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
    </Box>
  )
}
