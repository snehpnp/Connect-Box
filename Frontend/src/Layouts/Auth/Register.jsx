import React from 'react'

const Register = () => {
    return (
        <div>
            <div className="main-wrapper login-body">
                <div className="login-wrapper page-wrapper">
                    <div className="container">
                        <img
                            className="img-fluid logo-dark mb-2 logo-color"
                            src="https://www.pnpuniverse.com/images/logo/pnp.png"
                            alt="Logo"
                            style={{ width: "25rem" }}
                        />


                        <div className="loginbox">
                            <div className="login-right">
                                <div className="login-right-wrap">
                                    <h1>Register</h1>
                                    <p className="account-subtitle">Access to our dashboard</p>

                                    <div>
                                        <div className="mb-3">
                                            <label className="form-control-label d-flex justify-content-start" htmlFor="email">Name</label>
                                            <input type="email" id="email" className="form-control" />
                                        </div>
                                        <div className="input-block mb-3">
                                            <label className="form-control-label d-flex justify-content-start" htmlFor="password">
                                                Email
                                            </label>
                                            <div className="pass-group">
                                                <input
                                                    type="Email"

                                                    className="form-control pass-input"

                                                />

                                            </div>
                                        </div>


                                        <div className="input-block mb-3">
                                            <label className="form-control-label d-flex justify-content-start" htmlFor="password">
                                                Password
                                            </label>
                                            <div className="pass-group">
                                                <input
                                                    type="password"

                                                    className="form-control pass-input"

                                                />

                                            </div>
                                        </div>
                                        <div className="input-block mb-3">
                                            <label className="form-control-label d-flex justify-content-start" htmlFor="password">
                                                Confirm Password
                                            </label>
                                            <div className="pass-group">
                                                <input
                                                    type="password"

                                                    className="form-control pass-input"

                                                />

                                            </div>
                                        </div>


                                        <button className="btn btn-lg btn-primary w-100">
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


                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Register
