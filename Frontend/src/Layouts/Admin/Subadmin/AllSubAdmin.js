import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { IndianRupee } from 'lucide-react';

import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetAllSubAdmin,
  update_Balance,
} from "../../../ReduxStore/Slice/Admin/Subadmins";

import { fDateTime } from "../../../Utils/Date_formet";

import Loader from "../../../Utils/Loader";

export default function Help() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [initialRowData, setInitialRowData] = useState({});
  const [getAllSubadmins, setAllSubadmins] = useState({
    loading: false,
    data: [],
    data1: [],
  });
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [balanceValue, setBalanceValue] = useState("");

  const handleBalance = (row) => {
    setInitialRowData(row);
    setShowBalanceModal(true);
  };

  const handleCloseBalanceModal = () => {
    setShowBalanceModal(false);
  };

  const handleSubmitBalance = async () => {
    const rowIndex = getAllSubadmins.data.findIndex(
      (row) => row.id === initialRowData.id
    );

    if (rowIndex !== -1) {
      const admin_id = JSON.parse(
        localStorage.getItem("user_details")
      )?.user_id;
      const id = getAllSubadmins.data[rowIndex]._id;
      console.log("id", id);
      try {
        const response = await dispatch(
          update_Balance({ id, Balance: balanceValue, admin_id })
        );
        if (response.status) {
          toast.success(response.msg);
          setTimeout(() => {
            navigate("/admin/allsubadmin");
          }, 1000);
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.error("Error updating balance:", error.message);
      }
    }
    setShowBalanceModal(false);
  };

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

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: styles.boldHeader,
    },
    {
      field: "FullName",
      headerName: "First name",
      width: 160,
      headerClassName: styles.boldHeader,
    },
    {
      field: "UserName",
      headerName: "User name",
      width: 160,
      headerClassName: styles.boldHeader,
    },
    {
      field: "PhoneNo",
      headerName: "Phone Number",
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "prifix_key",
      headerName: "prifixkey",
      width: 120,
      headerClassName: styles.boldHeader,
    },

    {
      field: "subadmin_service_type",
      headerName: "Service-Type",
      width: 200,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>{params.value == 1 ? "PER STRATEGY" : "PER TRADE"}</div>
      ),
    },
    {
      field: "Balance",
      headerName: "Balance",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <span class="text-success-light">  <IndianRupee style={{ height: "19px" }} />{params.value || '-'}</span>
          <AccountBalanceWalletIcon
            size="small"
            onClick={() => handleBalance(params.row)}
          />{" "}
        </div>
      ),
    },
    {
      field: "ActiveStatus",
      headerName: "Active State",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>
          <Switch
            defaultChecked={params.value == 1}
            onChange={(event) => handleChange(event, params.row.id)}
            {...label}
          />
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
      headerClassName: styles.boldHeader,
    },
    {
      field: "Create_Date",
      headerName: "createdAt",
      width: 250,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value)}</div>,
    },
  ];

  const handleEdit = (row) => {
    console.log("Edit row:", row);
    setInitialRowData(row);
    navigate("/admin/subadmin/edit", {
      state: { rowData: { ...row, _id: row._id } },
    });
  };

  const handleChange = (event, id) => {
    console.log("Delete row:", event, id);
  };

  const getSubadminData = async () => {
    await dispatch(GetAllSubAdmin())
      .unwrap()
      .then(async (response) => {

        if (response.status) {

          const formattedData = response.data && response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          setAllSubadmins({
            loading: true,
            data: formattedData,
            data1: [
              { name: "Total Subadmins", count: response.totalCount || 0, Icon: "fe fe-life-buoy", color: "#ec8000" },
              { name: "Active Subadmins", count: response.ActiveCount || 0, Icon: "fe fe-check-square", color: "#1e8edf" },
              {
                name: "InActive Subadmins",
                count: response.InActiveCount || 0
                , Icon: "fe fe-x-circle",
                color: "#ed3a3a"
              },
              {
                name: "Total Used Balance",
                count: response.ActiveUseBalance || 0
                , Icon: "fas fa-dollar-sign"
                , color: "#1d8147"

              },
            ],
          });

        } else {
          setAllSubadmins({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setAllSubadmins({
          loading: false,
          data: [],
        });
      });
  };

  useEffect(() => {
    getSubadminData();
  }, []);

  return (
    <>
      {getAllSubadmins.loading ? (
        <>
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <h5>Subadmins</h5>
                <div className="page-content">
                  <div className="list-btn">
                    <ul className="filter-list">
                      <li>
                        <a
                          className="btn-filters"
                          href="javascript:void(0);"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Refresh"
                        >
                          <span>
                            <i className="fe fe-refresh-ccw" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <div className="input-group">
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
                        <a
                          className="btn btn-filters w-auto popup-toggle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Filter"
                        >
                          <span className="me-2">
                            <img
                              src="assets/img/icons/filter-icon.svg"
                              alt="filter"
                            />
                          </span>
                          Filter
                        </a>
                      </li>

                      <li>
                        <div
                          className="dropdown dropdown-action"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Download"
                        >
                          <a
                            href="/"
                            className="btn btn-filters"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="me-2">
                              <i className="fe fe-download" />
                            </span>
                            Export
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <ul className="d-block">
                              <li>
                                <a
                                  className="d-flex align-items-center download-item"
                                  href="javascript:void(0);"
                                  download=""
                                >
                                  <i className="far fa-file-pdf me-2" />
                                  Export as PDF
                                </a>
                              </li>
                              <li>
                                <a
                                  className="d-flex align-items-center download-item"
                                  href="javascript:void(0);"
                                  download=""
                                >
                                  <i className="far fa-file-text me-2" />
                                  Export as Excel
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a
                          className="btn btn-filters"
                          href="javascript:void(0);"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Print"
                        >
                          <span className="me-2">
                            <i className="fe fe-printer" />
                          </span>{" "}
                          Print
                        </a>
                      </li>
                      <li>
                        <Link
                          to={"/admin/subadmin/add"}
                          className="btn btn-primary"
                        >
                          <i
                            className="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          />
                          Add Subadmins
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-list-head">
              <div className="row">
                {getAllSubadmins &&
                  getAllSubadmins.data1.map((data, index) => (
                    <div className="col-xl-3 col-md-6 d-flex" key={index}>
                      <div className="card w-100">
                        <div className="card-body">
                          <div className="grid-info-item total-items">
                            <div className="grid-info">
                              <span>{data.name}</span>
                              <h4 style={{ color: data.color }} >{data.count}</h4>
                            </div>
                            <div className="grid-head-icon">
                              <i className={data.Icon} style={{ color: data.color }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <FullDataTable
              styles={styles}
              label={label}
              columns={columns}
              rows={getAllSubadmins.data}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
      <Modal open={showBalanceModal} onClose={handleCloseBalanceModal}>
        <div
          className="modal"
          style={{ display: "block", padding: "20px" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Balance</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseBalanceModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  value={balanceValue}
                  onChange={(e) => setBalanceValue(e.target.value)}
                  placeholder="Enter Balance You want to add"
                />
              </div>
              <div className="modal-footer">
                <Button
                  onClick={handleSubmitBalance}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <Button
                  onClick={handleCloseBalanceModal}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      ;
    </>
  );
}
