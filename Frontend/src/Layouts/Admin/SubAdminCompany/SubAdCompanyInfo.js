import React, { useState,useEffect } from "react";

import { fetchSubadminCompanyInfo } from "../../../ReduxStore/Slice/Admin/SubAdminCompanyInfo";
import { useDispatch } from "react-redux";


const Sub = () => {
    const dispatch = useDispatch();
    
    const [getCompnayData, SetCompnayData] = useState([]);


    const columns = [
        { name: '#', key: 'id' },
        { name: 'Subadmin Name', key: 'panel_name' },
        { name: 'Company Name', key: 'panel_name' },
        { name: 'Razor Pay Key', key: 'razorpay_key' },
        { name: 'Email', key: 'email' },
        { name: 'CC Mail', key: 'cc_mail' },
        { name: 'BCC Mail', key: 'bcc_mail' },
        { name: 'Change', key: 'change' },
        { name: 'Created Date', key: 'createdAt' },
        { name: 'Status', key: 'status' }
    ];

    const data = [
        {
            id: 1,
            CompanyName: 'Hermann Groups',
            RazorPayKey: 'Advanced (Monthly)',
            Email: '30 Days',
            CCMail: 'Paypal',
            BccMail: '$19.99',
            createdate: '15 Feb 2024',
            status: 'Active', // Changed to text
            change: <a href="#" data-bs-toggle="modal" data-bs-target="#change_pane"><span class="badge bg-purple">Change</span></a>,

        },
        {
            id: 1,
            CompanyName: 'Hermann Groups',
            RazorPayKey: 'Advanced (Monthly)',
            Email: '30 Days',
            CCMail: 'Paypal',
            BccMail: '$19.99',
            createdate: '15 Feb 2024',
            status: 'Active',
            change: <a href="#" data-bs-toggle="modal" data-bs-target="#change_pane"><span class="badge bg-purple">Change</span></a>,


        }, {
            id: 1,
            CompanyName: 'Hermann Groups',
            RazorPayKey: 'Advanced (Monthly)',
            Email: '30 Days',
            CCMail: 'Paypal',
            BccMail: '$19.99',
            createdate: '15 Feb 2024',
            status: 'Inactive',
            change: <a href="#" data-bs-toggle="modal" data-bs-target="#change_pane"><span class="badge bg-purple">Change</span></a>,


        },
        {
            id: 1,
            CompanyName: 'Hermann Groups',
            RazorPayKey: 'Advanced (Monthly)',
            Email: '30 Days',
            CCMail: 'Paypal',
            BccMail: '$19.99',
            createdate: '15 Feb 2024',
            status: 'Active',
            change: <a href="#" data-bs-toggle="modal" data-bs-target="#change_pane"><span class="badge bg-purple">Change</span></a>,


        },
    ];



    const GetCompnayData = async () => {


        await dispatch(fetchSubadminCompanyInfo())
          .unwrap()
          .then(async (response) => {
            console.log("response", response.data)
            if (response.status) {
                SetCompnayData( response.data)
              } 
       
    
          })
          .catch((error) => {
            console.log("Error", error);
          });
      };
    
      useEffect(() => {
        GetCompnayData()
      }, [])



    return (
        <div>
            <div className="content container-fluid">

                {/* PAGE HEADER */}
                <div className="page-header">
                    <div className="content-page-header">
                        <h5>Company List</h5>
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
                                                {getCompnayData && getCompnayData.map((row, index) => (
                                                    <tr key={row.id}>
                                                        {columns.map(column => (
                                                            <td key={column.key}>
                                                                {column.key === 'action' ? 'actionButton' :
                                                                    column.key === 'status' ? (
                                                                        <span className={`badge ${row[column.key] === 'Active' ? 'bg-success-light' : 'bg-danger-light'} d-inline-flex align-items-center`}>
                                                                            <i className={`${row[column.key] === 'Active' ? 'fe fe-check me-1' : 'fe fe-x me-1'}`} /> {row[column.key]}
                                                                        </span>
                                                                    ) :
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
