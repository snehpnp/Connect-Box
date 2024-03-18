/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import { check_Device } from "../../../Utils/find_device";
import Content from "../../../Components/Dashboard/Content/Content"

import { User_Dashboard_Data, Update_Dashboard_Data } from "../../../ReduxStore/Slice/Users/DashboardSlice";

const BrokerResponse = () => {
  const dispatch = useDispatch();


  // SET MODAL IN STARTEGY
  const [showStartegyModal, setShowStartegyModal] = useState(false);


  const [modalsingleValue, setModalsingleValue] = useState({});


  const handleCloseStartegyModal = () => {
    setStgstatus(false);
    setShowStartegyModal(false);
    setModalsingleValue({})
    setrefresh(!refresh)
  }

  const handleShowStartegyModal = (data) => {
    setModalsingleValue(data)
    setShowStartegyModal(true);
  }



  const [inputValue, setInputValue] = useState('1');


  const [DashboardData, setDashboardData] = useState({
    loading: true,
    data: [],
  });

  const [Strategy, setStrategy] = useState({ loading: true, data: [] });
  const [GetServiceStrategy, setGetServiceStrategy] = useState([]);
  const [statusStartegyUser, setStatusStartegy] = useState("0");
  const [getStrategyCount, setStrategyCount] = useState("0");
  const [stgstatus, setStgstatus] = useState(false);



  const [refresh, setrefresh] = useState(false);

  const AdminToken = JSON.parse(localStorage.getItem("user_details")).token;
  const user_Id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const gotodashboard = JSON.parse(localStorage.getItem("gotodashboard"));
  const GoToDahboard_id = JSON.parse(localStorage.getItem("user_details_goTo"));


  const [updatedData, setUpdatedData] = useState({});

  const Role = JSON.parse(localStorage.getItem("user_role"));

  const getservice = async () => {
    await dispatch(
      User_Dashboard_Data({
        user_Id: gotodashboard ? GoToDahboard_id.user_id : user_Id,
        AdminToken: AdminToken,
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status) {
          setDashboardData({
            loading: false,
            data: response.services,
          });

          setStrategy({
            loading: false,
            data: response.strategy,
          });

          setGetServiceStrategy(response.GetServiceStrategy);
          setStatusStartegy(response.status_startegy);
          setStrategyCount(response.count_strategy_select);
        }
      });
  };



  const setgroup_qty_value_test = (e, symboll, rowdata, data) => {

    const numericValue = e.target.value.replace(/[^0-9]/g, '');

    if (e.target.name === "lot_size") {
      if (numericValue) {
        setInputValue((prevPrices) => ({ ...prevPrices, [symboll]: e.target.value }));

        if (
          data.servicegroup_services_ids.group_qty !== 0 &&
          parseInt(e.target.value) * parseInt(data.service.lotsize) > parseInt(data.servicegroup_services_ids.group_qty)
        ) {
          toast.error(`Can't update more than ${data.servicegroup_services_ids.group_qty} in ${symboll}`);
          e.target.value = "";
          return;
        }
      } else {
        e.target.value = "";
        return;
      }
    } 
    else if (e.target.name === "strategy_id") {

     if(data.userInfo.multiple_strategy_select == "0" || data.userInfo.multiple_strategy_select == 0){
        // Single Startegty Select Code
        
        // Find the object with the matching _id
      const targetObject = GetServiceStrategy.find(item => item._id == data.service._id);
      if (targetObject.strategy_id.includes(e.target.value)) {
        const updatedStrategyId = targetObject.strategy_id.filter(id => id !== e.target.value);
        // Create a new object with the updated strategy_id
        const updatedObject = { ...targetObject, strategy_id: updatedStrategyId };
        // Update the state
        setGetServiceStrategy((oldArray) => oldArray.map(item => (item._id === targetObject._id ? updatedObject : item)));

      } else {

        if (DashboardData.data[0].userInfo.multiple_strategy_select == 0) {
          const updatedObject = { ...targetObject, strategy_id: [e.target.value] };
          setGetServiceStrategy((oldArray) => oldArray.map(item => (item._id === targetObject._id ? updatedObject : item)));
        } else {

          const updatedObject = { ...targetObject, strategy_id: [...targetObject.strategy_id, e.target.value] };
          setGetServiceStrategy((oldArray) => oldArray.map(item => (item._id === targetObject._id ? updatedObject : item)));
        }
      }


       }else{
    
      // Multiple Startegty Select Code
      const serviceStrategy = GetServiceStrategy.find((data) => data._id == modalsingleValue.service._id);
    
      if (e.target.checked && Number(getStrategyCount) <= Number(serviceStrategy.strategy_id.length)) {
        alert("Not Select");
        e.target.checked = false;
        return;
      }
      const targetObject = serviceStrategy;

      if (targetObject.strategy_id.includes(e.target.value)) {
        const updatedStrategyId = targetObject.strategy_id.filter((id) => id !== e.target.value);
        const updatedObject = { ...targetObject, strategy_id: updatedStrategyId };
        setGetServiceStrategy((oldArray) => oldArray.map((item) => (item._id === targetObject._id ? updatedObject : item)));
      } else {
        const updatedObject = { ...targetObject, strategy_id: [...targetObject.strategy_id, e.target.value] };
        setGetServiceStrategy((oldArray) => oldArray.map((item) => (item._id === targetObject._id ? updatedObject : item)));
      }


      }


    }

    let name = e.target.name;
    let value = e.target.value;
    let id = rowdata._id;
    console.log("rowdata: ", rowdata);

    setUpdatedData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [name]: name === "active_status" ? e.target.checked : value,
        ...(name === "lot_size" && { quantity: parseInt(e.target.value) * parseInt(data.service.lotsize) }),
        ...(name !== "lot_size" && { quantity: data.service.lotsize, lot_size: "1" }),
      },
    }));
  };




  if (updatedData) {
    GetServiceStrategy.forEach((item) => {

      if (updatedData[item._id] != undefined) {
        if (updatedData[item._id].strategy_id != undefined) {
          updatedData[item._id].strategy_id = item.strategy_id;
        }
      }
    });
  }


  const UpdateDashboard = async (e) => {

    if (statusStartegyUser == "1") {
      const isEmpty = Object.keys(updatedData).length === 0;

      if (isEmpty == false) {

        const result = Object.keys(updatedData)
          .filter((key) => Array.isArray(updatedData[key].strategy_id) && updatedData[key].strategy_id.length === 0)
          .reduce((obj, key) => {
            obj[key] = updatedData[key];
            return obj;
          }, {});
        const inputId = Object.keys(result)[0];
        const matchingObject = GetServiceStrategy.find(obj => obj._id === inputId);
        const serviceName = matchingObject ? matchingObject.service_name : null;
        const isEmptyStartegyArray = Object.keys(result).length === 0;
        if (isEmptyStartegyArray == false) {
          alert("Please Select one Strategy a script " + serviceName)
          return
        }

      }
    }

    handleCloseStartegyModal()


    await dispatch(
      Update_Dashboard_Data({
        data: {
          servicesData: updatedData,
          statusStartegyUser: statusStartegyUser,
          GetServiceStrategy: GetServiceStrategy,
          user_id: user_Id,
          data: { Editor_role: Role, device: check_Device() },
        },
        AdminToken: AdminToken,
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status) {
          setrefresh(!refresh)
          toast.success(response.msg);
        } else {
          setrefresh(!refresh)
          toast.error(response.msg);
        }
      });

    setrefresh(!refresh)
  };





  useEffect(() => {
    getservice();
  }, [refresh]);

  useEffect(() => {
    getservice();
  }, []);


  return (
    
    <Content Page_title="Dashboard" button_status={false}>
      <div className="margin-top-minus">
<div className="row">
  <div className="col-md-3">
  <div className="card dash-card-color">

  <div className="row mx-auto w-100 py-3">
  <div className="col-md-8">
  <p class="mb-0 text-whitedark">M2M Released</p>
  </div>
  <div className="col-md-4">
    <h4 className="text-end">12</h4>
  </div>
  </div>
  <div className="bg-orange">
    <div className="col-md-12 text-center">
      <img src="assets/images/line-chart.png" className="w-50"></img>
    </div>
  </div>
  </div>
  </div>
  <div className="col-md-3">
  <div className="card dash-card-color">

  <div className="row mx-auto w-100 py-3">
  <div className="col-md-8">
  <p class="mb-0 text-dark">Total Margin</p>
  </div>
  <div className="col-md-4">
    <h4 className="text-end">12</h4>
  </div>
  </div>
  <div className="bg-blue">
    <div className="col-md-12 text-center">
      <img src="assets/images/line-chart.png" className="w-50"></img>
    </div>
  </div>
  </div>
  </div>
  <div className="col-md-3">
  <div className="card dash-card-color">

  <div className="row mx-auto w-100 py-3">
  <div className="col-md-8">
  <p class="mb-0 text-whitedark">Used Margin</p>
  </div>
  <div className="col-md-4">
    <h4 className="text-end">12</h4>
  </div>
  </div>
  <div className="bg-pink">
    <div className="col-md-12 text-center">
      <img src="assets/images/line-chart.png" className="w-50"></img>
    </div>
  </div>
  </div>
  </div>
  <div className="col-md-3">
  <div className="card dash-card-color">

  <div className="row mx-auto w-100 py-3">
  <div className="col-md-8">
  <p class="mb-0 text-whitedark">Available Margin</p>
  </div>
  <div className="col-md-4">
    <h4 className="text-end">12</h4>
  </div>
  </div>
  <div className="bg-purple">
    <div className="col-md-12 text-center">
      <img src="assets/images/line-chart.png" className="w-50"></img>
    </div>
  </div>
  </div>
  </div>
</div>
</div>
      <div className="table-responsive">
        <table className="table dashboard-table">
          <thead className="bg-primary">
            <tr>
              <th>#</th>
              {/* <th>Live Price</th> */}
              <th>Symbol</th>
              <th>lot size</th>
              {/* <th>max Qty</th> */}
              <th>LotSize</th>
              <th>Quantity</th>
              <th>Strategy</th>
              <th>Order Type</th>
              <th>Profuct Type</th>
              <th>Trading </th>
            </tr>
          </thead>
          <tbody>
            {DashboardData.data &&
              DashboardData.data.map((data, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{`${data.service.name}[${data.categories.segment}]`}</td>
                      <td>{data.service.lotsize}</td>

                      <td>
                        <div className="row d-flex">
                          <div className="col-lg-12">
                            <input
                              key={index}
                              type="number"
                              name="lot_size"
                              className="form-control"
                              id="lot_size"
                              placeholder="Enter Qty"
                              min={1}
                              // max={setMax(data)}
                              // defaultValue={data.service.lotsize}

                              onChange={
                                (e) => {
                                  setgroup_qty_value_test(e, data.service.name, data.service, data)
                                }
                              }
                              defaultValue={data.lot_size}

                            />
                          </div>

                        </div>
                      </td>

                      <td>{inputValue[data.service.name] ? parseInt(inputValue[data.service.name]) * parseInt(data.service.lotsize) :
                        parseInt(data.lot_size) * parseInt(data.service.lotsize)}</td>

                      <td className="color-primary col-md-2">
                        {data.userInfo.multiple_strategy_select === "1" ?
                          <Button variant="outline-primary" onClick={() => handleShowStartegyModal(data)} className="px-3 py-2 btn-sm">
                            Selected Strategy
                          </Button>
                          :
                          //  "Single Strategy Select"
                          // <select
                          //   name="strategy_id"

                          //   class="form-select form-select-lg "
                          //   aria-label=".form-select-lg example"
                          //   onChange={(e) =>
                          //     setgroup_qty_value_test(
                          //       e,
                          //       data.service.name,
                          //       data.service,
                          //       data
                          //     )
                          //   }
                          // >


                          //   {Strategy.data &&
                          //     Strategy.data.map((item) => {
                          //       if (data.strategy_id.includes(item.result._id)) {
                          //         return (
                          //           <option
                          //             className="text-success h6"
                          //             value={item.result._id}

                          //           >
                          //             {item.result.strategy_name}
                          //           </option>
                                    
                          //         );
                          //       } else {
                          //         return (
                          //           <option
                          //             className="text-danger h6"
                          //             value={item.result._id}
                          //           >
                          //             {item.result.strategy_name}
                          //           </option>
                          //         );
                          //       }

                          //     })}
                          // </select>
                          <select
                            name="strategy_id"

                            class="form-select form-select-lg "
                            aria-label=".form-select-lg example"
                            onChange={(e) =>
                              setgroup_qty_value_test(
                                e,
                                data.service.name,
                                data.service,
                                data
                              )
                            }

                          >
                            <option
                              value={Strategy.data && Strategy.data.map((item) => { if (data.strategy_id.includes(item.result._id)) { return item.result._id } })}


                              className="text-success h6"
                              selected
                              disabled
                            >
                              {Strategy.data && Strategy.data.map((item) => { if (data.strategy_id.includes(item.result._id)) { return item.result.strategy_name } })}
                            </option>
                            {Strategy.data &&
                              Strategy.data.map((item) => {

                                if (data.strategy_id.includes(item.result._id)) {
                                  // return (
                                  //   <option
                                  //     className="text-success h6"
                                  //     value={item.result._id}
                                  //   >
                                  //     {item.result.strategy_name}
                                  //   </option>
                                  // );
                                } else {
                                  return (
                                    <option
                                      className="text-danger h6"
                                      value={item.result._id}
                                    >
                                      {item.result.strategy_name}
                                    </option>
                                  );
                                }

                              })}
                          </select>
                        }
                      </td>

                      <td className="color-primary">
                        <select
                          name="order_type"
                          class="form-select form-select"
                          aria-label=".form-select example"
                          onChange={(e) =>
                            setgroup_qty_value_test(
                              e,
                              data.service.name,
                              data.service,
                              data
                            )
                          }
                          defaultValue={data.order_type}
                        >
                          <option value="1">MARKET</option>
                          <option value="2">LIMIT</option>
                          <option value="3">STOPLOSS LIMIT</option>
                          <option value="4">STOPLOSS MARKET</option>
                        </select>
                      </td>
                      <td className="color-primary">
                        <select
                          name="product_type"
                          class="form-select form-select "
                          aria-label=".form-select example"
                          onChange={(e) =>
                            setgroup_qty_value_test(
                              e,
                              data.service.name,
                              data.service,
                              data
                            )
                          }
                          defaultValue={data.product_type}
                        >
                          <option value="2">MIS</option>
                          <option value="1">CNC</option>
                          <option value="3">BO</option>
                          <option value="4">CO</option>
                        </select>
                      </td>
                      <td className="color-primary">
                        <label class="toggle">
                          <input
                            class="toggle-checkbox "
                            type="checkbox"
                            name="active_status"
                            defaultChecked={data.active_status === "1"}
                            onChange={(e) =>
                              setgroup_qty_value_test(
                                e,
                                data.service.name,
                                data.service,
                                data
                              )
                            }
                          />
                          <div
                            class={`toggle-switch ${data.active_status === "1"
                              ? ""
                              : "bg-secondary"
                              }`}
                          ></div>
                        </label>
                      </td>
                    </tr>
                  </>
                );
              })}
            <ToastButton />
          </tbody>
        </table>
      </div>
      <Modal show={showStartegyModal} onHide={handleCloseStartegyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Strategy</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <div>
            {
              modalsingleValue.strategy_id != undefined ?
                Strategy.data &&
                Strategy.data.map((item) => (
                  <div key={item.result._id}>
                    <input
                      name="strategy_id"
                      className="form-check-input"
                      type="checkbox"
                      id={item.result._id}
                      value={item.result._id}
                      onChange={(e) =>
                        setgroup_qty_value_test(
                          e,
                          modalsingleValue.service.name,
                          modalsingleValue.service,
                          modalsingleValue
                        )
                      }
                      defaultChecked={modalsingleValue.strategy_id.includes(item.result._id)}
                    />

                    <label
                      className={`form-check-label ${modalsingleValue.strategy_id.includes(item.result._id)
                        ? "text-success"
                        : "text-danger"
                        } h6`}
                      htmlFor={item.result._id}
                    >
                      {item.result.strategy_name}
                    </label>

                  </div>
                ))
                : ""
            }
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStartegyModal}>
            Cancel
          </Button>

          <Button variant="secondary" onClick={(e) => UpdateDashboard(e)} >
            Update
          </Button>

        </Modal.Footer>
      </Modal>






      {gotodashboard ? (
        ""
      ) : (
        <>
          <button
            type="button"
            class="btn btn-primary"
            onClick={(e) => UpdateDashboard(e)}
          >
            Update
          </button>
        </>
      )}


    </Content>



  );
};

export default BrokerResponse;
