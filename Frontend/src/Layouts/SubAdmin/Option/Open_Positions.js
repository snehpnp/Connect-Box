import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import FullDataTable from "../../../Components/ExtraComponents/Tables/DataTable";

import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { useNavigate } from "react-router-dom";
import { Userinfo } from "../../../ReduxStore/Slice/Comman/Userinfo";
import { Trade_Details, Update_Signals } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { fDateTimeSuffix ,GetMarketOpenDays,convert_string_to_month} from "../../../Utils/Date_formet";
import $ from "jquery";


export default function AllEmployees() {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id

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

    const [getLoginStatus, setLoginStatus] = useState({
        loading: false,
        data: [],
    })
    const [tableData, setTableData] = useState({
        loading: false,
        data: [],
    });

    const [tradeHistoryData, setTradeHistoryData] = useState({ loading: true, data: [] });
    const [tradeHistoryAllData, setTradeHistoryAllData] = useState({ loading: true, data: [] });
    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);

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
                        console.log("row._id inside 2 ", item._id)
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



    const handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            setSelected([...selected, row._id]);
            setSelected1([...selected1, row]);
        } else {
            setSelected(selected.filter(x => x !== row._id));
            setSelected1(selected1.filter(x => x._id !== row._id));
        }

    }

    const handleOnSelectAll = (isSelect, rows) => {

        console.log("rows ", rows)

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
        // selected: selected,
        // nonSelectable: forMCXandCurrencyMarketTrade(),
        nonSelectableStyle: { backgroundColor: 'aliceblue' },
        onSelect: handleOnSelect,
        onSelectAll: handleOnSelectAll

    };




    // UPDATE STOPLOSS PRIZE 
    const UpdateStopLoss = async () => {

        const filteredArray2 = tradeHistoryAllData.data.filter(item => selected1.some(obj => obj._id === item._id));


        // let MarketOpenToday = GetMarketOpenDays();

        // if (MarketOpenToday) {
        //     if (profileData && profileData.trading_status == "off") {
        //         alert("Please Trading On First")
        //     }
        //     else {
        if (filteredArray2.length === 0) {
            alert("Please Select Atleast One Symbol")
        }
        else {
            console.log(filteredArray2);
            // return
            await dispatch(
                Update_Signals({
                    data: filteredArray2,
                    // token: token,
                })

            ).unwrap()
                .then((response) => {
                    if (response.status) {
                        setrefresh(!refresh)
                        setSelected1([])
                        setSelected([])
                    }
                    toast.success(response.msg);

                    //  window.location.reload()
                });
        }
        //     }
        // } else {
        //     alert('Market Is Closed Today');
        // }

    }

var PanelKey ="TEST"

    // ----------------------------- SQUARE OFF ----------------------------
    const SquareOfAll = () => {

        let MarketOpenToday = GetMarketOpenDays();

        if (MarketOpenToday) {
            if (profileData && profileData.trading_status == "off") {
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
                            client_persnal_key: rowdata.client_persnal_key ? rowdata.client_persnal_key : PanelKey && PanelKey.client_key,
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






    // GET TRADE
    const userDataRes = async () => {
        const subadminId = userDetails.user_id
        await dispatch(Trade_Details({ subadminId }))
            .unwrap()
            .then(async (response) => {
                if (response.status) {
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