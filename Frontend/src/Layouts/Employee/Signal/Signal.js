import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { useNavigate } from "react-router-dom";
import { Userinfo , Trading_Off_Btn} from "../../../ReduxStore/Slice/Comman/Userinfo";
import { Orders_Details } from "../../../ReduxStore/Slice/Comman/Trades";
import { loginWithApi } from "../../../Utils/log_with_api";
import { fDateTime } from "../../../Utils/Date_formet";


const Signal = () => {

    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    const Role = JSON.parse(localStorage.getItem("user_details")).Role;

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

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

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
                console.log("Error Trading Off", error);
            })

    }
    const LogIn_WIth_Api = (check, brokerid, tradingstatus, UserDetails) => {

        if (check) {
            loginWithApi(brokerid, UserDetails);

        } else {
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


    const RefreshHandle = () => {
        setrefresh(!refresh); 
        userDataRes()  
        setSearchInput("");
    };




    const userDataRes = async () => {
        const subadminId = userDetails.user_id
        await dispatch(Orders_Details({req:{ subadminId:subadminId,Role:Role },token:userDetails.token}))
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
    }, [searchInput])


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
              "Trade Type" : item.TradeType
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
  )
}

export default Signal
