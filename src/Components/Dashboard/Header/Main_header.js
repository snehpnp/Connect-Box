import React, { useState } from 'react';
import DrapDown from './DrapDown'

const Main_Header = () => {

  
  return (
    <div>
      {/* MAIN TOP HEADER */}
      <div className="header header-one">
        <a
          href="index.html"
          className="d-inline-flex d-sm-inline-flex align-items-center d-md-inline-flex d-lg-none align-items-center device-logo"
        >
          <img
            src="assets/img/logo.png"
            className="img-fluid logo2"
            alt="Logo"
          />
        </a>
        <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
          <div className="logo-white">
            <a href="index.html">
              <img
                src="assets/img/logo-full-white.png"
                className="img-fluid logo-blue"
                alt="Logo"
              />
            </a>
            <a href="index.html">
              <img
                src="assets/img/logo-small-white.png"
                className="img-fluid logo-small"
                alt="Logo"
              />
            </a>
          </div>
          <div className="logo-color">
            <a href="index.html">
              <img
                src="assets/img/logo.png"
                className="img-fluid logo-blue"
                alt="Logo"
              />
            </a>
            <a href="index.html">
              <img
                src="assets/img/logo-small.png"
                className="img-fluid logo-small"
                alt="Logo"
              />
            </a>
          </div>
        </div>
       
  

        <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <img src="assets/img/icons/search.svg" alt="img" />
            </button>
          </form>
        </div>
      
        <a className="mobile_btn" id="mobile_btn">
          <i className="fas fa-bars" />
        </a>

        {/* Drop Down Btn */}
        <DrapDown/>
      </div>

  
      
    </div>
  )
}

export default Main_Header









