import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ToastButton from '../../../Components/ExtraComponents/Alert_Toast'
import ExportToExcel from '../../../Utils/ExportCSV'

import { Userinfo , Trading_Off_Btn } from "../../../ReduxStore/Slice/Comman/Userinfo";


import Loader from "../../../Utils/Loader";
import { loginWithApi } from "../../../Utils/log_with_api";




function GroupStrategy() {


    const dispatch = useDispatch();


    const [ForGetCSV, setForGetCSV] = useState([])
    const [inputSearch, SetInputSearch] = useState('');
    const [refresh, setrefresh] = useState(false)

    const [getLoginStatus, setLoginStatus] = useState({
        loading: false,
        data: [],
    })

    const [profileData, setProfileData] = useState([]);

    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id







    const fetchData = async () => {
        try {
            let data = { "id": user_id }

            await dispatch(Userinfo(data))
                .unwrap()
                .then(async (response) => {
                    if (response.status) {
                        setProfileData({
                            loading: true,
                            data: response.data
                        })
                        if (response.data[0].TradingStatus == 'on') {
                            setLoginStatus(true)
                        } else {
                            setLoginStatus(false)
                        }
                    } else {
                        toast.error(response.msg);
                    }

                })
                .catch((error) => {
                    console.log("Error", error);
                });



        } catch (error) {

        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleTradingOff = async (id) => {
        let data = { id: id };

        await dispatch(Trading_Off_Btn(data)).unwrap()
            .then((response) => {
                if (response.status) {
                    toast.success("Trading off successfully");
                    setrefresh(!refresh);
                }
                else {
                    toast.error("Trading Off Error")
                }
            }).catch((error) => {
                console.log("Trading Off Error", error);
            })

    }
    const LogIn_WIth_Api = (check, brokerid, tradingstatus, UserDetails) => {

        if (check) {
            console.log("Trading On")
            loginWithApi(brokerid, UserDetails);

        } else {
            console.log("Trading Off")
            handleTradingOff(user_id);


        }


    }



    return (

        <>
            {profileData.loading ? (
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
                                                    defaultChecked={getLoginStatus}
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
                            <table className="table ">
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
            ) : <Loader />}

        </>
    )
}

export default GroupStrategy
