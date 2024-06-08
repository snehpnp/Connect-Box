import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllclientDetails, UPDATE_CLIENT_SERVICE_DATA, statusUpdate} from "../../../ReduxStore/Slice/Users/ClientServiceSlice";
import { SquarePen } from "lucide-react";
import Swal from "sweetalert2";
import { Userinfo,Trading_Off_Btn} from "../../../ReduxStore/Slice/Comman/Userinfo";
import { loginWithApi } from "../../../Utils/log_with_api";
import { ipAddress } from "../../../Utils/Ipaddress";


function Clientservice() {
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const [getAllClientService, setAllClientService] = useState({
    loading: false,
    data: [],
  });

  const [getAllClientStrategy, setAllClientStrategy] = useState({
    loading: false,
    data: [],
  });

  const [ip, setIp] = useState(null);

  const [getLoginStatus, setLoginStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [showstrategy, setShowStretgy] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [profileData, setProfileData] = useState([]);

  const [data, setData] = useState({
    maxQty: "",
    orderType: "",
    productType: "",
    seriveId: "",
    id: "",
    strategyId: [],
    quantity: "",
    serviceName: "",
  });



  const fetchData = async () => {
    try {
      let data = { id: user_id };

      await dispatch(Userinfo(data))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            setProfileData({
              loading: true,
              data: response.data,
            });
            if (response.data[0].TradingStatus == "on") {
              setLoginStatus(true);
            } else {
              setLoginStatus(false);
            }
          } else {
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } catch (error) { }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // status update active
  const ActiveStatus = async (item, e) => {
    try {
      let data = {
        user_id: user_id,
        service_id: item.service._id,
        active_status: e.checked ? "1" : "0",
      };

      const response = await dispatch(statusUpdate(data)).unwrap();

      if (response.status) {
        if (e.checked) {
          Swal.fire({
            title: "Trading On",  
            icon: "success",
            html: "Your trading has been successfully activated.",
          });
        } else {
          Swal.fire({
            title: "Trading Off",
            icon: "success",
            html: "Your trading has been successfully deactivated.",
          });
        }

        setRefresh(!refresh);
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          html: "Failed to update trading status.",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const LogIn_WIth_Api = (check, brokerid, tradingstatus, UserDetails) => {
    if (check) {
      loginWithApi(brokerid, UserDetails,ip);
    } else {
      handleTradingOff(user_id);
    }
  };

  // LOGOUT TRADING
  const handleTradingOff = async (id) => {
    let data = { id: id, system_ip: ip };

    await dispatch(Trading_Off_Btn(data))
      .unwrap()
      .then((response) => {
        setRefresh(!refresh);
        if (response.status) {
          Swal.fire({
            title: "Trading Off Successfully!",
            icon: "success",
            html: "Your trading has been successfully completed.",
          });
        } else {
        }
      })
      .catch((error) => {
        console.log("Trading Off Error", error);
      });
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => {
      if (key === "strategyId") {
        if (prevData.strategyId.includes(value)) {
          // If the value already exists, filter it out
          return {
            ...prevData,
            strategyId: prevData.strategyId.filter((item) => item !== value),
          };
        } else {
          // If the value doesn't exist, add it
          return {
            ...prevData,
            strategyId: [...prevData.strategyId, value],
          };
        }
      } else {
        // For other keys, update the state as usual
        return {
          ...prevData,
          [key]: value,
        };
      }
    });
  };

  const emptyState = () => {
    setData({
      maxQty: "",
      orderType: "",
      productType: "",
      seriveId: "",
      id: "",
      strategyId: [],
      quantity: "",
      serviceName: "",
    });
    setRefresh(!refresh);
  };

  const GetAllClientServiceDetails = async () => {
    var data = { user_Id: user_id };
    await dispatch(GetAllclientDetails(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          const filterData = response.services.filter((item) => {
            const searchInputMatch =
              searchInput == "" ||
              item.service.name
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            return searchInputMatch;
          });

          setAllClientStrategy({
            loading: true,
            data: response,
          });

          setAllClientService({
            loading: true,
            data: filterData,
          });
        } else {
          setAllClientService({
            loading: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error is found in finding client service detail", error);
      });
  };

  useEffect(() => {
    GetAllClientServiceDetails();
  }, [refresh, searchInput]);

  const handleOnSubmit = async () => {
    const req = {
      strategyId: data.strategyId,
      maxQty: data.maxQty,
      orderType: data.orderType,
      productType: data.productType,
      userId: user_id,
      id: data && data.id,
      seriveId: data && data.seriveId,
    };

    await dispatch(UPDATE_CLIENT_SERVICE_DATA(req))
      .unwrap()
      .then((response) => {
        if (response.status) {
          Swal.fire({
            title: "Updated Successful!",
            text: response.msg,
            icon: "success",
            timer: 800,
            timerProgressBar: true,
          });
          setModal(!modal);
          emptyState();
        } else {
          setModal(!modal);
          emptyState();
        }
      })
      .catch((error) => {
        console.log("Error is found in finding client service detail", error);
      });
  };

  const RefreshHandle = () => {
    setRefresh(!refresh);
    setSearchInput("");
    fetchData();
  };

  const colors = [
    "navy",
    "teal",
    "green",
    "crimson",
    "musturd",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
    "navy",
    "teal",
    "green",
    "crimson",
  ];

  // FIND IP ADDRESS
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ip = await ipAddress();
        setIp(ip);
      } catch (error) {
        console.error("Failed to fetch IP address:", error);
      }
    };

    fetchIP();

    // Clean up function
    return () => { };
  }, [refresh]);

  return (
    <>
      <div className="content container-fluid" data-aos="fade-left">
        {/* PAGE HEADER */}
        <div className="card">
          <div className="card-header">
            <div className="row align-center">
              <div className="col">
                <h5 className="card-title mb-0">
                  <i className="pe-2 fa-solid fa-users"></i>All Users
                </h5>
              </div>
              <div className="col-auto">
                <div className="list-btn">
                  <ul className="filter-list mb-0">
                    {/* <li className="toggle-li">
                      <div
                        className="status-toggle "
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span
                          className={
                            getLoginStatus
                              ? "bg-success-light px-2"
                              : "px-2 bg-danger-light"
                          }
                          style={{}}
                        >
                          Trading Status
                        </span>
                        <input
                          id="1"
                          className="check"
                          type="checkbox"
                          onChange={(e) =>
                            LogIn_WIth_Api(
                              e.target.checked,
                              profileData && profileData.data[0].broker,
                              profileData && profileData.data[0].TradingStatus,
                              profileData && profileData.data[0]
                            )
                          }
                          checked={getLoginStatus}
                          style={{ marginRight: "5px" }}
                        />
                        <label
                          htmlFor="1"
                          className="checktoggle checkbox-bg"
                        ></label>
                      </div>
                    </li> */}

                    <li className="">
                      <p
                        className="btn-filters mb-0"
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
                          className="form-control"
                          placeholder="Search..."
                          aria-label="Search"
                          aria-describedby="search-addon"
                          onChange={(e) => setSearchInput(e.target.value)}
                          value={searchInput}
                        />
                      </div>
                    </li>

                    {/* <li className="btn btn-primary">
                      <i className="fa fa-filter me-2" aria-hidden="true" />{" "}
                     
                      Filter
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <section className="pricing-section pt-3 px-5">
              <div className="outer-box">
                <div className="row">
                  {/* Pricing Block */}

                  {getAllClientService.data &&
                    getAllClientService.data.map((item, index) => {
                      var randomColor = colors[index];
                      if (item.active_status == 0) {
                        randomColor = "red";
                      }

                      return (
                        <div
                          key={index}
                          className="pricing-block col-lg-3 col-md-6 col-sm-12 wow fadeInUp"
                        >
                          <div
                            className="inner-box"
                            style={{ borderBottom: "8px solid " + randomColor }}
                          >
                            <div className="price-box d-flex align-items-center justify-content-between">
                              <div className="title">{item.service.name}</div>
                              <div
                                className="stock-edit-icon bg-primary-light"
                                onClick={(e) => {
                                  setModal(!modal);
                                  setData({
                                    maxQty: item.lot_size,
                                    orderType: item.order_type,
                                    productType: item.product_type,
                                    seriveId: item.service._id,
                                    id: item._id,
                                    strategyId: item.strategy_id,
                                    quantity: item.quantity,
                                    serviceName: item.service.name,
                                  });
                                }}
                              >
                                <SquarePen />
                              </div>
                            </div>
                            <ul className="features">
                              <li className="true">
                                <div className="d-flex justify-content-between">
                                  <p>Lots:</p>
                                  {/* <p>{Number(item.lot_size) * Number(item.quantity)}</p> */}
                                  <p>{Number(item.lot_size)}</p>
                                </div>
                              </li>
                              <li className="true">
                                <div className="d-flex justify-content-between">
                                  <p>Strategy:</p>
                                  <select
                                    className="default-select wide form-control"
                                    id="validationCustom05"
                                    style={{ width: "150px" }}
                                  >
                                    {getAllClientStrategy.data.strategy &&
                                      getAllClientStrategy.data.strategy.map(
                                        (data1, index) => {
                                          if (
                                            item.strategy_id.includes(
                                              data1.result._id
                                            )
                                          ) {
                                            return (
                                              <option
                                                key={data1.result._id}
                                                value={
                                                  data1.result.strategy_name
                                                }
                                                style={{ color: "green" }}
                                              >
                                                {data1.result.strategy_name}
                                              </option>
                                            );
                                          }
                                          return null; // Skip rendering if not green
                                        }
                                      )}
                                  </select>
                                </div>
                              </li>

                              <li className="true">
                                <div className="d-flex justify-content-between">
                                  <p>Order Type:</p>
                                  <p>
                                    {item.order_type == 1
                                      ? "MARKET"
                                      : item.order_type == 2
                                        ? "LIMIT"
                                        : item.order_type == 3
                                          ? "STOPLOSS LIMIT"
                                          : item.order_type == 4
                                            ? "STOPLOSS MARKET"
                                            : "MARKET"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex justify-content-between">
                                  <p>Product Type:</p>
                                  <p>
                                    {item.product_type == 1
                                      ? "CNC"
                                      : item.product_type == 2
                                        ? "MIS"
                                        : item.product_type == 3
                                          ? "BO"
                                          : item.product_type == 4
                                            ? "CO"
                                            : "CNC"}
                                  </p>
                                </div>
                              </li>
                            </ul>
                            <div className=" price">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => ActiveStatus(item, e.target)}
                                  defaultChecked={
                                    item.active_status == 1 ? true : false
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {modal && (
        <div
          className="modal custom-modal d-block"
          id="add_vendor"
          role="dialog"
          data-aos="fade-down"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Edit Stock List</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => {
                    setModal(!modal);
                    emptyState();
                  }}
                ></button>
              </div>
              <div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 mb-3">
                      <h6 style={{ fontWeight: 600, color: "black" }}>
                        Symbol Name : {data.serviceName}
                      </h6>
                    </div>

                    <div className="col-lg-6 col-4">
                      <h6 className="mb-3">Lot Size : </h6>
                    </div>
                    <div className="col-lg-6 col-8 ps-0">
                      <h6> {data.quantity}</h6>
                    </div>
                    <div className="col-lg-6 col-4">
                      <h6 className="">Max Qty :</h6>
                    </div>
                    <div className="col-lg-6 col-8 ps-0 mb-3">
                      <input
                        type="text"
                        className="form-control "
                        defaultValue={1}
                        value={data.maxQty}
                        onChange={(e) =>
                          handleInputChange("maxQty", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-lg-6 col-4">
                      <h6 className="col-lg-6 ,b-3">Strategy :</h6>
                    </div>
                    <div className="col-lg-6 col-8 ps-0">
                      <button
                        onClick={(e) => setShowStretgy(!showstrategy)}
                        className="btn btn-outline-primary mb-2"
                      >
                        Select Strategy
                      </button>
                      {showstrategy && (
                        <div id="myDropdown"className="dropdown-content">
                          {getAllClientStrategy.data.strategy.map(
                            (data1, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className={
                                      data.strategyId.includes(data1.result._id)
                                        ? "text-success"
                                        : "text-danger"
                                    }
                                  >
                                    <input
                                      type="checkbox"
                                      defaultChecked={data.strategyId.includes(
                                        data1.result._id
                                      )}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "strategyId",
                                          data1.result._id
                                        )
                                      }
                                    />
                                    {data1.result.strategy_name}
                                  </div>
                                </>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>

                    <div className="col-lg-12 col-sm-12 d-flex mb-3">
                      <h6 className="col-lg-6 col-4">Order Type :</h6>
                      <select
                        className="form-select"
                        value={data.orderType}
                        onChange={(e) =>
                          handleInputChange("orderType", e.target.value)
                        }
                      >
                        <option value="1">Market</option>
                        <option value="2">Limit</option>
                        <option value="3">Stoploss Limit</option>
                        <option value="4">Stoploss Market</option>
                      </select>
                    </div>
                    <div className="col-lg-12 col-sm-12 d-flex mb-3">
                      <h6 className="col-lg-6 col-4 ">Product Type :</h6>
                      <select
                        className="form-select "
                        value={data.productType}
                        onChange={(e) =>
                          handleInputChange("productType", e.target.value)
                        }
                      >
                        <option value="1">CNC</option>
                        <option value="2">MIS</option>
                        <option value="3">BO</option>
                        <option value="4">CO</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-back cancel-btn me-2"
                    onClick={(e) => {
                      setModal(!modal);
                      emptyState();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary paid-continue-btn"
                    onClick={handleOnSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Clientservice;
