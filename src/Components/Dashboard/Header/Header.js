import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './Header_config'; // Assuming Header_config exports admin_header as AdminHeader

const Header = () => {
  const [openSubMenu, setOpenSubMenu] = useState('');

  const toggleSubMenu = (menuTitle) => {
    setOpenSubMenu(openSubMenu === menuTitle ? '' : menuTitle);
  };

  return (
    <div>
      {/* NAVBAR  */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <nav className="greedys sidebar-horizantal">
              <ul className="list-inline-item list-unstyled links">
                {AdminHeader && AdminHeader.map((data) => {
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
