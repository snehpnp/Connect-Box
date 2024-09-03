import React, { useEffect, useState } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  Get_All_Researcher,
  Update_Balance,
  Delete_Researcher,
} from "../../../ReduxStore/Slice/Researcher/ResearcherSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate , useLocation } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Trash2, IndianRupee } from "lucide-react";
import ExportToExcel from "../../../Utils/ExportCSV";
import { Show_Status } from "../../../ReduxStore/Slice/Admin/Subadmins";
import Swal from "sweetalert2";
import Loader from "../../../Utils/Loader";

import { fDateTime } from "../../../Utils/Date_formet";

const AllResearcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allResearcher, setAllResearcher] = useState({
    loading: true,
    data: [],
  });
  const [ForGetCSV, setForGetCSV] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [updateBalance, setUpdateBalance] = useState([]);
  const [inputBalance, setInputBalance] = useState("0");

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id;


  const location = useLocation();
  var dashboard_filter = location.search.split("=")[1];

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
      fontWeight: 800,
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
      field: "UserName",
      headerName: "User name",
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "FullName",
      headerName: "Full name",
      width: 200,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 220,
      headerClassName: styles.boldHeader,
    },
    {
      field: "PhoneNo",
      headerName: "Phone Number",
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "client_key",
      headerName: "Client Key",
      width: 180,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Balance",
      headerName: "Add Balance",
      width: 150,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: "#E1FFED", // Green
            border: "none",
            color: "#33B469",
            // width: "150px",
            padding: "6px 10px", // Adjusted padding
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "13px",
            // margin: '4px 2px',
            cursor: "pointer",
            borderRadius: "10px", // Rounded border radius
            transition: "background-color 0.3s ease",
          }}
          onClick={() => {
            handleOnClick(params.row);
          }}
        >
          <span style={{ fontWeight: "bold", verticalAlign: "middle" }}>
            {" "}
            +
            <IndianRupee
              style={{
                height: "16px",
                marginBottom: "-4px",
                marginRight: "0px",
              }}
            />
            {params.value || "-"}
          </span>
        </div>
      ),
    },

    {
      field: "ActiveStatus",
      headerName: "Status",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div className="status-toggle">
          <input
            id={`rating_${params.row.id}`}
            className="check"
            type="checkbox"
            onChange={(event) => handleSwitchChange(event, params.row._id)}
            defaultChecked={params.value == 1}
          />
          <label
            htmlFor={`rating_${params.row.id}`}
            className="checktoggle checkbox-bg"
          ></label>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleEdit(params.row, params)}
          >
            <EditIcon />
          </IconButton>
          {/* <IconButton
            aria-label="edit"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            <Trash2 />
          </IconButton> */}
        </div>
      ),
      headerClassName: styles.boldHeader,
    },
    {
      field: "createdAt",
      headerName: "Account Created At",
      width: 220,
      headerClassName: styles.boldHeader,
      renderCell: (params) => <div>{fDateTime(params.value)}</div>,
    },
  ];
  const handleEdit = (id, obj) => {
    navigate(`/admin/research/edit/${id._id}`, { state: { rowData: obj.row } });
  };

  const handleDelete = async (row) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      let data = { id: row._id }; // Assuming `row._id` holds the ID of the record to delete
      try {
        const response = await dispatch(Delete_Researcher(data)).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          });

          setrefresh(!refresh);
        }
      } catch (error) {
        console.error("There was a problem with the API request:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error processing your request.",
          icon: "error",
        });
      }
    }
  };

  const handleOnClick = (row) => {
    setShowBalanceModal(true);
    setUpdateBalance({ _id: row._id, parent_id: row.parent_id });
  };

  const handleSwitchChange = async (event, id) => {
    const user_active_status = event.target.checked ? 1 : 0;

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      try {
        const response = await dispatch(
          Show_Status({ id, user_active_status })
        ).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Saved!",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            Swal.close(); 
            setrefresh(!refresh);
          }, 1000);
        } else {
          setrefresh(!refresh);
        }
      } catch (error) {
        console.error("Error", error);
        Swal.fire(
          "Error",
          "There was an error processing your request.",
          "error"
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.reload();
    }
  };

  const GetAllResearcher = async () => {
    let data = { id: user_id };
    try {
      const response = await dispatch(Get_All_Researcher(data)).unwrap();
      if (response.status) {



        var formattedData

        if (dashboard_filter == 4 || dashboard_filter==undefined ) {
          formattedData = response.data 
        }
        else if (dashboard_filter == 5) {
          formattedData = response.data.filter(data => data.ActiveStatus == 1);
        }else if (dashboard_filter == 6) {
          formattedData = response.data.filter(data => data.ActiveStatus == 0);
        }
        const filterData = response.data.filter((items) => {
          const searchMatch =
            inputSearch == "" ||
            items.UserName.toLowerCase().includes(inputSearch.toLowerCase()) ||
            items.FullName.toLowerCase().includes(inputSearch.toLowerCase()) ||
            items.Email.toLowerCase().includes(inputSearch.toLowerCase()) ||
            items.PhoneNo.toLowerCase().includes(inputSearch.toLowerCase()) || 
            items.prifix_key.toLowerCase().includes(inputSearch.toLowerCase())  


          return searchMatch;
        });
        setAllResearcher({
          loading: false,
          data: inputSearch ? filterData : formattedData,
        });
      } else {
        setAllResearcher({
          loading: false,
          data: [],
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    GetAllResearcher();
  }, [inputSearch,refresh]);

  const forCSVdata = () => {
    let csvArr = [];
    if (allResearcher.data.length > 0) {
      allResearcher.data.map((item) => {
        return csvArr.push({
          FullName: item.FullName,
          UserName: item.UserName,
          PhoneNo: item.PhoneNo,
          "Prifix Key": item.prifix_key,
          Balance: item.Balance,
        });
      });

      setForGetCSV(csvArr);
    }
  };

  useEffect(() => {
    forCSVdata();
  }, [allResearcher.data]);

  const handleRefresh = () => {
    setrefresh(!refresh);
    setInputSearch("");
  };

  const handlesubmit = async () => {
    let data = {
      _id: updateBalance._id,
      parent_id: updateBalance.parent_id,
      Balance: inputBalance,
    };
    await dispatch(Update_Balance(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          setShowBalanceModal(false);
          setInputBalance("0");
          Swal.fire({
            title: "Status Updated!",
            text: "Status updated successfully",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
          });
          setrefresh(!refresh);
        }
      })
      .catch((error) => {
        setShowBalanceModal(false);
        setInputBalance("0");
        console.error("Error updating balance:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update status",
          icon: "error",
        });
      });
  };

  return (
    <>
      <div className="content container-fluid" data-aos="fade-left">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="card-title mb-0">
                  <i className="fe fe-users pe-2"></i>All Researcher
                </h5>
              </div>
              <div className="col-auto">
                <div className="list-btn">
                  <ul className="filter-list mb-0">
                    <li className="">
                      <p
                        className="btn-filters mb-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Refresh"
                        onClick={handleRefresh}
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
                          onChange={(e) => setInputSearch(e.target.value)}
                          value={inputSearch}
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
                        <ExportToExcel
                          className="btn btn-primary "
                          apiData={ForGetCSV}
                          fileName={"All Researcher"}
                        />
                      </div>
                    </li>

                    <li>
                      <Link
                        to={"/admin/research/add"}
                        className="btn btn-primary"
                      >
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Add Researcher
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            {allResearcher.loading ? (
              <Loader />
            ) : (
              <FullDataTable
                styles={styles}
                columns={columns}
                rows={allResearcher.data}
              />
            )}
          </div>

          {showBalanceModal && (
            <div
              className="modal custom-modal d-block"
              id="add_vendor"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                  <div className="modal-header border-0 pb-0">
                    <div className="form-header modal-header-title text-start mb-0">
                      <h4 className="mb-0">Add Fund</h4>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={(e) => {
                        setShowBalanceModal(false);
                        setInputBalance("0");
                      }}
                    ></button>
                  </div>
                  <div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <div className="input-block mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Fund"
                              onChange={(e) => {
                                const value = e.target.value;
                                const newValue = value.replace(/\D/g, "");
                                e.target.value = newValue;
                                setInputBalance(e.target.value);
                              }}
                              value={inputBalance}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-back cancel-btn me-2"
                        onClick={(e) => setShowBalanceModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-continue-btn"
                        onClick={handlesubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllResearcher;
