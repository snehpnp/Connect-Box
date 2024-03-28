import React from 'react'

const Tabe = () => {
    return (
        <div>
            <>

                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="content-page-header ">
                            <h5>Inventory History</h5>
                            <div className="list-btn">
                                <ul className="filter-list">
                                    <li>
                                        <a
                                            className="btn btn-filters w-auto popup-toggle"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            data-bs-original-title="filter"
                                        >
                                            <span className="me-2">
                                                <img src="assets/img/icons/filter-icon.svg" alt="filter" />
                                            </span>
                                            Filter{" "}
                                        </a>
                                    </li>
                                    <li className="">
                                        <div
                                            className="dropdown dropdown-action"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            data-bs-original-title="download"
                                        >
                                            <a
                                                href="#"
                                                className="btn-filters"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <span>
                                                    <i className="fe fe-download" />
                                                </span>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <ul className="d-block">
                                                    <li>
                                                        <a
                                                            className="d-flex align-items-center download-item"
                                                            href="javascript:void(0);"
                                                            download=""
                                                        >
                                                            <i className="far fa-file-pdf me-2" />
                                                            PDF
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="d-flex align-items-center download-item"
                                                            href="javascript:void(0);"
                                                            download=""
                                                        >
                                                            <i className="far fa-file-text me-2" />
                                                            CVS
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            className="btn-filters"
                                            href="javascript:void(0);"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            data-bs-original-title="print"
                                        >
                                            <span>
                                                <i className="fe fe-printer" />
                                            </span>{" "}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className=" card-table">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div className="inventory-table">
                                            <table className="table table-center table-hover datatable">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Item</th>
                                                        <th>Code</th>
                                                        <th>Units</th>
                                                        <th>Quantity</th>
                                                        <th>Selling Price</th>
                                                        <th>Purchase Price</th>
                                                        <th className="no-sort">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Nike Jordan</td>
                                                        <td>P125390</td>
                                                        <td>Pieces</td>
                                                        <td>2</td>
                                                        <td>$1360.00</td>
                                                        <td>$1350.00</td>
                                                        <td className="d-flex align-items-center">
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-success-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_in"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock in
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-danger-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_out"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock out
                                                            </a>
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className=" btn-action-icon "
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#">
                                                                                <i className="far fa-edit me-2" />
                                                                                Edit
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_stock"
                                                                            >
                                                                                <i className="far fa-trash-alt me-2" />
                                                                                Delete
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Lobar Handy</td>
                                                        <td>P125393</td>
                                                        <td>Inches</td>
                                                        <td>5</td>
                                                        <td>$155.00</td>
                                                        <td>$150.00</td>
                                                        <td className="d-flex align-items-center">
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-success-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_in"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock in
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-danger-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_out"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock out
                                                            </a>
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className=" btn-action-icon "
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#">
                                                                                <i className="far fa-edit me-2" />
                                                                                Edit
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_stock"
                                                                            >
                                                                                <i className="far fa-trash-alt me-2" />
                                                                                Delete
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Iphone 14 Pro</td>
                                                        <td>P125398</td>
                                                        <td>Inches</td>
                                                        <td>7</td>
                                                        <td>$764.00</td>
                                                        <td>$750.00</td>
                                                        <td className="d-flex align-items-center">
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-success-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_in"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock in
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-danger-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_out"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock out
                                                            </a>
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className=" btn-action-icon "
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#">
                                                                                <i className="far fa-edit me-2" />
                                                                                Edit
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_stock"
                                                                            >
                                                                                <i className="far fa-trash-alt me-2" />
                                                                                Delete
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Black Slim 200</td>
                                                        <td>P125395</td>
                                                        <td>Inches</td>
                                                        <td>3</td>
                                                        <td>$255.00</td>
                                                        <td>$250.00</td>
                                                        <td className="d-flex align-items-center">
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-success-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_in"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock in
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-danger-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_out"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock out
                                                            </a>
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className=" btn-action-icon "
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#">
                                                                                <i className="far fa-edit me-2" />
                                                                                Edit
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_stock"
                                                                            >
                                                                                <i className="far fa-trash-alt me-2" />
                                                                                Delete
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>5</td>
                                                        <td>Bold V3.2</td>
                                                        <td>P125397</td>
                                                        <td>Pieces</td>
                                                        <td>6</td>
                                                        <td>$1055.00</td>
                                                        <td>$1050.00</td>
                                                        <td className="d-flex align-items-center">
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-success-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_in"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock in
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-danger-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_out"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock out
                                                            </a>
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className=" btn-action-icon "
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#">
                                                                                <i className="far fa-edit me-2" />
                                                                                Edit
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_stock"
                                                                            >
                                                                                <i className="far fa-trash-alt me-2" />
                                                                                Delete
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>6</td>
                                                        <td>Woodcraft Sandal</td>
                                                        <td>P125394</td>
                                                        <td>Pieces</td>
                                                        <td>8</td>
                                                        <td>$175.00</td>
                                                        <td>$140.00</td>
                                                        <td className="d-flex align-items-center">
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-success-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_in"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock in
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn btn-greys bg-danger-light me-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#stock_out"
                                                            >
                                                                <i className="fa fa-plus-circle me-1" /> Stock out
                                                            </a>
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className=" btn-action-icon "
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <ul>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#">
                                                                                <i className="far fa-edit me-2" />
                                                                                Edit
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="javascript:void(0);"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_stock"
                                                                            >
                                                                                <i className="far fa-trash-alt me-2" />
                                                                                Delete
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="toggle-sidebar">
                    <div className="sidebar-layout-filter">
                        <div className="sidebar-header">
                            <h5>Filter</h5>
                            <a href="#" className="sidebar-closes">
                                <i className="fa-regular fa-circle-xmark" />
                            </a>
                        </div>
                        <div className="sidebar-body">
                            <form action="#" autoComplete="off">
                                <div className="accordion" id="accordionMain1">
                                    <div className="card-header-new" id="headingOne">
                                        <h6 className="filter-title">
                                            <a
                                                href="javascript:void(0);"
                                                className="w-100"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                Product Name
                                                <span className="float-end">
                                                    <i className="fa-solid fa-chevron-down" />
                                                </span>
                                            </a>
                                        </h6>
                                    </div>
                                    <div
                                        id="collapseOne"
                                        className="collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample1"
                                    >
                                        <div className="card-body-chat">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div id="checkBoxes1">
                                                        <div className="form-custom">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="member_search1"
                                                                placeholder="Search Product"
                                                            />
                                                            <span>
                                                                <img src="assets/img/icons/search.svg" alt="img" />
                                                            </span>
                                                        </div>
                                                        <div className="selectBox-cont">
                                                            <label className="custom_check w-100">
                                                                <input type="checkbox" name="username" />
                                                                <span className="checkmark" /> Nike Jordan
                                                            </label>
                                                            <label className="custom_check w-100">
                                                                <input type="checkbox" name="username" />
                                                                <span className="checkmark" /> Lobar Handy
                                                            </label>
                                                            <label className="custom_check w-100">
                                                                <input type="checkbox" name="username" />
                                                                <span className="checkmark" /> Iphone 14 Pro
                                                            </label>
                                                            <label className="custom_check w-100">
                                                                <input type="checkbox" name="username" />
                                                                <span className="checkmark" /> Black Slim 200
                                                            </label>
                                                            <div className="view-content">
                                                                <div className="viewall-One">
                                                                    <label className="custom_check w-100">
                                                                        <input type="checkbox" name="username" />
                                                                        <span className="checkmark" /> Bold V3.2
                                                                    </label>
                                                                    <label className="custom_check w-100">
                                                                        <input type="checkbox" name="username" />
                                                                        <span className="checkmark" /> Woodcraft Sandal
                                                                    </label>
                                                                </div>
                                                                <div className="view-all">
                                                                    <a
                                                                        href="javascript:void(0);"
                                                                        className="viewall-button-One"
                                                                    >
                                                                        <span className="me-2">View All</span>
                                                                        <span>
                                                                            <i className="fa fa-circle-chevron-down" />
                                                                        </span>
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
                                <div className="accordion" id="accordionMain4">
                                    <div className="card-header-new" id="headingFour">
                                        <h6 className="filter-title">
                                            <a
                                                href="javascript:void(0);"
                                                className="w-100 collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="true"
                                                aria-controls="collapseFour"
                                            >
                                                Product Code
                                                <span className="float-end">
                                                    <i className="fa-solid fa-chevron-down" />
                                                </span>
                                            </a>
                                        </h6>
                                    </div>
                                    <div
                                        id="collapseFour"
                                        className="collapse"
                                        aria-labelledby="headingFour"
                                        data-bs-parent="#accordionExample4"
                                    >
                                        <div className="card-body-chat">
                                            <div id="checkBoxes3">
                                                <div className="selectBox-cont">
                                                    <div className="form-custom">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="member_search2"
                                                            placeholder="Search Invoice"
                                                        />
                                                        <span>
                                                            <img src="assets/img/icons/search.svg" alt="img" />
                                                        </span>
                                                    </div>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="category" />
                                                        <span className="checkmark" /> P125390
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="category" />
                                                        <span className="checkmark" /> P125393
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="category" />
                                                        <span className="checkmark" /> P125398
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="category" />
                                                        <span className="checkmark" /> P125395
                                                    </label>
                                                    <div className="view-content">
                                                        <div className="viewall-Two">
                                                            <label className="custom_check w-100">
                                                                <input type="checkbox" name="username" />
                                                                <span className="checkmark" /> P125397
                                                            </label>
                                                            <label className="custom_check w-100">
                                                                <input type="checkbox" name="username" />
                                                                <span className="checkmark" /> P125390
                                                            </label>
                                                        </div>
                                                        <div className="view-all">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="viewall-button-Two"
                                                            >
                                                                <span className="me-2">View All</span>
                                                                <span>
                                                                    <i className="fa fa-circle-chevron-down" />
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion accordion-last" id="accordionMain3">
                                    <div className="card-header-new" id="headingThree">
                                        <h6 className="filter-title">
                                            <a
                                                href="javascript:void(0);"
                                                className="w-100 collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="true"
                                                aria-controls="collapseThree"
                                            >
                                                Units
                                                <span className="float-end">
                                                    <i className="fa-solid fa-chevron-down" />
                                                </span>
                                            </a>
                                        </h6>
                                    </div>
                                    <div
                                        id="collapseThree"
                                        className="collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample3"
                                    >
                                        <div className="card-body-chat">
                                            <div id="checkBoxes2">
                                                <div className="selectBox-cont">
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="bystatus" />
                                                        <span className="checkmark" /> Inches
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="bystatus" />
                                                        <span className="checkmark" /> Pieces
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="bystatus" />
                                                        <span className="checkmark" /> Hours
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="bystatus" />
                                                        <span className="checkmark" /> Box
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="bystatus" />
                                                        <span className="checkmark" /> Kilograms
                                                    </label>
                                                    <label className="custom_check w-100">
                                                        <input type="checkbox" name="bystatus" />
                                                        <span className="checkmark" /> Meter
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-buttons">
                                    <button
                                        type="submit"
                                        className="d-inline-flex align-items-center justify-content-center btn w-100 btn-primary"
                                    >
                                        Apply
                                    </button>
                                    <button
                                        type="submit"
                                        className="d-inline-flex align-items-center justify-content-center btn w-100 btn-secondary"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal custom-modal fade" id="stock_in" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add Stock in</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <form action="#">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    className="bg-white-smoke form-control"
                                                    placeholder="SEO Service"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Quantity</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder={0}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-0">
                                                <label>Units</label>
                                                <select className="select">
                                                    <option>Pieces</option>
                                                    <option>Inches</option>
                                                    <option>Kilograms</option>
                                                    <option>Inches</option>
                                                    <option>Box</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-block mb-0">
                                                <label>Notes</label>
                                                <textarea
                                                    rows={3}
                                                    cols={3}
                                                    className="form-control"
                                                    placeholder="Enter Notes"
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        data-bs-dismiss="modal"
                                        className="btn btn-back cancel-btn me-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary paid-continue-btn"
                                    >
                                        Add Quantity
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal custom-modal fade" id="stock_out" role="dialog" >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Remove Stock</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <form action="#">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    className="bg-white-smoke form-control"
                                                    placeholder="SEO Service"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Quantity</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder={0}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-0">
                                                <label>Units</label>
                                                <select className="select">
                                                    <option>Pieces</option>
                                                    <option>Inches</option>
                                                    <option>Kilograms</option>
                                                    <option>Inches</option>
                                                    <option>Box</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-block mb-0">
                                                <label>Notes</label>
                                                <textarea
                                                    rows={3}
                                                    cols={3}
                                                    className="form-control"
                                                    placeholder="Enter Notes"
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        data-bs-dismiss="modal"
                                        className="btn btn-back cancel-btn me-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary paid-continue-btn"
                                    >
                                        Remove Quantity
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal custom-modal fade" id="edit_inventory" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Edit Inventory</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <form action="#">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Lorem ipsum dolor sit"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Code</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="P125389"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Units</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Box"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Quantity</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={3}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Selling Price</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="$155.00"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-3">
                                                <label>Purchase Price</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="$150.00"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="input-block mb-0">
                                                <label>Status</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Stock in"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        data-bs-dismiss="modal"
                                        className="btn btn-back cancel-btn me-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary paid-continue-btn"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal custom-modal fade" id="delete_stock" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="form-header">
                                    <h3>Delete Inventory History</h3>
                                    <p>Are you sure want to delete?</p>
                                </div>
                                <div className="modal-btn delete-action">
                                    <div className="row">
                                        <div className="col-6">
                                            <a href="#" className="btn btn-primary paid-continue-btn">
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
            </>

        </div>
    )
}

export default Tabe
