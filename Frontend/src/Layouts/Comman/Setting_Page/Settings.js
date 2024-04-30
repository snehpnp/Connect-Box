import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebars";
import Trackpanel from "./Logs/Trackpanel";
import System from "../../../Layouts/SubAdmin/Systems/System";



import Apicreate_info from "./Apicreateinformation/Apicreate_info";

const Settings = () => {
    return (
        <div>
            <div className="">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <div
                                    className="nav flex-column nav-pills nav-pills-tab"
                                    id="v-pills-tab"
                                    role="tablist"
                                    aria-orientation="vertical"
                                >
                                    <a
                                        className="nav-link active show mb-1"
                                        id="v-pills-account-tab"
                                        data-bs-toggle="pill"
                                        href="#v-pills-account"
                                        role="tab"
                                        aria-controls="v-pills-account"
                                        aria-selected="true"
                                        style={{ color: "black" }}

                                    >

                                        Account Settings
                                    </a>
                                    <a
                                        className="nav-link mb-1"
                                        id="v-pills-company-tab"
                                        data-bs-toggle="pill"
                                        href="#v-pills-company"
                                        role="tab"
                                        aria-controls="v-pills-company"
                                        aria-selected="false"
                                        style={{ color: "black" }}
                                    >
                                        Company Settings
                                    </a>
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
                                </div>

                            </div>
                            <div className="col-sm-9">
                                <div className="tab-content">


                                    {/* Account Settings */}
                                    <div
                                        className="tab-pane fade active show"
                                        id="v-pills-account"
                                        role="tabpanel"
                                        aria-labelledby="v-pills-account-tab"
                                    >
                                        <div className="col-xl-12 col-md-12">
                                            <div className="card">
                                                <div className="card-body w-100">
                                                    <div className="content-page-header">
                                                        <h5 className="setting-menu">Account Settings</h5>
                                                    </div>
                                                    <div className="row">
                                                        <div className="profile-picture">
                                                            <div className="upload-profile me-2">
                                                                <div className="profile-img">
                                                                    <img
                                                                        id="blah"
                                                                        className="avatar"
                                                                        src="assets/img/profiles/avatar-10.jpg"
                                                                        alt="profile-img"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="img-upload">
                                                                <label className="btn btn-primary">
                                                                    Upload new picture <input type="file" />
                                                                </label>
                                                                <a className="btn btn-danger">Delete</a>
                                                                <p className="mt-1">
                                                                    Logo Should be minimum 152 * 152 Supported File format
                                                                    JPG,PNG,SVG
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-title">
                                                                <h5>General Information</h5>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-12">
                                                            <div className="input-block mb-3">
                                                                <label>First Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter First Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-12">
                                                            <div className="input-block mb-3">
                                                                <label>Last Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Last Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-12">
                                                            <div className="input-block mb-3">
                                                                <label>Email</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Email Address"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-12">
                                                            <div className="input-block mb-3">
                                                                <label>Mobile Number</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Mobile Number"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-12">
                                                            <div className="input-block mb-0">
                                                                <label>Gender</label>
                                                                <select className="select form-control">
                                                                    <option>Select Gender</option>
                                                                    <option>Male</option>
                                                                    <option>Female</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-12">
                                                            <div className="input-block mb-3">
                                                                <label>Date of Birth</label>
                                                                <div className="cal-icon cal-icon-info">
                                                                    <input
                                                                        type="text"
                                                                        className="datetimepicker form-control"
                                                                        placeholder="Select Date"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12">
                                                            <div className="btn-path text-end">
                                                                <a
                                                                    href="javascript:void(0);"
                                                                    className="btn btn-cancel bg-primary-light me-3"
                                                                >
                                                                    Cancel
                                                                </a>
                                                                <a href="javascript:void(0);" className="btn btn-primary">
                                                                    Save Changes
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Settings */}
                                    <div
                                        className="tab-pane fade"
                                        id="v-pills-company"
                                        role="tabpanel"
                                        aria-labelledby="v-pills-company-tab"
                                    >
                                        <div className="col-xl-12 col-md-12">
                                            <div className="card company-settings-new">
                                                <div className="card-body w-100">
                                                    <div className="content-page-header">
                                                        <h5>Company Settings</h5>
                                                    </div>

                                                    <div className='subadminset'>
                                                        <System />
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
                                        <div className="col-xl-12 col-md-12">
                                            <div className="w-100 pt-0">
                                                <div className="content-page-header">
                                                    <h5>Invoice Templates</h5>
                                                </div>
                                                <div className="card invoices-tabs-card">
                                                    <div className="invoice-template-tab invoices-main-tabs">
                                                        <div className="row align-items-center">
                                                            <div className="col-lg-12">
                                                                <div className="invoices-tabs">
                                                                    <ul className="nav nav-tabs">
                                                                        <li className="nav-item">
                                                                            <a
                                                                                id="invoice-tab"
                                                                                data-bs-toggle="tab"
                                                                                data-bs-target="#invoice_tab"
                                                                                type="button"
                                                                                role="tab"
                                                                                aria-controls="invoice_tab"
                                                                                aria-selected="true"
                                                                                href="javascript:void(0);"
                                                                                className="active"
                                                                            >
                                                                                Invoice
                                                                            </a>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <a
                                                                                id="purchases-tab"
                                                                                data-bs-toggle="tab"
                                                                                data-bs-target="#purchases_tab"
                                                                                type="button"
                                                                                role="tab"
                                                                                aria-controls="purchases_tab"
                                                                                aria-selected="true"
                                                                                href="javascript:void(0);"
                                                                            >
                                                                                Purchases
                                                                            </a>
                                                                        </li>
                                                                        <li className="nav-item">
                                                                            <a
                                                                                id="receipt-tab"
                                                                                data-bs-toggle="tab"
                                                                                data-bs-target="#receipt_tab"
                                                                                type="button"
                                                                                role="tab"
                                                                                aria-controls="receipt_tab"
                                                                                aria-selected="true"
                                                                                href="javascript:void(0);"
                                                                            >
                                                                                Receipt
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-content">
                                                    <div
                                                        className="tab-pane active"
                                                        id="invoice_tab"
                                                        role="tabpanel"
                                                        aria-labelledby="invoice-tab"
                                                        tabIndex={0}
                                                    >
                                                        <div className="card template-invoice-card">
                                                            <div className="card-body pb-0">
                                                                <div className="invoice-card-title">
                                                                    <h6>Invoice</h6>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens active ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice-one.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-one.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 1</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice%20-%20two.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-two.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 2</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice%20-%20three.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-three.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 3</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice-four.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-four.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 4</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice%20-%20five.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice%20-%20five.svg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 5</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="tab-pane"
                                                        id="purchases_tab"
                                                        role="tabpanel"
                                                        aria-labelledby="purchases-tab"
                                                        tabIndex={0}
                                                    >
                                                        <div className="card template-invoice-card">
                                                            <div className="card-body pb-0">
                                                                <div className="invoice-card-title">
                                                                    <h6>Purchases</h6>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens active ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice-one.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-one.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 1</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice%20-%20two.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-two.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 2</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice%20-%20three.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-three.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 3</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice-four.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice-four.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 4</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/invoice%20-%20five.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoice%20-%20five.svg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">General Invoice 5</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="tab-pane"
                                                        id="receipt_tab"
                                                        role="tabpanel"
                                                        aria-labelledby="receipt-tab"
                                                        tabIndex={0}
                                                    >
                                                        <div className="card template-invoice-card mb-0">
                                                            <div className="card-body pb-0">
                                                                <div className="invoice-card-title">
                                                                    <h6>Receipt</h6>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens active">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/cash-receipt-1.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoices/recepit-one.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">Receipt Invoice 1</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/cash-receipt-2.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoices/recepit-two.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">Receipt Invoice 2</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/cash-receipt-3.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoices/recepit-three.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">Receipt Invoice 3</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-xl-3 col-sm-12 d-md-flex d-sm-block">
                                                                        <div className="blog grid-blog invoice-blog flex-fill  d-flex flex-wrap align-content-betweens  ">
                                                                            <div className="blog-image">
                                                                                <a href="javascript:;" className="img-general">
                                                                                    <img
                                                                                        className="img-fluid"
                                                                                        src="assets/img/cash-receipt-4.svg"
                                                                                        alt="Post Image"
                                                                                    />
                                                                                </a>
                                                                                <a
                                                                                    href="assets/img/invoices/recepit-four.jpg"
                                                                                    className="preview-invoice image-popup"
                                                                                >
                                                                                    <i className="fa-regular fa-eye" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="invoice-content-title">
                                                                                <a href="javascript:;">Receipt Invoice 4</a>
                                                                                <span
                                                                                    className="invoice-star"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="left"
                                                                                    title=""
                                                                                    data-bs-original-title="Make as default"
                                                                                >
                                                                                    <i className="fa-regular fa-star" />
                                                                                </span>
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

                                    {/* Payment Settings */}
                                    <div
                                        className="tab-pane fade"
                                        id="v-pills-payment"
                                        role="tabpanel"
                                        aria-labelledby="v-pills-payment-tab"
                                    >
                                        <div className="col-xl-12 col-md-12">
                                            <div className="card">
                                                <div className="card-body w-100">
                                                    <div className="content-page-header">
                                                        <h5>Payment Settings</h5>
                                                    </div>
                                                    <div className="form-group-item">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="payment-toggle">
                                                                    <h5 className="form-title">Strip</h5>
                                                                    <div className="status-toggle">
                                                                        <input
                                                                            id="rating_1"
                                                                            className="check"
                                                                            type="checkbox"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label htmlFor="rating_1" className="checktoggle checkbox-bg">

                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                <div className="input-block mb-3">
                                                                    <label>Stripe Key</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Stripe Key"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                <div className="input-block mb-3">
                                                                    <label>Stripe Secret</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Stripe Secret"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group-item">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="payment-toggle">
                                                                    <h5 className="form-title">Paypal</h5>
                                                                    <div className="status-toggle">
                                                                        <input
                                                                            id="rating_2"
                                                                            className="check"
                                                                            type="checkbox"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label htmlFor="rating_2" className="checktoggle checkbox-bg">

                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-12">
                                                                <div className="input-block mb-3">
                                                                    <label>Paypal Client Id</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Paypal Client Id"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-12">
                                                                <div className="input-block mb-3">
                                                                    <label>Paypal Secret</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Paypal Secret"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-12">
                                                                <div className="input-block mb-3">
                                                                    <label>Paypal Mode</label>
                                                                    <select className="select form-control">
                                                                        <option>Select Paypal Mode</option>
                                                                        <option>Debit Card</option>
                                                                        <option>Credit Card</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group-item border-0 p-0">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="payment-toggle">
                                                                    <h5 className="form-title">Razorpay</h5>
                                                                    <div className="status-toggle">
                                                                        <input
                                                                            id="rating_3"
                                                                            className="check"
                                                                            type="checkbox"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label htmlFor="rating_3" className="checktoggle checkbox-bg">

                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                <div className="input-block mb-0">
                                                                    <label>Razorpay Key Id</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Razorpay Key Id"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-12">
                                                                <div className="input-block mb-0">
                                                                    <label>Razorpay Secret</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Razorpay Secret"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="btn-path text-end">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="btn btn-cancel bg-primary-light me-3"
                                                            >
                                                                Cancel
                                                            </a>
                                                            <a href="javascript:void(0);" className="btn btn-primary">
                                                                Save Changes
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    {/* Email Templates */}
                                    <div
                                        className="tab-pane fade"
                                        id="v-pills-email"
                                        role="tabpanel"
                                        aria-labelledby="v-pills-email-tab"
                                    >
                                        <div className="col-xl-12 col-md-12">
                                            <div className="page-header">
                                                <div className="content-page-header">
                                                    <h5>Email Templates</h5>
                                                    <div className="page-content">
                                                        <div className="list-btn">
                                                            <ul className="filter-list">
                                                                <li>
                                                                    <a
                                                                        className="btn btn-primary"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#add_custom"
                                                                    >
                                                                        <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                                                                        Add Template
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="email-template-card">
                                                <div className="row">
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Email Verification</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Welcome Email</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Feature Announcement</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Plan Announcement</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Engagement/Usage Reminder</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Feedback Request</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Plan Renewal Reminder</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Plan Expired</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-md-6 d-flex">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>Policy Update Notice</h5>
                                                                <div className="d-flex package-edit">
                                                                    <a
                                                                        className="btn-action-icon me-2"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#edit_email"
                                                                    >
                                                                        <i className="fe fe-edit" />
                                                                    </a>
                                                                    <a
                                                                        className="btn-action-icon"
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_modal"
                                                                    >
                                                                        <i className="fe fe-trash-2" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


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
                                                                <li>

                                                                </li>
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
                                                        <div className="cardStyle">
                                                            <form action="" method="post" name="signupForm" id="signupForm">

                                                                <h5 className="formTitle">Change Password</h5>
                                                                <div className="inputDiv">
                                                                    <label className="inputLabel" htmlFor="password">
                                                                        Current Password
                                                                    </label>
                                                                    <input type="password" id="password" name="password" required="" />
                                                                </div>
                                                                <div className="inputDiv">
                                                                    <label className="inputLabel" htmlFor="password">
                                                                        New Password
                                                                    </label>
                                                                    <input type="password" id="password" name="password" required="" />
                                                                </div>
                                                                <div className="inputDiv">
                                                                    <label className="inputLabel" htmlFor="confirmPassword">
                                                                        Confirm New Password
                                                                    </label>
                                                                    <input type="password" id="confirmPassword" name="confirmPassword" />
                                                                </div>
                                                                <div className="buttonWrapper">
                                                                    <button
                                                                        type="submit"
                                                                        id="submitButton"

                                                                        className="submitButton"
                                                                    >
                                                                        <span>Submit</span>

                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
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