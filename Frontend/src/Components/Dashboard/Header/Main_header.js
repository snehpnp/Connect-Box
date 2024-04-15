import React, { useEffect, useState } from 'react';
import DrapDown from './DrapDown';
import { Link } from 'react-router-dom';

const Main_Header = () => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    // Toggle theme mode
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);

    // Update localStorage
    localStorage.setItem('theme_mode', newThemeMode);
    window.location.reload()
  };

  // Apply theme based on localStorage value on page load
  useEffect(() => {
    const storedThemeMode = localStorage.getItem('theme_mode');
    if (storedThemeMode) {
      setThemeMode(storedThemeMode);
    }
  }, []);

  // Update theme-related attributes on HTML element
  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-sidebar', themeMode);
    htmlElement.setAttribute('data-layout-mode', themeMode);
    htmlElement.setAttribute('data-topbar', themeMode);
  }, [themeMode]);

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
