/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { Broker_Response } from "../../../ReduxStore/Slice/Users/BrokerResponseSlice";
import { fa_time, fDateTimeSuffix } from "../../../Utils/Date_formet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../Components/Dashboard/Models/Model";
import { Eye } from "lucide-react";

import { Link } from "react-router-dom";

export default function BrokerResponse() {
  const user_Id = JSON.parse(localStorage.getItem("user_details")).user_id;

  const dispatch = useDispatch();

  const [refresh, setrefresh] = useState(false);
  const [searchInput,setSearchInput] = useState("")
  const [showModal, setshowModal] = useState(false);
  const [BrokerResponseId, setBrokerResponseId] = useState([]);
  const [DashboardData, setDashboardData] = useState({ loading: true, data: []});



  const [borkerData, setBrokerData] = useState();

  //  for Add Licence
  const [showAddLicenceModal, setshowAddLicenceModal] = useState(false);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    card: {
      width: "auto",
    },
    boldHeader: {
      fontWeight: "bold",
    },
    headerButton: {
      marginRight: 8,
    },
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: styles.boldHeader,

      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.value + 1}</b>
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTimeSuffix(params.value)}</div>,
    },
    {
      field: "symbol",
      headerName: "Symbol",
      width: 200,
      headerClassName: styles.boldHeader,
    },
    {
      field: "strategy",
      headerName: "Strategy",
      width: 200,
      headerClassName: styles.boldHeader,
    },
    {
      field: "type",
      headerName: "Type",
      width: 160,
      headerClassName: styles.boldHeader,
    },
    {
      field: "broker_name",
      headerName: "Broker name",
      width: 200,
      headerClassName: styles.boldHeader,
    },
    {
      field: "order_id",
      headerName: "Order Id",
      width: 200,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{params.value ? params.value : "-"}</div>,
    },
    {
      field: "order_status",
      headerName: "Order Status",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{params.value ? params.value : "-"}</div>,
    },

    {
      field: "info",
      headerName: "view",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {
            <Eye
              onClick={(e) => {
                setshowModal(true);
                setBrokerData(params.row);
              }}
            />
          }
        </div>
      ),
    },
  ];

  // GET BROKER RESPONSE ALL DATA
  const BrokerResponse = async (e) => {
    const data = { id: user_Id };
    await dispatch(Broker_Response(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
            const filterdata = response.data && response.data.filter((item)=>{
              const inputSearchMatch = searchInput === "" ||
          (item && item.symbol && item.symbol.toLowerCase().includes(searchInput.toLowerCase())) ||
          (item && item.type && item.type.toLowerCase().includes(searchInput.toLowerCase())) ||
          (item && item.broker_name && item.broker_name.toLowerCase().includes(searchInput.toLowerCase())) ||
          (item && item.item && item.item.symbol && item.item.symbol.toLowerCase().includes(searchInput.toLowerCase())) ||
          (item && item.createdAt && item.createdAt.toLowerCase().includes(searchInput.toLowerCase()))||
          (item && item.order_status && item.order_status.toLowerCase().includes(searchInput.toLowerCase()))||
          (item && item.order_id && item.order_id.toLowerCase().includes(searchInput.toLowerCase()))||
          (item && item.strategy && item.strategy.toLowerCase().includes(searchInput.toLowerCase()))
        return inputSearchMatch;
            })
          setDashboardData({
            loading: false,
            data: searchInput ? filterdata : response.data});
        }
      });
  };

  useEffect(() => {
    BrokerResponse();
  }, [refresh,searchInput]);

  // REFRESH HANDEL
  const RefreshHandle = () => {
    BrokerResponse();
    setSearchInput("")
    setrefresh(!refresh);
  };

  return (
    <>
      <div className="content container-fluid" data-aos="fade-left">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-title mb-0">
                  <i className="pe-2 fa-solid fa-users"></i>
                  Broker Response
                </h5>
              </div>
              <div className="col-auto">
                <div className="list-btn">
                  <ul className="filter-list mb-0">
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
                          className="form-control"
                          placeholder="Search..."
                          aria-label="Search"
                          aria-describedby="search-addon"
                          onChange={(e) => setSearchInput(e.target.value)}
                          value={searchInput}
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        className="dropdown dropdown-action"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Download"
                      >
                        {/* <ExportToExcel
                              className="btn btn-primary "
                              apiData={ForGetCSV}
                              fileName={'All Strategy'} />
                           */}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <FullDataTable
              styles={styles}
              columns={columns}
              rows={DashboardData.data}
            />
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <Modal
            isOpen={showModal}
            size="xl"
            title="Details View"
            hideBtn={true}
            // onHide={handleClose}
            handleClose={() => setshowModal(false)}
          >
            <div style={{ padding: "20px", overflow: "auto"}}>
              <table className="tg">
                <thead>
                  <tr>
                    <th style={{width:"8rem"}}>Created At</th>
                    <th>{fDateTimeSuffix(borkerData.createdAt)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Symbol</td>
                    <td>{borkerData.symbol}</td>
                  </tr>
                  <tr>
                    <td>Broker Name</td>
                    <td>{borkerData.broker_name}</td>
                  </tr>
                  <tr>
                    <td>Order Id</td>
                    <td>{borkerData.order_id ? borkerData.order_id : "-"}</td>
                  </tr>
                  <tr>
                    <td>Receive Signal</td>
                    <td>{borkerData.order_id ? borkerData.order_id : "-"}</td>
                  </tr>
                  <tr>
                    <td>Signal</td>
                    <td>
                      {atob(
                        borkerData.send_request ? borkerData.send_request : "-"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Order Status</td>
                    <td>{borkerData.order_status}</td>
                  </tr>
                  <tr>
                    <td>Reject Reson</td>
                    <td>{borkerData.reject_reason}</td>
                  </tr>
                  <tr>
                    <td>Order Data</td>
                    <td>{borkerData.order_view_date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}
