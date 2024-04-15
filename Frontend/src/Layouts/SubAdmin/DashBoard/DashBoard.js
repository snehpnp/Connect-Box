import React, { useState, useEffect } from "react";
import { Subadmin_Dashdata } from "../../../ReduxStore/Slice/Admin/Subadmins";
import {
  Dashboard_admin,
  Dashboard_admin1,
  SubadminsNamesData,
} from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colors] = useState(["#9423FF"]);
  const [subadminData, setAdminData] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const [chart, setchart] = useState(false);

  const [subadminName, setsubadminName] = useState([]);

  const [selectedSubadmin, setSelectedSubadmin] = useState("ALL");
  const [selectedSubadminid, setSelectedSubadminid] = useState("");

  const [selectedOption, setSelectedOption] = useState("Day");

  const handleSelect = (id) => {
    setSelectedSubadminid(id);
  };

  const handleSelect1 = (event) => {
    setSelectedOption(event.target.textContent);
  };

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

  //new

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
    const count = subadminData[key];
    const percentage = calculatePercentage(count, subadminData.TotalUsercount);
    return {
      iconClass: "fas fa-users",
      title: title,
      count: count !== undefined ? count : "Loading...",
      progress: percentage !== null ? percentage : 0,
      arrowIcon:
        count !== undefined && percentage !== null && percentage < 100
          ? "fas fa-arrow-down"
          : "fas fa-arrow-up",
      percentageChange:
        percentage !== null ? `${Math.round(percentage)}%` : "N/A",
      sinceLastWeek: "since last week",
      progressBarClass:
        percentage !== null && percentage < 100 ? "bg-6" : "bg-5",
    };
  });

  const dashData = async () => {
    await dispatch(Subadmin_Dashdata({ subadminId: userDetails.user_id }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setAdminData(response.data);
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
  }, [dispatch, navigate]);

  //

  const dashData1 = async () => {
    var data = {
      SUBADMINS: selectedSubadminid,
      selectedOption: selectedOption,
    };

    await dispatch(Dashboard_admin1(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          const categories = response.data.categories;
          const data = response.data.data;
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

  const SubadminName = async () => {
    await dispatch(SubadminsNamesData())
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setsubadminName(response.data);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    SubadminName();
    dashData();
  }, [dispatch, navigate]);

  useEffect(() => {
    dashData1();
  }, [selectedOption, selectedSubadmin]);

  var dropdown = ["Day", "Monthly", "Quarterly", "Half-Yearly", "Yearly"];

  return (
    <div className="main-wrapper">
      <div>
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="col card-header">
                  <h5 className="card-title">Admin Dashboard</h5>
                </div>
                <div
                  data-aos="fade-down"
                  className="gif-div "
                  style={{ height: "300px" }}
                >
                  <iframe src="https://lottie.host/embed/1bc48686-c5b0-401d-ae40-9b241c697e31/qa4LRQq6FD.json"></iframe>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="row" data-aos="fade-down">
                {cardsData.map((data, index) => (
                  <div className="col-xl-4 col-sm-6 col-12" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <div className="dash-widget-header">
                          <span
                            className={`dash-widget-icon ${data.progressBarClass}`}
                          >
                            <i className={data.iconClass} id="animated" />
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
                          />
                        </div>
                        <p className="text-muted mt-3 mb-0">
                          <span className="text-success me-1">
                            <i className={data.arrowIcon} />
                            {data.percentageChange}
                          </span>{" "}
                          {data.sinceLastWeek}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
                            {selectedSubadmin ? selectedSubadmin : "SUBADMINS"}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="subadminDropdownButton"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => {
                                  setSelectedSubadminid("");
                                  setSelectedSubadmin("ALL");
                                }}
                              >
                                ALL
                              </a>
                            </li>
                            {subadminName &&
                              subadminName.map((data, index) => (
                                <li key={index}>
                                  <a
                                    className="dropdown-item iconclass"
                                    onClick={() => {
                                      handleSelect(data._id);
                                      setSelectedSubadmin(data.UserName);
                                    }}
                                  >
                                    {data.UserName}
                                  </a>
                                </li>
                              ))}
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
                            {/* subadminName.map((data, index) => ( */}
                            {dropdown.map((data, index) => (
                              <li key={index}>
                                <a
                                  className="dropdown-item"
                                  onClick={handleSelect1}
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
