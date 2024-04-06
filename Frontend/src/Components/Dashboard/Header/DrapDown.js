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

    const [isFullScreen, setIsFullScreen] = useState(false);

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

    return (

        <div className="mb-0 dropdown custom-dropdown">

            <ul className="nav nav-tabs user-menu">
<<<<<<< HEAD
                <li className="nav-item  has-arrow dropdown-heads wallet mt-2">
                    <input className='form-control' type='number' placeholder='current balance' />
=======
                <li className="nav-item dropdown ">
                    <button type="button" data-bs-dismiss="modal" class="btn btn-primary cancel-btn me-2"><i class="fas fa-plus me-1"></i> Wallet</button>
                   </li>
                <li className='nav-item dropdown  dropdown-heads'>
                    <label className="theme-switch mb-0">
                        <input type="checkbox" checked={themeMode === 'dark'} onChange={toggleTheme} />
                        <span className="slider"></span>
                    </label>

>>>>>>> 3c70452185f908dfbc626fe958800bf271f51725
                </li>

                <li className="nav-item dropdown  flag-nav dropdown-heads">
                    <a className="nav-link" data-bs-toggle="dropdown" href="#" role="button">
                        <i className="fe fe-bell" /> <span className="badge rounded-pill" />
                    </a>
                </li>
                <li className="nav-item  has-arrow dropdown-heads ">
                    <a onClick={toggleFullScreen} className="win-maximize">
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
