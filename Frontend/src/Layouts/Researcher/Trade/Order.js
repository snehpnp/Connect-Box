import React, { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { Orders_Details } from "../../../ReduxStore/Slice/Comman/Trades";
import { fDateTime } from "../../../Utils/Date_formet";

export default function AllEmployees() {

    const dispatch = useDispatch();

    const Role = JSON.parse(localStorage.getItem("user_details")).Role;
    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
    const token = JSON.parse(localStorage.getItem("user_details")).token


    const [tableData, setTableData] = useState({ loading: false, data: [] });
    const [refresh, setrefresh] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [ForGetCSV, setForGetCSV] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');


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
            width: 250,
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
            width: 100,
            headerClassName: styles.boldHeader,

        },

        {
            field: "trade_symbol",
            headerName: "Trade Symbol",
            width: 300,
            headerClassName: styles.boldHeader,

        },
        {
            field: "price",
            headerName: "Price ",
            width: 140,
            headerClassName: styles.boldHeader,

        },

        {
            field: "strategy",
            headerName: "strategy ",
            width: 180,
            headerClassName: styles.boldHeader,

        },
        {
            field: "qty_percent",
            headerName: "qty_percent ",
            width: 150,
            headerClassName: styles.boldHeader,

        },
        {
            field: "TradeType",
            headerName: "Trade Type ",
            width: 160,
            headerClassName: styles.boldHeader,

        },
        {
            field: "exit_status",
            headerName: "Entry/Exit Status ",
            width: 150,
            headerClassName: styles.boldHeader,

        },

    ];

    // REFRESH HANDEL
    const RefreshHandle = () => {
        setrefresh(!refresh);
        setSearchInput("");
    };




    const userDataRes = async () => {
        await dispatch(Orders_Details({req:{ subadminId: user_id, Role: Role },token:token})).unwrap()
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

                    setTableData({
                        loading: true,
                        data: searchInput ? filterData : response.data
                    });
                } else {
                    setTableData({
                        loading: true,
                        data: []
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


    // DAWNLOAD CSV FILE DATA 
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
            {tableData.loading ? (
                <>
                    <div className="content container-fluid" data-aos="fade-left">

                        <div className="card">
                            <div className="card-header">
                                <div className="row align-center">
                                    <div className="col">
                                        <h5 className="card-title mb-0"><i className="pe-2 far fa-clock"></i>Orders</h5>
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
                                            onChange={(e) => setFromDate(e.target.value)}
                                            value={fromDate}
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
                                            onChange={(e) => setToDate(e.target.value)}
                                            value={toDate}
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
                </>
            ) : (
                <Loader />
            )}
        </>
    );
}