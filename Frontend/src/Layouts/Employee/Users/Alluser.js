import React, { useState, useEffect } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { Link, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import ExportToExcel from '../../../Utils/ExportCSV'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { fDateTime } from "../../../Utils/Date_formet";
import Loader from "../../../Utils/Loader";
import { Get_Permission } from '../../../ReduxStore/Slice/Employee/EmployeeSlice'
import { Get_All_Broker, Show_Status, DeleteUser, GetAllSubadminUsers } from '../../../ReduxStore/Slice/Subadmin/UsersSlice'


export default function AllUsers() {

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
  const admin_id = JSON.parse(
    localStorage.getItem("user_details")
  )?.user_id;


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [licenceType, setLicenceType] = useState('null');




  const [refresh, setrefresh] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [ForGetCSV, setForGetCSV] = useState([])
  const [getAllBroker, setAllBroker] = useState([]);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [modalId, setmodalId] = useState('');



  const [getPermission, setPermission] = useState({
    loading: true,
    data: [],

  });
  const [getAllUsers, setAllUsers] = useState({
    loading: true,
    data: [],
    data1: [],
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


  const location = useLocation();
  var dashboard_filter = location.search.split("=")[1];

  const showLicenceName = (row) => {
    if (row.license_type === "0") {
      return "2 Days Only";
    } else if (row.license_type === "1") {
      return "Demo";
    } else {
      return "Live";
    }
  };

  const showBrokerName = (row) => {

    if (row.license_type === "1") {
      return "Demo";
    } else {

      const foundNumber = getAllBroker && getAllBroker.find((value) => value.broker_id == row.broker);
      if (foundNumber != undefined) {
        return foundNumber.title
      } else {
        return "--"
      }
    }
  };

  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: styles.boldHeader,
      hideColumn: true,
      renderCell: (params) => (
        <div> <b>{params.value + 1}</b></div>
      ),
    },
    {
      field: "FullName",
      headerName: "Full Name",
      width: 160,
      hideColumn: true,
      headerClassName: styles.boldHeader,

    },
    {
      field: "UserName",
      headerName: "User name",
      width: 160,
      hideColumn: true,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>{getPermission.data && getPermission.data.detailsinfo ? params.value : params.value.substring(0, 2) + "******" + params.value.substring(params.value.length - 2)}</div>
      ),
    },
    {
      field: "Email",
      headerName: "Email ID",
      width: 220,
      hideColumn: true,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div>{getPermission.data && getPermission.data.detailsinfo ? params.value : params.value.substring(0, 2) + "******" + params.value.substring(params.value.length - 2)}</div>
      ),
    },

    {
      field: "PhoneNo",
      headerName: "Phone Number",
      width: 180,
      hideColumn: true,
      headerClassName: styles.boldHeader,
      renderCell: (params) => (
        <div> {getPermission.data && getPermission.data.detailsinfo ? params.value : params.value.substring(0, 2) + "******" + params.value.substring(params.value.length - 2)}</div>
      ),
    },

    {
      field: "broker",
      headerName: "Broker",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => showBrokerName(params.row),
      hideColumn: true,

    },
    {
      field: 'license_type',
      headerName: "License Type",
      width: 120,
      headerClassName: styles.boldHeader,
      hideColumn: true,
      renderCell: (params) => showLicenceName(params.row),

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
          {params.row.license_type == 1 ?
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDeleteConfirmation(params.row._id)}
            >
              <DeleteIcon />
            </IconButton> : ''
          }
        </div>
      ),
      headerClassName: styles.boldHeader,
      hideColumn: getPermission.data && getPermission.data.Update_Api_Key == 1 ? true : getPermission.data && getPermission.data.employee_edit == 1 ? true : false

    },


    {
      field: "Create_Date",
      headerName: "Created At",
      width: 250,
      headerClassName: styles.boldHeader,
      hideColumn: true,
      renderCell: (params) => <div>{fDateTime(params.value)}</div>,
    },
  ];



  const handleEdit = async (row) => {

    const additionalData = {
      Update_Api_Key: getPermission.data && getPermission.data.Update_Api_Key,
    };

    navigate(`/employee/user/edit/${row._id}`, { state: { rowData: row, additionalData } });
  };





  const getpermission = async () => {
    const data = { id: user_id }
    await dispatch(Get_Permission(data)).unwrap()
      .then((response) => {
        if (response.status) {
          setPermission({
            loading: false,
            data: response.data,

          })
        }
        else {
          setPermission({
            loading: false,
            data: [],


          })
        }
      })
      .catch((err) => {
        console.log("Error in fatching in permission ", err)
      })
  }

  useEffect(() => {
    getpermission();
  }, [])




  const AllBroker = async () => {

    await dispatch(Get_All_Broker()).unwrap()
      .then((response) => {
        if (response.status) {


          setAllBroker(response.data);
        }
        else {
          setAllBroker([]);
        }
      })
      .catch((error) => {
        console.log("Error Broker find Error :", error)
      })

  }


  useState(() => {
    AllBroker();
  }, [])



  const RefreshHandle = () => {
    setrefresh(!refresh)
    setSearchInput('')
    setLicenceType('null')
  }

  const forCSVdata = () => {
    let csvArr = []
    if (getAllUsers.data.length > 0) {
      getAllUsers.data.map((item) => {
        return csvArr.push({
          "FullName": item.FullName,
          "UserName": item.UserName,
          "PhoneNo": item.PhoneNo,
          "Email Id" : item.Email,
          "Broker Type" : item.broker,
          "Licence Type" : item.license_type
        })
      })

      setForGetCSV(csvArr)
    }

  }

  useEffect(() => {
    forCSVdata()
  }, [getAllUsers.data])


  // DELETE SWEET ALERT 2
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
        const response = await dispatch(DeleteUser(data)).unwrap();
        if (response.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
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


  const getAllEmployeeUsersData = async () => {
    var data = { user_ID: user_id }
    await dispatch(GetAllSubadminUsers(data))
      .unwrap()
      .then((response) => {

        if (response.status) {
          const formattedData = response.data && response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          let formattedData1;
          if (dashboard_filter == 1 || dashboard_filter == undefined) {
            formattedData1 = formattedData
          }
          else if (dashboard_filter == 2) {
            formattedData1 = formattedData.filter((item) => item.ActiveStatus == 1)
          }
          else if (dashboard_filter == 3) {
            formattedData1 = formattedData.filter((item) => item.ActiveStatus == 1)
          }
          else if (dashboard_filter == 4) {
            formattedData1 = formattedData.filter((item) => item.license_type == 2)
          }
          else if (dashboard_filter == 5) {
            formattedData1 = formattedData.filter((item) => item.license_type == 2 && item.ActiveStatus == 1)
          }
          else if (dashboard_filter == 6) {
            formattedData1 = formattedData.filter((item) => item.license_type == 2 && item.ActiveStatus == 0)
          }
          else if (dashboard_filter == 7) {
            formattedData1 = formattedData.filter((item) => item.license_type == 0)
          }
          else if (dashboard_filter == 8) {
            formattedData1 = formattedData.filter((item) => item.license_type == 1 && item.ActiveStatus == 1)
          }
          else if (dashboard_filter == 9) {
            formattedData1 = formattedData.filter((item) => item.license_type == 1 && item.ActiveStatus == 0)
          }
          else if (dashboard_filter == 10) {
            formattedData1 = formattedData.filter((item) => item.license_type == 1)
          }
          else if (dashboard_filter == 11) {
            formattedData1 = formattedData.filter((item) => item.license_type == 1 && item.ActiveStatus == 1)
          } else if (dashboard_filter == 12) {
            formattedData1 = formattedData.filter((item) => item.license_type == 1 && item.ActiveStatus == 0)
          }




          const filterData = formattedData1.filter((item) => {

            const filter1Data = licenceType== 'null' || item.license_type.includes(licenceType)


            const searchInputMatch =
              searchInput == '' ||
              item.FullName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.UserName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.PhoneNo.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.prifix_key.toLowerCase().includes(searchInput.toLowerCase())

            return searchInputMatch && filter1Data

          })

          setAllUsers({
            loading: false,
            data: searchInput || licenceType!='null'  ? filterData : formattedData1,
          });

        } else {

          setAllUsers({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);

        setAllUsers({
          loading: true,
          data: [],
          data1: [],
        });
      });
  };

  useEffect(() => {
    getAllEmployeeUsersData();
    // getAllUsersData();
  }, [refresh, searchInput , licenceType]);




  return (
    <>
      {!getAllUsers.loading ? (
        <>
          <div className="content container-fluid" data-aos="fade-left">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="card-title mb-0">
                      <i className="pe-2 fa-solid fa-users"></i>
                      All Users</h5>
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
                        <li className="serach-li">
                          <div className="input-group input-block">
                            <select className="rounded form-control border-0 px-4"
                              onChange={(e) => setLicenceType(e.target.value)}
                              value={licenceType}>
                              <option value="null">License Type</option>
                              <option value="1">Demo</option>
                              <option value="0">2 day Live</option>+
                              <option value="2">Live</option>
                            </select>
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
                              fileName={'All Users'} />


                          </div>
                        </li>
                        {getPermission.data.employee_add ?
                          <li>
                            <Link
                              to={"/employee/user/add"}
                              className="btn btn-primary"
                            >
                              <i
                                className="fa fa-plus-circle me-2"
                                aria-hidden="true"
                              />
                              Add Users
                            </Link>
                          </li> : ''}

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">

                <FullDataTable
                  styles={styles}
                  label={label}
                  columns={columns.filter(column => column.hideColumn === true)}

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
