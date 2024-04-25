import React from 'react'

const Strategies = () => {
    return (
        <div>
            <div className="content container-fluid pb-0">

                <div className="page-header">
                    <div className="content-page-header">
                        <h5>Plans List</h5>
                        <div className="page-content">
                            <div className="list-btn">
                                <ul className="filter-list">
                                    {/* <li>
                                        <a
                                            className="btn-filters active"
                                            href="packages.html"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Grid-View"
                                        >
                                            <span>
                                                <i className="fe fe-grid" />
                                            </span>
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a
                                            className="btn-filters"
                                            href="plans-list.html"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="List-View"
                                        >
                                            <span>
                                                <i className="fe fe-list" />
                                            </span>
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a
                                            className="btn-filters"
                                            href="javascript:void(0);"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Refresh"
                                        >
                                            <span>
                                                <i className="fe fe-refresh-ccw" />
                                            </span>
                                        </a>
                                    </li> */}
                                  
                                    {/* <li>
                                        <div
                                            className="dropdown dropdown-action"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Download"
                                        >
                                            <a
                                                href="#"
                                                className="btn btn-filters"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <span className="me-2">
                                                    <i className="fe fe-download" />
                                                </span>
                                                Export
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <ul className="d-block">
                                                    <li>
                                                        <a
                                                            className="d-flex align-items-center download-item"
                                                            href="javascript:void(0);"
                                                            download=""
                                                        >
                                                            <i className="far fa-file-pdf me-2" />
                                                            Export as PDF
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="d-flex align-items-center download-item"
                                                            href="javascript:void(0);"
                                                            download=""
                                                        >
                                                            <i className="far fa-file-text me-2" />
                                                            Export as Excel
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li>
                                        <a
                                            className="btn btn-filters"
                                            href="javascript:void(0);"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Print"
                                        >
                                            <span className="me-2">
                                                <i className="fe fe-printer" />
                                            </span>{" "}
                                            Print
                                        </a>
                                    </li> */}
                                    <li>
                                        <p
                                            className="btn btn-primary"
                                             
                                            data-bs-toggle="modal"
                                            data-bs-target="#add_newpackage"
                                        >
                                            <i className="fa fa-plus-circle me-2" aria-hidden="true" />
                                            Add Plan
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row d-flex align-items-center justify-content-center">

                    {Array.from({ length: 40 }, (_, index) => (

                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                            <div className="packages card">
                                <div className="package-header d-flex justify-content-between">
                                    <div className="d-flex justify-content-between w-100">
                                        <div className="">
                                            <h6>Monthly</h6>
                                            <h4>Free</h4>
                                        </div>
                                        <span className="icon-frame d-flex align-items-center justify-content-center">
                                            <img src="assets/img/icons/price-01.svg" alt="img" />
                                        </span>
                                    </div>
                                </div>
                                <p>Lorem ipsum dolor sit amet doloroli sitiol conse ctetur </p>
                                <h2>$0.00</h2>
                                <h6>What’s included</h6>
                                <ul>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />2 Users
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />1 Suppliers
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />
                                        10 Products
                                    </li>
                                    <li>
                                        <i className="fa-solid fa-circle-check" />1 Invoice
                                    </li>
                                </ul>
                                <div className="d-flex justify-content-center package-edit">
                                    <a
                                        className="btn btn-primary"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit_package"
                                    >
                                      BUY
                                    </a>
                                    {/* <a
                                        className="btn-action-icon"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete_modal"
                                    >
                                        <i className="fe fe-trash-2" />
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>


        </div>
    )
}

export default Strategies
