import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import ExportToExcel from '../../../Utils/ExportCSV'
import { useNavigate } from "react-router-dom";
import {
  update_Balance,
} from "../../../ReduxStore/Slice/Admin/Subadmins";
import { fDateTime } from "../../../Utils/Date_formet";
import Loader from "../../../Utils/Loader";
import { GetAllUsers, Get_All_Broker, Show_Status, DeleteUser } from '../../../ReduxStore/Slice/Subadmin/UsersSlice'



export default function AllUsers() {

  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id
  const admin_id = JSON.parse(
    localStorage.getItem("user_details")
  )?.user_id;


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [initialRowData, setInitialRowData] = useState({});
  const [balanceValue, setBalanceValue] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [modal, setmodal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [ForGetCSV, setForGetCSV] = useState([])
  const [getAllBroker, setAllBroker] = useState([]);
  
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  



  const [modalId, setmodalId] = useState('');

  const [getAllUsers, setAllUsers] = useState({
    loading: false,
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


  const showLicenceName = (row) => {
    if (row.license_type === "0") {
      return "2 Days Only";
    } else if (row.license_type === "1") {
      return "Demo";
    } else {
      return "Live";
    }
  };


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
        console.log("Broker find Error :", error)
      })

  }


  useState(() => {
    AllBroker();
  }, [])




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



  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: styles.boldHeader,
    },
    {
      field: "FullName",
      headerName: "Full Name",
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
      field: "Email",
      headerName: "Email Id",
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
      width: 200,
      headerClassName: styles.boldHeader,
    },
    {
      field: "broker",
      headerName: "Broker",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => showBrokerName(params.row),
    },
    {
      field: 'license_type',
      headerName: "License Type",
      width: 120,
      headerClassName: styles.boldHeader,
      renderCell: (params) => showLicenceName(params.row),
    },
    // {
    //   field: "Balance",
    //   headerName: "Balance",
    //   width: 120,
    //   headerClassName: styles.boldHeader,
    //   renderCell: (params) => (
    //     <div onClick={() => { setmodal(true); setInitialRowData(params.row); }}>
    //       <span className="text-success-light">
    //         <IndianRupee style={{ height: "19px" }} />
    //         {params.value || '-'}
    //       </span>
    //     </div>
    //   ),
    // },

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
          <label htmlFor={`rating_${params.row.id}`} className="checktoggle checkbox-bg">checkbox</label>
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
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              setShowDeleteModal(true);
              setmodalId(params.row._id);
            }}
          >
            <DeleteIcon />
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
    navigate('/subadmin/user/edit/' + row._id)
  };

  const handleDelete = async (row) => {

    var data = { id: modalId }
    await dispatch(DeleteUser(data)).unwrap()
      .then((response) => {
        if (response.status) {
          toast.success(response.msg)
          setShowDeleteModal(false)
          setmodalId('')
          setrefresh(!refresh);
        }
        else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("User Does Not Exit", error)
      })




  };



  const handleSwitchChange = async (event, id) => {
    const user_active_status = event.target.checked ? 1 : 0; // 1 for active, 0 for inactive

    await dispatch(Show_Status({ id, user_active_status }))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          toast.success(response.msg);
          setrefresh(!refresh)
        } else {
          toast.error(response.msg);
        }
      })
      .catch((error) => {
        console.log("Error", error);

      });

  };

 

 


  const getUsersData = async () => {
    var data = { user_ID: user_id }
    await dispatch(GetAllUsers(data))
      .unwrap()
      .then((response) => {

        if (response.status) {
          const formattedData = response.data && response.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          const filterData = formattedData.filter((item) => {
            const searchInputMatch =
              searchInput == '' ||
              item.FullName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.UserName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.PhoneNo.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.prifix_key.toLowerCase().includes(searchInput.toLowerCase())

            return searchInputMatch

          })
         
          setAllUsers({
            loading: true,
            data: searchInput ? filterData : formattedData,
            data1: [
              { name: "Total Users", count: response.totalCount || 0, Icon: "fe fe-life-buoy", color: "#ec8000" },
              { name: "Active Users", count: response.activeClientsCount || 0, Icon: "fe fe-check-square", color: "#1e8edf" },
              {
                name: "InActive Users",
                count: response.inActiveCount || 0
                , Icon: "fe fe-x-circle",
                color: "#ed3a3a"
              },
              {
                name: "Live Users",
                count: response.liveUser || 0
                , Icon: "fas fa-dollar-sign"
                , color: "#1d8147"

              },
            ],
          });

        } else {
         
          setAllUsers({
            loading: true,
            data: [],
            data1: [],
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
     
        setAllUsers({
          loading: false,
          data: [],
          data1: [],
        });
      });
  };


  useEffect(() => {
    getUsersData();
  }, [refresh, searchInput]);


  const RefreshHandle = () => {
    setrefresh(!refresh)
    setSearchInput('')
  }

  const forCSVdata = () => {
    let csvArr = []
    if (getAllUsers.data.length > 0) {
      getAllUsers.data.map((item) => {
        return csvArr.push({
          "FullName": item.FullName,
          "UserName": item.UserName,
          "PhoneNo": item.PhoneNo,
          "Prifix Key": item.prifix_key,
          "Created At": item.createdAt
        })
      })

      setForGetCSV(csvArr)
    }

  }

  useEffect(() => {
    forCSVdata()
  }, [getAllUsers.data])




  return (
    <>
      {getAllUsers.loading ? (
        <>
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <h5>All Users</h5>
                <div className="page-content">
                  <div className="list-btn">
                    <ul className="filter-list">
                      <li className="mt-3">
                        <p
                          className="btn-filters"

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
                      <li>
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

                          <div className="card-body">
                            <ExportToExcel
                              className="btn btn-primary "
                              apiData={ForGetCSV}
                              fileName={'All Strategy'} />
                          </div>

                        </div>
                      </li>

                      <li>
                        <Link
                          to={"/subadmin/User/add"}
                          className="btn btn-primary"
                        >
                          <i
                            className="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          />
                          Add Users
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-list-head">
              <div className="row">
                {getAllUsers &&
                  getAllUsers.data1.map((data, index) => (
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
              rows={getAllUsers.data}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}


    
      {ShowDeleteModal &&
        (
          <div className="modal custom-modal modal-delete d-block" >
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <div className="delete-modal-icon">
                      <span>
                        <i className="fe fe-check-circle" />
                      </span>
                    </div>
                    <h3>Are You Sure?</h3>
                    <p>You want delete company</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="modal-footer justify-content-center p-0">
                      <button type="submit" onClick={() => handleDelete()} className="btn btn-primary paid-continue-btn me-2">Yes, Delete</button>
                      <button type="button" onClick={() => setShowDeleteModal(false)} className="btn btn-back cancel-btn">No, Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}




    </>
  );
}
