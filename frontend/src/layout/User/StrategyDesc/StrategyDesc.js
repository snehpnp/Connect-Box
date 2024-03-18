/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Check } from 'lucide-react';
import Content from "../../../Components/Dashboard/Content/Content";
// import BasicDataTable from "../../../Components/ExtraComponents/Datatable/BasicDataTable";
// import { Pencil, Trash2 } from "lucide-react";
import { Get_Strategy_Description, Get_Strategy_Description1, Get_create_order, Get_update_order } from "../../../ReduxStore/Slice/Users/StrategySlice";
import { useDispatch } from "react-redux";
import Modal from "../../../Components/ExtraComponents/Modal";
import { Get_Pmermission } from "../../../ReduxStore/Slice/Users/DashboardSlice";
import { Get_All_Strategy } from "../../../ReduxStore/Slice/Admin/StrategySlice";
import * as Config from "../../../Utils/Config";
import { loadScript } from "../../../Utils/payment";
// import { useHistory } from 'react-router-dom';


const StrategyDesc = () => {
  const dispatch = useDispatch();

  const [StrategyData, setStrategyData] = useState({ loading: true, data: [] });
  const [StrategyData1, setStrategyData1] = useState({ loading: true, data: [] });
  const [strategy_id_array, setStrategy_id_array] = useState([]);
  const [Strategy_permission, setStrategy_permission] = useState([]);
  const [Strategy_By_Price, setStrategy_By_Price] = useState({});
  const [showModal, setshowModal] = useState(false);
  const [ModalData, setModalData] = useState("");

  const user_Id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const AdminToken = JSON.parse(localStorage.getItem("user_details")).token;

  const gotodashboard = JSON.parse(localStorage.getItem("gotodashboard"));
  const GoToDahboard_id = JSON.parse(localStorage.getItem("user_details_goTo"));



 




  const handlePayment = async (item) => {
    if(Object.keys(Strategy_By_Price).length == 0){
      alert("Please Select Plan")
    }
     else{

    var req = {
      user_id: user_Id,
      strategy_name: item.strategy_name,
      strategy_id: item._id,
      amount: Strategy_By_Price.price,
      type: Strategy_By_Price.type,
      currency: "INR",
      receipt: "Buy Subscription " + Strategy_By_Price.type
    }


    await dispatch(
      Get_create_order(req)
    )
      .unwrap()
      .then(async (response) => {

        // console.log("response ", response)

        if (response.status) {
          await loadScript('https://checkout.razorpay.com/v1/checkout.js');

          const options = {
            key: response.data1.key, // Replace with your actual Razorpay key
            amount: Number(response.data.amount) * 100, // Amount in paise (e.g., 50000 for ₹500.00)
            currency: 'INR',
            name: response.data1.name,
            description: response.data.receipt,
            order_id: response.data.order_id, // Generate a unique order ID on the server


            handler: async function (response1) {


              var req = {
                razorpay_order_id: response1.razorpay_order_id,
                razorpay_payment_id: response1.razorpay_payment_id,
                razorpay_signature: response1.razorpay_signature,
                id: response.data._id,
                user_id: response.data.user_id,
                strategy_id: response.data.strategy_id,
                order_status: "Success"
              }

              await dispatch(
                Get_update_order(req)
              )
                .unwrap()
                .then(async (response_order) => {
                  if (response_order.status) {
                    window.location.reload();
                  }
                })
            },
            prefill: {
              
            },
            theme: {
              color: '#F37254',
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {

        }
      });

    }

  };




  const Strategy_permissions = async (e) => {
    await dispatch(
      Get_Pmermission({
        "domain": Config.react_domain,
        token: AdminToken,
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status) {
          setStrategy_permission({
            loading: false,
            data: response.data,
          });
        } else {
          setStrategy_permission({
            loading: false,
            data: response.data,
          });
        }
      });
  };







  const getsignals11 = async (e) => {
    if (Strategy_permission.data && Strategy_permission.data[0].Strategy_plan === 1) {
      await dispatch(
        // Get_All_Strategy({
        Get_Strategy_Description1({
          req: {
            page: "1",
            limit: "100",
          },
          token: AdminToken,
        })
      )
        .unwrap()
        .then((response) => {
          if (response.status) {
            if (response.status) {
              setStrategyData1({
                loading: false,
                data: response.data,
              });
            } else {
              setStrategyData1({
                loading: false,
                data: response.data,
              });
            }
          }
        });

    } else {
      await dispatch(
        Get_Strategy_Description({
          _id: gotodashboard ? GoToDahboard_id.user_id : user_Id,
          token: AdminToken,
        })
      )
        .unwrap()
        .then((response) => {
          if (response.status) {
            setStrategyData({
              loading: false,
              data: response.data,
            });
            setStrategy_id_array(response.strategy_id_array)
          } else {
            setStrategyData({
              loading: false,
              data: response.data,
            });
            setStrategy_id_array(response.strategy_id_array)

          }
        });
    }
  };



  useEffect(() => {
    getsignals11();
  }, [Strategy_permission.data]);

  useEffect(() => {
    Strategy_permissions();
  }, []);


  const setStrategy_By_Price1 = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const selectedObject = JSON.parse(selectedOption.getAttribute('data-object'));

    setStrategy_By_Price(selectedObject);
  };

  return (
    <Content Page_title="Strategy Description" button_status={false}>

      {Strategy_permission.data && Strategy_permission.data[0].Strategy_plan === 1 ? <>
        <div className="row custom-dashboard-new1 mt-2 mb-2">
          {StrategyData.data &&
            StrategyData.data.map((item, index) => {

              let CardfinalClassName = "card-final";

               { strategy_id_array.includes(item._id) ?
                            
                CardfinalClassName = "card-final"
                :
                CardfinalClassName = "finalgreen card-final"

               }

              return (
                <>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 my-4">
                  <div className={`pt-3 ${CardfinalClassName}`}>
                    {/* <div className="card-final pt-3"> */}

                      <div className="card_head_new ">
                        {item.strategy_image ? <>
                          <img src={item.strategy_image} alt="algocrab" className="shoes" />
                        </> : ""}

                      </div>
                      <div className="card_body_main_new ">
                        <div className="shoes_desc">
                          <input
                            type="hidden"
                            className="strategyID"
                            defaultValue="1a6c53e21d"
                          />
                          <input type="hidden" className="planID" defaultValue={1} />
                          <p className="shoes_info mb-0">{item.strategy_name}</p>
                          <p className="badge mb-0">Intraday/Positional</p>
                          <p className="more_info my-3 btn btn-outline-primary w-50 d-block">
                            <a
                              data-description=""
                              onClick={(e) => {
                                setshowModal(true);
                                setModalData(Strategy_permission.data && Strategy_permission.data[0].Strategy_plan === 1 ? item : item.result);
                              }}
                            >
                              <i className="fa-solid fa-plus" /> More Info
                            </a>
                          </p>
                          <span className="shoes_rating">
                            <i className="" />
                            <i className="" />
                            <i className="" />
                            <i className="" />
                            <i className=" gray" />
                          </span>
                          {/* <p className="shoes_price">
                            <span>
                              <span>PRICE : </span>
                              <i className="fa-solid fa-indian-rupee-sign price tag" />
                              <span className="rs txt-custom-strategy-price alert alert-warning py-0 px-1">{Strategy_By_Price[index] ? Strategy_By_Price[index] : "select Plan"}</span>
                            </span>
                          </p> */}

                          {
                            strategy_id_array.includes(item._id) ?

                              <span className="shoes_size">
                                <span>
                                  <span>PLANS : </span>
                                </span>
                                <select
                                  name="select"
                                  className="ddl-custom-stratey-plans form-select select"
                                  onChange={(e) => setStrategy_By_Price1(e)}
                                >
                                  <option>select plan</option>
                                  {item.plans1 !== undefined ? item.plans1.map((x, optionIndex) => (
                                    x.status == true ?
                                      <option data-planid={2} data-object={JSON.stringify(x)} value={x.type} key={`${item.strategy_name}-${x.type}-${optionIndex}`}>
                                        {x.type + "-" + x.price}
                                      </option> : ""
                                  )) : ""}


                                </select>
                              </span>


                              :
                              ""
                          }
                          <p className="px-4">This strategy works best in trending type of market conditions.
                          </p>



                          {
                            strategy_id_array.includes(item._id) ?

                              <span className="shoes_buy">
                                <button className="mb-2" type="submit">
                                  <i className="fas fa-bolt" /> WATCH VIDEO
                                </button>

                                <button type="submit" onClick={() =>handlePayment(item)}>
                                  <i className="fas fa-cart-plus" /> BUY NOW
                                </button>
                              </span>


                              :
                              <p className="badge mb-0">  Subscribed  <Check /></p>

                          }




                        </div>
                      </div>



                    </div>
                  </div >
                </>
              );
            })}
        </div>

      </> : <>
        <div class="row mb-5">
          {StrategyData.data &&
            StrategyData.data.map((item) => {
              return (
                <>
                  <div
                    class="col-12 col-sm-6 col-md-4"
                    style={{ height: "250px" }}
                  >
                    <div class="card card-purple-blue text-white mb-3 mb-md-0">
                      <div class="d-flex justify-content-between ">
                        <div>
                          <p class="new-un">{item.result.strategy_category}</p>
                        </div>
                        <div>
                          <p class="new-de">{item.result.strategy_segment}</p>
                        </div>
                      </div>
                      <h4 class="card-new-heading">
                        {item.result.strategy_name}
                      </h4>
                      <div class="card-number text-center">
                        <div class="h3">Recommended</div>
                        <small>
                          <strong>
                            Capital : {item.result.strategy_amount} PER LOT
                          </strong>
                        </small>
                      </div>
                      <div class="card-body d-flex justify-content-between  align-items-end p-2">
                        <div class="card-description text-right">
                          <small
                            class="new-sma mx-2"
                            onClick={(e) => {
                              setshowModal(true);
                              setModalData(item.result);
                            }}
                          >
                            Info
                          </small>
                        </div>
                        <div class="card-description text-right ml-3">
                          <small class="new-sma">Join</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

        </div>
      </>
      }

      {
        showModal ? (
          <>
            <Modal
              isOpen={showModal}
              size="lg"
              title="Strategy Information"
              hideBtn={true}
              // onHide={handleClose}
              handleClose={() => setshowModal(false)}
            >
              <div class="content ml-5 mr-5 ">
                <h5 class=" text-center">{ModalData.strategy_name}</h5>

                <li>{ModalData.strategy_description}</li>

                <div className="row">
                  <div className="col-md-6"> <div class="text-center">
                    <h5 class=" mb-0">SETTINGS OF INDICATOR</h5>
                    <span>
                      <img
                        src={ModalData.strategy_indicator}
                        alt="INDICATOR"
                        class="w-100 my-3 border border-dark"
                      />
                    </span>
                  </div></div>
                  <div className="col-md-6">
                    <div class="text-center">
                      <h5 class=" ">NIFTY STRATEGY TESTER</h5>
                      <span>
                        <img
                          src={ModalData.strategy_tester}
                          class="w-100 my-3 border border-dark"
                          alt="STRATEGY TESTER"
                        />
                      </span>
                    </div>
                  </div>
                </div>


                <br />
                <div>
                  <span style={{ fontSize: "13.5pt", whiteSpace: "pre-wrap" }}>
                    This strategy works best in trending type of market
                    conditions.
                  </span>
                  <div>
                    <span>Support :</span>
                    {/* <span> Email : info@trustalgo.net</span>
                  <span> Mobile : +918424978748</span> */}
                  </div>
                  <span style={{ fontSize: "13.5pt", color: "red" }}>
                    <b>Note</b>
                  </span>
                  <ul className="fw-bold">
                    <li>
                      Do not subscribe to the strategy without watching the
                      performance sheets and charts. Since this strategy works
                      on trend there will be multiple entries in 1 trading
                      session.
                    </li>
                    <li>
                      We recommend 1 or 2 trades per day in order to gain
                      capital with calculative risk.
                    </li>
                    <li>
                      Increase lots size and re-entries according to your risk
                      appetite , we are not responsible for your in-calculative
                      losses.
                    </li>
                  </ul>
                </div>
              </div>
            </Modal>
          </>
        ) : (
          ""
        )
      }




    </Content >
  );
};

export default StrategyDesc;
