import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get_All_Subadmin_Strategy } from "../../../ReduxStore/Slice/Users/ClientServiceSlice";
import {
  OrderCreateStgUser,
  OrderUpdateStgUser,
} from "../../../ReduxStore/Slice/Users/Userdashboard.Slice";
import { Modal, Button, Form } from "react-bootstrap";
import { loadScript } from "../../../Utils/payment";
import Swal from "sweetalert2";

import Loader from "../../../Utils/Loader";

const Strategies = () => {
  const dispatch = useDispatch();

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const [getAllStrategy, setAllStrategy] = useState({
    loading: true,
    data: [],
  });
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [selectStrategy, setSelectStrategy] = useState({});
  const [selectedOption, setSelectedOption] = useState("monthlyPlan");
  const handleOptionChange = (e) => setSelectedOption(e.target.value);
  const [showModal1, setShowModal1] = useState(false);
const [showModal2, setShowModal2] = useState([]);

  const GetAllStrategy = async () => {
    let data = { id: user_id };
    await dispatch(Get_All_Subadmin_Strategy(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setAllStrategy({
            loading: false,
            data: response.data,
          });
        } else {
          setAllStrategy({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
      return err;
      });
  };
  useEffect(() => {
    GetAllStrategy();
  }, []);

  const handleSubmit = async () => {
    var amount;
    var receipt;

    switch (selectedOption) {
      case "monthlyPlan":
        amount = Number(selectStrategy.month) * 100;
        receipt = "Buy Subscription " + selectStrategy.month;
        break;
      case "quarterly":
        amount = Number(selectStrategy.quarterly) * 100;
        receipt = "Buy Subscription " + selectStrategy.quarterly;
        break;
      case "half_early":
        amount = Number(selectStrategy.half_early) * 100;
        receipt = "Buy Subscription " + selectStrategy.half_early;
        break;
      case "yearly":
        amount = Number(selectStrategy.yearly) * 100;
        receipt = "Buy Subscription " + selectStrategy.yearly;
        break;
      default:
        amount = 0;
        receipt = "Buy Subscription";
    }

    var req = {
      user_id: user_id,
      admin_id: selectStrategy.maker_id,
      strategy_name: selectStrategy.strategy_name,
      strategy_id: selectStrategy._id,
      amount: amount,
      type: selectedOption,
      currency: "INR",
      receipt: receipt,
    };

    await dispatch(OrderCreateStgUser(req))
      .unwrap()
      .then(async (response) => {
        if (response.message === "Request failed with status code 500") {
          Swal.fire({
            title: "Error!",
            text: "Unable to Payment Process",
            icon: "error",
            timer: 1200,
            timerProgressBar: true,
          });
          return;
        }
        if (response.status) {
          Swal.fire({
            title: "Success!",
            text: "Payment Successfull",
            icon: "success",
            timer: 1200,
            timerProgressBar: true,
          });
          GetAllStrategy();
          handleClose();
        } else {
        }
      });
  };

  const handleBuyClick = (item) => {
    if (
      item.month == null ||
      item.quarterly == null ||
      item.half_early == null ||
      item.yearly == null
    ) {
      Swal.fire({
        title: "Error!",
        text: "The Charges are Not Define",
        icon: "error",
        timer: 1200,
        timerProgressBar: true,
      });
    } else {
      setShowModal(true);
      setSelectStrategy(item);
    }
  };

  return (
    <div>
      <div className="content container-fluid pb-0">
        <div className="card">
          <div className="card-header">
            <div className="row align-center">
              <div className="col">
                <h5 className="card-title mb-0">
                  <i className="pe-2 fas fa-list"></i>Strategies
                </h5>
              </div>
            </div>
          </div>

          {!getAllStrategy.loading ? (
            <div className="card-body">
              <div className="row d-flex align-items-center justify-content-center">
                {getAllStrategy.data.map((item) => (
                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
                    <div className="packages card">
                      <div className="package-header">
                        <div className="d-flex justify-content-between w-100">
                          <div className="">
                            <h4>{item.strategy_name}</h4>
                          </div>
                          <span className="icon-frame d-flex align-items-center justify-content-center">
                            <img
                              src="assets/img/icons/price-01.svg"
                              alt="img"
                            />
                          </span>
                        </div>
                        <p>{item.strategy_description}</p>
                      </div>

                      {/* <h2>Price : 5000 only</h2> */}
                      <h6>What’s included</h6>
                      <ul>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Maximum Trade :{item.max_trade}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          strategy categories :{item.strategy_segment}
                        </li>

                        {/* <li>
                          <i className="fa-solid fa-circle-check" />
                          Monthly charges :{item.month}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Quarterly charges :{item.quarterly}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Half Yearly charges :{item.half_early}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Yearly charges :{item.yearly}
                        </li> */}
                      </ul>
                      <div className="d-flex justify-content-center package-edit">
                        {/* {item.stg_status == 0 ? (
                          <a
                            className="btn btn-primary"
                            onClick={(e) => {
                          
                              handleBuyClick(item);
                            }}
                          >
                            BUY
                          </a>
                        ) : (
                          <a className="btn btn-primary">SUBSCRIBED</a>
                        )} */}
                        <a
                          className="btn btn-primary"
                          onClick={(e) =>{ setShowModal1(!showModal1);setShowModal2(item)}}
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>

        {showModal && (
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Select Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formPlan">
                  {["monthlyPlan", "quarterly", "half_early", "yearly"].map(
                    (plan, index) => {
                      const planLabels = {
                        monthlyPlan: "Monthly Plan",
                        quarterly: "Quarterly Plan",
                        half_early: "Half Yearly Plan",
                        yearly: "Yearly Plan",
                      };
                      const planValues = {
                        monthlyPlan: selectStrategy.month,
                        quarterly: selectStrategy.quarterly,
                        half_early: selectStrategy.half_early,
                        yearly: selectStrategy.yearly,
                      };

                      return (
                        <React.Fragment key={plan}>
                          {index !== 0 && (
                            <hr
                              style={{
                                width: "100%",
                                margin: "20px 0",
                                borderColor: "#ddd",
                              }}
                            />
                          )}{" "}
                          {/* Divider */}
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
                              id={plan}
                              style={{ marginRight: "10px" }}
                              label={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <strong
                                    style={{
                                      marginRight: "5px",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {planLabels[plan]}:
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
                                    {planValues[plan]}
                                  </span>
                                </div>
                              }
                              value={plan}
                              onChange={handleOptionChange}
                              defaultChecked={plan === "monthlyPlan"}
                            />
                          </div>
                        </React.Fragment>
                      );
                    }
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

        {showModal1 && (
          <Modal
            show={showModal1}
            onHide={() => setShowModal1(!showModal1)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Strategy Details</Modal.Title>
            </Modal.Header>
            {showModal2 && 
            <Modal.Body>
              <div className="row">
               {/* I AMCREATING VIEW CARD ONLY VEO ALL ETEAILS */}

               <div className="col-sm-12 ">
                <div className="packages card">
                  <div className="package-header">
                    <div className="d-flex justify-content-between w-100">
                      <div className="">
                        <h4>{showModal2.strategy_name}</h4>
                      </div>
                      <span className="icon-frame d-flex align-items-center justify-content-center">
                        <img
                          src="assets/img/icons/price-01.svg"
                          alt="img"
                        />
                      </span>
                    </div>
                    <p>{showModal2.strategy_description}</p>

                      <h6>What’s included</h6>
                      <ul>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Maximum Trade :{showModal2.max_trade}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          strategy categories :{showModal2.strategy_segment}
                        </li>

                        {/* <li>
                          <i className="fa-solid fa-circle-check" />
                          Monthly charges :{showModal2.month}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Quarterly charges :{showModal2.quarterly}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Half Yearly charges :{showModal2.half_early}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check" />
                          Yearly charges :{showModal2.yearly}
                        </li> */}

                      </ul>
                   
                   </div>
                   </div></div>
                        
              </div>
            </Modal.Body>}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Strategies;
