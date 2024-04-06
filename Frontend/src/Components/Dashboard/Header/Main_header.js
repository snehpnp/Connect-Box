import React, { useEffect, useState } from 'react';
import DrapDown from './DrapDown';
import Loader from "../../../Utils/Loader";


const Main_Header = () => {
  // State to manage theme mode

  return (
    <div>
      <div className="header header-one">

        <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
          <div className="logo-white">
            <a href="index.html">
              <img
                src="https://www.pnpuniverse.com/images/logo/pnp.png"
                className="img-fluid logo-blue"
                alt="Logo"
              />

            </a>
            <a href="index.html">
              <img
                src="https://www.pnpuniverse.com/images/logo/pnp.png"
                className="img-fluid logo-small"
                alt="Logo"
              />
            </a>
          </div>
          <div className="logo-color">
            <a href="index.html">
              <img
                src="https://www.pnpuniverse.com/images/logo/pnp.png"
                className="img-fluid logo-blue"
                alt="Logo"
              />
            </a>
            <a href="index.html">
              <img
                src="https://www.pnpuniverse.com/images/logo/pnp.png"
                className="img-fluid logo-small"
                alt="Logo"
              />
            </a>
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
