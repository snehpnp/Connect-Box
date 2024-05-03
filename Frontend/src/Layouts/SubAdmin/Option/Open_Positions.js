import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullDataTable from "../../../Components/ExtraComponents/Tables/DataTable";

import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { useNavigate } from "react-router-dom";
import { Userinfo } from "../../../ReduxStore/Slice/Comman/Userinfo";
import { Trade_Details, Update_Signals } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { fDateTimeSuffix, GetMarketOpenDays, convert_string_to_month } from "../../../Utils/Date_formet";
import { CreateSocketSession, ConnctSocket } from "../../../Utils/Alice_Socket";
import { ShowColor1 } from "../../../Utils/ShowTradeColor";
import Swal from 'sweetalert2';
import $ from "jquery";
import Modal from "../../../Components/ExtraComponents/Modal";
import * as Config from "../../../Utils/Config";
import axios from "axios"


export default function AllEmployees() {
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
    const [ButtonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [refresh, setrefresh] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [ForGetCSV, setForGetCSV] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showModal, setshowModal] = useState(false);
    const [CreateSignalRequest, setCreateSignalRequest] = useState([]);
    const [SocketState, setSocketState] = useState("null");
    const [tradeHistoryData, setTradeHistoryData] = useState({ loading: true, data: [] });
    const [tradeHistoryAllData, setTradeHistoryAllData] = useState({ loading: true, data: [] });
    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [getLoginStatus, setLoginStatus] = useState({
        loading: false,
        data: [],
    })
    const [tableData, setTableData] = useState({
        loading: false,
        data: [],
    });





    const columns = [
        {
            dataField: "TradeType",
            text: "Trade Type",
        },
        {
            dataField: "live",
            text: "Live Price bp",
            formatter: (cell, row, rowIndex) => (
                <div>
                    <span className={`LivePrice_${row.token}`}></span>
                    <span className={`SP1_Call_Price_${row.token} d-none`}></span>

                </div>
            ),
        },

        {
            dataField: "type",
            text: "Type",
            formatter: (cell, row, rowIndex) => (
                <span className={``}>{row.entry_type ? row.entry_type : row.exit_type}</span>
            )
        },
        {
            dataField: "trade_symbol",
            text: "Symbol",
        },
        {
            dataField: "entry_qty_percent",
            text: "Entry Qty %",
            formatter: (cell, row, rowIndex) => (
                <span className="text">{cell !== "" ? parseInt(cell) : "-"}</span>
            ),
        },
        {
            dataField: "exit_qty_percent",
            text: "Exit Qty %",
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
            dataField: "exit_time",
            text: "Exit Time",
            formatter: (cell, row, rowIndex) => (
                <div className="col-12"><input type="time"
                    name="exit_time"
                    defaultValue={cell}

                    onChange={(e) => SetStopLostPrice(e, e.target.name, row, row.new_qty_persent, row.trade_symbol)}
                    className="w-100" /></div>
            ),
        },
        {
            dataField: "stop_loss",
            text: "Stop Loss Price ",
            formatter: (cell, row, rowIndex) => (
                <div className="col-12"><input type="number"
                    // placeholder="Enter Price"
                    min="0"
                    name="stop_loss"
                    defaultValue={cell}
                    onChange={(e) => SetStopLostPrice(e, e.target.name, row, row.new_qty_persent, row.trade_symbol)}
                    className="w-75" /></div>

            ),
        },
        {
            dataField: "target",
            text: "Target Price ",
            formatter: (cell, row, rowIndex) => (
                <div><input type="number" className="w-75"
                    // placeholder="Enter Price"
                    name="target"
                    min="0"
                    defaultValue={cell}
                    onChange={(e) => SetStopLostPrice(e, e.target.name, row, row.new_qty_persent, row.trade_symbol)}
                /></div>
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
            dataField: "createdAt",
            text: "Signals time",
            formatter: (cell) => <>{fDateTimeSuffix(cell)}</>,
        },
        {
            dataField: "strategy",
            text: "Strategy",
        },


    ];



    const fetchData = async () => {
        try {
            let data = { "id": user_id };

            // Concurrently fetch userinfo
            const [response] = await Promise.all([
                dispatch(Userinfo(data)).unwrap()
            ]);

            if (response.status) {
                setProfileData({
                    loading: true,
                    data: response.data
                });
                setLoginStatus(response.data[0].TradingStatus === 'on');
            } else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);





    // GET TRADE
    const userDataRes = async () => {

        // const subadminId =user_id
        await dispatch(Trade_Details({ subadminId: user_id }))
            .unwrap()
            .then(async (response) => {
                if (response.status) {

                    if (response.data.length > 0) {
                        const filterData = response.data.filter((item) => {
                            const searchInputMatch =
                                searchInput == '' ||
                                item.type.toLowerCase().includes(searchInput.toLowerCase()) ||
                                item.symbol.toLowerCase().includes(searchInput.toLowerCase()) ||
                                item.price.toLowerCase().includes(searchInput.toLowerCase()) ||
                                item.qty_percent.toLowerCase().includes(searchInput.toLowerCase())

                            return searchInputMatch
                        })

                        setTradeHistoryData({
                            loading: false,
                            data: response.data,
                        });
                        setTradeHistoryAllData({
                            loading: false,
                            data: response.data,
                        });
                    } else {

                        setTradeHistoryData({
                            loading: false,
                            data: [],
                        });
                        setTradeHistoryAllData({
                            loading: false,
                            data: [],
                        });
                    }


                } else {
                    setTradeHistoryData({
                        loading: false,
                        data: response.data,
                    });

                    setTradeHistoryAllData({
                        loading: false,
                        data: response.data,
                    });

                }

            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        userDataRes()
    }, [searchInput, refresh])






    const RefreshHandle = () => {
        setrefresh(!refresh);
        setSearchInput("");
    };


    // UPDATE TARGET AND STOPLOSS PRICE AND TIME
    const SetStopLostPrice = async (event, name, row, qty_persent, symbol) => {

        setTradeHistoryAllData((prev) => {
            return {
                ...prev,
                data: prev.data.map((item) => {
                    if (item._id === row._id) {
                        return {
                            ...item,
                            sl_status: "1",
                            [name]: event.target.value ? event.target.value : "testtt",
                        };
                    }
                    return item;
                })
            };
        });


    }


    // ONE SELECT
    const handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            setSelected([...selected, row._id]);
            setSelected1([...selected1, row]);
        } else {
            setSelected(selected.filter(x => x !== row._id));
            setSelected1(selected1.filter(x => x._id !== row._id));
        }

    }


    // ALL SELECT
    const handleOnSelectAll = (isSelect, rows) => {

        const ids = rows.map(r => r._id);
        if (isSelect) {
            setSelected(ids);
            setSelected1(rows);
        } else {
            setSelected([]);
            setSelected1([]);
        }
    }



    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        selected: selected,
        nonSelectableStyle: { backgroundColor: 'aliceblue' },
        onSelect: handleOnSelect,
        onSelectAll: handleOnSelectAll

    };




    // UPDATE STOPLOSS PRIZE 
    const UpdateStopLoss = async () => {



        const filteredArray2 = tradeHistoryAllData.data.filter(item => selected1.some(obj => obj._id === item._id));


        let MarketOpenToday = GetMarketOpenDays();

        if (MarketOpenToday) {
            if (profileData && profileData.trading_status == "off") {
                alert("Please Trading On First")
            }
            else {
        if (filteredArray2.length === 0) {
            alert("Please Select Atleast One Symbol")
        }
        else {
            // return
            await dispatch(
                Update_Signals({
                    data: filteredArray2,
                    // token: token,
                })

            ).unwrap()
                .then((response) => {
                    if (response.status) {
                        Swal.fire({
                            title: "Update Successfully!",
                            text: response.msg,
                            icon: "success",
                            timer: 800,
                            timerProgressBar: true
                        });
                        setrefresh(!refresh)
                        setSelected1([])
                        setSelected([])
                    }


                });
        }
            }
        } else {
            alert('Market Is Closed Today');
        }

    }



    // ----------------------------- SQUARE OFF ----------------------------
    const SquareOfAll = () => {

        let MarketOpenToday = GetMarketOpenDays();

        if (MarketOpenToday) {
            if (profileData && profileData.data[0].TradingStatus == "off") {
                alert("Please Trading On First")
            } else {
                if (selected1.length > 0) {
                    setshowModal(true)

                    selected1.map((rowdata) => {


                        // const buy = $('.BP1_Put_Price_' + rowdata.token).html();
                        // const sell = $('.SP1_Call_Price_' + rowdata.token).html();

                        const buy = $('.LivePrice_' + rowdata.token).html();
                        const sell = $('.LivePrice_' + rowdata.token).html();

                        const show_expiry = convert_string_to_month(rowdata.expiry)
                        var pre_tag = {
                            client_persnal_key: rowdata.client_persnal_key,
                            TradeType: rowdata.TradeType,
                            option_type: rowdata.option_type,
                            type: rowdata.entry_type === "LE" ? "LX" : rowdata.entry_type === "SE" ? 'SX' : "",
                            trade_symbol: `${rowdata.symbol}${show_expiry}${rowdata.strike}${rowdata.option_type === "CALL" ? "CE" : rowdata.option_type === "PUT" ? "PE" : ""}`,
                            showexpiry: rowdata.expiry,
                            token: rowdata.token,
                            indexcallput: rowdata.option_type === "CALL" ? `${rowdata.option_type}_${rowdata.token}` : `${rowdata.option_type}_${rowdata.token}`,
                            segment: rowdata.segment,
                            strike: rowdata.strike,
                            price: rowdata.entry_type === "LE" ? buy : rowdata.entry_type === "SE" ? sell : "",
                            symbol: rowdata.symbol,
                            expiry: rowdata.expiry,
                            strategy: rowdata.strategy,
                            old_qty_persent: rowdata.entry_qty_percent && rowdata.exit_qty_percent ? (parseInt(rowdata.entry_qty_percent) - parseInt(rowdata.exit_qty_percent)) : rowdata.entry_qty_percent ? rowdata.entry_qty_percent : rowdata.exit_qty_percent,
                            new_qty_persent: rowdata.entry_qty_percent ? rowdata.entry_qty_percent : rowdata.exit_qty_percent
                        };
                        if (rowdata.entry_type === "") {
                            setCreateSignalRequest(oldValues => {
                                return oldValues.filter(item => item.token !== rowdata.token)
                            })
                        }
                        else {
                            setCreateSignalRequest(oldValues => {
                                return oldValues.filter(item => item.indexcallput !== (rowdata.option_type === "CALL" ? `${rowdata.option_type}_${rowdata.token}` : `${rowdata.option_type}_${rowdata.token}`))
                            })
                            setCreateSignalRequest((oldArray) => [pre_tag, ...oldArray]);
                        }
                    })
                } else {
                    alert("Emplty Data")
                }
            }
        }
        else {
            alert('Market Is Closed Today');
        }
    }


    var CreatechannelList = "";
    tradeHistoryData.data &&
        tradeHistoryData.data?.map((item) => {
            CreatechannelList += `${item.exchange}|${item.token}#`;
        });


    // SHOW LIVE PRICE 
    const ShowLivePrice = async () => {
        let type = { loginType: "API" };
        let channelList = CreatechannelList;
        if (profileData && profileData.data) {
            if (profileData && profileData.data[0].demat_userid !== undefined && profileData.data[0].access_token !== undefined && profileData.data[0].TradingStatus == "on") {


                const res = await CreateSocketSession(type, profileData.data[0].demat_userid, profileData.data[0].access_token);

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
                            $('.SP1_Call_Price_' + response.tk).html(response.sp1 ? response.sp1 : response.lp);
                            $('.BP1_Put_Price_' + response.tk).html(response.bp1 ? response.bp1 : response.lp);

                            // UPL_
                            $(".LivePrice_" + response.tk).html(response.lp);
                            $(".ClosePrice_" + response.tk).html(response.c);


                            var live_price = response.lp === undefined ? "" : response.lp;

                            //  if entry qty and exist qty both exist
                            tradeHistoryData.data && tradeHistoryData.data.forEach((row, i) => {
                                // $('.SP1_Call_Price_' + row.token + "_" + row._id).html(response.sp1);
                                // $('.BP1_Put_Price_' + row.token + "_" + row._id).html(response.bp1);

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
                                        $(".show_rpl_" + response.tk + "_" + get_id_token).html(abc);
                                        $(".UPL_" + response.tk + "_" + get_id_token).html("-");
                                        $(".TPL_" + response.tk + "_" + get_id_token).html(abc);
                                        ShowColor1(".show_rpl_" + response.tk + "_" + get_id_token, abc, response.tk, get_id_token);
                                        ShowColor1(".UPL_" + response.tk + "_" + get_id_token, "-", response.tk, get_id_token);
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
                        await ConnctSocket(handleResponse, channelList, profileData.data[0].demat_userid, profileData.data[0].access_token).then((res) => { });
                    } else {
                        // $(".UPL_").html("-");
                        // $(".show_rpl_").html("-");
                        // $(".TPL_").html("-");
                    }
                }
            }
        }

    };


    // CALCULATION 
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



    const handleClickDisabled = () => {
        setDisabled(true);
    }


    // CANCEL REQUEST
    const Cancel_Request = () => {
        setshowModal(false)
        setCreateSignalRequest([])
    }


    // DONE FOR TRADE SQUARE OFF
    const Done_For_Trade = () => {
        handleClickDisabled();

        const currentTimestamp = Math.floor(Date.now() / 1000);

        let abc = CreateSignalRequest && CreateSignalRequest.map((pre_tag) => {



            if (pre_tag.new_qty_persent > pre_tag.old_qty_persent) {
                alert('Error: Value cannot be greater than ' + pre_tag.old_qty_persent);
                return
            }


            const price = $('.LivePrice_' + pre_tag.token).html();

            let req = `DTime:${currentTimestamp}|Symbol:${pre_tag.symbol}|TType:${pre_tag.type}|Tr_Price:131|Price:${price}|Sq_Value:0.00|Sl_Value:0.00|TSL:0.00|Segment:${pre_tag.segment}|Strike:${pre_tag.strike}|OType:${pre_tag.option_type}|Expiry:${pre_tag.expiry}|Strategy:${pre_tag.strategy}|Quntity:${pre_tag.new_qty_persent}|Key:${pre_tag.client_persnal_key}|TradeType:${pre_tag.TradeType}|Demo:demo`


            let config = {
                method: 'post',
                maxBodyLength: Infinity,

                url: Config.broker_backend,
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: req
            };

            axios.request(config)
                .then((response) => {
                    setButtonDisabled(!ButtonDisabled)
                    toast.success("Order Place Sucessfully");
                    setshowModal(false)
                    setrefresh(!refresh)
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error);
                });
        })
    }


    const forCSVdata = () => {
        let csvArr = []
        if (tableData.data.length > 0) {
            tableData.data.map((item) => {
                return csvArr.push({
                    "Signal Time": item.createdAt,
                    "Type": item.type,
                    "trade symbol": item.trade_symbol,
                    "Price": item.price,
                    "strategy": item.strategy,
                    "qty_percent": item.strategy,
                    "Trade Type": item.TradeType
                })
            })

            setForGetCSV(csvArr)
        }

    }


    useEffect(() => {
        forCSVdata()
    }, [tableData.data])

    useEffect(() => {
        ShowLivePrice();
    }, [tradeHistoryData.data, SocketState, profileData.data]);


    return (
        <>
            {!tradeHistoryData.loading ? (
                <>
                    <div className="content container-fluid" data-aos="fade-left">

                        <div className="card">
                            <div className="card-header">
                                <div className="row align-center">
                                    <div className="col">
                                        <h5 className="card-title mb-0"><i className="pe-2 far fa-clock"></i>Open Position</h5>
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
                                                            onChange={(e) => setSearchInput(e.target.value)}
                                                            value={searchInput}

                                                        />

                                                    </div>
                                                </li>
                                                <li>
                                                    <ExportToExcel
                                                        className="btn btn-primary "
                                                        apiData={ForGetCSV}
                                                        fileName={'Order '} />

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body table-responsive">

                                <button className="btn btn-primary mb-4 mx-2 ms-auto"
                                    onClick={(e) => UpdateStopLoss()}
                                >Update Price</button>
                                <button className="btn btn-primary mb-4 ms-auto"
                                    onClick={(e) => SquareOfAll()}
                                >Square Off</button>
                                <FullDataTable
                                    keyField="_id"
                                    TableColumns={columns}
                                    tableData={tradeHistoryData.data}
                                    pagination1={true}
                                    selectRow={selectRow}
                                />



                                {showModal ? (
                                    <>
                                        <Modal
                                            isOpen={showModal}
                                            size="xl"
                                            title="Request Confirmation"
                                            cancel_btn={true}
                                            // hideBtn={false}
                                            btn_name="Confirm"
                                            // disabled_submit={disabled}
                                            // disabled_submit={ButtonDisabled} 
                                            Submit_Function={Done_For_Trade}
                                            Submit_Cancel_Function={Cancel_Request}
                                            handleClose={() => setshowModal(false)}
                                        >
                                            <FullDataTable
                                                TableColumns={[
                                                    {
                                                        dataField: "index",
                                                        text: "SR. No.",
                                                        formatter: (cell, row, rowIndex) => rowIndex + 1,
                                                    },
                                                    {
                                                        dataField: "trade_symbol",
                                                        text: "Symbol",
                                                    },
                                                    {
                                                        dataField: "price",
                                                        text: "Price",
                                                        formatter: (cell, row, rowIndex) => (
                                                            <div>
                                                                {row.type === "BUY" ?
                                                                    <span className={`BP1_Put_Price_${row.token}`}></span>
                                                                    : <span className={`SP1_Call_Price_${row.token}`}></span>
                                                                }
                                                            </div>
                                                        ),

                                                    },
                                                    {
                                                        dataField: "type",
                                                        text: "Trade Type",
                                                    },
                                                    {
                                                        dataField: "old_qty_persent",
                                                        text: "Remaining Qty Persent",
                                                    },

                                                    {
                                                        dataField: "option_type",
                                                        text: "Call Type",
                                                    },
                                                    {
                                                        dataField: "strategy",
                                                        text: "Strategy",
                                                    },
                                                ]}
                                                tableData={CreateSignalRequest && CreateSignalRequest}
                                            />
                                        </Modal>
                                    </>
                                ) : (
                                    ""
                                )}

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