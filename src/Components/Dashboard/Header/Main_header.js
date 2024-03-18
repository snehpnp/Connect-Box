import DropDown from './DrapDown'
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
        <a href="javascript:void(0);" id="toggle_btn">
          <span className="toggle-bars">
            <span className="bar-icons" />
            <span className="bar-icons" />
            <span className="bar-icons" />
            <span className="bar-icons" />
          </span>
        </a>
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


        {/* <li className="nav-item dropdown header-profile ">
          <h1>hello</h1>
                <DropDown />
        </li> */}
        
        <ul className="nav nav-tabs user-menu">
          <li className="nav-item dropdown">
            <a
              href="javascript:void(0)"
              className="user-a  nav-a"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  src="assets/img/profiles/avatar-07.jpg"
                  alt="img"
                  className="profilesidebar"
                />
                <span className="animate-circle" />
              </span>
               
              <span className="user-content">
                <span className="user-details">Admin</span>
                <span className="user-name">Chandra Prakash</span>
              </span>
            </a>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilemenu">
                <div className="subscription-menu">
                  <ul>
                    <li>
                      <a className="dropdown-item" href="profile.html">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="settings.html">
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="subscription-logout">
                  <ul>
                    <li className="pb-0">
                      <a className="dropdown-item" href="login.html">
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

  
      
      {/* <Overview /> */}

    </div>
  )
}

export default Main_Header









