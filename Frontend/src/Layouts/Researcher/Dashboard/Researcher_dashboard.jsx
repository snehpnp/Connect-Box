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
  const [colors] = useState(["#7539FF"]);
  const [userData, setUserData] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const [chart, setchart] = useState(false);
  const [selectedUser, setSelectedUser] = useState("USERS");
  var dropdown = ["Day", "Monthly", "Quarterly", "Half-Yearly", "Yearly"];
  const [selectedOption, setSelectedOption] = useState("Day");
  const storedTheme = localStorage.getItem("theme_mode");


  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
    colors: ["#FF5733", "#33FF57", "#3357FF"],
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

                <h1>WELCOME RESEARCHER...</h1>
              </div>
            </div>

            {/* <div className="col-md-12">
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
                                <div className="dash-title">{data.title}</div>
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
            </div > */}


          </div >
        </div >
      </div >
    </div>
  );
};

export default DashBoard;