import React from 'react'

const Settings = () => {
    return (
        <div>
            <div className="content container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="page-header">
                                    <div className="content-page-header">
                                        <h5>Settings</h5>
                                    </div>
                                </div>
                                <div className="widget settings-menu mb-0">
                                    <ul>
                                        <li className="nav-item">
                                            <a href="settings.html" className="nav-link active">
                                                <i className="fe fe-user" /> <span>Account Settings</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="company-settings.html" className="nav-link">
                                                <i className="fe fe-settings" /> <span>Company Settings</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="invoice-settings.html" className="nav-link">
                                                <i className="fe fe-file" /> <span>Invoice Settings</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="template-invoice.html" className="nav-link">
                                                <i className="fe fe-layers" /> <span>Invoice Templates</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="payment-settings.html" className="nav-link">
                                                <i className="fe fe-credit-card" />{" "}
                                                <span>Payment Methods</span>
                                            </a>
                                        </li>
                                     
                                    
                                        <li className="nav-item">
                                            <a href="plan-billing.html" className="nav-link">
                                                <i className="fe fe-credit-card" />{" "}
                                                <span>Plan &amp; Billing</span>
                                            </a>
                                        </li>
                                       
                                        <li className="nav-item">
                                            <a href="custom-filed.html" className="nav-link">
                                                <i className="fe fe-file-text" /> <span>Custom Fields</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="email-settings.html" className="nav-link">
                                                <i className="fe fe-mail" /> <span>Email Settings</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="preferences.html" className="nav-link">
                                                <i className="fe fe-settings" />{" "}
                                                <span>Preference Settings</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="email-template.html" className="nav-link">
                                                <i className="fe fe-airplay" /> <span>Email Templates</span>
                                            </a>
                                        </li>
                                 
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-md-8">
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
                                            <select className="select">
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
                                        <div className="form-title">
                                            <h5>Address Information</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-block mb-3">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Address"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="input-block mb-3">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Country"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="input-block mb-3">
                                            <label>State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your State"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="input-block mb-3">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your City"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="input-block mb-3">
                                            <label>Postal Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Postal Code"
                                            />
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
            </div>


        </div>
    )
}

export default Settings
