import React, { useState, useEffect } from "react";
import { Dashboard_admin } from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";



const Overview = () => {

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: []
    }
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: []
    }
  ]);


  const [colors] = useState(["#9423FF"]);
  const [adminData, setAdminData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const maxPercentage = adminData.Totalcount;
  // const calculatePercentage = (count) =>
  //   count !== undefined && count !== null
  //     ? (count / maxPercentage) * 100
  //     : null;
      const calculatePercentage = (count, maxCount) => {
        if (count !== undefined && count !== null && maxCount !== 0) {
          return (count / maxCount) * 100;
        }
        return null; 
      };
      const maxTotalCount = adminData.Totalcount || 0;

  const percentages = {
    percentage: calculatePercentage(adminData.Totalcount,maxTotalCount),
    percentage1: calculatePercentage(adminData.TotalActivecount,maxTotalCount),
    percentage3: calculatePercentage(adminData.TotalInActivecount,maxTotalCount),
    percentage4: calculatePercentage(adminData.TotalUsercount,maxTotalCount),
    percentage5: calculatePercentage(adminData.TotalActiveUsercount,maxTotalCount),
    percentage6: calculatePercentage(adminData.TotalInActiveUsercount,maxTotalCount),
  };
  const {
    percentage,
    percentage1,
    percentage3,
    percentage4,
    percentage5,
    percentage6,
  } = percentages;

  useEffect(() => {
    dashData();
  }, [dispatch, navigate]);

  const dashData = async () => {
    await dispatch(Dashboard_admin())
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setAdminData(response.data);
      
          const categories = response.data.dummyData.categories;
          const data = response.data.dummyData.data;
      
          setOptions(prevOptions => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: categories
            }
          }));
      
          setSeries([{ name: "series-1", data: data }]);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
      
  };

  const cardsData = [
    {
      iconClass: "fas fa-users",
      title: "Total Subadmins",
      count:
        adminData.Totalcount !== undefined
          ? adminData.Totalcount
          : "Loading...",
      progress: percentage !== null ? percentage : 0,
      arrowIcon:
        adminData.Totalcount !== undefined &&
          percentage !== null &&
          percentage < 100
          ? "fas fa-arrow-down"
          : "fas fa-arrow-up",
      percentageChange:
        percentage !== null ? `${Math.round(percentage)}%` : "N/A",
      sinceLastWeek: "since last week",
      progressBarClass:
        percentage !== null && percentage < 100 ? "bg-5" : "bg-6",
    },
    {
      iconClass: "fas fa-users",
      title: "Active Subadmins",
      count:
        adminData.TotalActivecount !== undefined
          ? adminData.TotalActivecount
          : "Loading...",
      progress: percentage1 !== null ? percentage1 : 0,
      arrowIcon:
        adminData.TotalActivecount !== undefined &&
          percentage1 !== null &&
          percentage1 < 100
          ? "fas fa-arrow-down"
          : "fas fa-arrow-up",
      percentageChange:
        percentage1 !== null ? `${Math.round(percentage1 )}%` : "N/A",
      sinceLastWeek: "since last week",
      progressBarClass:
        percentage1 !== null && percentage1 < 100 ? "bg-5" : "bg-6",
    },
    {
      iconClass: "fas fa-users",
      title: "Inactive Subadmins",
      count:
        adminData.TotalInActivecount !== undefined
          ? adminData.TotalInActivecount
          : "Loading...",
      progress: percentage3 !== null ? percentage3 : 0,
      arrowIcon:
        adminData.TotalActivecount !== undefined &&
          percentage3 !== null &&
          percentage3 < 100
          ? "fas fa-arrow-down"
          : "fas fa-arrow-up",
      percentageChange:
        percentage3 !== null ? `${Math.round(percentage3)}%` : "N/A",
      sinceLastWeek: "since last week",
      progressBarClass:
        percentage3 !== null && percentage3 < 100 ? "bg-5" : "bg-6",
    },
    {
      iconClass: "fas fa-users",
      title: "Total Users",
      count:
        adminData.TotalUsercount !== undefined
          ? adminData.TotalUsercount
          : "Loading...",
      progress: percentage4 !== null ? percentage4 : 0,
      arrowIcon:
        adminData.TotalUsercount !== undefined &&
          percentage4 !== null &&
          percentage4 < 100
          ? "fas fa-arrow-down"
          : "fas fa-arrow-up",
      percentageChange:
        percentage4 !== null ? `${Math.round(percentage4)}%` : "N/A",
      sinceLastWeek: "since last week",
      progressBarClass:
        percentage4 !== null && percentage4 < 100 ? "bg-5" : "bg-6",
    },
    {
      iconClass: "fas fa-users",
      title: "Active Users",
      count:
        adminData.TotalActiveUsercount !== undefined
          ? adminData.TotalActiveUsercount
          : "Loading...",
      progress: percentage5 !== null ? percentage5 : 0,
      arrowIcon:
        adminData.TotalActiveUsercount !== undefined &&
          percentage5 !== null &&
          percentage5 < 100
          ? "fas fa-arrow-down"
          : "fas fa-arrow-up",
      percentageChange:
        percentage5 !== null ? `${Math.round(percentage5)}%` : "N/A",
      sinceLastWeek: "since last week",
      progressBarClass:
        percentage5 !== null && percentage5 < 100 ? "bg-5" : "bg-6",
    },
    {
      iconClass: "fas fa-users",
      title: "Inactive Users",
      count:
        adminData.TotalInActiveUsercount !== undefined
          ? adminData.TotalInActiveUsercount
          : "Loading...",
      progress: percentage6 !== null ? percentage6 : 0,
      arrowIcon:
        adminData.TotalInActiveUsercount !== undefined &&
          percentage6 !== null &&
          percentage6 < 100
          ? "fas fa-arrow-down"
          : "fas fa-arrow-up",
      percentageChange:
        percentage6 !== null ? `${Math.round(percentage6)}%` : "N/A",
      sinceLastWeek: "since last week",
      progressBarClass:
        percentage6 !== null && percentage6 < 100 ? "bg-5" : "bg-6",
    },
  ];




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
                            <i className={data.iconClass} />
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
            <div className="col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Invoice Analytics</h5>
                    <div className="dropdown main">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle"
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
                          <a className="dropdown-item">Monthly</a>
                        </li>
                        <li>
                          <a className="dropdown-item">Quaterly</a>
                        </li>
                        <li>
                          <a className="dropdown-item">Half Yearly</a>
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
                      <div className="mixed-chart">
                        <Chart
                          colors={colors}

                          options={options}
                          series={series}
                          type="bar"
                          width="100%"

                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Invoice 1 Analytics</h5>
                    <div className="dropdown main">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle"
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
  );
};

export default Overview;