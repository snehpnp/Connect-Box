import React from 'react';

const Sub = () => {
    // Column aur data ko store karne ke liye arrays
    const columns = [
        { name: '#', key: 'id' },
        { name: 'Subscriber', key: 'subscriber' },
        { name: 'Plan', key: 'plan' },
        { name: 'Billing Cycle', key: 'billingCycle' },
        { name: 'Payment Gateway', key: 'paymentGateway' },
        { name: 'Amount', key: 'amount' },
        { name: 'Registered On', key: 'registeredOn' },
        { name: 'Expiring On', key: 'expiringOn' },
        { name: 'Status', key: 'status' },
        { name: 'Invoice', key: 'invoice' },
        { name: 'Action', key: 'action', noSort: true }
    ];

    const data = [
        {
            id: 1,
            subscriber: 'Hermann Groups',
            plan: 'Advanced (Monthly)',
            billingCycle: '30 Days',
            paymentGateway: 'Paypal',
            amount: '$19.99',
            registeredOn: '15 Jan 2024',
            expiringOn: '15 Feb 2024',
            status: 'Paid', // Changed to text
            invoice: <a href="invoice-subscription.html" className="invoice-detail"><i className="fe fe-file-text" /></a> // Changed to static icon
        },
        {
            id: 1,
            subscriber: 'Hermann Groups',
            plan: 'Advanced (Monthly)',
            billingCycle: '30 Days',
            paymentGateway: 'Paypal',
            amount: '$19.99',
            registeredOn: '15 Jan 2024',
            expiringOn: '15 Feb 2024',
            status: 'Paid', // Changed to text
            invoice: <a href="invoice-subscription.html" className="invoice-detail"><i className="fe fe-file-text" /></a> // Changed to static icon
        }, {
            id: 1,
            subscriber: 'Hermann Groups',
            plan: 'Advanced (Monthly)',
            billingCycle: '30 Days',
            paymentGateway: 'Paypal',
            amount: '$19.99',
            registeredOn: '15 Jan 2024',
            expiringOn: '15 Feb 2024',
            status: 'Overdue', // Changed to text
            invoice: <a href="invoice-subscription.html" className="invoice-detail"><i className="fe fe-file-text" /></a> // Changed to static icon
        },
        {
            id: 1,
            subscriber: 'Hermann Groups',
            plan: 'Advanced (Monthly)',
            billingCycle: '30 Days',
            paymentGateway: 'Paypal',
            amount: '$19.99',
            registeredOn: '15 Jan 2024',
            expiringOn: '15 Feb 2024',
            status: 'Paid', // Changed to text
            invoice: <a href="invoice-subscription.html" className="invoice-detail"><i className="fe fe-file-text" /></a> // Changed to static icon
        },
    ];

    // Static Action button
    const actionButton = (
        <div className="dropdown dropdown-action">
            <a href="#" className=" btn-action-icon " data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-ellipsis-v" />
            </a>
            <div className="dropdown-menu dropdown-menu-end">
                <ul className="dropdown-ul">
                    <li>
                        <a className="dropdown-item" href="javascript:void(0);">
                            <i className="fe fe-download me-2" />
                            Download
                        </a>
                    </li>
                    <li className="delete-alt">
                        <div>
                            <a className="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete_modal">
                                <i className="fe fe-trash-2 me-2" />
                                Delete
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );

const HeaderAndFilter = (
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
)

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

                {/* CARD BOX */}
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


                {/* TABEL */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card-table">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <div className="companies-table">
                                        <table className="table table-center table-hover datatable">
                                            <thead className="thead-light">
                                                <tr>
                                                    {/* Dynamically render columns */}
                                                    {columns.map(column => (
                                                        <th key={column.key} className={column.noSort ? 'no-sort' : ''}>{column.name}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Dynamically render data rows */}
                                                {data.map((row, index) => (
                                                    <tr key={row.id}>
                                                        {columns.map(column => (
                                                            <td key={column.key}>
                                                                {column.key === 'action' ? actionButton :
                                                                    column.key === 'status' ? <span className={`badge ${row[column.key] === 'Paid' ? 'bg-success' : 'bg-danger'} d-inline-flex align-items-center`}>{row[column.key]}</span> :
                                                                        column.key === 'invoice' ? row[column.key] :
                                                                            row[column.key]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
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
    );
};

export default Sub;
