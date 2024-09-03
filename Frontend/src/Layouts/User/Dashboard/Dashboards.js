import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { GetUserDashboardData } from '../../../ReduxStore/Slice/Users/Userdashboard.Slice'
import { fDateTime } from "../../../Utils/Date_formet";
import { Link } from "react-router-dom"
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { Orders_Details } from "../../../ReduxStore/Slice/Comman/Trades";
import { OrderBook } from "../../../Utils/Orderbook";
import { dashboardData } from "../../../Utils/Userdasboard";

import { ProfileInfo } from "../../../ReduxStore/Slice/Admin/System";
import Swal from 'sweetalert2';
// import useLogout  from '../../../Utils/Logout'


const Dashboards = () => {
  // const logout = useLogout();
  const dispatch = useDispatch()
  const images = ["assets/img/companies/company-01.svg", "assets/img/companies/company-02.svg", "assets/img/companies/company-03.svg"];


  var UserNAme = JSON.parse(localStorage.getItem("user_details")).UserName;
  var user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  var Role = JSON.parse(localStorage.getItem("user_details")).Role;
  var token = JSON.parse(localStorage.getItem("user_details")).token;

  const [getUserBalance, SetUserBalance] = useState(null);

  const [ForGetCSV, setForGetCSV] = useState([])
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [getDashboardData, setDashboardData] = useState({ loading: false,data: []});
  const [tableData, setTableData] = useState({loading: false,data: []});

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


  const getGreetingMessage = () => {
    const currentTime = new Date().getHours();

    if (currentTime < 12) {
      return { greeting: "Good Morning", icon: "fe-sun" };
    } else if (currentTime < 17) {
      return { greeting: "Good Afternoon", icon: "fe-sun" };
    } else {
      return { greeting: "Good Evening", icon: "fe-moon" };
    }
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
      width: 200,
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
      width: 60,
      headerClassName: styles.boldHeader,

    },

    {
      field: "trade_symbol",
      headerName: "Trade Symbol",
      width: 270,
      headerClassName: styles.boldHeader,

    },
    {
      field: "price",
      headerName: "Price ",
      width: 110,
      headerClassName: styles.boldHeader,

    },

    {
      field: "strategy",
      headerName: "strategy ",
      width: 160,
      headerClassName: styles.boldHeader,

    },
    {
      field: "lot_size",
      headerName: "Quantity",
      width: 100,
      headerClassName: styles.boldHeader,

    },
    {
      field: "TradeType",
      headerName: "Trade Type ",
      width: 160,
      headerClassName: styles.boldHeader,

    },

  ];


  const { greeting, icon } = getGreetingMessage();

 

  const userDataRes = async () => {
    await dispatch(Orders_Details({ req: { subadminId: user_id, Role: Role }, token: token }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setTableData({ loading: true, data: response.data });
        } else {
          setTableData({ loading: true, data: [] });
          

        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };



  const UserdashboardDATA = async () => {

    var data = { "id": user_id };
    await dispatch(GetUserDashboardData({ req: data, token: token })).unwrap()
      .then((response) => {

        if (response.status) {
          setDashboardData({
            loading: true,
            data: response.data
          })
        }
        else {
          setDashboardData({
            loading: false,
            data: []
          })

        }
      })
      .catch((error) => {
        console.log("Error is found in finding client service detail", error)
      })

  }

  


  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };


  const DawnloadOrderBook = async (e) => {
    let data = { id: user_id };
    await dispatch(ProfileInfo({ req: data, token: token }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          if (response.data[0].TradingStatus == "on" && response.data[0].access_token != '' && response.data[0].access_token != null) {
            OrderBook(response.data[0])
              .then(response => {
                setForGetCSV(response)

              })
              .catch(error => {
                Swal.fire({
                  title: "Empty",
                  text: "Data Not Found",
                  icon: "error",
                  timer: 1500,
                  timerProgressBar: true,
                })
              });
          } else {
            Swal.fire({
              title: "Trading Is Off",
              text: "Trading on ",
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            })
          }

        } 
      })
      .catch((error) => {
        console.log("Error", error);
      });


  }


  const UserdasboardData = async (e) => {
    let data = { id: user_id };
    await dispatch(ProfileInfo({ req: data, token: token }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          if (response.data[0].TradingStatus == "on" && response.data[0].access_token != '' && response.data[0].access_token != null) {
            dashboardData(response.data[0])
              .then(response => {
            //  SNEH JAUSWAL
             SetUserBalance(response)
              })
              .catch(error => {
                console.error("Error:", error);
              });
          }
   

        } else {
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });


  }


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
        },
        error => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);


  useEffect(() => {
    UserdasboardData()
    userDataRes()
    UserdashboardDATA();
  }, [])


  return (
    <div>
      <div className="content container-fluid pb-0">
   
        <div className="super-admin-dashboard">
          <div className="row">
            <div className="col-xl-5 d-flex">
              <div className="dash-user-card w-100">
                <h4>
                  <i className={`fe ${icon}`} />
                  {greeting}, {UserNAme}
                </h4>

                {location ? (
                  <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <p>Loading...</p>
                )}
                <hr style={{ backgroundColor: "white", height: "5px", border: "none", width: "18rem" }} />

                <div className="dash-btns gap-3 mt-5" style={{ display: "flex", color: "white" }}>
                  <div>
                    <h4>Balance</h4>
                    <p>{getUserBalance && getUserBalance.limitsData || "-"}</p>
                  </div>
                  <div >
                    <h4>M2M</h4>
                    <p>{getUserBalance && getUserBalance.unrealisedProfitLossSum|| "-"}</p>
                  </div>
                  <div >
                    <h4>Download</h4><br />
                    <a className="btn view-company-btn" onClick={(e) => DawnloadOrderBook(e)}>
                      Order Book
                    </a>
                  </div>

                </div>

                <div className="dash-img">
                  <img src="assets/img/dashboard-card-img.png" alt="" />
                </div>
              </div>
            </div>

            <div className="col-xl-7 d-flex p-0">
              <div className="row dash-company-row w-100 m-0">

                <div className="col-lg-3 col-sm-6 d-flex">
                  <div className="company-detail-card bg-success-light w-100">
                    <div className="company-icon">
                      <img
                        src="assets/img/icons/dash-card-icon-04.svg"
                        alt=""
                      />
                    </div>
                    <div className="dash-comapny-info">
                      <h6>Total Strategies </h6>
                      <h5>{getDashboardData.data.StrategyCount && getDashboardData.data.StrategyCount.TotalStrategyCount}</h5>
                      <p>
                        <span>
                          6% <i className="fe fe-chevrons-up" />
                        </span>
                        Last month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 d-flex">
                  <div className="company-detail-card bg-info-light w-100">
                    <div className="company-icon">
                      <img
                        src="assets/img/icons/dash-card-icon-02.svg"
                        alt=""
                      />
                    </div>
                    <div className="dash-comapny-info">
                      <h6>Your Strategies</h6>
                      <h5>{getDashboardData.data.StrategyCount && getDashboardData.data.StrategyCount.YourStrategies}</h5>
                      <p>
                        <span>
                          1% <i className="fe fe-chevrons-up" />
                        </span>
                        Last month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 d-flex">
                  <div className="company-detail-card bg-pink-light w-100">
                    <div className="company-icon">
                      <img
                        src="assets/img/icons/dash-card-icon-03.svg"
                        alt=""
                      />
                    </div>
                    <div className="dash-comapny-info">
                      <h6>Active Strategies</h6>
                      <h5>{getDashboardData.data.StrategyCount && getDashboardData.data.StrategyCount.YourActiveStrategies}</h5>
                      <p>
                        <span>
                          2% <i className="fe fe-chevrons-up" />
                        </span>
                        Last month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 d-flex">
                  <div className="company-detail-card bg-success-light w-100">
                    <div className="company-icon">
                      <img
                        src="assets/img/icons/dash-card-icon-04.svg"
                        alt=""
                      />
                    </div>
                    <div className="dash-comapny-info">
                      <h6>Inactive Strategies </h6>
                      <h5>{getDashboardData.data.StrategyCount && getDashboardData.data.StrategyCount.YourInActiveStrategies}</h5>
                      <p>
                        <span>
                          6% <i className="fe fe-chevrons-up" />
                        </span>
                        Last month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xl-5 d-flex">
              <div className="card super-admin-dash-card">
                <div className="card-header">
                  <div className="row align-center">
                    <div className="col">
                      <h5 className="card-title mt-2 ms-2">
                        Latest Strategies
                      </h5>
                    </div>
                    <div className="col-auto">
                      <Link
                        to="/user/strategy"
                        className="btn-right btn btn-sm btn-outline-primary mt-2 me-2"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-stripped table-hover">
                      <tbody>

                        {getDashboardData.data.Latest_Strategies && getDashboardData.data.Latest_Strategies.map((data1, index) => {
                          return <tr key={index} >
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="profile.html"
                                  className="company-avatar avatar-md me-2 companies company-icon"
                                >
                                  <img
                                    className="avatar-img rounded-circle company"
                                    src={data1.strategy_image ? data1.strategy_image : getRandomImage()}
                                    alt="Company Image"
                                  />
                                </a>
                                <a href="companies.html">
                                  {data1.strategy_name}{" "}
                                  <span className="plane-type">
                                    {data1.strategy_segment}
                                  </span>
                                </a>
                              </h2>
                            </td>
                            <td>{fDateTime(data1.createdAt)}</td>
                            <td className="text-end">
                              <Link
                                to="/user/strategy"
                                className="view-companies btn"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        })}



                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 d-flex">
              <div className="card super-admin-dash-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mt-2 ms-2">Your Orders </h5>
                    <div className="d-flex align-center">
                      <div className="col-auto">
                        <Link
                          to="/user/orders"
                          className="btn-right btn btn-sm btn-outline-primary mt-2 me-2"
                        >
                          View All
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="card-body p-0 mr-0" style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <div className="table-responsive">
                    <FullDataTable
                      styles={styles}
                      label={label}
                      columns={columns}
                      rows={tableData.data}
                      pginationSize={10}
                    />
                  </div>
                </div>



              </div>
            </div>

            <div className="col-xl-4 d-flex">
              <div className="card super-admin-dash-card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mt-2 ms-2">Most Ordered Strategy</h5>

                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="dash-plane-list">
                    <div className="plane-info">
                      <span className="icon-plane">
                        <img
                          src="assets/img/icons/dashboard-plane-icon.svg"
                          alt=""
                        />
                      </span>
                      <div className="plane-name">
                        {getDashboardData.data.mostOrderedStrategy && getDashboardData.data.mostOrderedStrategy.strategy_name} <span>(Yearly)</span>{" "}
                        <h6>Total Order : {getDashboardData.data.mostOrderedStrategy && getDashboardData.data.mostOrderedStrategy.count}</h6>
                      </div>
                    </div>
                    <span className="plane-rate">{getDashboardData.data.mostOrderedStrategy && getDashboardData.data.mostOrderedStrategy.plan}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 d-flex">
              <div className="card super-admin-dash-card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mt-2 ms-2">
                      Top Plan
                    </h5>

                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="dash-plane-list">
                    <div className="plane-info">
                      <span className="icon-company">
                        <img src="assets/img/companies/company-01.svg" alt="" />
                      </span>
                      <span className="name-company">Hermann Groups</span>
                    </div>
                    <span className="plane-rate">10 Plans</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 d-flex">
              <div className="card super-admin-dash-card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mt-2 ms-2">Most Profitable Strategies </h5>

                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="dash-plane-list">
                    <div className="plane-info">
                      <span className="icon-company">
                        <img src="assets/img/companies/company-04.svg" alt="" />
                      </span>
                      <div className="plane-name">
                        <span>{getDashboardData.data.mostOrderedStrategy && getDashboardData.data.mostOrderedStrategy.strategy_name}</span>
                        {/* <h6>sk.example.com</h6> */}
                      </div>
                    </div>
                    <span className="plane-rate">10 Trade Per Day</span>
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

export default Dashboards;
