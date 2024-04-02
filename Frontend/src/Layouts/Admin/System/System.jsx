import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect ,useCallback } from "react";
import { GetCompany_info } from "../../../ReduxStore/Slice/Admin/System";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function System() {


  const dispatch = useDispatch();

  const [getCompnayData, SetCompnayData] = useState();


  const fetchCompnayData = useCallback(async () => {
    try {
      const response = await dispatch(GetCompany_info()).unwrap();
      console.log("response", response.data);

      if (response.status) {
        SetCompnayData(response.data);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCompnayData();
  }, [fetchCompnayData]);




  return (

    <div className="content container-fluid ">

      <div className="row mb-2">
        <div className="col-lg-4 col-md-4" data-aos="fade-left">
          <div className="page-header">
            <div className="content-page-header">
              <h5>System Information</h5>
            </div>
          </div>
        </div>


        <div className="col-lg-8 col-md-8" data-aos="fade-right">

          <ul className="nav nav-tabs nav-tabs-solid horizontal-tab d-flex justify-content-center ">
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
            <li className="nav-item mx-md-5">
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

        </div>

      </div>


      <div className="row">
        <div className="col-lg-4 col-md-4" data-aos="fade-right">
          <div className="card">
            <div className="card-body" >

              <div data-aos="fade-down" className="gif-div h-100 " >
                <img src="/assets/img/gif/Investment-data.gif" />
              </div>
            </div>
          </div>

        </div>
        <div className="col-lg-8 col-md-8" data-aos="fade-left">
          <div className="card h-100">
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane show active" id="solid-tab1">

                  <div class="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 class="card-title mb-0 w-auto"> <i className="fa-solid fa-landmark pe-2"></i> Company Information</h5>
                    <div className="pay-btn text-end w-auto">
                      <button className="btn btn-primary " data-bs-toggle="modal"
                        data-bs-target="#company">
                        Edit Customer Information
                      </button>
                    </div>
                  </div>


                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">

                      <p>
                        Company Name <span>{getCompnayData && getCompnayData[0].panel_name}</span>
                      </p>
                      <p>
                        Panel Key <span>{getCompnayData && getCompnayData[0].panel_key}</span>
                      </p>
                      <p>
                        Company Short Name <span>{getCompnayData && getCompnayData[0].panel_short_name
                        }</span>
                      </p>
                      <p>
                        Version <span>{getCompnayData && getCompnayData[0].version}</span>
                      </p>

                    </div>
                  </div>

                </div>
                <div className="tab-pane" id="solid-tab2">
                  <div class="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 class="card-title mb-0 w-auto"> <i className="fa-solid fa-envelope pe-2"></i> Email Information</h5>
                    <div className="pay-btn text-end w-auto">
                      <button className="btn btn-primary " data-bs-toggle="modal"
                        data-bs-target="#email">
                        Edit Email Information
                      </button>
                    </div>
                  </div>


                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">

                      <p>
                        Email <span>{getCompnayData && getCompnayData[0].email}</span>
                      </p>
                      <p>
                        CC <span>{getCompnayData && getCompnayData[0].cc_mail}</span>
                      </p>
                      <p>
                        BCC <span>{getCompnayData && getCompnayData[0].bcc_mail}</span>
                      </p>
                      <p>
                        Password <span>{getCompnayData && getCompnayData[0].smtp_password}</span>
                      </p>
                      <p>
                        SMTP Port <span>{getCompnayData && getCompnayData[0].smtpport}</span>
                      </p>
                      <p>
                        SMTP Host <span>{getCompnayData && getCompnayData[0].smtphost}</span>
                      </p>
                    </div>
                  </div>

                </div>
                <div className="tab-pane" id="solid-tab3">
                  <div class="card-header d-flex justify-content-between align-items-center border-bottom">
                    <h5 class="card-title mb-0 w-auto">  <i class="fa-regular fa-image pe-2"></i> Background Images</h5>
                    <div className="pay-btn text-end w-auto">
                      <button className="btn btn-primary " data-bs-toggle="modal"
                        data-bs-target="#back">
                        Update Images
                      </button>
                    </div>
                  </div>

                  <div className="invoice-total-box px-3 border">
                    <div className="invoice-total-inner">
                      <p>
                        Favicon <img src={getCompnayData && getCompnayData[0].favicon} alt="Favicon" style={{ height: '80px', width: '80px' }} />
                      </p>
                      <p>
                        Logo <img src={getCompnayData && getCompnayData[0].logo} alt="Logo" style={{ height: '80px', width: '80px' }} />
                      </p>
                      <p>
                        Login Image <img src={getCompnayData && getCompnayData[0].loginimage} alt="Login Image" style={{ height: '80px', width: '80px' }} />
                      </p>
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
}

export default System;
