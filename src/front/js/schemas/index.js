import * as Yup from 'yup'


const emailRules = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const phoneNumberRules = /^[0-9]{10}$/;
const today = new Date();



export const signupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
        .matches(emailRules, 'Email is invalid'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
        .matches(passwordRules, 'Password is invalid'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    address1: Yup.string()
        .required('Address is required'),
    address2: Yup.string(),
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(phoneNumberRules, 'Phone number is invalid'),
    age: Yup.number()
        .required('Age is required')
        .min(18, 'You must be at least 18 years old to use this service')
});

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
        .matches(emailRules, 'Email is invalid'),
    password: Yup.string()
    .required('Password is required')
})

export const familyMemberSchema = Yup.object().shape({
    firstName: Yup.string()
    .required('You must input a name'),
    birthDay: Yup.date().required('Input a date'),
    luckyNumber: Yup.number()
    .required('You must input a lucky number')})

