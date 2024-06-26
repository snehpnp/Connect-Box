import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ProfileInfo,
  userdataforhelp,
  getsubadmintable,
} from "../../../ReduxStore/Slice/Admin/System";
import { LogOut } from "../../../ReduxStore/Slice/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Minimize } from "lucide-react";
import Swal from "sweetalert2";
import { ipAddress } from "../../../Utils/Ipaddress";
import { admin_Msg_Get } from "../../../ReduxStore/Slice/Admin/MessageData";
import { fDateTime } from "../../../Utils/Date_formet";
import useLogout from "../../../Utils/Logout";
import io from "socket.io-client";
import * as Config from "../../../Utils/Config";
import { loginWithApi } from "../../../Utils/log_with_api";
import {
  Userinfo,
  Trading_Off_Btn,
} from "../../../ReduxStore/Slice/Comman/Userinfo";

import useGetCompany from "../../../Utils/ConnectSocket";

const DropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useLogout();

  const getCompany = useGetCompany();

  const [getLoginStatus, setLoginStatus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pipelineData, setPipelineData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFunds, setShowFunds] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [ip, setIp] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState(null);
  const [getuserdata, setGetuserdata] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [socket, setSocket] = useState(null);

  const user_details = JSON.parse(localStorage.getItem("user_details"));
  var Role = JSON.parse(localStorage.getItem("user_details")).Role;
  var token = JSON.parse(localStorage.getItem("user_details")).token;

  const RunSocketUrl = async () => {
    
    const companyData = await getCompany();

    if (companyData[0].BackendSocketurl) {
      const newSocket = io(companyData[0].BackendSocketurl);
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  };

  useEffect(() => {
    RunSocketUrl();
  }, []);

  const RunLogoutSocket = () => {

    if (socket != null) {
      if (user_details) {
        socket.on("logout", (data) => {
          if (user_details.user_id == data.user_id && token != data.token) {
            LogoutUser();
            return;
          }
        });
      } else {
        window.location.reload();
        return;
      }
    }
  };

  useEffect(() => {
    RunLogoutSocket();
  }, [socket]);






  const fetchData = async () => {
    try {
      const ip = await ipAddress();
      let data = { id: user_details.user_id };
      const response = await dispatch(
        ProfileInfo({ req: data, token: token })
      ).unwrap();
      if (response.status) {
        setProfileData(response.data);
        setProfileImage(response.data[0].profile_img);
        if (response.data[0].TradingStatus == "on") {
          setLoginStatus(true);
           
        } else {
          setLoginStatus(false);
        }
      } else {
        if (response.msg === "Unauthorized!") {
          // console.log("Dropdown", user_details.user_id, ip);
          LogoutUser();
        }
      }
    } catch (error) {
      console.log("Error", error);
      setError(error.message);
    }
  };



  const LogoutUser = async (e) => {
    const ip = await ipAddress();
    const data = { userId: user_details.user_id, Device: "WEB", system_ip: ip };

    await dispatch(LogOut(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          Swal.fire({
            title: "Logout Successful!",
            text: response.msg,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            localStorage.removeItem("user_details");
            localStorage.removeItem("user_role");
            navigate("/login");
          }, 1500);
        } else {
          Swal.fire({
            title: "Error!",
            text: response.msg,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            localStorage.removeItem("user_details");
            localStorage.removeItem("user_role");
            navigate("/login");
          }, 1500);
        }
      })
      .catch((error) => {
        console.log("Error in logout user", error);
      });
  };



  const fetchIP = async () => {
    try {
      const ip = await ipAddress();
      setIp(ip);
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
    }
  };

  // Define toggleTheme function
  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-sidebar", newThemeMode);
    htmlElement.setAttribute("data-layout-mode", newThemeMode);
    htmlElement.setAttribute("data-topbar", newThemeMode);
    localStorage.setItem("theme_mode", newThemeMode);
  };

  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };



  const walletmodal = () => {
    if (Role == "ADMIN") {
    } else if (Role == "SUBADMIN") {
      navigate("/subadmin/wallet");
    } else if (Role == "RESEARCH") {
      navigate("/research/wallet");
    }
  };

  const ProfilePage = () => {
    if (Role == "ADMIN") {
      navigate("/admin/profile");
    } else if (Role == "SUBADMIN") {
      navigate("/subadmin/profile");
    } else if (Role == "USER") {
      navigate("/user/profile");
    } else if (Role == "EMPLOYEE") {
      navigate("/employee/profile");
    } else if (Role == "RESEARCH") {
      navigate("/research/profile");
    }
  };

  const SettingPage = () => {
    if (Role == "ADMIN") {
      navigate("/admin/setting");
    } else if (Role == "SUBADMIN") {
      navigate("/subadmin/setting");
    } else if (Role == "USER") {
      navigate("/user/setting");
    } else if (Role == "EMPLOYEE") {
      navigate("/employee/setting");
    } else if (Role == "RESEARCH") {
      navigate("/research/setting");
    }
  };

  const toggleFundsVisibility = () => {
    setShowFunds(!showFunds);
    walletmodal();
  };

  function formatNumber(value) {
    if (value < 1000) {
      return value.toString();
    } else if (value < 10000) {
      return (value / 1000).toFixed(0) + "k";
    } else if (value < 1000000) {
      return (value / 1000).toFixed(0) + "k";
    } else if (value < 10000000) {
      return (value / 1000000).toFixed(0) + "M";
    } else if (value < 1000000000) {
      return (value / 1000000).toFixed(0) + "M";
    } else if (value < 10000000000) {
      return (value / 1000000000).toFixed(0) + "B";
    } else if (value < 1000000000000) {
      return (value / 1000000000).toFixed(0) + "B";
    } else if (value < 10000000000000) {
      return (value / 1000000000000).toFixed(0) + "T";
    } else {
      return (value / 1000000000000).toFixed(0) + "T";
    }
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // ADMIN NOTIFICATION NOTIFICATION
  const getSubadminTableData = async () => {
    try {
      const response = await dispatch(
        admin_Msg_Get({ ownerId: user_details.user_id, key: 3 })
      ).unwrap();
      if (response.status) {
        setPipelineData(response.data);
      } else {
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  };




  // subadmin help notification for admin page
  const gettable = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
      const response = await dispatch(getsubadmintable({})).unwrap();

      if (response.status) {
        if (response.data.length > 0) {
          var filterData = response.data.filter((data) => {
            const dataDate = data.createdAt.split("T")[0];

            return dataDate === today;
          });

          setGetsubadmin(filterData);
        } else {
          setGetsubadmin([]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };



 
  

  // USER NOTIFICATION
  const getusertable = async () => {
    try {
      const response = await dispatch(userdataforhelp({})).unwrap();
      const today = new Date().toISOString().split("T")[0];

      if (response.status) {
        if (response.data.length > 0) {
          var filterData = response.data.filter((data) => {
            const dataDate = data.createdAt.split("T")[0];

            return (
              data.prifix_key.substring(0, 3) === user_details.prifix_key &&
              dataDate === today
            );
          });

          setGetuserdata(filterData);
        } else {
          setGetuserdata([]);
        }
      }
    } catch (error) {
      console.error("Error in getusertable:", error);
    }
  };




  useEffect(() => {
    fetchData();
    fetchIP();
    getSubadminTableData();
    getusertable();
    gettable();
  }, []);





 useEffect(() => {
    const storedThemeMode = localStorage.getItem("theme_mode");
    if (storedThemeMode) {
      setThemeMode(storedThemeMode);
    }
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute(
      "data-sidebar",
      storedThemeMode ? storedThemeMode : "light"
    );
    htmlElement.setAttribute(
      "data-layout-mode",
      storedThemeMode ? storedThemeMode : "light"
    );
    htmlElement.setAttribute(
      "data-topbar",
      storedThemeMode ? storedThemeMode : "light"
    );
  }, [themeMode]);



  

  // LOGOUT TRADING
  const handleTradingOff = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to turn off trading?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, turn it off !",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    let data = { id: id, system_ip: ip };
    await dispatch(Trading_Off_Btn(data))
      .unwrap()
      .then((response) => {
        setRefresh(!refresh);
        if (response.status){
          Swal.fire({
            title: "Trading Off Successfully!",
            icon: "success",
            html: "Your trading has been successfully completed.",
          });
          fetchData();
        }
       
      })
      .catch((error) => {
        // Handle error (optional)
      });
  };





  const LogIn_WIth_Api = (check, brokerid, tradingstatus, UserDetails) => {
    if (check) {
      loginWithApi(brokerid, UserDetails);
    } else {
      handleTradingOff(UserDetails._id);
    }
  };





  return (
    <div className="mb-0 dropdown custom-dropdown">
      <ul className="nav nav-tabs user-menu">
        {Role == "USER" && (
          <li className="toggle-li">
            <style>
              {`
             .checktoggle::after {
               display: none !important;
             }
           `}
            </style>
            <div
              className="status-toggle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                id="1"
                className="check"
                type="checkbox"
                onChange={(e) => {
                  LogIn_WIth_Api(
                    e.target.checked,
                    profileData && profileData[0].broker,
                    profileData && profileData[0].TradingStatus,
                    profileData && profileData[0]
                  );
                }}
                checked={getLoginStatus}
                style={{ display: "none" }}
              />

              <label
                htmlFor="1"
                className="checktoggle"
                style={{
                  position: "relative",
                  width: "140px", // Increased width for better click/touch area
                  height: "46px", // Increased height for better visibility
                  backgroundColor: "#6610f2",
                  borderRadius: "10px", // Slightly increased border radius for smoother corners
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", // Centered content horizontally
                  padding: "0 10px", // Padding to make space for the text
                  color: "white",
                  fontSize: "14px", // Adjusted text size for better readability
                  fontWeight: "bold",
                  marginRight: "8px",
                  marginTop: "5px",
                  border: "2px solid #6610f2", // Border properties
                  boxSizing: "border-box", // Ensures padding and border are included in width and height
                }}
              >
                TRADING
                <span
                  style={{
                    padding: "2px", // Padding inside the span element
                    border: "1px solid #ffffff", // Border properties for the text
                    borderRadius: "5px", // Border radius for the text border
                    backgroundColor: getLoginStatus ? "green" : "red",
                  }}
                >
                  {getLoginStatus ? "ON" : "OFF"}
                </span>
              </label>
            </div>
          </li>
        )}

        {Role == "SUBADMIN" && (
          <li className="nav-item dropdown flag-nav dropdown-heads">
            {user_details.subadmin_service_type == 2
              ? "STRATEGY WISE"
              : "PER TRADE"}
          </li>
        )}
        {!(Role === "EMPLOYEE") ? (
          <li className="nav-item dropdown" onClick={toggleFundsVisibility}>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-primary cancel-btn me-2 mt-2 iconclass"
            >
              {showFunds ? (
                <span>
                  <IndianRupee
                    style={{ height: "24px", marginRight: "10px" }}
                  />
                  <strong>
                    {formatNumber(profileData && profileData[0].Balance) || "-"}
                  </strong>
                </span>
              ) : (
                <span>
                  <i
                    className="fe fe-eye "
                    style={{ fontSize: "24px", marginRight: "10px" }}
                  />
                  <strong>*****</strong>
                </span>
              )}
            </button>
          </li>
        ) : null}

        <li className="nav-item dropdown  flag-nav dropdown-heads">
          <a
            className="nav-link iconclass"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fe fe-bell" />{" "}
            {pipelineData && pipelineData.length > 0 ? (
              <span className="badge rounded-pill" />
            ) : getuserdata.length > 0 ? (
              <span className="badge rounded-pill" />
            ) : (
              ""
            )}
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <div className="notification-title">Notifications</div>
            </div>

            <div className="noti-content">
              <ul className="notification-list">
                {pipelineData &&
                  Role == "SUBADMIN" &&
                  pipelineData.map((data, index) => (
                    <li
                      className="notification-message"
                      key={`pipeline-${index}`}
                    >
                      <a href="/#/subadmin/message-broadcast">
                        <div className="d-flex">
                          <div className="media-body">
                            <div className="d-flex justify-content-between">
                              <p className="noti-details">
                                <span className="noti-title">
                                  {data.UserName}
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  {fDateTime(data.createdAt)}
                                </span>
                              </p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span
                                style={{
                                  maxWidth: "18rem",
                                  display: "inline-block",
                                  wordWrap: "break-word",
                                  whiteSpace: "normal",
                                }}
                              >
                                {truncateText(data.messageTitle)}
                              </span>
                              <span>Admin</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}

                {Role === "SUBADMIN"
                  ? getuserdata &&
                    getuserdata.map((data, index) => (
                      <li
                        className="notification-message"
                        key={`getuserdata-${index}`}
                      >
                        <a href="/#/subadmin/help">
                          <div className="d-flex">
                            <div className="media-body">
                              <div className="d-flex justify-content-between">
                                <p className="noti-details">
                                  <span className="noti-title">
                                    {data.UserName}
                                  </span>
                                </p>
                                <p className="noti-time">
                                  <span className="notification-time">
                                    {fDateTime(data.createdAt)}
                                  </span>
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span
                                  style={{
                                    maxWidth: "18rem",
                                    display: "inline-block",
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  {truncateText(data.Message)}
                                </span>
                                <span>Help</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))
                  : Role === "ADMIN"
                  ? getsubadmin &&
                    getsubadmin.map((data, index) => (
                      <li
                        className="notification-message"
                        key={`getuserdata-${index}`}
                      >
                        <a href="/#/admin/help">
                          <div className="d-flex">
                            <div className="media-body">
                              <div className="d-flex justify-content-between">
                                <p className="noti-details">
                                  <span className="noti-title">
                                    {data.UserName}
                                  </span>
                                </p>
                                <p className="noti-time">
                                  <span className="notification-time">
                                    {fDateTime(data.createdAt)}
                                  </span>
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span
                                  style={{
                                    maxWidth: "18rem",
                                    display: "inline-block",
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  {truncateText(data.Message)}
                                </span>
                                <span>Help</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </li>

        <li className="nav-item has-arrow dropdown-heads iconclass">
          <a onClick={toggleFullScreen} className="win-maximize">
            {isFullScreen ? <Minimize /> : <i className="fe fe-maximize" />}
          </a>
        </li>

        <li className="nav-item dropdown mt-3">
          <div
            className="dropdown dropdown-action"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="download"
            style={{ margin: "0 5px 0 0" }}
          >
            <a
              className="user-a nav-a d-flex"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="user-img">
                <img
                  src={
                    profileImage
                      ? profileImage
                      : "assets/img/profiles/ProfileAvataar/hacker.png"
                  }
                  alt="img"
                  className="profilesidebar"
                />
                <span className="animate-circle" />
              </span>
              <span className="user-content">
                <span className="user-name">
                  <b>{user_details && user_details.UserName}</b>
                </span>
                <span className="user-details">{Role}</span>
                <span className="decorative-element"></span>
              </span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right mt-1 ms-2"
              style={{
                borderRadius: 20,
              }}
            >
              <div className="subscription-menu">
                <ul className="list-unstyled">
                  <li className="dropdown-item de ">
                    <label className="theme-switch mb-0">
                      <input
                        type="checkbox"
                        checked={themeMode === "dark"}
                        onChange={toggleTheme}
                      />
                      <span className="slider"></span>
                    </label>
                  </li>
                  <li onClick={() => ProfilePage()}>
                    <Link className="dropdown-item dev">
                      <i className="fa-solid fa-user p-2"></i>Profile
                    </Link>
                  </li>

                  <li onClick={() => SettingPage()}>
                    <Link className="dropdown-item dev" to="/setting">
                      <i className="fa-solid fa-gear p-2"></i>Settings
                    </Link>
                  </li>

                  <li>
                    <a
                      className="dropdown-item dev"
                      onClick={(e) => LogoutUser(e)}
                    >
                      <i className="fa-solid fa-right-to-bracket p-2"></i> Log
                      out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
