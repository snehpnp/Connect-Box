import React, { useEffect, useState } from "react";
import FullDataTable from "../../../Components/ExtraComponents/Tables/FullDataTable";
import {
  Subadmindetail,
  updateUser,
  DeleteUser,
} from "../../../ReduxStore/Slice/SuperAdmin/SuperAdmin";

import { GetAllUsers } from "../../../ReduxStore/Slice/Subadmin/UsersSlice";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ToastButton from "../../../Components/ExtraComponents/Alert_Toast";
import ExportToExcel from "../../../Utils/ExportCSV";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const AllUser = () => {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  const [getsubadmin, setGetsubadmin] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedFullname, setSelectedFullname] = useState("All");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [editbtn, setEditbtn] = useState(false);
  const [id, setID] = useState("");
  const [selectId, setSelectId] = useState("");
  const [update, setUpdate] = useState({
    user_Id: "",
    FullName: "",
    UserName: "",
    PhoneNo: "",
    Email: "",
  });



  const [getAllUsers, setAllUsers] = useState({
    loading: true,
    data: [],
    data1: [],
  });




  const handleRefresh = () => {
    getsubadminDetail();
    setRefresh(!refresh);
    setInputSearch("");
  };




  // get subadmin table
  const getsubadminDetail = async () => {
    await dispatch(Subadmindetail({}))
      .unwrap()
      .then(async (response) => {
        if (response.status) {
          setGetsubadmin(response.data);

          if (response.data.length > 0) {
            const { _id, FullName } = response.data[0];
            setSelectedUserId(_id);
            setSelectedFullname(FullName);
            getUsersData(_id);
          }
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };



  // update user
  const Updateuserdata = async () => {
    try {
      await dispatch(
        updateUser({
          _id: id,
          FullName: update.FullName,
          UserName: update.UserName,
          PhoneNo: update.PhoneNo,
          Email: update.Email,
        })
      )
        .unwrap()
        .then(async (response) => {
          if (response.status) {
            setEditbtn(!editbtn);
            getsubadminDetail();
            Swal.fire({
              title: "Updated",
              text: response.msg,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: response.msg,
              icon: "error",
            });
          }
        });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Error updating user data",
        icon: "error",
      });
    }
  };




  // handler to manage id
  const handleEdit = (_id) => {
    const userToEdit = getAllUsers.data.find((user) => user._id === _id);
    if (userToEdit) {
      setUpdate((prevUpdate) => ({
        user_Id: _id,
        FullName: userToEdit.FullName || prevUpdate.FullName || "",
        UserName: userToEdit.UserName || prevUpdate.UserName || "",
        PhoneNo: userToEdit.PhoneNo || prevUpdate.PhoneNo || "",
        Email: userToEdit.Email || prevUpdate.Email || "",
      }));
    } else {
      console.error("No user found with id:", _id);
    }

    setSelectedUserId(_id);
    setEditbtn((prevEditBtn) => !prevEditBtn);
  };



  

  // get user data
  const getUsersData = async () => {
    var data = { user_ID: selectId };
    await dispatch(GetAllUsers(data))
      .unwrap()
      .then((response) => {
        if (response.status) {
          const formattedData =
            response.data &&
            response.data.map((row, index) => ({
              ...row,
              id: index + 1,
            }));

          const filterdata = formattedData.filter((item) => {
            let searchMatch =
              inputSearch == "" ||
              item.FullName.toLowerCase().includes(inputSearch.toLowerCase()) ||
              item.UserName.toLowerCase().includes(inputSearch.toLowerCase()) ||
              item.Email.toLowerCase().includes(inputSearch.toLowerCase()) ||
              item.PhoneNo.toLowerCase().includes(inputSearch.toLowerCase());

            return searchMatch;
          });

          setAllUsers({
            loading: false,
            data: inputSearch ? filterdata : formattedData,
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
        setAllUsers({
          loading: true,
          data: [],
          data1: [],
        });
      });
  };



  useEffect(() => {
    getUsersData();
    getsubadminDetail();
  }, [refresh, selectId, inputSearch]);



  // delete user
  const DeleteUserdata = async (_id) => {
    // First, ask for confirmation
    Swal.fire({
      title: "Are you sure delete it ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          let data = { _id: _id };
          dispatch(DeleteUser(data))
            .unwrap()
            .then(async (response) => {
              if (response.status) {
                getsubadminDetail();
                Swal.fire("Deleted!", "The user has been deleted.", "success");
              }
            });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message || "Error updating user data",
            icon: "error",
          });
        }
      }
    });
  };



  // handler fo delete user
  const handleDelete = (_id) => {
    const userToDelete = getAllUsers.data.find((user) => user._id === _id);

    if (userToDelete) {
      DeleteUserdata(_id);
    } else {
      Swal.fire({
        title: "Error",
        text: "User not found",
        icon: "error",
      });
    }
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
      color: "red",
    },
    headerButton: {
      marginRight: 8,
    },
  };

  const columns = [
    {
      field: "index",
      headerName: "SR. No.",
      width: 130,
      headerClassName: styles.boldHeader,
      renderCell: (params, index) => params.row.id + 1,
    },
    {
      field: "FullName",
      headerName: "Name",
      width: 170,
      headerClassName: styles.boldHeader,
    },
    {
      field: "UserName",
      headerName: "UserName",
      width: 210,
      headerClassName: styles.boldHeader,
    },
    {
      field: "Email",
      headerName: "Email Id",
      width: 280,
      headerClassName: styles.boldHeader,
    },

    {
      field: "PhoneNo",
      headerName: "Phone No",
      width: 210,
      headerClassName: styles.boldHeader,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => {
              handleEdit(params.row._id);
              setID(params.row._id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleDelete(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      headerClassName: styles.boldHeader,
    },
  ];
  return (
    <>
      <div className="content container-fluid" data-aos="fade-left">
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
                      onClick={handleRefresh}
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
                        onChange={(e) => setInputSearch(e.target.value)}
                        value={inputSearch}
                      />
                    </div>
                  </li>

                  <li>
                    <div className="d-flex">
                      <div className="col-lg-12">
                        <div className="">
                          <div className="col-lg-12">
                            <select
                              className="form-control large-select"
                              style={{ height: "40px" }}
                              value={selectId}
                              onChange={(e) => setSelectId(e.target.value)}
                            >
                              {getsubadmin &&
                                getsubadmin.map((data, index) => (
                                  <option key={index} value={data._id}>
                                    {data.UserName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
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
                </ul>
              </div>
            </div>
          </div>
        </div>

        {
          <FullDataTable
            styles={styles}
            columns={columns}
            rows={getAllUsers.data}
          />
        }

        <ToastButton />
      </div>

      {editbtn && (
        <div className="modal custom-modal d-block kk" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Information</h4>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditbtn(!editbtn)}
                ></button>
              </div>

              <form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-4 col-sm-12">
                      <div className="input-block mb-3">
                        <label>FullName</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter FullName"
                          value={update.FullName}
                          onChange={(e) => {
                            setUpdate({
                              ...update,
                              FullName: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="input-block mb-3">
                        <label>UserName</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter User Name"
                          value={update.UserName}
                          onChange={(e) => {
                            setUpdate({
                              ...update,
                              UserName: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <div className="input-block mb-3">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Email"
                          value={update.Email}
                          onChange={(e) => {
                            setUpdate({
                              ...update,
                              Email: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <div className="input-block mb-3">
                        <label>PhoneNo</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Phone No"
                          value={update.PhoneNo}
                          onChange={(e) => {
                            setUpdate({
                              ...update,
                              PhoneNo: e.target.value,
                            });
                          }}
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
                    onClick={() => {
                      setEditbtn(!editbtn);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary paid-continue-btn"
                    onClick={Updateuserdata}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUser;
