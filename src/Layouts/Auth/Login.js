import React from 'react'

function Login() {
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
                                    <form action="https://kanakku.dreamstechnologies.com/html/template/index.html">
                                        <div className="input-block mb-3">

                                            <label className="form-control-label">Email Address</label>

                                            <input type="email" className="form-control" />

                                        </div>

                                        <div className="input-block mb-3">

                                            <label className="form-control-label">Password</label>

                                            <div className="pass-group">

                                                <input type="password" className="form-control pass-input" />

                                                <span className="fas fa-eye toggle-password" />

                                            </div>

                                        </div>

                                        <div className="input-block mb-3">

                                            <div className="row">

                                                <div className="col-6">

                                                    <div className="form-check custom-checkbox">

                                                        <input

                                                            type="checkbox"

                                                            className="form-check-input"

                                                            id="cb1"

                                                        />

                                                        <label className="custom-control-label" htmlFor="cb1">

                                                            Remember me

                                                        </label>

                                                    </div>

                                                </div>

                                                <div className="col-6 text-end">

                                                    <a className="forgot-link" href="forgot-password.html">

                                                        Forgot Password ?

                                                    </a>

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

                                        <div className="social-login mb-3">

                                            <span>Login with</span>

                                            <a href="#" className="facebook">

                                                <i className="fab fa-facebook-f" />

                                            </a>

                                            <a href="#" className="google">

                                                <i className="fab fa-google" />

                                            </a>

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

            </div>
        </>
    )
}

export default Login