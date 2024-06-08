import React, { useState } from "react";
import Trackpanel from "./Logs/Trackpanel";
import System from "../../../Layouts/SubAdmin/Systems/System";
import AdminSystem from "../../../Layouts/Admin/System/System";
import Setbrokerinfo from "../../../Layouts/Comman/Setting_Page/Setbrokerinfo/Setbrokerinfo";
import Emailtemp from "../../../Layouts/Comman/Setting_Page/Emailtemp";
import Invoicetemp from "../../../Layouts/Comman/Setting_Page/Invoicetemp";
import Payment from "../../../Layouts/Comman/Setting_Page/Payment";
import Apicreate_info from "./Apicreateinformation/Apicreate_info";
import PasswordChange from "./PasswordChange";
import Usersetbrokerinfo from "../../../Layouts/Comman/Setting_Page/Setbrokerinfo/Usersetbrokerinfo";
import { X, AlignJustify } from 'lucide-react';

const Settings = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  let Role = JSON.parse(localStorage.getItem("user_details")).Role;

  // const toggleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };

  return (
    <>
      <div className="content container-fluid pb-0">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="fa fa-gear pe-2"></i>Setting
            </h5>
          </div>
          <div className="card-body">
            <div className="row">

              {/* <button  className="toggle-sidebarsetting" onClick={toggleSidebar}style={{ width: "3rem", height: "3rem", position: isSidebarOpen ? "absolute" : "fixed", left: isSidebarOpen ? "15.6rem" : "3rem", zIndex: "999",
          marginTop: isSidebarOpen ? "0.9rem" : "1rem"
         }}>
          {isSidebarOpen ?  <X /> :  <AlignJustify />}
        </button>
          {isSidebarOpen && ( */}
              <div className="col-sm-3 left-side" >
                <div
                  className="nav flex-column nav-pills nav-pills-tab"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <div className="col-sm-12 left-side">

                    <div
                      className="nav flex-column nav-pills nav-pills-tab"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >

                      <a
                        className="nav-link active mb-1"
                        id="v-pills-changepass-tab"
                        data-bs-toggle="pill"
                        href="#v-pills-changepass"
                        role="tab"
                        aria-controls="v-pills-changepass"

                        aria-selected="true"
                      >
                        Change Password
                      </a>

                      {(Role === "ADMIN") && (
                        <a
                          className="nav-link mb-1"
                          id="v-pills-company-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-company"
                          role="tab"
                          aria-controls="v-pills-company"

                          style={{ color: "black" }}
                        >
                          Company Settings
                        </a>

                      )}

                      {Role == "ADMIN" && (
                        <a
                          className="nav-link mb-1"
                          id="v-pills-invoice-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-invoice"
                          role="tab"
                          aria-controls="v-pills-invoice"
                          aria-selected="false"
                          style={{ color: "dark" }}
                        >
                          Invoice Templates
                        </a>
                      )}

                      {(Role == "ADMIN" ||
                        Role === "SUBADMIN" ||
                        Role === "RESEARCH") && (
                          <a
                            className="nav-link mb-1"
                            id="v-pills-payment-tab"
                            data-bs-toggle="pill"
                            href="#v-pills-payment"
                            role="tab"
                            aria-controls="v-pills-payment"
                            aria-selected="false"
                            style={{ color: "black" }}
                          >
                            Payment Methods
                          </a>
                        )}
                      {Role == "ADMIN" && (
                        <a
                          className="nav-link mb-1"
                          id="v-pills-email-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-email"
                          role="tab"
                          aria-controls="v-pills-email"
                          aria-selected="false"
                          style={{ color: "black" }}
                        >
                          Email Templates
                        </a>
                      )}
                      <a
                        className="nav-link mb-1"
                        id="v-pills-logs-tab"
                        data-bs-toggle="pill"
                        href="#v-pills-logs"
                        role="tab"
                        aria-controls="v-pills-logs"
                        aria-selected="false"
                        style={{ color: "black" }}
                      >
                        Logs
                      </a>

                      <a
                        className="nav-link mb-1"
                        id="v-pills-api-tab"
                        data-bs-toggle="pill"
                        href="#v-pills-api"
                        role="tab"
                        aria-controls="v-pills-api"
                        aria-selected="false"
                        style={{ color: "black" }}
                      >
                        Api Create Information
                      </a>

                      {(Role === "SUBADMIN" ||
                        Role === "USER" ||
                        Role === "RESEARCH") && (
                          <a
                            className="nav-link mb-1"
                            id="v-pills-Broker-info-tab"
                            data-bs-toggle="pill"
                            href="#v-pills-Broker-info"
                            role="tab"
                            aria-controls="v-pills-Broker-info"
                            aria-selected="false"
                            style={{ color: "black" }}
                          >
                            Set Broker Information
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
              {/* <div className={isSidebarOpen ? "col-sm-7" : "col-sm-12"}> */}
              <div className="col-sm-9 ">
                <div className="tab-content"  >
                  <div   >

                    <div className="card-body">

                      <div className="tab-content ">




                        {/* CHANGE PASSWORD */}
                        <div
                          className="tab-pane active"
                          id="v-pills-changepass"
                          role="tabpanel"
                          aria-labelledby="v-pills-changepass-tab"
                        >
                          <div className="col-xl-12 col-md-12">
                            <div className="page-header">


                              <div className="page-content">
                                <div className="mainDiv">
                                  <PasswordChange />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>






                        {/* Company Settings */}
                        <div
                          className="tab-pane"
                          id="v-pills-company"
                          role="tabpanel"
                          aria-labelledby="v-pills-company-tab"
                        >
                          <div className="col-xl-12 col-md-12">
                            <div className=" company-settings-new">
                              <div className=" w-100">
                                <div className="content-page-header">
                                  <h5>Company Setting</h5>
                                </div>

                                <div className="subadminset">
                                  {Role == "ADMIN" ? (
                                    <AdminSystem />
                                  ) : Role == "SUBADMIN" ? (
                                    <System />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Invoice Templates */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-invoice"
                          role="tabpanel"
                          aria-labelledby="v-pills-invoice-tab"
                        >
                          <Invoicetemp />
                        </div>

                        {/* Payment Settings */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-payment"
                          role="tabpanel"
                          aria-labelledby="v-pills-payment-tab"
                        >
                          <Payment />
                        </div>

                        {/* Email Templates */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-email"
                          role="tabpanel"
                          aria-labelledby="v-pills-email-tab"
                        >
                          <Emailtemp />
                        </div>

                        {/* LOGS COMPNENT */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-logs"
                          role="tabpanel"
                          aria-labelledby="v-pills-logs-tab"
                        >
                          <div className="col-xl-12 col-md-12">
                            <div className="page-header">
                              <div className="content-page-header">
                                <h5>Activity</h5>

                              </div>
                            </div>
                          </div>

                          <Trackpanel />
                        </div>



                        {/* API CREATE INFORMATION */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-api"
                          role="tabpanel"
                          aria-labelledby="v-pills-api-tab"
                        >
                          <div className="col-xl-12 col-md-12">
                            <div className="page-header">
                              <div className="content-page-header">
                                <h5>All Api-Create Info</h5>
                                <div className="page-content">
                                  <div className="list-btn">
                                    <ul className="filter-list">
                                      <li></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Apicreate_info />
                        </div>

                        {/* SET BROKER INFORMATION */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-Broker-info"
                          role="tabpanel"
                          aria-labelledby="v-pills-Broker-info-tab"
                        >
                          {Role === "SUBADMIN" || Role === "RESEARCH" ? (
                            <Setbrokerinfo />
                          ) : Role === "USER" ? (
                            <Usersetbrokerinfo />
                          ) : null}
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
    </>
  );
};

export default Settings;
