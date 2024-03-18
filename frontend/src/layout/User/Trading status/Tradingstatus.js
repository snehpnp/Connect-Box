// import React from 'react'
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Content from "../../../Components/Dashboard/Content/Content";
import Theme_Content from "../../../Components/Dashboard/Content/Theme_Content";
import Loader from "../../../Utils/Loader";
import FullDataTable from "../../../Components/ExtraComponents/Datatable/FullDataTable";
import { Get_order_data } from "../../../Service/common.service.js";
// import { GET_ALL_CLIENTS } from '../../../ReduxStore/Slice/Admin/AdminSlice'
import {
  Get_All_TRADINGSTATUS_USER,
  user_activity_logs,
} from "../../../ReduxStore/Slice/Users/TradingStatusSlice";

import { useDispatch, useSelector } from "react-redux";
// import Modal from '../../../../Components/ExtraComponents/Modal';
import { fDate, fDateTimeSuffix } from "../../../Utils/Date_formet";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const TradingStatus = () => {
  const dispatch = useDispatch();
  const user_Id = JSON.parse(localStorage.getItem("user_details")).user_id;
  const gotodashboard = JSON.parse(localStorage.getItem('user_details_goTo'))
  const isgotodashboard = JSON.parse(localStorage.getItem('gotodashboard'))

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;

  const [first, setfirst] = useState("all");
  const [getorderBook, setorderBook] = useState(false);

  const [DateFilter, setDateFilter] = useState();
  const [DateArray, setDateArray] = useState([]);

  const [OrderData, setOrderData] = useState({
    loading: true,
    data: []
  });
  const [getAllUserTrading_status, setAllUserTrading_status] = useState({
    loading: true,
    data: [],
  });
  const [userLogs, setUserLogs] = useState({
    loading: true,
    data: [],
  });

  console.log("userLogs :", userLogs)

  let req = {
    user_Id: isgotodashboard ? gotodashboard.user_id : user_Id,
  };


  // PANEL TRADING STATUS
  const data1 = async () => {
    await dispatch(Get_All_TRADINGSTATUS_USER(req))
      .unwrap()
      .then((response) => {
        if (response.status) {
          if (first === "all") {
            setAllUserTrading_status({
              loading: false,
              data: response.data,
            });
          }

          let abc = response.data.filter((item) => {
            return item.createdAt.split("T")[0] === first;
          });
          setAllUserTrading_status({
            loading: false,
            data: abc,
          });
        } else {
          setAllUserTrading_status({
            loading: false,
            data: [],
          });
        }
      });
  };


  // UPDATE STATUS
  const panel_status = async () => {
    await dispatch(user_activity_logs(req))
      .unwrap()
      .then((response) => {

        console.log("response :", response)
        if (response.status) {
          setUserLogs({
            loading: false,
            data: response.data,
          });
        }
        else{
          setUserLogs({
            loading: false,
            data: [],
          });

        }
      });
  }

  // ORDER BOOK
  const Get_User_order = async () => {
    let Getdata1 = await Get_order_data({
      "user_id": user_id
    });
    setOrderData({
      loading: false,
      data: Getdata1.data
    })
  }



  const ordercolumns = [
    {
      name: 'id',
      selector: (row, index) => index + 1,
    },
    {
      text: 'Symbol Name',
      dataField: "tradingsymbol",
    },
    {
      text: 'Type',
      dataField: "transactiontype",
    },
    {
      text: 'Price',
      dataField: "price",
    },
    {
      text: 'Quantity',
      dataField: "quantity",
    },
    {
      text: 'Exchange',
      dataField: "exchange",
    },
    {
      text: 'Order Type',
      dataField: "ordertype",
    },
    {
      text: 'Order Id',
      dataField: "orderid",
    },
    {
      text: 'Order Status',
      dataField: "orderstatus",
    },
    {
      text: 'Time',
      dataField: "updatetime",
    },

  ];

  const columns = [
    {
      dataField: "index",
      text: "SR. No.",
      formatter: (cell, row, rowIndex) => rowIndex + 1,
    },
    {
      dataField: "createdAt",
      text: "Time",
      formatter: (cell, row, rowIndex) => fDateTimeSuffix(cell),
    },
    {
      dataField: "login_status",
      text: "login status",
      formatter: (cell, row) => (
        <>
          <div>
            <span data-toggle="tooltip" data-placement="top" title="Delete">
              {row.login_status == null ? row.trading_status : row.login_status}
            </span>
          </div>
        </>
      ),
    },

    {
      dataField: "role",
      text: "role",
    },
    {
      dataField: "system_ip",
      text: "system_ip",
    },
  ];

  const columns1 = [
    {
      dataField: "index",
      text: "SR. No.",
      formatter: (cell, row, rowIndex) => rowIndex + 1,
    },
    {
      dataField: "createdAt",
      text: "Time",
      formatter: (cell, row, rowIndex) => fDateTimeSuffix(cell),
    },
    {
      dataField: "Strategy",
      text: "Strategy",
      formatter: (cell, row) => (
        <>
          <div>{cell ? cell : "-"}</div>
        </>
      ),
    },
    {
      dataField: "message",
      text: "Update",
      formatter: (cell, row) => (
        <>
          <div>{cell ? cell : "-"}</div>
        </>
      ),
    },
    {
      dataField: "quantity",
      text: "Qty",
      formatter: (cell, row) => (
        <>
          <div>{cell ? cell : "-"}</div>
        </>
      ),
    },

    {
      dataField: "system_ip",
      text: "IP",
    },
    {
      dataField: "device",
      text: "Device",
    },
    {
      dataField: "role",
      text: "Update By",
    },
  ];



  var dateArray = [];
  const dateArr = () => {

    for (let i = 0; i < 3; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);

      const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
      const month = currentDate.getMonth() + 1 < 10
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      dateArray.push(formattedDate);
    }

    console.log(dateArray);

    setDateArray(dateArray);
    setfirst(dateArray[0]);
  };



  useEffect(() => {
    data1();
  }, [first]);


  useEffect(() => {
    dateArr();
    data1();
  }, []);




  return (
    <>
      {getAllUserTrading_status.loading ? (
        <Loader />
      ) : (
        <>
          <Content Page_title="Trading Status" button_status={false}>
            <div className="mt-2 clip-tabs">
            
              <ul
                className="nav nav-tabs justify-content-center border-0"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    href="#panel-update"
                    onClick={(e) => data1()}
              
                  >
                    Panel Trading Status
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#update-status"
                    onClick={(e) => panel_status()}
                  
                  >
                    Update Status
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#position">
                    Position
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#OpenOrder"
                    onClick={(e) => Get_User_order()}
                  >
                    Orders Book
                  </a>
                </li>
              </ul>

              {/* Tab panes */}
              <div className="tab-content">
                <div id="panel-update" className="container tab-pane active">

                  <div className="col-lg-6">
                    <div className="mb-3 row">
                      <div className="col-lg-7">
                        <select
                          className="default-select wide form-control"
                          id="validationCustom05"
                          onChange={(e) => setfirst(e.target.value)}
                        >

                          {DateArray &&
                            DateArray.map((item) => {
                              return (
                                <>
                                  <option value={item}>{item}</option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                  {getAllUserTrading_status.data &&
                    getAllUserTrading_status.data.length === 0 ?
                    (
                      <FullDataTable
                        TableColumns={columns}
                        tableData={getAllUserTrading_status.data}
                      />
                    ) : (
                      <>
                        <FullDataTable
                          TableColumns={columns}
                          tableData={getAllUserTrading_status.data}
                        />
                      </>
                    )}

                </div>
                <div id="update-status" className="container tab-pane fade">
                {userLogs.loading ? (
                    <Loader />
                  ) :
                    <FullDataTable  TableColumns={columns1} tableData={userLogs.data}/>
                }
                </div>

                <div id="position" className="container tab-pane fade">
                {userLogs.loading ? (
                    <Loader />
                  ) :
                    <FullDataTable  TableColumns={columns1} tableData={userLogs.data}/>
                }
                </div>


                <div id="position" className="container tab-pane fade">
                  <br />
                  <img
                    src="/assets/images/dash_icon/Screenshot_17.png"
                    className="w-100"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </div>


                <div id="OpenOrder" className="container tab-pane fade">
                  {OrderData.loading ? (
                    <Loader />
                  ) :
                    <FullDataTable TableColumns={ordercolumns} tableData={OrderData} />
                  }
                </div>


              </div>


            </div>
          </Content>
        </>
      )}
    </>
  );

};

export default TradingStatus;
