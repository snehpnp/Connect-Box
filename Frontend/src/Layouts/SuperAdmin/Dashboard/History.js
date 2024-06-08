import React, { useEffect, useState } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { Link } from "react-router-dom";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import ExportToExcel from "../../../Utils/ExportCSV";
import { fDate } from "../../../Utils/Date_formet";
import { Adminhistory } from "../../../ReduxStore/Slice/SuperAdmin/SuperAdmin";

import { useDispatch } from "react-redux";

const History = () => {
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;

  const [model, setModel] = useState(false);
  const [history, setHistory] = useState([]);

  // admin history for superadmin

  const AdminHistory = async () => {
    setModel(!model);
    const data = { _id: user_id };
    await dispatch(Adminhistory(data))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setModel(!model);
          setHistory(response.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    AdminHistory();
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
      field: "index",
      headerName: "SR. No.",
      width: 280,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "Role",
      headerName: "Role",
      width: 290,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Balance",
      headerName: "Balance",
      width: 310,
      headerClassName: styles.boldHeader,
    },
    {
      field: "updatedAt",
      headerName: "Date",
      width: 310,
      headerClassName: styles.boldHeader,
      renderCell: (params) => fDate(params.value)
    },
  ];

  return (
    <div>
      <>
        <div className="content container-fluid" data-aos="fade-left">
          <div className="page-header">
            <div className="content-page-header">
              <h5>Admin History</h5>
              <div className="page-content">
                <div className="list-btn">
                  <ul className="filter-list">
                    <li className="mt-3">
                      <p
                        className="btn-filters"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Refresh"
                      >
                        <span>
                          <i className="fe fe-refresh-ccw" />
                        </span>
                      </p>
                    </li>
                    <li>
                      <div className="input-group input-block">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          aria-label="Search"
                          aria-describedby="search-addon"
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
                        <div className="card-body">
                          <ExportToExcel
                            className="btn btn-primary "
                            fileName={"All Strategy"}
                          />
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link className="btn btn-primary">
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Add Subadmin
                      </Link>
                      <div></div>
                    </li>
                  </ul>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          {model && (
            <FullDataTable styles={styles} columns={columns} rows={history} />
          )}
        </div>
        <ToastButton />
      </>
    </div>
  );
};

export default History;
