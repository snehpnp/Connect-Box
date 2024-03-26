import React from 'react'

const Sub = () => {
    return (
        <div>
            <div className="content container-fluid">

{/* PAGE HEADER */}
                <div className="page-header">
                    <div className="content-page-header">
                        <h5>Subscriber List</h5>
                        <div className="page-content">
                            <div className="list-btn">
                                <ul className="filter-list">
                                    <li>
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
                                    </li>
                                    <li>
                                        <a
                                            className="btn btn-filters w-auto popup-toggle"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="bottom"
                                            title="Filter"
                                        >
                                            <span className="me-2">
                                                <img src="assets/img/icons/filter-icon.svg" alt="filter" />
                                            </span>
                                            Filter
                                        </a>
                                    </li>
                                    <li>
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
                                    </li>
                                    <li>
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
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="super-admin-list-head">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 d-flex">
                            <div className="card w-100">
                                <div className="card-body">
                                    <div className="grid-info-item subscription-list total-transaction">
                                        <div className="grid-head-icon">
                                            <i className="fe fe-shield" />
                                        </div>
                                        <div className="grid-info">
                                            <span>Total Transaction</span>
                                            <h4>$6,565,60</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 d-flex">
                            <div className="card w-100">
                                <div className="card-body">
                                    <div className="grid-info-item subscription-list total-subscriber">
                                        <div className="grid-head-icon">
                                            <i className="fe fe-users" />
                                        </div>
                                        <div className="grid-info">
                                            <span>Total Subscribers</span>
                                            <h4>945</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 d-flex">
                            <div className="card w-100">
                                <div className="card-body">
                                    <div className="grid-info-item subscription-list active-subscriber">
                                        <div className="grid-head-icon">
                                            <i className="fe fe-user-check" />
                                        </div>
                                        <div className="grid-info">
                                            <span>Active Subscriber</span>
                                            <h4>944</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 d-flex">
                            <div className="card w-100">
                                <div className="card-body">
                                    <div className="grid-info-item subscription-list expired-subscriber">
                                        <div className="grid-head-icon">
                                            <i className="fe fe-user-x" />
                                        </div>
                                        <div className="grid-info">
                                            <span>Expired</span>
                                            <h4>1</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-table">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <div className="companies-table">
                                        <table className="table table-center table-hover datatable">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="no-sort">#</th>
                                                    <th>Subscriber</th>
                                                    <th>Plan</th>
                                                    <th>Billing Cycle</th>
                                                    <th>Payment Gateway</th>
                                                    <th>Amount</th>
                                                    <th>Registered On</th>
                                                    <th>Expiring On</th>
                                                    <th>Status</th>
                                                    <th>Invoice </th>
                                                    <th className="no-sort">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>
                                                        <h2 className="table-avatar">
                                                            <a
                                                                href="profile.html"
                                                                className="company-avatar avatar-md me-2 companies company-icon"
                                                            >
                                                                <img
                                                                    className="avatar-img rounded-circle company"
                                                                    src="assets/img/companies/company-01.svg"
                                                                    alt="Company Image"
                                                                />
                                                            </a>
                                                            <a href="#">Hermann Groups</a>
                                                        </h2>
                                                    </td>
                                                    <td>Advanced (Monthly)</td>
                                                    <td>30 Days</td>
                                                    <td>Paypal</td>
                                                    <td>$19.99</td>
                                                    <td>15 Jan 2024</td>
                                                    <td>15 Feb 2024</td>
                                                    <td>
                                                        <span className="badge bg-success-light d-inline-flex align-items-center">
                                                            <i className="fe fe-check me-1" />
                                                            Paid
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <a
                                                            href="invoice-subscription.html"
                                                            className="invoice-detail"
                                                        >
                                                            <i className="fe fe-file-text" />
                                                        </a>
                                                    </td>
                                                    <td className="d-flex align-items-center">
                                                        <div className="dropdown dropdown-action">
                                                            <a
                                                                href="#"
                                                                className=" btn-action-icon "
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="dropdown-ul">
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="javascript:void(0);"
                                                                        >
                                                                            <i className="fe fe-download me-2" />
                                                                            Download
                                                                        </a>
                                                                    </li>
                                                                    <li className="delete-alt">
                                                                        <div>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="javascript:void(0);"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#delete_modal"
                                                                            >
                                                                                <i className="fe fe-trash-2 me-2" />
                                                                                Delete
                                                                            </a>
                                                                        </div>
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

        </div>
    )
}

export default Sub
