import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullDataTable from "../../../Components/ExtraComponents/Tables/DataTable";

import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { useNavigate } from "react-router-dom";
import { Userinfo, Trading_Off_Btn } from "../../../ReduxStore/Slice/Comman/Userinfo";
import { Trade_history_data } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { loginWithApi } from "../../../Utils/log_with_api";
import { fDateTime } from "../../../Utils/Date_formet";
import { ipAddress } from '../../../Utils/Ipaddress';
import Swal from 'sweetalert2';
import $ from "jquery";
import { fDateTimeSuffix, GetMarketOpenDays, convert_string_to_month } from "../../../Utils/Date_formet";
import { CreateSocketSession, ConnctSocket, GetAccessToken } from "../../../Utils/Alice_Socket";
import { ShowColor1 } from "../../../Utils/ShowTradeColor";
import { Eye, CandlestickChart, Pencil } from "lucide-react";

import DetailsView from "./DetailsView";

import {
    getAllServices,
    getCatogries,
    getexpirymanualtrade,
    getAllStrikePriceApi,
    getStrategyData,
    gettokenbysocket,
    GetBrokerLiveDatas,
    AddDataAboveBelowRange,
    GetDataAboveBelowRange,
    DeleteDataMakeCall,
    UpdateDataMakeCall

} from "../../../ReduxStore/Slice/Comman/Makecall/make";


