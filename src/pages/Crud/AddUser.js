import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react"
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../../Redux/counterSlice'

function Adduser() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const params = useParams();
    const getlocalUseInfo = JSON.parse(localStorage.getItem('userinfo'));
    const [userinfo, setUserInfo] = useState(!getlocalUseInfo ? [] : getlocalUseInfo);
    const [useretails, setUserDetails] = useState(!params.id ? "" : userinfo[params.id]);
    const history = useNavigate();

    const validationSchema = yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email().required('Email is required'),
        phone: yup
            .string()
            .required('Contact number is required')
            .matches(
                /^([7-9]{1})([\d]{9})$/g,
                "Invalid phone number"
            ),
        address: yup.string().required('Address is required'),
    });

    console.log(count[params.id].firstName);
    const initialValues = {
        firstName: count ? count[params.id].firstName : "",
        lastName: count ? count[params.id].lastName : "",
        email: count ? count[params.id].email : "",
        phone: count ? count[params.id].phone : "",
        address: count ? count[params.id].address : ""
    }
    const onSubmit = (values) => {
        if (params.id) {
            userinfo[params.id] = values;
            dispatch(incrementByAmount({ values: values, id: params.id }))
            setUserInfo([...userinfo]);
            toast.success('User ' + values.firstName + ' ' + values.lastName + ' update successfully..!')
            // setTimeout(function () {
            //     history('/crud/userlist');
            // }, 5000)
        } else {
            if (userinfo.includes(values)) {
                toast.error('Employee Already exists..!')
            } else {
                setUserInfo([...userinfo, values]);
                toast.success('User ' + values.firstName + ' ' + values.lastName + ' register successfully..!')
            }
        }
    }

    useEffect(() => {
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
    }, [userinfo]);

    return (
        <div className="mainContainer">
            <div style={{ "width": "400px" }} className={"table-title mb-3 text-center"}>
                <h1>{useretails ? 'Edit' : 'Add'} Employee
                    {/* <span>{JSON.stringify(count)}</span> */}
                </h1>
            </div>
            <Link to="/crud/userlist" className="btn btn-success" data-toggle="modal"><FaUserCircle /> <span>View Employee List</span></Link>

            <ToastContainer />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                }}
            >
                {/* {(props) => ( */}
                <Form>
                    <div>
                        <Field type="text" className="inputBox mt-3" name="firstName" placeholder="Enter First Name" />
                        <ErrorMessage name="firstName" component="div" className="text-danger" />
                    </div>
                    <div>
                        <Field type="text" className="inputBox mt-3" name="lastName" placeholder="Enter Last Name" />
                        <ErrorMessage name="lastName" component="div" className="text-danger" />
                    </div>
                    <div>
                        <Field type="email" className="inputBox mt-3" name="email" placeholder="Enter email" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div>
                        <Field type="tel" className="inputBox mt-3" name="phone" placeholder="Enter contact number" />
                        <ErrorMessage name="phone" component="div" className="text-danger" />
                    </div>
                    <div>
                        <Field type="text" className="inputBox mt-3" name="address" placeholder="Enter Address" />
                        <ErrorMessage name="address" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className={"btn btn-dark btn-lg w-100 mt-3"} >
                        {useretails ? 'Update' : 'Add'} Employee
                    </button>
                </Form>
                {/* )} */}
            </Formik>
        </div >)
}
export default Adduser;