import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import Loader from "../../../Utils/Loader";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

import { Get_All_Researcher_Strategy } from "../../../ReduxStore/Slice/Subadmin/AllResearcherStrategySlice";
import {
  Stg_by_Subadmin,
  update_Stg_order,
} from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { loadScript } from "../../../Utils/payment";
import { getFreePlan } from "../../../ReduxStore/Slice/Researcher/ResearcherSlice";

const AllResearcherStrategy = () => {
  const userDetails = JSON.parse(localStorage.getItem("user_details"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setrefresh] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const [allStrategy, setAllStrategy] = useState({
    loading: true,
    data: [],
  });

  const getAllStrategy = async () => {
    var data = { id: userDetails.user_id };
    await dispatch(Get_All_Researcher_Strategy(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setrefresh(!refresh);
          setAllStrategy({
            loading: false,
            data: response.data,
          });
        } else {
          setrefresh(!refresh);
          setAllStrategy({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in fatching all strastegy :", err);
      });
  };

  useEffect(() => {
    getAllStrategy();
  }, []);


  

  // State for modal visibility and selected option
  const [showModal, setShowModal] = useState(false);
  const [selectStrategy, setSelectStrategy] = useState({});

  const [selectedOption, setSelectedOption] = useState("monthlyPlan");

  const handleOptionChange = (e) => setSelectedOption(e.target.value);

  const handleClose = () => setShowModal(false);



  

  const handleSubmit = async () => {
    const req = {
      user_id: userDetails.user_id,
      admin_id: selectStrategy.maker_id,
      strategy_name: selectStrategy.strategy_name,
      strategy_id: selectStrategy._id,
      amount:
        selectedOption === "monthlyPlan"
          ? Number(selectStrategy.monthly_charges) * 100
          : Number(selectStrategy.security_fund) * 100,
      type: selectedOption,
      currency: "INR",
      receipt:
        "Buy Subscription " +
        (selectedOption === "monthlyPlan"
          ? selectStrategy.monthly_charges
          : selectStrategy.strategy_percentage),
    };

    if (req.amount === 0) {
      await dispatch(getFreePlan(req))
        .unwrap()
        .then(async (response) => {
          console.log(response);
          if (response.status) {
            Swal.fire({
              title: "Success",
              text: response.msg,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              text: "Faild To Buy",
              icon: "Error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        });
    } else {
      await dispatch(Stg_by_Subadmin(req))
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            const options = {
              key: response.data1.key,
              amount: Number(response.data.amount) * 100,
              currency: "INR",
              name: response.data1.name,
              description: response.data.receipt,
              order_id: response.data.order_id,

              handler: async function (response1) {
                const req = {
                  razorpay_order_id: response1.razorpay_order_id,
                  razorpay_payment_id: response1.razorpay_payment_id,
                  razorpay_signature: response1.razorpay_signature,
                  id: response.data._id,
                  user_id: response.data.user_id,
                  strategy_id: response.data.strategy_id,
                  order_status: "Success",
                  User_data: JSON.stringify(response1),
                  type: selectedOption,
                  Amount: Number(response.data.amount),
                };

                await dispatch(update_Stg_order(req))
                  .unwrap()
                  .then(async (response_order) => {
                    if (response_order.status) {
                      window.location.reload();
                    }
                  });
              },
              prefill: {},
              theme: {
                color: "#F37254",
              },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
          }
        });
    }
  };

  return (
    <>
      <div className="content container-fluid">
        {/* PAGE HEADER */}
        <div className="card">
          <div className="card-header mb-0">
            <h5 className="card-title mb-0">
              <i className="fe fe-target "> </i>Researcher Strategy
            </h5>
          </div>

          <div className="card-body">
            {/* Cards */}
            {!allStrategy.loading ? (
              <div className="content container-fluid pb-0">
                <div className="row d-flex align-items-center justify-content-center">
                  {allStrategy.data &&
                    allStrategy.data.map((stg) => {
                      return (
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                          <div className="packages card" data-aos="fade-down">
                            <div className="package-header d-flex justify-content-between">
                              <div className="d-flex justify-content-between w-100">
                                <div className="">
                                  {/* <h2 className="my-2">{stg.strategy_name}</h2> */}

                                  <h2
                                    className="my-2"
                                    style={{
                                      padding: "5px 10px",
                                      display: "inline-block",
                                      borderRight:
                                        stg.stg_active == 1
                                          ? "5px solid green"
                                          : "", //
                                      backgroundColor:
                                        stg.stg_active == 1 ? "lightgreen" : "", //
                                    }}
                                  >
                                    {stg.strategy_name}
                                  </h2>
                                  <h6>create by : {stg.UserName}</h6>
                                  <h6>
                                    strategy description :{" "}
                                    {stg.strategy_description}
                                  </h6>
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

                            <div className="d-flex justify-content-between">
                              <h6>Segment:</h6>
                              <h6>{stg.strategy_segment}</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                              <h6>category :</h6>
                              <h6>{stg.strategy_category}</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                              <h6>Max Trade:</h6>
                              <h6>{stg.max_trade}</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                              <h6>Strategy percentage:</h6>
                              <h6>{stg.strategy_percentage}</h6>
                            </div>

                            <div className="d-flex justify-content-between">
                              <h6>Monthly Charges:</h6>
                              <h6>{stg.monthly_charges}</h6>
                            </div>

                            <div className="d-flex justify-content-between">
                              <h6>Security Fund:</h6>
                              <h6>{stg.security_fund}</h6>
                            </div>

                            {stg.stg_active != 1 ? (
                              <div className="d-flex justify-content-center package-edit">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={(e) => {
                                    setShowModal(true);
                                    setSelectStrategy(stg);
                                  }}
                                >
                                  Buy
                                </button>
                              </div>
                            ) : (
                              <div className="d-flex justify-content-center package-edit">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Subscribed
                                </button>
                              </div>
                            )}
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
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {showModal && (
            <Modal show={showModal} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Select Plan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formPlan">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Form.Check
                        type="radio"
                        name="plan"
                        id="monthlyPlan"
                        style={{ marginRight: "10px" }}
                        label={
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <strong
                              style={{ marginRight: "5px", fontSize: "16px" }}
                            >
                              Monthly Plan:
                            </strong>
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "green",
                                marginRight: "5px",
                                fontSize: "16px",
                              }}
                            >
                              <i className="fas fa-rupee-sign"></i>
                            </span>
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "green",
                                fontSize: "16px",
                              }}
                            >
                              {selectStrategy.monthly_charges}
                            </span>
                          </div>
                        }
                        value="monthlyPlan"
                        onChange={handleOptionChange}
                        defaultChecked
                      />
                      <span style={{ fontSize: "20px", color: "#ccc" }}></span>{" "}
                      {/* Divider */}
                    </div>
                    {userDetails.subadmin_service_type == 2 ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <Form.Check
                          type="radio"
                          name="plan"
                          id="percentageWise"
                          style={{ marginRight: "10px" }}
                          label={
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <strong
                                style={{ marginRight: "5px", fontSize: "16px" }}
                              >
                                % Wise:
                              </strong>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  color: "green",
                                  marginRight: "5px",
                                  fontSize: "16px",
                                }}
                              >
                                <i className="fas fa-rupee-sign"></i>
                              </span>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  color: "green",
                                  fontSize: "16px",
                                }}
                              >
                                {selectStrategy.security_fund}
                              </span>
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#999",
                                  marginLeft: "5px",
                                }}
                              >
                                (security fund)
                              </span>
                            </div>
                          }
                          value="% Wise"
                          onChange={handleOptionChange}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default AllResearcherStrategy;
