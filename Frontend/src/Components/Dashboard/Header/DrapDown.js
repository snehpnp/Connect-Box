import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DropDown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    var Role = JSON.parse(localStorage.getItem("user_details")).Role
    var UserNAme = JSON.parse(localStorage.getItem("user_details")).UserName



    const LogoutUser = (e) => {
        e.stopPropagation(); // Stop event propagation
        console.log("LogoutUser function is called");
        localStorage.clear();
        window.location.reload();
    };
    const [themeMode, setThemeMode] = useState('light');

    // Define toggleTheme function
    const toggleTheme = () => {

        const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newThemeMode);

        localStorage.setItem('theme_mode', newThemeMode);

        setTimeout(() => {
            window.location.reload();
        }, 200);
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
                <li className="nav-item dropdown ">
                    <button type="button" data-bs-dismiss="modal" class="btn btn-primary cancel-btn me-2"><i class="fas fa-plus me-1"></i> Wallet</button>
                   </li>
                <li className='nav-item dropdown  dropdown-heads'>
                    <label className="theme-switch mb-0">
                        <input type="checkbox" checked={themeMode === 'dark'} onChange={toggleTheme} />
                        <span className="slider"></span>
                    </label>

                </li>

                <li className="nav-item dropdown  flag-nav dropdown-heads">
                    <a className="nav-link" data-bs-toggle="dropdown" href="#" role="button">
                        <i className="fe fe-bell" /> <span className="badge rounded-pill" />
                    </a>
                    <div className="dropdown-menu notifications">
                        <div className="topnav-dropdown-header">
                            <div className="notification-title">
                                Notifications <a href="notifications.html">View all</a>
                            </div>
                            <a
                                href="javascript:void(0)"
                                className="clear-noti d-flex align-items-center"
                            >
                                Mark all as read <i className="fe fe-check-circle" />
                            </a>
                        </div>
                        <div className="noti-content">
                            <ul className="notification-list">
                                <li className="notification-message">
                                    <a href="profile.html">
                                        <div className="d-flex">
                                            <span className="avatar avatar-md active">
                                                <img
                                                    className="avatar-img rounded-circle"
                                                    alt="avatar-img"
                                                    src="assets/img/profiles/avatar-02.jpg"
                                                />
                                            </span>
                                            <div className="media-body">
                                                <p className="noti-details">
                                                    <span className="noti-title">Lex Murphy</span> requested
                                                    access to{" "}
                                                    <span className="noti-title">
                                                        UNIX directory tree hierarchy
                                                    </span>
                                                </p>
                                                <div className="notification-btn">
                                                    <span className="btn btn-primary">Accept</span>
                                                    <span className="btn btn-outline-primary">Reject</span>
                                                </div>
                                                <p className="noti-time">
                                                    <span className="notification-time">Today at 9:42 AM</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="notification-message">
                                    <a href="profile.html">
                                        <div className="d-flex">
                                            <span className="avatar avatar-md active">
                                                <img
                                                    className="avatar-img rounded-circle"
                                                    alt="avatar-img"
                                                    src="assets/img/profiles/avatar-10.jpg"
                                                />
                                            </span>
                                            <div className="media-body">
                                                <p className="noti-details">
                                                    <span className="noti-title">Ray Arnold</span> left 6
                                                    comments{" "}
                                                    <span className="noti-title">
                                                        on Isla Nublar SOC2 compliance report
                                                    </span>
                                                </p>
                                                <p className="noti-time">
                                                    <span className="notification-time">
                                                        Yesterday at 11:42 PM
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="notification-message">
                                    <a href="profile.html">
                                        <div className="d-flex">
                                            <span className="avatar avatar-md">
                                                <img
                                                    className="avatar-img rounded-circle"
                                                    alt="avatar-img"
                                                    src="assets/img/profiles/avatar-13.jpg"
                                                />
                                            </span>
                                            <div className="media-body">
                                                <p className="noti-details">
                                                    <span className="noti-title">Dennis Nedry</span> commented
                                                    on{" "}
                                                    <span className="noti-title">
                                                        {" "}
                                                        Isla Nublar SOC2 compliance report
                                                    </span>
                                                </p>
                                                <blockquote>
                                                    “Oh, I finished de-bugging the phones, but the system's
                                                    compiling for eighteen minutes, or twenty. So, some minor
                                                    systems may go on and off for a while.”
                                                </blockquote>
                                                <p className="noti-time">
                                                    <span className="notification-time">
                                                        Yesterday at 5:42 PM
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="notification-message">
                                    <a href="profile.html">
                                        <div className="d-flex">
                                            <span className="avatar avatar-md">
                                                <img
                                                    className="avatar-img rounded-circle"
                                                    alt="avatar-img"
                                                    src="assets/img/profiles/avatar-05.jpg"
                                                />
                                            </span>
                                            <div className="media-body">
                                                <p className="noti-details">
                                                    <span className="noti-title">John Hammond</span> created{" "}
                                                    <span className="noti-title">
                                                        Isla Nublar SOC2 compliance report
                                                    </span>
                                                </p>
                                                <p className="noti-time">
                                                    <span className="notification-time">
                                                        Last Wednesday at 11:15 AM
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="topnav-dropdown-footer">
                            <a href="#">Clear All</a>
                        </div>
                    </div>
                </li>
                <li className="nav-item  has-arrow dropdown-heads ">
                    <a href="javascript:void(0);" className="win-maximize">
                        <i className="fe fe-maximize" />
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
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="subscription-menu">
                                <ul>
                                    <li>
                                        <Link className="dropdown-item dev" to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item dev" to="/settings">
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <a className="dropdown-item dev" onClick={(e) => LogoutUser(e)}>
                                            Log out
                                        </a>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: "144px" }} className={`dropdown-menu menu-drop-user ${isDropdownOpen ? 'show' : ''}`}>
                        <div className="profilemenu table table-hover">
                            <div className="subscription-menu">
                                <ul>
                                    <li>
                                        <Link className="dropdown-item dev" to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item dev" to="/settings">
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <a className="dropdown-item dev" onClick={(e) => LogoutUser(e)}>
                                            Log out
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
