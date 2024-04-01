import React, { useState, useEffect } from 'react';

import { SignIn } from "../../ReduxStore/Slice/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ToastButton from "../../Components/ExtraComponents/Alert_Toast";
import Modal from '../../Components/Dashboard/Models/Model'
import OtpInput from "react-otp-input";
import Lodding from '../../Utils/Loader';

import { useNavigate } from "react-router-dom";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [typeOtp, setTypeOtp] = useState("");

    const [getData, SetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const verifyOTP = () => {

        var Otp = getData && getData.mobile.slice(-4)

        if (typeOtp.length !== 4) {
            toast.error('Please Fill Otp');
        } else if (Otp !== typeOtp) {
            toast.error('Otp Is Incorect');
        } else {
            if (getData.Role === "ADMIN") {
                toast.success('login Successful');
                localStorage.setItem(
                    "user_details",
                    JSON.stringify(getData)
                );
                localStorage.setItem(
                    "user_role",
                    JSON.stringify(getData.Role)
                );
                localStorage.setItem("theme_mode", "dark");
                setIsLoading(true)
                setShowModal(false)
                setTimeout(() => {
                    navigate("/admin/dashboard")
                }, 1000);

            } else if (getData.Role === "SUBADMIN") {
                toast.success("login Successful");
                localStorage.setItem(
                    "user_details",
                    JSON.stringify(getData)
                );
                localStorage.setItem("theme_mode", "dark");

                localStorage.setItem(
                    "user_role",
                    JSON.stringify(getData.Role)
                );
                localStorage.setItem("theme_mode", "dark");

                setIsLoading(true)
                setShowModal(false)

                setTimeout(() => {
                    navigate("/subadmin/dashboard")
                }, 1000);

            } else if (getData.Role === "EMPLOYEE") {
                toast.success("login Successful");
                localStorage.setItem(
                    "user_details",
                    JSON.stringify(getData)
                );
                localStorage.setItem(
                    "user_role",
                    JSON.stringify(getData.Role)
                );
                localStorage.setItem("theme_mode", "dark");

                setIsLoading(true)
                setShowModal(false)

                setTimeout(() => {
                    navigate("/employee/dashboard")
                }, 1000);

            } else {
                toast.success("login Successful");
                localStorage.setItem(
                    "user_details",
                    JSON.stringify(getData)
                );
                localStorage.setItem(
                    "user_role",
                    JSON.stringify(getData.Role)
                );
                localStorage.setItem("theme_mode", "dark");

                setIsLoading(true)
                setShowModal(false)
                setTimeout(() => {
                    navigate("/user/dashboard")
                }, 1000);

            }
        }


    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        let req = {
            Email: email,
            Password: password,
            device: "WEB",
        };

        await dispatch(SignIn(req))
            .unwrap()
            .then(async (response) => {
                if (response.status) {

                    SetData(response.data)
                    setShowModal(true)
                } else {
                    toast.error(response.msg);
                }

            })
            .catch((error) => {
                console.log("Error", error);
            });
    };



    const handleChange = (value) => {
        const numericValue = value.replace(/\D/g, '');
        setTypeOtp(numericValue);
    };



    return (

        <>

            <>
                <div className="main-wrapper login-body">
                    <div className="login-wrapper">
                        <div className="container">
                            <img
                                className="img-fluid logo-dark mb-2 logo-color"
                                src="assets/img/logo2.png"
                                alt="Logo"
                            />
                        

                            <div className="loginbox">
                                <div className="login-right">
                                    <div className="login-right-wrap">
                                        <h1>Login</h1>
                                        <p className="account-subtitle">Access to our dashboard</p>

                                        <div>
                                            <div className="mb-3">
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

                                            <button className="btn btn-lg btn-primary w-100" onClick={handleSubmit}>
                                                Login
                                            </button>
                                        </div>

                                        <div className="login-or">
                                            <span className="or-line" />
                                            <span className="span-or">or</span>
                                        </div>

                                        <div className="social-login mb-5">
                                            <span >Login with</span>
                                            <div className='mt-2'>
                                                <a href="/" className="facebook">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                                <a href="/" className="google">
                                                    <i className="fab fa-google" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="text-center dont-have">
                                            Don't have an account yet? <a href="register.html">Register</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ToastButton />
                </div>


                {/* For Varify OTP Modal */}
                {showModal ? (
                    <>
                        <Modal
                            isOpen={showModal}
                            handleClose={() => setShowModal(false)}
                            backdrop="static"
                            size="sm"
                            title="Verify OTP"
                            btn_name="Verify"
                            btn_name1="Verify1"
                            Submit_Function={verifyOTP}
                        >

                            <form onSubmit={verifyOTP}>

                                <OtpInput
                                    containerStyle="otp-div"
                                    value={typeOtp}
                                    onChange={handleChange}
                                    numInputs={4}
                                    renderSeparator={<span></span>}
                                    renderInput={(props, index) => (
                                        <input
                                            {...props}
                                            type="text"
                                            autoFocus={index === 0}
                                            onKeyPress={(event) => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault();
                                                    verifyOTP();
                                                }
                                            }}
                                        />
                                    )}
                                />

                            </form>
                        </Modal>
                    </>
                ) : (
                    ""
                )}

            </>

        </>
    );
}




export default Login;
