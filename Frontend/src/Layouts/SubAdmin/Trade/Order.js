import React, { useState, useEffect } from "react";
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast'
import ExportToExcel from '../../../Utils/ExportCSV'





function GroupStrategy() {




    return (

        <>
     
                <div className="content container-fluid">

                    {/* PAGE HEADER */}
                    <div className="page-header">
                        <div className="content-page-header">
                            <h5>All Trades</h5>
                            <div className="page-content">
                                <div className="list-btn">
                                    <ul className="filter-list">

                                        <li className="mt-3">
                                            <div className="status-toggle pe-5" style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{ marginRight: '10px', fontSize: '16px', fontWeight: 'bold', color: getLoginStatus ? "green" : "red" }}>TRADING STATUS</span>
                                                <input
                                                    id="1"
                                                    className="check"
                                                    type="checkbox"
                                                    onChange={(e) => LogIn_WIth_Api(e.target.checked,
                                                        profileData.data[0].broker,
                                                        profileData.data[0].TradingStatus,
                                                        profileData.data[0])}
                                                    checked={getLoginStatus}
                                                    style={{ marginRight: '5px' }}
                                                />
                                                <label htmlFor="1" className="checktoggle checkbox-bg"></label>
                                            </div>
                                        </li>


                                        <li className="mt-3">
                                            <p
                                                className="btn-filters"

                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title="Refresh"
                                            // onClick={RefreshHandle}
                                            >
                                                <span>
                                                    <i className="fe fe-refresh-ccw" />
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <div className="input-group input-block">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    aria-label="Search"
                                                    aria-describedby="search-addon"
                                                    onChange={(e) => SetInputSearch(e.target.value || '')}
                                                    value={inputSearch}

                                                />

                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className="dropdown dropdown-action"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="bottom"
                                                title="Download"
                                            >
                                                <li>
                                                    <div className="card-body">
                                                        <ExportToExcel
                                                            className="btn btn-primary "
                                                            apiData={ForGetCSV}
                                                            fileName={'All Strategy'} />
                                                    </div>
                                                </li>
                                            </div>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div className="card-body p-0 mr-2" style={{ maxHeight: "100%", overflowY: "auto" }}>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Stock Symbol</th>
                                        <th>Company Name</th>
                                        <th>Quantity</th>
                                        <th>Average Price</th>
                                        <th>Total Investment</th>
                                        <th>Current Price</th>
                                        <th>Market Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* JavaScript loop */}
                                    {[...Array(50)].map((_, index) => (
                                        <tr key={index}>
                                            <td>AAPL</td>
                                            <td>Apple Inc.</td>
                                            <td>100</td>
                                            <td>$120.50</td>
                                            <td>$12,050.00</td>
                                            <td>$130.00</td>
                                            <td>$13,000.00</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>



                    < ToastButton />
                </div>
           

        </>
    )
}

export default GroupStrategy
