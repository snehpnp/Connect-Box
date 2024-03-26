import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState,useEffect } from "react";
import { GetCompany_info } from "../../../ReduxStore/Slice/Admin/System";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";


function System() {


  const dispatch = useDispatch();

  const [getCompnayData, SetCompnayData] = useState();


  const GetCompnayData = async () => {


    await dispatch(GetCompany_info())
      .unwrap()
      .then(async (response) => {
        console.log("response", response.data)

        if (response.status) {
          SetCompnayData( response.data)
        } else {
          toast.error(response.msg);
        }

      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    GetCompnayData()
  }, [])


  return (

    <div className="content container-fluid ">
      <div class="page-header">
        <div class="content-page-header">
          <h5>System Information</h5>
        </div>
      </div>

       <div className="row">
        <div className="col-lg-4 col-md-4" data-aos="fade-right">
          <div className="card">
            <div className="card-body" >
              <ul className="nav nav-tabs nav-tabs-solid flex-column border bg-light">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#solid-tab1"
                    data-bs-toggle="tab"
                  >
                    <i className="fa-solid fa-landmark pe-2"></i>
                    Company Information
                    
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#solid-tab2"
                    data-bs-toggle="tab"
                  >
                  
                    <i className="fa-solid fa-envelope pe-2"></i>
                    Email Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#solid-tab3"
                    data-bs-toggle="tab"
                  >
                    <i class="fa-regular fa-image pe-2"></i>
                    Background Images
                  </a>
                </li>
              </ul>
              <div data-aos="fade-down" className="gif-div " >
              {/* <iframe src="https://lottie.host/embed/f3fed07f-0f56-45f1-ae1f-8e87bad0c51b/q3MDJRT4iV.json"></iframe> */}
              <img src="/assets/img/gif/Investment-data.gif"/>
            </div>
            </div>
          </div>
         
        </div>
        <div className="col-lg-8 col-md-8" data-aos="fade-left">
          <div className="card h-100 ">
            <div className="card-body ">
              <div className="tab-content">
                <div className="tab-pane show active" id="solid-tab1">
                  
                        <div class="card-header d-flex justify-content-between align-items-center border-bottom">
<h5 class="card-title mb-0 w-auto"> <i className="fa-solid fa-landmark pe-2"></i> Company Information</h5>
<div className="pay-btn text-end w-auto">
                            <button className="btn btn-primary ">
                              Edit Customer Information
                            </button>
                          </div>
</div>
                       
                          <div className="invoice-total-box px-3 border">
                            <div className="invoice-total-inner">
                              <p>
                                Company ID <span>$120.00</span>
                              </p>
                              <p>
                                Company Name <span>$13.20</span>
                              </p>
                              <p>
                                Panel Key <span>$0.00</span>
                              </p>
                              <p>
                                Company Short Name <span>$0.00</span>
                              </p>
                              <p>
                                Version <span>$0.00</span>
                              </p>
                              <p>
                                Action <span>$0.00</span>
                              </p>
                            </div>
                          </div>
                       
                </div>
                <div className="tab-pane" id="solid-tab2">
                <div class="card-header d-flex justify-content-between align-items-center border-bottom">
<h5 class="card-title mb-0 w-auto"> <i className="fa-solid fa-envelope pe-2"></i> Company Information</h5>
<div className="pay-btn text-end w-auto">
                            <button className="btn btn-primary ">
                            Edit Email Information
                            </button>
                          </div>
</div>
                          
                       
                          <div className="invoice-total-box px-3 border">
                            <div className="invoice-total-inner">
                              <p>
                                Email ID <span>$120.00</span>
                              </p>
                              <p>
                                Email <span>$13.20</span>
                              </p>
                              <p>
                                CC <span>$0.00</span>
                              </p>
                              <p>
                                BCC <span>$0.00</span>
                              </p>
                              <p>
                                Password <span>$0.00</span>
                              </p>
                              <p>
                                SMTP Port <span>$0.00</span>
                              </p>
                            </div>
                          </div>
                       
                </div>
                <div className="tab-pane" id="solid-tab3">
                <div class="card-header d-flex justify-content-between align-items-center border-bottom">
<h5 class="card-title mb-0 w-auto">  <i class="fa-regular fa-image pe-2"></i> Background Images</h5>
<div className="pay-btn text-end w-auto">
                            <button className="btn btn-primary ">
                            Update Images
                            </button>
                          </div>
</div>
                  
                          <div className="invoice-total-box px-3 border">
                            <div className="invoice-total-inner">
                              <p>
                                Id <span>$0.00</span>
                              </p>
                              <p>
                                Favicon <span>$120.00</span>
                              </p>
                              <p>
                                Logo <span>$13.20</span>
                              </p>
                              <p>
                                Login Image <span>$0.00</span>
                              </p>
                              <p>
                                Mark <span>$0.00</span>
                              </p>
                            </div>
                          </div>
                        

                </div>
           
              </div>
            </div>
          </div>
        </div>


{/* Card design */}

<div className="card flex-fill bg-white">

<div className="card-header"><h5 className="card-title">Special title treatment</h5></div>

<div className="card-body card-buttons">



<p className="card-text">

Some quick example text to build on the card title and make up the bulk of

the card's content.

</p>

</div>

<div className="card-footer text-muted">This is my footer</div>

</div>

      </div> 
    </div>
  
  );
}

export default System;
