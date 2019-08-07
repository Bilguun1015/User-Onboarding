import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const NewUserForm = ({ errors, touched, values }) => {
    return(
        <div className="newUser-form">
            <h1>New User Form</h1>
            <Form>
                <Field name="username" type="text" placeholder="Username"/>
                {touched.username && errors.username && <p>{errors.username}</p>}

                <Field name="email" type="email" placeholder="Email"/>
                {touched.email && errors.email && <p>{errors.email}</p>}

                <Field name="password" type="password" placeholder="Password"/>
                {touched.password && errors.password && <p>{errors.password}</p>}

                <label className="checkbox-container">
                    <p>Terms of Service</p>
                    <Field type="checkbox" name="consent" checked={values.consent}/>
                    
                    <span className="checkmark" />
                </label>
                {touched.consent && errors.consent && <p>{errors.consent}</p>}

                <button type="submit">Submit!</button>
            </Form>
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ username, email, password, consent }) {
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            termsOfService: consent || false
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('username is required'),
        email: Yup.string().email('E-mail is not valid!').required('E-mail is required'),
        password: Yup.string().min(8, 'Password has to be longer than 8 characters!').required('Password is required'),
        consent: Yup.bool().test('consent', 
                                'You have to agree with our Terms and Conditions!',
                                value => value === true).required('You have to agree with our Terms and Conditions!')
    }),

    handleSubmit(values) {
        axios
            .post(`https://reqres.in/api/users`, values)
            .then(res => console.log(res))
            .catch(err => console.log(err.response));
    }


})(NewUserForm)

export default FormikForm;