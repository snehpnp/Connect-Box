import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DropDown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const LogoutUser = (e) => {
        e.stopPropagation(); // Stop event propagation
        console.log("LogoutUser function is called");
        localStorage.clear();
        window.location.reload();
    };

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);  

    return (
        <div className="mb-0 dropdown custom-dropdown">
            <ul className="nav nav-tabs user-menu">
                <li className="nav-item dropdown">
                    <a
                        className="user-a nav-a"
                        onClick={toggleDropdown}
                        ref={dropdownRef}
                    >
                        <span className="user-img">
                            <img
                                src="assets/img/profiles/avatar-07.jpg"
                                alt="img"
                                className="profilesidebar"
                            />
                            <span className="animate-circle" />
                        </span>

                        <span className="user-content"  >
                            <span className="user-details">Admin</span>
                            <span className="user-name">Chandra Prakash</span>
                        </span>
                    </a>
                    <div style={{ height: "144px" }} className={`dropdown-menu menu-drop-user ${isDropdownOpen ? 'show' : ''}`}>
                        <div className="profilemenu table table-hover">
                            <div className="subscription-menu">
                                <ul>
                                    <li>
                                        <Link className="dropdown-item dev" to="/Admin/profile">
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
