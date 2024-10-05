import React, { useState, useEffect } from "react";
import { GetAllPlanData } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { useDispatch } from "react-redux";
import { Get_All_Catagory } from "../../../ReduxStore/Slice/Subadmin/GroupServicesSlice";

import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import Loader from "../../../Utils/Loader";

function Plans() {
  const dispatch = useDispatch();

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const [searchInput, setSearchInput] = useState("");
  const [allStategy, setAllStategy] = useState({ loading: false, data: [] });
  const [refresh, setrefresh] = useState(false);
  const [purchaasePlan, setPurchasePlan] = useState("");

  useEffect(() => {
    getAllStrategy();
  
  }, [refresh, searchInput]);

  const RefreshHandle = () => {
    setrefresh(!refresh);
    setSearchInput("");
  };

  const getAllStrategy = async () => {
    try {
      var data = { id: user_id };
      const response = await dispatch(GetAllPlanData(data)).unwrap();

      if (response.status) {
        const formattedData = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        setAllStategy({
          loading: true,
          data: searchInput ? formattedData : formattedData,
        });
        setPurchasePlan(response.data1);
      } else {
        setAllStategy({
          loading: true,
          data: [],
        });
      }
    } catch (error) {
      setAllStategy({
        loading: false,
        data: [],
      });
    }
  };

  return (
    <>
      <div className="content container-fluid">
        {/* PAGE HEADER */}
        <div className="card">
          <div className="card-header ">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-title mb-0">
                  <i className=" pe-2 fas fa-chart-line"></i>Plans
                </h5>
              </div>
              <div className="col-auto">
                <div className="list-btn">
                  <ul className="mb-0 filter-list justify-content-lg-end">
                    <li className="">
                      <p
                        className="mb-0 btn-filters"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Refresh"
                        onClick={RefreshHandle}
                      >
                        <span>
                          <i className="fe fe-refresh-ccw" />
                        </span>
                      </p>
                    </li>
                    <li className="serach-li">
                      <div className="input-group input-block">
                        <input
                          type="text"
                          className="form-control "
                          placeholder="Search..."
                          aria-label="Search"
                          aria-describedby="search-addon"
                          onChange={(e) => setSearchInput(e.target.value)}
                          value={searchInput}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="page-content"></div>

            {/* Cards */}
            {allStategy.loading ? (
            <div className="content container-fluid pb-0">
            <div className="row d-flex align-items-center justify-content-center">
              {allStategy.data.map((stg) => {
                const isPurchasedPlan = purchaasePlan === stg._id; 
          
                return (
                  <div
                    key={stg._id}
                    className={`col-sm-12 col-md-6 col-lg-6 col-xl-3 ${
                      isPurchasedPlan ? "purchased-plan" : ""
                    }`} 
                  >
                    <div
                      className="packages card"
                      data-aos="fade-down"
                      style={{
                        border: isPurchasedPlan ? "2px solid #007bff" : "none", 
                        fontWeight: isPurchasedPlan ? "bold" : "normal", 
                        boxShadow: isPurchasedPlan ? "0 0 10px rgba(0,0,0,0.5)" : "none", 
                      }}
                    >
                      <div className="package-header d-flex justify-content-between">
                        <div className="d-flex justify-content-between w-100">
                          <div>
                            <h2 className="my-2">
                              {stg.name} {isPurchasedPlan && <i className="fa-solid fa-check-circle" style={{ color: "#007bff" }}></i>}
                            </h2>
                            Segment:{" "}
                            {stg.segments.length > 0 &&
                              stg.segments.map((data) => {
                                return <span>{data}</span>;
                              })}
                          </div>
                          <span className="icon-frame d-flex align-items-center justify-content-center">
                            <img
                              src={
                                stg.strategy_image
                                  ? stg.strategy_image
                                  : "assets/img/icons/price-01.svg"
                              }
                              alt="img"
                            />
                          </span>
                        </div>
                      </div>
                      {stg.researcher_id != null && (
                        <span>
                          <i>Researcher :</i>{" "}
                          {stg.researcher_id && stg.researcher_id.UserName}
                        </span>
                      )}
                      <div>
                        {stg.Service_Type == 1
                          ? "Service_type: PER TRADE"
                          : stg.Service_Type == 2
                          ? "Service_type: PER TRADE FIXED"
                          : ""}
                      </div>
                      <div className="text-dark">
                        <b>{stg.strategy_description}</b>
                      </div>
                      <h6 style={{ marginBottom: "10px" }}>Plan</h6>
          
                      <ul
                        style={{
                          listStyleType: "none",
                          paddingLeft: "0",
                        }}
                      >
                        <li
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa-solid fa-circle-check"
                            style={{ marginRight: "10px" }}
                          ></i>
                          <span>Type</span>
                          <span style={{ marginLeft: "auto", color: "#999" }}>
                            {" "}
                            {stg.type}
                          </span>
                        </li>
          
                        <li
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa-solid fa-circle-check"
                            style={{ marginRight: "10px" }}
                          ></i>
                          <span>Max Trade</span>
                          <span style={{ marginLeft: "auto", color: "#999" }}>
                            {" "}
                            {stg.max_trade}
                          </span>
                        </li>
          
                        <li
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa-solid fa-circle-check"
                            style={{ marginRight: "10px" }}
                          ></i>
                          <span>Monthly Price</span>
                          <span style={{ marginLeft: "auto", color: "#999" }}>
                            {" "}
                            {stg.monthlyPrice}
                          </span>
                        </li>
                        <li
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa-solid fa-circle-check"
                            style={{ marginRight: "10px" }}
                          ></i>
                          <span>Quarterly Price</span>
                          <span style={{ marginLeft: "auto", color: "#999" }}>
                            {" "}
                            {stg.quaterlyPrice}
                          </span>
                        </li>
                        <li
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa-solid fa-circle-check"
                            style={{ marginRight: "10px" }}
                          ></i>
                          <span>Half Yearly Price</span>
                          <span style={{ marginLeft: "auto", color: "#999" }}>
                            {" "}
                            {stg.halfYearlyPrice}
                          </span>
                        </li>
                        <li
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa-solid fa-circle-check"
                            style={{ marginRight: "10px" }}
                          ></i>
                          <span>Yearly Price</span>
                          <span style={{ marginLeft: "auto", color: "#999" }}>
                            {" "}
                            {stg.yealryPrice}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
            ) : (
              <Loader />
            )}

            <nav aria-label="Page navigation example">
              <ul className="pagination d-flex justify-content-center">
                <li className="page-item">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link">Next</a>
                </li>
              </ul>
            </nav>

            <ToastButton />
          </div>
          <ToastButton />
        </div>
      </div>
    </>
  );
}

export default Plans;
