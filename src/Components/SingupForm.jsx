import { useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import './signup.css';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmedPassword: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(4, 'Name is larger 4 character'),
      email: Yup.string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter is valid'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/,
          'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, no space.'
        ),
      confirmedPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(
          /^(([+]{0,1}\d{2})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/gm,
          'Must be a valid phone number'
        ),
    }),
    onSubmit: (values) => {
      window.alert('Form is submited');
      formik.resetForm();
    },
  });

  console.log(formik.errors.email);

  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label>Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter your name"
        />
        {formik.errors.name && <p className="errorMsg">{formik.errors.name}</p>}
        <label>Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && (
          <p className="errorMsg">{formik.errors.email}</p>
        )}
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />{' '}
        {formik.errors.password && (
          <p className="errorMsg">{formik.errors.password}</p>
        )}
        <label>Confirm Password</label>
        <input
          type="password"
          id="confirmedPassword"
          name="confirmedPassword"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          placeholder="Confirm your password"
        />
        {formik.errors.confirmedPassword && (
          <p className="errorMsg">{formik.errors.confirmedPassword}</p>
        )}
        <label>Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Enter your phone number"
        />
        {formik.errors.phone && (
          <p className="errorMsg">{formik.errors.phone}</p>
        )}
        <button type="submit">Continue</button>
      </form>
    </section>
  );
};

export default SignupForm;
