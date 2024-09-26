import React, { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { useDispatch } from "react-redux";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import { fDateTime } from "../../../Utils/Date_formet";
import { GetSemiSingalsApi } from "../../../ReduxStore/Slice/Users/Userdashboard.Slice";
import axios from "axios";
import * as Config from "../../../Utils/Config";

export default function AllEmployees() {
  const dispatch = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("user_details"));

  const [searchInput, setSearchInput] = useState("");
  const [tableData, setTableData] = useState({
    loading: false,
    data: [],
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };
  useEffect(() => {
    userDataRes();
  }, []);
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
      headerName: "Signal Time",
      width: 260,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{fDateTime(params.value)}</b>
        </div>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      width: 110,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.row.signals.OType}</b>
        </div>
      ),
    },

    {
      field: "trade_symbol",
      headerName: "Trade Symbol",
      width: 320,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.row.postdata.trading_symbol}</b>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price ",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.row.signals.Price}</b>
        </div>
      ),
    },

    {
      field: "strategy",
      headerName: "strategy ",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.row.signals.Strategy}</b>
        </div>
      ),
    },
    {
      field: "qty",
      headerName: "qty",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.row.postdata.qty}</b>
        </div>
      ),
    },
    {
      field: "TradeType",
      headerName: "Trade Type ",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          {" "}
          <b>{params.row.signals.ExitStatus}</b>
        </div>
      ),
    },
    {
      field: "TrasectionType",
      headerName: "",
      width: 160,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <button
            className={
              params.row.postdata.transtype == "BUY"
                ? "btn btn-primary"
                : "btn btn-danger"
            }
            onClick={() => {
              UserCreateOrder(params.row);
            }}
          >
            {params.row.postdata.transtype == "BUY" ? "BUY" : "SELL"}
          </button>
        </div>
      ),
    },
  ];

  const userDataRes = async () => {
    const subadminId = userDetails.user_id;

    await dispatch(
      GetSemiSingalsApi({
        user_id: subadminId,
      })
    )
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setTableData({ loading: true, data: response.data });
        } else {
          setTableData({ loading: true, data: [] });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  let UserCreateOrder = (data) => {
    // let url = Config.react_domain + "signal/userorder";
    let url = "http://localhost:8000/userorder";

    axios
      .post(url, {
        data: data,
      })
      .then((response) => {
        if (response.data.status) {
          userDataRes();
        } else {
          userDataRes();
        }
      })
      .catch((error) => {
        userDataRes();

        console.log(error);
      });
  };

  return (
    <>
      {tableData.loading ? (
        <>
          <div className="content container-fluid" data-aos="fade-left">
            <div className="card">
              <div className="card-header">
                <div className="row align-center">
                  <div className="col">
                    <h5 className="card-title mb-0">
                      <i className="pe-2 far fa-clock"></i>Request Orders
                    </h5>
                  </div>
                  <div className="col-auto">
                    <div className="list-btn">
                      <ul className="filter-list mb-0">
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
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <FullDataTable
                  styles={styles}
                  label={label}
                  columns={columns}
                  rows={tableData.data}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
