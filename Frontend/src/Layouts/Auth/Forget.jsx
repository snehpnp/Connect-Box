import React from 'react'

const Forget = () => {
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
                                                      <input type="email" id="email" className="form-control" />
                                                  </div>


                                                 

                                                  <div class="add-customer-btns d-flex justify-content-between text-end mt-3">
                                                      <button className="btn customer-btn-save"  >
                                                        Reset
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
