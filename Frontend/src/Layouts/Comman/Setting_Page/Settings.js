import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State variable to manage sidebar toggle

  let Role = JSON.parse(localStorage.getItem("user_details")).Role;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row">
              {/* TOGGLE BUTTON */}
              <div className="toggle-button" onClick={toggleSidebar}>
                {sidebarOpen ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </div>

              {/* LEFT SIDE SIDEBAR */}
              <div className={`col-sm-3 left-side ${sidebarOpen ? 'open' : ''}`}>
                <div
                  className="nav flex-column nav-pills nav-pills-tab"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {(Role === "ADMIN" || Role === "SUBADMIN" || Role === "RESEARCH") && (
                    <a
                      className="nav-link active mb-1"
                      id="v-pills-company-tab"
                      data-bs-toggle="pill"
                      href="#v-pills-company"
                      role="tab"
                      aria-controls="v-pills-company"
                      aria-selected="true"
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

                  {Role == "ADMIN" && (
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
                    id="v-pills-changepass-tab"
                    data-bs-toggle="pill"
                    href="#v-pills-changepass"
                    role="tab"
                    aria-controls="v-pills-changepass"
                    aria-selected="false"
                  >
                    Change Password
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

                  {(Role === "SUBADMIN" || Role === "USER" || Role === "RESEARCH") && (
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

              <div className="col-sm-9">
                <div className="tab-content ">
                  {/* Company Settings */}
                  <div
                    className="tab-pane active"
                    id="v-pills-company"
                    role="tabpanel"
                    aria-labelledby="v-pills-company-tab"
                  >
                    <div className="col-xl-12 col-md-12">
                      <div className="card company-settings-new">
                        <div className="card-body w-100">
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

                    <Trackpanel />
                  </div>

                  {/* CHANGE PASSWORD */}
                  <div
                    className="tab-pane fade"
                    id="v-pills-changepass"
                    role="tabpanel"
                    aria-labelledby="v-pills-changepass-tab"
                  >
                    <div className="col-xl-12 col-md-12">
                      <div className="page-header">
                        {/* <div className="content-page-header">
                                                    <h5>Change Password</h5>

                                                </div> */}

                        <div className="page-content">
                          <div className="mainDiv">
                            <PasswordChange />
                          </div>
                        </div>
                      </div>
                    </div>
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
  );
};

export default Settings;
