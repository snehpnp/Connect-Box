import React, { useEffect, useState } from 'react';
import DrapDown from './DrapDown';
import { Link } from 'react-router-dom';

const Main_Header = () => {


  return (
    <div>
      {/* MAIN TOP HEADER */}
      <div className="header header-one">

        <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
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



        {/* Toggle theme switch */}



        <div className="nav-item  has-arrow dropdown-heads ">
          <DrapDown />

        </div>





      </div>
    </div>
  );
};

export default Main_Header;
