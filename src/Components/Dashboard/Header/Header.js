import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { admin_header, subamdin_header } from './Header_config'; // Assuming Header_config exports admin_header as AdminHeader

const Header = () => {


  const roles = JSON.parse(localStorage.getItem('user_role'))
  const gotodashboard = JSON.parse(localStorage.getItem('gotodashboard'))
  const user_role_goTo = JSON.parse(localStorage.getItem('user_role_goTo'))
  const user_ID = JSON.parse(localStorage.getItem("user_details")).user_id
  const token = JSON.parse(localStorage.getItem("user_details")).token

  const [openSubMenu, setOpenSubMenu] = useState('');


  const toggleSubMenu = (menuTitle) => {
    setOpenSubMenu(openSubMenu === menuTitle ? '' : menuTitle);
  };

  var HeaderData = []

  if (roles == "ADMIN") {
    HeaderData.push(admin_header)

  } else if (roles == "SUBADMIN") {
    HeaderData.push(subamdin_header)

  }

  console.log("HeaderData", HeaderData.flat())

  return (
    <div>
      {/* NAVBAR  */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <nav className="greedys sidebar-horizantal">
              <ul className="list-inline-item list-unstyled links">

                {HeaderData.flat() && HeaderData.flat().map((data) => {
                  const isOpen = openSubMenu === data.id;

                  return (
                    <li className='submenu' key={data.id}>
                      <Link to={data.route} onClick={() => toggleSubMenu(data.id)} className={openSubMenu === data.id ? 'subdrop' : ''}>
                        <i className="fe fe-home"></i> <span> {data.name}</span> <span className="menu-arrow"></span>
                      </Link>

                      <ul style={{ display: openSubMenu === data.id ? 'block' : 'none' }}>
                        {data.Data.map((item) => (
                          <li key={item.id}>
                            <Link to={item.route} className="active">
                              {item.name}
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
