import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ForgetPassword } from '../../ReduxStore/Slice/Auth/AuthSlice';
import Swal from "sweetalert2";

const Forget = () => {
    const dispatch = useDispatch();
    
    const [forgetemail,setForgetemail] = useState({
        Email:""
    })

   
    const forgetbtn = async (e) => {
        e.preventDefault();
        try {
          const response = await dispatch(
            ForgetPassword({
                Email:forgetemail.Email
            })
          ).unwrap();
          
          if (response.success) {
            // console.log("response",response.data)
            setForgetemail({
                Email:""
            }); 
            
            Swal.fire({
              title: "reset password is send to your mail",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: response.message || "Failed to send Email",
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
    
          <div >
              <div className="main-wrapper login-body" >
                  <div className="login-wrapper">
                      <div className="container" >

                          <div className="loginbox">

                              <div className='row'>
                                  <div className='col-md-6 border-right'>
                                      <div className='login-left '>
                                         
                                          <img src="/assets/img/gif/login.gif" className='login-light-img'></img>

                                          <img src="/assets/img/gif/login-dark.gif" className='login-dark-img'></img>
                                      </div>
                                  </div>
                                  <div className='col-md-6'>
                                      <div className="login-right">
                                          <div className="login-right-wrap">


                                              <img
                                                  className="img-fluid logo-dark mb-2 "
                                                  src="/assets/img/pnp.png"
                                                  alt="Logo"
                                                  style={{ width: "15rem" }}
                                              />

                                              <div className='pt-5' data-aos="fade-left">
                                                  <div className=" input-block mb-3">
                                                      <label className="form-control-label d-flex justify-content-start" htmlFor="email">Email Address</label>
                                                      <input type="email" id="email" className="form-control"
                                                      
                                                        value={forgetemail.Email}
                                                        onChange={(e)=>{setForgetemail({...forgetemail,Email:e.target.value})
                                                            console.log("setForgetemail",setForgetemail)
                                                        }
                                                      
                                                    }
                                                      
                                                      />
                                                  </div>


                                                 

                                                  <div class="add-customer-btns d-flex justify-content-between text-end mt-3">
                                                      <button className="btn customer-btn-save" onClick={forgetbtn} >
                                                        Send
                                                      </button>
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
          </div>
      
   
  )
}

export default Forget
