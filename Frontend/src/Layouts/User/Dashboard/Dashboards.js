import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { GetUserDashboardData } from '../../../ReduxStore/Slice/Users/Userdashboard.Slice'
import { fDateTime } from "../../../Utils/Date_formet";


const Dashboards = () => {

  const dispatch = useDispatch()

  var UserNAme = JSON.parse(localStorage.getItem("user_details")).UserName;
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [getDashboardData, setDashboardData] = useState({
    loading: false,
    data: []
  });


  const getGreetingMessage = () => {
    const currentTime = new Date().getHours();

    if (currentTime < 12) {
      return { greeting: "Good Morning", icon: "fe-sun" };
    } else if (currentTime < 18) {
      return { greeting: "Good Afternoon", icon: "fe-sun" };
    } else {
      return { greeting: "Good Evening", icon: "fe-moon" };
    }
  };


  const { greeting, icon } = getGreetingMessage();

  useEffect(() => {
    // Check if the browser supports Geolocation
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








  const UserdashboardDATA = async () => {

    var data = { "id": "661624d4d2e6f70e7a879cf6" };
    await dispatch(GetUserDashboardData(data)).unwrap()
      .then((response) => {

        if (response.status) {
          console.log("response.data", response.data)
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

  useState(() => {
    UserdashboardDATA();
  }, []);


  const images = ["assets/img/companies/company-01.svg", "assets/img/companies/company-02.svg", "assets/img/companies/company-03.svg"];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <div>
      <div className="content container-fluid pb-0">
        <div className="page-header">
          <div className="content-page-header">
            <h5>User Dashboard</h5>
          </div>
        </div>
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
                <div className="dash-btns">
                  <a href="companies.html" className="btn view-company-btn">
                    View Companies
                  </a>
                  <a href="packages.html" className="btn view-package-btn">
                    All Packages
                  </a>
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
                      <a
                        href="/#/user/dashboard"
                        className="btn-right btn btn-sm btn-outline-primary mt-2 me-2"
                      >
                        View All
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-stripped table-hover">
                      <tbody>

                        {getDashboardData.data.Latest_Strategies && getDashboardData.data.Latest_Strategies.map((data1) => {
                          return <tr>
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
                              <a
                                href="companies.html"
                                className="view-companies btn"
                              >
                                View
                              </a>
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
                      <span className="earning-income-text">
                        <i />
                        Income
                      </span>
                      <div className="dropdown main">
                        <button
                          className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          2024
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item"
                            >
                              2023
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item"
                            >
                              2022
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item"
                            >
                              2021
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-0 mr-2" style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <div className="table-responsive">
                    <table className="table table-stripped table-hover">
                      <tbody>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-01.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Hermann Groups{" "}
                                <span className="plane-type">
                                  Basic (Monthly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>24 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-02.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Skiles LLC{" "}
                                <span className="plane-type">
                                  Enterprise (Yearly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>23 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-03.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Kerluke Group{" "}
                                <span className="plane-type">
                                  Advanced (Monthly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>22 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-04.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Schowalter Group{" "}
                                <span className="plane-type">
                                  Basic (Yearly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>21 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-05.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Accentric Global{" "}
                                <span className="plane-type">
                                  Basic (Monthly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>20 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-02.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Skiles LLC{" "}
                                <span className="plane-type">
                                  Enterprise (Yearly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>23 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-03.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Kerluke Group{" "}
                                <span className="plane-type">
                                  Advanced (Monthly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>22 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-04.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Schowalter Group{" "}
                                <span className="plane-type">
                                  Basic (Yearly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>21 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h2 className="table-avatar">
                              <a
                                href="profile.html"
                                className="company-avatar avatar-md me-2 companies company-icon"
                              >
                                <img
                                  className="avatar-img rounded-circle company"
                                  src="assets/img/companies/company-05.svg"
                                  alt="Company Image"
                                />
                              </a>
                              <a href="companies.html">
                                Accentric Global{" "}
                                <span className="plane-type">
                                  Basic (Monthly)
                                </span>
                              </a>
                            </h2>
                          </td>
                          <td>20 Feb 2024</td>
                          <td className="text-end">
                            <a
                              href="companies.html"
                              className="view-companies btn"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


              </div>
            </div>

            <div className="col-xl-4 d-flex">
              <div className="card super-admin-dash-card flex-fill">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mt-2 ms-2">Most Ordered Strategy</h5>
                    <div className="dropdown main">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        This Month
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            Today
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            This Week
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
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
                    <div className="dropdown main">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                        type="button"
                        id="dropdownMenuButton3"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Today
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton3"
                      >
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            This Month
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            This Week
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
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
                    <h5 className="card-title mt-2 ms-2">Most Profitabel Strategies</h5>
                    <div className="dropdown main">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle mt-2 me-2"
                        type="button"
                        id="dropdownMenuButton4"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                      
                        This Week
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton4"
                      >
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            This Month
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            Today
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
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
