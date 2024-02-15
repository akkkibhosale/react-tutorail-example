import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../utils/common';
import axios from 'axios';


const validationSchema = yup.object({
    emailID: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    userPassword: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Login2 = () => {
    const history = useNavigate();

    return (<div className="mainContainer">
        <div className={"titleContainer mb-3"}>
            <div>Login</div>
        </div>
        <Formik
            initialValues={{ emailID: '', userPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={(
                values,
                { setSubmitting }
            ) => {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                setSubmitting(false);
                var requestOptions = {
                    method: 'POST',
                    body: formData,
                    redirect: 'follow'
                };
                axios({
                    url: "http://localhost/Test/rest_api/login.php",
                    method: "POST",
                    data: formData,
                })
                    // Handle the response from backend here
                    .then((res) => {
                        const response = res.data;
                        if (response.status == true) {
                            setUserSession(response.userData.token, response.userData.fullName);
                            history('/userlist');
                        } else {
                            toast.error(response.message);
                        }
                    })

                    // Catch errors if any
                    .catch((error) => {
                        console.log(error);
                        if (error.response.status === 404) toast.error(error.response.data.message);
                        else toast.error("Something went wrong. Please try again later.");
                    });
            }}
        >
            {
                ({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="emailID" className={"inputBox"} />
                        <ErrorMessage name="emailID" component="div" className="text-danger" />
                        <br /> <br />

                        <Field type="password" name="userPassword" className={"inputBox"} />
                        <ErrorMessage name="userPassword" component="div" className="text-danger" />
                        <br /> <br />
                        <button type="submit" className={"btn btn-dark btn-lg w-100"}>
                            Submit
                        </button>
                    </Form>
                )
            }
        </Formik>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div >
    )
}

export default Login2;
