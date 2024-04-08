import React, { useEffect, useState } from 'react';
import DrapDown from './DrapDown';

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
