import React from "react";
import { Link } from "react-router-dom";

const Content = ({
  Page_title,
  button_title,
  Card_title,
  Card_title_icon,
  Content,
  route,
  ...rest
}) => {

  return (
    <div className="content container-fluid ">
    
      <div className="card flex-fill bg-white">
        <div className="card-header d-flex justify-content-between align-items-center border-bottom">
          <h5 className="card-title mb-0 w-auto">
            {Page_title}
            
            {Card_title_icon ? <><i className={Card_title_icon}> </i> {Card_title}</> : ""}
          
          </h5>
          <div className="pay-btn text-end w-auto">
            {button_title ? (
              <button className="btn btn-primary ">
                <Link to={route} style={{ padding: "10px !important" }}>
                  <i
                    className={`fa-solid  ${
                      button_title === "Back" ? "fa-arrow-left" : "fa-plus"
                    } `}
                  ></i>{" "}
                  {button_title}
                </Link>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="card-body card-buttons">
          <p className="card-text">{Content}</p>
        </div>

        {/* <div className="card-footer text-muted">This is my footer</div> */}
      </div>
    </div>
  );
};

export default Content;
