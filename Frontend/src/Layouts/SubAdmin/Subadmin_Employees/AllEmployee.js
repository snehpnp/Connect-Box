import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { Employee_Details, Delete_Employee, GetEmployeeStatus } from "../../../ReduxStore/Slice/Subadmin/Strategy";
import { fDateTime } from "../../../Utils/Date_formet";
import Loader from "../../../Utils/Loader";
import ExportToExcel from "../../../Utils/ExportCSV";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function AllEmployees() {
  const userId = JSON.parse(localStorage.getItem("user_details")).user_id;
  const prifixKey = JSON.parse(localStorage.getItem("user_details")).prifix_key;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refresh, setrefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [ForGetCSV, setForGetCSV] = useState([]);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [modalId, setmodalId] = useState('');

  const [getAllUsers, setAllUsers] = useState({
    loading: false,
    data: [],
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };

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
  const handleEdit = async (row) => {
    const result = await Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      navigate(`/subadmin/employee/edit/${row._id}`);
    } else {
      Swal.fire({
        title: "Action canceled",
        text: "Your edit operation was canceled",
        icon: "info",
        timer: 1000,
        timerProgressBar: true
      });
      setTimeout(() => {
        Swal.close(); // Close the modal
        setrefresh(!refresh);
      }, 1000);
    }
  };


  const handleDeleteConfirmation = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      var data = { id: id };
      try {
        const response = await dispatch(Delete_Employee(data)).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Employee has been deleted.",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            onClose: () => {
              setShowDeleteModal(false);
            }
          });
          setmodalId('');
          setrefresh(!refresh);
        } else {
        }
      } catch (error) {
        console.error('There was a problem with the API request:', error);
        Swal.fire({
          title: "Error!",
          text: "There was an error processing your request.",
          icon: "error"
        });
      } finally {
        setShowDeleteModal(false);
      }
    } else {
      setShowDeleteModal(false);
    }
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
      field: "fullName",
      headerName: "FullName",
      width: 180,
      headerClassName: styles.boldHeader,

    },
    {
      field: "userName",
      headerName: "UserName",
      width: 180,
      headerClassName: styles.boldHeader,

    },
    {
      field: "email",
      headerName: "Email Id",
      width: 250,
      headerClassName: styles.boldHeader,

    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
      width: 180,
      headerClassName: styles.boldHeader,

    },

    {
      field: "activeStatus",
      headerName: "Status",
      width: 100,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div className="status-toggle">
          <input
            id={`rating_${params.row.id}`}
            className="check"
            type="checkbox"
            checked={params.value == 1}
            onChange={(event) => handleSwitchChange(event, params.row._id)}
          />
          <label
            htmlFor={`rating_${params.row.id}`}
            className={`checktoggle ${params.value == 1 ? "checkbox-bg-on" : "checkbox-bg-off"
              }`}
          ></label>
        </div>
      ),
    },
    {
      field: "Users",
      headerName: "Users List",
      width: 180,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div className="status-toggle" style={{ width: '180', position: 'relative' }}>
          <select id="strategySelect" className="form-select" style={{ width: '180', overflowX: 'hidden' }}>
            <option value="">User List</option>
            {params.value.map((data, index) => (
              <option key={index} value={data.UserName}>{data.UserName}</option>
            ))}
          </select>
       
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
          {/* <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {


              handleDeleteConfirmation(params.row._id)
            }}
          >
            <DeleteIcon />
          </IconButton> */}
        </div>
      ),
      headerClassName: styles.boldHeader,
    },
    {
      field: "createDate",
      headerName: "Created Date",
      width: 160,
    },

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(Employee_Details({ userId })).unwrap();
        if (response.status) {
          const formattedData = response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          const filterData = formattedData.filter((item) => {
            const searchInputMatch =
              searchInput === "" ||
              item.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.phoneNo.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.email.toLowerCase().includes(searchInput.toLowerCase());

            return searchInputMatch;
          });

          setAllUsers({
            loading: true,
            data: searchInput ? filterData : formattedData,
          });
        } else {
          toast.error(response.msg);
          setAllUsers({
            loading: true,
            data: [],
          });
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Error fetching user data");
        setAllUsers({
          loading: true,
          data: [],
        });
      }
    };

    fetchData();
  }, [dispatch, userId, searchInput, refresh]);

  const RefreshHandle = () => {
    setrefresh(!refresh);
    setSearchInput("");
  };

  const forCSVdata = () => {
    let csvArr = [];
    if (getAllUsers.data.length > 0) {
      getAllUsers.data.map((item) => {
        return csvArr.push({
          FullName: item.fullName,
          UserName: item.userName,
          PhoneNo: item.phoneNo,
          EmailId: item.email,
          Prefix_Key: prifixKey,
          CreatedAt: item.createDate,
        });
      });

      setForGetCSV(csvArr);
    }
  };

  useEffect(() => {
    forCSVdata();
  }, [getAllUsers.data]);

  const handleSwitchChange = async (event, id) => {
    const activeStatus = event.target.checked ? 1 : 0;
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",

    });

    if (result.isConfirmed) {
      try {
        const response = await dispatch(GetEmployeeStatus({ id, activeStatus })).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Saved!",
            icon: "success",
            timer: 1000,
            timerProgressBar: true
          });
          setrefresh(!refresh);

        } else {
          setrefresh(!refresh);
        }
      } catch (error) {
        console.error("Error", error);
        Swal.fire("Error", "There was an error processing your request.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // window.location.reload();
    }
  };
  return (
    <>
      {getAllUsers.loading ? (
        <>
          <div className="content container-fluid" data-aos="fade-left">

            <div className="card">
              <div className="card-header">
                <div className="row align-center">
                  <div className="col">
                    <h5 className="card-title mb-0">All Employees</h5>
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

                            <ExportToExcel
                              className="btn btn-primary"
                              apiData={ForGetCSV}
                              fileName={"All Employee Details"}
                            />

                          </div>
                        </li>
                        <li>
                          <Link
                            to={"/subadmin/employee/add"}
                            className="btn btn-primary"
                          >
                            <i
                              className="fa fa-plus-circle me-2"
                              aria-hidden="true"
                            />
                           Add Employee
                          </Link>
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
                  rows={getAllUsers.data}
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
