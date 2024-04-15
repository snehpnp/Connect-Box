import React, { useState, useEffect } from "react";
import { GetAll_Group_Servics, Get_All_Catagory, GET_ALL_SERVICES_NAMES, Delete_GroupServices } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";
import { useDispatch } from "react-redux";
import FullDataTable from '../../../Components/ExtraComponents/Tables/FullDataTable1';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../Utils/Loader';
import { Link, useNavigate } from "react-router-dom";
import { GanttChartSquare } from 'lucide-react';
import toast from "react-hot-toast";
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast'
import ExportToExcel from '../../../Utils/ExportCSV'
import Modal from '../../../Components/Dashboard/Models/Model'







function GroupStrategy() {


    const dispatch = useDispatch();
 

    const [ForGetCSV, setForGetCSV] = useState([])
    const [inputSearch, SetInputSearch] = useState('');
    const [refresh, setrefresh] = useState(false)   

    const [getLoginStatus, setLoginStatus] = useState(false)

    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id


   












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
                                                onChange={() => setLoginStatus(prevState => !prevState)}
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



            </div>
            < ToastButton />
        </>
    )
}

export default GroupStrategy
