import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  admin_header,
  subamdin_header,
  User_header,
  employee_header,
  superadmin_header,
  research_header,
} from "./Header_config";

const Header = () => {
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const roles = JSON.parse(localStorage.getItem("user_role"));
  const user_details = JSON.parse(localStorage.getItem("user_details"));

  useEffect(() => {
    const clearSession = async () => {
      if (user_details?.token) {
        const decodedToken = JSON.parse(atob(user_details.token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          localStorage.clear();
          setTimeout(() => navigate("/"), 1000);
        }
      } else {
        window.location.reload();
      }
    };

    clearSession();
  }, [navigate, user_details]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const getHeaderData = () => {
    switch (roles) {
      case "ADMIN":
        return admin_header;
      case "SUBADMIN":
        return subamdin_header;
      case "USER":
        return User_header;
      case "EMPLOYEE":
        return employee_header;
      case "SUPERADMIN":
        return superadmin_header;
      case "RESEARCH":
        return research_header;
      default:
        return [];
    }
  };

  let headerData = getHeaderData();

  if (user_details?.subadmin_service_type == 2) {
    headerData = headerData.filter(column => column.name !== "Trade Charges");
  }

  const toggleSubMenu = (menuTitle) => {
    setOpenSubMenu(openSubMenu === menuTitle ? "" : menuTitle);
  };

  const closeNav = () => {
    document.body.classList.remove("slide-nav");
  };


  const toggleNav = (data) => {
    if (data.Data.length == 0) {
      document.body.classList.remove("slide-nav");
    }
  };


  const toggleNav1 = (item) => {
    document.body.classList.remove('slide-nav');
  };
  
  const handleLinkClick = (id) => {
    setActiveLink(id);
  };

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <nav className="greedys sidebar-horizantal">
            <ul className="list-inline-item list-unstyled links">
              {headerData.flat().map(data => (
                <li
                  className="submenu"
                  key={data.id}
                  onMouseEnter={() => toggleSubMenu(data.id)}
                  onMouseLeave={() => setOpenSubMenu("")}
                  style={{ padding: "5px" }}
                >
                  <Link
                    to={data.route}
                    className={`${openSubMenu === data.id ? "subdrop" : ""} ${activeLink === data.route ? "active" : ""}`}
                    style={{ textDecoration: "none", color: "inherit" }}

                    onClick={() => {
                      handleLinkClick(data.id);
                      toggleNav(data);
                      // closeNav()
                    }}
                  >
                    <i className={data.Icon} id="animated-icon"></i>
                    <span>{data.name}</span>
                    {data.Data.length > 0 && <span className="menu-arrow"></span>}
                  </Link>
                  {data.Data.length > 0 && (
                    <ul style={{ display: openSubMenu === data.id ? "block" : "none" }}>
                      {data.Data.map(item => (
                        <li key={item.id}>
                          <Link
                            to={item.route}
                            className={activeLink === item.route ? "active" : ""}
                            style={{ textDecoration: "none", color: "inherit" }}

                            onClick={() => {
                              toggleNav1(item);
                              // closeNav()
                            }}
                          >
                            <i className={item.Icon} id="animated1-icon"></i>
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
