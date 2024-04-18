import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { ProfileInfo } from "../../../ReduxStore/Slice/Admin/System";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Minimize } from 'lucide-react';

const DropDown = () => {
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showFunds, setShowFunds] = useState(false);
    const [themeMode, setThemeMode] = useState('light');

    const dispatch = useDispatch();

    const [profileData, setProfileData] = useState([]);
    const [error, setError] = useState(null);

    const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
    const subadmin_service_type = JSON.parse(localStorage.getItem("user_details")).subadmin_service_type
    var Role = JSON.parse(localStorage.getItem("user_details")).Role
    var UserNAme = JSON.parse(localStorage.getItem("user_details")).UserName


    const fetchData = async () => {

        try {
            let data = { "id": user_id }

            await dispatch(ProfileInfo(data))
                .unwrap()
                .then(async (response) => {
                    if (response.status) {
                        setProfileData(response.data)
                    } else {
                        toast.error(response.msg);
                    }

                })
                .catch((error) => {
                    console.log("Error", error);
                });



        } catch (error) {
            setError(error.message);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);





    const LogoutUser = (e) => {
        e.stopPropagation(); // Stop event propagation
        console.log("LogoutUser function is called");
        // localStorage.clear();

        localStorage.removeItem('user_details')
        localStorage.removeItem('user_role')

        window.location.reload();
    };

    // Define toggleTheme function
    const toggleTheme = () => {

        const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newThemeMode);
        const htmlElement = document.querySelector('html');
        htmlElement.setAttribute('data-sidebar', newThemeMode);
        htmlElement.setAttribute('data-layout-mode', newThemeMode);
        htmlElement.setAttribute('data-topbar', newThemeMode);
        localStorage.setItem('theme_mode', newThemeMode);

        // setTimeout(() => {
        //     window.location.reload();
        // }, 200);
    };





    const toggleFullScreen = () => {
        const element = document.documentElement;
        if (!isFullScreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) { /* Safari */
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { /* IE11 */
                element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen);
    };



    const walletmodal = () => {
        if (Role == "ADMIN") {
            // navigate('/admin/wallet')
        } else if (Role == "SUBADMIN") {
            navigate('/subadmin/wallet')
        }

    }


    const ProfilePage = () => {
        if (Role == "ADMIN") {
            navigate('/admin/profile')
        } else if (Role == "SUBADMIN") {
            navigate('/subadmin/profile')
        } else if (Role == "USER") {
            navigate('/user/profile')
        } else if (Role == "EMPLOYEE") {
            navigate('/employee/profile')
        }

    }

    const toggleFundsVisibility = () => {
        setShowFunds(!showFunds);
        walletmodal()
    };




    // Apply theme based on localStorage value on page load
    useEffect(() => {
        const storedThemeMode = localStorage.getItem('theme_mode');
        if (storedThemeMode) {
            setThemeMode(storedThemeMode);
        }
    }, []);


    // Update theme-related attributes on HTML element
    useEffect(() => {
        const htmlElement = document.querySelector('html');
        htmlElement.setAttribute('data-sidebar', themeMode);
        htmlElement.setAttribute('data-layout-mode', themeMode);
        htmlElement.setAttribute('data-topbar', themeMode);
    }, [themeMode]);

    return (

        <div className="mb-0 dropdown custom-dropdown">

            <ul className="nav nav-tabs user-menu">

                {Role == "SUBADMIN" && (<li className="nav-item dropdown flag-nav dropdown-heads">

                    {subadmin_service_type == 2 ? "STRATEGY WISE" : "PER TRADE"}

                </li>)}

                {Role !== "USER" ? <li className="nav-item dropdown" onClick={toggleFundsVisibility}>
                    <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-primary cancel-btn me-2 mt-2 iconclass"
                        style={{
                            backgroundColor: "#7539FF",
                            color: "white",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            cursor: "pointer"
                        }}

                    >
                        {showFunds ? (
                            <span>
                                <IndianRupee style={{ height: "24px", marginRight: "10px" }} />
                                <strong>{profileData && profileData[0].Balance || "-"}</strong>
                            </span>
                        ) : (
                            <span>
                                <i className="fe fe-eye " style={{ fontSize: "24px", marginRight: "10px" }} />
                                <strong>*****</strong>
                            </span>
                        )}
                        {/* {showFunds && "+"} */}
                    </button>
                </li> : ""}









                <li className="nav-item dropdown  flag-nav dropdown-heads iconclass">
                    <a className="nav-link" data-bs-toggle="dropdown" href="#" role="button">
                        <i className="fe fe-bell" /> <span className="badge rounded-pill" />
                    </a>
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

                        <a className="user-a nav-a d-flex" data-bs-toggle="dropdown" aria-expanded="false" >
                            <span className="user-img">
                                <img
                                    src="assets/img/profiles/avatar-07.jpg"
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
                                <span className="decorative-element">
                                </span>
                            </span>

                        </a>
                        <div className="dropdown-menu dropdown-menu-right mt-1 ms-2" style={{
                            borderRadius: 20
                        }}>
                            <div className="subscription-menu">
                                <ul className="list-unstyled">
                                    <li className='dropdown-item de '>
                                        <label className="theme-switch mb-0">
                                            <input type="checkbox" checked={themeMode === 'dark'} onChange={toggleTheme} />
                                            <span className="slider"></span>
                                        </label>

                                    </li>
                                    <li onClick={() => ProfilePage()}>
                                        <Link className="dropdown-item dev" >
                                            <i class="fa-solid fa-user p-2"></i>Profile
                                        </Link>
                                    </li>
                                    {Role == "ADMIN" || Role === "SUBADMIN" ?
                                        <li>
                                            <Link className="dropdown-item dev" to={Role === "ADMIN" ? "/admin/system" : "/subadmin/system"}>
                                                <i class="fa-solid fa-gear p-2"></i> System
                                            </Link>
                                        </li> : ''}
                                    <li>
                                        <Link className="dropdown-item dev" to="/settings">
                                            <i class="fa-solid fa-gear p-2"></i>   Settings
                                        </Link>
                                    </li>

                                    <li>
                                        <a className="dropdown-item dev" onClick={(e) => LogoutUser(e)}>
                                            <i class="fa-solid fa-right-to-bracket p-2"></i>  Log out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>


                </li>
            </ul>
        </div>
    )
}

export default DropDown;