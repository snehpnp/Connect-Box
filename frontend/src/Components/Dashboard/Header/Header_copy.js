/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import DropDown from "./DropDown";
import { Link } from 'react-router-dom'
import Notification from "../../ExtraComponents/Notification";
import { useDispatch, useSelector } from "react-redux";
import Holidays from "date-holidays"
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Components/ExtraComponents/Modal";
import UpdateBrokerKey from "./Update_Broker_Key";
import { loginWithApi } from "./log_with_api";
import { User_Profile, GET_MESSAGE_BRODS } from "../../../ReduxStore/Slice/Common/commoSlice.js";
import { check_Device } from "../../../Utils/find_device";
import { GET_HELPS } from "../../../ReduxStore/Slice/Admin/AdminHelpSlice";
import { Log_Out_User } from "../../../ReduxStore/Slice/Auth/AuthSlice";
import { TRADING_OFF_USER } from "../../../ReduxStore/Slice/Users/DashboardSlice";
import { Get_Company_Logo, UpdatePaymentAmount } from '../../../ReduxStore/Slice/Admin/AdminSlice'
import { isForeignUserAllowedToLogin } from "../../../Utils/Date_formet";
import ApiCreateInfo from "../../../../src/layout/User/ApiCreateInfo/ApiCreateInfo.js"
// import { UpdatePaymentAmount} from '../../../ReduxStore/Slice/Admin/AdminSlice'
import { loadScript } from "../../../Utils/payment";

import { Get_create_order1, Get_update_plan } from "../../../ReduxStore/Slice/Users/StrategySlice";

import Formikform from "../../../Components/ExtraComponents/Form/Formik_form1"
import { useFormik } from 'formik';

import jwt_decode from "jwt-decode";

