import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import {
  GetTradePermissionApi,
  UpdateTradePermissionApi,
  GetPermissionLogsApi,
} from "../../../ReduxStore/Slice/Users/Userdashboard.Slice";
import Swal from "sweetalert2";
import { fDateTime } from "../../../Utils/Date_formet";

import {Update_Broker_Url} from '../../../ReduxStore/Slice/Subadmin/allServices'

const Settings = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(0);
  const [tradeLogs, settradeLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  const [brokerUrl, setBrokerUrl] = useState("");

  let Role = JSON.parse(localStorage.getItem("user_details")).Role;
  let user_details = JSON.parse(localStorage.getItem("user_details"));

  const handleOptionChange = (e) => {
    setSelectedOption(parseInt(e.target.value));
  };
  const handleSubmit = async () => {
    const response = await dispatch(
      UpdateTradePermissionApi({
        id: user_details.user_id,
        permission: selectedOption,
      })
    ).unwrap();

    if (response.status) {
      // fetchCompanyData();
      Swal.fire({
        icon: "success",
        title: "Trade Permission Updated Successfully",
      });
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await dispatch(
        GetTradePermissionApi({ id: user_details.user_id })
      ).unwrap();
      if (response.status) {
        setSelectedOption(response.data);
      }
    } catch (error) {}
  };

  const GetTradePermissionLogs = async () => {
    try {
      const response = await dispatch(
        GetPermissionLogsApi({ id: user_details.user_id })
      ).unwrap();
      if (response.status) {
        settradeLogs(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    GetTradePermissionLogs();
    fetchCompanyData();
    UpdateBrokerUrl("get")
  }, []);

  const handleShowModal = () => {
    setShowLogs(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowLogs(false);
  };
  const UpdateBrokerUrl = async (type) => {
    try {
      // Dispatch the action to update or get the broker URL
      const response = await dispatch(Update_Broker_Url({
        id: user_details.user_id,
        brokerUrl: brokerUrl,
        type: type,
      }));
      console.log(response.payload.data.length > 0 && response.payload.data[0]?.broker_url);
  
      // If the type is 'get', set the broker URL to the response data
      if (type === "get") {
        setBrokerUrl(response.payload.data.length > 0 && response.payload.data[0]?.broker_url); // Assuming `response.payload.data` has the data you need
      } else {
        // Show success notification for update
        Swal.fire({
          icon: "success",
          title: "Broker URL Updated Successfully"
        });
      }
    } catch (error) {
      console.error("Error updating broker URL:", error);
    }
  };
  
  console.log("00000",brokerUrl);

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
              <div className="col-sm-3 left-side">
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

                      {Role === "ADMIN" && (
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

                      {/* {(Role == "ADMIN" ||
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
                      )} */}
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

                

                      {Role === "SUBADMIN" && (
                        <a
                          className="nav-link mb-1"
                          id="v-pills-Broker-url-tab"
                          data-bs-toggle="pill"
                          href="#v-pills-Broker-url"
                          role="tab"
                          aria-controls="v-pills-Broker-url"
                          aria-selected="false"
                          style={{ color: "black" }}
                        >
                          Set Broker Url
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
              {/* <div className={isSidebarOpen ? "col-sm-7" : "col-sm-12"}> */}
              <div className="col-sm-9 ">
                <div className="tab-content">
                  <div>
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
                        {/* <div
                          className="tab-pane fade"
                          id="v-pills-payment"
                          role="tabpanel"
                          aria-labelledby="v-pills-payment-tab"
                        >
                          <Payment />
                        </div> */}

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

                        {/* TRADE PERMISSION */}
                        <div
                          className="tab-pane fade"
                          id="v-trade-permission"
                          role="tabpanel"
                          aria-labelledby="v-trade-permission-tab"
                        >
                          <div className="col-xl-12 col-md-12">
                            <div className="page-header">
                              <div className="content-page-header">
                                <h5>Trade Permission</h5>
                              </div>
                            </div>
                          </div>

                          <div className="card p-4 shadow-sm">
                            <div className="row">
                              <h5 className="mb-4">Update Trade Permission</h5>

                              <div className="d-flex gap-5">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="tradePermission"
                                    id="tradePermission1"
                                    value={0}
                                    checked={selectedOption == 0}
                                    onChange={handleOptionChange}
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="tradePermission1"
                                  >
                                    Full Auto
                                  </label>
                                </div>

                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="tradePermission"
                                    id="tradePermission2"
                                    value={1}
                                    checked={selectedOption == 1}
                                    onChange={handleOptionChange}
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor="tradePermission2"
                                  >
                                    Semi Auto
                                  </label>
                                </div>
                              </div>

                              <div className="d-flex justify-content-start mt-4">
                                <button
                                  className="btn btn-primary px-4"
                                  onClick={handleSubmit}
                                >
                                  Update Trade Permission
                                </button>

                                <button
                                  className="btn btn-secondary px-4 ms-2"
                                  onClick={(e) => setShowLogs(!showLogs)}
                                >
                                  Show Logs
                                </button>
                              </div>

                              <div className="note-section mt-3">
                                <p
                                  style={{
                                    color: "#6c757d",
                                    fontSize: "0.9rem",
                                    marginTop: "10px",
                                  }}
                                >
                                  <strong>Note:</strong> Full Auto executes
                                  trades automatically, Semi Auto allows manual
                                  confirmation.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="v-pills-Broker-url"
                          role="tabpanel"
                          aria-labelledby="v-pills-Broker-url-tab"
                        >
                          <div className="col-xl-12 col-md-12">
                            <div className="page-header">
                              <div className="content-page-header">
                                <h5>Set Broker Url</h5>
                              </div>
                            </div>

                            <div className="card p-4 shadow-sm">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>Broker Url</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Broker Url"
                                      value={brokerUrl}
                                      onChange={(e) =>
                                        setBrokerUrl(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-start mt-4">
                                <button
                                  className="btn btn-primary px-4"
                                  onClick={(e) => UpdateBrokerUrl("update")}
                                >
                                  Update Broker Url
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
        </div>
      </div>

      {showLogs && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fa fa-gear pe-2"></i>Trade Permission Logs
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Permission Msg</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradeLogs.map((log, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{log.msg}</td>
                          <td>{fDateTime(log.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
