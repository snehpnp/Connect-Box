import React, { useEffect } from 'react';
import DrapDown from './DrapDown';

const Main_Header = () => {
  // Define toggleTheme function
  const toggleTheme = () => {
    const htmlElement = document.querySelector('html');
    const currentSidebar = htmlElement.getAttribute('data-sidebar');
    const currentLayoutMode = htmlElement.getAttribute('data-layout-mode');
    const currentTopBarMode = htmlElement.getAttribute('data-topbar');

    // Toggle data-sidebar attribute
    if (currentSidebar === 'light') {
      htmlElement.setAttribute('data-sidebar', 'dark');
    } else {
      htmlElement.setAttribute('data-sidebar', 'light');
    }

    // Toggle data-layout-mode attribute
    if (currentLayoutMode === 'light') {
      htmlElement.setAttribute('data-layout-mode', 'dark');
    } else {
      htmlElement.setAttribute('data-layout-mode', 'light');
    }

    // Toggle data-topbar attribute
    if (currentTopBarMode === 'light') {
      htmlElement.setAttribute('data-topbar', 'dark');
    } else {
      htmlElement.setAttribute('data-topbar', 'light');
    }

    // Update localStorage value
    localStorage.setItem('theme_mode', htmlElement.getAttribute('data-sidebar'));

window.location.reload()

  };

  // Apply theme based on localStorage value on page load
  useEffect(() => {
    const themeMode = localStorage.getItem('theme_mode');
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-sidebar', themeMode);
    htmlElement.setAttribute('data-layout-mode', themeMode);
    htmlElement.setAttribute('data-topbar', themeMode);
  }, []);

  return (
    <div>
      {/* MAIN TOP HEADER */}
      <div className="header header-one">

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

        <label class="theme-switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span class="slider"></span>
        </label>

        {/* Drop Down Btn */}
        <DrapDown />
        
      </div>
    </div>
  );
};

export default Main_Header;