export default function AllEmployees() {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    const [showModal, setshowModal] = useState(false);

    const [SelectService, setSelectService] = useState("null");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
const Role = JSON.parse(localStorage.getItem("user_details")).Role
const token = JSON.parse(localStorage.getItem('user_details')).token

    const [rowData, setRowData] = useState({ loading: true, data: [], });

    const [profileData, setProfileData] = useState([]);

    const [refresh, setrefresh] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [ForGetCSV, setForGetCSV] = useState([]);
    const [ip, setIp] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [StrategyClientStatus, setStrategyClientStatus] = useState("null");
    const [tradeHistoryData, setTradeHistoryData] = useState({ loading: false, data: [] });
    const [SocketState, setSocketState] = useState("null");

    const [tableData, setTableData] = useState({
        loading: false,
        data: [],
    });


    const [livePriceDataDetails, setLivePriceDataDetails] = useState('');
    const [userIdSocketRun, setUserIdSocketRun] = useState("none");



    useEffect(() => {
        GetBrokerLiveData(userIdSocketRun)
    }, [userIdSocketRun]);

    const GetBrokerLiveData = async (userIdSocketRun) => {

        //alert(userIdSocketRun)
        await dispatch(GetBrokerLiveDatas(

            {
                req:
                {
                    id: user_id,
                    exist_user: userIdSocketRun,
                    exist_user_details: livePriceDataDetails
                },

                token: token
            }
        ))
            .unwrap()
            .then(async (response) => {
                if (response.status) {
                    // console.log("Data --- ", response.data)
                    setLivePriceDataDetails(response.data)
                }
            });
    };




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
    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };



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





    // LOGOUT TRADING 
    const handleTradingOff = async (id) => {

        let data = { id: id, system_ip: ip };

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

    // LOGIN DEMAT WITH API
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
            dataField: "index",
            text: "S.No.",
            // hidden: true,
            formatter: (cell, row, rowIndex) => rowIndex + 1,
        },
        {
            dataField: "createdAt",
            text: "Signals time",
            formatter: (cell) => <>{fDateTimeSuffix(cell)}</>,
        },
 

        {
            dataField: "trade_symbol",
            text: "Symbol",
        },
        {
            dataField: "strategy",
            text: "Strategy",
        },
        {
            dataField: "entry_qty",
            text: "Entry Qty",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? parseInt(cell) : "-"}</span>
            ),
        },
        {
            dataField: "exit_qty",
            text: "Exit Qty",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? parseInt(cell) : "-"}</span>
            ),
        },
        {
            dataField: "entry_price",
            text: "Entry Price",
            formatter: (cell, row, rowIndex) => (
                <div>{cell !== "" ? parseFloat(cell).toFixed(2) : "-"}</div>
            ),
        },
        {
            dataField: "exit_price",
            text: "Exit Price",
            formatter: (cell, row, rowIndex) => (
                <div>{cell !== "" ? parseFloat(cell).toFixed(2) : "-"}</div>
            ),
        },

        {
            dataField: "Action",
            text: "Realised",
            formatter: (cell, row, rowIndex) => {
                return (
                    <div>
                        <span className={`fw-bold show_rpl_${row.token}_${row._id}`}></span>
                        <span className={`d-none entry_qty_${row.token}_${row._id}`}>
                            {row.entry_qty_percent}
                        </span>
                        <span className={`d-none exit_qty_${row.token}_${row._id}`}>
                            {row.exit_qty_percent}
                        </span>
                        <span className={`d-none exit_price_${row.token}_${row._id}`}>
                            {row.exit_price}
                        </span>
                        <span className={`d-none entry_price_${row.token}_${row._id}`}>
                            {row.entry_price}
                        </span>
                        <span className={`d-none entry_type_${row.token}_${row._id}`}>
                            {row.entry_type}
                        </span>
                        <span className={`d-none exit_type_${row.token}_${row._id}`}>
                            {row.exit_type}
                        </span>
                        <span className={`d-none strategy_${row.token}_${row._id}`}>
                            {row.strategy}
                        </span>
                        <span className={`d-none _id_${row.token}_${row._id}`}>
                            {row._id}
                        </span>
                    </div>
                );
            },
        },


        {
            dataField: "UPL",
            text: "Un-Realised",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span className={`fw-bold UPL_${row.token}_${row._id}`}></span>


                </div>
            ),
        },

        {
            dataField: "TPL",
            text: "Total",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span className={`fw-bold  TPL_${row.token}_${row._id}`}></span>
                </div>
            ),
        },

        {
            dataField: "",
            text: "Entry Status",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span>{row.result[0].exit_status === "above" ? "ABOVE" : row.result[0].exit_status === "below" ? "BELOW" : row.result[0].exit_status == "range" ? "RANGE" : " - "}</span>


                </div>
            ),
        },
        {
            dataField: "exit_status",
            text: "Exit Status",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span>{row.exit_status}</span>


                </div>
            ),
        },

        {
            dataField: "",
            text: "Details View",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <Eye
                        className="mx-2"
                        onClick={() => {
                            setRowData(row);
                            setshowModal(true);
                        }}
                    />
                </div>
            ),
        },
    ];


    const ResetDate = (e) => {
        e.preventDefault();
        setFromDate("");
        setStrategyClientStatus("");
        setSelectService("");
        setToDate("");

    };

    const RefreshHandle = () => {
        setrefresh(!refresh);
        userDataRes()
        setSearchInput("");
        

    };
  


    const getActualDateFormate = (date) => {
        const dateParts = date.split("-");
        const formattedDate = `${dateParts[0]}/${parseInt(
            dateParts[1],
            10
        )}/${parseInt(dateParts[2], 10)}`;
        return formattedDate;
    };


    const userDataRes = async () => {
        let abc = new Date();
        let month = abc.getMonth() + 1;
        let date = abc.getDate();
        let year = abc.getFullYear();
        let full = `${year}/${month}/${date}`;

        let startDate = getActualDateFormate(fromDate);
        let endDate = getActualDateFormate(toDate);
        const subadminId = userDetails.user_id
        await dispatch(Trade_history_data({ Role:Role,subadminId: userDetails.user_id, startDate: !fromDate ? full : startDate, endDate: !toDate ? fromDate ? "" : full : endDate, service: SelectService, strategy: StrategyClientStatus, }))
            .unwrap()
            .then(async (response) => {
                if (response.status) {
                    setTableData({ loading: true, data: response.data });
                    setTradeHistoryData({ loading: true, data: response.data });

                } else {
                    setTradeHistoryData({ loading: true, data: [] });

                }
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        userDataRes(refresh, fromDate, toDate, SelectService, StrategyClientStatus)
    }, [])








    var CreatechannelList = "";
    let total = 0;
    tradeHistoryData.data &&
        tradeHistoryData.data?.map((item) => {
            CreatechannelList += `${item.exchange}|${item.token}#`;
      
            if (parseInt(item.exit_qty) == parseInt(item.entry_qty) && item.entry_price != '' && item.exit_price != "NaN" ) {
                total += (parseFloat(item.exit_price || 0) - parseFloat(item.entry_price)) * parseInt(item.exit_qty);
            }
        });


    //  SHOW lIVE PRICE
    const ShowLivePrice = async () => {
        let type = { loginType: "API" };
        let channelList = CreatechannelList;

            if (livePriceDataDetails && livePriceDataDetails.demate_user_id !== undefined && livePriceDataDetails.access_token !== undefined && livePriceDataDetails.trading_status == "on") {


                const res = await CreateSocketSession(type, livePriceDataDetails.demate_user_id, livePriceDataDetails.access_token);

                if (res.status === 200) {
                    setSocketState("Ok");
                }
                if (res.status === 401 || res.status === '401') {
                    setSocketState("Unauthorized");

                    tradeHistoryData.data && tradeHistoryData.data.forEach((row, i) => {
                        const previousRow = i > 0 ? tradeHistoryData.data[i - 1] : null;
                        calcultateRPL(row, null, previousRow);
                    });
                }
                else {
                    if (res.data.stat) {
                        const handleResponse = async (response) => {


                            $('.BP1_Put_Price_' + response.tk).html();
                            $('.SP1_Call_Price_' + response.tk).html();

                            // UPL_
                            $(".LivePrice_" + response.tk).html(response.lp);
                            $(".ClosePrice_" + response.tk).html(response.c);


                            var live_price = response.lp === undefined ? "" : response.lp;

                            //  if entry qty and exist qty both exist
                            tradeHistoryData.data && tradeHistoryData.data.forEach((row, i) => {
                                let get_ids = '_id_' + response.tk + '_' + row._id
                                let get_id_token = $('.' + get_ids).html();

                                const get_entry_qty = $(".entry_qty_" + response.tk + '_' + row._id).html();
                                const get_exit_qty = $(".exit_qty_" + response.tk + '_' + row._id).html();
                                const get_exit_price = $(".exit_price_" + response.tk + '_' + row._id).html();
                                const get_entry_price = $(".entry_price_" + response.tk + '_' + row._id).html();
                                const get_entry_type = $(".entry_type_" + response.tk + '_' + row._id).html();
                                const get_exit_type = $(".exit_type_" + response.tk + '_' + row._id).html();
                                const get_Strategy = $(".strategy_" + response.tk + '_' + row._id).html();

                                if ((get_entry_type === "LE" && get_exit_type === "LX") || (get_entry_type === "SE" && get_exit_type === "SX")) {
                                    if (get_entry_qty !== "" && get_exit_qty !== "") {

                                        if (parseInt(get_entry_qty) >= parseInt(get_exit_qty)) {
                                            let rpl = (parseFloat(get_exit_price) - parseFloat(get_entry_price)) * parseInt(get_exit_qty);
                                            let upl = parseInt(get_exit_qty) - parseInt(get_entry_qty);
                                            let finalyupl = (parseFloat(get_entry_price) - parseFloat(live_price)) * upl;

                                            if ((isNaN(finalyupl) || isNaN(rpl))) {
                                                return "-";
                                            } else {
                                                $(".show_rpl_" + response.tk + "_" + get_id_token).html(rpl.toFixed(2));
                                                $(".UPL_" + response.tk + "_" + get_id_token).html(finalyupl.toFixed(2));
                                                $(".TPL_" + response.tk + "_" + get_id_token).html((finalyupl + rpl).toFixed(2));

                                                ShowColor1(".show_rpl_" + response.tk + "_" + get_id_token, rpl.toFixed(2), response.tk, get_id_token);
                                                ShowColor1(".UPL_" + response.tk + "_" + get_id_token, finalyupl.toFixed(2), response.tk, get_id_token);
                                                ShowColor1(".TPL_" + response.tk + "_" + get_id_token, (finalyupl + rpl).toFixed(2), response.tk, get_id_token);
                                            }
                                        }
                                    }
                                }
                                //  if Only entry qty Exist
                                else if ((get_entry_type === "LE" && get_exit_type === "") || (get_entry_type === "SE" && get_exit_type === "")) {
                                    let abc = ((parseFloat(live_price) - parseFloat(get_entry_price)) * parseInt(get_entry_qty)).toFixed();
                                    if (isNaN(abc)) {
                                        return "-";
                                    } else {
                                        $(".show_rpl_" + response.tk + "_" + get_id_token).html("-");
                                        $(".UPL_" + response.tk + "_" + get_id_token).html(abc);
                                        $(".TPL_" + response.tk + "_" + get_id_token).html(abc);
                                        ShowColor1(".show_rpl_" + response.tk + "_" + get_id_token, "-", response.tk, get_id_token);
                                        ShowColor1(".UPL_" + response.tk + "_" + get_id_token, abc, response.tk, get_id_token);
                                        ShowColor1(".TPL_" + response.tk + "_" + get_id_token, abc, response.tk, get_id_token);
                                    }
                                }

                                //  if Only Exist qty Exist
                                else if (
                                    (get_entry_type === "" && get_exit_type === "LX") ||
                                    (get_entry_type === "" && get_exit_type === "SX")
                                ) {
                                } else {
                                }
                            });


                            // }
                        };
                        await ConnctSocket(handleResponse, channelList, livePriceDataDetails.demate_user_id, livePriceDataDetails.access_token).then((res) => { });
                    } else {
                        // $(".UPL_").html("-");
                        // $(".show_rpl_").html("-");
                        // $(".TPL_").html("-");
                    }
                }
            }
        





    };


    const calcultateRPL = (row, livePrice, pre_row) => {

        let get_ids = '_id_' + row.token + '_' + row._id
        let get_id_token = $('.' + get_ids).html();


        if (row.entry_type !== '' && row.exit_type !== '') {
            if ((row.entry_type === "LE" || row.entry_type === "SE")) {
                const entryQty = parseInt(row.entry_qty_percent);
                const exitQty = parseInt(row.exit_qty_percent);
                const entryPrice = parseFloat(row.entry_price);
                const exitPrice = parseFloat(row.exit_price);
                const rpl = (exitPrice - entryPrice) * Math.min(entryQty, exitQty);

                $(".show_rpl_" + row.token + "_" + get_id_token).html(rpl.toFixed(2));
                $(".UPL_" + row.token + "_" + get_id_token).html("-");
                $(".TPL_" + row.token + "_" + get_id_token).html(rpl.toFixed(2));

                ShowColor1(".show_rpl_" + row.token + "_" + get_id_token, rpl.toFixed(2), row.token, get_id_token);
                ShowColor1(".UPL_" + row.token + "_" + get_id_token, "-", row.token, get_id_token);
                ShowColor1(".TPL_" + row.token + "_" + get_id_token, rpl.toFixed(2), row.token, get_id_token);
            }

        }
        else if (row.entry_type && row.exit_type === "") {
            $(".show_rpl_" + row.token + "_" + row._id).html("-");
            $(".UPL_" + row.token + "_" + row._id).html("-");
            $(".TPL_" + row.token + "_" + row._id).html("-");
        }
        if (row.entry_type === "" && row.exit_type !== '') {
            $(".show_rpl_" + row.token + "_" + row._id).html("-");
            $(".UPL_" + row.token + "_" + row._id).html("-");
            $(".TPL_" + row.token + "_" + row._id).html("-");
        }
    };


    useEffect(() => {
        ShowLivePrice();
    }, [tradeHistoryData.data, SocketState,livePriceDataDetails]);



    // FIND IP ADDRESS
    useEffect(() => {
        const fetchIP = async () => {
            try {
                const ip = await ipAddress();
                setIp(ip);
            } catch (error) {
                console.error('Failed to fetch IP address:', error);
            }
        };

        fetchIP();

        // Clean up function
        return () => {

        };
    }, []);

    return (
        <>
            {tradeHistoryData.loading ? (
                <>
                    <div className="content container-fluid" data-aos="fade-left">

                        <div className="card">
                            <div className="card-header">
                                <div className="row align-center">
                                    <div className="col">
                                        <h5 className="card-title mb-0"><i className="pe-2 far fa-clock"></i>Trade History</h5>
                                    </div>
                                    <div className="col-auto">
                                        <div className="list-btn">
                                            <ul className="filter-list mb-0">

                                               


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

                                    <div className="input-block col-lg-2 mt-3 mb-3">
                                        <label for="select" class="form-label">
                                            Strategy
                                        </label>
                                        <select
                                            class="default-select wide form-control"
                                            aria-label="Default select example"
                                            id="select"
                                        // onChange={(e) => setStrategyClientStatus(e.target.value)}
                                        // value={StrategyClientStatus}
                                        >
                                            <option value="null" selected >All</option>
                                            {/* {getAllStrategyName.data &&
                                                getAllStrategyName.data.map((item) => {
                                                    return (
                                                        <option value={item.strategy_name}>
                                                            {item.strategy_name}
                                                        </option>
                                                    );
                                                })} */}
                                        </select>
                                    </div>



                                </div>
                                


                                <div className="card-body table-responsive">

                                    {tradeHistoryData.data.length > 0 ?

                                        total >= 0 ?
                                            <h4 >Total Realised P/L : <span style={{ color: "green" }}> {total.toFixed(2)}</span> </h4> :
                                            <h4 >Total Realised P/L : <span style={{ color: "red" }}> {total.toFixed(2)}</span> </h4> : ""

                                    }
                                    <FullDataTable
                                        TableColumns={columns}
                                        tableData={tradeHistoryData.data}
                                        pagination1={true}

                                    />
                                    <DetailsView
                                        showModal={showModal}
                                        setshowModal={() => setshowModal(false)}
                                        tradeHistoryData={rowData}
                                    />
                                </div>


                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <Loader />
            )}
        </>
    );
}
