import React from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './Header_config'; // Assuming Header_config exports admin_header as AdminHeader

const Header = () => {
  return (
    <div>
      {/* NAVBAR  */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <nav className="greedys sidebar-horizantal">
              <ul className="list-inline-item list-unstyled as">
                {AdminHeader && AdminHeader.map((data) => {
                  return (
                    <li className="submenu" key={data.id}>
                      <Link to={data.route}>
                        <i className="fe fe-home" /> <span> {data.name}</span>{" "}
                        <span className="menu-arrow" />
                      </Link>
                      {data.Data.length > 0 && (
                        <ul>
                          {data.Data.map((item) => (
                            <li key={item.id}>
                              <Link to={item.route} className="active">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
