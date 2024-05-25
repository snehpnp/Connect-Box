import React, { useEffect } from 'react'
import ToastButton from '../../Components/ExtraComponents/Alert_Toast'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { SignUpUser } from '../../ReduxStore/Slice/Auth/AuthSlice'
import Swal from 'sweetalert2';


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
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1200,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: "Signed in successfully"
                        });
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




            <div className="main-wrapper login-body" >
                <div className="login-wrapper">
                    <div className="container" >

                        <div className="loginbox">

                            <div className='row'>
                                <div className='col-md-6 border-right'>
                                    <div className='login-left '>

                                        {/* <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p> */}
                                        <img src="/assets/img/gif/login.gif" className='login-light-img'></img>

                                        <img src="/assets/img/gif/login-dark.gif" className='login-dark-img'></img>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="login-right ps-0">
                                        <div className="login-right-wrap ">


                                            <img
                                                className="img-fluid logo-dark mb-2"
                                                src="/assets/img/pnp.png"
                                                alt="Logo"
                                                style={{ width: "15rem" }}
                                            />

                                            {/* <h4 className="text-center mb-4">Sign Up your account</h4> */}
                                            <AddForm
                                                fields={fields}
                                                formik={formik}
                                                btn_name="Submit"
                                            // btn_name1="Sign In"
                                            // btn_name1_route="/login"
                                            />
                                            <div className="text-center dont-have">
                                                Have an account?
                                                <Link to="/login"> Log in</Link>
                                            </div>
                                            <ToastButton />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <ToastButton />






            </div>












            {/* <div className="vh-100">
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
            </div> */}
        </>
    )
}
export default SignUp