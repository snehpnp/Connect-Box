import React, { useEffect, useState } from "react";
import DrapDown from "./DrapDown";
import { Link } from "react-router-dom";
import $ from "jquery";
import useGetCompany from "../../../Utils/ConnectSocket";

const Main_Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [logodata, setLogodata] = useState("");


  const getCompany = useGetCompany();

  const getCompanyData = async () => {
    const companyData = await getCompany();
    // console.log("companyData",companyData)

    if (companyData.length > 0) {
      setLogodata(companyData[0].logo)
      $('#titlecontent').html(companyData[0].panel_name);
      $('#favicondata').attr('href', companyData[0].favicon);
      $('.img-fluid.logo-blue').attr('src', `data:image/png;base64,${companyData[0].favicon}`);
      $('.img-fluid.logo-small').attr('src', `data:image/png;base64,${companyData[0].favicon}`);



    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

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
              src={logodata && logodata}
              className="img-fluid logo-blue"
              alt="Logo"
            />
            <img
              src={logodata && logodata}
              className="img-fluid logo-small"
              alt="Logo"
            />
          </div>
          <div className="logo-color">
            <Link to="/admin/dashboard">
              <img
                src={logodata && logodata}
                className="img-fluid logo-blue"
                alt="Logo"
              />
            </Link>
            <Link to="/admin/dashboard">
              <imgdsssssx
                src={logodata && logodata}
                className="img-fluid logo-small"
                alt="Logo"
              />
            </Link>
          </div>
        </div>

        <div className="nav-item has-arrow dropdown-heads">
          <DrapDown />
        </div>
      </div>
    </div>
  );
};

export default Main_Header;
