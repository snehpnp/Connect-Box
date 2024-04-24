import React from 'react'
import Sidebar from '../Sidebar/Sidebars'
const Invoicetemp = () => {
    return (
        <div>
            <div className="row">
                <div className="col-xl-3 col-md-4">
                    <Sidebar />
                </div>
                <div className="col-xl-9 col-md-8">
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

        </div>
    )
}

export default Invoicetemp
