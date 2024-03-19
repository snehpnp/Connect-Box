import React, { useState } from 'react';
import * as Config from "../../Utils/Config";
import axios from 'axios';
// import {
//     SignIn
//   } from "../../ReduxStore/Slice/Auth/AuthSlice";
  import { useDispatch, useSelector } from "react-redux";
  import toast, { Toaster } from "react-hot-toast";
  import ToastButton from "../../Components/ExtraComponents/Alert_Toast";



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async() => {
        // let req = {
        //     Email: email,
        //     Password: password,
        //     device: "WEB",
        //   };
    
        //   await dispatch(SignIn(req))
        //     .unwrap()
        //     .then(async (response) => {
    
    
        //       if (response.status) {
        //         await SetTheme()
    
        //         if (response.data.Role !== "SUPERADMIN") {
        //           setshowModal(true);
        //           setUserData(response.data);
        //         } else if (response.data.Role === "SUPERADMIN") {
        //           toast.success(response.msg);
        //           localStorage.setItem(
        //             "user_details",
        //             JSON.stringify(response.data)
        //           );
        //           localStorage.setItem(
        //             "user_role",
        //             JSON.stringify(response.data.Role)
        //           );
        //           setTimeout(() => {
        //             navigate("/super/dashboard");
        //           }, 1000);
        //         }
        //       } else {
    
        //         toast.error(response.msg);
        //       }
        //     })
        //     .catch((error) => {
        //       console.log("Error", error);
        //     });
    };
    
    
    
    

    return (
        <>
            <div className="main-wrapper login-body">
                <div className="login-wrapper">
                    <div className="container">
                        <img
                            className="img-fluid logo-dark mb-2 logo-color"
                            src="assets/img/logo2.png"
                            alt="Logo"
                        />
                        <img
                            className="img-fluid logo-light mb-2"
                            src="assets/img/logo2-white.png"
                            alt="Logo"
                        />

                        <div className="loginbox">
                            <div className="login-right">
                                <div className="login-right-wrap">
                                    <h1>Login</h1>
                                    <p className="account-subtitle">Access to our dashboard</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3   ">
                                            <label className="form-control-label d-flex justify-content-start" htmlFor="email">Email Address</label>
                                            <input type="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
                                        </div>

                                        <div className="input-block mb-3">
                                            <label className="form-control-label d-flex justify-content-start" htmlFor="password">Password</label>
                                            <div className="pass-group">
                                                <input type="password" id="password" className="form-control pass-input" value={password} onChange={handlePasswordChange} />
                                                <span className="fas fa-eye toggle-password" />
                                            </div>
                                        </div>

                                        <div className="input-block mb-3">
                                            <div className="row">
                                                <div className='d-flex justify-content-between'>
                                                    <div className="form-check custom-checkbox ">
                                                        <input type="checkbox" className="form-check-input " id="cb1" />
                                                        <label className="custom-control-label " htmlFor="cb1">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <div className="form-check custom-checkbox gap-2">
                                                        <a className="forgot-link" href="forgot-password.html" style={{ color: 'white' }}>
                                                            Forgot Password ?
                                                        </a>
                                                    </div>
                                                </div>


                                                <div className="col-6 text-end">

                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-lg btn-primary w-100" type="submit">
                                            Login
                                        </button>

                                        <div className="login-or">
                                            <span className="or-line" />
                                            <span className="span-or">or</span>
                                        </div>

                                        <div className="social-login mb-5">
                                            <span >Login with</span>
                                            <div className='mt-2'>
                                                <a href="#" className="facebook">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                                <a href="#" className="google">
                                                    <i className="fab fa-google" />
                                                </a>
                                            </div>

                                        </div>

                                        <div className="text-center dont-have">
                                            Don't have an account yet? <a href="register.html">Register</a>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastButton />
            </div>
        </>
    );
}

export default Login;
