import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ForgetPassword } from '../../ReduxStore/Slice/Auth/AuthSlice';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const Forget = () => {
  const dispatch = useDispatch();
  
  // State for storing email input
  const [email, setEmail] = useState("");

  const handleForget = async (e) => {
    e.preventDefault();
    try {
     
      const response = await dispatch(
        ForgetPassword({ Email: email })
      ).unwrap();
      if (response.status) {
        setEmail("");
        Swal.fire({
          title: "Reset Password link has been Sent To Your Email",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.msg || "Failed to send email",
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Error", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
      });
    }
  };

  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className='row'>
              <div className='col-md-6 border-right'>
                <div className='login-left '>
                  <img src="/assets/img/gif/login.gif" className='login-light-img' alt="Login GIF"></img>
                  <img src="/assets/img/gif/login-dark.gif" className='login-dark-img' alt="Login Dark GIF"></img>
                </div>
              </div>
              <div className='col-md-6'>
                <div className="login-right">
                  <div className="login-right-wrap">
                    <img
                      className="img-fluid logo-dark mb-2"
                      src="/assets/img/pnp.png"
                      alt="Logo"
                      style={{ width: "15rem" }}
                    />
                    <div className='pt-5' data-aos="fade-left">
                      <div className="input-block mb-3">
                        <label className="form-control-label d-flex justify-content-start" htmlFor="email">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="add-customer-btns d-flex justify-content-between text-end mt-3">
                        <button className="btn customer-btn-save" onClick={handleForget}>
                          Send
                          
                        </button>
                      
                        <Link to="/login"  className="btn customer-btn-save" >Back</Link>
                          
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
