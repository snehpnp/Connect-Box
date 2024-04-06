import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { admin_header, subamdin_header, User_header } from './Header_config'; 

import { useNavigate } from "react-router-dom";

const Header = () => {
  const roles = JSON.parse(localStorage.getItem('user_role'))
  const [openSubMenu, setOpenSubMenu] = useState('');

  const navigate = useNavigate();



  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const token = JSON.parse(localStorage.getItem("user_details")).token;

  const toggleSubMenu = (menuTitle) => {
    setOpenSubMenu(openSubMenu === menuTitle ? '' : menuTitle);
  };

  var HeaderData = []

  if (roles === "ADMIN") {
    HeaderData.push(admin_header)
  } else if (roles === "SUBADMIN") {
    HeaderData.push(subamdin_header)
  } else if (roles === "USER") {
    HeaderData.push(User_header)
  }



  const ClearSession = async () => {
 
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds


      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_details");
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 1000);
        console.log('Expired token cleared.');
      }
    }


  };

  useEffect(() => {
    ClearSession();
  }, []);


  return (
    <div>
      {/* NAVBAR */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <nav className="greedys sidebar-horizantal">
              <ul className="list-inline-item list-unstyled links">
                {HeaderData.flat() && HeaderData.flat().map((data) => {
                  const isOpen = openSubMenu === data.id;

                  return (
                    <li className='submenu' key={data.id} onMouseEnter={() => toggleSubMenu(data.id)} onMouseLeave={() => setOpenSubMenu('')}>
                      <Link
                        to={data.route}
                        className={openSubMenu === data.id ? 'subdrop' : ''}
                        style={{ textDecoration: 'none', color: 'inherit' }} // Add inline style to remove underline and retain original color
                      >
                        <i className={data.Icon}></i> <span> {data.name}</span> {data.Data.length > 0 ? <span className="menu-arrow"></span> : ""}
                      </Link>

                      <ul style={{ display: openSubMenu === data.id ? 'block' : 'none' }}>
                        {data.Data.map((item) => (
                          <li key={item.id}>
                            <Link to={item.route} className="active">
                              <i className={item.Icon}></i> <span> {item.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
