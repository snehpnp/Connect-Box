import React, { useState, useEffect } from "react";
import { Dashboard_admin, Dashboard_admin1, SubadminsNamesData, top_Subadmin_dashData } from "../../../ReduxStore/Slice/Admin/Subadmins";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { Eye } from 'lucide-react';


const Overview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = localStorage.getItem("theme_mode");

  var dropdown = ["Day", "Monthly", "Quarterly", "Half-Yearly", "Yearly"];
 

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

  const [subadminName, setsubadminName] = useState([]);
  const [subadminsData, SetSubadminsData] = useState([]);
  const [chart, setchart] = useState(false);
  const [colors] = useState(["#7539FF"]);
  const [adminData, setAdminData] = useState("");
  const [selectedSubadmin, setSelectedSubadmin] = useState("ALL");
  const [selectedSubadminid, setSelectedSubadminid] = useState("");
  const [selectedOption, setSelectedOption] = useState("Day");
  const [selectedOption1, setSelectedOption1] = useState("Monthly");



  const handleSelect = (id) => {
    setSelectedSubadminid(id);
  };


  const handleSelect1 = (event) => {
    setSelectedOption(event.target.textContent);
  };

  const handleSelect2 = (event) => {
    setSelectedOption1(event.target.textContent);
  };

  const { Totalcount, TotalUsercount, TotalActivecount, TotalInActivecount, TotalActiveUsercount, TotalInActiveUsercount } = adminData;

  const calculatePercentage = (count, base) => {
    return (count !== undefined && count !== null && base) ? (count / base) * 100 : null;
  };

  const formatCardData = (title, count, percentage, route, base) => ({
    iconClass: "fas fa-users",
    title,
    route,
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
      percentage !== null && percentage < 100 ? "bg-5" : "bg-6",
  });

  const cardsData = [
    formatCardData("Total Subadmins", Totalcount, calculatePercentage(Totalcount, Totalcount), '/admin/allsubadmin?filter=1'),
    formatCardData("Active Subadmins", TotalActivecount, calculatePercentage(TotalActivecount, Totalcount,), '/admin/allsubadmin?filter=2'),
    formatCardData("Inactive Subadmins", TotalInActivecount, calculatePercentage(TotalInActivecount, Totalcount), '/admin/allsubadmin?filter=3'),
    formatCardData("Total Researcher", TotalUsercount, calculatePercentage(TotalUsercount, TotalUsercount), '/admin/allresearch?filter=4'),
    formatCardData("Active Researcher", TotalActiveUsercount, calculatePercentage(TotalActiveUsercount, TotalUsercount), '/admin/allresearch?filter=5'),
    formatCardData("Inactive Researcher", TotalInActiveUsercount, calculatePercentage(TotalInActiveUsercount, TotalUsercount), '/admin/allresearch?filter=6'),
  ];

  const handleChange = (route) => {
    navigate(route)
  }


  const dashData = async () => {
    await dispatch(Dashboard_admin())
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setAdminData(response.data);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };


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


  const topdashData = async (data) => {
    var data = { selectedOption: selectedOption1 }
    await dispatch(top_Subadmin_dashData(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          SetSubadminsData(response.data);
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    topdashData();
  }, [selectedOption1]);



  const options1 = {
    labels:  subadminsData && subadminsData.map(subadmin => subadmin.name) ,
   
  };


 


  return (
    <div className="main-wrapper">
      <div>
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-4 col-lg-3">
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

            <div className="col-md-8 col-lg-9">
              <div className="row" data-aos="fade-down">
                {cardsData.map((data, index) => (
                  <div className="col-xl-4 col-sm-6 col-12" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <div className="dash-widget-header mb-0 col-lg-12">
                          <span
                            className={` col-lg-4 dash-widget-icon ${data.title === 'Active Subadmins' || data.title === 'Active Researcher' ? "bg-success" : ''} ${data.progressBarClass} `}
                          >
                            <i className={`${data.iconClass}`} id="animated" />
                          </span>
                          <div className=" col-lg-6  dash-count">
                            <div className="dash-title" style={{ fontWeight: '600' }}>{data.title}</div>

                            <div>

                              <p>{data.count}</p>

                            </div>


                          </div>
                          <div className=" col-lg-3  d-flex justify-content-end mb-0">
                            <Eye
                              onClick={(e) => handleChange(data.route)}
                            />
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

            <div className="col-xl-8 d-flex col-md-6">
              <div className="card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Sub-Admin Sales Analytics</h5>
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
                          {dropdown.map((data, index) => (
                            <li key={index}>
                              <a
                                className="dropdown-item"
                                onClick={handleSelect1}
                              >
                                {data}
                              </a>
                            </li>
                          ))
                          }
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



            {subadminsData && (<div className="col-xl-4 d-flex col-md-6">
              <div className="card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Top 5 Subadmins</h5>
                    <div className="dropdown main">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle iconclass"
                        type="button"
                        id="planDropdownButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {selectedOption1}
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="planDropdownButton"
                      >
                        {dropdown.map((data, index) => (
                          <li key={index}>
                            <a
                              className="dropdown-item"
                              onClick={handleSelect2}
                            >
                              {data}
                            </a>
                          </li>
                        ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="invoice_chart" />
                  <div className="text-center text-muted">
                    <div className="row">
                      <div className="donut" >
                        <Chart options={options1} series={subadminsData.map(subadmin => subadmin.percentage)}  type="donut" width="380" />
                      </div>
                    </div>
                    <div className="top-subadmins" style={{ marginTop: '20px' }}>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {subadminsData.map((subadmin, index) => (
                          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}>{subadmin.name}</span>
                            <span style={{ fontSize: '14px', color: '#888888' }}>{subadmin.percentage}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}


          </div>

        </div>
      </div>
    </div>
  );
};

export default Overview;
