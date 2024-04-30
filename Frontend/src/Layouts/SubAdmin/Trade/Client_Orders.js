import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { useNavigate } from "react-router-dom";
import { Userinfo, Trading_Off_Btn } from "../../../ReduxStore/Slice/Comman/Userinfo";
import { Orders_Details } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { loginWithApi } from "../../../Utils/log_with_api";
import { fDateTime } from "../../../Utils/Date_formet";



export default function AllEmployees() {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [refresh, setrefresh] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [ForGetCSV, setForGetCSV] = useState([]);


    const [tableData, setTableData] = useState({
        loading: false,
        data: [],
    });
    const label = { inputProps: { "aria-label": "Switch demo" } };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
        },
        card: {
            width: "auto",
        },
        boldHeader: {
            fontWeight: "bold",
        },
        headerButton: {
            marginRight: 8,
        },
    };



    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id

    const [profileData, setProfileData] = useState([]);

    const [inputSearch, SetInputSearch] = useState('');
    const [getLoginStatus, setLoginStatus] = useState({
        loading: false,
        data: [],
    })


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


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {" "}
                    <b>{params.value + 1}</b>
                </div>
            ),
        },
        {
            field: "createdAt",
            headerName: "Signal Time",
            width: 260,
            headerClassName: styles.boldHeader,
            renderCell: (params) => (
                <div>
                    {" "}
                    <b>{fDateTime(params.value)}</b>
                </div>
            ),
        },
        {
            field: "type",
            headerName: "Type",
            width: 140,
            headerClassName: styles.boldHeader,

        },

        {
            field: "trade_symbol",
            headerName: "Trade Symbol",
            width: 160,
            headerClassName: styles.boldHeader,

        },
        {
            field: "price",
            headerName: "Price ",
            width: 160,
            headerClassName: styles.boldHeader,

        },

        {
            field: "strategy",
            headerName: "strategy ",
            width: 160,
            headerClassName: styles.boldHeader,

        },
        {
            field: "qty_percent",
            headerName: "qty_percent ",
            width: 160,
            headerClassName: styles.boldHeader,

        },
        {
            field: "TradeType",
            headerName: "Trade Type ",
            width: 160,
            headerClassName: styles.boldHeader,

        },

    ];


    const RefreshHandle = () => {
        setrefresh(!refresh);
        setSearchInput("");
    };




    const userDataRes = async () => {
        const subadminId = userDetails.user_id
        await dispatch(Orders_Details({ subadminId }))
            .unwrap()
            .then(async (response) => {
                if (response.status) {
                    setTableData({ loading: true, data: response.data });
                } else {
                    toast.error(response.msg);
                }
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        userDataRes()
    }, [])



    return (
        <>
            {tableData.loading ? (
                <>
                    <div className="content container-fluid" data-aos="fade-left">
                        <div className="card">
                            <div className="card-header">
                                <div className="row align-center">
                                    <div className="col">
                                        <h5 className="card-title mb-0"><i className="pe-2 far fa-clock"></i>Client Orders</h5>
                                    </div>
                                    <div className="col-auto">
                                        <div className="list-btn">
                                            <ul className="filter-list mb-0">

                                                <li className="toggle-li">
                                                    <div className="status-toggle pe-2" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span className={getLoginStatus ? 'bg-success-light px-2' : 'px-2 bg-danger-light'} >Trading Status</span>
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


                                                <li className="">
                                                    <p
                                                        className=" mb-0 btn-filters"

                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        title="Refresh"
                                                        onClick={RefreshHandle}
                                                    >
                                                        <span>
                                                            <i className="fe fe-refresh-ccw" />
                                                        </span>
                                                    </p>
                                                </li>
                                                <li className='serach-li'>
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

                                                    <ExportToExcel
                                                        className="btn btn-primary "
                                                        apiData={ForGetCSV}
                                                        fileName={'All Strategy'} />

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row ">
                                    <div className="input-block col-lg-2 mt-3 mb-3">
                                        <label>From Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Search..."
                                            aria-label="Search"
                                            aria-describedby="search-addon"
                                            onChange={(e) => SetInputSearch(e.target.value || '')}
                                            value={inputSearch}
                                        />
                                    </div>
                                    <div className="input-block col-lg-2 mt-3 mb-3">
                                        <label>To Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Search..."
                                            aria-label="Search"
                                            aria-describedby="search-addon"
                                            onChange={(e) => SetInputSearch(e.target.value || '')}
                                            value={inputSearch}
                                        />
                                    </div>
                                </div>



                                <FullDataTable
                                    styles={styles}
                                    label={label}
                                    columns={columns}
                                    rows={tableData.data}
                                />
                            </div>
                        </div>
                    </div>


                    {/* <div className="card-body">
                            <div className="row ">
                                <div className="input-block col-lg-2 ms-4 mt-3 mb-3">
                                    <label>From Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Search..."
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                        onChange={(e) => SetInputSearch(e.target.value || '')}
                                        value={inputSearch}
                                    />
                                </div>
                                <div className="input-block col-lg-2 mt-3 mb-3">
                                    <label>To Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Search..."
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                        onChange={(e) => SetInputSearch(e.target.value || '')}
                                        value={inputSearch}
                                    />
                                </div>
                            </div>
                      


                        <FullDataTable
                            styles={styles}
                            label={label}
                            columns={columns}
                            rows={tableData.data}
                        />
                    </div> */}


                </>
            ) : (
                <Loader />
            )}
        </>
    );
}
