/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

import Dashboard9 from "./Dashboard9";

import * as Config from "../../../Utils/Config";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import { GET_ALL_CLIENTS } from "../../../ReduxStore/Slice/Admin/AdminSlice";
import { Get_All_SUBADMIN } from "../../../ReduxStore/Slice/Subadmin/Subadminslice";

import { useDispatch, useSelector } from "react-redux";
import { Get_Dashboard_Count } from "../../../ReduxStore/Slice/Admin/DashboardSlice";

import socketIOClient from "socket.io-client";

import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user_token = JSON.parse(localStorage.getItem("user_details")).token;

  const Role = JSON.parse(localStorage.getItem("user_details")).Role;
  const user_ID = JSON.parse(localStorage.getItem("user_details")).user_id;

  const [DashboardData, setDashboardData] = useState("");
  const [DashboardData1, setDashboardData1] = useState([]);

  const [getAllClients, setAllClients] = useState({
    loading: true,
    data: [],
  });

  const getGroupeServics = async () => {
    await dispatch(Get_Dashboard_Count(user_token))
      .unwrap()
      .then((response) => {
        if (response.status) {
          if (response.totalCount) {
            setDashboardData(response.totalCount);
          }
        }
      });
  };
  useEffect(() => {
    getGroupeServics();
  }, []);

  //  Recieve Notfication

  // useEffect(() => {
  //   const socket = socketIOClient(`${Config.base_url}`);

  //   socket.on("test_msg_Response", (data) => {
  //     toast.success(`Notificatipn Received From ${data.username}`);
  //     console.log("test_msg_Response", data.username);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  console.log("DashboardData :", DashboardData)

  return (
    <>
      <div>
        <div className="content-body">
          <div className="container-fluid">
            <h1 className="mb-3">Dashboard</h1>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-dark px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Total Client
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_client}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-danger px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Total Active Client
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_active_client}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center  ">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-info px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a href=""
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>
                          <span className="text-success">+1.66%</span>
                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Total Expired Client
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_expired_client}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-warning px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Total Live Client

                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_active_live}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div className="row">

              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-warning px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Active Live Client
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_active_live}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-dark px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Expired Live Client

                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_expired_live}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-danger px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Total Demo Client
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_demo_client}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center  ">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-info px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a href=""
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>
                          <span className="text-success">+1.66%</span>
                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Active Demo Client

                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_active_demo}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-dark px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Expired Demo Client


                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_expired_client}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-danger px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Total 2 Days Client
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_two_days}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center  ">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-info px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a href=""
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>
                          <span className="text-success">+1.66%</span>
                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Active 2 Days Client
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_active_two_days}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-warning px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Expired 2 Days Client


                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.total_expired_two_days}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div className="row">

              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-warning px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Total License
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.all_licence}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-dark px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Remaining License


                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.remaining_licence}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="col-xl-3 col-lg-6 col-sm-6 col-12">
                <div className="box mb-15 pull-up hover-success">
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="waves-effect waves-light btn btn-rounded btn-danger px-4"
                        >
                          <i className="fa-solid fa-chart-column fs-5"></i>
                        </button>
                      </div>
                      {/* <div>
                        <div className="d-flex flex-column font-weight-500">
                          <a
                            href="#"
                            className="text-dark text-end hover-primary mb-1 fs-16"
                          >
                            <i class="fa-regular fa-eye text-info fs-5"></i>
                          </a>

                        </div>
                      </div> */}
                    </div>
                    <div className="row align-items-center mt-10">
                      <div className="col-8 px-0">
                        <p
                          className="text-muted fw-normal m-0 text-muted"
                          title="Protfolio"
                        >
                          Used License
                        </p>
                        <h3 className="m-0 fw-600">{DashboardData.used_licence}</h3>
                      </div>
                      <div className="col-4">
                        <div className="text-end" style={{ position: "relative" }}>
                          <div id="new-leads-chart4" >
                            <img src="/assets/images/dash_icon/c-graph.png" className="w-100" />
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
        <ToastButton />
      </div>
    </>
  );
};

export default Dashboard;
