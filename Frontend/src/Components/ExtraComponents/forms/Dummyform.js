import React from 'react'

function Dummyform() {
    return (
        <>



            <>
                <div className="content container-fluid">
                    <div className="signature-invoice">
                        <div className="page-header">
                            <div className="content-page-header">
                                <h5>Create Invoice</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="edit-card">
                                    <div className="card-body">
                                        <div className="form-group-item border-0 mb-0">
                                            <div className="row align-item-center">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Invoice Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Invoice Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Customer Name</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <select className="select">
                                                                    <option>Customer 1</option>
                                                                    <option>Customer 2</option>
                                                                    <option>Customer 3</option>
                                                                </select>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="btn btn-primary form-plus-btn"
                                                                    href="add-customer.html"
                                                                >
                                                                    <i className="fe fe-plus-circle" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Invoice Date</label>
                                                        <div className="cal-icon cal-icon-info">
                                                            <input
                                                                type="text"
                                                                className="datetimepicker form-control"
                                                                placeholder="Select Date"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Due Date</label>
                                                        <div className="cal-icon cal-icon-info">
                                                            <input
                                                                type="text"
                                                                className="datetimepicker form-control"
                                                                placeholder="Select Date"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Status</label>
                                                        <select className="select">
                                                            <option>Unpaid</option>
                                                            <option>Partially paid</option>
                                                            <option>Paid</option>
                                                            <option>Overdue</option>
                                                            <option>Cancelled</option>
                                                            <option>Refunded</option>
                                                            <option>Draft</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label>Reference Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Reference Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="d-flex justify-content-between flex-wrap">
                                                        <div className="input-block mb-3 recurring-tab">
                                                            <label>Recurring</label>
                                                            <ul
                                                                className="nav nav-pills d-flex"
                                                                id="pills-tab"
                                                                role="tablist"
                                                            >
                                                                <li className="nav-item" role="presentation">
                                                                    <button
                                                                        className="nav-link active yes"
                                                                        id="pills-home-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-home"
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-controls="pills-home"
                                                                        aria-selected="true"
                                                                    >
                                                                        Yes
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <button
                                                                        className="nav-link no"
                                                                        id="pills-profile-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-profile"
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-controls="pills-profile"
                                                                        aria-selected="false"
                                                                    >
                                                                        No
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="tab-content pt-0" id="pills-tabContent">
                                                            <div
                                                                className="tab-pane fade show active"
                                                                id="pills-home"
                                                                role="tabpanel"
                                                                aria-labelledby="pills-home-tab"
                                                            >
                                                                <div className="input-block mb-3">
                                                                    <label>Recurring cycle</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Month"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="tab-pane fade"
                                                                id="pills-profile"
                                                                role="tabpanel"
                                                                aria-labelledby="pills-profile-tab"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8">
                                                    <div className="input-block mb-3">
                                                        <label>Products</label>
                                                        <ul className="form-group-plus css-equal-heights">
                                                            <li>
                                                                <select className="select">
                                                                    <option>Product 1</option>
                                                                    <option>Product 2</option>
                                                                    <option>Product 3</option>
                                                                </select>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className="btn btn-primary form-plus-btn"
                                                                    href="add-products.html"
                                                                >
                                                                    <i className="fe fe-plus-circle" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group-item">
                                            <div className="card-table">
                                                <div className="card-body">
                                                    <div className="table-responsive">
                                                        <table className="table table-center table-hover datatable">
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Product / Service</th>
                                                                    <th>Quantity</th>
                                                                    <th>Unit</th>
                                                                    <th>Rate</th>
                                                                    <th>Discount</th>
                                                                    <th>Tax</th>
                                                                    <th>Amount</th>
                                                                    <th className="no-sort">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Lorem ipsum dolor sit amet</td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            defaultValue={0}
                                                                        />
                                                                    </td>
                                                                    <td>Pcs</td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            defaultValue={120}
                                                                        />
                                                                    </td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                    <td>$120.00</td>
                                                                    <td className="d-flex align-items-center">
                                                                        <a
                                                                            href="#"
                                                                            className="btn-action-icon me-2"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#add_discount"
                                                                        >
                                                                            <span>
                                                                                <i className="fe fe-edit" />
                                                                            </span>
                                                                        </a>
                                                                        <a
                                                                            href="#"
                                                                            className="btn-action-icon"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#delete_discount"
                                                                        >
                                                                            <span>
                                                                                <i className="fe fe-trash-2" />
                                                                            </span>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-lg-7">
                                                        <div className="input-block mb-3">
                                                            <label>Discount Type</label>
                                                            <select className="select">
                                                                <option>Percentage(%)</option>
                                                                <option>Fixed</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5">
                                                        <div className="input-block mb-3">
                                                            <label>Discount(%)</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder={10}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="input-block mb-3">
                                                    <label>Tax</label>
                                                    <select className="select">
                                                        <option>No Tax</option>
                                                        <option>IVA - (21%)</option>
                                                        <option>IRPF - (-15%)</option>
                                                        <option>PDV - (20%)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4" />
                                        </div>
                                        <div className="form-group-item border-0 p-0">
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-12">
                                                    <div className="form-group-bank">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-8">
                                                                <div className="input-block mb-3">
                                                                    <label>Select Bank</label>
                                                                    <select className="select">
                                                                        <option>Select Bank</option>
                                                                        <option>SBI</option>
                                                                        <option>IOB</option>
                                                                        <option>Canara</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-groups">
                                                                    <a
                                                                        className="btn btn-primary"
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#bank_details"
                                                                    >
                                                                        Add Bank
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="input-block mb-3 notes-form-group-info">
                                                            <label>Notes</label>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="Enter Notes"
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                        <div className="input-block  notes-form-group-info mb-0">
                                                            <label>Terms and Conditions</label>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="Enter Terms and Conditions"
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-12">
                                                    <div className="form-group-bank">
                                                        <div className="invoice-total-box">
                                                            <div className="invoice-total-inner">
                                                                <p>
                                                                    Taxable Amount <span>$120.00</span>
                                                                </p>
                                                                <p>
                                                                    Discount <span>$13.20</span>
                                                                </p>
                                                                <p>
                                                                    Vat <span>$0.00</span>
                                                                </p>
                                                                <div className="status-toggle justify-content-between">
                                                                    <div className="d-flex align-center">
                                                                        <p>Round Off </p>
                                                                        <input
                                                                            id="rating_1"
                                                                            className="check"
                                                                            type="checkbox"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label
                                                                            htmlFor="rating_1"
                                                                            className="checktoggle checkbox-bg"
                                                                        >
                                                                            checkbox
                                                                        </label>
                                                                    </div>
                                                                    <span>$0.00</span>
                                                                </div>
                                                            </div>
                                                            <div className="invoice-total-footer">
                                                                <h4>
                                                                    Total Amount <span>$107.80</span>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <ul
                                                                className="nav nav-pills"
                                                                id="pills-tab1"
                                                                role="tablist"
                                                            >
                                                                <li className="nav-item" role="presentation">
                                                                    <span
                                                                        className="custom_radio me-4 mb-0 active"
                                                                        id="home-tab"
                                                                        data-bs-toggle="tab"
                                                                        data-bs-target="#home"
                                                                        role="tab"
                                                                        aria-controls="home"
                                                                        aria-selected="true"
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            className="form-control"
                                                                            name="payment"
                                                                        />
                                                                        <span className="checkmark" /> Manual Signature
                                                                    </span>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <span
                                                                        className="custom_radio me-2 mb-0"
                                                                        id="profile-tab"
                                                                        data-bs-toggle="tab"
                                                                        data-bs-target="#profile"
                                                                        role="tab"
                                                                        aria-controls="profile"
                                                                        aria-selected="false"
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            className="form-control"
                                                                            name="payment"
                                                                        />
                                                                        <span className="checkmark" /> eSignature
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                            <div className="tab-content">
                                                                <div
                                                                    className="tab-pane fade show active"
                                                                    id="home"
                                                                    role="tabpanel"
                                                                    aria-labelledby="home-tab"
                                                                >
                                                                    <div className="input-block mb-3">
                                                                        <label>Select Signature Name</label>
                                                                        <select className="select">
                                                                            <option>Allen</option>
                                                                            <option>Steven</option>
                                                                            <option>Ralph</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="input-block mb-0">
                                                                        <label>Signature Image</label>
                                                                        <div className="input-block service-upload service-upload-info mb-0">
                                                                            <span>
                                                                                <img
                                                                                    src="assets/img/invoice-signature.png"
                                                                                    alt="signature"
                                                                                />
                                                                            </span>
                                                                            <input
                                                                                type="file"
                                                                                multiple=""
                                                                                id="image_sign"
                                                                            />
                                                                            <div id="frames" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="tab-pane fade"
                                                                    id="profile"
                                                                    role="tabpanel"
                                                                    aria-labelledby="profile-tab"
                                                                >
                                                                    <div className="input-block mb-3">
                                                                        <label>Enter Signature Name</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter Name"
                                                                        />
                                                                    </div>
                                                                    <div className="input-block mb-0">
                                                                        <ul
                                                                            className="nav nav-pills"
                                                                            id="pills-tab2"
                                                                            role="tablist"
                                                                        >
                                                                            <li className="nav-item" role="presentation">
                                                                                <span
                                                                                    className="custom_radio me-4 mb-0 active"
                                                                                    id="upload-signature-tab"
                                                                                    data-bs-toggle="tab"
                                                                                    data-bs-target="#upload-signature"
                                                                                    role="tab"
                                                                                    aria-controls="upload-signature"
                                                                                    aria-selected="true"
                                                                                >
                                                                                    <input
                                                                                        type="radio"
                                                                                        className="form-control p-0"
                                                                                        name="payment"
                                                                                    />
                                                                                    <span className="checkmark" />
                                                                                    Upload Signature
                                                                                </span>
                                                                            </li>
                                                                            <li className="nav-item" role="presentation">
                                                                                <span
                                                                                    className="custom_radio me-2 mb-0"
                                                                                    id="e-signature-tab"
                                                                                    data-bs-toggle="tab"
                                                                                    data-bs-target="#e-signature"
                                                                                    role="tab"
                                                                                    aria-controls="e-signature"
                                                                                    aria-selected="false"
                                                                                >
                                                                                    <input
                                                                                        type="radio"
                                                                                        className="form-control p-0"
                                                                                        name="payment"
                                                                                    />
                                                                                    <span className="checkmark" /> Draw your
                                                                                    eSignature
                                                                                </span>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="tab-content">
                                                                            <div
                                                                                className="tab-pane fade show active"
                                                                                id="upload-signature"
                                                                                role="tabpanel"
                                                                                aria-labelledby="upload-signature-tab"
                                                                            >
                                                                                <div className="input-block service-upload service-upload-info mb-0">
                                                                                    <span>
                                                                                        <i className="fe fe-upload-cloud me-1" />
                                                                                        Upload Signature
                                                                                    </span>
                                                                                    <input
                                                                                        type="file"
                                                                                        multiple=""
                                                                                        id="image_sign2"
                                                                                    />
                                                                                    <div id="frames2" />
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="tab-pane fade"
                                                                                id="e-signature"
                                                                                role="tabpanel"
                                                                                aria-labelledby="e-signature-tab"
                                                                            >
                                                                                <div className="e-signature-block">
                                                                                    <div className="signature-draw-area"></div>
                                                                                    <a
                                                                                        href="javascript:void(0);"
                                                                                        className="signature-clear"
                                                                                    >
                                                                                        Clear &amp; draw again
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
                                            </div>
                                        </div>
                                        <div className="preview-boxs">
                                            <a href="signature-preview-invoice.html">Preview Invoice</a>
                                            <form
                                                action="https://kanakku.dreamstechnologies.com/html/template/invoices.html"
                                                className="add-customer-btns text-end"
                                            >
                                                <button type="reset" className="btn btn-primary cancel me-2">
                                                    Cancel
                                                </button>
                                                <button type="reset" className="btn btn-primary cancel me-2">
                                                    Save
                                                </button>
                                                <button type="submit" className="btn btn-primary">
                                                    Save &amp; Send
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal custom-modal fade" id="add_discount" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add Tax &amp; Discount</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-block mb-3">
                                            <label>Rate</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder={120}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-block mb-3">
                                            <label>Discount Amount</label>
                                            <input type="number" className="form-control" placeholder={0} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-block mb-0">
                                            <label>Tax</label>
                                            <select className="select">
                                                <option>N/A</option>
                                                <option>5%</option>
                                                <option>10%</option>
                                                <option>15%</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer add-tax-btns">
                                <a
                                    href="#"
                                    data-bs-dismiss="modal"
                                    className="btn add-btn-cancel-btn"
                                >
                                    Cancel
                                </a>
                                <a
                                    href="#"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary add-tax-save-btn"
                                >
                                    Update
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal custom-modal fade" id="delete_discount" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 justify-content-center pb-0">
                                <div className="form-header modal-header-title text-center mb-0">
                                    <h4 className="mb-2">Delete Product / Services</h4>
                                    <p>Are you sure want to delete?</p>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="modal-btn delete-action">
                                    <div className="row">
                                        <div className="col-6">
                                            <a
                                                href="#"
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary paid-continue-btn"
                                            >
                                                Delete
                                            </a>
                                        </div>
                                        <div className="col-6">
                                            <a
                                                href="#"
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary paid-cancel-btn"
                                            >
                                                Cancel
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal custom-modal fade" id="bank_details" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Edit Bank Details</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-block mb-3">
                                            <label>
                                                Bank Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Bank Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-block mb-3">
                                            <label>
                                                Account Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Account Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-block mb-3">
                                            <label>
                                                Branch Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Branch Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-block mb-0">
                                            <label>
                                                IFSC Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter IFSC COde"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a
                                    href="#"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary paid-cancel-btn me-2"
                                >
                                    Back
                                </a>
                                <a
                                    href="#"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary paid-continue-btn"
                                >
                                    Update
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default Dummyform