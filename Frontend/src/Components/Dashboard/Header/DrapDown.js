import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProfileInfo, userdataforhelp } from "../../../ReduxStore/Slice/Admin/System";
import { LogOut } from '../../../ReduxStore/Slice/Auth/AuthSlice'
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Minimize } from "lucide-react";
import Swal from 'sweetalert2';
import { ipAddress } from '../../../Utils/Ipaddress';
import { admin_Msg_Get } from "../../../ReduxStore/Slice/Admin/MessageData";
import { fDateTime } from "../../../Utils/Date_formet";
import useLogout  from "../../../Utils/Logout";


const DropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useLogout();

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


  const user = JSON.parse(localStorage.getItem("user_details"));
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  var UserNAme = JSON.parse(localStorage.getItem("user_details")).UserName;
  var Role = JSON.parse(localStorage.getItem("user_details")).Role;
  var token = JSON.parse(localStorage.getItem("user_details")).token;

  const subadmin_service_type = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type;




  const fetchData = async () => {
    try {
      let data = { id: user_id };
      await dispatch(ProfileInfo({ req: data, token: token }))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            setProfileData(response.data);
            setProfileImage(response.data[0].profile_img);
          } else {
            if (response.msg == "Unauthorized!") {
         
    logout(user_id, ip);
            }


          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } catch (error) {
      setError(error.message);
    }
  };



  const fetchIP = async () => {
    try {
      const ip = await ipAddress();
      setIp(ip);
    } catch (error) {
      console.error('Failed to fetch IP address:', error);
    }
  };



//   const LogoutUser = async (e) => {
//     // const data = { userId: user_id, Device: "WEB", system_ip: ip }

// console.log("SNEH")



//     // await dispatch(LogOut(data)).unwrap()
//     //   .then((response) => {
//     //     if (response.status) {
//     //       Swal.fire({
//     //         title: "Logout Successful!",
//     //         icon: "success",
//     //         position: "top-end",
//     //         text: response.msg,
//     //         showConfirmButton: false,
//     //         timer: 800,
//     //         timerProgressBar: true
//     //       });
//     //       setTimeout(() => {
//     //         localStorage.removeItem("user_details")
//     //         localStorage.removeItem("user_role")
//     //         navigate("/login")
//     //       }, 800)


//     //     }
//     //     else {
//     //       Swal.fire({
//     //         title: "Error!",
//     //         text: response.msg,
//     //         icon: "error",
//     //         timer: 1500,
//     //         timerProgressBar: true
//     //       });

//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.log("Error in logout user", error)
//     //   })


//   }

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
      // navigate('/admin/wallet')
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

      const response = await dispatch(admin_Msg_Get({ ownerId: user_id, key: 3 })).unwrap();
      if (response.status) {
        setPipelineData(response.data);
      } else {
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  };



  // USER NOTIFICATION
  const getusertable = async () => {
    await dispatch(userdataforhelp({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          if (response.data.length > 0) {
            var filterData = response.data.filter(
              (data) => data.prifix_key.substring(0, 3) === user.prifix_key
            );

            setGetuserdata(filterData);
          } else {
            setGetuserdata([]);
          }

        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };




  useEffect(() => {
    fetchIP();
    fetchData();
    getSubadminTableData();
    getusertable()
  }, []);



  useEffect(() => {
    const storedThemeMode = localStorage.getItem("theme_mode");
    if (storedThemeMode) {
      setThemeMode(storedThemeMode);
    }
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-sidebar", themeMode);
    htmlElement.setAttribute("data-layout-mode", themeMode);
    htmlElement.setAttribute("data-topbar", themeMode);
  }, [themeMode]);









  return (
    <div className="mb-0 dropdown custom-dropdown">
      <ul className="nav nav-tabs user-menu">
        {Role == "SUBADMIN" && (
          <li className="nav-item dropdown flag-nav dropdown-heads">
            {subadmin_service_type == 2 ? "STRATEGY WISE" : "PER TRADE"}
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
            <i className="fe fe-bell" /> <span className="badge rounded-pill" />
          </a>
          <div className="dropdown-menu notifications">

            <div className="topnav-dropdown-header">
              <div className="notification-title">Notifications</div>
              {/* <a
                href="javascript:void(0)"
                className="clear-noti d-flex align-items-center"
              >
                Mark all as read <i className="fe fe-check-circle" />
              </a> */}
            </div>

            <div className="noti-content">
              <ul className="notification-list">


                {pipelineData && Role == "SUBADMIN" && pipelineData.map((data, index) => (
                  <li className="notification-message" key={`pipeline-${index}`}>
                    <a href="/#/subadmin/message-broadcast">
                      <div className="d-flex">
                        <div className="media-body">
                          <div className="d-flex justify-content-between">
                            <p className="noti-details">
                              <span className="noti-title">{data.UserName}</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">{fDateTime(data.createdAt)}</span>
                            </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span style={{ maxWidth: "18rem" }}>
                              {truncateText(data.messageTitle, 80)}
                            </span>
                            <span>Admin</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}

                {getuserdata && getuserdata.map((data, index) => (
                  <li className="notification-message" key={`getuserdata-${index}`}>
                    <a href="/#/subadmin/help">
                      <div className="d-flex">
                        <div className="media-body">
                          <div className="d-flex justify-content-between">
                            <p className="noti-details">
                              <span className="noti-title">{data.UserName}</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">{fDateTime(data.createdAt)}</span>
                            </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span style={{ maxWidth: "18rem" }}>
                              {truncateText(data.Message, 80)}
                            </span>
                            <span>Help</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="topnav-dropdown-footer">
              <a href="#">Clear All</a>
            </div> */}
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
                  <b>{UserNAme && UserNAme}</b>
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
                      <i class="fa-solid fa-user p-2"></i>Profile
                    </Link>
                  </li>

                  <li onClick={() => SettingPage()}>
                    <Link className="dropdown-item dev" to="/setting">
                      <i class="fa-solid fa-gear p-2"></i>Settings
                    </Link>
                  </li>

                  <li>
                    <a
                      className="dropdown-item dev"
                      onClick={(e) => logout(user_id, ip)}
                    >
                      <i class="fa-solid fa-right-to-bracket p-2"></i> Log out
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
