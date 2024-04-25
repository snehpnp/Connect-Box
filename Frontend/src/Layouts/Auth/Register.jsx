import React, { useEffect } from 'react'
import ToastButton from '../../Components/ExtraComponents/Alert_Toast'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {SignUpUser} from '../../ReduxStore/Slice/Auth/AuthSlice'


import AddForm from "../../Components/ExtraComponents/forms/LoginForm";




const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            fullName: "",
            username: "",
            PhoneNo: "",
            email: "",
            referral: "",

        },
        validate: (values) => {
            const errors = {};


            return errors;
        },
        onSubmit: async (values) => {
            let req = {
                FullName: values.fullName,
                UserName: values.username,
                Email: values.email,
                PhoneNo: values.PhoneNo,
                ReferralCode: values.referral,
            };

 
            await dispatch(SignUpUser(req))
                .unwrap()
                .then((response) => {
                    if (response.status) {
                        toast.success(response.msg);
                        setTimeout(() => {
                            navigate('/login')

                        }, 2000)
                    }
                    else {
                        response.data.map((data, index) => {
                            toast.error(data);
                        })
                    }
                })
                .catch((error) => {
                    console.log("Error", error);
                });

        },
    });

    const fields = [

        {
            name: "fullName",
            label: "Full Name",
            type: "text",
            label_size: 6,
            col_size: 12,
            disable: false,
        },
        {
            name: "username",
            label: "Username",
            type: "text",
            label_size: 12,
            col_size: 12,
            disable: false,
        },
        {
            name: "email",
            label: "Email",
            type: "text",
            label_size: 12,
            col_size: 12,
            disable: false,
        },
        {
            name: "PhoneNo",
            label: "Phone Number",
            type: "text3",
            label_size: 12,
            col_size: 12,
            disable: false,
        },
        {
            name: "referral",
            label: "Referral Code",
            type: "text",
            label_size: 12,
            col_size: 12,
            disable: false,
        },
    ];


    return (
        <>
            <div class="vh-100">
                <div className="authincation h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-md-6">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="auth-form">
                                                <div className="text-center mb-3">
                                                    <span className="brand-logo">
                                                        <img
                                                            className="img-fluid logo-dark mb-2 logo-color"
                                                            src="/assets/img/pnp-logo.png"
                                                            alt="Logo"
                                                            style={{ width: "25rem" }}
                                                        />
                                                    </span>
                                                </div>
                                                <h4 className="text-center mb-4">Sign Up your account</h4>
                                                <AddForm
                                                    fields={fields}
                                                    formik={formik}
                                                    btn_name="Sign Up"
                                                    btn_name1="Sign In"
                                                    btn_name1_route="/login"
                                                />
                                            </div>
                                            <ToastButton />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp