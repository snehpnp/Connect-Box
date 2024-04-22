import React, { useState, useEffect } from "react";
import {
  Subadmin_Dashdata,
  Subadmin_DashChartdata,
  Subadmin_SalesData,
} from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colors] = useState(["#9423FF"]);
  const [userData, setUserData] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const [chart, setchart] = useState(false);
  const [selectedUser, setSelectedUser] = useState("USERS");
  var dropdown = ["Day", "Monthly", "Quarterly", "Half-Yearly", "Yearly"];
  const [selectedOption, setSelectedOption] = useState("Day");
  const storedTheme = localStorage.getItem("theme_mode") ;

  

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [],
    },
  ]);

  const handleSelect1 = (data) => {
    setSelectedOption(data);
  };

  const handleUserSales = (e) => {
    setSelectedUser(e.target.textContent);

  };

  const totalUserdata = async (options, user) => {
    var data = {
      user_ID: userDetails.user_id,
      selectedOption: selectedOption,
    };
    await dispatch(Subadmin_DashChartdata(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const categories = response.data.categories;
          const data = response.data.userCounts;

          console.log("categories", categories)

          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: categories,
            },
          }));

          setSeries([{ name: "series-1", data: data }]);

          setchart(true);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const totalSalesdata = async (options, user) => {
    var data = {
      user_ID: userDetails.user_id,
      selectedOption: selectedOption,
    };
    await dispatch(Subadmin_SalesData(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
 

          const categories = response.data[0].data;
          const data = response.data[0].strategy_transactions;

          console.log("categories---", response.data[0].date)

          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: response.data[0].date,
            },
          }));

          setSeries([{ name: "series-1", data: data }]);



          setchart(true);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const calculatePercentage = (count, total) =>
    count !== undefined && count !== null && total > 0
      ? (count / total) * 100
      : null;

  const cardDataList = [
    { key: "TotalUsercount", title: "Total Users" },
    { key: "TotalActiveUsercount", title: "Active Users" },
    { key: "TotalExpiredUsercount", title: "Expired Users" },
    { key: "TotalLiveUsercount", title: "Total Live Users" },
    { key: "TotalActiveLiveUsercount", title: "Active Live Users" },
    { key: "TotalExpiredLiveUsercount", title: "Expired Live Users" },
    { key: "TotalTodayUsercount", title: "Today Total User" },
    { key: "TotalActiveTodayUsercount", title: "Today Active Users" },
    { key: "TotalExpiredTodayUsercount", title: "Converted Users" },
    { key: "TotalDemoUsercount", title: "Demo Users" },
    { key: "TotalActiveDemoUsercount", title: "Active Demo Users" },
    { key: "TotalExpiredDemoUsercount", title: "Expired Demo Users" },
  ];

  const cardsData = cardDataList.map(({ key, title }) => {
    const count = userData[key];
    const percentage = calculatePercentage(count, userData.TotalUsercount);
    let progressBarClass = "";
    switch (true) {
      case title.toLowerCase().includes("active"):
        progressBarClass = "bg-success";
        break;
      case title.toLowerCase().includes("total"):
        progressBarClass = "bg-5";
        break;
      case title.toLowerCase().includes("expired") ||
        title.toLowerCase().includes("converted"):
        progressBarClass = "bg-6";
        break;
      case title.toLowerCase().includes("demo"):
        progressBarClass = "bg-5";
        break;
      default:
        break;
    }
    return {
      iconClass: "fas fa-users",
      title: title,
      count: count !== undefined ? count : "Loading...",
      progress: percentage !== null ? percentage : 0,
      arrowIcon:count !== undefined && percentage !== null
          ? percentage === 0
            ? ""
            : percentage < 100
            ? "fas fa-arrow-down"
            : "fas fa-arrow-up"
          : "",
      percentageChange:percentage !== null ? `${Math.round(percentage)}%` : "N/A",
      sinceLastWeek:"since-last-week",
      progressBarClass: progressBarClass,
    };
  });

  

  const dashData = async () => {
    await dispatch(Subadmin_Dashdata({ subadminId: userDetails.user_id }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setUserData(response.data);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    totalUserdata(selectedOption, selectedUser);
    dashData();
  }, [dispatch]);


  return (
    <div className="main-wrapper">
      <div>
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                {/* <div className="col card-header">
                  <h5 className="card-title">Subadmin Dashboard</h5>
                </div> */}
              </div>
            </div>

            <div className="col-md-12">
              <div className="container">
                <div className="row" data-aos="fade-down">
                  {cardsData
                    .reduce((acc, card, index) => {
                      const columnIndex = Math.floor(index / 3);
                      if (!acc[columnIndex]) {
                        acc[columnIndex] = [];
                      }
                      acc[columnIndex].push(card);
                      return acc;
                    }, [])
                    .map((cardGroup, index) => (
                      <div className="col-md-3" key={index}>
                        {cardGroup.map((data, idx) => (
                          <div className="card mb-4" key={idx}>
                            <div className="card-body moving-border">
                              <div className="dash-widget-header crad-widget">
                                <span
                                  className={`dash-widget-icon ${data.progressBarClass}`}
                                >
                                  <i
                                    className={data.iconClass}
                                    id="animated"
                                  ></i>
                                </span>
                                <div className="dash-count">
                                  <div className="dash-title">{data.title}</div>
                                  <div className="dash-counts">
                                    <p>{data.count}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="progress progress-sm mt-3">
                                <div
                                  className={`progress-bar ${data.progressBarClass}`}
                                  role="progressbar"
                                  style={{ width: `${data.progress}%` }}
                                  aria-valuenow={data.progress}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                ></div>
                              </div>
                              <p className="text-muted mt-3 mb-0">
                                <span className="text-success me-1">
                                  <i className={data.arrowIcon} />
                                  {data.percentageChange}
                                </span>{" "}
                                <span
                                  className={`since-last-week ${
                                    storedTheme == "dark"
                                      ? "text-white"
                                      : "text-black"
                                  }`}
                                >
                                  {data.sinceLastWeek}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row" data-aos="fade-left">
            <div className="row" data-aos="fade-left">
              <div className="col-xl-8 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">Sales Analytics</h5>
                      <div className="d-flex">
                        <div className="dropdown main me-3">
                          <button
                            className="btn btn-white btn-sm dropdown-toggle"
                            type="button"
                            id="subadminDropdownButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {selectedUser}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="subadminDropdownButton"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={(e) => {
                                  handleUserSales(e);
                                  totalUserdata(selectedOption, "USERS");
                                }}
                              >
                                USERS
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={(e) => {
                                  handleUserSales(e);
                                  totalSalesdata(selectedOption, selectedUser);
                                }}
                              >
                                SALES
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="dropdown main">
                          <button
                            className="btn btn-white btn-sm dropdown-toggle iconclass"
                            type="button"
                            id="planDropdownButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {selectedOption}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="planDropdownButton"
                          >
                            {dropdown.map((data, index) => (
                              <li key={index}>
                                <a
                                  className="dropdown-item"
                                  onClick={() => handleSelect1(data)}
                                >
                                  {data}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div id="invoice_chart" />
                    <div className="text-center text-muted">
                      <div className="row">
                        {chart && chart ? (
                          <div className="mixed-chart">
                            <Chart
                              colors={colors}
                              options={options}
                              series={series}
                              type="bar"
                              width="100%"
                            />
                          </div>
                        ) : (
                          <div className="loding" style={{ color: "white" }}>
                            Loading...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 d-flex">
                <div className="card flex-fill">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">Invoice 1 Analytics</h5>
                      <div className="dropdown main">
                        <button
                          className="btn btn-white btn-sm dropdown-toggle iconclass"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Monthly
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <a className="dropdown-item">Weekly</a>
                          </li>
                          <li>
                            <a className="dropdown-item">Monthly</a>
                          </li>
                          <li>
                            <a className="dropdown-item">Yearly</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="invoice_chart" />
                    <div className="text-center text-muted">
                      <div className="row">
                        <div className="col-4">
                          <div className="mt-4">
                            <p className="mb-2 text-truncate">
                              <i className="fas fa-circle text-primary me-1" />{" "}
                              Invoiced
                            </p>
                            <h5>$2,132</h5>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="mt-4">
                            <p className="mb-2 text-truncate">
                              <i className="fas fa-circle text-success me-1" />{" "}
                              Received
                            </p>
                            <h5>$1,763</h5>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="mt-4">
                            <p className="mb-2 text-truncate">
                              <i className="fas fa-circle text-danger me-1" />{" "}
                              Pending
                            </p>
                            <h5>$973</h5>
                          </div>
                        </div>
                      </div>
                      <div
                        className="gif-div"
                        style={{ height: "400px", marginTop: "-60px" }}
                      >
                        <iframe src="https://lottie.host/embed/703aa556-aee8-45e4-a279-c6b636b0542f/rTWOHxoaxl.json"></iframe>
                      </div>
                    </div>
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

export default DashBoard;
