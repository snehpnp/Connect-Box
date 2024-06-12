import React, { useEffect, useState } from "react";
import DrapDown from "./DrapDown";
import { Link } from "react-router-dom";

const Main_Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add("slide-nav");
    } else {
      document.body.classList.remove("slide-nav");
    }
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      {/* MAIN TOP HEADER */}
      <div className="header header-one">
        <a className="mobile_btn" id="mobile_btn" onClick={toggleNav}>
          <i className="fas fa-bars"></i>
        </a>
        <div className="main-logo d-inline float-start d-lg-flex align-items-center">
          <div className="logo-white">
            <img
              src="assets/img/pnp.png"
              className="img-fluid logo-blue"
              alt="Logo"
            />

            <img
              src="assets/img/pnp.png"
              className="img-fluid logo-small"
              alt="Logo"
            />
          </div>
          <div className="logo-color">
            <Link to="/admin/dashboard">
              <img
                src="assets/img/pnp.png"
                className="img-fluid logo-blue"
                alt="Logo"
              />
            </Link>
            <Link to="/admin/dashboard">
              <img
                src="assets/img/pnp.png"
                className="img-fluid logo-small"
                alt="Logo" 
              />
            </Link>
          </div>
        </div>
   

        <div className="nav-item  has-arrow dropdown-heads ">
          <DrapDown />
        </div>
      </div>
    </div>
  );
};

export default Main_Header;
