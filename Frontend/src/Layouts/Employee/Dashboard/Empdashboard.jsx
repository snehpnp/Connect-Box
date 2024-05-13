import React, { useState, useEffect } from "react";
import { employee_dashboard_data } from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { Eye } from 'lucide-react';

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colors] = useState(["#7539FF"]);
  const [userData, setUserData] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("user_details"));

  var dropdown = ["Day", "Monthly", "Quarterly", "Half-Yearly", "Yearly"];

  const storedTheme = localStorage.getItem("theme_mode");



  const calculatePercentage = (count, total) =>
    count !== undefined && count !== null && total > 0
      ? (count / total) * 100
      : null;

  const cardDataList = [
    { key: "TotalUsercount", title: "Total Users", route: "/employee/allusers?filter=1" },
    { key: "TotalActiveUsercount", title: "Active Users", route: "/employee/allusers?filter=2" },
    { key: "TotalExpiredUsercount", title: "Expired Users", route: "/employee/allusers?filter=3" },
    { key: "TotalLiveUsercount", title: "Total Live Users", route: "/employee/allusers?filter=4" },
    { key: "TotalActiveLiveUsercount", title: "Active Live Users", route: "/employee/allusers?filter=5" },
    { key: "TotalExpiredLiveUsercount", title: "Expired Live Users", route: "/employee/allusers?filter=6" },
    { key: "TotalTodayUsercount", title: "Total 2 days Users", route: "/employee/allusers?filter=7" },
    { key: "TotalActiveTodayUsercount", title: "Active 2 days Users", route: "/employee/allusers?filter=8" },
    { key: "TotalExpiredTodayUsercount", title: "Expired 2 days Users", route: "/employee/allusers?filter=9" },
    { key: "TotalDemoUsercount", title: "Total Demo Users", route: "/employee/allusers?filter=10" },
    { key: "TotalActiveDemoUsercount", title: "Active Demo Users", route: "/employee/allusers?filter=11" },
    { key: "TotalExpiredDemoUsercount", title: "Expired Demo Users", route: "/employee/allusers?filter=12" },
  ];

  const cardsData = cardDataList.map(({ key, title, route }) => {
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
      route: route,
      count: count !== undefined ? count : "Loading...",
      progress: percentage !== null ? percentage : 0,
      arrowIcon: count !== undefined && percentage !== null
        ? percentage === 0
          ? ""
          : percentage < 100
            ? "fas fa-arrow-down"
            : "fas fa-arrow-up"
        : "",
      percentageChange: percentage !== null ? `${Math.round(percentage)}%` : "N/A",
      sinceLastWeek: "since-last-week",
      progressBarClass: progressBarClass,
    };
  });



  const dashData = async () => {
    await dispatch(employee_dashboard_data({ subadminId: userDetails.user_id }))
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
    dashData();
  }, [dispatch]);

  
  const handleClick=(route)=>{
    navigate( route)

  }

  return (
    <div className="main-wrapper">
      <div>
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">

              </div>
            </div>

            <div className="col-md-12">
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
                        <div className="card moving-border mb-4" key={idx}>
                          <div className="card-body ">
                            <div className="dash-widget-header crad-widge justify-content-between 
                            ">
                              <div className="dash-count">
                                <div className="d-flex gap-4">
                                  <div className="dash-title">{data.title}</div>
                                  <div> <Eye onClick={(e) => handleClick(data.route)} /></div>

                                </div>
                                <div className="dash-counts">
                                  <p>{data.count}</p>
                                </div>
                              </div>
                              <img src="/assets/img/category/report.png" className="w-25" />


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
                              </span>
                              <span
                                className={`since-last-week ${storedTheme == "dark"
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
              </div >
            </div >

            <div className="row" data-aos="fade-left">
              <div className="row" data-aos="fade-left">

                {/* <div className="col-xl-12 d-flex">
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
                                options={{
                                  ...options,

                                  theme: {
                                    monochrome: {
                                      enabled: true,
                                      color: '#255aee',
                                      shadeTo: 'light',
                                      shadeIntensity: 0.65
                                    }
                                  }

                                }}
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
                </div> */}




                {/* <div className="col-xl-4 d-flex">
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
                                
                          
                                Invoiced
                              </p>
                              <h5>$2,132</h5>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="mt-4">
                              <p className="mb-2 text-truncate">
                                <i className="fas fa-circle text-success me-1" />
                                Received
                              </p>
                              <h5>$1,763</h5>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="mt-4">
                              <p className="mb-2 text-truncate">
                                <i className="fas fa-circle text-danger me-1" />
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
                </div> */}


              </div>
            </div>
          </div >
        </div >
      </div >
    </div>
  );
};

export default DashBoard;