const Header = ({ ChatBox }) => {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setshowModal] = useState(false);
  const [showModal1, setshowModal1] = useState(false);


  const [refresh, setrefresh] = useState(false);

  const [UserDetails, setUserDetails] = useState([]);
  const [getPlanInfo, setPlanInfo] = useState([]);

  const [getPlanselect, setPlanselect] = useState([]);

  const [CheckUser, setCheckUser] = useState(check_Device());

  const [getAllClients, setAllClients] = useState({
    loading: true,
    data: [],
  });




  //  lOCAL STORAGE VALUE
  let theme_id = localStorage.getItem("theme");
  const gotodashboard = JSON.parse(localStorage.getItem("gotodashboard"));
  const user_role_goTo = JSON.parse(localStorage.getItem("user_role_goTo"));
  const user_role = JSON.parse(localStorage.getItem("user_role"));
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const page = localStorage.getItem("page")
  const Role = JSON.parse(localStorage.getItem("user_details")).Role
  const routePath = localStorage.getItem("route");

  const token = JSON.parse(localStorage.getItem("user_details")).token;







  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    console.log("runn")
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };




  const submitSelectedPlan = async() => {
    if (getPlanInfo) {
      var selectPlan = getPlanInfo.filter((data) => data.key == getPlanselect)


      var req = {
        plan_name: getPlanselect,
        user_id: user_id,
        amount: Number(selectPlan[0].value) * 100,
        currency: "INR",
        receipt: "Buy " + getPlanselect + " plan"
      }

      await dispatch(Get_create_order1(req))
        .unwrap()
        .then(async (response) => {

          console.log("response ", response)

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
                  plan_name: getPlanselect,
                  order_status: "Success"
                }
                console.log("req", req)
                await dispatch(
                  Get_update_plan(req)
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
          }
        });


    }

  };








  if (theme_id != null) {
    let themedata = JSON.parse(theme_id);
    $("body").removeClass(
      "theme-1 theme-2 theme-3 theme-4 theme-5 theme-6 theme-7 theme-8 theme-9  theme-10"
    );
    $("body").addClass(themedata.dashboard);

    $("body").attr("data-dashboard", `${themedata.dashboard}-dashboard`);
    $("body").attr("data-theme-version", themedata.theme_version);
    $("body").attr("data-primary", themedata.primary_col);
    $("body").attr("data-nav-headerbg", themedata.nav_head_col);
    $("body").attr("data-headerbg", themedata.header_col);
    $("body").attr("data-sibebarbg", themedata.sidebar_col);

    if ($("body").attr("data-sidebar-style") === "overlay") {
      $("body").attr("data-sidebar-style", "full");
      $("body").attr("data-layout", themedata.layout);
      return;
    }
    $("body").attr("data-layout", themedata.layout);
    if ($("body").attr("data-layout") === "horizontal") {
      if (themedata.sidebar === "overlay") {
        alert("Sorry! Overlay is not possible in Horizontal layout.");
        return;
      }
    }
    if ($("body").attr("data-layout") === "vertical") {
      if (
        $("body").attr("data-container") === "boxed" &&
        themedata.sidebar === "full"
      ) {
        alert("Sorry! Full menu is not available in Vertical Boxed layout.");
        return;
      }
      if (
        themedata.sidebar === "modern" &&
        $("body").attr("data-sidebar-position") === "fixed"
      ) {
        alert(
          "Sorry! Modern sidebar layout is not available in the fixed position. Please change the sidebar position into Static."
        );
        return;
      }
    }
    $("body").attr("data-sidebar-style", themedata.sidebar);
    if ($("body").attr("data-sidebar-style") === "icon-hover") {
      $(".deznav").on(
        "hover",
        function () {
          $("#main-wrapper").addClass("iconhover-toggle");
        },
        function () {
          $("#main-wrapper").removeClass("iconhover-toggle");
        }
      );
    }

    $("body").attr("data-header-position", themedata.header_position);
    $("body").attr("data-sidebar-position", themedata.sidebar_position);
    $("body").attr("data-typography", themedata.body_font);
    if (themedata.container === "boxed") {
      if (
        $("body").attr("data-layout") === "vertical" &&
        $("body").attr("data-sidebar-style") === "full"
      ) {
        $("body").attr("data-sidebar-style", "overlay");
        $("body").attr("data-container", themedata.container);
        setTimeout(function () {
          $(window).trigger("resize");
        }, 200);
        return;
      }
    }
    $("body").attr("data-container", themedata.container);

    $(window).on("resize", function () {
      var windowWidth = $(this).width();
      if (windowWidth > 1024) {
        $("body").attr("data-sidebar-style", "full");
      } else if (windowWidth > 769 && windowWidth <= 1024) {
        $("body").attr("data-sidebar-style", "mini");
      } else if (windowWidth <= 767) {
        $("body").attr("data-sidebar-style", "overlay");
      }
    });
  }


  // REDIRECT FUNCTION
  const redirectToAdmin = () => {


    if (page != null) {
      navigate("/admin/groupservices")
      localStorage.removeItem("page")
    } else {

      navigate("/admin/dashboard")

      window.location.reload();
      localStorage.removeItem("gotodashboard");
      localStorage.removeItem("user_details_goTo");
      localStorage.removeItem("user_role_goTo");
      localStorage.removeItem("route");


      setTimeout(() => {
        localStorage.removeItem("user_details_goTo");
        localStorage.removeItem("user_role_goTo");
      }, 1000);
    }

  };


  //  BROKER LOGIN
  const LogIn_WIth_Api = (check, brokerid, tradingstatus, UserDetails) => {
    const currentDate = new Date();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekday = weekdays[currentDate.getDay()];
    const holidays = new Holidays();

    const userCountry = 'US' || "UK" || "SA";
    const userLocalTime = currentDate

    let isAllowed = isForeignUserAllowedToLogin(userCountry, userLocalTime)

    // if (!holidays.isHoliday(currentDate) && weekday !== 'Sunday' && weekday !== 'Saturday' ) {
    if (check) {
      if (isAllowed) {
        loginWithApi(brokerid, UserDetails);
      } else {
        alert('Market Time Is Close');
      }
    } else {
      dispatch(TRADING_OFF_USER({ user_id: user_id, device: CheckUser, token: token }))
        .unwrap()
        .then((response) => {
          if (response.status) {
            // setUserDetails(response.data);
            setrefresh(!refresh)
          }
        });

    }
    // }
    // else {
    //   alert('Market Is Closed Today');
    // }



    return
    if (check) {
      loginWithApi(brokerid, UserDetails);
    } else {
      dispatch(TRADING_OFF_USER({ user_id: user_id, device: CheckUser, token: token }))
        .unwrap()
        .then((response) => {
          if (response.status) {
            // setUserDetails(response.data);
            setrefresh(!refresh)
          }
        });

    }
  };


  //  GET_USER_DETAILS
  const data = async () => {
    await dispatch(User_Profile({ id: user_id }))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setUserDetails(response.data);
          if (new Date(response.data.EndDate) <= new Date()) {
            console.log({ status: false, msg: 'your service is terminated please contact to admin', data: [] })
          }

        }
      });
  };


  // GET MESSGAE BRODCAST DATA 
  const message_brod = async () => {
    if (Role == "USER") {
      await dispatch(GET_MESSAGE_BRODS({ id: user_id }))
        .unwrap()
        .then((response) => {
          if (response.status) {
            // setUserDetails(response.data);
          }
        });
    }

  };



  //  For Show Notfication
  const Notfication = async () => {
    if (user_role == "ADMIN") {
      await dispatch(GET_HELPS({ user_id: user_id, token: token }))
        .unwrap()
        .then((response) => {
          if (response.status) {
            setAllClients({
              loading: false,
              data: response.data,
            });
          } else {
            setAllClients({
              loading: false,
              data: response.data,
            });
          }
        });
    }
  };



  //  Clear Session  After 24 Hours
  const ClearSession = async () => {
    var decoded = jwt_decode(token);

    if (decoded.exp * 1000 < new Date().getTime()) {
      const request = {
        userId: user_id,
        Device: CheckUser,
      };

      await dispatch(Log_Out_User(request))
        .then((res) => {
          if (res.payload.status) {
            localStorage.removeItem("user_role");
            localStorage.removeItem("user_details");
            localStorage.clear();
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((error) => {
          console.log("Error logout error", error);
        });
    }
  };


  // GET COMPANY NAME
  const CompanyName = async () => {
    await dispatch(Get_Company_Logo()).unwrap()
      .then((response) => {
        if (response.status) {
          $(".Company_logo").html(response.data && response.data[0].panel_name);

          $(".set_Favicon")
        }
      })
  }



  const UpgradeService = () => {
    getPaymentAmountDetails();
    setshowModal1(true)
  }


  const getPaymentAmountDetails = async () => {
    const req = {}
    await dispatch(UpdatePaymentAmount(req))
      .unwrap()
      .then((response) => {
        console.log("payment amount:", response)
        if (response.status) {

          const arrayOfObjects = Object.entries(response.data)
            .filter(([key]) => !['_id', '__v', 'user_id', 'updatedAt', 'createdAt'].includes(key))
            .map(([key, value]) => ({
              key,
              value,
              name: key.includes('monthly') ? 'Monthly' :
                key.includes('quarterly') ? 'Quarterly' :
                  key.includes('halfyearly') ? 'Half Yearly' :
                    key.includes('yearly') ? 'Yearly' : key,
              id: key.includes('monthly') ? 1 :
                key.includes('quarterly') ? 2 :
                  key.includes('halfyearly') ? 3 :
                    key.includes('yearly') ? 4 : 5 // Assigning 5 for other cases
            }))
            .sort((a, b) => a.id - b.id);





          setPlanInfo(arrayOfObjects)
        }
        else {

        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }


  const formik = useFormik({
    initialValues: {
      plans: false,

    },
    validate: (values) => {

      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {

      if (getPlanInfo) {
        var selectPlan = getPlanInfo.filter((data) => data.key == getPlanselect)


        var req = {
          plan_name: getPlanselect,
          user_id: user_id,
          amount: Number(selectPlan[0].value) * 100,
          currency: "INR",
          receipt: "Buy " + getPlanselect + " plan"
        }

        await dispatch(
          Get_create_order1(req)
        )
          .unwrap()
          .then(async (response) => {

            console.log("response ", response)

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
                    plan_name: getPlanselect,
                    order_status: "Success"
                  }
                  console.log("req", req)
                  await dispatch(
                    Get_update_plan(req)
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



    }
  });



  const handleCheckboxChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === getPlanselect) {
      // If the same checkbox is clicked again, unselect it
      setPlanselect(null);
    } else {
      // Select the clicked checkbox
      setPlanselect(selectedValue);
    }
  };


  useEffect(() => {
    if (user_role == "ADMIN") {
      Notfication();
    }
    CompanyName()
    ClearSession();
  }, []);

  useEffect(() => {
    data();
    message_brod()
  }, [refresh]);


  return (
    <div className="header-container">
      <Logo />
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">

              </div>
              <ul className="navbar-nav header-right align-items-center">



                <li className="d-flex align-items-center">{user_role === "USER" && UserDetails.license_type != 1 ? (
                  <>

                    <li >
                      <div className="container">
                        <div className="switches-container">
                          <input
                            type="radio"
                            id="switchMonthly"
                            name="switchPlan"
                            defaultValue="Monthly"
                            defaultChecked="checked"

                          />
                          <input
                            type="radio"
                            id="switchYearly"
                            name="switchPlan"
                            defaultValue="Yearly"
                            checked={
                              UserDetails.TradingStatus === "on" ? true : false
                            }
                            onClick={(e) =>
                              LogIn_WIth_Api(
                                e.target.checked,
                                UserDetails.broker,
                                UserDetails.TradingStatus,
                                UserDetails
                              )
                            }
                          />
                          <label htmlFor="switchMonthly">Paper Trading</label>
                          <label htmlFor="switchYearly">Live Trading</label>
                          <div className="switch-wrapper">
                            <div className="switch">
                              <div>Paper Trading</div>
                              <div>Live Trading</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </li>

                  </>
                ) : (
                    ""
                  )}</li>



                <li className="d-flex align-items-center">{user_role === "USER" ? (
                  <>


                    <li className="nav-item dropdown header-profile me-2">
                      {/* <Link to='/payment'> */}
                      <button className="strategy-btn  btn btn-primary px-3" onClick={() => UpgradeService()}>Upgrade</button>
                      {/* </Link> */}




                    </li>
                  </>
                ) : (
                    ""
                  )}</li>


                {/* GO TO DASHBOARD */}
                {gotodashboard != null ? (
                  <>
                    <li className="nav-item dropdown gotodashboard">
                      <button
                        onClick={redirectToAdmin}
                        type="button"
                        className="btn btn-primary text-white"
                      >
                        Go to Admin
                      </button>
                    </li>

                  </>
                ) : (
                    ""
                  )}

                {(!gotodashboard && (user_role === "ADMIN"))

                  ? (
                    <>
                      <li className="nav-item dropdown header-profile me-2">


                        <div className="switches-container">
                          <input
                            type="radio"
                            id="switchMonthly"
                            name="switchPlan"
                            defaultValue="Monthly"
                            defaultChecked="checked"

                          />
                          <input
                            type="radio"
                            id="switchYearly"
                            name="switchPlan"
                            defaultValue="Yearly"


                          />
                          <label htmlFor="switchMonthly"></label>
                          <label htmlFor="switchYearly">Live Trading</label>
                          <div className="switch-wrapper">
                            <div className="switch">
                              <div></div>
                              <div>Live Price</div>
                            </div>
                          </div>
                        </div>

                      </li>
                    </>

                  ) : (
                    ""
                  )}
                <li className="nav-item dropdown header-profile me-2">

                  <button className="strategy-btn  btn btn-primary px-3"><ApiCreateInfo /></button>
                </li>
                {/* {(user_role === "USER" && UserDetails.broker === "2" && UserDetails.broker === 2) || */}


                {(!gotodashboard && (user_role === "USER" || user_role === "ADMIN"))

                  ? (
                    <>
                      <li className="nav-item dropdown header-profile me-1 me-md-3">
                        <button
                          className=" btn btn-primary px-3"
                          onClick={() => setshowModal(true)}
                        >
                          Set API Key
                        </button>
                      </li>



                    </>
                  ) : (
                    ""
                  )}

                {/*  For Show Notification Box */}

                {user_role === "ADMIN" ? (
                  <>
                    <Notification data={getAllClients} />

                  </>
                ) : (
                    user_role === "USER" ? (
                      <>
                        <Notification data={[]} />

                      </>
                    ) : (
                        ""
                      )
                  )}

                <li className="nav-item dropdown header-profile">
                  <DropDown />
                </li>







              </ul>
            </div>
          </nav>
        </div>

        <Modal
          isOpen={showModal}
          backdrop="static"
          size="ms-5"
          title="Update Broker Key"
          hideBtn={true}
          handleClose={() => setshowModal(false)}
        >
          <UpdateBrokerKey closeModal={() => setshowModal(false)} />
        </Modal>




        <Modal
          isOpen={showModal1}
          backdrop="static"
          size="x"
          title="Chose Your Plan "
          hideBtn={true}
          handleClose={() => setshowModal1(false)}
        >

          <div className="modal-dialog-centered modal-xl">
            {

              <div className="uniqueModal-modal"  >
                <div className='uniqueModal-main-container'>
                  <div className="uniqueModal-container">
                    {getPlanInfo && getPlanInfo.map((data) => (
                      <div className="uniqueModal-card" key={data.id}>
                        <input
                          type="radio"
                          name="plan"
                          className="uniqueModal-radio-button"
                          value={data.key}
                          onChange={handleCheckboxChange}

                        // Add checked attribute based on some condition if needed
                        />
                        <div className="uniqueModal-card-content">
                          <h3>{data.name} Plan</h3>
                          <p>Perfect for short-term commitments</p>
                          <strong>₹ {data.value}/{data.name}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="d-block btn btn-primary" onClick={submitSelectedPlan}>Submit</button>
                </div>
              </div>
              // </div>
            }
          </div>






        </Modal>

      </div>
    </div>
  );
};

export default Header;

