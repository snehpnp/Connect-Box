import React, { useState, useRef, useEffect } from 'react';


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
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

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
                    <div className={`dropdown-menu menu-drop-user ${isDropdownOpen ? 'show' : ''}`}>
                        <div className="profilemenu">
                            <div className="subscription-menu">
                                <ul>
                                    <li>
                                        <a className="dropdown-item" href="profile.html">
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="settings.html">
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="subscription-logout">
                                <ul>
                                    <li className="pb-0">
                                        <a className="dropdown-item" href="login.html">
                                            Log Out
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

export default DropDown