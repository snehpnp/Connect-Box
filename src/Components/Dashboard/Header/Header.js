// import React, { useEffect } from 'react';
// import Routing from '../../../Routes/Routes';
import { Link } from 'react-router-dom';

import admin_header from './Header_config';
import Overview from '../../../Layouts/User/Overview Hub/Overview';

// const Sidemenu = () => {
//     useEffect(() => {
//         const handleSidebarMenuClick = (e) => {
//             if (e.target.parentElement.classList.contains('submenu')) {
//                 e.preventDefault();
//             }
//             const $this = e.target;
//             const $ul = $this.parentElement.parentElement;
//             const $lis = $ul.getElementsByTagName('li');
//             const $as = $ul.getElementsByTagName('a');

//             if (!$this.classList.contains('subdrop')) {
//                 for (let i = 0; i < $lis.length; i++) {
//                     const li = $lis[i];
//                     const a = $as[i];
//                     if (li !== $this.parentElement) {
//                         li.querySelector('ul').style.display = 'none';
//                         a.classList.remove('subdrop');
//                     }
//                 }
//                 $this.nextElementSibling.style.display = 'block';
//                 $this.classList.add('subdrop');
//             } else if ($this.classList.contains('subdrop')) {
//                 $this.nextElementSibling.style.display = 'none';
//                 $this.classList.remove('subdrop');
//             }
//         };

//         document.querySelectorAll('#sidebar-menu a').forEach((item) => {
//             item.addEventListener('click', handleSidebarMenuClick);
//         });

//         // Cleanup function to remove event listeners
//         return () => {
//             document.querySelectorAll('#sidebar-menu a').forEach((item) => {
//                 item.removeEventListener('click', handleSidebarMenuClick);
//             });
//         };
//     }, []);

//     return null; // React functional component requires a return value
// };

const Header = () => {

  console.log("admin_header", admin_header)

  return (
    <div>

      {/* NAVBAR  */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <nav className="greedys sidebar-horizantal">
              <ul className="list-inline-item list-unstyled as">

                {admin_header && admin_header.map((data) => {



                  return <li className="submenu" key={data.id}>
                    <Link to={data.route}>
                      <i className="fe fe-home" /> <span> {data.name}</span>{" "}
                      <span className="menu-arrow" />
                    </Link>
                    {data.Data.length > 0 ?

                      <ul>
                        <li>
                          <a href="index.html" className="active">
                            Admin Dashboard
                          </a>
                        </li>
                        <li>
                          <a href="index.html" className="active">
                            Admin Dashboard
                          </a>
                        </li>
                        <li>
                          <a href="index.html" className="active">
                            Admin Dashboard
                          </a>
                        </li>
                      </ul>
                      : ""}


                  </li>


                })}




              </ul>

            </nav>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Header
























// <li className="submenu">
// <a href="#">
//   <i className="fe fe-grid" /> <span> Business Essentials</span>{" "}
//   <span className="menu-arrow" />
// </a>

// </li>
// <li className="submenu">
// <a
//   href="#">
//   <i className="fe fe-user" /> <span> Client Management</span>{" "}
//   <span className="menu-arrow" />
// </a>

// </li>
// <li className="submenu">
// <a href="#">
//   <i className="fe fe-users" />
//   <span>Client Onboarding </span> <span className="menu-arrow" />
// </a>

// </li>
// <li className="menu-title">
// <span>Terminate Client </span>
// </li>
// <li className="submenu">
// <a href="#">
//   <i className="fe fe-package" />{" "}
//   <span>Client Portfolio </span>{" "}
//   <span className="menu-arrow" />
// </a>

// </li>
// <li>
// <a href="inventory.html">
//   <i className="fe fe-user" /> <span>Subadmin Model</span>
// </a>
// </li>
// <li className="submenu">
// <a href="#">
//   <i className="fe fe-file-plus" />
//   <span>Sub Partners</span> <span className="menu-arrow" />
// </a>

// </li>
// <li className="menu-title">
// <span>Trade Insights</span>
// </li>
// <li className="submenu">
// <a href="invoices.html">
//   <i className="fe fe-file" /> <span>Signals Insights</span>
//   <span className="menu-arrow" />
// </a>

// </li>
// <li className="submenu">
// <a href="invoices.html">
//   <i className="fe fe-file" /> <span>Trading Log</span>
//   <span className="menu-arrow" />
// </a>

// </li>
// <li className="submenu">
// <a href="invoices.html">
//   <i className="fe fe-file" /> <span>Trade Hub</span>
//   <span className="menu-arrow" />
// </a>

// </li>
// <li className="submenu">
// <a href="invoices.html">
//   <i className="fe fe-file" /> <span>Trade tracker </span>
//   <span className="menu-arrow" />
// </a>

// </li>
// <li className="submenu">
// <a href="invoices.html">
//   <i className="fe fe-file" /> <span> 7- days tracker</span>
//   <span className="menu-arrow" />
// </a>

// </li>